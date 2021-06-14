import {
    CREATE_TRANSACTION
} from "../actions/types";

const initialState = [];

function transactionReducer(transactions = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_TRANSACTION:
            return [...transactions, payload];

        default:
            return transactions;
    }
}

export default transactionReducer;