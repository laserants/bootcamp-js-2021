import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { productos } from "./database"


const app = express();

app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(logs);

app.get("/", (req, res) => res.send("<h1>API de productos</h1>"));

app.get("/productos", async (req, res) => {
    const filtro = req.query.filtro;
    let result;

    if (filtro)
    {
        result = await productos.filter(filtro);
    } else {
        result = await productos.all();
    }

    res.json(result)
});

app.post("/productos", async (req, res) => {
    const producto = await productos.add(req.body);
    res.status(201)
    res.json(producto);
})

app.get("/productos/:codigo", async (req, res) => {
    const codigo = req.params.codigo;
    const producto = await productos.single(codigo);

    if (!producto)
    {
        res.status(404)
        res.json({ mensaje: "No existe ningun producto con codigo " + codigo });
    } else {
        res.status(200);
        res.json(producto);
    }
})

app.put("/productos/:codigo", async (req, res) => {
    const codigo = req.params.codigo;

    try {
        const newProducto = await productos.update(codigo, req.body);
        res.status(200);
        res.json(newProducto);
    } catch (mensage) {
        res.status(404);
        res.json({ mensage });
    }
})


app.delete("/productos/:codigo", async (req, res) => {
    const codigo = req.params.codigo;

    try {
        await productos.remove(codigo);
        res.status(200);
        res.json({ message: "Producto eliminado" });
    } catch (mensaje) {
        res.status(404)
        res.json({ mensaje });
    }
})

app.listen(5001, () => {
    console.log("servidor express escuchando en puerto 5001")
})

// function isAuthenticated(req, res, next) {
//     const auth = req.headers.authorization;
//     if (auth == "hola-mundo")
//     {
//         next();
//     } else {
//         res.status(401);
//         res.send("Not authorized");
//     }
// }

function logs(req, res, next)
{
    console.log(`${req.method}: ${req.originalUrl}`);
    next();
}