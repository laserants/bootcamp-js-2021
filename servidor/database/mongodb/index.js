import mongoose from "mongoose";
import productos from "./productos";

console.log(process.env);

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017/productos";

mongoose.connect(mongodbUri, () => {
    console.log("Conectado a la base de datos");
});

export { productos };
