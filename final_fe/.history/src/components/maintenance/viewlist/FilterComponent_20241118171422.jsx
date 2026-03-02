import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FilterComponent = (props) => {
  const formRef = useRef();

  const statusMapping = {
    DONE: "Đã sửa xong",
    INUSE: "Đang sửa chữa",
  };

  const initForm = {
    description: props.currentFilter.description || "",
    status: props.currentFilter.status || "",
    date: props.currentFilter.date || "",
  };

  const handleSubmitForm = (values) => {
    if (
      props.currentFilter.description !== values.description ||
      props.currentFilter.status !== values.status ||
      props.currentFilter.date !== values.date
    ) {
      props.setCurrentFilter({
        description: values.description,
        status: values.status,
        date: values.date,
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
        <Form onSubmit={handleSubmit} className="filter-form">
          <Row className="align-items-center">
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Select
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  className="filter-select"
                >
                  <option value="" disabled>
                    Chọn kiểu sửa chữa
                  </option>
                  {props.types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.description}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  className="filter-select"
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
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Control
                  type="date"
                  name="date"
                  value={values.date}
                  isInvalid={Boolean(touched.date && errors.date)}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="filter-input"
                />
                {touched.date && errors.date && (
                  <Form.Control.Feedback type="invalid">
                    {errors.date}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-100"
              >
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
