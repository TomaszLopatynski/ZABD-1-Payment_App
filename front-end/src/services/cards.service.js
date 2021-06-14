import http from "../http-common";

class CardsDataService {
    get(id) {
        return http.get(`/cards/${id}`);
    }
}

export default new CardsDataService();