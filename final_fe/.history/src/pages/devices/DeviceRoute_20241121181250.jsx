import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import WithLoading from "../../hoc/withLoading";
import { connect } from "react-redux";
import { selectRole } from "../../redux/selector/UserInfoSelector";
import { ROLE } from "../../constants";
import DevicePage from "./Device";
import UserApi from "../../api/UserApi";

const DeviceRoute = (props) => {
  const [deviceId, setDeviceId] = useState();

  useEffect(() => {
    if (props.role == ROLE.MANAGER) {
      getDeviceInfoForManagerRole();
    }
  }, [props.role]);

  const getDeviceInfoForManagerRole = async () => {
    const deviceInfo = await UserApi.getAccountInfo();
    setDeviceId(deviceInfo.id);
  };

  if (props.role == ROLE.ADMIN) {
    return <DevicePage />;
  }
    if (props.role == ROLE.ADMIN) {
      return <DevicePage />;
    }

  const ComponentWithLoading = WithLoading(Navigate);

  return (
    <div className="text-center">
      <ComponentWithLoading
        isLoading={!deviceId}
        to={`/devices/${deviceId}`}
      />
    </div>
  );
};

export default connect((state) => {
  return {
    role: selectRole(state),
  };
})(DeviceRoute);
