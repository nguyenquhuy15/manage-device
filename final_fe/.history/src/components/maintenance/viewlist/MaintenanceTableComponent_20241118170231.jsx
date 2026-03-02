import React, { useMemo } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { PlusCircle, RefreshCcw, Upload, Trash } from "react-feather";

import TableComponent from "./TableComponent";
import PagingComponent from "../../common/table/PagingComponent";
import SearchComponent from "../../common/table/SearchComponent";
import FilterComponent from "./FilterComponent";
import MaintenanceNoDataComponent from "./MaintenanceNoDataComponent";
import AdminContent from "../../../hoc/AdminContent";

const DeviceTableComponent = (props) => {
  const TableComponentMemo = useMemo(
    () => (
      <TableComponent
        maintenances={props.maintenances}
        // paging
        resetPaging={props.resetPaging}
        // sorting
        currentSort={props.currentSort}
        setCurrentSort={props.setCurrentSort}
        //onclick
        // onClickItem={props.onClickItem}
        // onDeleteItem={props.onDeleteItem}
        // removingAllIds={props.removingAllDeviceIds}
        // setRemovingAllIds={props.setRemovingAllIds}
      />
    ),
    [props.maintenances, props.currentSort]
  );

  const PagingComponentMemo = useMemo(() =>
    <PagingComponent
      totalPages={props.totalPages}
      currentPage={props.currentPage}
      setCurrentPage={props.setCurrentPage}
    />
    , [props.currentPage, props.totalPages]
  );

  const SearchComponentMemo = useMemo(
    () => (
      <SearchComponent
        // search
        currentSearch={props.currentSearch}
        setCurrentSearch={props.setCurrentSearch}
        // paging
        resetPaging={props.resetPaging}
        // sorting
        resetCurrentSort={props.resetCurrentSort}
        // refresh table
        timeRefreshTable={props.timeRefreshTable}
      />
    ),
    [props.currentSearch, props.timeRefreshTable]
  );

  const FilterComponentMemo = useMemo(
    () => (
      <FilterComponent
        maintenances={props.maintenances}
        // filter
        currentFilter={props.currentFilter}
        setCurrentFilter={props.setCurrentFilter}
        // paging
        resetPaging={props.resetPaging}
        // sorting
        resetCurrentSort={props.resetCurrentSort}
        // refresh table
        timeRefreshTable={props.timeRefreshTable}
      />
    ),
    [props.currentFilter]
  );

  return (
    <>
      <Card>
        <Card.Body>
          <Row className="mb-3">
            {/* Search component */}
            <Col md={4}>{SearchComponentMemo}</Col>
            <Col md={8} className="d-flex flex-row-reverse align-items-center">
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Refresh Table</Tooltip>}
              >
                <div className="ms-2" onClick={props.onResetTable}>
                  <RefreshCcw size={18} />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Create Device</Tooltip>}
              >
                <div className="ms-2" onClick={props.onCreate}>
                  <PlusCircle size={18} />
                </div>
              </OverlayTrigger>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>Upload Device</Tooltip>}
              >
                <div className="ms-2" onClick={props.onImport}>
                  <Upload size={18} />
                </div>
              </OverlayTrigger>
              <AdminContent>
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip>Remove All Devices</Tooltip>}
                >
                  <div className="ms-2" onClick={props.onShowRemoveAllModal}>
                    <Trash size={18} />
                  </div>
                </OverlayTrigger>
              </AdminContent>
            </Col>
          </Row>

          {/* Filter Component */}
          <div className="mb-3">{FilterComponentMemo}</div>

          {/* Table */}
          {props.maintenances.length == 0 ? (
            <MaintenanceNoDataComponent />
          ) : (
            TableComponentMemo
          )}

          {/* Paging */}
          <Row>
            <Col className="d-flex flex-row-reverse">{PagingComponentMemo}</Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default DeviceTableComponent;
