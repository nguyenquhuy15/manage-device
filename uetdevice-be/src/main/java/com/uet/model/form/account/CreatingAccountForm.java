package com.uet.model.form.account;


import org.hibernate.validator.constraints.Length;

import com.uet.model.validation.account.AccountEmailNotExists;
import com.uet.model.validation.account.AccountUsernameNotExists;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingAccountForm {

	@NotBlank
	@Length(max = 50)
	private String firstname;

	@NotBlank
	@Length(max = 50)
	private String lastname;

	@NotBlank
	@Length(min = 6, max = 20)
	@AccountUsernameNotExists
	private String username;

	@NotBlank
	@Email
	@AccountEmailNotExists
	private String email;

	@NotBlank
	@Length(min = 6, max = 20)
	private String password;

}