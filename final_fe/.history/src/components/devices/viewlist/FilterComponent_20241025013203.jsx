import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FilterComponent = (props) => {
  const formRef = useRef();

  const initForm = {
    status: props.currentFilter.status,
    purchaseDate: props.currentFilter.purchaseDate,
    status: props.currentFilter.status,
    laboratoriesName: props.currentFilter.laboratoriesName,
  };

  const handleSubmitForm = (values) => {
    if (
      props.currentFilter.status != values.status ||
      props.currentFilter.purchaseDate != values.purchaseDate ||
      props.currentFilter.warrantyDate != values.warrantyDate
    ) {
      props.setCurrentFilter({
        name: values.name,
        typeName: values.typeName,
        status: values.status,
        laboratoriesName: values.laboratoriesName,
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
      // validationSchema={validationForm}
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
              <Col md={5}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="string"
                        name="name"
                        placeholder="Enter the name"
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
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="string"
                        name="typeName"
                        placeholder="Enter the type"
                        value={values.typeName}
                        isInvalid={Boolean(touched.typeName && errors.typeName)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.typeName && (
                        <Form.Control.Feedback type="invalid">
                          {errors.typeName}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="string"
                        name="status"
                        placeholder="Trạng thái"
                        value={values.status}
                        isInvalid={Boolean(touched.status && errors.status)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.status && (
                        <Form.Control.Feedback type="invalid">
                          {errors.status}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="string"
                        name="laboratoriesName"
                        placeholder="Phòng Thí Nghiệm"
                        value={values.laboratoriesName}
                        isInvalid={Boolean(
                          touched.laboratoriesName && errors.laboratoriesName
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.laboratoriesName && (
                        <Form.Control.Feedback type="invalid">
                          {errors.laboratoriesName}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
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
