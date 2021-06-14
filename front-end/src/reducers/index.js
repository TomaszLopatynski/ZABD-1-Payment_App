import { combineReducers } from "redux";
import cards from "./cards";
import users from "./users";
import transactions from "./transactions";

export default combineReducers({
    cards,
    users,
    transactions
});