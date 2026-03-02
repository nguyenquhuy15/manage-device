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

  getAllDevicesInMaintenance = ({
    page,
    search,
    maintenanceDescription,
    maintenanceStatus,
    maintenanceDate,
    sortField,
    isAsc,
  }) => {
    let url = `${this.url}/maintenance?page=${page}&size=${PAGING.SIZE}`;

    // search
    if (search) {
      url += `&q=${search}`;
    }

    // filter
    if (maintenanceDescription) {
      url += `&maintenanceDescription=${maintenanceDescription}`;
    }

    if (status) {
      url += `&status=${status}`;
    }

    if (maintenanceDate) {
      url += `&maintenanceDate=${maintenanceDate}`;
    }

    // sort
    if (!sortField) {
      sortField = "id";
      isAsc = false;
    }
    url += `&sort=${sortField},${isAsc ? "asc" : "desc"}`;

    return AuthorApi.get(url);
  };

  existsByCode = (code) => {
    return UnauthorApi.get(`${this.url}/code/exists?code=${code}`);
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

  update = (
    deviceId,
    laboratoriesId,
    status,
    laboratoriesManagerName,
    detailsNote,
    detailsAssignmentDate,
    maintenanceDate,
    maintenanceDescription
  ) => {
    let body = {
      laboratoriesId: laboratoriesId,
      status: status,
      laboratoriesManagerName: laboratoriesManagerName,
      detailsNote: detailsNote,
      detailsAssignmentDate: detailsAssignmentDate,
      maintenanceDate: maintenanceDate,
      maintenanceDescription: maintenanceDescription,
    };
    return AuthorApi.put(`${this.url}/${deviceId}`, body);
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
