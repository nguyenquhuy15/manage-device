package com.uet.model.dto.auth;

import com.uet.model.entity.Account.Status;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginInfoDTO {

	private String fullname;

	private  String username;

	private String email;

	private Status status;

	private String role;

	private String token;

	private String refreshToken;
}
