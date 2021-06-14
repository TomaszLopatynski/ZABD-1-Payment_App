import {
    CREATE_CARD
} from "../actions/types";

const initialState = [];

function cardReducer(cards = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_CARD:
            return [...cards, payload];

        default:
            return cards;
    }
}

export default cardReducer;