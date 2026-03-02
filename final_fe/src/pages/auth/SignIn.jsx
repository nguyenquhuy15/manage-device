import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
import SignInComponent from "../../components/auth/SignInComponent";
import AuthApi from "../../api/AuthApi";
import { MESSAGE } from "../../constants";
import storage from "../../utils/storage";
import { refreshUserInfo } from "../../redux/reducers/UserInfoSlide";

const SignInPage = (props) => {

  const navigate = useNavigate();

  const login = useCallback(async (username, password, isRememberMe) => {
    try {
      const userInfo = await AuthApi.login(username, password);
      // save remember
      storage.saveRememberMe(isRememberMe);
      // save userInfo to storage
      storage.saveUserInfo(
        userInfo.id,
        userInfo.fullname,
        userInfo.email,
        userInfo.status,
        userInfo.role,
        userInfo.token,
        userInfo.refreshToken);
      // refresh redux
      props.refreshUserInfo();
      // redirect Home page
      navigate("/");
    } catch (error) {
      // login fail
      if (error.response.status == 401) {
        throw new Error(MESSAGE.LOGIN_WRONG_USERNAME_OR_PASSWORD);
      } else if (error.response.status == 403) {
        throw new Error(MESSAGE.LOGIN_BLOCKED_ACCOUNT);
      } else {
        throw error;
      }
    }
  }, []);

  const resendActiveAccountEmail = useCallback(async (username) => {
    await AuthApi.resendActiveAccountEmail(username);
  }, []);

  return (
    <>
      <Helmet title="Sign In" />
      <SignInComponent
        login={login}
        resendActiveAccountEmail={resendActiveAccountEmail}
      />
    </ >
  )
};

export default connect(
  null,
  { refreshUserInfo }
)(SignInPage);