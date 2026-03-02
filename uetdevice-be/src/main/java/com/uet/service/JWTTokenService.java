package com.uet.service;

import org.springframework.security.core.Authentication;

import com.uet.model.dto.auth.TokenDTO;
import com.uet.model.entity.Account;
import com.uet.model.entity.Token;

import jakarta.servlet.http.HttpServletRequest;

public interface JWTTokenService {

	String generateJWTToken(String username);

	Authentication parseTokenToUserInformation(HttpServletRequest request);

	Token generateRefreshToken(Account account);

	boolean isRefreshTokenValid(String refreshToken);

	TokenDTO getNewToken(String refreshToken);
	
	void deleteRefreshToken(Account account);
}