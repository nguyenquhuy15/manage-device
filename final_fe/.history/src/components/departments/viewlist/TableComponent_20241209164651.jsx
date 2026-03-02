import React from "react";
import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { Edit2, Trash } from "react-feather";
import SortComponent from "../../common/table/SortComponent";

const TableComponent = React.memo((props) => {
  const statusMapping = {
    AVAILABLE: "Rảnh",
    INUSE: "Đang sử dụng",
    MAINTENANCE: "Bảo trì",
  };
  const onChangeRemoveCheckboxItem = (e, deviceId) => {
    let removingAllIds = props.removingAllIds;

    if (e.target.checked) {
      removingAllIds.add(deviceId);
    } else {
      removingAllIds.delete(deviceId);
    }

    props.setRemovingAllIds(new Set(removingAllIds));
  };

  const onChangeRemoveCheckboxAllItems = (e) => {
    let removingAllIds = props.removingAllIds;

    if (e.target.checked) {
      props.devices.forEach((device) => {
        removingAllIds.add(device.id);
      });
    } else {
      removingAllIds.clear();
    }
    props.setRemovingAllIds(new Set(removingAllIds));
  };

  return (
    <Table striped hover bordered className="table-component">
      <thead>
        <tr>
          {[
            { label: "Khoa/Viện", apiField: "departments.name", width: "15%" },
            { label: "Bộ môn", apiField: "subjects.name", width: "20%" },
            { label: "Phòng thí nghiệm", apiField: "name", width: "15%" },
            { label: "Người quản lí", apiField: "managerName", width: "15%" },
            { label: "Email", apiField: "email", width: "15%" },
            {
              label: "Số lượng thiết bị",
              apiField: "quantity",
              width: "10%",
            },
            { label: "Vị trí", apiField: "location", width: "20%" },
            { label: "Actions", width: "10%" },
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
          <tr
            key={department.id}
            onClick={() => props.onClickItem(department.id)}
          >
            <td>{department.departmentsName}</td>
            <td>{department.subjectsName}</td>
            <td>{department.name}</td>
            <td>{department.managerName}</td>
            <td>{department.email}</td>
            <td>{department.quantity}</td>
            <td>{department.location}</td>
            <td className="table-action text-center">
              <span
                onClick={(e) => {
                  props.onUpdateItem(department.id);
                  e.stopPropagation();
                }}
              >
                <Edit2 className="align-middle me-1" size={18} />
              </span>
              <OverlayTrigger placement="top" overlay={<Tooltip>Xóa</Tooltip>}>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={(e) => {
                    props.onDeleteItem(department.id);
                    e.stopPropagation();
                  }}
                >
                  <Trash size={16} />
                </Button>
              </OverlayTrigger>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
});

export default TableComponent;
