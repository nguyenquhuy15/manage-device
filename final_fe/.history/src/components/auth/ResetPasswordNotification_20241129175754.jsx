import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";

const ResetPasswordNotification = React.memo((props) => (
  <>
    <Helmet title="Reset Password" />
    <div className="text-center">
      <h2>Quên mật khẩu!</h2>
      <p className="lead fw-normal mt-3 mb-4">
        Chúng tôi đã gửi email cho bạn. Vui lòng kiểm tra email của bạn để đặt
        lại mật khẩu
      </p>
      <Link to="/auth/sign-in">
        <Button variant="primary" size="lg">
          Return to Login
        </Button>
      </Link>
    </div>
  </>
));

export default ResetPasswordNotification;