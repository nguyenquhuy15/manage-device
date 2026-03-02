import React from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
  return (
    <Table striped hover bordered className="table-component">
      <thead>
        <tr>
          {[
            { label: "Khoa/Viện", apiField: "departments.name", width: "15%" },
            { label: "Bộ môn", apiField: "subjects.name", width: "20%" },
            { label: "Phòng thí nghiệm", apiField: "name", width: "15%" },
            { label: "Người quản lí", apiField: "managerName", width: "20%" },
            { label: "Email", apiField: "email", width: "15%" },
            {
              label: "Số lượng thiết bị",
              apiField: "quantity",
              width: "10%",
            },
            { label: "Vị trí", apiField: "location", width: "20%" },
            {/* { label: "Actions", width: "10%" }, */}
          ].map((header, index) => (
            <th key={index} style={{ width: header.width }}>
              {header.label}
              {header.apiField && (
                <SortComponent
                  currentSort={props.currentSort}
                  setCurrentSort={props.setCurrentSort}
                  apiField={header.apiField}
                  resetPaging={props.resetPaging}
                />
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.departments.map((department) => (
          <tr key={department.id}>
            <td>{department.departmentsName}</td>
            <td>{department.subjectsName}</td>
            <td>{department.name}</td>
            <td>{department.managerName}</td>
            <td>{department.email}</td>
            <td>{department.quantity}</td>
            <td>{department.location}</td>
            <td className="table-action text-center">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-edit`}>Sửa</Tooltip>}
              >
                <span
                  onClick={(e) => {
                    props.onUpdateItem(department.id);
                    e.stopPropagation();
                  }}
                  aria-label="Edit"
                  role="button"
                  className="action-icon"
                >
                  <Edit2 className="align-middle me-1" size={18} />
                </span>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id={`tooltip-delete`}>Xóa</Tooltip>}
              >
                <span
                  onClick={(e) => {
                    props.onDeleteItem(department.id);
                    e.stopPropagation();
                  }}
                  aria-label="Delete"
                  role="button"
                  className="action-icon"
                >
                  <Trash className="align-middle" size={18} />
                </span>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default TableComponent;
