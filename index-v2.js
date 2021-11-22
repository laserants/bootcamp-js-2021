const preloadedState = {
    producto: {},
    productos: []
};

const reducer = (state, action) => {
    if (action.type == "producto-agregado")
    {
        return {
            ...state, 
            productos: [
                ...state.productos, 
                action.payload
            ]
        };
    }

    return state;
};

const store = Redux.createStore(reducer, preloadedState);

let latestState;

store.subscribe(() => {
    let currentState = store.getState();
    if (currentState != latestState)
    {
        latestState = currentState;
        console.log("estado: ", currentState);
    }
});

store.dispatch({ 
    type: "producto-agregado",
    payload: {
        id: 1,
        nombre: "prueba a"
    }
});

store.dispatch({ 
    type: "producto-modificado",
    payload: {
        id: 1,
        nombre: "prueba a v2"
    }
});

store.dispatch({ 
    type: "producto-agregado",
    payload: {
        id: 2,
        nombre: "prueba b"
    }
});