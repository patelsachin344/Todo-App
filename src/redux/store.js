import { applyMiddleware, legacy_createStore as createstore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";

const middleware = applyMiddleware(thunk);

export const store = createstore(reducer, middleware);
