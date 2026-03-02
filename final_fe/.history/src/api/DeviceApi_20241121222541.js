import { PAGING } from "../constants";
import AuthorApi from "./baseAPI/AuthorBaseApi";
import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class DeviceAPI {
  constructor() {
    this.url = "/devices";
  }

  getAll = ({ page, sortField, isAsc, search, status, minPrice, maxPrice }) => {
    let url = this.url;

    // paging
    url += `?page=${page}&size=${PAGING.SIZE}`;

    // sort
    if (!sortField) {
      sortField = "id";
      isAsc = false;
    }
    url += `&sort=${sortField},${isAsc ? "asc" : "desc"}`;

    // search
    if (search) {
      url += `&q=${search}`;
    }

    // filter
    if (status) {
      url += `&status=${status}`;
    }
    if (minPrice) {
      url += `&minPrice=${minPrice}`;
    }
    if (maxPrice) {
      url += `&maxPrice=${maxPrice}`;
    }
    return AuthorApi.get(url);
  };

  getDetail = (deviceId) => {
    return AuthorApi.get(`${this.url}/${deviceId}`);
  };

  getDetailMaintenance = (deviceId) => {
    return AuthorApi.get(`${this.url}/maintenance/${deviceId}`);
  };

  getAllDevicesInMaintenance = ({
    page,
    search,
    sortField,
    isAsc,
    maintenanceDescription,
    maintenanceStatus,
    maintenanceDate,
  }) => {
    let url = `${this.url}/maintenance?page=${page}&size=${PAGING.SIZE}`;

    // search
    if (search) {
      url += `&q=${search}`;
    }

    // sort
    if (!sortField) {
      sortField = "id";
      isAsc = false;
    }
    url += `&sort=${sortField},${isAsc ? "asc" : "desc"}`;
    // filter

    if (maintenanceDescription) {
      url += `&maintenanceDescription=${maintenanceDescription}`;
    }

    if (maintenanceStatus) {
      url += `&maintenanceStatus=${maintenanceStatus}`;
    }

    if (maintenanceDate) {
      url += `&maintenanceDate=${maintenanceDate}`;
    }

    return AuthorApi.get(url);
  };

  existsByCode = (code) => {
    return UnauthorApi.get(`${this.url}/code/exists?code=${code}`);
  };
  existsByName = (name) => {
    return UnauthorApi.get(`${this.url}/name/exists?name=${name}`);
  };

  create = (
    code,
    name,
    price,
    typeId,
    laboratoriesId,
    purchaseDate,
    detailsAssignmentDate,
    status
  ) => {
    let body = {
      code: code,
      name: name,
      price: price,
      typeId: typeId,
      laboratoriesId: laboratoriesId,
      purchaseDate: purchaseDate,
      detailsAssignmentDate: detailsAssignmentDate,
      status: status,
    };
    return AuthorApi.post(`${this.url}`, body);
  };

  getAllLabsByDevice = (deviceId) => {
    return AuthorApi.get(`${this.url}/${deviceId}/lab?page=1&size=999999`);
  };
  getAllType = () => {
    return AuthorApi.get(`${this.url}/filter`);
  };

  update = (
    deviceId,
    status,
    laboratoriesId,
    typeId,
    laboratoriesManagerName,
    detailsNote,
    detailsAssignmentDate,
    maintenanceDate,
    maintenanceDescription
  ) => {
    let body = {
      status: status,
      laboratoriesId: laboratoriesId,
      typeId: typeId,
      laboratoriesManagerName: laboratoriesManagerName,
      detailsNote: detailsNote,
      detailsAssignmentDate: detailsAssignmentDate,
      maintenanceDate: maintenanceDate,
      maintenanceDescription: maintenanceDescription,
    };
    return AuthorApi.put(`${this.url}/${deviceId}`, body);
  };
  updateDeviceMaintenance = (
    id,
    date,
    maintenanceDescription,
    maintenanceNote,
    maintenanceAddress,
    maintenanceExpense,
    maintenanceStatus
  ) => {
    let body = {
      maintenanceDate: maintenanceDate,
      maintenanceDescription: maintenanceDescription,
      maintenanceNote: maintenanceNote,
      maintenanceAddress: maintenanceAddress,
      maintenanceExpense: maintenanceExpense,
      maintenanceStatus: maintenanceStatus,
    };
    return AuthorApi.put(`${this.url}/maintenance/${deviceId}`, body);
  };

  delete = (deviceId) => {
    return AuthorApi.delete(`${this.url}/${deviceId}`);
  };

  deleteDeviceInLab = (deviceId) => {
    return AuthorApi.delete(`${this.url}/device/${deviceId}`);
  };
  deleteAll = () => {
    return AuthorApi.delete(this.url);
  };

  deleteAllById = (deviceIds) => {
    return AuthorApi.delete(`${this.url}/delete/${deviceIds.join(",")}`);
  };

  getAllDetail = (search, sortField, isAsc) => {
    let url = `${this.url}/status`;

    // search
    if (search) {
      url += `?q=${search}`;
    }

    // sort
    if (sortField) {
      url += url.includes("?") ? `&` : "?";
      url += `sort=${sortField},${isAsc ? "asc" : "desc"}`;
    }

    return AuthorApi.get(url);
  };

  importDevices = (
    code,
    name,
    typeName,
    price,
    laboratoriesManagerName,
    status
  ) => {
    let body = {
      code: code,
      name: name,
      typeName: typeName,
      price: price,
      laboratoriesManagerName: laboratoriesManagerName,
      status: status,
    };
    return AuthorApi.post(`${this.url}/import`, body);
  };
  getInfoDevicesByName = (name) => {
    return AuthorApi.get(`${this.url}/info?name=${name.join(",")}`);
  };
}

export default new DeviceAPI();
