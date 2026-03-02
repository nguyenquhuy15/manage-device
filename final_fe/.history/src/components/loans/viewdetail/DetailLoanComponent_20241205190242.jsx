import React, { useCallback, useState, useEffect } from "react";

import UpdateComponent from "../update/UpdateComponent";
import { useNavigate } from "react-router-dom";

import useNotification from "../../../hooks/useNotification";
import withRouter from "../../../hoc/withRouter";
import { Card } from "react-bootstrap";

import DeviceApi from "../../../api/DeviceApi";
import LoanApi from "../../../api/LoanApi";
const DetailLoanComponent = (props) => {
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

  const loanId = props.router.params.id;

  /**
   * Detail loan Info
   */
  const [detailLoanInfo, setDetailLoanInfo] = useState({
    devicesCode: "",
    devicesName: "",
    loansName: "",
    loansContact: "",
    loansInfo: "",
    loansLoanDate: "",
    loansReturnDate: "",
    loansQuantity: "",
    loansPurpose: "",
  });

  /**
   * devices
   */
  const [devices, setDevices] = useState([]);
  // paging
  const [currentDevicePage, setCurrentDevicePage] = useState(1);
  const [totalDevicePages, setTotalDevicePages] = useState(0);
  // sorting
  const [currentDeviceSort, setCurrentDeviceSort] = useState({
    sortField: "id",
    isAsc: false,
  });
  // search
  const [currentDeviceSearch, setCurrentDeviceSearch] = useState("");
  // filter
  const [currentDeviceFilter, setCurrentDeviceFilter] = useState({
    status: "",
    minPrice: "",
    maxPrice: "",
  });
  // refresh table
  const [timeRefreshDeviceTable, setTimeRefreshDeviceTable] = useState(
    new Date()
  );

  useEffect(() => {
    getDetailLoanInfo();
  }, []);

  useEffect(() => {
    getListDevices();
  }, [
    currentDevicePage,
    currentDeviceSort,
    currentDeviceSearch,
    currentDeviceFilter,
  ]);

  const getDetailLoanInfo = async () => {
    try {
      const loanInfo = await LoanApi.getDetail(loanId);
      setDetailLoanInfo(loanInfo);
    } catch (error) {
      if (error.response.status === 400) {
        navigate("/auth/404");
      } else {
        throw error;
      }
    }
  };

  const getListDevices = async () => {
    const data = await LoanApi.getAllDevicesInLoan({
      loanId: loanId,
      page: currentDevicePage,
      sortField: currentDeviceSort.sortField,
      isAsc: currentDeviceSort.isAsc,
      search: currentDeviceSearch,
      status: currentDeviceFilter.status,
      minPrice: currentDeviceFilter.minPrice,
      maxPrice: currentDeviceFilter.maxPrice,
    });
    setDevices(data.content);
    setTotalDevicePages(data.totalPages);
  };

  const resetDevicePaging = useCallback(() => setCurrentDevicePage(1), []);

  const resetCurrentDeviceSort = useCallback(
    () => setCurrentDeviceSort({ sortField: "id", isAsc: false }),
    []
  );

  const resetCurrentDeviceSearch = useCallback(() => {
    setCurrentDeviceSearch("");
  }, []);

  const isDeviceSearchEmpty = () => {
    return !currentDeviceSearch || currentDeviceSearch.length === 0;
  };

  const resetCurrentDeviceFilter = useCallback(() => {
    setCurrentDeviceFilter({
      status: "",
      minPrice: "",
      maxPrice: "",
    });
  }, []);

  const isDeviceFilterEmpty = () => {
    return (
      !currentDeviceFilter.status &&
      !currentDeviceFilter.minPrice &&
      !currentDeviceFilter.maxPrice
    );
  };

  const onResetDeviceTable = useCallback(() => {
    resetDevicePaging();
    resetCurrentDeviceSort();
    resetCurrentDeviceSearch();
    resetCurrentDeviceFilter();
    setTimeRefreshDeviceTable(new Date());
    // setRemovingDeviceId(undefined);
    // setRemovingAllDeviceIds(new Set());
  }, []);

  const onUpdateLoanItem = useCallback(
    async (loanId, loansReturnDate, loansPurpose) => {
      // call api
      await LoanApi.update(loanId, loansReturnDate, loansPurpose);

      // show notification
      showSuccessMessage("Cập nhật thành công");
      // hide modal
      handleClose();
      // reset Device table
      onResetTable();
    },
    []
  );
    const handleClose = () => {
      navigate(`/loans`);
    };

  return (
    <>
      <Card>
        <Card.Header>
          <UpdateComponent
            info={detailLoanInfo}
            timeRefreshForm={timeRefreshDeviceTable}
            onSubmit={onUpdateLoanItem}
            hideModal={handleClose}
          />
        </Card.Header>
        <Card.Body>
          {DetailLoanComponentMemo}
          {devices.length == 0 &&
          isDeviceSearchEmpty() &&
          isDeviceFilterEmpty() ? (
            <DeviceNoDataComponent />
          ) : (
            <DeviceTableComponent
              // table
              devices={devices}
              // paging
              totalPages={totalDevicePages}
              currentPage={currentDevicePage}
              setCurrentPage={setCurrentDevicePage}
              resetPaging={resetDevicePaging}
              // sorting
              currentSort={currentDeviceSort}
              setCurrentSort={setCurrentDeviceSort}
              resetCurrentSort={resetCurrentDeviceSort}
              // search
              currentSearch={currentDeviceSearch}
              setCurrentSearch={setCurrentDeviceSearch}
              // filter
              currentFilter={currentDeviceFilter}
              setCurrentFilter={setCurrentDeviceFilter}
              // refresh table
              timeRefreshTable={timeRefreshDeviceTable}
              onResetTable={onResetDeviceTable}
              // // remove
              // onShowRemoveModal={onShowRemoveDeviceModal}
              // // remove all
              // removingAllIds={removingAllDeviceIds}
              // setRemovingAllIds={setRemovingAllDeviceIds}
              // onShowRemoveAllModal={onShowRemoveAllDeviceModal}
            />
          )}

          {/* {isShowRemoveDeviceModal && (
              <RemoveDeviceModal
                hideModal={hideRemoveDeviceModal}
                device={devices.find(
                  (device) => device.id === removingDeviceId
                )}
                onRemove={onRemoveDevice}
              />
            )}

            {isShowRemoveAllDevicesModal && (
              <RemoveAllDevicesModal
                hideModal={hideRemoveAllDevicesModal}
                devices={devices.filter((device) =>
                  removingAllDeviceIds.has(device.id)
                )}
                onRemoveAll={onRemoveAllDevices}
              />
            )} */}
        </Card.Body>
      </Card>
    </>
  );
};
export default withRouter(DetailLoanComponent);
