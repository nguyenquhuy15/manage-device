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


import CreateDepartmentModal from "../../components/departments/create/CreateDepartmentModal";
import UpdateDepartmentModal from "../../components/departments/update/UpdateDepartmentModal";
import DeleteDepartmentModal from "../../components/departments/delete/DeleteDepartmentModal";
import ImportAccountModal from "../../components/departments/import/ImportAccountModal";
import * as XLSX from "xlsx";
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
    maintenanceDate: ""
  });
  // refresh table
  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());
  // // create
  // const [
  //   isShowCreateDepartmentModal,
  //   showCreateDepartmentModal,
  //   hideCreateDepartmentModal,
  // ] = useBoolean(false);
  // const [managers, setManagers] = useState([]);
  // const [employees, setEmployees] = useState([]);
  // const [currentSearchEmployee, setCurrentSearchEmployee] = useState("");
  // const [currentSortEmployee, setCurrentSortEmployee] = useState({
  //   sortField: "id",
  //   isAsc: false,
  // });
  // const [addingEmployeeIds, setAddingEmployeeIds] = useState(new Set());
  // const [timeRefreshTableEmployee, setTimeRefreshTableEmployee] = useState(
  //   new Date()
  // );
  // const [timeRefreshCreateForm, setTimeRefreshCreateForm] = useState(
  //   new Date()
  // );
  // const [isShowEmployeeTable, showEmployeeTable, hideEmployeeTable] =
  //   useBoolean(false);
  // // update
  // const [
  //   isShowUpdateDepartmentModal,
  //   showUpdateDepartmentModal,
  //   hideUpdateDepartmentModal,
  // ] = useBoolean(false);
  // const [managersForUpdate, setManagersForUpdate] = useState([]);
  // const [detailDepartmentInfo, setDetailDepartmentInfo] = useState([]);
  // const [timeRefreshUpdateForm, setTimeRefreshUpdateForm] = useState(
  //   new Date()
  // );
  // // delete
  const [
    isShowDeleteMaintenanceModal,
    showDeleteMaintenanceModal,
    hideDeleteMaintenanceModal,
  ] = useBoolean(false);
  const [deletingMaintenanceId, setDeletingMaintenanceId] = useState();
  // // import
  // const [
  //   isShowImportAccountModal,
  //   showImportAccountModal,
  //   hideImportAccountModal,
  // ] = useBoolean(false);
  // const [timeRefreshImportForm, setTimeRefreshImportForm] = useState(
  //   new Date()
  // );
  // const [departmentsForImport, setDepartmentsForImport] = useState([]);
  // const [accountsForImport, setAccountsForImport] = useState([]);
  // const [
  //   isShowImportAccountTable,
  //   showImportAccountTable,
  //   hideImportAccountTable,
  // ] = useBoolean(false);

  useEffect(() => {
    getListMaintenances();
  }, [currentPage, currentSort, currentSearch, currentFilter]);

  // useEffect(() => {
  //   if (isShowCreateDepartmentModal) {
  //     getListEmployees();
  //   }
  // }, [isShowCreateDepartmentModal, currentSearchEmployee, currentSortEmployee]);

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
    return
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
  }, []);

  const onClickDeviceItem = useCallback((deviceId) => {
    navigate(`/maintenances/${deviceId}`);
  }, []);

  // const existsByDepartmentName = useCallback(async (name) => {
  //   return await DepartmentApi.existsByName(name);
  // }, []);

  // const onShowCreateDepartmentModal = () => {
  //   // reset modal
  //   setTimeRefreshCreateForm(new Date());
  //   getListManagers();
  //   hideEmployeeTable();
  //   onResetTableEmployee();
  //   // show modal
  //   showCreateDepartmentModal();
  // };

  // const onCreateDepartment = useCallback(
  //   async (name, managerId) => {
  //     // call api
  //     await DepartmentApi.create(
  //       name,
  //       managerId,
  //       Array.from(addingEmployeeIds)
  //     );
  //     // show notification
  //     showSuccessMessage("Create Department Successfully!");
  //     // hide modal
  //     hideCreateDepartmentModal();
  //     // reset department table
  //     onResetTable();
  //   },
  //   [addingEmployeeIds]
  // );

  // const onShowUpdateDepartmentModal = async (departmentId) => {
  //   // show modal
  //   showUpdateDepartmentModal();
  //   // reset modal
  //   await getListManagersForUpdate(departmentId);
  //   await getDetailDepartmentInfo(departmentId);
  //   setTimeRefreshUpdateForm(new Date());
  // };

  // const getListManagersForUpdate = async (departmentId) => {
  //   const data = await DepartmentApi.getAllAccountsByDepartment(departmentId);
  //   setManagersForUpdate(data.content);
  // };

  // const getDetailDepartmentInfo = async (departmentId) => {
  //   const data = await DepartmentApi.getDetail(departmentId);
  //   setDetailDepartmentInfo(data);
  // };

  // const onUpdateDepartment = useCallback(
  //   async (departmentId, name, managerId) => {
  //     // call api
  //     await DepartmentApi.update(departmentId, name, managerId);
  //     // show notification
  //     showSuccessMessage("Update Department Successfully!");
  //     // hide modal
  //     hideUpdateDepartmentModal();
  //     // reset department table
  //     onResetTable();
  //   },
  //   []
  // );

  const onShowDeleteMaintenanceModal = useCallback((deviceId) => {
    // show modal
    showDeleteMaintenanceModal();
    // save Maintenance id
    setDeletingMaintenanceId(deviceId);
  }, []);



  const onDeleteMaintenance = useCallback(async () => {
    try {
      // call api
      await DeviceApi.removeDeviceInMaintenance(deletingMaintenanceId);
      // show notification
      showSuccessMessage("Delete Maintenance Successfully!");
      // hide modal
      hideDeleteMaintenanceModal();
      // reset Maintenance table
      onResetTable();
    } catch (error) {
      if (error.response.status === 400) {
        showErrorMessage(
          "There are users in the Maintenance. You cann't delete this Maintenance!"
        );
      } else {
        throw error;
      }
    }
  }, [deletingMaintenanceId]);

  };

  // const onImportAccounts = useCallback(
  //   async (departmentId, managerId, employeeIds) => {
  //     // call api
  //     await DepartmentApi.importAccounts(departmentId, managerId, employeeIds);
  //     // show notification
  //     showSuccessMessage("Import Accounts Successfully!");
  //     // hide modal
  //     hideImportAccountModal();
  //     // reset department table
  //     onResetTable();
  //   },
  //   []
  // );

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
            // onCreate={onShowCreateDepartmentModal}
            // onUpdateItem={onShowUpdateDepartmentModal}
            onDeleteItem={onShowDeleteDepartmentModal}
            // onImport={onShowImportAccountModal}
          />
        )}

        {/* {isShowCreateDepartmentModal && (
          <CreateDepartmentModal
            hideModal={hideCreateDepartmentModal}
            existsByName={existsByDepartmentName}
            managers={managers}
            isShowTable={isShowEmployeeTable}
            showTable={showEmployeeTable}
            employees={employees}
            // sorting
            currentSort={currentSortEmployee}
            setCurrentSort={setCurrentSortEmployee}
            resetCurrentSort={resetCurrentSortEmployee}
            // search
            currentSearch={currentSearchEmployee}
            setCurrentSearch={setCurrentSearchEmployee}
            isSearchEmpty={isEmployeeSearchEmpty}
            // refresh table
            timeRefreshTable={timeRefreshTableEmployee}
            onResetTable={onResetTableEmployee}
            // checkbox
            addingIds={addingEmployeeIds}
            setAddingIds={setAddingEmployeeIds}
            timeRefreshForm={timeRefreshCreateForm}
            onSubmit={onCreateDepartment}
          />
        )} */}

        {/* {isShowUpdateDepartmentModal && (
          <UpdateDepartmentModal
            hideModal={hideUpdateDepartmentModal}
            existsByName={existsByDepartmentName}
            managers={managersForUpdate}
            detailInfo={detailDepartmentInfo}
            timeRefreshForm={timeRefreshUpdateForm}
            onSubmit={onUpdateDepartment}
          />
        )} */}

        {isShowDeleteMaintenanceModal && (
          <DeleteMaintenanceModal
            hideModal={hideDeleteMaintenanceModal}
            name={
              maintenances.find(
                (maintenance) => maintenance.id === deletingDepartmentId
              ).name
            }
            onSubmit={onDeleteDepartment}
          />
        )}

        {isShowImportAccountModal && (
          {/* <ImportAccountModal
            hideModal={hideImportAccountModal}
            departments={departmentsForImport}
            onChangeExcelFile={onChangeExcelFile}
            accounts={accountsForImport}
            isShowTable={isShowImportAccountTable}
            timeRefreshForm={timeRefreshImportForm}
            onSubmit={onImportAccounts}
          />
        )} */}
      </Container>
    </>
  );
};

export default MaintenancePage;