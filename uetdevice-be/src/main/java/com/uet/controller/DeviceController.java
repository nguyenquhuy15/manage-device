package com.uet.controller;


import com.uet.model.dto.Lab.LabDTO;
import com.uet.model.dto.devices.DeviceCreatDTO;
import com.uet.model.dto.devices.DeviceDTO;

import com.uet.model.dto.devices.ImportDeviceDTO;
import com.uet.model.dto.maintenance.DeviceMaintenanceDTO;
import com.uet.model.dto.maintenance.MaintenanceDTO;
import com.uet.model.dto.manager.ManagerDTO;
import com.uet.model.form.devices.CreatingDeviceForm;
import com.uet.model.form.devices.DeviceFilterForm;
import com.uet.model.form.devices.ImportDevicesForm;
import com.uet.model.form.lab.LabForm;
import com.uet.model.form.maintenance.MaintenanceDeviceFilterForm;
import com.uet.model.form.maintenance.UpdateMaintenanceDeviceForm;
import com.uet.model.form.type.DeviceTypeForm;
import com.uet.model.form.devices.UpdateDeviceForm;

import com.uet.model.validation.device.DeviceIdExists;
import com.uet.service.DeviceService;

import com.uet.service.MaintenanceService;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/api/v1/devices")
@Validated
@Log4j2
public class DeviceController {
    @Autowired
    private DeviceService deviceService;
	@Autowired
	private MaintenanceService maintenanceService;

	@Autowired
	private Validator validator;

    @GetMapping
    public Page<DeviceDTO> getAllDevices(Pageable pageable, @Valid DeviceFilterForm form) {
        return deviceService.getAllDevices(pageable, form);
    }

	@GetMapping("/maintenance")
	public Page<MaintenanceDTO> getAllDevicesByMaintenance(
			Pageable pageable,
			@Valid MaintenanceDeviceFilterForm form) {
		return deviceService.getAllDevicesByMaintenance(pageable, form);
	}


    @GetMapping("/{id}")
	public DeviceDTO getDeviceById(@PathVariable(name = "id")  Integer id) {
		return deviceService.getDeviceById(id);
	}

	@GetMapping("/maintenance/{id}")
	public DeviceMaintenanceDTO getDeviceMaintenanceById(@PathVariable(name = "id")  Integer id) {
		return maintenanceService.getDeviceById(id);
	}

	@DeleteMapping("/maintenance/{deviceIds}")
	public String removeDevicesInMaintenance(@PathVariable(name = "deviceIds") List<@DeviceIdExists Integer> deviceIds) {
		maintenanceService.removeDevicesInMaintenance(deviceIds);
		return "Remove devices successfully!";
	}

    @GetMapping("/filter")
	public List<DeviceTypeForm> getAllDevicesType() {
		return deviceService.getAllDevicesType();
	}

    @PostMapping
	public String createDevice(@RequestBody @Valid CreatingDeviceForm form) {
		deviceService.createDevice(form);
		return "create successfully!";
	}

	@GetMapping("/{id}/lab")
	public List<LabForm> getAllLabByDeviceId(@PathVariable(name = "id")  Integer id) {
		return deviceService.getAllLabByDeviceId(id);
	}

	@DeleteMapping("/{id}")
	public String deleteDevice(
			@PathVariable(name = "id") Integer deviceId) {
		deviceService.deleteDevice(deviceId);
		return "delete successfully!";
	}
	@GetMapping("/code/exists")
	public boolean isDeviceExistsByCode(String code) {
		return deviceService.isDeviceExistsByCode(code);
	}

	@GetMapping("/name/exists")
	public boolean isDeviceExistsByName(String name) {
		return deviceService.isDeviceExistsByName(name);
	}

	@PutMapping("/{id}")
	public String updateDevice(
			@PathVariable(name = "id")  Integer deviceId,
			@RequestBody @Valid UpdateDeviceForm form) {
		deviceService.updateDevice(deviceId, form);
		return "update successfully!";
	}
	@PutMapping("/maintenance/{id}")
	public String updateDeviceMaintenance(
			@PathVariable(name = "id")  Integer deviceId,
			@RequestBody @Valid UpdateMaintenanceDeviceForm form) {
		maintenanceService.updateDeviceMaintenance(deviceId, form);
		return "update successfully!";
	}

	@DeleteMapping
	public String removeAllDevices() {
		deviceService.removeAllDevices();
		return "All devices have been deleted successfully!";
	}

	@DeleteMapping("/delete/{ids}")
	public void deleteDevices(@PathVariable String ids) {
		List<Integer> idList = Arrays.stream(ids.split(","))
				.map(Integer::parseInt)
				.collect(Collectors.toList());
		deviceService.deleteAllById(idList);
	}

	@DeleteMapping("/device/{deviceIds}")
	public String removeDevicesInLab(@PathVariable(name = "deviceIds") List<@DeviceIdExists Integer> deviceIds) {
		deviceService.removeDevicesInLab(deviceIds);
		return "Remove accounts successfully!";
	}
	@GetMapping("/noLoan")
	public List<DeviceDTO> getAllDevicesNoLoan(Sort sort, @RequestParam(value = "q", required = false) String q) {
		return deviceService.getAllDevicesNoLoan(sort, q);
	}

	@PostMapping("/import")
	public String importDevice(
			@RequestBody @Valid ImportDevicesForm form) {
		deviceService.importDevice(form);
		return "Import devices successfully!";
	}

	@GetMapping("/info")
	public List<ImportDeviceDTO> getInfoDeviceByName(
			@RequestParam(name = "name") List<String> name) {
		return deviceService.getInfoDeviceByName(name);
	}
	
}
