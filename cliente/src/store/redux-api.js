import api from "./api";

const ApiActionTypes = {
    ObtenerTodos: "FetchProductos",
    Agregar: "AddProduct"
};

const apiMiddleware = ({dispatch}) => next => async action => {

    switch (action.type) {
        case ApiActionTypes.ObtenerTodos: {
            console.log('<get-all>');
            const productos = await api.all();
            dispatch({ type: 'productos-cargar', payload: productos });
            console.log('</get-all>');
            break;
        }
        case 'producto-agregado-o-modificado': {
            console.log('<add-or-edit>');
            const data = action.payload;
            const { codigo } = data;
            const httpCall = !codigo ? api.add(data) : api.update(data);
            const producto = await httpCall;
            const productos = await api.all();
            dispatch({ type: "productos-cargar", payload: productos });
            dispatch({ type: "producto-seleccionado", payload: {} });
            console.log('</add-or-edit>');
            break;
        }
        case 'producto-eliminado': {
            console.log('<eliminar>');
            const data = action.payload;
            const { codigo } = data;
            const producto = await api.remove(codigo);
            const productos = await api.all();
            dispatch({ type: "productos-cargar", payload: productos });
            dispatch({ type: "producto-seleccionado", payload: {} });
            console.log('</eliminar>');
            break;
        }
        case 'producto-seleccionado': {
            console.log('<seleccionar>');
            const data = action.payload;
            const { codigo } = data;
            if (!codigo) {
                dispatch({ type: "producto-cargar", payload: {} });
            } else {
                const producto = await api.single(codigo);
                dispatch({ type: "producto-cargar", payload: producto });
            }
            
            console.log('</seleccionar>');
            break;
        }

        default:
            next(action);
            break;
    }

};

export default apiMiddleware;