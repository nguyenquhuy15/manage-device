import React, { useEffect, useRef } from "react";
import WithLoading from "../../../hoc/withLoading";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import "./UpdateComponent.css"; // Import file CSS

const UpdateComponent = React.memo((props) => {
  const formRef = useRef();
  const { info } = props;

  const statusMapping = {
    AVAILABLE: "Rảnh",
    INUSE: "Đang sử dụng",
    MAINTENANCE: "Bảo trì",
  };

  const initForm = {
    code: info?.code || "",
    name: info?.name || "",
    typeId: info?.typeId || "",
    typeName: info?.typeName || "",
    price: info?.price || 0,
    purchaseDate: info?.purchaseDate || "",
    laboratoriesManagerName: info?.laboratoriesManagerName || "",
    status: info?.status || "",
    laboratoriesId: info?.laboratoriesId || "",
    detailsNote: info?.detailsNote || "",
    detailsAssignmentDate: info?.detailsAssignmentDate || "",
    maintenanceDate: info?.maintenanceDate || "",
    maintenanceDescription: info?.maintenanceDescription || "",
  };

  const validationForm = Yup.object({
    status: Yup.string().required("Required"),
    laboratoriesId: Yup.number().required("Required"),
    laboratoriesManagerName: Yup.string().required("Required"),
  });

  const handleSubmitForm = async (values) => {
    await props.onSubmit(
      info.id,
      values.status,
      values.laboratoriesId,
      values.typeId,
      values.laboratoriesManagerName,
      values.detailsNote,
      values.detailsAssignmentDate,
      values.maintenanceDate,
      values.maintenanceDescription
    );
  };

  useEffect(() => {
    formRef.current?.resetForm();
  }, [props.timeRefreshForm]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f7f9fc"; // Màu nền toàn trang
    return () => {
      document.body.style.backgroundColor = ""; // Reset lại khi component bị unmount
    };
  }, []);

  const ButtonWithLoading = WithLoading(Button);

  return (
    <Container className="my-4 custom-container">
      <Card className="shadow-sm border-light custom-card">
        <Card.Body>
          <Formik
            initialValues={initForm}
            validationSchema={validationForm}
            onSubmit={handleSubmitForm}
            validateOnChange={false}
            enableReinitialize={true}
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
              <Form id="update-device-form" onSubmit={handleSubmit}>
                {/* Nội dung form */}
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default UpdateComponent;
