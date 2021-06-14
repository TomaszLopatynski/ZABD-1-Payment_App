import http from "../http-common";

class ProfileCardsDataService {
    get(id) {
        return http.get(`/profilecards/${id}`);
    }
}

export default new ProfileCardsDataService();