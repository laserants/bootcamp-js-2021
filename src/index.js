import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Encabezado, Productos } from "./productos.component";

const rootElement = document.getElementById("root");
const titulo = "Hola React 2021";
const productosIniciales = [
  { codigo: 1, nombre: "producto 1", cantidad: 2 },
  { codigo: 2, nombre: "producto 2", cantidad: 5 }
];

function cuadrado(valor) {
  return valor * valor;
}

const App = () => {
  const [productos, setProductos] = useState(productosIniciales);

  const update = (prop) => {
    const newProductos = productos.slice();
    const producto = newProductos.find((x) => x.codigo == prop.codigo);
    const index = productos.indexOf(producto);
    newProductos[index] = { ...producto, cantidad: producto.cantidad + 1 };
    setProductos(newProductos);
  };

  return (
    <div>
      <Encabezado titulo={titulo} valor={cuadrado(2 * 4)} />
      <Productos productos={productos} onProductClick={update} />
    </div>
  );
};

ReactDOM.render(<App />, rootElement);
