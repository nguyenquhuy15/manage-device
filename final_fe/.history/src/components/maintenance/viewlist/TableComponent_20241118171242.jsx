import React from "react";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import AdminContent from "../../../../src/hoc/AdminContent";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";


const TableComponent = React.memo((props) => {
  const statusMapping = {
    DONE: "Đã sửa xong",
    INUSE: "Đang sửa chữa",
  };

  return (
    <Table striped hover bordered className="custom-table">
      <thead>
        <tr>
          {/* Uncomment if you want to enable checkbox functionality */}
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
            Mã thiết bị
            <SortComponent {...props} apiField="devices.code" />
          </th>
          <th style={{ width: "20%" }}>
            Tên Thiết Bị
            <SortComponent {...props} apiField="devices.name" />
          </th>
          <th style={{ width: "10%" }}>
            Ngày sửa
            <SortComponent {...props} apiField="date" />
          </th>
          <th style={{ width: "10%" }}>
            Địa chỉ
            <SortComponent {...props} apiField="address" />
          </th>
          <th style={{ width: "15%" }}>
            Kiểu sửa
            <SortComponent {...props} apiField="description" />
          </th>
          <th style={{ width: "10%" }}>
            Chú thích
            <SortComponent {...props} apiField="note" />
          </th>
          <th style={{ width: "15%" }}>
            Chi phí
            <SortComponent {...props} apiField="expense" />
          </th>
          <th style={{ width: "15%" }}>
            Trạng thái
            <SortComponent {...props} apiField="status" />
          </th>
          <th style={{ width: "10%" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.maintenances.map((device) => (
          <tr key={device.id}>
            {/* Uncomment if you want to enable checkbox functionality */}
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
            <td>{device.devicesCode}</td>
            <td>{device.devicesName}</td>
            <td>{device.date}</td>
            <td>{device.address}</td>
            <td>{device.description}</td>
            <td>{device.note}</td>
            <td>{device.expense}</td>
            <td>{statusMapping[device.status] || "Không xác định"}</td>
            <td className="table-action text-center">
              <span
                onClick={(e) => {
                  props.onClickItem(device.id);
                  e.stopPropagation();
                }}
                className="action-icon"
              >
                <Edit2 size={18} />
              </span>
              <span
                onClick={(e) => {
                  props.onDeleteItem(device.id);
                  e.stopPropagation();
                }}
                className="action-icon"
              >
                <Trash size={18} />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default TableComponent;
