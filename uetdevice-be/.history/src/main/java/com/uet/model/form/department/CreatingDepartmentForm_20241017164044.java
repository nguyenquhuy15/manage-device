package com.uet.model.form.department;

import java.util.List;

import org.hibernate.validator.constraints.Length;

import com.uet.model.validation.account.AccountNoDepartment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingDepartmentForm {

	@NotBlank
	@Length(max = 100)
//	@DepartmentNameNotExists
	private String name;

	@NotNull
	@AccountNoDepartment
	private Integer managerId;

	private List<@AccountNoDepartment Integer> employeeIds;
}