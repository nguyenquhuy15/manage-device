
import AuthorApi from "./baseAPI/AuthorBaseApi";
import { PAGING } from "../constants";
import UnauthorApi from "./baseAPI/UnauthorBaseApi";
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
  create = (name, code) => {
    let body = {
      name: name,
      code: code,
    };
    return AuthorApi.post(`${this.url}`, body);
  };
  existsByName = (name) => {
    return UnauthorApi.get(`${this.url}/name/exists?name=${name}`);
  };
  existsByCode = (name) => {
    return UnauthorApi.get(`${this.url}/name/exists?name=${name}`);
  };
}
export default new TypeApi();
