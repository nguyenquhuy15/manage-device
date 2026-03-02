import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { Card, Button, Form } from "react-bootstrap";
import WithLoading from "../../hoc/withLoading";
import { MESSAGE } from "../../constants";

const ChangePasswordComponent = React.memo((props) => {

  const initForm = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  };

  const validationForm = Yup.object({
    oldPassword: Yup.string()
      .required('Required'),
    newPassword: Yup.string()
      .min(6, 'Must be between 6 and 20 characters')
      .max(20, 'Must be between 6 and 20 characters')
      .required('Required'),
    confirmNewPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('newPassword')], 'Confirm Password do not match')
  });

  const handleSubmitForm = async (values, { setFieldValue, setFieldError, setStatus, setSubmitting }) => {
    try {
      await props.changePassword(values.oldPassword, values.newPassword);
    } catch (error) {
      if (error.message == MESSAGE.CHANGE_PASSWORD_WRONG_OLD_PASSWORD) {
        setStatus({ success: false });
        setSubmitting(false);
        setFieldError("oldPassword", MESSAGE.CHANGE_PASSWORD_WRONG_OLD_PASSWORD);
        setFieldValue("oldPassword", '', false);
        setFieldValue("newPassword", '', false);
        setFieldValue("confirmNewPassword", '', false);
      }
    }
  };

  const ButtonWithLoading = WithLoading(Button);

  return (
    <>
      <div className="text-center mt-4">
        <h1 className="h2">Change password</h1>
        <p className="lead">Enter your new password</p>
      </div>

      <Card>
        <Card.Body>
          <div className="m-sm-3">
            <Formik
              initialValues={initForm}
              validationSchema={validationForm}
              onSubmit={handleSubmitForm}
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
                    <Form.Label className="required">Old Password</Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      name="oldPassword"
                      placeholder="Enter old password"
                      autoComplete="current-password"
                      value={values.oldPassword}
                      isInvalid={Boolean(touched.oldPassword && errors.oldPassword)}
                      onBlur={handleBlur}
                      onChange={handleChange} />
                    {!!touched.oldPassword && (
                      <Form.Control.Feedback type="invalid">
                        {errors.oldPassword}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="required">New Password</Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      name="newPassword"
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      value={values.newPassword}
                      isInvalid={Boolean(touched.newPassword && errors.newPassword)}
                      onBlur={handleBlur}
                      onChange={handleChange} />
                    {!!touched.newPassword && (
                      <Form.Control.Feedback type="invalid">
                        {errors.newPassword}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="required">Confirm New Password</Form.Label>
                    <Form.Control
                      size="lg"
                      type="password"
                      name="confirmNewPassword"
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      value={values.confirmNewPassword}
                      isInvalid={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                      onBlur={handleBlur}
                      onChange={handleChange} />
                    {!!touched.confirmNewPassword && (
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmNewPassword}
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
                      Change password
                    </ButtonWithLoading>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Card.Body>
      </Card>
    </>
  );
});

export default ChangePasswordComponent;
