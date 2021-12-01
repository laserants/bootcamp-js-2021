import { applyMiddleware, createStore } from "redux";
import { ui } from "./ui";
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

store.subscribe(dispatchOnChange(store.getState, (state) => {
    ui.renderForm(state.producto);
    ui.renderTable(state.productos);
}))

ui.onFormSubmit = producto => store.dispatch(storage.agregarOModificarProducto(producto));
ui.onEliminarClick = codigo => store.dispatch(storage.productoEliminado(codigo));
ui.onEditarClick = codigo => store.dispatch(storage.productoSeleccionado(codigo));

function dispatchOnChange(getState, dispatch) {
    let latestState;

    return function () {
        let currentState = getState();
        if (currentState != latestState)
        {
            latestState = currentState;
            dispatch(currentState);
        }
    }
}