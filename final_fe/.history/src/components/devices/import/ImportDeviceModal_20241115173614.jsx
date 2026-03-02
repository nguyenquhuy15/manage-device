import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { apiConfig } from "../../../config";

import { Form, Button, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import DeviceTableComponent from "./DeviceTableComponent";
import useNotification from "../../../hooks/useNotification";
import DeviceApi from "../../../api/DeviceApi";

const ImportDeviceModal = React.memo((props) => {
  const formRef = useRef();
const [showSuccessMessage, showErrorMessage] = useNotification();
  const initForm = {
    excelFile: "",
  };

  const validationForm = Yup.object({
    excelFile: Yup.string().required("Required"),
  });

    const existsByDeviceCode = useCallback(async (code) => {
      return await DeviceApi.existsByCode(code);
    }, []);

const statusMapping = {
  "Rảnh": "AVAILABLE",
  "Đang sử dụng": "INUSE",
  "Bảo trì": "MAINTENANCE",
};

const prepareDeviceData = (device) => {
  return {
    code: device.code,
    name: device.name,
    typeName: device.typeName,
    price: device.price,
    managersName: device.managersName,
    status: statusMapping[device.status],
    laboratoriesName: device.laboratoriesName,
  };
};

const handleSubmitForm = async ({
  setFieldError,
  setStatus,
  setSubmitting,
}) => {
  try {
    if (props.devices && props.devices.length > 0) {
      for (const device of props.devices) {
        const preparedDevice = prepareDeviceData(device);

        // Gọi API kiểm tra thiết bị đã tồn tại hay chưa
        const isDeviceExist = await .checkDeviceExist(preparedDevice.code)

        if (isDeviceExist) {
          // Nếu thiết bị đã tồn tại, bạn có thể chọn bỏ qua hoặc cập nhật
          const shouldUpdate = window.confirm(
            `Thiết bị với mã ${preparedDevice.code} đã tồn tại. Bạn có muốn cập nhật thông tin thiết bị này không?`
          );
          if (!shouldUpdate) {
            continue; 
          }
        }
        await props.onSubmit(
          preparedDevice.code,
          preparedDevice.name,
          preparedDevice.typeName,
          preparedDevice.price,
          preparedDevice.managersName,
          preparedDevice.status,
          preparedDevice.laboratoriesName
        );
      }
      showSuccessMessage("Import thành công!");
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
