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





              {/* manager */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Chọn người quản lý</Form.Label>
                <Form.Control
                  size="md"
                  as="select"
                  name="managersId"
                  value={values.managersId}
                  isInvalid={Boolean(touched.managersId && errors.managersId)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Chọn người quản lý
                  </option>
                  {props.managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.name}
                    </option>
                  ))}
                </Form.Control>
                {!!touched.managersId && (
                  <>
                    <Form.Control.Feedback type="invalid">
                      {errors.managersId}
                    </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>

              {/* Price */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Giá</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  name="price"
                  placeholder="Nhập giá"
                  value={values.price}
                  isInvalid={Boolean(touched.price && errors.price)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.price && (
                  <Form.Control.Feedback type="invalid">
                    {errors.price}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              {/* Purchase Date */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Ngày mua</Form.Label>
                <Form.Control
                  size="md"
                  type="date"
                  name="purchaseDate"
                  placeholder="Nhập ngày mua"
                  value={values.purchaseDate}
                  isInvalid={Boolean(
                    touched.purchaseDate && errors.purchaseDate
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.purchaseDate && (
                  <Form.Control.Feedback type="invalid">
                    {errors.purchaseDate}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              {/* Ngay ban giao */}
              <Form.Group className="mb-3">
                <Form.Label className="required">
                  Ngày bàn giao thiết bị
                </Form.Label>
                <Form.Control
                  size="md"
                  type="date"
                  name="detailsAssignmentDate"
                  placeholder="Nhập ngày bản giao thiết bị"
                  value={values.detailsAssignmentDate}
                  isInvalid={Boolean(
                    touched.detailsAssignmentDate &&
                      errors.detailsAssignmentDate
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.detailsAssignmentDate && (
                  <Form.Control.Feedback type="invalid">
                    {errors.detailsAssignmentDate}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              {/* Status */}
              <Form.Group className="mb-2">
                <Form.Label className="required">Trạng thái</Form.Label>
                <Form.Select
                  size="md"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="AVAILABLE">Rảnh</option>
                  <option value="INUSE">Đang sử dụng</option>
                  <option value="MAINTENANCE">Bảo trì</option>
                </Form.Select>
              </Form.Group>

              {/* lab */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Phòng thí nghiệm</Form.Label>
                <Form.Control
                  size="md"
                  as="select"
                  name="laboratoriesId"
                  value={values.laboratoriesId}
                  isInvalid={Boolean(
                    touched.laboratoriesId && errors.laboratoriesId
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Chọn phòng thí nghiệm
                  </option>
                  {props.labs.map((lab) => (
                    <option key={lab.id} value={lab.id}>
                      {lab.name}
                    </option>
                  ))}
                </Form.Control>
                {!!touched.laboratoriesId && (
                  <>
                    <Form.Control.Feedback type="invalid">
                      {errors.laboratoriesId}
                    </Form.Control.Feedback>
                  </>
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
