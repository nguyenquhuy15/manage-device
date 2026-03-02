import React from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
  
  return (
    <Table striped hover bordered responsive>
      <thead>
        <tr>
          <th>
            Tên lớp
            <SortComponent
              currentSort={currentSort}
              setCurrentSort={setCurrentSort}
              apiField="name"
              resetPaging={resetPaging}
            />
          </th>
          <th>
            Người đại diện
            <SortComponent
              currentSort={currentSort}
              setCurrentSort={setCurrentSort}
              apiField="contact"
              resetPaging={resetPaging}
            />
          </th>
          <th>Thông tin</th>
          <th>
            Ngày mượn
            <SortComponent
              currentSort={currentSort}
              setCurrentSort={setCurrentSort}
              apiField="loanDate"
              resetPaging={resetPaging}
            />
          </th>
          <th>Số lượng</th>
          <th>
            Ngày trả
            <SortComponent
              currentSort={currentSort}
              setCurrentSort={setCurrentSort}
              apiField="returnDate"
              resetPaging={resetPaging}
            />
          </th>
          <th>Mục đích</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {loans.map((loan) => (
          <tr key={loan.id}>
            <td>{loan.name}</td>
            <td>{loan.contact}</td>
            <td>{loan.info}</td>
            <td>{loan.loanDate}</td>
            <td>{loan.quantity}</td>
            <td>{loan.returnDate}</td>
            <td>{loan.purpose}</td>
            <td>
              <div className="d-flex gap-2">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Sửa</Tooltip>}
                >
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={(e) => {
                      onClickItem(loan.id);
                      e.stopPropagation();
                    }}
                  >
                    <Edit2 size={15} />
                  </button>
                </OverlayTrigger>
                {renderReturnButton(loan)}
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Xóa</Tooltip>}
                >
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={(e) => {
                      onDeleteItem(loan.id);
                      e.stopPropagation();
                    }}
                  >
                    <Trash size={15} />
                  </button>
                </OverlayTrigger>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default TableComponent;
