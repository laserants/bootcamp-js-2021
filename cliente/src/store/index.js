import { applyMiddleware, createStore } from "redux";
import * as storage from "./store";
import apiMiddleware from "./redux-api";

const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = applyMiddleware(
    // storage.loggerMiddleware,
    apiMiddleware,
    //storage.agregarOModificarProductoMiddleware,
    //storage.generadorCodigoProductoBuilder(100),
    //storage.storageMiddleware,
);

const store = createStore(storage.reducer, preloadedState, middlewares);

export default store;