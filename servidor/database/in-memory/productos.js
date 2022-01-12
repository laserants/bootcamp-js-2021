let lastId = 1;
const productos = [
    {
        nombre: "producto a",
        cantidad: 1,
        precio: 10,
        codigo: lastId,
        total: 10
    }
];

const all = () => Promise.resolve(productos);
const filter = (filtro) => Promise.resolve(productos.filter(p => p.nombre.indexOf(filtro) >= 0));
const add = (producto) => {
    lastId++;
    const nuevoProducto = {...producto, codigo: lastId, total: producto.cantidad * producto.precio };
    productos.push(nuevoProducto);
    return Promise.resolve(nuevoProducto);
};
const single = (codigo) => Promise.resolve(productos.find(p => p.codigo == codigo));
const update = (codigo, producto) => {
    const old = productos.find(p => p.codigo == codigo);
    if(!old){
        return Promise.reject("No existe ningun producto con codigo " + codigo);
    }
    const index = productos.indexOf(old);
    const nuevoProducto = productos[index] = { ...producto, codigo, total: producto.cantidad * producto.precio };
    return Promise.resolve(nuevoProducto);
}
const remove = (codigo) => {
    const producto = productos.find(p => p.codigo == codigo);
    if(!producto){
        return Promise.reject("No existe ningun producto con codigo " + codigo);
    }
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
    return Promise.resolve(producto);
}

export default {
    all,
    filter,
    add,
    single,
    update,
    remove
}