import api from "./api";
import { push } from "connected-react-router";

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
            dispatch(push("/"))
            break;
        }
        case "producto-modificado": {
            await api.update(action.payload);
            dispatch(push("/"))
            break;
        }
        case "producto-eliminado": {
            await api.remove(action.payload.codigo);
            const productos = await api.all();
            dispatch(asignarProductos(productos));
            break;
        }
        case "producto-seleccionado": {
            const {codigo} = action.payload;
            if (codigo)
            {
                const producto = await api.single(codigo);
                next({ type: action.type, payload: producto});
            }
            else {
                next({ type: action.type, payload: {}});
            }
            break;
        }
        default:
            next(action);
            break;
    }

}

export default apiMiddleware;