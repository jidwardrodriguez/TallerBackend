import express from "express";
import { crearSolicitud, buscarSolicitudes, buscarSolicitudId, actualizarSolicitud, eliminarSolicitud } from "../controladores/solicitudesController.js";

const routerSolicitudes = express.Router();

routerSolicitudes.post('/crear', (req, res) => {
    crearSolicitud(req, res)
});

routerSolicitudes.get('/buscar', (req, res) => {
    buscarSolicitudes(req, res)
});

routerSolicitudes.get('/buscarId/:id', (req, res) => {
    buscarSolicitudId(req, res)
});

routerSolicitudes.put('/actualizar/:id', (req, res) => {
    actualizarSolicitud(req, res);
});

routerSolicitudes.delete('/eliminar/:id', (req, res) => {
    eliminarSolicitud(req, res);
});

export { routerSolicitudes };
