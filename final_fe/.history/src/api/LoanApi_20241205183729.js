import { PAGING } from "../constants";
import AuthorApi from "./baseAPI/AuthorBaseApi";
import UnauthorApi from "./baseAPI/UnauthorBaseApi";

class LoanAPI {
  constructor() {
    this.url = "/loans";
  }

  getAll = ({
    page,
    sortField,
    isAsc,
    search,
    loansLoanDate,
    loansReturnDate,
  }) => {
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
    if (loansLoanDate) {
      url += `&loansLoanDate=${loansLoanDate}`;
    }
    if (loansReturnDate) {
      url += `&loansReturnDate=${loansReturnDate}`;
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
  update = (loanId, loansLoanDate) => {
    let body = {
      loansLoanDate: loansLoanDate,
    };
    return AuthorApi.put(`${this.url}/${loanId}`, body);
  };
}

export default new LoanAPI();
