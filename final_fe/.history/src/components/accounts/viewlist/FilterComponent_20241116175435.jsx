import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FilterComponent = (props) => {
  const formRef = useRef();

  const initForm = {
    role: props.currentFilter.role || "",
    status: props.currentFilter.status || "",
  };

  const handleSubmitForm = (values) => {
    if (
      props.currentFilter.role !== values.role ||
      props.currentFilter.status !== values.status
    ) {
      props.setCurrentFilter({
        status: values.status,
        status: values.status,

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
      validationSchema={validationForm}
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
              <Col md={2}>
                <Form.Group className="mb-2">
                  <Form.Select
                    size="md"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Chọn trạng thái
                    </option>
                    {Object.entries(statusMapping).map(([key, label]) => (
                      <option value={key} key={key}>
                        {label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={5}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="text"
                        name="minPrice"
                        placeholder="Chọn giá nhỏ nhất"
                        value={values.minPrice}
                        isInvalid={Boolean(touched.minPrice && errors.minPrice)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.minPrice && (
                        <Form.Control.Feedback type="invalid">
                          {errors.minPrice}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="text"
                        name="maxPrice"
                        placeholder="Chọn giá lớn nhất"
                        value={values.maxPrice}
                        isInvalid={Boolean(touched.maxPrice && errors.maxPrice)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.maxPrice && (
                        <Form.Control.Feedback type="invalid">
                          {errors.maxPrice}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={2}>
                <Button type="submit" variant="primary" size="md">
                  Lọc
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
