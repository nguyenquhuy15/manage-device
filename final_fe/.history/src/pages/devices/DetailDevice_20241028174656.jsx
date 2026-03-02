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

  return (
    <>
      <Helmet title="Detail De" />
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

export default DetailDevicePage;
