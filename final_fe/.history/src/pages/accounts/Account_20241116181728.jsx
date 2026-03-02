import React, { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, Container } from "react-bootstrap";
import { appConfig } from "../../config";
import { useNavigate } from "react-router-dom";
import useNotification from "../../hooks/useNotification";
import AccountApi from "../../api/AccountApi";
import AccountTableComponent from "../../components/accounts/viewlist/AccountTableComponent";
import AccountNoDataComponent from "../../components/accounts/viewlist/AccountNoDataComponent";

const AccountPage = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();
  const [accounts, setAccounts] = useState([]);
  // paging
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const resetPaging = useCallback(() => setCurrentPage(1), []);
  // sorting
  const [currentSort, setCurrentSort] = useState({
    sortField: "id",
    isAsc: false,
  });
  const resetCurrentSort = useCallback(
    () => setCurrentSort({ sortField: "id", isAsc: false }),
    []
  );
  // search
  const [currentSearch, setCurrentSearch] = useState("");
  const resetCurrentSearch = useCallback(() => {
    setCurrentSearch("");
  }, []);
  const isSearchEmpty = () => {
    return !currentSearch || currentSearch.length === 0;
  };
  const [currentFilter, setCurrentFilter] = useState({
    status: "",
  });

  // refresh table
  const [timeRefreshTable, setTimeRefreshTable] = useState(new Date());

  // delete
  const [
    isShowDeleteDeviceModal,
    showDeleteDeviceModal,
    hideDeleteDeviceModal,
  ] = useBoolean(false);

    const [deletingAccountId, setDeletingAccountId] = useState();

  useEffect(() => {
    getListAccounts();
  }, [currentPage, currentSort, currentSearch]);

  const getListAccounts = async () => {
    const data = await AccountApi.getAll({
      page: currentPage,
      sortField: currentSort.sortField,
      isAsc: currentSort.isAsc,
      search: currentSearch,
      role: currentFilter.role,
      status: currentFilter.status,
    });
    setAccounts(data.content);
    setTotalPages(data.totalPages);
  };
  const resetCurrentFilter = useCallback(() => {
    setCurrentFilter({
      role: "",
      status: "",
    });
  }, []);
  const isFilterEmpty = () => {
    return !currentFilter.role && !currentFilter.status;
  };

  const onResetTable = useCallback(() => {
    resetPaging();
    resetCurrentSort();
    resetCurrentSearch();
    resetCurrentFilter();
    setTimeRefreshTable(new Date());
    setDeletingAccountId(undefined)
  }, []);
  
  return (
    <>
      <Helmet title="Account" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Account Page</h1>

        {accounts.length == 0 && isSearchEmpty() && isFilterEmpty() ? (
          <AccountNoDataComponent />
        ) : (
          <AccountTableComponent
            // table
            accounts={accounts}
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
            // onDeleteItem={onShowDeleteDeviceModal}
            // removingAllDeviceIds={removingAllDeviceIds}
            // setRemovingAllIds={setRemovingAllDeviceIds}
            // onShowRemoveAllModal={onShowRemoveAllDeviceModal}
          />
        )}
      </Container>
    </>
  );
};

export default AccountPage;
