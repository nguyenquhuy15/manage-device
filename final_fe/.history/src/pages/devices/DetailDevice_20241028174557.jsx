import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";

import DeviceApi from "../../api/DeviceApi";
import LabApi from "../../api/LabApi";
import TypeApi from "../../api/TypeApi";
import ManagerApi from "../../api/ManagerApi";

import DeviceTableComponent from "../../components/devices/viewlist/DeviceTableComponent";
import DeviceNoDataComponent from "../../components/devices/viewlist/DeviceNoDataComponent";
import CreateDeviceModal from "../../components/devices/create/CreateDeviceModal";
// import UpdateDeviceModal from "../../components/devices/update/UpdateDeviceModal";
// import DeleteDeviceModal from "../../components/devices/delete/DeleteDeviceModal";
// import ImportAccountModal from "../../components/devices/import/ImportAccountModal";
import * as XLSX from "xlsx";
import { Manager } from "react-popper";

const DetailDevicePage = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

  const [devices, setDevices] = useState([]);


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
  // refresh table
  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());

  // create
  const [statuss, setStatuss] = useState([]);
  const [labs, setLabs] = useState([]);
  const [loais, setLoais] = useState([]);
  const [managers, setManagers] = useState([]);
  
  const [
    isShowCreateDeviceModal,
    showCreateDeviceModal,
    hideCreateDeviceModal,
  ] = useBoolean(false);

  const [timeRefreshCreateForm, setTimeRefreshCreateForm] = useState(
    new Date()
  );

  // update
  // const [
  //   isShowUpdateDeviceModal,
  //   showUpdateDeviceModal,
  //   hideUpdateDeviceModal,
  // ] = useBoolean(false);
  // const [managersForUpdate, setManagersForUpdate] = useState([]);
  // const [detailDeviceInfo, setDetailDeviceInfo] = useState([]);
  // const [timeRefreshUpdateForm, setTimeRefreshUpdateForm] = useState(
  //   new Date()
  // );
  // delete
  // const [
  //   isShowDeleteDeviceModal,
  //   showDeleteDeviceModal,
  //   hideDeleteDeviceModal,
  // ] = useBoolean(false);
  // const [deletingDeviceId, setDeletingDeviceId] = useState();
  // import
  // const [
  //   isShowImportAccountModal,
  //   showImportAccountModal,
  //   hideImportAccountModal,
  // ] = useBoolean(false);
  // const [timeRefreshImportForm, setTimeRefreshImportForm] = useState(
  //   new Date()
  // );
  // const [devicesForImport, setDevicesForImport] = useState([]);
  // const [accountsForImport, setAccountsForImport] = useState([]);
  // const [
  //   isShowImportAccountTable,
  //   showImportAccountTable,
  //   hideImportAccountTable,
  // ] = useBoolean(false);

  useEffect(() => {
    getListDevices();
  }, [currentPage, currentSort, currentSearch, currentFilter]);

  useEffect(() => {
    if (isShowCreateDeviceModal && statuss.length ===0) {
      getListStatus();
    }
  }, [isShowCreateDeviceModal]);
  
  useEffect(() => {
      if (isShowCreateDeviceModal && labs.length === 0) {
        getListLab();
      }
    }, [isShowCreateDeviceModal]);
  
  useEffect(() => {
      if (isShowCreateDeviceModal && loais.length === 0) {
        getListLoai();
      }
  }, [isShowCreateDeviceModal]);

  useEffect(() => {
      if (isShowCreateDeviceModal && managers.length === 0) {
        getListManager();
      }
    }, [isShowCreateDeviceModal]);

  const getListDevices = async () => {
    const data = await DeviceApi.getAll({
      page: currentPage,
      sortField: currentSort.sortField,
      isAsc: currentSort.isAsc,
      search: currentSearch,
      status: currentFilter.status,
    });
    setDevices(data.content);
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
      status: "",
    });
  }, []);

  const isFilterEmpty = () => {
    return !currentFilter.status;
  };

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    resetCurrentFilter();
    setTimeRefreshTable(new Date());
  }, []);

  const onClickDeviceItem = useCallback((deviceId) => {
    navigate(`/devices/${deviceId}`);
  }, []);

  const existsByDeviceCode = useCallback(async (code) => {
    return await DeviceApi.existsByCode(code);
  }, []);

  const onShowCreateDeviceModal = () => {
    // reset modal
    setTimeRefreshCreateForm(new Date());
    getListStatus;
    getListLab;
    getListLoai;
    getListManager;
    // show modal
    showCreateDeviceModal();
  };
  const getListStatus = async () => {
    const data = await DeviceApi.getAllDetail();
    setStatuss(data);
  };

  const getListLab = async () => {
      const data = await LabApi.getLabName();
      setLabs(data);
  };

  const getListLoai = async () => {
      const data = await TypeApi.getTypeName();
      setLoais(data);
  };

  const getListManager = async () => {
      const data = await ManagerApi.getManagerName();
      setManagers(data);
  };
  


  const onCreateDevice = useCallback(
    async (
      code,
      name,
      typeId,
      managersId,
      price,
      purchaseDate,
      warrantyDate,
      status,
      laboratoriesId
    ) => {
      // call api
      await DeviceApi.create(
        code,
        name,
        typeId,
        managersId,
        price,
        purchaseDate,
        warrantyDate,
        status,
        laboratoriesId
      );
      // show notification
      showSuccessMessage("Create Device Successfully!");
      // hide modal
      hideCreateDeviceModal();
      // reset Device table
      onResetTable();
    }
  );

  // const onShowUpdateDeviceModal = async (deviceId) => {
  //   // show modal
  //   showUpdateDeviceModal();
  //   // reset modal
  //   await getListManagersForUpdate(deviceId);
  //   await getDetailDeviceInfo(deviceId);
  //   setTimeRefreshUpdateForm(new Date());
  // };

  // const getListManagersForUpdate = async (deviceId) => {
  //   const data = await DeviceApi.getAllAccountsByDevice(deviceId);
  //   setManagersForUpdate(data.content);
  // };

  // const getDetailDeviceInfo = async (deviceId) => {
  //   const data = await DeviceApi.getDetail(deviceId);
  //   setDetailDeviceInfo(data);
  // };

  // const onUpdateDevice = useCallback(async (deviceId, name, managerId) => {
  //   // call api
  //   await DeviceApi.update(deviceId, name, managerId);
  //   // show notification
  //   showSuccessMessage("Update Device Successfully!");
  //   // hide modal
  //   hideUpdateDeviceModal();
  //   // reset Device table
  //   onResetTable();
  // }, []);

  // const onShowDeleteDeviceModal = useCallback((deviceId) => {
  //   // show modal
  //   showDeleteDeviceModal();
  //   // save Device id
  //   setDeletingDeviceId(deviceId);
  // }, []);

  // const onDeleteDevice = useCallback(async () => {
  //   try {
  //     // call api
  //     await DeviceApi.delete(deletingDeviceId);
  //     // show notification
  //     showSuccessMessage("Delete Device Successfully!");
  //     // hide modal
  //     hideDeleteDeviceModal();
  //     // reset Device table
  //     onResetTable();
  //   } catch (error) {
  //     if (error.response.status === 400) {
  //       showErrorMessage(
  //         "There are users in the device. You cann't delete this device!"
  //       );
  //     } else {
  //       throw error;
  //     }
  //   }
  // }, [deletingDeviceId]);

  // const onShowImportAccountModal = useCallback(async () => {
  //   // show modal
  //   showImportAccountModal();
  //   // reset modal
  //   await getDevicesForImport();
  //   setAccountsForImport([]);
  //   hideImportAccountTable();
  //   setTimeRefreshImportForm(new Date());
  // }, []);

  // const getDevicesForImport = async () => {
  //   const data = await DeviceApi.getAllDeviceForFilter();
  //   setDevicesForImport(data);
  // };

  // const onChangeExcelFile = useCallback(
  //   (event, file, setFieldError, setFieldValue) => {
  //     let reader = new FileReader();

  //     // read file
  //     reader.onload = function (e) {
  //       let workbook = XLSX.read(e.target.result, {
  //         type: "binary",
  //       });

  //       // get first sheet
  //       let firstSheet = workbook.SheetNames[0];
  //       let rows = XLSX.utils.sheet_to_row_object_array(
  //         workbook.Sheets[firstSheet]
  //       );
  //       let jsonArray = JSON.stringify(rows);
  //       jsonArray = JSON.parse(jsonArray);
  //       // format key
  //       renameOfAccountKeys(jsonArray);
  //       // get fullname & id
  //       getMoreAccountInfo(jsonArray, event, setFieldError, setFieldValue);
  //     };

  //     // error
  //     reader.onerror = function (exception) {
  //       console.log(exception);
  //     };

  //     reader.readAsBinaryString(file);
  //   },
  //   []
  // );

  // const renameOfAccountKeys = (jsonArray) => {
  //   jsonArray.forEach((item) => {
  //     delete Object.assign(item, { username: item.Username })["Username"];
  //     delete Object.assign(item, { role: item.Role })["Role"];
  //   });
  // };

  // const getMoreAccountInfo = async (
  //   accounts,
  //   event,
  //   setFieldError,
  //   setFieldValue
  // ) => {
  //   try {
  //     const data = await UserApi.getInfoAccountsByUsernames(
  //       accounts.map((account) => account.username)
  //     );
  //     for (const item of data) {
  //       let account = accounts.find(
  //         (account) => account.username == item.username
  //       );
  //       account.id = item.id;
  //       account.fullname = item.fullname;
  //     }
  //     setAccountsForImport(accounts);
  //     showImportAccountTable();
  //   } catch (error) {
  //     setAccountsForImport(accounts);
  //     hideImportAccountTable();
  //     if (error.response.status === 400) {
  //       console.log(error);
  //       setFieldError(
  //         "excelFile",
  //         JSON.stringify(error.response.data.exception)
  //       );
  //       setFieldValue("excelFile", "", false);
  //       event.target.value = null;
  //     } else {
  //       throw error;
  //     }
  //   }
  // };

  // const onImportAccounts = useCallback(
  //   async (deviceId, managerId, employeeIds) => {
  //     // call api
  //     await DeviceApi.importAccounts(deviceId, managerId, employeeIds);
  //     // show notification
  //     showSuccessMessage("Import Accounts Successfully!");
  //     // hide modal
  //     hideImportAccountModal();
  //     // reset device table
  //     onResetTable();
  //   },
  //   []
  // );

  return (
    <>
      <Helmet title="Device" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Device List</h1>

        {devices.length == 0 && isSearchEmpty() && isFilterEmpty() ? (
          <DeviceNoDataComponent />
        ) : (
          <DeviceTableComponent
            // table
            devices={devices}
            statuss={statuss}
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
            //onClick
            onClickItem={onClickDeviceItem}
            onCreate={onShowCreateDeviceModal}
            // onUpdateItem={onShowUpdateDeviceModal}
            // onDeleteItem={onShowDeleteDeviceModal}
            // onImport={onShowImportAccountModal}
          />
        )}

        {isShowCreateDeviceModal && (
          <CreateDeviceModal
            statuss={statuss}
            labs={labs}
            loais={loais}
            managers={managers}
            hideModal={hideCreateDeviceModal}
            existsByCode={existsByDeviceCode}
            timeRefreshForm={timeRefreshCreateForm}
            onSubmit={onCreateDevice}
          />
        )}

        {/* {isShowUpdateDeviceModal && (
          <UpdateDeviceModal
            hideModal={hideUpdateDeviceModal}
            existsByName={existsByDeviceName}
            managers={managersForUpdate}
            detailInfo={detailDeviceInfo}
            timeRefreshForm={timeRefreshUpdateForm}
            onSubmit={onUpdateDevice}
          />
        )} */}

        {/* {isShowDeleteDeviceModal && (
          <DeleteDeviceModal
            hideModal={hideDeleteDeviceModal}
            name={devices.find((device) => device.id === deletingDeviceId).name}
            onSubmit={onDeleteDevice}
          />
        )} */}

        {/* {isShowImportAccountModal && (
          <ImportAccountModal
            hideModal={hideImportAccountModal}
            devices={devicesForImport}
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

export default DevicePage;
