import AuthorApi from "./baseAPI/AuthorBaseApi";
class Man {
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
}
export default new TypeApi();
