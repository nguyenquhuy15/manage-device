import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import withRouter from "../../hoc/withRouter";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { connect } from "react-redux";
import { selectRole } from "../../redux/selector/UserInfoSelector";
import { ROLE } from "../../constants";
import { Helmet } from "react-helmet-async";
import { Card, Container } from "react-bootstrap";
import LoanApi from "../../api/LoanApi";
import UserApi from "../../api/UserApi";
import UpdateComponent from "../update/UpdateComponent";
import DetailLoanComponent from "../../components/loans/viewdetail/DetailLoanComponent";
import DeviceTableComponent from "../../components/loans/viewdetail/devices/viewlist/DeviceTableComponent";
import DeviceNoDataComponent from "../../components/loans/viewdetail/devices/viewlist/DeviceNoDataComponent";
import RemoveDeviceModal from "../../components/loans/viewdetail/devices/remove/RemoveDeviceModal";
import RemoveAllDevicesModal from "../../components/loans/viewdetail/devices/remove/RemoveAllDevicesModal";



const DetailLoanPage = (props) => {
   const loanId = props.router.params.id;

   const navigate = useNavigate();
   const [showSuccessMessage, showErrorMessage] = useNotification();

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
     getDetailLoanInfo(loanId);
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

//   const onShowRemoveDeviceModal = useCallback((deviceId) => {
//     showRemoveDeviceModal();
//     setRemovingDeviceId(deviceId);
//   }, []);

//   const onRemoveDevice = useCallback(async () => {
//     await DepartmentApi.removeDeviceInDetailDepartment(removingDeviceId);
//     showSuccessMessage("Xóa thiết bị thành công");
//     onResetDeviceTable();
//     getDetailDepartmentInfo();
//   }, [removingDeviceId]);

//   const onShowRemoveAllDeviceModal = useCallback(() => {
//     if (removingAllDeviceIds.size === 0) {
//       showErrorMessage("You must choose at lease a Device to remove");
//       return;
//     } else {
//       showRemoveAllDevicesModal();
//     }
//   }, [removingAllDeviceIds]);

//   const onRemoveAllDevices = useCallback(async () => {
//     await DepartmentApi.removeAllDevicesInDetailDepartment(
//       Array.from(removingAllDeviceIds)
//     );
//     showSuccessMessage("Remove Devices successfully!");
//     onResetDeviceTable();
//     getDetailDepartmentInfo();
//   }, [removingAllDeviceIds]);

  const DetailLoanComponentMemo = useMemo(
    () => <UpdateComponent info={detailLoanInfo} />,
    [detailLoanInfo]
  );

  return (
    <>
      <Helmet title="Detail Loan" />
      <Container fluid className="p-0">
        <Card>
          <Card.Header>
            <h1 className="h3 mb-3 text-center">{detailLoanInfo.name} Loan</h1>
            <hr />
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
      </Container>
    </>
  );
};

export default connect((state) => {
  return {
    role: selectRole(state),
  };
})(withRouter(DetailLoanPage));
