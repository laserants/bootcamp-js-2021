import http from "http";

const server = http.createServer((req, res) => {

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify([
        {
            codigo: 1, 
            nombre: "producto 1", 
            precio: 10, 
            cantidad: 100
        },
        {
            codigo: 2, 
            nombre: "producto 2", 
            precio: 50, 
            cantidad: 200
        }
    ]));
    res.end();

})

server.listen(5000, () => {
    console.log("Servidor escuchando en puerto 5000");
})