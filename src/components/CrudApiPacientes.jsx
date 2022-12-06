import React, { useState, useEffect } from "react";
import { helpHttp } from "../helpers/helpHttp";
import CrudForm from "./CrudForm";
import CrudTablePacientes from "./CrudTablePacientes";
import { Loader } from "./Loader";
import { Message } from "./Message";

const CrudApiPacientes = ({
  nombreEspecialista,
  setNombreEspecialista,
  horario,
  setHorario,
  lugar,
  setLugar,
  agendarTurno,
}) => {
  const [db, setDb] = useState(null);
  const [dataToEdit, setDataToEdit] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let api = helpHttp();
  let url = "http://localhost:3003/api/pacientes";

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

  const createData = (data) => {
    data.id = Date.now();
    console.log(data);

    let options = {
      body: data,
      headers: { "content-type": "application/json" },
    };

    api.post(url, options).then((res) => {
      console.log(res);
      if (!res.err) {
        setDb([...db, res]);
      } else {
        setError(res);
      }
    });

  };


  const updateData = (data) => {
    let endpoint = `${url}/${data.id}`;

/*     let options = {
      body: data,
      headers: { "content-type": "application/json" },
    }; */

   /*  api.put(endpoint, options).then((res) => {
      if (!res.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(res);
      }
    }); */

    fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json"}
    })
    .then(response => {
      if (!response.err) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
      } else {
        setError(response);
      }
    })
  };

  const deleteData = (id) => {
    let isDelete = window.confirm(`¿Estás seguro de cancelar el turno?`);

    if (isDelete) {
      let endpoint = `${url}/${id}`;
      /* let options = {
        headers: { "content-type": "application/json" },
      }; */
      
      console.log(id)

      fetch(endpoint , {
        method: "DELETE",
      })
      .then(res => {
        if(!res.err){
          let newData = db.filter(el => el.id !== id)
          setDb(newData)
        } else {
          setError(res)
        }
      })

      /* api.del(endpoint, options).then((res) => {
        if (!res.err) {
          let newData = db.filter((el) => el.id !== id);
          setDb(newData);
        } else {
          setError(res);
        }
      }); */
    } else {
      return;
    }
  };

  return (
    <div>
      <article className="grid-1-2">
        <CrudForm
          createData={createData}
          updateData={updateData}
          dataToEdit={dataToEdit}
          setDataToEdit={setDataToEdit}
          nombreEspecialista={nombreEspecialista}
          setNombreEspecialista={setNombreEspecialista}
          horario={horario}
          setHorario={setHorario}
          lugar={lugar}
          setLugar={setLugar}
          agendarTurno={agendarTurno}
        />
        {loading && <Loader />}
        {error && (
          <Message
            msg={`Error ${error.status}: ${error.statusText}`}
            bgColor="#dc3545"
          />
        )}
        {db && (
          <CrudTablePacientes
            data={db}
            setDataToEdit={setDataToEdit}
            deleteData={deleteData}
            nombreEspecialista={nombreEspecialista}
            horario={horario}
            lugar={lugar}
          />
        )}
      </article>
    </div>
  );
};

export default CrudApiPacientes;
