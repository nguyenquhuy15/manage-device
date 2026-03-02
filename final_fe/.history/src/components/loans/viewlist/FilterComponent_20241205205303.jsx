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
  };



  const validationForm = Yup.object({
    loanDate: Yup.date()
      .min(new Date(1970, 10, 10), "Must be greater than 1970")
      .test(
        "loanDateGreaterThanloansReturnDate",
        "Must be less than return date",
        (loanDate, obj) => {
          let loansReturnDate = obj.parent.loansReturnDate;
          if (!loanDate || !loansReturnDate) {
            return true;
          }

          let min = new Date(loanDate);
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
    returnDate: Yup.date()
      .min(new Date(1970, 10, 10), "Must be greater than 1970")
      .test(
        "loansReturnDateLessThanloanDate",
        "Must be greater than min date",
        (loansReturnDate, obj) => {
          let loanDate = obj.parent.loanDate;
          if (!loanDate || !loansReturnDate) {
            return true;
          }

          let min = new Date(loanDate);
          let max = new Date(loansReturnDate);

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
      props.currentFilter.loansReturnDate !== values.loansReturnDate
    ) {
      props.setCurrentFilter({
        loansLoanDate: values.loansLoanDate,
        loansReturnDate: values.loansReturnDate,
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
                    name="loansReturnDate"
                    value={values.loansReturnDate}
                    isInvalid={Boolean(touched.loansReturnDate && errors.loansReturnDate)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!touched.loansReturnDate && (
                    <Form.Control.Feedback type="invalid">
                      {errors.loansReturnDate}
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
