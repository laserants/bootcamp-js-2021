import { applyMiddleware, createStore } from "redux";
import * as storage from "./store";

const savedState = localStorage.getItem("state");
const deserialized = savedState && JSON.parse(savedState);
const preloadedState = deserialized || {
    producto: {},
    productos: []
};

const middlewares = applyMiddleware(
    storage.loggerMiddleware,
    storage.agregarOModificarProductoMiddleware,
    storage.generadorCodigoProductoBuilder(100),
    storage.storageMiddleware,
);

const store = createStore(storage.reducer, preloadedState, middlewares);

export default store;