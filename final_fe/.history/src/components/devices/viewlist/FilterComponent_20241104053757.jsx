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
    minDate: Yup.date()
      .min(new Date(1970, 10, 10), "Must be greater than 1970")
      .test(
        "minDateGreaterThanMaxDate",
        "Must be less than max date",
        (minDate, obj) => {
          let maxDate = obj.parent.maxDate;
          if (!minDate || !maxDate) {
            return true;
          }

          let min = new Date(minDate);
          let max = new Date(maxDate);

          if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
            return true;
          }

          if (min > max) {
            return false;
          }

          return true;
        }
      ),
    maxDate: Yup.date()
      .min(new Date(1970, 10, 10), "Must be greater than 1970")
      .test(
        "maxDateLessThanMinDate",
        "Must be greater than min date",
        (maxDate, obj) => {
          let minDate = obj.parent.minDate;
          if (!minDate || !maxDate) {
            return true;
          }

          let min = new Date(minDate);
          let max = new Date(maxDate);

          if (min < new Date(1970, 10, 10) || max < new Date(1970, 10, 10)) {
            return true;
          }

          if (max < min) {
            return false;
          }

          return true;
        }
      ),
    minMember: Yup.number()
      .positive("Must be greater than 0")
      .integer("Must be integer")
      .test(
        "minMemberGreaterThanMaxMember",
        "Must be less than max member",
        (minMember, obj) => {
          let maxMember = obj.parent.maxMember;
          if (
            minMember &&
            maxMember &&
            minMember > 0 &&
            maxMember > 0 &&
            minMember > maxMember
          ) {
            return false;
          }
          return true;
        }
      ),
    maxMember: Yup.number()
      .positive("Must be greater than 0")
      .integer("Must be integer")
      .test(
        "maxMemberLessThanMinMember",
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
