import React, { useState } from "react";

const ProductForm = () => {
    const categorias = [
        { codigo: 1, nombre: 'Categoria 1' },
        { codigo: 2, nombre: 'Categoria 2' },
        { codigo: 3, nombre: 'Categoria 3' },
        { codigo: 4, nombre: 'Categoria 4' }
    ];

    const [values, setValues] = useState({
        nombre: '',
        cantidad: '',
        precio: '',
        categoria: 1
    });

    const onChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        setValues((v) => ({
            ...v,
            [name]: value
        }));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log('values: ', values);
    }

    const canSave = !!(values.nombre && values.cantidad && values.precio);

    return <form action="index.html" onSubmit={onSubmit}>
        <input type="hidden" name="codigo" id="codigo" />
        <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input type="text" name="nombre" id="nombre" className="form-control" value={values.nombre} onChange={onChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="cantidad" className="form-label">Cantidad</label>
            <input type="number" name="cantidad" id="cantidad" className="form-control" value={values.cantidad} onChange={onChange} />
        </div>
        <div className="mb-3">
            <label htmlFor="precio" className="form-label">Precio</label>
            <div className="input-group">
                <span className="input-group-text">Q</span>
                <input type="number" name="precio" id="precio" className="form-control" value={values.precio} onChange={onChange} />
            </div>
        </div>
        <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoría</label>
            <select name="categoria" id="categoria" className="form-control" value={values.categoria} onChange={onChange}>
                { categorias.map(c => <option key={c.codigo} value={c.codigo}>{c.nombre}</option>)}
            </select>
        </div>
        <div className="mb-3">
            <button type="submit" className="btn btn-primary" disabled={!canSave} >Guardar</button>
        </div>
    </form>;
}

export default ProductForm;