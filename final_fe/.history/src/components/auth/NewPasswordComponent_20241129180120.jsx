import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Card, Button, Form } from "react-bootstrap";
import WithLoading from "../../hoc/withLoading";

const NewPasswordComponent = React.memo((props) => {

  const initForm = {
    username: props.username,
    password: '',
    confirmPassword: '',
  };

  const validationForm = Yup.object({
    password: Yup.string()
      .min(6, 'Must be between 6 and 20 characters')
      .max(20, 'Must be between 6 and 20 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Confirm Password do not match')
  });

  const handleSubmitForm = async (values) => {
    await props.resetNewPassword(values.password);
  };

  const ButtonWithLoading = WithLoading(Button);

  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">New password</h1>
        <p className="lead">Enter your new password for {props.username} account</p>
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
                    <Form.Label className="required">Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      value={values.username}
                      disabled={true}
                      isInvalid={Boolean(touched.username && errors.username)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="required">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter your new password"
                      value={values.password}
                      isInvalid={Boolean(touched.password && errors.password)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {!!touched.password && (
                      <Form.Control.Feedback type="invalid">
                        {errors.password}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="required">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Enter your new password"
                      value={values.confirmPassword}
                      isInvalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {!!touched.confirmPassword && (
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
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
                      Reset password
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

export default NewPasswordComponent;
