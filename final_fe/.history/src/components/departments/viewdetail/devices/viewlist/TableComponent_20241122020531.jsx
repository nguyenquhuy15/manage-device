import React from "react";
import AdminContent from "../../../../../hoc/AdminContent";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import { Trash } from "react-feather";
import SortComponent from "../../../../common/table/SortComponent";

const TableComponent = React.memo((props) => {

    const onChangeRemoveCheckboxItem = (e, deviceId) => {
        let removingAllIds = props.removingAllIds;

        if (e.target.checked) {
            removingAllIds.add(deviceId);
        } else {
            removingAllIds.delete(deviceId);
        }

        props.setRemovingAllIds(new Set(removingAllIds));
    }

    const onChangeRemoveCheckboxAllItems = (e) => {
        let removingAllIds = props.removingAllIds;

        if (e.target.checked) {
            props.devices.forEach(device => {
                removingAllIds.add(device.id);
            })
        } else {
            removingAllIds.clear();
        }
        props.setRemovingAllIds(new Set(removingAllIds));
    }

    return (
      <Table striped hover bordered>
        <thead>
          <tr>
            <AdminContent>
              <th className="text-center">
                <Form.Check
                  size="lg"
                  type="checkbox"
                  checked={
                    props.removingAllIds.size === props.devices.length &&
                    props.devices.length != 0
                  }
                  onChange={onChangeRemoveCheckboxAllItems}
                />
              </th>
            </AdminContent>
            <th style={{ width: "5%" }}>
              Mã
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="code"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              Tên Thiết Bị
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Loại
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="type.name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Giá
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="price"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "15%" }}>
              Người Quản Lý
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="laboratories.managerName"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Trạng Thái
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="status"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "15%" }}>
              Phòng
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="laboratories.name"
                resetPaging={props.resetPaging}
              />
            </th>
            <AdminContent>
              <th style={{ width: "10%" }}>Actions</th>
            </AdminContent>
          </tr>
        </thead>
        <tbody>
          {props.devices.map((device) => (
            <tr key={device.id}>
              <AdminContent>
                <th className="text-center">
                  <Form.Check
                    size="lg"
                    type="checkbox"
                    checked={props.removingAllIds.has(device.id)}
                    onChange={(e) => onChangeRemoveCheckboxItem(e, device.id)}
                  />
                </th>
              </AdminContent>
              <td>{device.code}</td>
              <td>{device.name}</td>
              <td>{device.typeName}</td>
              <td>{device.price}</td>
              <td>{device.laboratoriesManagerName}</td>
              <td>{device.status || "Không xác định"}</td>
              <td>{device.laboratoriesName}</td>
              <AdminContent>
                <td className="table-action text-center">
                  <span onClick={() => props.onShowRemoveModal(device.id)}>
                    <Trash className="align-middle" size={18} />
                  </span>
                </td>
              </AdminContent>
            </tr>
          ))}
        </tbody>
      </Table>
    );
});

export default TableComponent;