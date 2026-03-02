import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";

import DeviceApi from "../../api/DeviceApi";
import LabApi from "../../api/LabApi";
import TypeApi from "../../api/TypeApi";



import DeviceTableComponent from "../../components/devices/viewlist/DeviceTableComponent";
import DeviceNoDataComponent from "../../components/devices/viewlist/DeviceNoDataComponent";
import CreateDeviceModal from "../../components/devices/create/CreateDeviceModal";

import DeleteDeviceModal from "../../components/devices/delete/DeleteDeviceModal";


import RemoveAllDeviceModal from "../../components/devices/delete/RemoveAllDeviceModal";

import ImportDeviceModal from "../../components/devices/import/ImportDeviceModal";
import * as XLSX from "xlsx";

const DevicePage = () => {
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

  const [labs, setLabs] = useState([]);
  const [loais, setLoais] = useState([]);


  const [
    isShowCreateDeviceModal,
    showCreateDeviceModal,
    hideCreateDeviceModal,
  ] = useBoolean(false);

  const [timeRefreshCreateForm, setTimeRefreshCreateForm] = useState(
    new Date()
  );

  // delete
  const [
    isShowDeleteDeviceModal,
    showDeleteDeviceModal,
    hideDeleteDeviceModal,
  ] = useBoolean(false);

    const [
      isShowRemoveAllDevicesModal,
      showRemoveAllDevicesModal,
      hideRemoveAllDeviceModal,
    ] = useBoolean(false);
  const [deletingDeviceId, setDeletingDeviceId] = useState();

  
    const [removingAllDeviceIds, setRemovingAllDeviceIds] = useState(
      new Set()
  );
  
  // // import
  const [
    isShowImportDeviceModal,
    showImportDeviceModal,
    hideImportDeviceModal,
  ] = useBoolean(false);
  const [timeRefreshImportForm, setTimeRefreshImportForm] = useState(
    new Date()
  );
  const [devicesForImport, setDevicesForImport] = useState([]);
  const [
    isShowImportDeviceTable,
    showImportDeviceTable,
    hideImportDeviceTable,
  ] = useBoolean(false);

  useEffect(() => {
    getListDevices();
  }, [currentPage, currentSort, currentSearch, currentFilter]);


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
      minPrice: currentFilter.minPrice,
      maxPrice: currentFilter.maxPrice,
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
      minPrice: "",
      maxPrice: "",
    });
  }, []);

  const isFilterEmpty = () => {
    return !currentFilter.status &&
      !currentFilter.minPrice &&
      !currentFilter.maxPrice
    ;
  };

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    resetCurrentFilter();
    setTimeRefreshTable(new Date());
    setDeletingDeviceId(undefined);
    setRemovingAllDeviceIds(new Set())
  }, []);

    const onShowDeleteDeviceModal = useCallback((deviceId) => {
      showDeleteDeviceModal();
      setDeletingDeviceId(deviceId);
    }, []);
  
    const onDeleteDevice = useCallback(async () => {
      await DeviceApi.delete(deletingDeviceId);
      showSuccessMessage("Xóa thiết bị thành công!");
      hideDeleteDeviceModal();
      onResetTable();
    }, [deletingDeviceId]);
  
    const onShowRemoveAllDeviceModal = useCallback(() => {
      if (removingAllDeviceIds.size === 0) {
        showErrorMessage("Bạn phải chọn ít nhất một thiết bị để loại bỏ");
        return;
      } else {
        showRemoveAllDevicesModal();
      }
    }, [removingAllDeviceIds]);
  
    const onRemoveAllDevices = useCallback(async () => {
      await DeviceApi.deleteAllById(Array.from(removingAllDeviceIds));
      showSuccessMessage("Remove Devices successfully!");
      onResetTable();
      getListDevices();
    }, [removingAllDeviceIds, onResetTable, getListDevices]);
  

  const existsByDeviceCode = useCallback(async (code) => {
    return await DeviceApi.existsByCode(code);
  }, []);

  const onShowCreateDeviceModal = () => {
    // reset modal
    setTimeRefreshCreateForm(new Date());
    getListStatus;
    getListLoai;
    getListManager;
    // show modal
    showCreateDeviceModal();
  };
  const getListStatus = async () => {
    const data = await DeviceApi.getAllDetail();
    setStatuss(data);
  };
    const getListManager = async () => {
      const data = await DeviceApi.getLabName();
      setLabs(data);
    };

  const getListLab = async () => {
    const data = await LabApi.getLabName();
    setLabs(data);
  };

  const getListLoai = async () => {
    const data = await TypeApi.getTypeName();
    setLoais(data);
  };


  const onCreateDevice = useCallback(
    async (
      code,
      name,
      typeId,
      managersId,
      price,
      purchaseDate,
      detailsAssignmentDate,
      status,
    ) => {
      // call api
      await DeviceApi.create(
        code,
        name,
        typeId,
        managersId,
        price,
        purchaseDate,
        detailsAssignmentDate,
        status,
      );
      // show notification
      showSuccessMessage("Create Device Successfully!");
      // hide modal
      hideCreateDeviceModal();
      // reset Device table
      onResetTable();
    }
  );

  const onShowUpdateDeviceModal = async (deviceId) => {
    navigate(`/devices/${deviceId}`);
  };


//import


  const onShowImportDeviceModal = useCallback(async () => {
    // show modal
    showImportDeviceModal();
    // reset modal
    setDevicesForImport([]);
    hideImportDeviceTable();
    setTimeRefreshImportForm(new Date());
  }, []);


  const onChangeExcelFile = useCallback(
    (event, file, setFieldError, setFieldValue) => {
      
      let reader = new FileReader();

      // read file
      reader.onload = function (e) {
        let workbook = XLSX.read(e.target.result, {
          type: "binary",
        });

        // get first sheet
        let firstSheet = workbook.SheetNames[0];
        let rows = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[firstSheet]
        );
        let jsonArray = JSON.stringify(rows);
        jsonArray = JSON.parse(jsonArray);
        
        // format key
        renameOfDeviceKeys(jsonArray);
        // get fullname & id
        getMoreDeviceInfo(jsonArray, event, setFieldError, setFieldValue);
      };

      // error
      reader.onerror = function (exception) {
        console.log(exception);
      };

      reader.readAsBinaryString(file);
    },
    []
  );

const renameOfDeviceKeys = (jsonArray) => {
  jsonArray.forEach((item) => {
    delete Object.assign(item, { code: item["Mã"] })[
          "Mã"
        ];
    delete Object.assign(item, { name: item["Tên Thiết Bị"] })[
      "Tên Thiết Bị"
    ];
    delete Object.assign(item, { typeName: item["Loại"] })["Loại"];
    delete Object.assign(item, { price: item["Giá"] })["Giá"];
    delete Object.assign(item, { managersName: item["Người Quản Lý"] })[
      "Người Quản Lý"
    ];
    delete Object.assign(item, { status: item["Trạng Thái"] })["Trạng Thái"];
    delete Object.assign(item, { laboratoriesName: item["Phòng"] })["Phòng"];
  });
};


  const getMoreDeviceInfo = async (
    devices,
    event,
    setFieldError,
    setFieldValue,
  ) => {
    try {
      setDevicesForImport(devices);
      showImportDeviceTable();
    } catch (error) {
      setDevicesForImport(devices);
      hideImportDeviceTable();

      if (error.response && error.response.status === 400) {
        console.log(error);
        setFieldError(
          "excelFile",
          JSON.stringify(error.response.data.exception)
        );
        setFieldValue("excelFile", "", false);
        event.target.value = null;
      } else {
        throw error;
      }
    }
  };


  const onImportDevices = useCallback(
    async (
      code,
      name,
      typeName,
      price,
      laboratoriesManagerName,
      status,
      laboratoriesName
    ) => {
      // call api
      await DeviceApi.importDevices(
        code,
        name,
        typeName,
        price,
        laboratoriesManagerName,
        status,
        laboratoriesName
      );
      // hide modal
      hideImportDeviceModal();
      // reset device table
      onResetTable();
    },
    []
  );

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
            onClickItem={onShowUpdateDeviceModal}
            onCreate={onShowCreateDeviceModal}
            onDeleteItem={onShowDeleteDeviceModal}
            removingAllDeviceIds={removingAllDeviceIds}
            setRemovingAllIds={setRemovingAllDeviceIds}
            onShowRemoveAllModal={onShowRemoveAllDeviceModal}
            onImport={onShowImportDeviceModal}
          />
        )}

        {isShowCreateDeviceModal && (
          <CreateDeviceModal
            labs={labs}
            loais={loais}
            managers={managers}
            hideModal={hideCreateDeviceModal}
            existsByCode={existsByDeviceCode}
            timeRefreshForm={timeRefreshCreateForm}
            onSubmit={onCreateDevice}
          />
        )}

        {isShowDeleteDeviceModal && (
          <DeleteDeviceModal
            hideModal={hideDeleteDeviceModal}
            name={devices.find((device) => device.id === deletingDeviceId).name}
            onSubmit={onDeleteDevice}
          />
        )}
        {isShowRemoveAllDevicesModal && (
          <RemoveAllDeviceModal
            hideModal={hideRemoveAllDeviceModal}
            devices={devices.filter((device) =>
              removingAllDeviceIds.has(device.id)
            )}
            onRemoveAll={onRemoveAllDevices}
          />
        )}

        {isShowImportDeviceModal && (
          <ImportDeviceModal
            hideModal={hideImportDeviceModal}
            devices={devicesForImport}
            onChangeExcelFile={onChangeExcelFile}
            isShowTable={isShowImportDeviceTable}
            timeRefreshForm={timeRefreshImportForm}
            onSubmit={onImportDevices}
          />
        )}
      </Container>
    </>
  );
};

export default DevicePage;
