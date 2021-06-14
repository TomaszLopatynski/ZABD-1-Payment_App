import {
    CREATE_USER,
} from "./types";

import UsersDataService from "../services/users.service";

export const createUser = (name) => async (dispatch) => {
    try {
        const res = await UsersDataService.create({ name });

        dispatch({
            type: CREATE_USER,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};