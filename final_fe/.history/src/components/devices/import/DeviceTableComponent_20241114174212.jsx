
import React, { useMemo } from "react";
import { Table } from "react-bootstrap";

const AccountTableComponent = (props) => {

    const TableComponentMemo = useMemo(() =>
        <TableComponent
            devices={props.devices}
        />
        , [props.devices]);

    return (
        <>
            {/* Table */}
            {props.devices.length == 0
                ? < DeviceNoDataComponent />
                : TableComponentMemo}
        </>
    );
}

const DeviceNoDataComponent = () => {
    return <p className="text-center">There are no Devices</p>;
}

const TableComponent = React.memo((props) => {
    return (
      <>
        <Table striped hover bordered>
          <thead>
            <tr>
              <th style={{ width: "10%" }}>Mã</th>
              <th style={{ width: "20%" }}>Tên thiết bị</th>
              <th style={{ width: "15%" }}>Loại</th>
              <th style={{ width: "10%" }}>Giá</th>
              <th style={{ width: "15%" }}>Người quản lý</th>
              <th style={{ width: "10%" }}>Trạng thái</th>
              <th style={{ width: "20%" }}>Phòng</th>
            </tr>
          </thead>
          <tbody>
            {props.devices.map((device) => (
              <tr key={device.id}>
                <th>{device.code}</th>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>{device.role}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
})

export default AccountTableComponent;