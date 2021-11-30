let indice = 0;

const reducer = (state, action) => {
    if (action.type == "producto-agregado")
    {
        indice++;
        const producto = action.payload;
        const codigo = indice;
        const total = producto.cantidad * producto.precio;
        return {
            ...state, 
            productos: [
                ...state.productos, 
                { 
                    ...producto,
                    codigo,
                    total
                }
            ]
        };
    }

    if (action.type == "producto-modificado")
    {
        const producto = action.payload;
        const productos = state.productos.slice();
        const codigo = producto.codigo;
        const total = producto.cantidad * producto.precio;
        const old = productos.find((item) => item.codigo == codigo);
        const index = productos.indexOf(old);
        productos[index] = {...producto, total };
        return {
            ...state,
            productos
        };
    }

    if (action.type == "producto-eliminado")
    {
        const codigo = action.payload.codigo;
        const productos = state.productos.filter((item) => item.codigo != codigo);
        return {
            ...state,
            productos
        }
    }

    if (action.type == "producto-seleccionado")
    {
        const codigo = action.payload.codigo;
        return {
            ...state,
            producto: state.productos.find(x => x.codigo == codigo) || {}
        }
    }

    return state;
};

const productoSeleccionado = (codigo) => ({
    type: "producto-seleccionado",
    payload: {
        codigo
    }
});

const productoEliminado = (codigo) => ({
    type: "producto-eliminado",
    payload: { codigo }
});

const productoModificado = (payload) => ({
    type: "producto-modificado",
    payload
});

const productoAgregado = (payload) => ({
    type: "producto-agregado",
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

const loggerMiddleware = store => next => action => {
    console.log("dispatching", action);
    const result = next(action);
    console.log("next state", store.getState());
    return result;
}

