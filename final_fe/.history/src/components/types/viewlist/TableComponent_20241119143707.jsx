import React from "react";
import { Table } from "react-bootstrap";
import SortComponent from "../../common/table/SortComponent";
import { Edit2, Trash } from "react-feather";

const TableComponent = React.memo((props) => {
  return (
    <div className="table-responsive">
      <Table striped hover bordered className="table-custom">
        <thead className="thead-light">
          <tr>
            <th style={{ width: "30%" }}>
              Tên loại thiết bị
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "30%" }}>
              Mã loại thiết bị
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="code"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              Số lượng thiết bị
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="quantity"
                resetPaging={props.resetPaging}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.types.map((type) => (
            <tr key={type.id}>
              <td>{type.name}</td>
              <td>{type.code}</td>
              <td>{type.quantity}</td>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default TableComponent;
