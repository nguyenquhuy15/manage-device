package com.uet.service;


import com.uet.model.dto.department.DeviceDTO;
import com.uet.model.entity.*;
import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.form.lab.CreatingManagerForm;
import com.uet.model.form.lab.LabFilterForm;
import com.uet.model.specification.department.DepartmentSpecification;
import com.uet.model.specification.device.DeviceIdSpecification;
import com.uet.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import com.uet.model.dto.department.DepartmentDTO;

import java.util.List;

@Service
@Transactional
public class DepartmentServiceImpl extends BaseService implements DepartmentService {

	@Autowired
	private ILaboratoriesRepository laboratoriesRepository;
	@Autowired
	private IDepartmentRepository departmentRepository;

	@Autowired
	private IDevicesRepository devicesRepository;
	@Autowired
	private IDeviceTypeRepository deviceTypeRepository;

	@Autowired
	private ISubjectsRepository subjectsRepository;


	@Override
	public Page<DepartmentDTO> getAllDepartments(Pageable pageable, LabFilterForm form) {

		Specification<Laboratories> where = DepartmentSpecification.buildWhere(form);

		 //get entity page
		Page<Laboratories> entityPage = laboratoriesRepository.findAll(where, pageable);

		 //convert entity to dto page
		Page<DepartmentDTO> dtoPage = convertObjectPageToObjectPage(entityPage, pageable, DepartmentDTO.class);

		return dtoPage;
	}
	@Override
	public Page<DeviceDTO> getAllDevicesByLabId(Integer labId, Pageable pageable,
												DeviceFilterForm form) {
		Specification<Devices> where = DeviceIdSpecification.buildWhere(labId, form);

		// get entity page
		Page<Devices> entityPage = devicesRepository.findAll(where, pageable);

		// convert entity to dto page
		Page<DeviceDTO> dtoPage = convertObjectPageToObjectPage(entityPage, pageable, DeviceDTO.class);

		return dtoPage;
	}

	@Override
	public boolean isDepartmentExistsById(Integer id) {
		return laboratoriesRepository.existsById(id);
	}

	@Override
	public void createManager(CreatingManagerForm form) {
		Department department = null;
		Subjects subjects = null;

		if (form.getSubjectsId() != null) {
			subjects = subjectsRepository.findById(form.getSubjectsId())
					.orElseThrow(() -> new RuntimeException("Subjects not found"));
			department = subjects.getDepartments();
		} else {

			if (form.getDepartmentsId() == null) {
				throw new IllegalArgumentException("Department ID must not be null");
			}


			department = departmentRepository.findById(form.getDepartmentsId())
					.orElseThrow(() -> new RuntimeException("Department not found"));
		}

		Laboratories laboratories = Laboratories.builder()
				.name(form.getName())
				.managerName(form.getManagerName())
				.email(form.getEmail())
				.phone(form.getPhone())
				.departments(department)
				.subjects(subjects)
				.location(form.getLocation())
				.build();

		laboratoriesRepository.save(laboratories);
	}

	@Transactional
	@Override
	public void removeDevicesInDepartment(List<Integer> deviceIds) {
		for (Integer deviceId : deviceIds) {
			Devices devices = devicesRepository.findById(deviceId).get();

			Laboratories laboratories = devices.getLaboratories();
			laboratories.setQuantity(laboratories.getQuantity() - 1);

			DeviceType type = devices.getType();
			type.setQuantity(type.getQuantity() - 1);
			deviceTypeRepository.save(type);

			devicesRepository.delete(devices);
		}
	}



	@Override
	public DepartmentDTO getDepartmentById(Integer id) {
		//get entity
		Laboratories entity = laboratoriesRepository.findById(id).get();

		 //convert entity to dto
		DepartmentDTO dto = convertObjectToObject(entity, DepartmentDTO.class);

		return dto;
	}
//
	@Override
	public boolean isDepartmentExistsByName(String name) {
		return laboratoriesRepository.existsByName(name);
	}
	@Override
	public boolean isEmailExists(String email) {
		return laboratoriesRepository.existsByEmail(email);
	}
	@Override
	public boolean isManagerNameExists(String managerName) {
		return laboratoriesRepository.existsByManagerName(managerName);
	}

//
//	@Override
//	public void deleteDepartment(Integer departmentId) {
//		departmentRepository.deleteById(departmentId);
//	}
//
//	@Override
//	public List<DepartmentForFilterDTO> getAllDepartmentsForFilter() {
//		// get entity list
//		List<Department> entities = departmentRepository.findAll();
//
//		// convert entity to dto page
//		List<DepartmentForFilterDTO> dtos = convertListObjectToListObject(entities, DepartmentForFilterDTO.class);
//
//		return dtos;
//	}


}
