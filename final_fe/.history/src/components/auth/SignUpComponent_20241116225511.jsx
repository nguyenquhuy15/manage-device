import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import WithLoading from "../../hoc/withLoading";

const SignUpComponent = React.memo((props) => {

  const initForm = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationForm = Yup.object({
    firstname: Yup.string()
      .max(50, 'Must be less than 50 characters')
      .required('Required'),
    lastname: Yup.string()
      .max(50, 'Must be less than 50 characters')
      .required('Required'),
    username: Yup.string()
      .min(6, 'Must be between 6 and 20 characters')
      .max(20, 'Must be between 6 and 20 characters')
      .required('Required')
      .test('checkExistsUsername', 'This username is already registered.', async username => {
        // call api
        const isExists = await props.existsByUsername(username);
        return !isExists;
      }),
    email: Yup.string()
      .min(6, 'Must be between 6 and 20 characters')
      .max(20, 'Must be between 6 and 20 characters')
      .required('Required')
      .email('Invalid email address')
      .test('checkExistsEmail', 'This email is already registered.', async email => {
        // call api
        const isExists = await props.existsByEmail(email);
        return !isExists;
      }),
    password: Yup.string()
      .min(6, 'Must be between 6 and 20 characters')
      .max(20, 'Must be between 6 and 20 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('password')], 'Confirm Password do not match')
  });

  const handleSubmitForm = async (values, { setFieldValue, setErrors, setStatus, setSubmitting }) => {
    console.log(values);
    await props.signUp(
      values.firstname,
      values.lastname,
      values.username,
      values.email,
      values.password
    );
  };

  const ButtonWithLoading = WithLoading(Button);

  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">Welcome to our program</h1>
        <p className="lead"> Đăng kí để tiếp tục </p>
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
                <>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="required">Firstname</Form.Label>
                          <Form.Control
                            type="text"
                            name="firstname"
                            placeholder="Enter your firstname"
                            value={values.firstname}
                            isInvalid={Boolean(touched.firstname && errors.firstname)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {!!touched.firstname && (
                            <Form.Control.Feedback type="invalid">
                              {errors.firstname}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="required">Lastname</Form.Label>
                          <Form.Control
                            type="text"
                            name="lastname"
                            placeholder="Enter your lastname"
                            value={values.lastname}
                            isInvalid={Boolean(touched.lastname && errors.lastname)}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {!!touched.lastname && (
                            <Form.Control.Feedback type="invalid">
                              {errors.lastname}
                            </Form.Control.Feedback>
                          )}
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="required">Username</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter your username"
                        value={values.username}
                        isInvalid={Boolean(touched.username && errors.username)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.username && (
                        <Form.Control.Feedback type="invalid">
                          {errors.username}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="required">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={values.email}
                        isInvalid={Boolean(touched.email && errors.email)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.email && (
                        <Form.Control.Feedback type="invalid">
                          {errors.email}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="required">Password</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
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
                        placeholder="Enter your password"
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

                    <div className="mt-3 text-center">
                      <ButtonWithLoading
                        isLoading={isSubmitting}
                        type="submit"
                        variant="primary"
                        size="lg"
                      >
                        Register
                      </ButtonWithLoading>
                    </div>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </Card.Body>
      </Card>
      <div className="text-center mb-3">
        Already have account? <Link to="/auth/sign-in">Log in</Link>
      </div>
    </>
  );
});

export default SignUpComponent;
