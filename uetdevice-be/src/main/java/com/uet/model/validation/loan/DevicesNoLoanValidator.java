package com.uet.model.validation.loan;

import com.uet.service.DeviceService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class DevicesNoLoanValidator implements ConstraintValidator<DeviceNoLoan, Integer> {

	@Autowired
	private DeviceService deviceService;

	@Override
	public boolean isValid(Integer deviceId, ConstraintValidatorContext context) {

		if (deviceId == null || deviceId <= 0) {
			return true;
		}

		return deviceService.isDeviceAvailable(deviceId);
	}
}