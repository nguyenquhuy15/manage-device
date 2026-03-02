import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { apiConfig } from "../../../config";
import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import DeviceTableComponent from "./DeviceTableComponent";

const ImportDeviceModal = React.memo((props) => {
  const formRef = useRef();

  const initForm = {
    excelFile: "",
  };

  const validationForm = Yup.object({
    excelFile: Yup.string().required("Required"),
  });

const handleSubmitForm = async (
  { setFieldError, setStatus, setSubmitting }
) => {
  try {
    if (props.devices && props.devices.length > 0) {
      for (const device of props.devices) {
        // Gọi hàm onSubmit cho từng thiết bị
        await props.onSubmit(
          device.code,
          device.name,
          device.typeName,
          device.price,
          device.managersName,
          device.status,
          device.laboratoriesName
        );
      }
    }

  } catch (error) {
    // Xử lý lỗi
    if (error.response && error.response.status === 400) {
      setFieldError("excelFile", JSON.stringify(error.response.data.exception));
    } else {
      console.error("Unexpected error:", error);
      setFieldError("excelFile", "An unexpected error occurred");
    }
    setStatus({ success: false });
  } finally {
    // Kết thúc quá trình submit
    setSubmitting(false);
  }
};

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
        <Modal show={true} onHide={props.hideModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Import Devices</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Form id="import-device-form" onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="required">Choose File</Form.Label>
                <Form.Control
                  size="lg"
                  type="file"
                  accept=".xlsx, .xls"
                  name="excelFile"
                  isInvalid={Boolean(touched.excelFile && errors.excelFile)}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    props.onChangeExcelFile(
                      e,
                      e.target.files[0],
                      setFieldError,
                      setFieldValue
                    );
                  }}
                />
                <Form.Text className="text-muted">
                  <a
                    href={`${apiConfig.baseUrl}/files/excel/templates/ImportDevicesIntoTableTemplate`}
                  >
                    Download Import Devices Template
                  </a>
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.excelFile}
                </Form.Control.Feedback>
              </Form.Group>
            </Form>

            {props.isShowTable && (
              <DeviceTableComponent devices={props.devices} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.hideModal}>
              Close
            </Button>
            <ButtonWithLoading
              form="import-device-form"
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
            >
              Import
            </ButtonWithLoading>
          </Modal.Footer>
        </Modal>
      )}
    </Formik>
  );
});

export default ImportDeviceModal;
