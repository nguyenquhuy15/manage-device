package com.uet.model.form.department;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.uet.model.entity.Account.Role;
import com.uet.model.entity.Account.Status;

import jakarta.validation.constraints.PastOrPresent;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountFilterForm {

	@JsonProperty("q")
	private String q;

	@PastOrPresent
	private Date minCreatedDate;

	private Date maxCreatedDate;

	private Role role;

	private Status status;
}
