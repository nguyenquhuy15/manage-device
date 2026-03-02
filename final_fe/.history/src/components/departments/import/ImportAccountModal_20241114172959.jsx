import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { apiConfig } from "../../../config";
import { ROLE } from "../../../constants";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import AccountTableComponent from "./AccountTableComponent";

const ImportDeviceModal = React.memo((props) => {

    const formRef = useRef();

    const initForm = {
        excelFile: ""
    };

    const validationForm = Yup.object({
        excelFile: Yup.string()
            .required('Required')
    });

    const handleSubmitForm = async (values, { setFieldError, setStatus, setSubmitting }) => {

        // manager
        let managerAccounts = props.accounts.filter(account => account.role == ROLE.MANAGER);
        let managerId = managerAccounts.length == 0 ? null : managerAccounts[0].id;

        // employees
        let employeeAccounts = props.accounts.filter(account => account.role == ROLE.EMPLOYEE);
        let employeeIds = employeeAccounts.map(account => account.id);

        if (managerAccounts.length >= 2) {
            setFieldError("excelFile", "There is only a manager in the department");
            setStatus({ success: false });
            setSubmitting(false);
            return;
        }

        if (employeeAccounts.length == 0) {
            setFieldError("excelFile", "There is at least a employee in the department");
            setStatus({ success: false });
            setSubmitting(false);
            return;
        }

        try {
            await props.onSubmit(values.departmentId, managerId, employeeIds);
        } catch (error) {
            if (error.response.status === 400) {
                setFieldError("excelFile", JSON.stringify(error.response.data.exception));
                setStatus({ success: false });
                setSubmitting(false);
            } else {
                throw error;
            }
        }
    }

    useEffect(() => {
        formRef.current?.resetForm();
    }, [props.timeRefreshForm]);

    const ButtonWithLoading = WithLoading(Button);

    return (
        <Formik
            initialValues={initForm}
            validationSchema={validationForm}
            onSubmit={handleSubmitForm}
            innerRef={formRef}
        >
            {({
                errors,
                setFieldError,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
                setFieldValue,
            }) => (
                <Modal
                    show={true}
                    onHide={props.hideModal}
                >
                    <Modal.Header closeButton>Import Devices </Modal.Header>
                    <Modal.Body className="m-3">
                        <Form id="import-device-form" onSubmit={handleSubmit}>
                            {/* Department */}
                            <Form.Group className="mb-3">
                                <Form.Label className="required">Department</Form.Label>
                                <Form.Control
                                    size="md"
                                    as="select"
                                    name="departmentId"
                                    value={values.departmentId}
                                    isInvalid={Boolean(touched.departmentId && errors.departmentId)}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                >
                                    <option disabled value="">Select Department</option>
                                    {
                                        props.departments.map(department =>
                                            <option value={department.id} key={department.id}>
                                                {department.name}
                                            </option>
                                        )
                                    }
                                </Form.Control>
                                {!!touched.departmentId && (
                                    <>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.departmentId}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            </Form.Group>

                            {/* Excel File */}
                            <Form.Group className="mb-3">
                                <Form.Label className="required">Choose File</Form.Label>
                                <Form.Control
                                    size="md"
                                    type="file"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    name="excelFile"
                                    // value={values.excelFile}
                                    isInvalid={Boolean(touched.excelFile && errors.excelFile)}
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e);
                                        props.onChangeExcelFile(e, e.target.files[0], setFieldError, setFieldValue);
                                    }}
                                />
                                <small>
                                    <a href={`${apiConfig.baseUrl}/files/excel/templates/ImportAccountIntoDepartmentTemplateFile`}>
                                        Download Import Accounts Template
                                    </a>
                                </small>
                                {!!touched.excelFile && (
                                    <>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.excelFile}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            </Form.Group>
                        </Form>

                        {/* Account Table */}
                        {props.isShowTable && <AccountTableComponent accounts={props.accounts} />}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={props.hideModal}>
                            Close
                        </Button>{" "}
                        <div className="text-center">
                            <ButtonWithLoading
                                form="import-account-form"
                                type="submit"
                                variant="primary"
                                isLoading={isSubmitting}
                            >
                                Import
                            </ButtonWithLoading>
                        </div>
                    </Modal.Footer>
                </Modal>
            )}
        </Formik >
    );
});

export default ImportDeviceModal;