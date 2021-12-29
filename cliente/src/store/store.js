const ActionTypes = {
    ProductoAgregado: "producto-agregado",
    ProductoModificado: "producto-modificado",
    ProductoEliminado: "producto-eliminado",
    ProductoSeleccionado: "producto-seleccionado",
    ProductoAgregadoModificado: "producto-agregado-o-modificado",
    ProductosCargar: "productos-cargar",
    ProductoCargar: "producto-cargar",
};

export const reducer = (state, action) => {

    switch (action.type) {
        case ActionTypes.ProductosCargar:
            return {...state, productos: action.payload };
        case ActionTypes.ProductoCargar:
            return {...state, producto: action.payload };
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
