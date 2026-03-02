import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FilterComponent = (props) => {
  const formRef = useRef();


  const initForm = {
    loanDate:
      props.currentFilter.loanDate !== undefined
        ? props.currentFilter.loanDate
        : "",
    returnDate:
      props.currentFilter.returnDate !== undefined
        ? props.currentFilter.returnDate
        : "",
    status:
      props.currentFilter.status !== undefined
        ? props.currentFilter.status
        : "",
  };



  const validationForm = Yup.object({
    loanDate: Yup.date()
      .min(new Date(1970, 10, 10), "Must be greater than 1970")
      .test(
        "loanDateGreaterThanreturnDate",
        "Must be less than return date",
        (loanDate, obj) => {
          let returnDate = obj.parent.returnDate;
          if (!loanDate || !returnDate) {
            return true;
          }

          let min = new Date(loanDate);
          let max = new Date(returnDate);

          if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
            return true;
          }

          if (min > max) {
            return false;
          }

          return true;
        }
      ),
    returnDate: Yup.date()
      .min(new Date(1970, 10, 10), "Must be greater than 1970")
      .test(
        "returnDateLessThanloanDate",
        "Must be greater than min date",
        (returnDate, obj) => {
          let loanDate = obj.parent.loanDate;
          if (!loanDate || !returnDate) {
            return true;
          }

          let min = new Date(loanDate);
          let max = new Date(returnDate);

          if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
            return true;
          }

          if (max < min) {
            return false;
          }

          return true;
        }
      ),
  });

  const handleSubmitForm = (values) => {
    if (
      props.currentFilter.loanDate !== values.loanDate ||
      props.currentFilter.returnDate !== values.returnDate ||
      props.currentFilter.status !== values.status 
    ) {
      props.setCurrentFilter({
        loanDate: values.loanDate,
        returnDate: values.returnDate,
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
                <Form.Group>
                  <Form.Control
                    size="md"
                    type="date"
                    name="loanDate"
                    value={values.loanDate}
                    isInvalid={Boolean(touched.loanDate && errors.loanDate)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!touched.loanDate && (
                    <Form.Control.Feedback type="invalid">
                      {errors.loanDate}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Control
                    size="md"
                    type="date"
                    name="returnDate"
                    value={values.returnDate}
                    isInvalid={Boolean(touched.returnDate && errors.returnDate)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!touched.returnDate && (
                    <Form.Control.Feedback type="invalid">
                      {errors.returnDate}
                    </Form.Control.Feedback>
                  )}
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
