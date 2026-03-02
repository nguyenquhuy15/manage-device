import React, { useMemo } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { PlusCircle, RefreshCcw, Upload } from "react-feather";

import TableComponent from "./TableComponent";
import PagingComponent from "../../common/table/PagingComponent";
import SearchComponent from "../../common/table/SearchComponent";
import FilterComponent from "./FilterComponent";
import DeviceNoDataComponent from "./DeviceNoDataComponent";

const DeviceTableComponent = (props) => {
  const TableComponentMemo = useMemo(
    () => (
      <TableComponent
        devices={props.devices}
        // paging
        resetPaging={props.resetPaging}
        // sorting
        currentSort={props.currentSort}
        setCurrentSort={props.setCurrentSort}
        // onclick
        onClickItem={props.onClickItem}
        onUpdateItem={props.onUpdateItem}
        onDeleteItem={props.onDeleteItem}
      />
    ),
    [props.devices, props.currentSort]
  );

  const PagingComponentMemo = useMemo(() =>
      <PagingComponent
        totalPages={props.totalPages}
        currentPage={props.currentPage}
        setCurrentPage={props.setCurrentPage}
      />
    ,[props.currentPage, props.totalPages]
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
            <Col md={6}>{SearchComponentMemo}</Col>
            <Col md={6} className="d-flex flex-row-reverse align-items-center">
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
            </Col>
          </Row>

          {/* Filter Component */}
          <div className="mb-3">{FilterComponentMemo}</div>

          {/* Table */}
          {props.devices.length == 0 ? 
            <DeviceNoDataComponent />
           : 
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
