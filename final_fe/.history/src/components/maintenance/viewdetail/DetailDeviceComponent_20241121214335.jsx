import React, { useCallback, useState, useEffect } from "react";

import UpdateComponent from "../update/UpdateComponent";
import { useNavigate } from "react-router-dom";

import useNotification from "../../../hooks/useNotification";
import withRouter from "../../../hoc/withRouter";
import { Card } from "react-bootstrap";

import DeviceApi from "../../../api/DeviceApi";
import LabApi from "../../../api/LabApi";
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

  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());
  const resetPaging = useCallback(() => setCurrentPage(1), []);
  const resetCurrentSort = useCallback(
    () => setCurrentSort({ sortField: "id", isAsc: false }),
    []
  );
  const resetCurrentSearch = useCallback(() => {
    setCurrentSearch("");
  }, []);

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    setTimeRefreshTable(new Date());
  }, []);

  const handleClose = () => {
    navigate(`/maintenance`);
  };

  /**
   * Detail Device Info
   */
  const [detailDeviceInfo, setDetailDeviceInfo] = useState({
    code: "",
    name: "",
    maintenanceDate: "",
    maintenanceDescription: "",
    maintenanceNote: "",
    maintenanceAddress: "",
    maintenanceExpense: "",
    detailsNote: "",
  });

  useEffect(() => {
    getDetailDeviceInfo(deviceId);
    getListManagersOption(deviceId);
    getListLabOption();
    getListTypeOption();
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
      status,
      laboratoriesId,
      typeId,
      laboratoriesManagerName,
      detailsNote,
      detailsAssignmentDate,
      maintenanceDate,
      maintenanceDescription
    ) => {
      // call api
      await DeviceApi.update(
        deviceId,
        status,
        laboratoriesId,
        typeId,
        laboratoriesManagerName,
        detailsNote,
        detailsAssignmentDate,
        maintenanceDate,
        maintenanceDescription
      );

      // show notification
      showSuccessMessage("Cập nhật thành công");
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
            managers={managersOption}
            labs={labsForOption}
            types={typesForOption}
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
