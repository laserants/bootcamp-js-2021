const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];

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

    const nombre = values[0][1];
    const cantidad = values[1][1];
    const precio = values[2][1];
    const categoria = values[3][1];

    const tr = document.createElement("tr");
    tr.innerHTML = "<td>X</td><td>" 
        + nombre + "</td><td>" 
        + cantidad + "</td><td>" 
        + precio + "</td><td>" 
        + 0 + '</td><td><a href="#">Editar</a> | <a href="#">Eliminar</a></td>';
    tbody.appendChild(tr);

    console.log(nombre);
    console.log(cantidad);
    console.log(precio);
    console.log(categoria);

}