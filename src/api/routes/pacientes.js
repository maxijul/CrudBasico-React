import express from 'express';
import { db } from "../db/db.js";

const pacientesRouter = express.Router()

pacientesRouter.get("/", (request, response) => {
    response.json(db.pacientes);
  });
  
  pacientesRouter.get("/:id", (request, response) => {
    const id = +request.params.id;
    const paciente = db.pacientes.find((paci) => paci.id === id);
  
    if (paciente) {
      response.json(paciente);
    } else {
      response.status(404).end();
    }
  });
  
  pacientesRouter.post("/", (request, response) => {
    const paciente = request.body;
  
    if (
      !paciente ||
      !paciente.nombre ||
      !paciente.apellido ||
      !paciente.mail ||
      !paciente.numeroTelefono ||
      !paciente.odontologoAsignado ||
      !paciente.horarioAtencion ||
      !paciente.lugarAtencion
    ) {
      return response.status(400).json({
        error: "faltan datos",
      });
    }
  
    

    const newPaciente = {
      id: 1,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      mail: paciente.mail,
      numeroTelefono: paciente.numeroTelefono,
      odontologoAsignado: paciente.odontologoAsignado,
      horarioAtencion: paciente.horarioAtencion,
      lugarAtencion: paciente.lugarAtencion
    };
  
    db.pacientes = [...db.pacientes, newPaciente];
  
    response.status(201).json(paciente);
  });
  
  pacientesRouter.delete("/:id", (request, response) => {
    const id = +request.params.id;
    db.pacientes = db.pacientes.filter((paci) => paci.id !== id);
    response.status(204).end();
  });
  
  pacientesRouter.put("/:id", (request, response) => {
    const id = +request.params.id;
    const changes = request.body;
  
    const index = db.pacientes.findIndex((paci) => paci.id === id);
  
    if (index !== -1 && changes && changes.nombre) {
      db.pacientes[index] = changes;
      response.status(200).json(db.pacientes[index]);
    } else {
      response.status(404).end();
    }
  }); 


export default pacientesRouter