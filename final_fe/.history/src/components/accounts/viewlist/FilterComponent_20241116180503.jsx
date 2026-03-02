import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button, InputGroup } from "react-bootstrap";
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
        role: values.role,
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
      onSubmit={handleSubmitForm}
      innerRef={formRef}
    >
      {({ handleChange, handleSubmit, values }) => (
        <Form onSubmit={handleSubmit}>
          <Row className="align-items-end">
            <Col md={2}>
              <Form.Group controlId="filterRole">
                <Form.Label>Quyền</Form.Label>
                <Form.Select
                  size="md"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
                  <option value="">Tất cả</option>
                  <option value="ADMIN">Admin</option>
                  <option value="MANAGER">Manager</option>
                  <option value="USER">User</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId="filterStatus">
                <Form.Label>Trạng thái</Form.Label>
                <Form.Select
                  size="md"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                >
                  <option value="">Tất cả</option>
                  <option value="ACTIVE">Hoạt động</option>
                  <option value="BLOCK">Bị khóa</option>
                  <option value="PENDING">Chờ duyệt</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={1} className="d-grid">
              <Button type="submit" variant="primary" size="md">
                Lọc
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default FilterComponent;
