class TypeApi {
  constructor() {
    this.url = "/types";
  }

  getTyp = (search, sortField, isAsc) => {
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
}