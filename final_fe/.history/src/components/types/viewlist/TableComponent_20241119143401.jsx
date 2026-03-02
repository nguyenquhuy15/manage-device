import React from "react";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import AdminContent from "../../../../src/hoc/AdminContent";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
  return (
    <div className="table-responsive">
      <Table striped hover bordered className="custom-table">
        <thead>
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
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`edit-tooltip-${type.id}`}>Chỉnh sửa</Tooltip>
                  }
                >
                  <Button variant="link" onClick={() => props.onEdit(type.id)}>
                    <Edit2 color="blue" />
                  </Button>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id={`delete-tooltip-${type.id}`}>Xóa</Tooltip>
                  }
                >
                  <Button
                    variant="link"
                    onClick={() => props.onDelete(type.id)}
                  >
                    <Trash color="red" />
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
});

export default TableComponent;
