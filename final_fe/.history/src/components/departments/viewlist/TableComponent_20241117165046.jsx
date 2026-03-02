import React from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
  return (
    <>
      <Table striped hover bordered>
        <thead>
          <tr>
            <th style={{ width: "20%" }}>
              Khoa/Viện
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="departments.name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              Bộ môn
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              Người quản lí
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="managers.name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              Người quản lí
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="managers.name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "15%" }}>
              Phòng thí nghiệm
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="laboratories.name"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "20%" }}>
              Vị trí
              <SortComponent
                currentSort={props.currentSort}
                setCurrentSort={props.setCurrentSort}
                apiField="laboratories.location"
                resetPaging={props.resetPaging}
              />
            </th>
            <th style={{ width: "10%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.departments.map((department) => (
            <tr
              key={department.id}
              onClick={() => props.onClickItem(department.id)}
            >
              <td>{department.departmentsName}</td>
              <td>{department.name}</td>
              <td>{department.managersName}</td>
              <td>{department.laboratoriesName}</td>
              <td>{department.laboratoriesLocation}</td>
              <td className="table-action text-center">
                <span
                  onClick={(e) => {
                    props.onUpdateItem(department.id);
                    e.stopPropagation();
                  }}
                >
                  <Edit2 className="align-middle me-1" size={18} />
                </span>
                <span
                  onClick={(e) => {
                    props.onDeleteItem(department.id);
                    e.stopPropagation();
                  }}
                >
                  <Trash className="align-middle" size={18} />
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
