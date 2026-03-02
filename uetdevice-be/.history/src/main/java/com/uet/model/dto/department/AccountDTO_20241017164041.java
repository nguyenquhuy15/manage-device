package com.uet.model.dto.department;

import java.util.Date;

import com.uet.model.entity.Account.Role;
import com.uet.model.entity.Account.Status;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AccountDTO {
	private int id;
	private String username;
	private String fullname;
	private String email;
	private Role role;
	private Status status;
	private Date createdDateTime;
}
