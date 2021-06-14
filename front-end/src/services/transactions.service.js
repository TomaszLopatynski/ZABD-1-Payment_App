import http from "../http-common";

class TransactionsDataService {
    getAll() {
        return http.get("/transactions");
    }

    get(id) {
        return http.get(`/transactions/${id}`);
    }

    create(data) {
        return http.post("/transactions", data);
    }

    update(id, data) {
        return http.put(`/transactions/${id}`, data);
    }

    delete(id) {
        return http.delete(`/transactions/${id}`);
    }
}

export default new TransactionsDataService();