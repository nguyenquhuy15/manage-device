import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";


const FilterComponent = (props) => {
  const formRef = useRef();

  const initForm = {
    status: props.currentFilter.status

  };


  const handleSubmitForm = (values) => {
    if (
      props.currentFilter.status != values.status
      
    ) {
      props.setCurrentFilter({
        status: values.status
      });
      props.resetPaging();
      props.resetCurrentSort();
    }
  };

  useEffect(() => {
    formRef.current?.resetForm();
  }, [props.timeRefreshTable]);

  return (
    <Formik
      initialValues={initForm}
      onSubmit={handleSubmitForm}
      innerRef={formRef}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label className="required">
                        Chọn trạng thái
                      </Form.Label>
                      <Form.Control
                        size="md"
                        as="select"
                        name="status"
                        value={values.status}
                        isInvalid={Boolean(touched.status && errors.status)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <option disabled value="">
                          Select Status
                        </option>
                        {props.statuss.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.status}
                          </option>
                        ))}
                      </Form.Control>
                      {!!touched.status && (
                        <>
                          <Form.Control.Feedback type="invalid">
                            {errors.status}
                          </Form.Control.Feedback>
                        </>
                      )}
                    </Form.Group>
              </Col>
              <Col md={2}>
                <Button type="submit" variant="primary" size="md">
                  Filter
                </Button>
              </Col>
            </Row>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default FilterComponent;
