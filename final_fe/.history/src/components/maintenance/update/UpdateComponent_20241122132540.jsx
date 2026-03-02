import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const UpdateComponent = React.memo((props) => {
  const formRef = useRef();
  const { info } = props;

  const statusMapping = {
    DONE: "Đã sửa xong",
    UNFINISHED: "Đang sửa chữa",
  };

  const initForm = {
    code: info?.code || "",
    name: info?.name || "",
    maintenanceDate: info?.maintenanceDate || "",
    maintenanceAddress: info?.maintenanceAddress || "",
    maintenanceDescription: info?.maintenanceDescription || "",
    maintenanceNote: info?.maintenanceNote || "",
    maintenanceExpense: info?.maintenanceExpense || "",
    maintenanceStatus: info?.maintenanceStatus || "",
  };

  const validationForm = Yup.object({
    maintenanceExpense: Yup.number("Chi phí phải là số").required("Chi phí là bắt buộc"),
    maintenanceDate: Yup.date().required("Ngày bảo trì là bắt buộc"),
    maintenanceNote: Yup.string().required("Ghi chú là bắt buộc"),
    maintenanceDescription: Yup.string().required(
      "Thông tin bảo trì là bắt buộc"
    ),
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(
      info.id,
      values.maintenanceDate,
      values.maintenanceAddress,
      values.maintenanceDescription,
      values.maintenanceNote,
      values.maintenanceExpense,
      values.maintenanceStatus
    );
  };

  useEffect(() => {
    formRef.current?.resetForm();
  }, [props.timeRefreshForm]);

  const ButtonWithLoading = WithLoading(Button);

  return (
    <Container className="my-4">
      <Card className="shadow-sm border-light">
        <Card.Body>
          <Formik
            initialValues={initForm}
            validationSchema={validationForm}
            onSubmit={handleSubmitForm}
            validateOnChange={false}
            enableReinitialize={true}
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
              <Form id="update-device-form" onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Mã thiết bị</Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="code"
                        value={values.code}
                        disabled
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Tên thiết bị</Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="name"
                        value={values.name}
                        disabled
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Chi phí</Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="maintenanceExpense"
                        value={values.maintenanceExpense}
                        isInvalid={Boolean(
                          touched.maintenanceExpense &&
                            errors.maintenanceExpense
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.maintenanceExpense}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Địa chỉ</Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="maintenanceAddress"
                        value={values.maintenanceAddress}
                        disabled
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Ngày bảo trì</Form.Label>
                      <Form.Control
                        size="md"
                        type="date"
                        name="maintenanceDate"
                        value={values.maintenanceDate}
                        isInvalid={Boolean(
                          touched.maintenanceDate && errors.maintenanceDate
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.maintenanceDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Trạng thái</Form.Label>
                      <Form.Select
                        size="md"
                        name="maintenanceStatus"
                        value={values.maintenanceStatus}
                        onChange={handleChange}
                      >
                        <option value="" disabled>Chọn trạng thái</option>
                        {Object.entries(statusMapping).map(([key, label]) => (
                          <option value={key} key={key}>
                            {label}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Ghi chú</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="maintenanceNote"
                        value={values.maintenanceNote}
                        isInvalid={Boolean(
                          touched.maintenanceNote && errors.maintenanceNote
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.maintenanceNote}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">
                        Thông tin bảo trì
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="maintenanceDescription"
                        value={values.maintenanceDescription}
                        isInvalid={Boolean(
                          touched.maintenanceDescription &&
                            errors.maintenanceDescription
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.maintenanceDescription}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col className="text-end">
                    <ButtonWithLoading
                      form="update-device-form"
                      type="submit"
                      isLoading={isSubmitting}
                      variant="primary"
                      className="btn-sm me-2"
                    >
                      Cập nhật
                    </ButtonWithLoading>
                    <Button
                      variant="secondary"
                      onClick={props.hideModal}
                      className="btn-sm"
                    >
                      Đóng
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default UpdateComponent;
