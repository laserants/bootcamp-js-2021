const ActionTypes = {
    ProductoAgregado: "producto-agregado",
    ProductoModificado: "producto-modificado",
    ProductoEliminado: "producto-eliminado",
    ProductoSeleccionado: "producto-seleccionado",
    ProductoAgregadoModificado: "producto-agregado-o-modificado",
};

export const reducer = (state, action) => {

    switch (action.type) {
        case ActionTypes.ProductoAgregado:
            return productoAgregadoReducer(state, action);

        case ActionTypes.ProductoModificado:
            return productoModificadoReducer(state, action);
        
        case ActionTypes.ProductoEliminado:
            return productoEliminadoReducer(state, action);

        case ActionTypes.ProductoSeleccionado:
            return productoSeleccionadoReducer(state, action);

        default:
            return state;
    }
};

export const productoSeleccionado = (codigo) => ({
    type: ActionTypes.ProductoSeleccionado,
    payload: {
        codigo
    }
});

export const productoEliminado = (codigo) => ({
    type: ActionTypes.ProductoEliminado,
    payload: { codigo }
});

export const productoModificado = (payload) => ({
    type: ActionTypes.ProductoModificado,
    payload
});

export const productoAgregado = (payload) => ({
    type: ActionTypes.ProductoAgregado,
    payload
});

export const agregarOModificarProducto = (payload) => ({
    type: ActionTypes.ProductoAgregadoModificado,
    payload
});

// function loggerMiddleware(store) {
//     return function dispatchWrapper(next) {
//         return function actionHandler(action) {
//             next(action);
//             const state = store.getState();
//             console.log("dispatching", action);
//             console.log("state", state);
//         }
//     }
// }

export const loggerMiddleware = store => next => action => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
}

export const storageMiddleware = store => next => action => {

    const actions = [
        ActionTypes.ProductoAgregado,
        ActionTypes.ProductoModificado,
        ActionTypes.ProductoEliminado
    ];
    const result = next(action);

    if (actions.indexOf(action.type) >= 0)
    {
        const state = store.getState();
        localStorage.setItem("state", JSON.stringify(state));
    }

    return result;
}

export const agregarOModificarProductoMiddleware = store => next => action => {
    if (action.type != ActionTypes.ProductoAgregadoModificado)
    {
        return next(action);
    }

    const producto = action.payload;
    const actionToDispatch = producto.codigo ? 
        productoModificado(producto) : 
        productoAgregado(producto);

    store.dispatch(actionToDispatch);
    return store.dispatch(productoSeleccionado(null));
}

function productoSeleccionadoReducer(state, action) {
    const codigo = action.payload.codigo;
    return {
        ...state,
        producto: state.productos.find(x => x.codigo == codigo) || {}
    };
}

function productoEliminadoReducer(state, action) {
    const codigo = action.payload.codigo;
    const productos = state.productos.filter((item) => item.codigo != codigo);
    return {
        ...state,
        productos
    };
}

function productoModificadoReducer(state, action) {
    const producto = action.payload;
    const productos = state.productos.slice();
    const codigo = producto.codigo;
    const total = producto.cantidad * producto.precio;
    const old = productos.find((item) => item.codigo == codigo);
    const index = productos.indexOf(old);
    productos[index] = { ...producto, total };
    return {
        ...state,
        productos
    };
}

function productoAgregadoReducer(state, action) {
    const producto = action.payload;
    const total = producto.cantidad * producto.precio;
    return {
        ...state,
        productos: [
            ...state.productos,
            {
                ...producto,
                total
            }
        ]
    };
}

export function generadorCodigoProductoBuilder(codigoInicial)
{
    let codigo = codigoInicial;
    return store => next => action => {
        if (action.type != ActionTypes.ProductoAgregado)
        {
            return next(action);
        }

        codigo++;
        const actionToDispatch = {
            ...action,
            payload: {
                ...action.payload,
                codigo
            }
        };
        return next(actionToDispatch);
    };
}