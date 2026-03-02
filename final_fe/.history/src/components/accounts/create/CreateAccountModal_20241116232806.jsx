import React, { useEffect, useMemo, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const CreateAccountModal = React.memo((props) => {
  const formRef = useRef();
  

  const initForm = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  };

  const validationForm = Yup.object({
    firstname: Yup.string()
      .max(50, "Must be less than 50 characters")
      .required("Bắt buộc"),
    lastname: Yup.string()
      .max(50, "Must be less than 50 characters")
      .required("Bắt buộc"),
    username: Yup.string()
      .min(6, "Must be between 6 and 20 characters")
      .max(20, "Must be between 6 and 20 characters")
      .required("Bắt buộc")
      .test(
        "checkExistsUsername",
        "This username is already registered.",
        async (username) => {
          // call api
          const isExists = await props.existsByUsername(username);
          return !isExists;
        }
      ),
    email: Yup.string()
      .min(6, "Must be between 6 and 20 characters")
      .max(20, "Must be between 6 and 20 characters")
      .required("Bắt buộc")
      .email("Invalid email address")
      .test(
        "checkExistsEmail",
        "This email is already registered.",
        async (email) => {
          // call api
          const isExists = await props.existsByEmail(email);
          return !isExists;
        }
      ),
    password: Yup.string()
      .min(6, "Must be between 6 and 20 characters")
      .max(20, "Must be between 6 and 20 characters")
      .required("Bắt buộc")
  });

  const handleSubmitForm = async (
    values,
    { setFieldValue, setErrors, setStatus, setSubmitting }
  ) => {
    console.log(values);
    await props.signUp(
      values.firstname,
      values.lastname,
      values.username,
      values.email,
      values.password
    );
  };

  useEffect(() => {
    formRef.current?.resetForm();
  }, [props.timeRefreshForm]);

  const ButtonWithLoading = WithLoading(Button);

  return (
    <Formik
      initialValues={initForm}
      validationSchema={validationForm}
      onSubmit={handleSubmitForm}
      validateOnChange={false}
      innerRef={formRef}
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
        <Modal show={true} onHide={props.hideModal}>
          <Modal.Header closeButton>Tạo thiết bị</Modal.Header>
          <Modal.Body className="m-3">
            <Form id="create-device-form" onSubmit={handleSubmit}>






            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.hideModal}>
              Close
            </Button>{" "}
            <div className="text-center">
              <ButtonWithLoading
                form="create-device-form"
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
              >
                Create
              </ButtonWithLoading>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
});

export default CreateAccountModal;
