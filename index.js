const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");

let indice = 0;
let cantidadTotal = 0;
let preciosTotales = 0;
let granTotal = 0;

form.addEventListener("submit", onSubmit);

/**
 * 
 * @param {Event} event 
 */
function onSubmit(event)
{
    event.preventDefault();

    const data = new FormData(form);
    const values = Array.from(data.entries());

    const [frmNombre, frmCantidad, frmPrecio, frmCategoria] = values;

    const nombre = frmNombre[1];
    const cantidad = frmCantidad[1];
    const precio = frmPrecio[1];
    const categoria = frmCategoria[1];
    const total = cantidad * precio;

    cantidadTotal = parseFloat(cantidad) + cantidadTotal;
    preciosTotales = parseFloat(precio) + preciosTotales;
    granTotal = parseFloat(total) + granTotal;

    indice++;
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${indice}</td>
        <td>${nombre}</td>
        <td>${cantidad}</td>
        <td>${precio}</td>
        <td>${total}</td>
        <td><a href="#">Editar</a> | <a href="#">Eliminar</a></td>
    `;
    tbody.appendChild(tr);

    cantidadTotalElement.innerText = cantidadTotal;
    precioTotalElement.innerText = preciosTotales;
    granTotalElement.innerText = granTotal;

    form.reset();
}