import React, { useEffect, useMemo, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
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
    status: ""
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
        "Tên đăng nhập này đã tồn tại.",
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
        "Email này đã tồn tại.",
        async (email) => {
          // call api
          const isExists = await props.existsByEmail(email);
          return !isExists;
        }
      ),
    password: Yup.string()
      .min(6, "Must be between 6 and 20 characters")
      .max(20, "Must be between 6 and 20 characters")
      .required("Bắt buộc"),
    status: Yup.string().required("Bắt buộc")
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(
      values.firstname,
      values.lastname,
      values.username,
      values.email,
      values.password,
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
            <Form id="create-account-form" onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="required">Tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstname"
                      placeholder="Nhập tên của bạn"
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
                    <Form.Label className="required">Họ</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastname"
                      placeholder="Nhập họ của bạn"
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
                <Form.Label className="required">Tên tài khoản</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Nhập tên tài khoản"
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
                  placeholder="Nhập email"
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
                <Form.Label className="required">Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Điền mật khẩu"
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
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.hideModal}>
              Close
            </Button>{" "}
            <div className="text-center">
              <ButtonWithLoading
                form="create-account-form"
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
