import React from "react";

const CrudTableRow = ({ agendarTurno, el}) => {
  let { nombre, horarioAtencion, lugarAtencion} = el;

  return (
    <tr>
      <td>{nombre}</td>
      <td>{horarioAtencion}</td>
      <td>{lugarAtencion}</td>
      <td>
        <button onClick={() => {agendarTurno(el)}}>Agendar Turno</button>
      </td>
    </tr>
  );
};

export default CrudTableRow;
