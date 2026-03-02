import React from "react";
import AdminContent from "../../../../../hoc/AdminContent";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import { Trash } from "react-feather";
import SortComponent from "../../../../common/table/SortComponent";

const TableComponent = React.memo((props) => {

    const onChangeRemoveCheckboxItem = (e, deviceId) => {
        let removingAllIds = props.removingAllIds;

        if (e.target.checked) {
            removingAllIds.add(accountId);
        } else {
            removingAllIds.delete(accountId);
        }

        props.setRemovingAllIds(new Set(removingAllIds));
    }

    const onChangeRemoveCheckboxAllItems = (e) => {
        let removingAllIds = props.removingAllIds;

        if (e.target.checked) {
            props.accounts.forEach(account => {
                removingAllIds.add(account.id);
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
                                size='lg'
                                type='checkbox'
                                checked={props.removingAllIds.size === props.accounts.length && props.accounts.length != 0}
                                onChange={onChangeRemoveCheckboxAllItems}
                            />
                        </th>
                    </AdminContent>
                    <th style={{ width: "20%" }}>
                        Username
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            apiField="username"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <th style={{ width: "20%" }}>
                        Fullname
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            apiField="fullname"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <th style={{ width: "15%" }}>
                        Role
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            apiField="role"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <th style={{ width: "15%" }}>
                        Status
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            apiField="status"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <th style={{ width: "20%" }}>
                        Created Date
                        <SortComponent
                            currentSort={props.currentSort}
                            setCurrentSort={props.setCurrentSort}
                            apiField="createdDateTime"
                            resetPaging={props.resetPaging}
                        />
                    </th>
                    <AdminContent>
                        <th style={{ width: "10%" }}>Actions</th>
                    </AdminContent>
                </tr>
            </thead>
            <tbody>
                {
                    props.accounts.map(account =>
                        <tr key={account.id}>
                            <AdminContent>
                                <th className="text-center">
                                    <Form.Check
                                        size='lg'
                                        type='checkbox'
                                        checked={props.removingAllIds.has(account.id)}
                                        onChange={e => onChangeRemoveCheckboxItem(e, account.id)}
                                    />
                                </th>
                            </AdminContent>
                            <td>
                                <OverlayTrigger
                                    placement="bottom"
                                    overlay={<Tooltip>{account.email || ""}</Tooltip>}
                                >
                                    <span>{account.username || ""}</span>
                                </OverlayTrigger>
                            </td>
                            <td>{account.fullname}</td>
                            <td>{account.role}</td>
                            <td>{account.status}</td>
                            <td>{account.createdDateTime}</td>
                            <AdminContent>
                                <td className="table-action text-center">
                                    <span onClick={() => props.onShowRemoveModal(account.id)}>
                                        <Trash className="align-middle" size={18} />
                                    </span>
                                </td>
                            </AdminContent>
                        </tr>
                    )
                }
            </tbody>
        </Table >
    );
});

export default TableComponent;