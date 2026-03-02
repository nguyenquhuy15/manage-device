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
    maintenanceDescription: props.currentFilter.maintenanceDescription || "",
    maintenanceStatus: props.currentFilter.maintenanceStatus || "",
    maintenanceDate: props.currentFilter.maintenanceDate || "",
  };

  const handleSubmitForm = (values) => {
    if (
      props.currentFilter.maintenanceDescription !==
        values.maintenanceDescription ||
      props.currentFilter.maintenanceStatus !== values.maintenanceStatus ||
      props.currentFilter.maintenanceDate !== values.maintenanceDate
    ) {
      props.setCurrentFilter({
        maintenanceDescription: values.maintenanceDescription,
        maintenanceStatus: values.status,
        maintenanceDate: values.maintenanceDate,
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
                  name="maintenanceDescription"
                  value={values.maintenanceDescription}
                  onChange={handleChange}
                  className="filter-select"
                >
                  <option value="" disabled>
                    Chọn kiểu sửa chữa
                  </option>
                  {props.types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.maintenanceDescription}
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
                  name="maintenanceDate"
                  value={values.maintenanceDate}
                  isInvalid={Boolean(
                    touched.maintenanceDate && errors.maintenanceDate
                  )}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="filter-input"
                />
                {touched.maintenanceDate && errors.maintenanceDate && (
                  <Form.Control.Feedback type="invalid">
                    {errors.maintenanceDate}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Button type="submit" variant="primary" size="md" className="w-5">
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
