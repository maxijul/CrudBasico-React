import express from 'express';
import { db } from "../db/db.js";

const odontologosRouter = express.Router()

odontologosRouter.get("/", (request, response) => {
    response.json(db.odontologos);
  });
  
  odontologosRouter.get("/:id", (request, response) => {
    const id = +request.params.id;
    const odontologo = db.odontologos.find((odon) => odon.id === id);
  
    if (odontologo) {
      response.json(odontologo);
    } else {
      response.status(404).end();
    }
  });
  
  odontologosRouter.post("/", (request, response) => {
    const odontologo = request.body;
  
    if (
      !odontologo ||
      !odontologo.nombre ||
      !odontologo.horarioAtencion ||
      !odontologo.lugarAtencion
    ) {
      return response.status(400).json({
        error: "faltan datos",
      });
    }
  
    const ids = db.odontologos.map((odon) => odon.id);
    const maxId = Math.max(...ids);
    const newOdon = {
      id: maxId + 1,
      nombre: odontologo.nombre,
      horarioAtencion: odontologo.horarioAtencion,
      lugarAtencion: odontologo.lugarAtencion,
    };
  
    db.odontologos = [...db.odontologos, newOdon];
  
    response.status(201).json(odontologo);
  });
  
  odontologosRouter.delete("/:id", (request, response) => {
    const id = +request.params.id;
    db.odontologos = db.odontologos.filter((odon) => odon.id !== id);
    response.status(204).end();
  });
  
  odontologosRouter.put("/:id", (request, response) => {
    const id = +request.params.id;
    const changes = request.body;
  
    const index = db.odontologos.findIndex((odon) => odon.id === id);
  
    if (index !== -1) {
      db.odontologos[index] = changes;
      response.status(200).json(db.odontologos[index]);
    } else {
      response.status(404).end();
    }
  }); 

  export default odontologosRouter