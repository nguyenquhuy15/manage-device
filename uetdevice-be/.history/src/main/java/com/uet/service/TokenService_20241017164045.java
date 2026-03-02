package com.uet.service;

import com.uet.model.entity.Account;
import com.uet.model.entity.Token;

public interface TokenService {

	Token generateAccountRegistrationToken(Account account);

	void deleteAccountRegistrationToken(Account account);

	boolean isRegistrationTokenValid(String registrationToken);

	Token getRegistrationTokenByKey(String key);

	Token generateForgotPasswordToken(Account account);

	void deleteForgotPasswordToken(Account account);

	boolean isForgotPasswordTokenValid(String forgotPasswordToken);

	Token getForgotPasswordTokenByKey(String key);
}
