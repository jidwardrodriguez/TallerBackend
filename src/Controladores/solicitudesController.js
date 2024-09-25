import { solicitudesAdopcion } from "../modelos/solicitudModelo.js";
import { mascotas } from "../modelos/mascotaModelo.js";

// Crear una solicitud de adopción
const crearSolicitud = async (req, res) => {
    const { id_mascota, nombre_adoptante, telefono_adoptante, correo_adoptante, direccion_adoptante, estado_solicitud } = req.body;

    // Validación: Verificar si los datos obligatorios están presentes
    if (!id_mascota || !nombre_adoptante || !telefono_adoptante || !correo_adoptante || !direccion_adoptante || !estado_solicitud) {
        return res.status(400).send({ mensaje: "Datos incompletos: Se requieren todos los campos" });
    }

    // Validación: Verificar que el nombre del adoptante sea válido (sin caracteres especiales, etc.)
    const nombreRegex = /^[a-zA-Z\s]+$/;
    // Validación: Verificar que el correo electrónico sea válido
    const correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validar el nombre del adoptante
    if (!nombreRegex.test(nombre_adoptante)) {
        return res.status(400).send({ mensaje: "El nombre del adoptante es inválido. Solo se permiten letras y espacios." });
    }

    // Validar el correo electrónico
    if (!correoRegex.test(correo_adoptante)) {
        return res.status(400).send({ mensaje: "El correo electrónico es inválido." });
    }


    try {
        // Validación: Verificar que la mascota exista en la base de datos
        const mascotaExistente = await mascotas.findByPk(id_mascota);
        if (!mascotaExistente) {
            return res.status(404).json({ mensaje: "La mascota no existe" });
        }

        // Validación: Evitar solicitudes duplicadas (misma mascota y adoptante)
        const solicitudExistente = await solicitudesAdopcion.findOne({
            where: { id_mascota, nombre_adoptante, telefono_adoptante, correo_adoptante, direccion_adoptante, estado_solicitud }
        });

        if (solicitudExistente) {
            return res.status(409).json({ mensaje: "Ya existe una solicitud para esta mascota y este adoptante" });
        }

        // Crear la nueva solicitud
        const nuevaSolicitud = {
            id_mascota,
            nombre_adoptante,
            telefono_adoptante, 
            correo_adoptante, 
            direccion_adoptante, 
            estado_solicitud
        };

        const resultado = await solicitudesAdopcion.create(nuevaSolicitud);
        res.status(201).json({ mensaje: "Solicitud de adopción creada", solicitud: resultado });
    } catch (err) {
        res.status(500).json({ mensaje: `Error creando solicitud: ${err}` });
    }
};


// Buscar todas las solicitudes
const buscarSolicitudes = async (req, res) => {
    const { nombre_adoptante, id_mascota, telefono_adoptante, correo_adoptante, direccion_adoptante, estado_solicitud} = req.query;

    let condicionesBusqueda = {};

    // Agregar filtros opcionales si están presentes en la query
    if (nombre_adoptante) {
        condicionesBusqueda.nombre_adoptante = nombre_adoptante;
    }

    if (id_mascota) {
        condicionesBusqueda.id_mascota = id_mascota;
    }

    if (telefono_adoptante) {
        condicionesBusqueda.telefono_adoptante = telefono_adoptante;
    }

    if (correo_adoptante) {
        condicionesBusqueda.correo_adoptante = correo_adoptante;
    }

    if (direccion_adoptante) {
        condicionesBusqueda.direccion_adoptante = direccion_adoptante;
    }

    if (estado_solicitud) {
        condicionesBusqueda.estado_solicitud = estado_solicitud;
    }

    try {
        // Buscar solicitudes en base a los filtros o retornar todas si no hay filtros
        const resultados = await solicitudesAdopcion.findAll({
            where: condicionesBusqueda
        });

        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron solicitudes" });
        }

        res.status(200).json(resultados);
    } catch (err) {
        res.status(500).json({ mensaje: `Error buscando solicitudes: ${err}` });
    }
};


// Buscar una solicitud en específico
const buscarSolicitudId = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID no puede estar vacío" });
    }

    solicitudesAdopcion.findByPk(id)
        .then((resultado) => {
            if (!resultado) {
                return res.status(404).json({ mensaje: "Solicitud no encontrada" });
            }
            res.status(200).json(resultado);
        })
        .catch((err) => {
            res.status(500).json({ mensaje: `Error buscando solicitud: ${err}` });
        });
};

//Actualizar Solicitud
const actualizarSolicitud = (req, res) => {
    const id_adoptante = req.params.id;

    // Validación: verificar si existe el nombre adoptante
    if (!id_adoptante || !req.body.nombre_adoptante || !req.body.telefono_adoptante || !req.body.correo_adoptante || !req.body.direccion_adoptante || !req.body.estado_solicitud) {
        return res.status(400).json({ mensaje: "Datos incompletos o ID faltante" });
    }

    const { nombre_adoptante, telefono_adoptante, correo_adoptante, direccion_adoptante, estado_solicitud } = req.body;

    solicitudesAdopcion.update(
        { nombre_adoptante, telefono_adoptante, correo_adoptante, direccion_adoptante, estado_solicitud },
        { where: { id_adoptante } }
    )
    .then((resultado) => {
        if (resultado[0] === 0) {
            return res.status(404).json({ mensaje: "Solicitud no encontrada" });
        }
        res.status(200).json({ mensaje: "Solicitud actualizada correctamente" });
    })
    .catch((err) => {
        res.status(500).json({ mensaje: `Error actualizando solicitud: ${err}` });
    });
};



//Eliminar Solicitud
const eliminarSolicitud = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ mensaje: "El ID no puede estar vacío" });
    }

    solicitudesAdopcion.findByPk(id)
        .then((resultado) => {
            if (!resultado) {
                return res.status(404).json({ mensaje: "Solicitud no encontrada" });
            }

            return resultado.destroy().then(() => {
                res.status(200).json({ mensaje: "Solicitud eliminada con éxito" });
            });
        })
        .catch((err) => {
            res.status(500).json({ mensaje: `Error eliminando solicitud: ${err}` });
        });
};

export { crearSolicitud, buscarSolicitudes, buscarSolicitudId, actualizarSolicitud, eliminarSolicitud };
