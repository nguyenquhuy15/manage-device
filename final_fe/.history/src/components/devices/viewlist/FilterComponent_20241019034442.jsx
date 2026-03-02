import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FilterComponent = (props) => {
  const formRef = useRef();

  const initForm = {
    name: props.currentFilter.name,
    typeName: props.currentFilter.typeName,
    status: props.currentFilter.status,
    laboratoriesName: props.currentFilter.laboratoriesName,
  };

  // const validationForm = Yup.object({
  //   minDate: Yup.date()
  //     .min(new Date(1970, 10, 10), "Must be greater than 1970")
  //     .test(
  //       "minDateGreaterThanMaxDate",
  //       "Must be less than max date",
  //       (minDate, obj) => {
  //         let maxDate = obj.parent.maxDate;
  //         if (!minDate || !maxDate) {
  //           return true;
  //         }

  //         let min = new Date(minDate);
  //         let max = new Date(maxDate);

  //         if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
  //           return true;
  //         }

  //         if (min > max) {
  //           return false;
  //         }

  //         return true;
  //       }
  //     ),
  //   maxDate: Yup.date()
  //     .min(new Date(1970, 10, 10), "Must be greater than 1970")
  //     .test(
  //       "maxDateLessThanMinDate",
  //       "Must be greater than min date",
  //       (maxDate, obj) => {
  //         let minDate = obj.parent.minDate;
  //         if (!minDate || !maxDate) {
  //           return true;
  //         }

  //         let min = new Date(minDate);
  //         let max = new Date(maxDate);

  //         if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
  //           return true;
  //         }

  //         if (max < min) {
  //           return false;
  //         }

  //         return true;
  //       }
  //     ),
  //   minMember: Yup.number()
  //     .positive("Must be greater than 0")
  //     .integer("Must be integer")
  //     .test(
  //       "minMemberGreaterThanMaxMember",
  //       "Must be less than max member",
  //       (minMember, obj) => {
  //         let maxMember = obj.parent.maxMember;
  //         if (
  //           minMember &&
  //           maxMember &&
  //           minMember > 0 &&
  //           maxMember > 0 &&
  //           minMember > maxMember
  //         ) {
  //           return false;
  //         }
  //         return true;
  //       }
  //     ),
  //   maxMember: Yup.number()
  //     .positive("Must be greater than 0")
  //     .integer("Must be integer")
  //     .test(
  //       "maxMemberLessThanMinMember",
  //       "Must be greater than min member",
  //       (maxMember, obj) => {
  //         let minMember = obj.parent.minMember;
  //         if (
  //           minMember &&
  //           maxMember &&
  //           minMember > 0 &&
  //           maxMember > 0 &&
  //           maxMember < minMember
  //         ) {
  //           return false;
  //         }
  //         return true;
  //       }
  //     ),
  // });

  const handleSubmitForm = (values) => {
    if (
      props.currentFilter.name != values.name ||
      props.currentFilter.typeName != values.typeName ||
      props.currentFilter.status != values.status ||
      props.currentFilter.laboratoriesName != values.laboratoriesName
    ) {
      props.setCurrentFilter({
        name: values.name,
        typeName: values.typeName,
        status: values.status,
        laboratoriesName: values.laboratoriesName,
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
              <Col md={5}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="bo"
                        name="name"
                        placeholder="Enter the name"
                        value={values.name}
                        isInvalid={Boolean(touched.name && errors.name)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.name && (
                        <Form.Control.Feedback type="invalid">
                          {errors.name}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="date"
                        name="maxDate"
                        placeholder="Enter max date"
                        value={values.maxDate}
                        isInvalid={Boolean(touched.maxDate && errors.maxDate)}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.maxDate && (
                        <Form.Control.Feedback type="invalid">
                          {errors.maxDate}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
              <Col md={5}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="number"
                        name="minMember"
                        placeholder="Enter min member"
                        value={values.minMember}
                        isInvalid={Boolean(
                          touched.minMember && errors.minMember
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.minMember && (
                        <Form.Control.Feedback type="invalid">
                          {errors.minMember}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="number"
                        name="maxMember"
                        placeholder="Enter max member"
                        value={values.maxMember}
                        isInvalid={Boolean(
                          touched.maxMember && errors.maxMember
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.maxMember && (
                        <Form.Control.Feedback type="invalid">
                          {errors.maxMember}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
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
