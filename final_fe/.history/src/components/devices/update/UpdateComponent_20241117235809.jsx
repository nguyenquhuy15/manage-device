import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const UpdateComponent = React.memo((props) => {
  const formRef = useRef();
  const { info } = props;

  const statusMapping = {
    AVAILABLE: "Rảnh",
    INUSE: "Đang sử dụng",
    MAINTENANCE: "Bảo trì",
  };

  const initForm = {
    code: info?.code || "",
    name: info?.name || "",
    typeName: info?.typeName || "",
    price: info?.price || 0,
    purchaseDate: info?.purchaseDate || "",
    laboratoriesManagerName: info?.laboratoriesManagerName || "",
    status: info?.status || "",
    laboratoriesId: info?.laboratoriesId || "",
    detailsNote: info?.detailsNote || "",
    detailsAssignmentDate: info?.detailsAssignmentDate || "",
    maintenanceDate: info?.maintenanceDate || "",
    maintenanceDescription: info?.maintenanceDescription || "",
  };

  const validationForm = Yup.object({
    laboratoriesManagerName: Yup.string().required("Required"),
    status: Yup.string().required("Required"),
    laboratoriesId: Yup.number().required("Required"),
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(
      info.id,
      values.laboratoriesId,
      values.status,
      values.laboratoriesManagerName,
      values.detailsNote,
      values.detailsAssignmentDate,
      values.maintenanceDate,
      values.maintenanceDescription
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
                      <Form.Label className="required">Tên Thiết bị</Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Giá</Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">
                        Người sử dụng
                      </Form.Label>
                      <Form.Select
                        size="md"
                        name="user"
                        onChange={handleChange}
                      >
                        <option value="">Chọn người sử dụng</option>
                        {/* Add user options here */}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Nhà cung cấp</Form.Label>
                      <Form.Select
                        size="md"
                        name="supplier"
                        onChange={handleChange}
                      >
                        <option value="">Chọn Nhà Cung Cấp</option>
                        {/* Add supplier options here */}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Phòng</Form.Label>
                      <Form.Select
                        size="md"
                        name="department"
                        onChange={handleChange}
                      >
                        <option value="">Chọn Phòng ban</option>
                        {/* Add department options here */}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Trạng Thái</Form.Label>
                      <Form.Select
                        size="md"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                      >
                        <option value="">Chọn trạng thái</option>
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
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="required">Cấu Hình</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="configuration"
                        value={values.configuration}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label className="required">Ghi Chú</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        name="notes"
                        value={values.notes}
                        onChange={handleChange}
                      />
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
