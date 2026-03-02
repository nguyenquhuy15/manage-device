import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";

import LoanApi from "../../api/LoanApi";


import LoanTableComponent from "../../components/loans/viewlist/LoanTableComponent";
import LoanNoDataComponent from "../../components/loans/viewlist/LoanNoDataComponent";
import CreateDeviceModal from "../../components/devices/create/CreateDeviceModal";

import DeleteDeviceModal from "../../components/devices/delete/DeleteDeviceModal";

import RemoveAllDeviceModal from "../../components/devices/delete/RemoveAllDeviceModal";

import ImportDeviceModal from "../../components/devices/import/ImportDeviceModal";
import * as XLSX from "xlsx";

const LoanPage = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

  const [loans, setLoans] = useState([]);

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
    loanDate: "",
    returnDate: ""
  });
  // refresh table
  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());

  // create

  const [
    isShowCreateLoanModal,
    showCreateLoanModal,
    hideCreateLoanModal,
  ] = useBoolean(false);
  
  const [devices, setDevices] = useState([]);
  const [currentSearchDevice, setCurrentSearchDevice] = useState("");
  const [currentSortDevice, setCurrentSortDevice] = useState({
    sortField: "id",
    isAsc: false,
  });
  const [addingDeviceIds, setAddingDeviceIds] = useState(new Set());
  const [timeRefreshTableDevice, setTimeRefreshTableDevice] = useState(
    new Date()
  );
  const [timeRefreshCreateForm, setTimeRefreshCreateForm] = useState(
    new Date()
  );
  const [isShowDeviceTable, showDeviceTable, hideDeviceTable] =
    useBoolean(false);



  // delete
  // const [
  //   isShowDeleteDeviceModal,
  //   showDeleteDeviceModal,
  //   hideDeleteDeviceModal,
  // ] = useBoolean(false);

  // const [
  //   isShowRemoveAllDevicesModal,
  //   showRemoveAllDevicesModal,
  //   hideRemoveAllDeviceModal,
  // ] = useBoolean(false);
  // const [deletingDeviceId, setDeletingDeviceId] = useState();

  // const [removingAllDeviceIds, setRemovingAllDeviceIds] = useState(new Set());


  useEffect(() => {
    getListLoans();
  }, [currentPage, currentSort, currentSearch, currentFilter]);


  const onShowCreateLoanModal = () => {
    // reset modal
    setTimeRefreshCreateForm(new Date());
    hideDeviceTable();
    onResetTableDevice();
    // show modal
    showCreateLoanModal();
  };

    const getListDevices = async () => {
      const data = await LoanApi.getAllDevicesByNoLoan(
        currentSearchDevice,
        currentSortDevice.sortField,
        currentSortDevice.isAsc
      );
      setDevices(data);
  };
  
    const onResetTableDevice = useCallback(() => {
      resetCurrentSortDevice();
      resetCurrentSearchDevice();
      setAddingDeviceIds(new Set());
      setTimeRefreshTableDevice(new Date());
    }, []);
  
    const resetCurrentSearchDevice = useCallback(() => {
      setCurrentSearchDevice("");
    }, []);

    const isDeviceSearchEmpty = () => {
      return !currentSearchDevice || currentSearchDevice.length === 0;
    };

    const resetCurrentSortDevice = useCallback(
      () => setCurrentSortDevice({ sortField: "id", isAsc: false }),
      []
  );
  
    const onCreateLoan = useCallback(
      async (name, contact, info, loanDate, purpose) => {
        // call api
        await LoanApi.create(
          name,
          contact,
          info,
          loanDate,
          purpose,
          Array.from(addingDeviceIds)
        );
        // show notification
        showSuccessMessage("Tạo yêu cầu mượn thiết bị thành công!");
        // hide modal
        hideCreateLoanModal();
        // reset Loan table
        onResetTable();
      },
      [addingDeviceIds]
    );

  const getListLoans = async () => {
    const data = await LoanApi.getAll({
      page: currentPage,
      sortField: currentSort.sortField,
      isAsc: currentSort.isAsc,
      search: currentSearch,
      loanDate: currentFilter.loanDate,
      returnDate: currentFilter.returnDate,
    });
    setLoans(data.content);
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
      loanDate: "",
      returnDate: "",
    });
  }, []);

  const isFilterEmpty = () => {
    return !currentFilter.loanDate && !currentFilter.returnDate;
  };

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    resetCurrentFilter();
    setTimeRefreshTable(new Date());
    // setDeletingDeviceId(undefined);
    // setRemovingAllDeviceIds(new Set());
  }, []);

  // const onShowDeleteDeviceModal = useCallback((deviceId) => {
  //   showDeleteDeviceModal();
  //   setDeletingDeviceId(deviceId);
  // }, []);

  // const onDeleteDevice = useCallback(async () => {
  //   await DeviceApi.deleteDeviceInLab(deletingDeviceId);
  //   showSuccessMessage("Xóa thiết bị thành công!");
  //   hideDeleteDeviceModal();
  //   onResetTable();
  // }, [deletingDeviceId]);

  // const onShowRemoveAllDeviceModal = useCallback(() => {
  //   if (removingAllDeviceIds.size === 0) {
  //     showErrorMessage("Bạn phải chọn ít nhất một thiết bị để loại bỏ");
  //     return;
  //   } else {
  //     showRemoveAllDevicesModal();
  //   }
  // }, [removingAllDeviceIds]);

  // const onRemoveAllDevices = useCallback(async () => {
  //   await DeviceApi.deleteAllById(Array.from(removingAllDeviceIds));
  //   showSuccessMessage("Remove Devices successfully!");
  //   onResetTable();
  //   getListDevices();
  // }, [removingAllDeviceIds, onResetTable, getListDevices]);

  // const existsByDeviceCode = useCallback(async (code) => {
  //   return await DeviceApi.existsByCode(code);
  // }, []);

  // const onShowCreateDeviceModal = () => {
  //   // reset modal
  //   setTimeRefreshCreateForm(new Date());
  //   getListStatus;
  //   getListLoai;
  //   getListManager;
  //   // show modal
  //   showCreateDeviceModal();
  // };
  // const getListStatus = async () => {
  //   const data = await DeviceApi.getAllDetail();
  //   setStatuss(data);
  // };


  // const onCreateDevice = useCallback(
  //   async (
  //     code,
  //     name,
  //     price,
  //     typeId,
  //     laboratoriesId,
  //     purchaseDate,
  //     detailsAssignmentDate,
  //     status
  //   ) => {
  //     // call api
  //     await DeviceApi.create(
  //       code,
  //       name,
  //       price,
  //       typeId,
  //       laboratoriesId,
  //       purchaseDate,
  //       detailsAssignmentDate,
  //       status
  //     );
  //     // show notification
  //     showSuccessMessage("Create Device Successfully!");
  //     // hide modal
  //     hideCreateDeviceModal();
  //     // reset Device table
  //     onResetTable();
  //   }
  // );
    const existsByLoanName = useCallback(async (name) => {
      return await LoanA.existsByName(name);
    }, []);

  const onShowUpdateLoan = async (loanId) => {
    navigate(`/loans/${loanId}`);
  };


  return (
    <>
      <Helmet title="Yêu cầu mượn thiết bị" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Yêu cầu thiết bị</h1>

        {loans.length == 0 && isSearchEmpty() && isFilterEmpty() ? (
          <LoanNoDataComponent />
        ) : (
          <LoanTableComponent
            // table
            loans={loans}
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
            onClickItem={onShowUpdateLoan}
            // onCreate={onShowCreateDeviceModal}
            // onDeleteItem={onShowDeleteDeviceModal}
            // removingAllDeviceIds={removingAllDeviceIds}
            // setRemovingAllIds={setRemovingAllDeviceIds}
            // onShowRemoveAllModal={onShowRemoveAllDeviceModal}
            // onImport={onShowImportDeviceModal}
          />
        )}

        {isShowCreateLoanModal && (
          <CreateLoanModal
            hideModal={hideCreateLoanModal}
            existsByName={existsByLoanName}
            isShowTable={isShowDeviceTable}
            showTable={showDeviceTable}
            devices={devices}
            // sorting
            currentSort={currentSortDevice}
            setCurrentSort={setCurrentSortDevice}
            resetCurrentSort={resetCurrentSortDevice}
            // search
            currentSearch={currentSearchDevice}
            setCurrentSearch={setCurrentSearchDevice}
            isSearchEmpty={isDeviceSearchEmpty}
            // refresh table
            timeRefreshTable={timeRefreshTableDevice}
            onResetTable={onResetTableDevice}
            // checkbox
            addingIds={addingDeviceIds}
            setAddingIds={setAddingDeviceIds}
            timeRefreshForm={timeRefreshCreateForm}
            onSubmit={onCreateLoan}
          />
        )}

        {/* {isShowDeleteDeviceModal && (
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
        )} */}
      </Container>
    </>
  );
};

export default LoanPage;
