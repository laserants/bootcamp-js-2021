import React from "react";

export const Encabezado = (prop) => (
    <h1>
        {prop.titulo}: {prop.valor}
    </h1>
);

const Producto = (prop) => (
    <li className="producto" onClick={(e) => prop.onProductClick(prop, e)}>
        Nombre: {prop.nombre}, Cantidad: {prop.cantidad}
    </li>
);


export const Productos = (prop) => (
    <ul>
      {prop.productos.map((item) => (
        <Producto
          key={item.codigo}
          codigo={item.codigo}
          nombre={item.nombre}
          cantidad={item.cantidad}
          onProductClick={prop.onProductClick}
        />
      ))}
    </ul>
  );