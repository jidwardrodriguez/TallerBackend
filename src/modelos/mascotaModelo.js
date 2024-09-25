import Sequelize  from "sequelize";
import {db} from "../database/conexion.js";


const mascotas = db.define("mascotas", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true  
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: true    
  },
  edad: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  tipo: {
    type: Sequelize.STRING
  },
  sexo: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  esterilizado: {
    type: Sequelize.STRING
  },
  adoptado: {
    type: Sequelize.STRING
  },
  vacunado: {
    type: Sequelize.STRING
  }
});


export {mascotas}