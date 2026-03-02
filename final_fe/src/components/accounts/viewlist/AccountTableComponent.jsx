import React, { useMemo } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { PlusCircle, RefreshCcw, Upload, Trash } from "react-feather";

import TableComponent from "./TableComponent";
import PagingComponent from "../../common/table/PagingComponent";
import SearchComponent from "../../common/table/SearchComponent";
import FilterComponent from "./FilterComponent";
import AccountNoDataComponent from "./AccountNoDataComponent";
import AdminContent from "../../../hoc/AdminContent";

const AccountTableComponent = (props) => {
  const TableComponentMemo = useMemo(
    () => (
      <TableComponent
        accounts={props.accounts}
        // paging
        resetPaging={props.resetPaging}
        // sorting
        currentSort={props.currentSort}
        setCurrentSort={props.setCurrentSort}
        //onclick
        // onClickItem={props.onClickItem}
        onDeleteItem={props.onDeleteItem}
        // removingAllIds={props.removingAllDeviceIds}
        // setRemovingAllIds={props.setRemovingAllIds}
      />
    ),
    [props.accounts, props.currentSort]
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
            </Col>
          </Row>

          {/* Filter Component */}
          <div className="mb-3">{FilterComponentMemo}</div>

          {/* Table */}
          {props.accounts.length == 0 ? (
            <AccountNoDataComponent />
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

export default AccountTableComponent;
