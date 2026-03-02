import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";
import withRouter from "../../hoc/withRouter";

import DeviceApi from "../../api/DeviceApi";



import * as XLSX from "xlsx";
import { Manager } from "react-popper";
import DetailDeviceComponent from "../../components/devices/viewdetail/DetailDeviceComponent";

const DetailDevicePage = (props) => {
console.log(props.withRouter);

  return (
    <>
      <Helmet title="Detail Device" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Thông tin thiết bị</h1>
        <DetailDeviceComponent/>
        
      </Container>
    </>
  );
};

export default withRouter(DetailDevicePage);
