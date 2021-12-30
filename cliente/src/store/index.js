import { applyMiddleware, combineReducers, createStore } from "redux";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import * as storage from "./store";
import apiMiddleware from "./redux-api";

const history = createBrowserHistory();

const preloadedState = {};

const middlewares = composeWithDevTools(
    applyMiddleware(
        routerMiddleware(history),
        apiMiddleware,
    )
);

const reducer = combineReducers({
    router: connectRouter(history),
    producto: storage.producto,
    productos: storage.productos
});

const store = createStore(reducer, preloadedState, middlewares);

window.store = store;
export { history };
export default store;