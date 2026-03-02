import React from "react";
import { OverlayTrigger, Table, Tooltip, Form } from "react-bootstrap";
import AdminContent from "../../../../src/hoc/AdminContent";
import { Edit2, Trash, ArrowDownCircle } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
  return (
    <>
      <Table striped hover bordered>
        <thead>
          <tr>
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
                {/* Tooltip cho Edit */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Chỉnh sửa</Tooltip>}
                >
                  <span
                    onClick={(e) => {
                      props.onClickItem(device.id);
                      e.stopPropagation();
                    }}
                  >
                    <Edit2 className="align-middle me-1" size={18} />
                  </span>
                </OverlayTrigger>

                {/* Tooltip cho Return */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Trả thiết bị</Tooltip>}
                >
                  <span
                    onClick={(e) => {
                      props.onReturnLoan(device.id);
                      e.stopPropagation();
                    }}
                  >
                    <ArrowDownCircle className="align-middle me-1" size={18} />
                  </span>
                </OverlayTrigger>

                {/* Tooltip cho Delete */}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Xóa</Tooltip>}
                >
                  <span
                    onClick={(e) => {
                      props.onDeleteLoan(device.id);
                      e.stopPropagation();
                    }}
                  >
                    <Trash className="align-middle me-1" size={18} />
                  </span>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
});

export default TableComponent;
