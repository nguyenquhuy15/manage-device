import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "react-bootstrap";

const SignUpNotification = React.memo((props) => (
  <>
    <Helmet title="Sign Up" />
    <div className="text-center">
      <h2>Đăng ký tài khoản thành công!</h2>
      <p className="lead fw-normal mt-3 mb-4">
        Chúng tôi đã gửi email xác minh cho bạn. Vui lòng kiểm tra email và xác
        minh tài khoản của bạn.
      </p>
      <Link to="/auth/sign-in">
        <Button variant="primary" size="lg">
          T
        </Button>
      </Link>
    </div>
  </>
));

export default SignUpNotification;