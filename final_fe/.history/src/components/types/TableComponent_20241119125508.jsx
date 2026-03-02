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
          {props.maintenances.map((device) => (
            <tr key={device.id}>
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
              <td>{device.code}</td>
              <td>{device.name}</td>
              <td>{device.maintenanceDate}</td>
              <td>{device.maintenanceAddress}</td>
              <td>{device.maintenanceDescription}</td>
              <td>{device.maintenanceNote}</td>
              <td>{device.maintenanceExpense}</td>
              <td>{statusMapping[device.maintenanceStatus]}</td>
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
