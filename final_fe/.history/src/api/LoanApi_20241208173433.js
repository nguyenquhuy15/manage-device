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

  existsByName = (name) => {
    return UnauthorApi.get(`${this.url}/name/exists?name=${name}`);
  };

  create = (name, contact, info, loanDate, purpose, deviceIds) => {
    let body = {
      name: name,
      contact: contact,
      info: info,
      loanDate: loanDate,
      purpose: purpose,
      deviceIds: deviceIds,
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

    returnLoan = (loanId, returnDate) => {
    const body = {
      returnDate: returnDate,
    };
    return AuthorApi.put(`${this.url}/${loanId}/return`, body);
  };

}

export default new LoanAPI();
