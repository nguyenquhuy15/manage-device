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
}

export default new LoanAPI();
