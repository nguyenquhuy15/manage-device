import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import withRouter from "../../hoc/withRouter";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { connect } from 'react-redux';
import { selectRole } from '../../redux/selector/UserInfoSelector';
import { ROLE } from "../../constants";
import { Helmet } from "react-helmet-async";
import { Card, Container } from "react-bootstrap";
import DepartmentApi from "../../api/DepartmentApi";
import UserApi from "../../api/UserApi";
import DetailDepartmentComponent from "../../components/departments/viewdetail/DetailDepartmentComponent";
import AccountTableComponent from "../../components/departments/viewdetail/accounts/viewlist/AccountTableComponent";
import AccountNoDataComponent from "../../components/departments/viewdetail/accounts/viewlist/AccountNoDataComponent";
import RemoveAccountModal from "../../components/departments/viewdetail/accounts/remove/RemoveAccountModal";
import RemoveAllAccountsModal from "../../components/departments/viewdetail/accounts/remove/RemoveAllAccountsModal";

const DetailDepartmentPage = (props) => {

  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

  const departmentId = props.router.params.id;

  /**
   * Detail Department Info
  */
  const [detailDepartmentInfo, setDetailDepartmentInfo] = useState({
    name: "",
    location: "",
    departmentsName: "",
    managerName: "",
    quantity: "",
    email: "",
    phone: "",
    subjectsName: ""
  });

  /** 
   * devices
  */
  const [devices, setDevices] = useState([]);
  // paging
  const [currentDevicePage, setCurrentDevicePage] = useState(1);
  const [totalDevicePages, setTotalDevicePages] = useState(0);
  // sorting
  const [currentDeviceSort, setCurrentDeviceSort] = useState({ sortField: "id", isAsc: false });
  // search
  const [currentDeviceSearch, setCurrentDeviceSearch] = useState('');
  // filter
  const [currentDeviceFilter, setCurrentAccountFilter] = useState({
    minDate: '',
    maxDate: '',
    role: '',
    status: ''
  });
  // refresh table
  const [timeRefreshAccountTable, setTimeRefreshAccountTable] = useState(new Date());

  // remove account
  const [isShowRemoveAccountModal, showRemoveAccountModal, hideRemoveAccountModal] = useBoolean(false);
  const [removingAccountId, setRemovingAccountId] = useState();

  // remove all accounts
  const [isShowRemoveAllAccountsModal, showRemoveAllAccountsModal, hideRemoveAllAccountsModal] = useBoolean(false);
  const [removingAllAccountIds, setRemovingAllAccountIds] = useState(new Set());

  useEffect(() => {
    if (props.role === ROLE.MANAGER) {
      checkPermissionForManager();
    }
  }, []);

  const checkPermissionForManager = async () => {
    const departmentInfo = await UserApi.getDepartmentInfo();
    if (departmentId != departmentInfo.id) {
      navigate("/auth/403");
    }
  }

  useEffect(() => {
    getDetailDepartmentInfo();
  }, []);

  useEffect(() => {
    getListAccounts();
  }, [currentAccountPage, currentAccountSort, currentAccountSearch, currentAccountFilter]);

  const getDetailDepartmentInfo = async () => {
    try {
      const departmentInfo = await DepartmentApi.getDetail(departmentId);
      setDetailDepartmentInfo(departmentInfo);
    } catch (error) {
      if (error.response.status === 400) {
        navigate("/auth/404");
      } else {
        throw error;
      }
    }
  }

  const getListAccounts = async () => {
    const data = await DepartmentApi.getAllAccountsInDepartment({
      departmentId: departmentId,
      page: currentAccountPage,
      sortField: currentAccountSort.sortField,
      isAsc: currentAccountSort.isAsc,
      search: currentAccountSearch,
      minCreatedDate: currentAccountFilter.minDate,
      maxCreatedDate: currentAccountFilter.maxDate,
      role: currentAccountFilter.role,
      status: currentAccountFilter.status
    });
    setAccounts(data.content);
    setTotalAccountPages(data.totalPages);
  }

  const resetAccountPaging = useCallback(() =>
    setCurrentAccountPage(1)
    , []);

  const resetCurrentAccountSort = useCallback(() =>
    setCurrentAccountSort({ sortField: "id", isAsc: false })
    , [])

  const resetCurrentAccountSearch = useCallback(() => {
    setCurrentAccountSearch('');
  }, [])

  const isAccountSearchEmpty = () => {
    return !currentAccountSearch || currentAccountSearch.length === 0;
  }

  const resetCurrentAccountFilter = useCallback(() => {
    setCurrentAccountFilter({
      minDate: '',
      maxDate: '',
      role: '',
      status: ''
    });
  }, [])

  const isAccountFilterEmpty = () => {
    return !currentAccountFilter.minDate
      && !currentAccountFilter.maxDate
      && !currentAccountFilter.role
      && !currentAccountFilter.status;
  }

  const onResetAccountTable = useCallback(() => {
    resetAccountPaging();
    resetCurrentAccountSort();
    resetCurrentAccountSearch();
    resetCurrentAccountFilter();
    setTimeRefreshAccountTable(new Date());
    setRemovingAccountId(undefined);
    setRemovingAllAccountIds(new Set());
  }, []);

  const onShowRemoveAccountModal = useCallback((accountId) => {
    showRemoveAccountModal();
    setRemovingAccountId(accountId);
  }, []);

  const onRemoveAccount = useCallback(async () => {
    await DepartmentApi.removeAccountInDetailDepartment(removingAccountId);
    showSuccessMessage("Xóa thiết bị thành công");
    onResetAccountTable();
    getDetailDepartmentInfo();
  }, [removingAccountId]);

  const onShowRemoveAllAccountModal = useCallback(() => {
    if (removingAllAccountIds.size === 0) {
      showErrorMessage("You must choose at lease a account to remove");
      return;
    } else {
      showRemoveAllAccountsModal();
    }
  }, [removingAllAccountIds]);

  const onRemoveAllAccounts = useCallback(async () => {
    await DepartmentApi.removeAllAccountsInDetailDepartment(Array.from(removingAllAccountIds));
    showSuccessMessage("Remove Accounts successfully!");
    onResetAccountTable();
    getDetailDepartmentInfo();
  }, [removingAllAccountIds]);

  const DetailDepartmentComponentMemo = useMemo(() =>
    <DetailDepartmentComponent
      info={detailDepartmentInfo}
    />
    , [detailDepartmentInfo]);

  return (
    <>
      <Helmet title="Detail Department" />
      <Container fluid className="p-0">
        <Card>
          <Card.Header>
            <h1 className="h3 mb-3 text-center">{detailDepartmentInfo.name} Department</h1>
            <hr />
          </Card.Header>
          <Card.Body>
            {DetailDepartmentComponentMemo}
            {accounts.length == 0 && isAccountSearchEmpty() && isAccountFilterEmpty()
              ? <AccountNoDataComponent />
              : <AccountTableComponent
                // table
                accounts={accounts}
                // paging
                totalPages={totalAccountPages}
                currentPage={currentAccountPage}
                setCurrentPage={setCurrentAccountPage}
                resetPaging={resetAccountPaging}
                // sorting
                currentSort={currentAccountSort}
                setCurrentSort={setCurrentAccountSort}
                resetCurrentSort={resetCurrentAccountSort}
                // search
                currentSearch={currentAccountSearch}
                setCurrentSearch={setCurrentAccountSearch}
                // filter
                currentFilter={currentAccountFilter}
                setCurrentFilter={setCurrentAccountFilter}
                // refresh table
                timeRefreshTable={timeRefreshAccountTable}
                onResetTable={onResetAccountTable}
                // remove
                onShowRemoveModal={onShowRemoveAccountModal}
                // remove all
                removingAllIds={removingAllAccountIds}
                setRemovingAllIds={setRemovingAllAccountIds}
                onShowRemoveAllModal={onShowRemoveAllAccountModal}
              />}

            {isShowRemoveAccountModal &&
              <RemoveAccountModal
                hideModal={hideRemoveAccountModal}
                account={accounts.find((account) => account.id === removingAccountId)}
                onRemove={onRemoveAccount}
              />
            }

            {isShowRemoveAllAccountsModal &&
              <RemoveAllAccountsModal
                hideModal={hideRemoveAllAccountsModal}
                accounts={accounts.filter((account) => removingAllAccountIds.has(account.id))}
                onRemoveAll={onRemoveAllAccounts}
              />
            }

          </Card.Body>
        </Card>
      </Container>
    </>
  )
};

export default connect(
  state => {
    return {
      role: selectRole(state)
    };
  }
)(withRouter(DetailDepartmentPage));