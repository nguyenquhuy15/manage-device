import { PAGING } from "../constants";
import AuthorApi from "./baseAPI/AuthorBaseApi";
import UnauthorApi from "./baseAPI/UnauthorBaseApi";
class AccountAPI {
  constructor() {
    this.url = "/accounts";
  }

  getAll = ({ page, sortField, isAsc, search, role, status }) => {
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
    if (role) {
      url += `&role=${role}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    return AuthorApi.get(url);
  };

  delete = (accountId) => {
    return AuthorApi.delete(`${this.url}/${accountId}`);
  };
  signUp = (firstname, lastname, username, email, password) => {
    let body = {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
    };
    return UnauthorApi.post(`${this.url}/registration`, body);
  };
}
export default new AccountAPI();
