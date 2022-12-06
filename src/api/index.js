import express from "express";
import cors from 'cors'
import odontologosRouter from './routes/odontologos.js'
import pacientesRouter from './routes/pacientes.js'

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/odontologos", odontologosRouter);
app.use("/api/pacientes", pacientesRouter)


const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
