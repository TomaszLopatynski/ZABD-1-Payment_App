import {
    RETRIEVE_PROFILECARDS,
} from "./types";

import ProfileCardsDataService from "../services/profilecards.service";

export const retrieveProfileCards = (id) => async (dispatch) => {
    try {
        const res = await ProfileCardsDataService.get(id);

        dispatch({
            type: RETRIEVE_PROFILECARDS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};