
import AuthorApi from "./baseAPI/AuthorBaseApi";

class TypeApi {
  constructor() {
    this.url = "/types";
  }

  getAll = ({ page, sortField, isAsc, search}) => {
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
}
export default new TypeApi();
