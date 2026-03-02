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
  // update
  const [
    isShowUpdateDeviceModal,
    showUpdateDeviceModal,
    hideUpdateDeviceModal,
  ] = useBoolean(false);

  const [managersForUpdate, setManagersForUpdate] = useState([]);
  const [statusForUpdate, setStatusForUpdate] = useState([]);
  const [labsForUpdate, setLabsForUpdate] = useState([]);

  const [timeRefreshUpdateForm, setTimeRefreshUpdateForm] = useState(
    new Date()
  );

  const onShowUpdateDeviceModal = async (deviceId) => {
    // show modal
    showUpdateDeviceModal();
    // reset modal
    await getListManagersForUpdate(deviceId);
    await getListStatusForUpdate;
    await getListLabForUpdate;
    await getDetailDeviceInfor(deviceId);
    setTimeRefreshUpdateForm(new Date());
  };

  const getListManagersForUpdate = async (deviceId) => {
    const data = await DeviceApi.getAllManagersByDevice(deviceId);
    setManagersForUpdate(data.content);
  };
  const getListStatusForUpdate = async () => {
    const data = await TypeApi.getAllDetail();
    setStatusForUpdate(data);
  };
  const getListLabForUpdate = async () => {
    const data = await LabApi.getLabName();
    setLabsForUpdate(data);
  };

  const getDetailDeviceInfor = async (deviceId) => {
    const data = await DeviceApi.getDetail(deviceId);
    setDetailDeviceInfo(data);
  };

  const onUpdateDevice = useCallback(
    async (deviceId, managersId, warrantyDate, status, laboratoriesId) => {
      // call api
      await DeviceApi.update(
        deviceId,
        managersId,
        warrantyDate,
        status,
        laboratoriesId
      );
      // show notification
      showSuccessMessage("Update Device Successfully!");
      // hide modal
      hideUpdateDeviceModal();
      // reset Device table
      onResetTable();
    },
    []
  );

  return (
    <>
      <Helmet title="Detail Device" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Thông tin thiết bị</h1>

        <DetailDeviceComponent info={detailDeviceInfo} />

        {isShowUpdateDeviceModal && (
          <DetailDeviceComponent
            hideModal={hideUpdateDeviceModal}
            managers={managersForUpdate}
            statuss={statusForUpdate}
            labs={labsForUpdate}
            detailInfo={detailDeviceInfo}
            timeRefreshForm={timeRefreshUpdateForm}
            onSubmit={onUpdateDevice}
          )}
        />,
      </Container>
    </>
  );
};

export default withRouter(DetailDevicePage);
