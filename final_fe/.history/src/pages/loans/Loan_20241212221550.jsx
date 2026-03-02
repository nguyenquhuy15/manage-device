import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";

import LoanApi from "../../api/LoanApi";
import DeviceApi from "../../api/DeviceApi";

import LoanTableComponent from "../../components/loans/viewlist/LoanTableComponent";
import LoanNoDataComponent from "../../components/loans/viewlist/LoanNoDataComponent";
import CreateLoanModal from "../../components/loans/create/CreateLoanModal";

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
    returnDate: "",
    status: "",
  });
  // refresh table
  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());

  // create

  const [isShowCreateLoanModal, showCreateLoanModal, hideCreateLoanModal] =
    useBoolean(false);

  const [devices, setDevices] = useState([]);
  const [currentPageDevice, setCurrentPageDevice] = useState(1);
  const [totalPagesDevice, setTotalPages] = useState(0);
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

  useEffect(() => {
    if (isShowCreateLoanModal) {
      getListDevices();
    }
  }, [isShowCreateLoanModal, currentSearchDevice, currentSortDevice]);

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
    const data = await DeviceApi.getAllDevicesByNoLoan({
      page: currentPage,
      sortField: currentSort.sortField,
      isAsc: currentSort.isAsc,
      search: currentSearch,
    });
    setDevices(data);
    setTotalPages(data.totalPages);
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
    return !devices || devices.length === 0;
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
      status: currentFilter.status,
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
      status: "",
    });
  }, []);

  const isFilterEmpty = () => {
    return (
      !currentFilter.loanDate &&
      !currentFilter.returnDate &&
      !currentFilter.status
    );
  };

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    resetCurrentFilter();
    setTimeRefreshTable(new Date());
    setLoanIdForReturn(undefined);
  }, []);

  const existsByLoanName = useCallback(async (name) => {
    return await LoanApi.existsByName(name);
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
            onCreate={onShowCreateLoanModal}
          />
        )}

        {isShowCreateLoanModal && (
          <CreateLoanModal
            hideModal={hideCreateLoanModal}
            existsByName={existsByLoanName}
            isShowTable={isShowDeviceTable}
            showTable={showDeviceTable}
            devices={devices}
            //page
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            resetPaging={resetPaging}
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
      </Container>
    </>
  );
};

export default LoanPage;
