import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const UpdateComponent = React.memo((props) => {
  const formRef = useRef();
  const { info } = props;

  const initForm = {
    name: info?.name || "",
    contact: info?.contact || "",
    info: info?.info || "",
    loanDate: info?.loanDate || "",
    quantity: info?.quantity || "",
    returnDate: info?.returnDate || "",
    purpose: info?.purpose || "",
  };

  const validationForm = Yup.object({
    returnDate: Yup.date().required("Bạn cần phải nhập ngày trả thiết bị"),
    purpose: Yup.string().required("Required"),
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(info.id, values.returnDate, values.purpose);
  };

  useEffect(() => {
    formRef.current?.resetForm();
  }, [props.timeRefreshForm]);

  const ButtonWithLoading = WithLoading(Button);

  return (
    <Container className="my-4 px-3">
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
                      <Form.Label className="required">Tên lớp</Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="name"
                        value={values.name}
                        disabled={true}
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">
                        Tên người đại diện
                      </Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="contact"
                        value={values.contact}
                        disabled={true}
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Email</Form.Label>
                      <Form.Control
                        size="md"
                        type="text"
                        name="info"
                        value={values.info}
                        disabled={true}
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label className="required">Ngày muợn</Form.Label>
                      <Form.Control
                        size="md"
                        type="date"
                        name="loanDate"
                        value={values.loanDate}
                        disabled={true}
                        className="bg-light"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={12}>
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="required">
                            Ngày trả thiết bị
                          </Form.Label>
                          <Form.Control
                            size="md"
                            type="date"
                            name="returnDate"
                            value={values.returnDate}
                            isInvalid={Boolean(
                              touched.returnDate && errors.returnDate
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.returnDate}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="required">Ghi chú</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            name="purpose"
                            value={values.purpose}
                            isInvalid={Boolean(
                              touched.purpose && errors.purpose
                            )}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.purpose}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>
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
                      Submit
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
