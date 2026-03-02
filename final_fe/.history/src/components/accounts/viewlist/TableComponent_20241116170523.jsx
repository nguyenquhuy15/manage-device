import React from "react";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import AdminContent from "../../../../src/hoc/AdminContent";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
  const statusMapping = {
    ADMIN: "Quản trị viên",
    MANAGER: "Người quản lý",
  };

  // const onChangeRemoveCheckboxItem = (e, deviceId) => {
  //   let removingAllIds = props.removingAllIds;

  //   if (e.target.checked) {
  //     removingAllIds.add(deviceId);
  //   } else {
  //     removingAllIds.delete(deviceId);
  //   }

  //   props.setRemovingAllIds(new Set(removingAllIds));
  // };

  // const onChangeRemoveCheckboxAllItems = (e) => {
  //   let removingAllIds = props.removingAllIds;

  //   if (e.target.checked) {
  //     props.devices.forEach((device) => {
  //       removingAllIds.add(device.id);
  //     });
  //   } else {
  //     removingAllIds.clear();
  //   }
  //   props.setRemovingAllIds(new Set(removingAllIds));
  // };

  return (
    <>
      <Table striped hover bordered>
        <thead>
          <tr>
            {/* <AdminContent>
              <th className="text-center">
                <Form.Check
                  size="lg"
                  type="checkbox"
                  checked={
                    props.removingAllIds.size === props.devices.length &&
                    props.devices.length !== 0
                  }
                  onChange={onChangeRemoveCheckboxAllItems}
                />
              </th>
            </AdminContent> */}
            <th style={{ width: "5%" }}>
              Tên người dùng
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="fullname"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              Tên đăng nhập
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="username"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Quyền
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="role"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Tên quyền
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="role"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.accounts.map((account) => (
            <tr key={account.id}>
              {/* <AdminContent>
                <td className="text-center">
                  <Form.Check
                    size="lg"
                    type="checkbox"
                    checked={props.removingAllIds.has(device.id)}
                    onChange={(e) => onChangeRemoveCheckboxItem(e, device.id)}
                  />
                </td>
              </AdminContent> */}
              <td>{account.fullname}</td>
              <td>{account.username}</td>
              <td>{account.typeName}</td>
              <td>{account.price}</td>
              <td>{device.managersName}</td>
              <td>{statusMapping[device.status] || "Không xác định"}</td>
              <td>{device.laboratoriesName}</td>
              <td className="table-action text-center">
                <span
                  onClick={(e) => {
                    props.onClickItem(device.id);
                    e.stopPropagation();
                  }}
                >
                  <Edit2 className="align-middle me-1" size={18} />
                </span>
                <span
                  onClick={(e) => {
                    props.onDeleteItem(device.id);
                    e.stopPropagation();
                  }}
                >
                  <Trash className="align-middle me-1" size={18} />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
});

export default TableComponent;
