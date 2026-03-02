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
                        <th style={{ width: "35%" }}>
                            Code
                            <SortComponent
                                currentSort={props.currentSort}
                                setCurrentSort={props.setCurrentSort}
                                apiField="code"
                            />
                        </th>
                        <th style={{ width: "35%" }}>
                            Fullname
                            <SortComponent
                                currentSort={props.currentSort}
                                setCurrentSort={props.setCurrentSort}
                                apiField="fullname"
                            />
                        </th>
                        <th style={{ width: "20%" }}>
                            Role
                            <SortComponent
                                currentSort={props.currentSort}
                                setCurrentSort={props.setCurrentSort}
                                apiField="role"
                            />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.devices.map(device =>
                        <tr key={device.id}>
                            <th className="text-center">
                                <Form.Check
                                    size='lg'
                                    type='checkbox'
                                    checked={props.addingIds.has(device.id)}
                                    onChange={e => onChangeCheckboxItem(e, device.id)}
                                />
                            </th>
                            <td>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>{device.email || ""}</Tooltip>}
                                >
                                    <span>{device.username || ""}</span>
                                </OverlayTrigger>
                            </td>
                            <td>{device.fullname}</td>
                            <td>{device.role}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>

    );
})

export default TableComponent;