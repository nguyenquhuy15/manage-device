import React from "react";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import AdminContent from "../../../../src/hoc/AdminContent";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
  const statusMapping = {
    DONE: "Đã sửa xong",
    UNFINISHED: "Đang sửa chữa",
    MAINTENANCE: "Đang sửa chữa"
  };

  return (
    <>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{ width: "5%" }}>
              Tên loại thiết bị
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              Mã loại thiết bị
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="code"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Số lượng thiết bị
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="quantity"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.types.map((type) => (
            <tr key={type.id}>
              <td>{type.name}</td>
              <td>{type.code}</td>
              <td>{type.quantity}</td>
              <td className="table-action text-center">
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
});

export default TableComponent;
