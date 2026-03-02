package com.uet.model.validation.subject;

import com.uet.service.SubjectService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class SubjectNoDepartmentValidator implements ConstraintValidator<SubjectNoDepartment, Integer> {

	@Autowired
	private SubjectService subjectService;

	@Override
	public boolean isValid(Integer subjectId, ConstraintValidatorContext context) {

		if (subjectId == null || subjectId <= 0) {
			return true;
		}

		return subjectService.getSubjectById(subjectId).getDepartments() == null;
	}
}