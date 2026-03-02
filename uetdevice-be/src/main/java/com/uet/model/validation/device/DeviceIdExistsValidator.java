package com.uet.model.validation.device;

import com.uet.service.DeviceService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class DeviceIdExistsValidator implements ConstraintValidator<DeviceIdExists, Integer> {

	@Autowired
	private DeviceService service;

	@Override
	public boolean isValid(Integer id, ConstraintValidatorContext context) {

		if (id == null || id <= 0) {
			return false;
		}

		return service.isDeviceExistsById(id);
	}
}