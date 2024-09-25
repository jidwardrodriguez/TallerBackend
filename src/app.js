import express from "express";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { routerSolicitudes } from "./rutas/solicitudesRouter.js";
import {db} from "./database/conexion.js";

//Crear instancia de Express
const app = express();

// Midleware
app.use(express.json())

//Verificar Conexion Base Datos
db.authenticate().then(()=>{
    console.log(`Conexion a Base de datos correcta`);
}).catch(err=>{
    console.log(`Conexion a Base de datos incorrecta: ${err}`);
});


//Definir Rutas
app.get('/', (req, res) => {
    res.send('Hola Sitio Principal');
});

//Llamar rutas de mascotas
app.use("/mascotas", routerMascotas);

// Llamar rutas de solicitudes
app.use("/solicitudes", routerSolicitudes);


//Puerto de Servidor
const PORT=4000;

db.sync({}).then(()=>{
    //Abri servicio e iniciar el Servidor
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en el puerto ${PORT}`);
    })

}).catch(err=>{
    console.log(`Error al Sincronizar base de datos: ${err}`);
});