const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = Redux.applyMiddleware(
    loggerMiddleware,
    agregarOModificarProductoMiddleware,
    generadorCodigoProductoBuilder(100),
);

const store = Redux.createStore(reducer, preloadedState, middlewares);

store.subscribe(dispatchOnChange(store.getState, (state) => {
    ui.renderForm(state.producto);
    ui.renderTable(state.productos);
}))

ui.onFormSubmit = producto => store.dispatch(agregarOModificarProducto(producto));
ui.onEliminarClick = codigo => store.dispatch(productoEliminado(codigo));
ui.onEditarClick = codigo => store.dispatch(productoSeleccionado(codigo));

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