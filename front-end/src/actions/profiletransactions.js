import {
    RETRIEVE_PROFILETRANSACTIONS,
} from "./types";

import ProfileTransactionsDataService from "../services/profiletransactions.service";

export const retrieveProfileTransactions = (id) => async (dispatch) => {
    try {
        const res = await ProfileTransactionsDataService.get(id);

        dispatch({
            type: RETRIEVE_PROFILETRANSACTIONS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};