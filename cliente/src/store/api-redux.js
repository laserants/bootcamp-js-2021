import api from "./api";

const asignarProductos = (payload) => ({
    type: "asignar-productos",
    payload
})

const apiMiddleware = ({dispatch}) => (next) => async (action) => {

    switch (action.type) {
        case "obtener-productos": {
            const productos = await api.all();
            dispatch(asignarProductos(productos));
            break;
        }
        case "producto-agregado": {
            await api.add(action.payload);
            const productos = await api.all();
            dispatch(asignarProductos(productos));
            break;
        }
        case "producto-modificado": {
            await api.update(action.payload);
            const productos = await api.all();
            dispatch(asignarProductos(productos));
            break;
        }
        case "producto-eliminado": {
            await api.remove(action.payload.codigo);
            const productos = await api.all();
            dispatch(asignarProductos(productos));
            break;
        }
        default:
            next(action);
            break;
    }

}

export default apiMiddleware;