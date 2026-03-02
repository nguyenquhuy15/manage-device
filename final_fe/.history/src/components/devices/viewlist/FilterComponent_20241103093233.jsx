import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";

const FilterComponent = (props) => {
  const formRef = useRef();

  const initForm = {
    status: props.currentFilter.status,
  };

  const handleSubmitForm = (values) => {
    if (props.currentFilter.status != values.status) {
      props.setCurrentFilter({
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
                  <Form.Label className="required">Chọn trạng thái</Form.Label>
                  <Form.Select
                    size="md"
                    name="role"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="AVAILABLE">ADMIN</option>
                    <option value="INUSE">EMPLOYEE</option>
                    <option value="MANAGER">MANAGER</option>
                  </Form.Select>
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
