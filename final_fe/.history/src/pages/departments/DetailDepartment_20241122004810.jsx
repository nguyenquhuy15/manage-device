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
  const [currentDeviceFilter, setCurrentDeviceFilter] = useState({
    status: "",
    minPrice: "",
    maxPrice: "",
  });
  // refresh table
  const [timeRefreshDeviceTable, setTimeRefreshDeviceTable] = useState(new Date());

  // remove device
  const [isShowRemoveDeviceModal, showRemoveDeviceModal, hideRemoveDeviceModal] = useBoolean(false);
  const [removingDeviceId, setRemovingDeviceId] = useState();

  // remove all Devices
  const [isShowRemoveAllDevicesModal, showRemoveAllDevicesModal, hideRemoveAllDevicesModal] = useBoolean(false);
  const [removingAllDeviceIds, setRemovingAllDeviceIds] = useState(new Set());

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
    getListDevices();
  }, [currentDevicePage, currentDeviceSort, currentDeviceSearch, currentDeviceFilter]);

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

  const getListDevices = async () => {
    const data = await DepartmentApi.getAllDevicesInDepartment({
      departmentId: departmentId,
      page: currentDevicePage,
      sortField: currentDeviceSort.sortField,
      isAsc: currentDeviceSort.isAsc,
      search: currentDeviceSearch,
      minCreatedDate: currentDeviceFilter.minDate,
      maxCreatedDate: currentDeviceFilter.maxDate,
      role: currentDeviceFilter.role,
      status: currentDeviceFilter.status
    });
    setDevices(data.content);
    setTotalDevicePages(data.totalPages);
  }

  const resetDevicePaging = useCallback(() =>
    setCurrentDevicePage(1)
    , []);

  const resetCurrentDeviceSort = useCallback(() =>
    setCurrentDeviceSort({ sortField: "id", isAsc: false })
    , [])

  const resetCurrentDeviceSearch = useCallback(() => {
    setCurrentDeviceSearch('');
  }, [])

  const isDeviceSearchEmpty = () => {
    return !currentDeviceSearch || currentDeviceSearch.length === 0;
  }

  const resetCurrentDeviceFilter = useCallback(() => {
    setCurrentDeviceFilter({
      minDate: '',
      maxDate: '',
      role: '',
      status: ''
    });
  }, [])

  const isDeviceFilterEmpty = () => {
    return !currentDeviceFilter.minDate
      && !currentDeviceFilter.maxDate
      && !currentDeviceFilter.role
      && !currentDeviceFilter.status;
  }

  const onResetDeviceTable = useCallback(() => {
    resetDevicePaging();
    resetCurrentDeviceSort();
    resetCurrentDeviceSearch();
    resetCurrentDeviceFilter();
    setTimeRefreshDeviceTable(new Date());
    setRemovingDeviceId(undefined);
    setRemovingAllDeviceIds(new Set());
  }, []);

  const onShowRemoveDeviceModal = useCallback((deviceId) => {
    showRemoveDeviceModal();
    setRemovingDeviceId(deviceId);
  }, []);

  const onRemoveDevice = useCallback(async () => {
    await DepartmentApi.removeDeviceInDetailDepartment(removingDeviceId);
    showSuccessMessage("Xóa thiết bị thành công");
    onResetDeviceTable();
    getDetailDepartmentInfo();
  }, [removingDeviceId]);

  const onShowRemoveAllDeviceModal = useCallback(() => {
    if (removingAllDeviceIds.size === 0) {
      showErrorMessage("You must choose at lease a Device to remove");
      return;
    } else {
      showRemoveAllDevicesModal();
    }
  }, [removingAllDeviceIds]);

  const onRemoveAllDevices = useCallback(async () => {
    await DepartmentApi.removeAllDevicesInDetailDepartment(Array.from(removingAllDeviceIds));
    showSuccessMessage("Remove Devices successfully!");
    onResetDeviceTable();
    getDetailDepartmentInfo();
  }, [removingAllDeviceIds]);

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
            {devices.length == 0 && isDeviceSearchEmpty() && isAccountFilterEmpty()
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