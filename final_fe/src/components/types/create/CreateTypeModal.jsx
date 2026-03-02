import React, { useEffect, useMemo, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const CreateTypeModal = React.memo((props) => {
  const formRef = useRef();
  

  const initForm = {
    name: "",
    code: ""
  };

  const validationForm = Yup.object({
    name: Yup.string()
      .required("Required")
      .max(100, "Must be less than 100 characters")
      .test("checkExistsName", "Tên này đã được đăng ký.", async (name) => {
        // call api
        const isExists = await props.existsByName(name);
        return !isExists;
      }),
    code: Yup.string().required("Required")
      .max(100, "Must be less than 100 characters")
      .test("checkExistsCode", "Mã này đã được đăng ký.", async (code) => {
        // call api
        const isExists = await props.existsByCode(code);
        return !isExists;
      }),
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(
      values.name,
      values.code,
    
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
          <Modal.Header closeButton>Tạo loại thiết bị</Modal.Header>
          <Modal.Body className="m-3">
            <Form id="create-type-form" onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Tên loại thiết bị</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  name="name"
                  value={values.name}
                  isInvalid={Boolean(touched.name && errors.name)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.name && (
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              {/* Code */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Code</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  name="code"
                  placeholder="Nhập mã thiết bị"
                  value={values.code}
                  isInvalid={Boolean(touched.code && errors.code)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.code && (
                  <Form.Control.Feedback type="invalid">
                    {errors.code}
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
                form="create-type-form"
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

export default CreateTypeModal;
