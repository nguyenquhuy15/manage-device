import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";

const FilterComponent = (props) => {
  const formRef = useRef();

  const initForm = {
    status: props.currentFilter.status,
    minPrice: props.currentFilter.minPrice,
    maxPrice: props.currentFilter.maxPrice,
  };
  const validationForm = Yup.object({
    minPrice: Yup.number()
      .positive("Must be greater than 0")
      .integer("Must be integer")
      .test(
        "minPriceGreaterThanMaxPrice",
        "Must be less than max price",
        (minPrice, obj) => {
          let maxPrice = obj.parent.maxPrice;
          if (
            minPrice &&
            maxPrice &&
            minPrice > 0 &&
            maxPrice > 0 &&
            minPrice > maxPrice
          ) {
            return false;
          }
          return true;
        }
      ),
    maxPrice: Yup.number()
      .positive("Must be greater than 0")
      .integer("Must be integer")
      .test(
        "maxPriceLessThanMinMember",
        "Must be greater than min member",
        (maxMember, obj) => {
          let minMember = obj.parent.minMember;
          if (
            minMember &&
            maxMember &&
            minMember > 0 &&
            maxMember > 0 &&
            maxMember < minMember
          ) {
            return false;
          }
          return true;
        }
      ),
  });

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
      {({ handleChange, handleSubmit, values }) => (
        <>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={2}>
                <Form.Group className="mb-2">
                  <Form.Select
                    size="md"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                  >
                    <option value="">Chọn trạng thái</option>
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="INUSE">INUSE</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                  </Form.Select>
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
