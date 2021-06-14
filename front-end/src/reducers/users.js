import {
    CREATE_USER
} from "../actions/types";

const initialState = [];

function userReducer(users = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_USER:
            return [...users, payload];

        default:
            return users;
    }
}

export default userReducer;