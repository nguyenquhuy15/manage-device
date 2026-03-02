import React, { useEffect, useRef } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { Formik } from "formik";

const SearchComponent = (props) => {

    const formRef = useRef();

    const initForm = {
        value: props.currentSearch
    }

    const handleSubmitForm = (values) => {
        if (values.value != props.currentSearch) {
            props.setCurrentSearch(values.value);
            if (props.resetPaging) props.resetPaging();
            if (props.resetCurrentSort) props.resetCurrentSort();
        }
    }

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
                handleBlur,
                handleChange,
                handleSubmit,
                values,
            }) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={8}>
                            <Form.Group>
                                <Form.Control
                                    size="md"
                                    type="text"
                                    placeholder="Tìm kiếm ..."
                                    name="value"
                                    value={values.value}
                                    onBlur={handleBlur}
                                    onChange={handleChange} />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Button type="submit" variant="primary" size="md">
                                Tìm kiếm
                            </Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
};

export default SearchComponent;