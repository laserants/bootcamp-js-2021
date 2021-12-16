import { applyMiddleware, createStore } from "redux";
import * as storage from "./store";

const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = applyMiddleware(
    storage.loggerMiddleware,
    storage.agregarOModificarProductoMiddleware,
    storage.generadorCodigoProductoBuilder(100),
);

const store = createStore(storage.reducer, preloadedState, middlewares);

export default store;