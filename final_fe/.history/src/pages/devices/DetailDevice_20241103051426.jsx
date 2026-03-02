import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";
import withRouter from "../../hoc/withRouter";

import DeviceApi from "../../api/DeviceApi";

import DetailDeviceComponent from "../../components/devices/viewdetail/DetailDeviceComponent";

const DetailDevicePage = (props) => {


  const DetailDeviceComponentMemo = useMemo(
    () => <DetailDeviceComponent info={detailDeviceInfo} />,
    [detailDeviceInfo]
  );

  return (
    <>
      <Helmet title="Detail Device" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Thông tin thiết bị</h1>
        {DetailDeviceComponentMemo}
      </Container>
    </>
  );
};

export default withRouter(DetailDevicePage);
