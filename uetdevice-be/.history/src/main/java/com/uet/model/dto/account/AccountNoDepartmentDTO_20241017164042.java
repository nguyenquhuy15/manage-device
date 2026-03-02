package com.uet.model.dto.account;

import com.uet.model.entity.Account.Role;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountNoDepartmentDTO {
	private int id;
	private String username;
	private String fullname;
	private String email;
	private Role role;
}
