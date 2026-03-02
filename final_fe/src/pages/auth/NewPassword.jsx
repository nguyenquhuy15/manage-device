import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import NewPasswordComponent from "../../components/auth/NewPasswordComponent";
import NewPasswordErrorNotification from "../../components/auth/NewPasswordErrorNotification";
import AuthApi from "../../api/AuthApi";
import useNotification from "../../hooks/useNotification";

const NewPasswordPage = () => {

  const navigate = useNavigate();
  const [showSuccessMessage, _] = useNotification();

  const [username, setUsername] = useState('');

  const [queryParameters] = useSearchParams();
  const token = queryParameters.get("token");

  // get username from token
  useEffect(() => {
    if (token) {
      getUsernameFromForgotPasswordToken();
    }
  }, []);

  const getUsernameFromForgotPasswordToken = async () => {
    try {
      const data = await AuthApi.getUsernameFromForgotPasswordToken(token);
      setUsername(data);
    } catch (error) {
      if (error.response.status == 400) {
        // ignore
      } else {
        console.log(error);
      }
    }
  }

  const resetNewPassword = useCallback(async (newPassword) => {
    await AuthApi.resetNewPassword(token, newPassword);
    // show notification
    showSuccessMessage("Reset password successfully!");
    // redirect notification page
    navigate("/auth/sign-in");
  }, []);

  if (!username) {
    return <NewPasswordErrorNotification />
  }

  return (
    <>
      <Helmet title="New Password" />
      <NewPasswordComponent
        username={username}
        resetNewPassword={resetNewPassword}
      />
    </>
  )
};

export default NewPasswordPage;
