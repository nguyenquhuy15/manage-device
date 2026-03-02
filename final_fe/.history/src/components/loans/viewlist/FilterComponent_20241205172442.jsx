import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FilterComponent = (props) => {
  const formRef = useRef();


  const initForm = {
    loansLoanDate:
      props.currentFilter.loansLoanDate !== undefined
        ? props.currentFilter.loansLoanDate
        : "",
    loansReturnDate:
      props.currentFilter.loansReturnDate !== undefined
        ? props.currentFilter.loansReturnDate
        : "",
  };



  const validationForm = Yup.object({
    loanDate: Yup.date()
      .min(new Date(1970, 10, 10), "Must be greater than 1970")
      .test(
        "loansLoanDateGreaterThanloansReturnDate",
        "Must be less than return date",
        (loansLoanDate, obj) => {
          let loansReturnDate = obj.parent.loansReturnDate;
          if (!loansLoanDate || !loansReturnDate) {
            return true;
          }

          let min = new Date(loansLoanDate);
          let max = new Date(loansReturnDate);

          if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
            return true;
          }

          if (min > max) {
            return false;
          }

          return true;
        }
      ),
    loansReturnDate: Yup.date()
      .min(new Date(1970, 10, 10), "Must be greater than 1970")
      .test(
        "returnDateLessThanloansLoanDate",
        "Must be greater than min date",
        (returnDate, obj) => {
          let loansLoanDate = obj.parent.loansLoanDate;
          if (!loansLoanDate || !returnDate) {
            return true;
          }

          let min = new Date(loansLoanDate);
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
      props.currentFilter.loansLoanDate !== values.loansLoanDate ||
      props.currentFilter.returnDate !== values.returnDate
    ) {
      props.setCurrentFilter({
        loansLoanDate: values.loansLoanDate,
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
                    name="loansLoanDate"
                    value={values.loansLoanDate}
                    isInvalid={Boolean(touched.loansLoanDate && errors.loansLoanDate)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!touched.loansLoanDate && (
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
