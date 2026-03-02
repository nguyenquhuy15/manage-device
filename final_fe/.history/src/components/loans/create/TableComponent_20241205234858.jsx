import React from "react";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {

    const onChangeCheckboxItem = (e, deviceId) => {
        let addingIds = props.addingIds;

        if (e.target.checked) {
            addingIds.add(deviceId);
        } else {
            addingIds.delete(deviceId);
        }

        props.setAddingIds(new Set(addingIds));
    }

    return (
      <>
        <Table striped hover bordered>
          <thead>
            <tr>
              <th style={{ width: "10%" }}></th>
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
              <th style={{ width: "15%" }}>
                Người Quản Lý
                <SortComponent
                  currentSort={props.currentSort}
                  setCurrentSort={props.setCurrentSort}
                  apiField="laboratories.managerName"
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
            </tr>
          </thead>
          <tbody>
            {props.devices.map((device) => (
              <tr key={device.id}>
                <th className="text-center">
                  <Form.Check
                    size="lg"
                    type="checkbox"
                    checked={props.addingIds.has(device.id)}
                    onChange={(e) => onChangeCheckboxItem(e, device.id)}
                  />
                </th>
                <td>{device.fullname}</td>
                <td>{device.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
})

export default TableComponent;