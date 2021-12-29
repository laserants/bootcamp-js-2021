import axios from "axios";

const serviceUrl = 'http://localhost:5001/productos/';

async function request(httpCall)
{
    try {
        const response = await httpCall(serviceUrl);
        return response.data;
    } catch (error) {
        console.error("error en el request: ", error);
        return null;
    }
}

const all = () => request(url => axios.get(url));
const single = (codigo) => request(url => axios.get(url + codigo));
const add = (producto) => request(url => axios.post(url, producto));
const update = ({codigo, ...producto}) => request(url => axios.put(url + codigo, producto));
const remove = (codigo) => request(url => axios.delete(url + codigo));

export default {
    all,
    add,
    update,
    remove,
    single
}