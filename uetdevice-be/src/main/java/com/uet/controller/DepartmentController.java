package com.uet.controller;


import com.uet.model.dto.department.DeviceDTO;
import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.form.lab.CreatingManagerForm;
import com.uet.model.form.lab.LabFilterForm;
import com.uet.model.validation.department.DepartmentIdExists;
import com.uet.model.validation.device.DeviceIdExists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.uet.model.dto.department.DepartmentDTO;
import com.uet.service.DepartmentService;

import jakarta.validation.Valid;
import lombok.extern.log4j.Log4j2;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/departments")
@Validated
@Log4j2
public class DepartmentController {

	@Autowired
	private DepartmentService departmentService;


	@GetMapping
	public Page<DepartmentDTO> getAllDepartments(Pageable pageable,  @Valid LabFilterForm form) {
		return departmentService.getAllDepartments(pageable, form);
	}

	@GetMapping("/{id}")
	public DepartmentDTO getDepartmentById(@PathVariable(name = "id") @DepartmentIdExists Integer id) {
		return departmentService.getDepartmentById(id);
	}
//
//
//
	@GetMapping("/name/exists")
	public boolean isDepartmentExistsByName(String name) {
		return departmentService.isDepartmentExistsByName(name);
	}
	@GetMapping("/email/exists")
	public boolean isEmailExists(String email) {
		return departmentService.isEmailExists(email);
	}

	@GetMapping("/manager/exists")
	public boolean isManagerNameExists(String managerName) {
		return departmentService.isManagerNameExists(managerName);
	}
	@PostMapping
	public String createManager(@RequestBody @Valid CreatingManagerForm form) {
		departmentService.createManager(form);
		return "create successfully!";
	}
	@GetMapping("/{id}/devices")
	public Page<DeviceDTO> getAllDevicesByLabId(
			@PathVariable(name = "id") @DepartmentIdExists Integer laboratoriesId,
			Pageable pageable,
			@Valid DeviceFilterForm form) {
		return departmentService.getAllDevicesByLabId(laboratoriesId, pageable, form);
	}
	@DeleteMapping("/devices/{deviceIds}")
	public String removeDevicesInDepartment(@PathVariable(name = "deviceIds") List<@DeviceIdExists Integer> deviceIds) {
		departmentService.removeDevicesInDepartment(deviceIds);
		return "Remove devices successfully!";
	}
//
//	@DeleteMapping("/{id}")
//	public String deleteDepartment(
//			@PathVariable(name = "id") @DepartmentIdExists @DepartmentNoUser Integer departmentId) {
//		departmentService.deleteDepartment(departmentId);
//		return "delete successfully!";
//	}
//
//	@GetMapping("/filter")
//	public List<DepartmentForFilterDTO> getAllDepartmentsForFilter() {
//		return departmentService.getAllDepartmentsForFilter();
//	}


}
