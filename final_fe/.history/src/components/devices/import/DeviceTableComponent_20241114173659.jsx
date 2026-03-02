
import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import DeviceNoDataComponent from "../../../DeviceNoDataComponent";

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

const AccountNoDataComponent = () => {
    return <p className="text-center">There are no accounts</p>;
}

const TableComponent = React.memo((props) => {
    return (
        <>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>
                            Id
                        </th>
                        <th style={{ width: "35%" }}>
                            Username
                        </th>
                        <th style={{ width: "35%" }}>
                            Fullname
                        </th>
                        <th style={{ width: "20%" }}>
                            Role
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.accounts.map(account =>
                        <tr key={account.id}>
                            <th>{account.id}</th>
                            <td>{account.username}</td>
                            <td>{account.fullname}</td>
                            <td>{account.role}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>

    );
})

export default AccountTableComponent;