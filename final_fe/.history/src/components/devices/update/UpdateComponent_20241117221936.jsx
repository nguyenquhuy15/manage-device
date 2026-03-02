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
    laboratoriesManagerName: info?.managersId || "",
    status: info?.status || "",
    laboratoriesId: info?.laboratoriesId || "",
    detailsNote: info?.detailsNote || "",
    detailsAssignmentDate: info?.detailsAssignmentDate || "",
    maintenanceDate: info?.maintenanceDate || "",
    maintenanceDescription: info?.maintenanceDescription || "",
  };

  const validationForm = Yup.object({
    managersId: Yup.number().required("Required"),
    status: Yup.string().required("Required"),
    laboratoriesId: Yup.number().required("Required"),
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(
      info.id,
      values.managersId,
      values.status,
      values.laboratoriesId,
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
      <Card className="shadow-sm">
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
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">
                        Loại thiết bị
                      </Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="typeName"
                        value={values.typeName}
                        disabled
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
                        disabled
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Ngày mua</Form.Label>
                      <Form.Control
                        size="md"
                        type="date"
                        name="purchaseDate"
                        value={values.purchaseDate}
                        disabled
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">
                        Ngày bàn giao thiết bị
                      </Form.Label>
                      <Form.Control
                        size="md"
                        type="date"
                        name="detailsAssignmentDate"
                        value={values.detailsAssignmentDate}
                        isInvalid={Boolean(
                          touched.detailsAssignmentDate &&
                            errors.maintedetailsAssignmentDatenanceDate
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.detailsAssignmentDate}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">
                        Người quản lý
                      </Form.Label>
                      <Form.Control
                        size="md"
                        as="select"
                        name="managersId"
                        value={values.managersId}
                        isInvalid={Boolean(
                          touched.managersId && errors.managersId
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option disabled value="">
                          Chọn người quản lý
                        </option>
                        {props.managers?.map((manager) => (
                          <option value={manager.id} key={manager.id}>
                            {manager.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.managersId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Trạng thái</Form.Label>
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
                      <Form.Label className="required">
                        Phòng thí nghiệm
                      </Form.Label>
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
                        {props.labs?.map((lab) => (
                          <option value={lab.id} key={lab.id}>
                            {lab.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.laboratoriesId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">
                        Thông tin bảo trì
                      </Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
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
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Ghi chú</Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="detailsNote"
                        value={values.detailsNote}
                        isInvalid={Boolean(
                          touched.detailsNote && errors.detailsNote
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.detailsNote}
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
