import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const FilterComponent = React.memo((props) => {
    const formRef = useRef();

    const initForm = {
        minDate: props.currentFilter.minDate,
        maxDate: props.currentFilter.maxDate,
        role: props.currentFilter.role,
        status: props.currentFilter.status
    };

    const validationForm = Yup.object({
        minDate: Yup.date()
            .min(new Date(1970, 10, 10), 'Must be greater than 1970')
            .test('minDateGreaterThanMaxDate', 'Must be less than max date',
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
                }),
        maxDate: Yup.date()
            .min(new Date(1970, 10, 10), 'Must be greater than 1970')
            .test('maxDateLessThanMinDate', 'Must be greater than min date',
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
                })
    });

    const handleSubmitForm = (values) => {
        if (props.currentFilter.minDate != values.minDate
            || props.currentFilter.maxDate != values.maxDate
            || props.currentFilter.role != values.role
            || props.currentFilter.status != values.status) {
            props.resetPaging();
            props.resetCurrentSort();
            props.setCurrentFilter({
                minDate: values.minDate,
                maxDate: values.maxDate,
                role: values.role,
                status: values.status
            });
        }
    }

    useEffect(() => {
        formRef.current?.resetForm();
    }, [props.timeRefreshTable])

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
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                size="md"
                                                type="date"
                                                name="minDate"
                                                placeholder="Enter min Date"
                                                value={values.minDate}
                                                isInvalid={Boolean(touched.minDate && errors.minDate)}
                                                onBlur={handleBlur}
                                                onChange={handleChange} />
                                            {!!touched.minDate && (
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.minDate}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Control
                                                size="md"
                                                type="date"
                                                name="maxDate"
                                                placeholder="Enter max date"
                                                value={values.maxDate}
                                                isInvalid={Boolean(touched.maxDate && errors.maxDate)}
                                                onBlur={handleBlur}
                                                onChange={handleChange} />
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
                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                size="md"
                                                name="role"
                                                value={values.role}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Role</option>
                                                <option value='ADMIN'>ADMIN</option>
                                                <option value='EMPLOYEE'>EMPLOYEE</option>
                                                <option value='MANAGER'>MANAGER</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Select
                                                size="md"
                                                name="status"
                                                value={values.status}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Status</option>
                                                <option value='ACTIVE'>ACTIVE</option>
                                                <option value='BLOCK'>BLOCK</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={2}>
                                <Button type="submit" variant="primary" size="md" >
                                    Filter
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </>
            )}
        </Formik>
    );
});

export default FilterComponent;