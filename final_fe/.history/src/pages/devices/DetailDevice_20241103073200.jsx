import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [
      isShowUpdateDeviceModal,
      showUpdateDeviceModal,
      hideUpdateDeviceModal,
    ] = useBoolean(false);
    const [managersForUpdate, setManagersForUpdate] = useState([]);
    const [statusForUpdate, setStatusForUpdate] = useState([]);
    const [labsForUpdate, setLabsForUpdate] = useState([]);

    const [detailDeviceInfo, setDetailDeviceInfo] = useState([]);
    const [timeRefreshUpdateForm, setTimeRefreshUpdateForm] = useState(
      new Date()
    );

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

  useEffect(() => {
    getDetailDeviceInfo();
  }, []);

  const getDetailDeviceInfo = async () => {
    try {
      const deviceInfo = await DeviceApi.getDetail(deviceId);
      setDetailDeviceInfo(deviceInfo);
    } catch (error) {
      if (error.response.status === 400) {
        navigate("/auth/404");
      } else {
        throw error;
      }
    }
  };

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
