import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FilterComponent = (props) => {
  const formRef = useRef();
  const statusMapping = {
    INUSE: "Đang sử dụng",
    RETURNED: "Đã trả",
  };

  const initForm = {
    loanDate: props.currentFilter.loanDate || "",
    returnDate: props.currentFilter.returnDate || "",
    status: props.currentFilter.status || "",
  };

  const validationForm = Yup.object({
    loanDate: Yup.date()
      .min(new Date(1970, 10, 10), "Phải lớn hơn năm 1970")
      .test(
        "loanDateGreaterThanreturnDate",
        "Phải nhỏ hơn ngày trả",
        (loanDate, obj) => {
          let returnDate = obj.parent.returnDate;
          if (!loanDate || !returnDate) return true;
          return new Date(loanDate) <= new Date(returnDate);
        }
      ),
    returnDate: Yup.date()
      .min(new Date(1970, 10, 10), "Phải lớn hơn năm 1970")
      .test(
        "returnDateLessThanloanDate",
        "Phải lớn hơn ngày mượn",
        (returnDate, obj) => {
          let loanDate = obj.parent.loanDate;
          if (!loanDate || !returnDate) return true;
          return new Date(returnDate) >= new Date(loanDate);
        }
      ),
  });

  const handleSubmitForm = (values) => {
    if (
      props.currentFilter.loanDate !== values.loanDate ||
      props.currentFilter.returnDate !== values.returnDate ||
      props.currentFilter.status !== values.status
    ) {
      props.setCurrentFilter(values);
      props.resetPaging();
      props.resetCurrentSort();
    }
  };

  useEffect(() => {
    formRef.current?.resetForm();
  }, [props.timeRefreshTable]);

  return (
    <Card className="p-3 mb-3">
      <Card.Title className="text-center">Lọc Thiết Bị</Card.Title>
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
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Ngày mượn</Form.Label>
                  <Form.Control
                    type="date"
                    name="loanDate"
                    value={values.loanDate}
                    isInvalid={Boolean(touched.loanDate && errors.loanDate)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.loanDate && (
                    <Form.Control.Feedback type="invalid">
                      {errors.loanDate}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Ngày trả</Form.Label>
                  <Form.Control
                    type="date"
                    name="returnDate"
                    value={values.returnDate}
                    isInvalid={Boolean(touched.returnDate && errors.returnDate)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.returnDate && (
                    <Form.Control.Feedback type="invalid">
                      {errors.returnDate}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Trạng thái</Form.Label>
                  <Form.Select
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
              <Col md={12}>
                <Button type="submit" variant="primary" className="w-100">
                  Lọc
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default FilterComponent;
