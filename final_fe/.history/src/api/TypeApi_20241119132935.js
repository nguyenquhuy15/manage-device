
import AuthorApi from "./baseAPI/AuthorBaseApi";
import { PAGING } from "../constants";
class TypeApi {
  constructor() {
    this.url = "/types";
  }

  getTypeName = (search, sortField, isAsc) => {
    let url = `${this.url}/name`;

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
