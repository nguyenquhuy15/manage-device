import { PAGING } from "../constants";
import AuthorApi from "./baseAPI/AuthorBaseApi";
import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class LoanAPI {
  constructor() {
    this.url = "/loans";
  }

  getAll = ({ page, sortField, isAsc, search, loanDate, returnDate }) => {
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
    if (loanDate) {
      url += `&loanDate=${loanDate}`;
    }
    if (returnDate) {
      url += `&returnDate=${returnDate}`;
    }
    return AuthorApi.get(url);
  };

  getDetail = (loanId) => {
    return AuthorApi.get(`${this.url}/${loanId}`);
  };

  getAllDevicesInLoan = ({
    loanId,
    page,
    search,
    sortField,
    isAsc,
    status,
    minPrice,
    maxPrice,
  }) => {
    let url = `${this.url}/${loanId}/devices?page=${page}&size=${PAGING.SIZE}`;

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

  create = (name, contact, ,employeeIds) => {
    let body = {
      name: name,
      managerId: managerId,
      employeeIds: employeeIds,
    };
    return AuthorApi.post(`${this.url}`, body);
  };


  update = (loanId, returnDate, purpose) => {
    let body = {
      returnDate: returnDate,
      purpose: purpose,
    };
    return AuthorApi.put(`${this.url}/${loanId}`, body);
  };
  getAllDevicesByNoLoan = (search, sortField, isAsc) => {
    let url = `${this.url}/noLoan`;

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
}

export default new LoanAPI();
