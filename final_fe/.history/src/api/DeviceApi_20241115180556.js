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

  existsByCode = (code) => {
    return UnauthorApi.get(`${this.url}/code/exists?code=${code}`);
  };

  create = (
    code,
    name,
    typeId,
    managersId,
    price,
    purchaseDate,
    detailsAssignmentDate,
    status,
    laboratoriesId
  ) => {
    let body = {
      code: code,
      name: name,
      typeId: typeId,
      managersId: managersId,
      price: price,
      purchaseDate: purchaseDate,
      detailsAssignmentDate: detailsAssignmentDate,
      status: status,
      laboratoriesId: laboratoriesId,
    };
    return AuthorApi.post(`${this.url}`, body);
  };

  getAllManagersByDevice = (deviceId) => {
    return AuthorApi.get(`${this.url}/${deviceId}/managers?page=1&size=999999`);
  };
  getAllLabsByDevice = (deviceId) => {
    return AuthorApi.get(`${this.url}/${deviceId}/labs?page=1&size=999999`);
  };

  update = (
    deviceId,
    managersId,
    status,
    laboratoriesId,
    detailsNote,
    detailsAssignmentDate,
    maintenanceDate,
    maintenanceDescription
  ) => {
    let body = {
      managersId: managersId,
      status: status,
      laboratoriesId: laboratoriesId,
      detailsNote: detailsNote,
      maintenanceDate: maintenanceDate,
      maintenanceDescription: maintenanceDescription,
    };
    return AuthorApi.put(`${this.url}/${deviceId}`, body);
  };

  delete = (deviceId) => {
    return AuthorApi.delete(`${this.url}/${deviceId}`);
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
    managersName,
    status,
    laboratoriesName
  ) => {
    let body = {
      code: code,
      name: name,
      typeName: typeName,
      price: price,
      managersName: managersName,
      status: status,
      laboratoriesName: laboratoriesName,
    };
    return AuthorApi.post(`${this.url}/import`, body);
  };
  getInfoDevicesByName = (name) => {
    return AuthorApi.get(`${this.url}/info?name=${name.join(",")}`);
  };
}

export default new DeviceAPI();
