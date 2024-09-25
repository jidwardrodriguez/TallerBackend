import Sequelize  from "sequelize";

const db = new Sequelize("caninos_peludos","caninos","caninospel123",{
    dialect: "mysql",
    host: "localhost"
});

export {db}