



















package com.uet.model.validation.department;
//package com.company.model.validation.department;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.util.StringUtils;
//
//import com.company.service.DepartmentService;
//
//import jakarta.validation.ConstraintValidator;
//import jakarta.validation.ConstraintValidatorContext;
//
//public class DepartmentNameNotExistsValidator implements ConstraintValidator<DepartmentNameNotExists, String> {
//
//	@Autowired
//	private DepartmentService service;
//
//	@SuppressWarnings("deprecation")
//	@Override
//	public boolean isValid(String name, ConstraintValidatorContext context) {
//
//		if (StringUtils.isEmpty(name)) {
//			return true;
//		}
//
//		return !service.isDepartmentExistsByName(name);
//	}
//}