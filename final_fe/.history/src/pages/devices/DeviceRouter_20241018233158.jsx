import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import WithLoading from "../../hoc/withLoading";
import { connect } from "react-redux";
import { selectRole } from "../../redux/selector/UserInfoSelector";
import { ROLE } from "../../constants";
import DevicePage from "./Device";
import UserApi from "../../api/UserApi";

const DepartmentRoute = (props) => {
  const [departmentId, setDepartmentId] = useState();

  useEffect(() => {
    if (props.role == ROLE.MANAGER) {
      getDepartmentInfoForManagerRole();
    }
  }, [props.role]);

  const getDepartmentInfoForManagerRole = async () => {
    const departmentInfo = await UserApi.getDepartmentInfo();
    setDepartmentId(departmentInfo.id);
  };

  if (props.role == ROLE.ADMIN) {
    return <DepartmentPage />;
  }

  const ComponentWithLoading = WithLoading(Navigate);

  return (
    <div className="text-center">
      <ComponentWithLoading
        isLoading={!departmentId}
        to={`/departments/${departmentId}`}
      />
    </div>
  );
};

export default connect((state) => {
  return {
    role: selectRole(state),
  };
})(DepartmentRoute);
