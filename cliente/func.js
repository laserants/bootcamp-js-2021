// function mensaje(prefijo, formateador)
// {
//     return function(texto)
//     {
//         return formateador(prefijo, texto);
//     }
// }

// const formatoBienvenida = function(prefijo, texto)
// {
//     return "¡" + prefijo + " " + texto + "!";
// }

const mensaje = (prefijo, format) => (texto) => format(prefijo, texto);

const bienvenida = mensaje("hola", (a, b) => `¡${a} ${b}!`);
const despedida = mensaje("adios", (a, b) => `${a} ${b}... :(`);

console.log(bienvenida("mundo"));
console.log(despedida("mundo"));