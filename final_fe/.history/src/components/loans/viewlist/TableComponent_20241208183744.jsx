import React from "react";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import AdminContent from "../../../../src/hoc/AdminContent";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
  const deviceIds = loan.devices ? loan.devices.map((device) => device.id) : []; // xử lý trường hợp loan không có devices
  
    return (
      <OverlayTrigger
        key="return"
        placement="top"
        overlay={<Tooltip id={`tooltip-return-${loan.id}`}>Trả thiết bị</Tooltip>}
      >
        <button
          className="btn btn-success btn-sm"
          onClick={(e) => {
            onReturnLoan(loan.id, deviceIds);
            e.stopPropagation();
          }}
        >
          Trả
        </button>
      </OverlayTrigger>
    );
}
  
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
            <th style={{ width: "10%" }}>
              Lớp
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Người đại diện
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="contact"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "15%" }}>
              Email
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="info"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Ngày yêu cầu
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="loanDate"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Số lượng
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="quantity"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>
              Ngày trả
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="returnDate"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "15%" }}>
              Chú thích
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="purpose"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.loans.map((device) => (
            <tr key={device.id}>
              <td>{device.name}</td>
              <td>{device.contact}</td>
              <td>{device.info}</td>
              <td>{device.loanDate}</td>
              <td>{device.quantity}</td>
              <td>{device.returnDate}</td>
              <td>{device.purpose}</td>
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

                  <span
                    onClick={(e) => {
                      props.onReturnLoan(device.id);
                      e.stopPropagation();
                    }}
                  >
                    <button className="btn btn-success btn-sm">
                      Trả thiết bị
                    </button>
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
