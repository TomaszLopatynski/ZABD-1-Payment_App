import {
    CREATE_TRANSACTION,
} from "./types";

import TransactionsDataService from "../services/transactions.service";

export const createTransactions = (amount, receiverCN, date) => async (dispatch) => {
    try {
        const res = await TransactionsDataService.get({ amount, receiverCN, date });

        dispatch({
            type: CREATE_TRANSACTION,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};