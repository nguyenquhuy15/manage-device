package com.uet.service;

import com.uet.config.security.AccountBlockException;
import com.uet.model.dto.auth.LoginInfoDTO;
import com.uet.model.form.account.CreatingAccountForm;
import com.uet.model.form.auth.ChangePasswordForm;
import com.uet.model.form.auth.ResetPasswordForm;

public interface AuthService {

	LoginInfoDTO login(String username) throws AccountBlockException;

	void createAccount(CreatingAccountForm form);

	void sendAccountRegistrationTokenViaEmail(String username);

	void activeAccount(String registrationToken);

	void sendAccountForgotPasswordTokenViaEmail(String usernameOrEmail);

	String getUsernameFromForgotPasswordToken(String forgotPasswordToken);
	
	void resetPassword(ResetPasswordForm form);

	void changePassword(ChangePasswordForm form);
}
