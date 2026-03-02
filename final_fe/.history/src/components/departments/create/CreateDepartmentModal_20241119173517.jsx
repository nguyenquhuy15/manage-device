import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const CreateDepartmentModal = React.memo((props) => {
  const formRef = useRef();

  const initForm = {
    name: "",
    managerName: "",
    email: "",
    phone: "",
    departmentsId: "",
    subjectsId: "",
    location: "",
  };

  const validationForm = Yup.object({
    name: Yup.string()
      .required("Required")
      .max(100, "Must be less than 100 characters")
      .test(
        "checkExistsName",
        "This name is already registered.",
        async (name) => {
          const isExists = await props.existsByName(name);
          return !isExists;
        }
      ),
    managerName: Yup.string()
      .required("Required")
      .max(100, "Must be less than 100 characters")
      .test(
        "checkExistsName",
        "This manager name is already registered.",
        async (name) => {
          const isExists = await props.existsByName(name);
          return !isExists;
        }
      ),
    email: Yup.string()
      .required("Required")
      .max(30, "Must be less than 30 characters"),
    phone: Yup.string().required("Required"),
    location: Yup.string().required("Required"),
    departmentsId: Yup.string()
      .nullable()
      .test(
        "at-least-one",
        "Bạn phải chọn ít nhất một khoa hoặc môn học.",
        function (value) {
          const { subjectsId } = this.parent;
          return value || subjectsId;
        }
      ),
    subjectsId: Yup.string()
      .nullable()
      .test(
        "at-least-one",
        "Bạn phải chọn ít nhất một khoa hoặc môn học.",
        function (value) {
          const { departmentsId } = this.parent;
          return value || departmentsId;
        }
      ),
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(
      values.name,
      values.managerName,
      values.email,
      values.phone,
      values.departmentsId,
      values.subjectsId,
      values.location
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
          <Modal.Header closeButton>Tạo phòng thí nghiệm</Modal.Header>
          <Modal.Body className="m-3">
            <Form id="create-department-form" onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label className="required">
                  Tên phòng thí nghiệm
                </Form.Label>
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

              {/* Manager */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Tên người quản lý</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  name="managerName"
                  value={values.managerName}
                  isInvalid={Boolean(touched.managerName && errors.managerName)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.managerName && (
                  <Form.Control.Feedback type="invalid">
                    {errors.managerName}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Email</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
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

              {/* Phone */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Số điện thoại</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  name="phone"
                  placeholder="Nhập số điện thoại người quản lý"
                  value={values.phone}
                  isInvalid={Boolean(touched.phone && errors.phone)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.phone && (
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                )}
              </Form.Group>

              {/* Khoa */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Khoa</Form.Label>
                <Form.Control
                  size="md"
                  as="select"
                  name="departmentsId"
                  value={values.departmentsId}
                  isInvalid={Boolean(
                    touched.departmentsId && errors.departmentsId
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Chọn phòng ban
                  </option>
                  {props.departments.map((department) => (
                    <option value={department.id} key={department.id}>
                      {department.departmentsName}
                    </option>
                  ))}
                </Form.Control>
                {!!touched.departmentsId && (
                  <>
                    <Form.Control.Feedback type="invalid">
                      {errors.departmentsId}
                    </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>

              {/* Bộ môn */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Bộ môn</Form.Label>
                <Form.Control
                  size="md"
                  as="select"
                  name="subjectsId"
                  value={values.subjectsId}
                  isInvalid={Boolean(touched.subjectsId && errors.subjectsId)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Chọn bộ môn
                  </option>
                  {props.departments.map((subject) => (
                    <option value={subject.id} key={subject.id}>
                      {subject.subjectsName}
                    </option>
                  ))}
                </Form.Control>
                {!!touched.subjectsId && (
                  <>
                    <Form.Control.Feedback type="invalid">
                      {errors.subjectsId}
                    </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>
              {/* Vị trí */}
              <Form.Group className="mb-3">
                <Form.Label className="required">Vị trí</Form.Label>
                <Form.Control
                  size="md"
                  type="text"
                  name="location"
                  value={values.location}
                  isInvalid={Boolean(touched.location && errors.location)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {!!touched.location && (
                  <Form.Control.Feedback type="invalid">
                    {errors.location}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
              {/* Thông báo lỗi nếu không chọn departmentId hoặc subjectsId */}
              {(touched.departmentsId || touched.subjectsId) &&
                !values.departmentsId &&
                !values.subjectsId && (
                  <div className="text-danger">
                    Bạn phải chọn ít nhất một khoa hoặc bộ môn.
                  </div>
                )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.hideModal}>
              Đóng
            </Button>
            <div className="text-center">
              <ButtonWithLoading
                form="create-department-form"
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
              >
                Tạo
              </ButtonWithLoading>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
});

export default CreateDepartmentModal;
