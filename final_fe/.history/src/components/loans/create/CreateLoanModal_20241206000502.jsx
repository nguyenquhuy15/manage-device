import React, { useEffect, useMemo, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import EmployeeNoDataComponent from "./EmployeeNoDataComponent";
import EmployeeTableComponent from "./EmployeeTableComponent";

const CreateLoanModal = React.memo((props) => {

    const formRef = useRef();

    const initForm = {
        name: '',
        contact: '',
        info: '',
        loanDate: '',
        purpose: ''
    };

    const validationForm = Yup.object({
      name: Yup.string()
        .required("Required")
        .max(100, "Must be less than 100 characters")
        .test(
          "checkExistsName",
          "This name is already registered.",
          async (name) => {
            // call api
            const isExists = await props.existsByName(name);
            return !isExists;
          }
        ),
      contact: Yup.string().required("Required"),
      info: Yup.string()
        .min(6, "Must be between 6 and 20 characters")
        .max(30, "Must be between 6 and 20 characters")
        .required("Bắt buộc")
        .email("Invalid email address"),
      loanDate: Yup.date().required("Bắt buộc"),
      purpose: Yup.string().required("Bắt buộc"),
    });

    const handleSubmitForm = async (values) => {
        await props.onSubmit(values.name, values.contact, values.info, values.loanDate, values.purpose);
    }

    useEffect(() => {
        formRef.current?.resetForm();
    }, [props.timeRefreshForm]);

    const ButtonWithLoading = WithLoading(Button);

    const getDevices = (loanId) => {
        return props.devices.filter((device) => device.id != loanId);
    }

    return (
      <Formik
        initialValues={initForm}
        validationSchema={validationForm}
        onSubmit={handleSubmitForm}
        validateOnChange={false}
        innerRef={formRef}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <Modal show={true} onHide={props.hideModal}>
            <Modal.Header closeButton>Taọ yêu cầu mượn thiết bị</Modal.Header>
            <Modal.Body className="m-3">
              <Form id="create-department-form" onSubmit={handleSubmit}>
                {/* Name */}
                <Form.Group className="mb-3">
                  <Form.Label className="required">Lớp</Form.Label>
                  <Form.Control
                    size="md"
                    type="text"
                    name="name"
                    placeholder="Enter name"
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

                {/* Người đại diện */}
                <Form.Group className="mb-3">
                  <Form.Label className="required">Người đại diện</Form.Label>
                  <Form.Control
                    size="md"
                    type="text"
                    name="contact"
                    placeholder="Enter name"
                    value={values.contact}
                    isInvalid={Boolean(touched.contact && errors.contact)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!touched.contact && (
                    <Form.Control.Feedback type="invalid">
                      {errors.contact}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Mail */}
                <Form.Group className="mb-3">
                  <Form.Label className="required">Email</Form.Label>
                  <Form.Control
                    size="md"
                    type="text"
                    name="info"
                    placeholder="Enter email"
                    value={values.info}
                    isInvalid={Boolean(touched.info && errors.info)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {!!touched.info && (
                    <Form.Control.Feedback type="invalid">
                      {errors.info}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>

                {/* Manager */}
                <Form.Group className="mb-3">
                  <Form.Label className="required">Manager</Form.Label>
                  <Form.Control
                    size="md"
                    as="select"
                    name="managerId"
                    value={values.managerId}
                    isInvalid={Boolean(touched.managerId && errors.managerId)}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <option disabled value="">
                      Select Manager
                    </option>
                    {props.managers.map((account) => (
                      <option value={account.id} key={account.id}>
                        {account.fullname}
                      </option>
                    ))}
                  </Form.Control>
                  {!!touched.managerId && (
                    <>
                      <Form.Control.Feedback type="invalid">
                        {errors.managerId}
                      </Form.Control.Feedback>
                    </>
                  )}
                </Form.Group>
              </Form>

              {!props.isShowTable ? (
                <Button variant="secondary" onClick={props.showTable}>
                  Add Employees
                </Button>
              ) : getEmployees(values.managerId).length == 0 &&
                props.isSearchEmpty() ? (
                <EmployeeNoDataComponent />
              ) : (
                <EmployeeTableComponent
                  // table
                  employees={getEmployees(values.managerId)}
                  // sorting
                  currentSort={props.currentSort}
                  setCurrentSort={props.setCurrentSort}
                  resetCurrentSort={props.resetCurrentSort}
                  // search
                  currentSearch={props.currentSearch}
                  setCurrentSearch={props.setCurrentSearch}
                  // refresh table
                  timeRefreshTable={props.timeRefreshTable}
                  onResetTable={props.onResetTable}
                  // checkbox
                  addingIds={props.addingIds}
                  setAddingIds={props.setAddingIds}
                />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.hideModal}>
                Close
              </Button>{" "}
              <div className="text-center">
                <ButtonWithLoading
                  form="create-department-form"
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  Create
                </ButtonWithLoading>
              </div>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    );
});

export default CreateLoanModal;