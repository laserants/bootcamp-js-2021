const preloadedState = {
    producto: {},
    productos: []
};

const store = Redux.createStore(reducer, preloadedState);

let latestState;

store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState)
    {
        latestState = currentState;
        ui.renderForm(currentState.producto);
        ui.renderTable(currentState.productos);
    }
});

ui.onFormSubmit = (payload) => {

    if (payload.codigo)
    {
        store.dispatch({
            type: "producto-modificado",
            payload
        });
    }
    else {
        store.dispatch({
            type: "producto-agregado",
            payload
        });
    }

    store.dispatch({
        type: "producto-seleccionado",
        payload: {
            codigo: null
        }
    });
}

ui.onEliminarClick = (codigo) => {
    store.dispatch({
        type: "producto-eliminado",
        payload: { codigo }
    });
}

ui.onEditarClick = (codigo) => {
    store.dispatch({
        type: "producto-seleccionado",
        payload: { codigo }
    });
}