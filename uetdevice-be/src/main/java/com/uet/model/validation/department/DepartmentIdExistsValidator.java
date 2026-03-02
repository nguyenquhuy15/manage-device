package com.uet.model.validation.department;


import org.springframework.beans.factory.annotation.Autowired;

import com.uet.service.DepartmentService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DepartmentIdExistsValidator implements ConstraintValidator<DepartmentIdExists, Integer> {

	@Autowired
	private DepartmentService service;

	@Override
	public boolean isValid(Integer id, ConstraintValidatorContext context) {

		if (id == null || id <= 0) {
			return false;
		}

		return service.isDepartmentExistsById(id);
	}
}