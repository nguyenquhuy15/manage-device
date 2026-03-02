import React, { useMemo } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { PlusCircle, RefreshCcw, Upload } from "react-feather";

import TableComponent from "./TableComponent";
import PagingComponent from "../../common/table/PagingComponent";
import SearchComponent from "../../common/table/SearchComponent";
import FilterComponent from "./FilterComponent";
import DepartmentNoDataComponent from "./DepartmentNoDataComponent";

const DepartmentTableComponent = (props) => {
    // Memoize the TableComponent to optimize performance
    const TableComponentMemo = useMemo(() => (
        <TableComponent
            departments={props.departments}
            resetPaging={props.resetPaging}
            currentSort={props.currentSort}
            setCurrentSort={props.setCurrentSort}
            // Uncomment the following lines if you need to handle item clicks
            // onClickItem={props.onClickItem}
            // onUpdateItem={props.onUpdateItem}
            // onDeleteItem={props.onDeleteItem}
        />
    ), [props.departments, props.currentSort]);

    // Memoize the PagingComponent to optimize performance
    const PagingComponentMemo = useMemo(() => (
        <PagingComponent
            totalPages={props.totalPages}
            currentPage={props.currentPage}
            setCurrentPage={props.setCurrentPage}
        />
    ), [props.currentPage, props.totalPages]);

    // Memoize the SearchComponent to optimize performance
    const SearchComponentMemo = useMemo(() => (
        <SearchComponent
            currentSearch={props.currentSearch}
            setCurrentSearch={props.setCurrentSearch}
            resetPaging={props.resetPaging}
            resetCurrentSort={props.resetCurrentSort}
            timeRefreshTable={props.timeRefreshTable}
        />
    ), [props.currentSearch, props.timeRefreshTable]);

    // Memoize the FilterComponent to optimize performance
    const FilterComponentMemo = useMemo(() => (
        <FilterComponent
            status={props.status}
            currentFilter={props.currentFilter}
            setCurrentFilter={props.setCurrentFilter}
            resetPaging={props.resetPaging}
            resetCurrentSort={props.resetCurrentSort}
            timeRefreshTable={props.timeRefreshTable}
        />
    ), [props.currentFilter, props.status]);

    return (
        <Card>
            <Card.Body>
                <Row className="mb-3">
                    {/* Search component */}
                    <Col md={6}>
                        {SearchComponentMemo}
                    </Col>
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
                            overlay={<Tooltip>Create Department</Tooltip>}
                        >
                            <div className="ms-2" onClick={props.onCreate}>
                                <PlusCircle size={18} />
                            </div>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="bottom"
                            overlay={<Tooltip>Upload Accounts</Tooltip>}
                        >
                            <div className="ms-2" onClick={props.onImport}>
                                <Upload size={18} />
                            </div>
                        </OverlayTrigger>
                    </Col>
                </Row>

                {/* Filter Component */}
                <div className="mb-3">
                    {FilterComponentMemo}
                </div>

                {/* Table */}
                {props.departments.length === 0
                    ? <DepartmentNoDataComponent />
                    : TableComponentMemo}

                {/* Paging */}
                <Row>
                    <Col className="d-flex flex-row-reverse">
                        {PagingComponentMemo}
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default DepartmentTableComponent;
