import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import SignUpComponent from "../../components/auth/SignUpComponent";
import UserApi from "../../api/UserApi";
import AuthApi from "../../api/AuthApi";

const SignUpPage = () => {

  const navigate = useNavigate();

  const existsByUsername = useCallback(async username => {
    return await UserApi.existsByUsername(username);
  }, []);

  const existsByEmail = useCallback(async email => {
    return await UserApi.existsByEmail(email);
  }, []);

  const signUp = useCallback(async (firstname, lastname, username, email, password) => {
    await AuthApi.signUp(firstname, lastname, username, email, password);
    // redirect notification page
    navigate("/auth/sign-up-notification");
  }, []);

  return (
    <>
      <Helmet title="Sign Up" />
      <SignUpComponent
        existsByUsername={existsByUsername}
        existsByEmail={existsByEmail}
        signUp={signUp}
      />
    </>
  )
};

export default SignUpPage;
