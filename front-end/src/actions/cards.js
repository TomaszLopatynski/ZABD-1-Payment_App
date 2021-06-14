import {
    CREATE_CARD,
} from "./types";

import CardsDataService from "../services/cards.service";

export const createCard = (number, expDate, cvv) => async (dispatch) => {
    try {
        const res = await CardsDataService.create({ number, expDate, cvv });

        dispatch({
            type: CREATE_CARD,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};