import Sequelize from "sequelize";
import { db } from "../database/conexion.js";

const solicitudesAdopcion = db.define("solicitudes_adopcion", {
id_adoptante: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
},
id_mascota: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
    model: 'mascotas',
    key: 'id'
    }
},
nombre_adoptante: {
    type: Sequelize.STRING,
    allowNull: false,
},
telefono_adoptante: {
    type: Sequelize.STRING,
    allowNull: true,
},
correo_adoptante: {
    type: Sequelize.STRING,
    allowNull: true,
},
direccion_adoptante: {
    type: Sequelize.STRING,
    allowNull: true,
},
estado_solicitud: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'Pendiente',
},
});

export { solicitudesAdopcion };