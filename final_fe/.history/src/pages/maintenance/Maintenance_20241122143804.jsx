import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";

import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";
import { selectRole } from "../../redux/selector/UserInfoSelector";
import MaintenanceApi from "../../api/DeviceApi";
import UserApi from "../../api/UserApi";
import MaintenanceTableComponent from "../../components/maintenance/viewlist/MaintenanceTableComponent";

import MaintenanceNoDataComponent from "../../components/maintenance/viewlist/MaintenanceNoDataComponent";


import DeleteMaintenanceModal from "../../components/maintenance/delete/DeleteMaintenanceModal";

import DeviceApi from "../../api/DeviceApi";

const MaintenancePage = (props) => {
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

  const [maintenances, setMaintenances] = useState([]);
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
    maintenanceDescription: "",
    maintenanceStatus: "",
    maintenanceDate: "",
  });
  // refresh table
  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());

  // // delete
  const [
    isShowDeleteMaintenanceModal,
    showDeleteMaintenanceModal,
    hideDeleteMaintenanceModal,
  ] = useBoolean(false);
  const [deletingMaintenanceId, setDeletingMaintenanceId] = useState();

  // remove all Devices
  const [
    isShowRemoveAllMaintenancesModal,
    showRemoveAllMaintenancesModal,
    hideRemoveAllMaintenancesModal,
  ] = useBoolean(false);
  const [removingAllDeviceIds, setRemovingAllDeviceIds] = useState(new Set());

  useEffect(() => {
    getListMaintenances();
  }, [currentPage, currentSort, currentSearch, currentFilter]);

  const getListMaintenances = async () => {
    const data = await MaintenanceApi.getAllDevicesInMaintenance({
      page: currentPage,
      sortField: currentSort.sortField,
      isAsc: currentSort.isAsc,
      search: currentSearch,
      maintenanceDescription: currentFilter.maintenanceDescription,
      maintenanceStatus: currentFilter.maintenanceStatus,
      maintenanceDate: currentFilter.maintenanceDate,
    });
    setMaintenances(data.content);
    setTotalPages(data.totalPages);
  };

  const resetPaging = useCallback(() => setCurrentPage(1), []);

  const resetCurrentSort = useCallback(
    () => setCurrentSort({ sortField: "id", isAsc: false }),
    []
  );

  const resetCurrentSearch = useCallback(() => {
    setCurrentSearch("");
  }, []);

  const isSearchEmpty = () => {
    return !currentSearch || currentSearch.length === 0;
  };

  const resetCurrentFilter = useCallback(() => {
    setCurrentFilter({
      maintenanceDescription: "",
      maintenanceStatus: "",
      maintenanceDate: "",
    });
  }, []);

  const isFilterEmpty = () => {
    return;
    !currentFilter.maintenanceDescription &&
      !currentFilter.maintenanceStatus &&
      !currentFilter.maintenanceDate;
  };

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    resetCurrentFilter();
    setTimeRefreshTable(new Date());
    setDeletingMaintenanceId(undefined);
    setRemovingAllDeviceIds(new Set());
  }, []);

  const onClickDeviceItem = useCallback((deviceId) => {
    navigate(`/maintenances/${deviceId}`);
  }, []);

  const onShowDeleteMaintenanceModal = useCallback((deviceId) => {
    // show modal
    showDeleteMaintenanceModal();
    // save Maintenance id
    setDeletingMaintenanceId(deviceId);
  }, []);

  const onDeleteMaintenance = useCallback(async () => {
      await DeviceApi.removeDeviceInMaintenance(deletingMaintenanceId);
      // show notification
      showSuccessMessage("Xóa thiết bị thành công!");
      // hide modal
      hideDeleteMaintenanceModal();
      // reset Maintenance table
      onResetTable();
  }, [deletingMaintenanceId]);

    const onShowRemoveAllMaintenanceModal = useCallback(() => {
      if (removingAllDeviceIds.size === 0) {
        showErrorMessage("Bạn phải chọn ít nhất một thiết bị để loại bỏ");
        return;
      } else {
        showRemoveAllMaintenancesModal();
      }
    }, [removingAllDeviceIds]);

    const onRemoveAllMaintenbances = useCallback(async () => {
      await DeviceApi.removeAllDevicesInMaintenance(
        Array.from(removingAllDeviceIds)
      );
      showSuccessMessage("Remove Devices successfully!");
      onResetTable();
      getListMaintenances();
    }, [removingAllDeviceIds]);

  return (
    <>
      <Helmet title="Bảo trì" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Bảo trì thiết bị</h1>

        {maintenances.length == 0 && isSearchEmpty() && isFilterEmpty() ? (
          <MaintenanceNoDataComponent />
        ) : (
          <MaintenanceTableComponent
            // table
            maintenances={maintenances}
            // paging
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            resetPaging={resetPaging}
            // sorting
            currentSort={currentSort}
            setCurrentSort={setCurrentSort}
            resetCurrentSort={resetCurrentSort}
            // search
            currentSearch={currentSearch}
            setCurrentSearch={setCurrentSearch}
            // filter
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            // refresh table
            timeRefreshTable={timeRefreshTable}
            onResetTable={onResetTable}
            // onClick
            onClickItem={onClickDeviceItem}
            onDeleteItem={onShowDeleteMaintenanceModal}
          />
        )}

        {isShowDeleteMaintenanceModal && (
          <DeleteMaintenanceModal
            hideModal={hideDeleteMaintenanceModal}
            name={
              maintenances.find(
                (maintenance) => maintenance.id === deletingMaintenanceId
              ).name
            }
            onSubmit={onDeleteMaintenance}
          />
        )}
        {isShowRemoveAllMaintenancesModal && (
          <RemoveAllDeviceModal
            hideModal={hideRemoveAllMaintenancesModal}
            maintenances={devices.filter((device) =>
              removingAllDeviceIds.has(device.id)
            )}
            onRemoveAll={onRemoveAllDevices}
          />
        )}
      </Container>
    </>
  );
};
export default MaintenancePage;