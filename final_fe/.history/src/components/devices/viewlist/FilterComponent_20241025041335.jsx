import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FilterComponent = (props) => {
  const formRef = useRef();

  const initForm = {
    status: props.currentFilter.status,
    // purchaseDate: props.currentFilter.purchaseDate,
    // warrantyDate: props.currentFilter.warrantyDate,
  };

  // const validationForm = Yup.object({
  //   purchaseDate: Yup.date()
  //     .min(new Date(1970, 10, 10), "Must be greater than 1970")
  //     .test(
  //       "PurchaseDateGreaterThanWarrantyDate",
  //       "Must be less than warranty date",
  //       (purchaseDate, obj) => {
  //         let warrantyDate = obj.parent.warrantyDate;
  //         if (!purchaseDate || !warrantyDate) {
  //           return true;
  //         }

  //         let purchase = new Date(purchaseDate);
  //         let warranty = new Date(warrantyDate);

  //         if (
  //           purchase < new Date(1970, 10, 10) ||
  //           warranty < new Date(1970, 10, 10)
  //         ) {
  //           return true;
  //         }

  //         if (purchase > warranty) {
  //           return false;
  //         }

  //         return true;
  //       }
  //     ),
  //   warrantyDate: Yup.date()
  //     .min(new Date(1970, 10, 10), "Must be greater than 1970")
  //     .test(
  //       "WarrantyDateLessThanPurchaseDate",
  //       "Must be greater than purchase date",
  //       (warrantyDate, obj) => {
  //         let purchaseDate = obj.parent.purchaseDate;
  //         if (!purchaseDate || !warrantyDate) {
  //           return true;
  //         }

  //         let min = new Date(purchaseDate);
  //         let max = new Date(warrantyDate);

  //         if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
  //           return true;
  //         }

  //         if (max < min) {
  //           return false;
  //         }

  //         return true;
  //       }
  //     ),
  // });

  const handleSubmitForm = (values) => {
    if (
      props.currentFilter.status != values.status
      
    ) {
      props.setCurrentFilter({
        status: values.status,
        purchaseDate: values.purchaseDate,
        warrantyDate: values.warrantyDate,
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
      // validationSchema={validationForm}
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
                  <Col>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="button"
                        name="name"
                        placeholder="Chọn trạng thái"
                        value={values.status}
                        isInvalid={Boolean(touched.status && errors.status)}
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
                </Row>
              </Col>
              <Col md={5}>
                <Row>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="date"
                        name="purchaseDate"
                        placeholder="Chọn ngày mua"
                        value={values.purchaseDate}
                        isInvalid={Boolean(
                          touched.purchaseDate && errors.purchaseDate
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.purchaseDate && (
                        <Form.Control.Feedback type="invalid">
                          {errors.purchaseDate}
                        </Form.Control.Feedback>
                      )}
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Control
                        size="md"
                        type="date"
                        name="warrantyDate"
                        placeholder="Chọn ngày bảo trì"
                        value={values.warrantyDate}
                        isInvalid={Boolean(
                          touched.warrantyDate && errors.warrantyDate
                        )}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {!!touched.warrantyDate && (
                        <Form.Control.Feedback type="invalid">
                          {errors.warrantyDate}
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
