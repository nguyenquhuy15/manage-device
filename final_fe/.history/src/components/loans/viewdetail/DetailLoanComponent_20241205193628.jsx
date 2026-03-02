import React, { useCallback, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../../../hooks/useNotification";
import { Card } from "react-bootstrap";
import LoanApi from "../../../api/LoanApi";
import DeviceTableComponent from "../viewdetail/devices/viewlist/DeviceTableComponent";
import DeviceNoDataComponent from "../viewdetail/devices/viewlist/DeviceNoDataComponent";
import UpdateComponent from "../update/UpdateComponent";

const DetailLoanComponent = () => {
  const { id: loanId } = useParams(); // Sử dụng useParams để lấy loanId
  const navigate = useNavigate();
  const [showSuccessMessage, showErrorMessage] = useNotification();

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

  const [devices, setDevices] = useState([]);
  const [currentDevicePage, setCurrentDevicePage] = useState(1);
  const [totalDevicePages, setTotalDevicePages] = useState(0);
  const [currentDeviceSort, setCurrentDeviceSort] = useState({
    sortField: "id",
    isAsc: false,
  });
  const [currentDeviceSearch, setCurrentDeviceSearch] = useState("");
  const [currentDeviceFilter, setCurrentDeviceFilter] = useState({
    status: "",
    minPrice: "",
    maxPrice: "",
  });
  const [timeRefreshDeviceTable, setTimeRefreshDeviceTable] = useState(
    new Date()
  );

  useEffect(() => {
    getDetailLoanInfo(loanId);
  }, [loanId]);

  useEffect(() => {
    getListDevices();
  }, [
    currentDevicePage,
    currentDeviceSort,
    currentDeviceSearch,
    currentDeviceFilter,
  ]);

  const getDetailLoanInfo = async (loanId) => {
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
  const resetCurrentDeviceSearch = useCallback(
    () => setCurrentDeviceSearch(""),
    []
  );
  const resetCurrentDeviceFilter = useCallback(
    () => setCurrentDeviceFilter({ status: "", minPrice: "", maxPrice: "" }),
    []
  );
  const onResetDeviceTable = useCallback(() => {
    resetDevicePaging();
    resetCurrentDeviceSort();
    resetCurrentDeviceSearch();
    resetCurrentDeviceFilter();
    setTimeRefreshDeviceTable(new Date());
  }, []);

  const onUpdateLoanItem = useCallback(
    async (loanId, loansReturnDate, loansPurpose) => {
      await LoanApi.update(loanId, loansReturnDate, loansPurpose);
      showSuccessMessage("Cập nhật thành công");
      handleClose();
      onResetDeviceTable();
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
          {devices.length === 0 &&
          isDeviceSearchEmpty() &&
          isDeviceFilterEmpty() ? (
            <DeviceNoDataComponent />
          ) : (
            <DeviceTableComponent
              devices={devices}
              totalPages={totalDevicePages}
              currentPage={currentDevicePage}
              setCurrentPage={setCurrentDevicePage}
              resetPaging={resetDevicePaging}
              currentSort={currentDeviceSort}
              setCurrentSort={setCurrentDeviceSort}
              resetCurrentSort={resetCurrentDeviceSort}
              currentSearch={currentDeviceSearch}
              setCurrentSearch={setCurrentDeviceSearch}
              currentFilter={currentDeviceFilter}
              setCurrentFilter={setCurrentDeviceFilter}
              timeRefreshTable={timeRefreshDeviceTable}
              onResetTable={onResetDeviceTable}
            />
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default DetailLoanComponent;
