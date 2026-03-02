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
      .test("checkExistsName", "Tên này đã được đăng ký.", async (name) => {
        // call api
        const isExists = await props.existsByName(name);
        return !isExists;
      }),
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(
      values.code,
      values.name,
      values.price,
      values.typeId,
      values.laboratoriesId,
      values.purchaseDate,
      values.detailsAssignmentDate,
      values.status
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
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Tên thiết bị</Form.Label>
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

              {/* Type */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Loại thiết bị</Form.Label>
                <Form.Control
                  size="md"
                  as="select"
                  name="typeId"
                  value={values.typeId}
                  isInvalid={Boolean(touched.typeId && errors.typeId)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Chọn loại thiết bị
                  </option>
                  {props.loais.map((loai) => (
                    <option key={loai.id} value={loai.id}>
                      {loai.name}
                    </option>
                  ))}
                </Form.Control>
                {!!touched.typeId && (
                  <>
                    <Form.Control.Feedback type="invalid">
                      {errors.typeId}
                    </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>

              {/* manager */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Chọn người quản lý</Form.Label>
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
                    Chọn người quản lý
                  </option>
                  {props.managers.map((manager) => (
                    <option key={manager.id} value={manager.id}>
                      {manager.managerName}
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

export default CreateTypeModal;
