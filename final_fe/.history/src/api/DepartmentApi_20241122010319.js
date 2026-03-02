import { PAGING } from "../constants";
import AuthorApi from "./baseAPI/AuthorBaseApi";
import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class DepartmentAPI {
  constructor() {
    this.url = "/departments";
  }

  getAll = ({ page, sortField, isAsc, search }) => {
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

    return AuthorApi.get(url);
  };

  getDetail = (labId) => {
    return AuthorApi.get(`${this.url}/${labId}`);
  };

  getAllDevicesInDepartment = ({
    labId,
    page,
    search,
    sortField,
    isAsc,
    status,
    minPrice,
    maxPrice,
  }) => {
    let url = `${this.url}/${labId}/devices?page=${page}&size=${PAGING.SIZE}`;

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

  removeDeviceInDetailDepartment = (deviceId) => {
    return this.removeAllDevicesInDetailDepartment([deviceId]);
  };

  removeAllDevicesInDetailDepartment = (accountIds) => {
    return AuthorApi.delete(`${this.url}/accounts/${accountIds.join(",")}`);
  };

  existsByName = (name) => {
    return UnauthorApi.get(`${this.url}/name/exists?name=${name}`);
  };
  existsByEmail = (email) => {
    return UnauthorApi.get(`${this.url}/email/exists?email=${email}`);
  };
  existsByManagerName = (managerName) => {
    return UnauthorApi.get(
      `${this.url}/manager/exists?managerName=${managerName}`
    );
  };

  create = (
    name,
    managerName,
    email,
    phone,
    departmentsId,
    subjectsId,
    location
  ) => {
    let body = {
      name: name,
      managerName: managerName,
      email: email,
      phone: phone,
      departmentsId: departmentsId,
      subjectsId: subjectsId,
      location: location,
    };
    return AuthorApi.post(`${this.url}`, body);
  };

  // getAllAccountsByDepartment = (departmentId) => {
  //   return AuthorApi.get(
  //     `${this.url}/${departmentId}/accounts?page=1&size=999999&sort=role,desc`
  //   );
  // };

  // update = (departmentId, name, managerId) => {
  //   let body = {
  //     name: name,
  //     managerId: managerId,
  //   };
  //   return AuthorApi.put(`${this.url}/${departmentId}`, body);
  // };

  // delete = (departmentId) => {
  //   return AuthorApi.delete(`${this.url}/${departmentId}`);
  // };

  // getAllDepartmentForFilter = () => {
  //   return AuthorApi.get(`${this.url}/filter`);
  // };

  // importAccounts = (departmentId, managerId, employeeIds) => {
  //   let body = {
  //     managerId: managerId,
  //     employeeIds: employeeIds,
  //   };
  //   return AuthorApi.post(`${this.url}/${departmentId}/accounts`, body);
  // };
}

export default new DepartmentAPI();
