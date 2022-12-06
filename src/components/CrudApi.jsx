import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudApiPacientes from "./CrudApiPacientes";
import CrudTable from "./CrudTable";
import { Loader } from "./Loader";
import { Message } from "./Message";

const CrudApi = () => {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [nombreEspecialista, setNombreEspecialista] = useState("")
  const [horario, setHorario] = useState("")
  const [lugar, setLugar] = useState("")
  const [loading, setLoading] = useState(false);
  let api = helpHttp();
  let url = "http://localhost:3003/api/odontologos";

  useEffect(() => {
    setLoading(true);
    helpHttp()
      .get(url)
      .then((res) => {
        //console.log(res);
        if (!res.err) {
          setDb(res);
          setError(null);
        } else {
          setDb(null);
          setError(res);
        }
        setLoading(false);
      });
  }, [url]);
  
  const agendarTurno = (data) => {
    let endpoint = `${url}/${data.id}`;
    console.log(data.id)
    api.get(endpoint).then((res) => {
      if (!res.err) {
        setError(null);
        setNombreEspecialista(data.nombre)
        setHorario(data.horarioAtencion)
        setLugar(data.lugarAtencion)
        console.log(nombreEspecialista)
        console.log(horario)
        console.log(lugar)
        alert(`Selecciono al especialista ${data.nombre}`)
      } else{
        setError(res)
      }
    })

  }

  return (
    <div>
      <h2>Bienvenido al administrador de turnos</h2>
      <article className="grid-1-2">
        <CrudApiPacientes nombreEspecialista={nombreEspecialista} setNombreEspecialista={setNombreEspecialista} horario={horario} setHorario={setHorario} lugar={lugar} setLugar={setLugar} agendarTurno={agendarTurno}/>
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {db && (
          <CrudTable
            data={db}
            agendarTurno={agendarTurno}
          />
        )}
      </article>
    </div>
  );
};

export default CrudApi;
