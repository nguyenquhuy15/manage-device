import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const UpdateComponent = React.memo((props) => {
  const formRef = useRef();
  const { info } = props;

  const initForm = {
    devicesCode: info?.devicesCode || "",
    devicesName: info?.devicesName || "",
    loansName: info?.loansName || "",
    loansContact: info?.loansContact || "",
    loansInfo: info?.loansInfo || "",
    loansLoanDate: info?.loansLoanDate || "",
    loansQuantity: info?.loansQuantity || "",
    loansReturnDate: info?.loansReturnDate || "",
    loansPurpose: info?.loansPurpose || "",
  };

  const validationForm = Yup.object({
    loansReturnDate: Yup.date().required("Required"),
    loansPurpose: Yup.string().required("Required"),
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(info.id, values.loansReturnDate, values.loansPurpose);
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
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label className="required">
                            Ngày bảo trì
                          </Form.Label>
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
