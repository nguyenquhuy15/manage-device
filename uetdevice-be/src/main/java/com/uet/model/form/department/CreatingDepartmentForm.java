package com.uet.model.form.department;



import com.uet.model.validation.department.DepartmentNameNotExists;


import lombok.AllArgsConstructor;
import org.hibernate.validator.constraints.Length;



import jakarta.validation.constraints.NotBlank;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatingDepartmentForm {

	@NotBlank
	@Length(max = 100)
	@DepartmentNameNotExists
	private String name;


}