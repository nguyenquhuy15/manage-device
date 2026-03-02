import UnauthorApi from './baseAPI/UnauthorBaseApi';
import AuthorApi from './baseAPI/AuthorBaseApi';

class UserAPI {

    constructor() {
        this.url = "/accounts";
    }

    existsByUsername = (username) => {
        return UnauthorApi.get(`${this.url}/username/exists?username=${username}`);
    };

    existsByEmail = (email) => {
        return UnauthorApi.get(`${this.url}/email/exists?email=${email}`);
    };

    existsByUsernameOrEmail = (usernameOrEmail) => {
        return UnauthorApi.get(`${this.url}/usernameOrEmail/exists?usernameOrEmail=${usernameOrEmail}`);
    };

    getDepartmentInfo = () => {
        return AuthorApi.get(`${this.url}/department`);
    };

    getAllAccountsByNoDepartment = (search, sortField, isAsc) => {
        let url = `${this.url}/noDepartment`;

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
    }

    getInfoAccountsByUsernames = (usernames) => {
        return AuthorApi.get(`${this.url}/info?usernames=${usernames.join(",")}`);
    }
}

export default new UserAPI();