import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useBoolean from "../../hooks/useBoolean";
import useNotification from "../../hooks/useNotification";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";

import DeviceApi from "../../api/DeviceApi";
import LabApi from "../../api/LabApi";
import TypeApi from "../../api/TypeApi";
import ManagerApi from "../../api/ManagerApi";


import * as XLSX from "xlsx";
import { Manager } from "react-popper";

const DetailDevicePage = () => {

  return (
    <>
      <Helmet title="Detail Device" />
      <Container fluid className="p-0">
        <h1 className="h3 mb-3">Thông tin thiết bị</h1>

        
      </Container>
    </>
  );
};

export default DetailDevicePage;
