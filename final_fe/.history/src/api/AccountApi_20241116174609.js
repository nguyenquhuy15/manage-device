import { PAGING } from "../constants";
import AuthorApi from "./baseAPI/AuthorBaseApi";
import UnauthorApi from "./baseAPI/UnauthorBaseApi";
class AccountAPI {

    constructor() {
        this.url = "/accounts";
    }

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
      // filter
      if (role) {
        url += `&status=${role}`;
        }
              if (role) {
                url += `&status=${role}`;
              }
      return AuthorApi.get(`${this.url}/detail`);
    };

}
export default new AccountAPI();