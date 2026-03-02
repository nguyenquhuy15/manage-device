import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Card, Button, Form } from "react-bootstrap";
import WithLoading from "../../hoc/withLoading";

const ResetPasswordComponent = React.memo((props) => {

  const initForm = {
    usernameOrEmail: ''
  };

  const validationForm = Yup.object({
    usernameOrEmail: Yup.string()
      .required('Required')
      .test('checkExistsUsernameOrEmail', 'This username or email do not exists', async usernameOrEmail => {
        // call api
        const isExists = await props.existsByUsernameOrEmail(usernameOrEmail);
        return isExists;
      }),
  });

  const handleSubmitForm = async (values) => {
    await props.resetPassword(values.usernameOrEmail);
  };

  const ButtonWithLoading = WithLoading(Button);

  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">Đặt lại mật khẩu</h1>
        <p className="lead">Nhập email của bạn để đặt lại mật khẩu.</p>
      </div>

      <Card>
        <Card.Body>
          <div className="m-sm-3">
            <Formik
              initialValues={initForm}
              validationSchema={validationForm}
              onSubmit={handleSubmitForm}
              validateOnChange={false}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="required">
                      Tên người dùng / Email
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="usernameOrEmail"
                      placeholder="Nhập tên người dùng hoặc email của bạn"
                      value={values.usernameOrEmail}
                      isInvalid={Boolean(
                        touched.usernameOrEmail && errors.usernameOrEmail
                      )}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {!!touched.usernameOrEmail && (
                      <Form.Control.Feedback type="invalid">
                        {errors.usernameOrEmail}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <div className="text-center mt-3">
                    <ButtonWithLoading
                      isLoading={isSubmitting}
                      type="submit"
                      variant="primary"
                      size="lg"
                    >
                      Đặt lại mật khẩu
                    </ButtonWithLoading>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center mb-3">
        Don't have an account? <Link to="/auth/sign-up">Sign up</Link>
      </div>
    </>
  );
});

export default ResetPasswordComponent;
