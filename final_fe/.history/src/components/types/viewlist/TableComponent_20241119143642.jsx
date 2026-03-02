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
            <th style={{ width: "20%" }} className="text-center">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody>
          {props.types.map((type) => (
            <tr key={type.id}>
              <td>{type.name}</td>
              <td>{type.code}</td>
              <td>{type.quantity}</td>
              <td className="table-action text-center">
                <button className="btn btn-sm btn-primary mr-1" title="Edit">
                  <Edit2 size={16} />
                </button>
                <button className="btn btn-sm btn-danger" title="Delete">
                  <Trash size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default TableComponent;
