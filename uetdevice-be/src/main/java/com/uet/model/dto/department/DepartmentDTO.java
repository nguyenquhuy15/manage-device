package com.uet.model.dto.department;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DepartmentDTO {
	private int id;
	private String name;
	private String location;

	private String departmentsName;

	private String managerName;
	private Integer quantity;
	private String email;
	private String phone;


	private String subjectsName;

}
