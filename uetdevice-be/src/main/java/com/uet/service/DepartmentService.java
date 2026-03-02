package com.uet.service;
import java.util.List;


import com.uet.model.dto.department.DeviceDTO;
import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.form.lab.CreatingManagerForm;
import com.uet.model.form.lab.LabFilterForm;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.uet.model.dto.department.DepartmentDTO;

import org.springframework.transaction.annotation.Transactional;


public interface DepartmentService {
	Page<DepartmentDTO> getAllDepartments(Pageable pageable, LabFilterForm form);

    Page<DeviceDTO> getAllDevicesByLabId(Integer deviceId, Pageable pageable,
                                         DeviceFilterForm form);

    boolean isDepartmentExistsById(Integer id);

    void createManager(CreatingManagerForm form);

    @Transactional
    void removeDevicesInDepartment(List<Integer> deviceIds);

    DepartmentDTO getDepartmentById(Integer id);

    //
//	DepartmentDetailDTO getDepartmentById(Integer id);
//
	boolean isDepartmentExistsByName(String name);

    boolean isEmailExists(String email);

    boolean isManagerNameExists(String managerName);
//
//	void createDepartment(CreatingDepartmentForm form);
//
//	void deleteDepartment(Integer departmentId);
//
//	List<DepartmentForFilterDTO> getAllDepartmentsForFilter();


}