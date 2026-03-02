import React, { useCallback, useState, useEffect } from "react";

import UpdateComponent from "../update/UpdateComponent";
import { useNavigate } from "react-router-dom";

import useNotification from "../../../hooks/useNotification";
import withRouter from "../../../hoc/withRouter";
import { Card } from "react-bootstrap";

import DeviceApi from "../../../api/DeviceApi";
import LabApi from "../../../api/LabApi";
import ManagerApi from "../../../api/ManagerApi";
const DetailDeviceComponent = (props) => {
  const deviceId = props.router.params.id;
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

  // paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // sorting
  const [currentSort, setCurrentSort] = useState({
    sortField: "id",
    isAsc: false,
  });
  // search
  const [currentSearch, setCurrentSearch] = useState("");
  // filter
  const [currentFilter, setCurrentFilter] = useState({
    status: "",
  });

  const [managersForUpdate, setManagersForUpdate] = useState([]);
  const [labsForUpdate, setLabsForUpdate] = useState([]);

  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());
  const resetPaging = useCallback(() => setCurrentPage(1), []);
  const resetCurrentSort = useCallback(
    () => setCurrentSort({ sortField: "id", isAsc: false }),
    []
  );
  const resetCurrentSearch = useCallback(() => {
    setCurrentSearch("");
  }, []);

  const resetCurrentFilter = useCallback(() => {
    setCurrentFilter({
      status: "",
    });
  }, []);
  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    resetCurrentFilter();
    setTimeRefreshTable(new Date());
  }, []);

  const handleClose = () => {
    navigate(`/devices`);
  };
    const getListManagersOption = async (deviceId) => {
      const data = await DeviceApi.getAllManagersByDevice(deviceId);
      setManagersForUpdate(data.content);
    };

  const getListManagersForUpdate = async (deviceId) => {
    const data = await DeviceApi.getAllManagersByDevice(deviceId);
    setManagersForUpdate(data.content);
  };

  const getListLabForUpdate = async (deviceId) => {
    const data = await DeviceApi.getAllLabsByDevice(deviceId);
    setLabsForUpdate(data.content);
  };

  /**
   * Detail Device Info
   */
  const [detailDeviceInfo, setDetailDeviceInfo] = useState({
    code: "",
    name: "",
    typeName: "",
    price: "",
    purchaseDate: "",
    managersName: "",
    warrantyDate: "",
    status: "",
    laboratoriesName: "",
    maintenanceDate: "",
    maintenanceDescription: "",
    detailsAssignmentDate: "",
    detailsNote: "",
  });

  useEffect(() => {
    getDetailDeviceInfo(deviceId);
    getListManagersForUpdate(deviceId);
    getListLabForUpdate(deviceId);
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

  const onUpdateDeviceItem = useCallback(
    async (
      deviceId,
      managersId,
      status,
      laboratoriesId,
      detailsNote,
      maintenanceDate,
      maintenanceDescription
    ) => {
      // call api
      await DeviceApi.update(
        deviceId,
        managersId,
        status,
        laboratoriesId,
        detailsNote,
        maintenanceDate,
        maintenanceDescription
      );

      // show notification
      showSuccessMessage("Update Device Successfully!");
      // hide modal
      handleClose();
      // reset Device table
      onResetTable();
    },
    []
  );

  return (
    <>
      <Card>
        <Card.Body>
          <h1 className="h3 mb-3">Thông tin thiết bị</h1>
          <UpdateComponent
            managers={managersForUpdate}
            labs={labsForUpdate}
            info={detailDeviceInfo}
            timeRefreshForm={timeRefreshTable}
            onSubmit={onUpdateDeviceItem}
            hideModal={handleClose}
          />
        </Card.Body>
      </Card>
    </>
  );
};
export default withRouter(DetailDeviceComponent);
