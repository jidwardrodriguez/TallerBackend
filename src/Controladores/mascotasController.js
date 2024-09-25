import e from "express";
import { mascotas } from "../modelos/mascotaModelo.js";

//Crear un recurso Mascota
const crear = (req,res)=>{

    //Validar 
    if(!req.body.nombre){
        res.status(400).send({
            mensaje: "El nombre no puede estar vacio."
        });
        return;
    }

    const dataset={
        nombre: req.body.nombre,
        edad: req.body.edad,
        tipo: req.body.tipo,
        sexo: req.body.sexo,
        color: req.body.color,
        esterilizado: req.body.esterilizado,
        adoptado: req.body.adoptado,
        vacunado: req.body.vacunado
    }

    //Usuar Sequelize para crear el recurso en la base de datos
    mascotas.create(dataset).then((resultado)=>{
        res.status(200).json({
            mensaje: "Registro de Mascota Creado con Exito"
        });
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `Registro de Mascota No creado ::: ${err}`
        });
    });
}

//Buscar Mascotas
const buscar= (req,res)=>{
    mascotas.findAll().then((resultado)=>{
        res.status(200).json(resultado);
    }).catch((err)=>{
        res.status(500).json({
            mensaje:`No se encontraron registros ::: ${err}`
        });
    });
}


//buscar por ID
const buscarId= (req,res)=>{

    const id=req.params.id;
    if(id==null){
        res.status(400).json({
            mensaje: "El id no puede estar vacio"
        });
        return;
    }
    else{
        mascotas.findByPk(id).then((resultado)=>{
            res.status(200).json(resultado);
        }).catch((err)=>{
            res.status(500).json({
                mensaje:`No se encontraron registros ::: ${err}`
            });
        });
    }
    
}

//Actualizar Mascota
const actualizar=(req,res)=>{
    const id=req.params.id;
    if(!req.body.nombre && !req.body.nombre){
        res.status(400).json({
            mensaje: "No se encontraron Datos para Actualizar"
        });
        return;

    }
    else{
        const nombre=req.body.nombre;
        const edad=req.body.edad;
        const tipo=req.body.tipo;
        const sexo=req.body.sexo;
        const color=req.body.color;
        const esterilizado=req.body.esterilizado;
        const adoptado=req.body.adoptado;
        const vacunado=req.body.vacunado;
        
        mascotas.update({nombre,edad, tipo, sexo, color, esterilizado, adoptado, vacunado},
            {where:{id}}).then((resultado)=>{
            res.status(200).json({
                tipo: 'success',
                mensaje: "Registro Actualizado"
            });

        }).catch((err)=>{
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar Registro ::: ${err}`
            });

        });
    }
    

}

//Eliminar Mascota
const eliminar = (req, res) => {
    const id = req.params.id;

    //Validar
    if (!id) {
        res.status(400).json({
            mensaje: "El id no puede estar vacío"
        });
        return;
    }

    // Buscar la mascota por ID
    mascotas.findByPk(id).then((resultado) => {
        if (!resultado) {
            res.status(404).json({
                mensaje: "Mascota no encontrada"
            });
            return;
        }

        return resultado.destroy().then(() => {
            res.status(200).json({
                mensaje: "Mascota eliminada con éxito"
            });
        });
    }).catch((err) => {
        res.status(500).json({
            mensaje: `Error al buscar/eliminar la mascota ::: ${err}`
        });
    });
}


export {crear, buscar, buscarId, actualizar, eliminar}