package com.uet.model.form.department;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class DepartmentFilterForm {

	@JsonProperty("q")
	private String q;

	@PastOrPresent
	private Date minCreatedDate;

	private Date maxCreatedDate;

	@PositiveOrZero
	private Integer minMemberSize;

	@PositiveOrZero
	private Integer maxMemberSize;
}
