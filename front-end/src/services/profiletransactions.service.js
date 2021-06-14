import http from "../http-common";

class ProfileTransactionsDataService {
    get(id) {
        return http.get(`/profiletransactions/${id}`);
    }
}

export default new ProfileTransactionsDataService();