import React from "react";
import { Table, Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import AdminContent from "../../../../src/hoc/AdminContent";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";
import "./TableComponent.css"; // Import CSS riêng nếu cần

const TableComponent = React.memo((props) => {
  const statusMapping = {
    ADMIN: "Quản trị viên",
    MANAGER: "Người quản lý",
  };

  return (
    <div className="table-responsive">
      <Table striped bordered hover className="align-middle">
        <thead className="table-header">
          <tr>
            <th style={{ width: "25%" }}>
              <span className="table-header-text">Tên người dùng</span>
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="fullname"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              <span className="table-header-text">Tên đăng nhập</span>
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="username"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "15%" }}>
              <span className="table-header-text">Quyền</span>
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="role"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              <span className="table-header-text">Tên quyền</span>
            </th>
            <th style={{ width: "20%" }} className="text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {props.accounts.length > 0 ? (
            props.accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.fullname}</td>
                <td>{account.username}</td>
                <td>{account.role}</td>
                <td>{statusMapping[account.role]}</td>
                <td className="text-center">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Xóa</Tooltip>}
                  >
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={(e) => {
                        props.onDeleteItem(account.id);
                        e.stopPropagation();
                      }}
                    >
                      <Trash size={16} />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
});

export default TableComponent;
