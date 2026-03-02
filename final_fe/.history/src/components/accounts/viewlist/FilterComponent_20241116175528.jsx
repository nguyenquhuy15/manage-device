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
        status: values.role,
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
              <Col md={2}>
                <Form.Group className="mb-2">
                  <Form.Select
                    size="md"
                    name="role"
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
