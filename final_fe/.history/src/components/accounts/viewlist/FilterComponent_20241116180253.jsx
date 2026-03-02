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
                    value={values.role}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Chọn quyền
                    </option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                  </Form.Select>
                </Form.Group>
                <Col />
                
                <Col>
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
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="BLOCK">BLOCK</option>
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
