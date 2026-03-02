import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ChangePasswordComponent from "../../components/auth/ChangePasswordComponent";
import AuthApi from "../../api/AuthApi";
import useNotification from "../../hooks/useNotification";
import storage from "../../utils/storage";
import { connect } from "react-redux";
import { refreshUserInfo } from "../../redux/reducers/UserInfoSlide";
import { MESSAGE } from "../../constants";

const ChangePasswordPage = (props) => {

  const navigate = useNavigate();
  const [showSuccessMessage, _] = useNotification();

  const changePassword = useCallback(async (oldPassword, newPassword) => {
    try {
      await AuthApi.changePassword(oldPassword, newPassword);
      // show notification
      showSuccessMessage("Change password successfully!");
      // remove storage
      storage.deleteUserInfo();
      // refresh redux
      props.refreshUserInfo();
      // redirect to Sign in page
      navigate("/auth/sign-in");
    } catch (error) {
      if (error.response.status == 400) {
        throw new Error(MESSAGE.CHANGE_PASSWORD_WRONG_OLD_PASSWORD);
      } else {
        throw error;
      }
    }
  }, []);

  return (
    <>
      <Helmet title="Change Password" />
      <ChangePasswordComponent
        changePassword={changePassword}
      />
    </>
  )
};

export default connect(
  null,
  { refreshUserInfo }
)(ChangePasswordPage);