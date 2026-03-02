import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";
import withRouter from "../../hoc/withRouter";

import DeviceApi from "../../api/DeviceApi";


import DetailDeviceComponent from "../../components/devices/viewdetail/DetailDeviceComponent";

const DetailDevicePage = (props) => {
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

  const deviceId = props.router.params.id;

  /**
   * Detail Device Info
   */
  const [detailDeviceInfo, setDetailDeviceInfo] = useState({
    code: "",
    name: "",
    typeName: "",
    price: "",
    purchaseDate: "",
    warrantyDate: "",
    status: "",
    managersName: "",
    laboratoriesName: "",
  });

  return (
    <>
      <Helmet title="Detail Device" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Thông tin thiết bị</h1>
        <DetailDeviceComponent />
      </Container>
    </>
  );
};

export default withRouter(DetailDevicePage);
