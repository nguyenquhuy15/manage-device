import React, { useCallback, useState, useEffect } from "react";

import UpdateComponent from "../update/UpdateComponent";
import { useNavigate } from "react-router-dom";

import useNotification from "../../../hooks/useNotification";
import withRouter from "../../../hoc/withRouter";
import { Card } from "react-bootstrap";

import DeviceApi from "../../../api/DeviceApi";
import LabApi from "../../../api/LabApi";
const DetailDeviceComponent = (props) => {
  const deviceId = props.ro;
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
  const [managersOption, setManagersOption] = useState([]);
  const [labsForUpdate, setLabsForUpdate] = useState([]);
  const [labsForOption, setLabsForOption] = useState([]);
    const [typesForOption, setTypesForOption] = useState([]);

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
    const data = await DeviceApi.getAllLabsByDevice(deviceId);
    setManagersOption(data.content);
  };

  const getListLabForUpdate = async (deviceId) => {
    const data = await DeviceApi.getAllLabsByDevice(deviceId);
    setLabsForUpdate(data.content);
  };
  const getListTypeOption = async () => {
      const data = await DeviceApi.getAllType();
      setTypesForOption(data);
    };
  const getListLabOption = async () => {
    const data = await LabApi.getLabName();
    setLabsForOption(data);
  };

  /**
   * Detail Device Info
   */
  const [detailDeviceInfo, setDetailDeviceInfo] = useState({
    code: "",
    name: "",
    typeId:"",
    typeName: "",
    price: "",
    purchaseDate: "",
    laboratoriesManagerName: "",
    warrantyDate: "",
    status: "",
    laboratoriesName: "",
    maintenanceDate: "",
    detailsAssignmentDate: "",
    maintenanceDescription: "",
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
      laboratoriesId,
      typeId,
      status,
      laboratoriesManagerName,
      detailsNote,
      detailsAssignmentDate,
      maintenanceDate,
      maintenanceDescription
    ) => {
      // call api
      await DeviceApi.update(
        deviceId,
        laboratoriesId,
        typeId,
        status,
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
