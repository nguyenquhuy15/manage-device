import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ResetPasswordComponent from "../../components/auth/ResetPasswordComponent";
import UserApi from "../../api/UserApi";
import AuthApi from "../../api/AuthApi";

const ResetPasswordPage = () => {

  const navigate = useNavigate();

  const existsByUsernameOrEmail = useCallback(async usernameOrEmail => {
    return await UserApi.existsByUsernameOrEmail(usernameOrEmail);
  }, []);

  const resetPassword = useCallback(async (usernameOrEmail) => {
    await AuthApi.sendResetPasswordEmail(usernameOrEmail);
    // redirect notification page
    navigate("/auth/reset-password-notification");
  }, []);


  return (
    <>
      <Helmet title="Forgot Password" />
      <ResetPasswordComponent
        existsByUsernameOrEmail={existsByUsernameOrEmail}
        resetPassword={resetPassword}
      />
    </>
  )
};

export default ResetPasswordPage;
