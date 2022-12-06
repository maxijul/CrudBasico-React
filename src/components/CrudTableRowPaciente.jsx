import React from "react";

const CrudTableRowPaciente = ({el, setDataToEdit, deleteData}) => {
  let { nombre, apellido, mail, numeroTelefono, id, odontologoAsignado, horarioAtencion, lugarAtencion} = el;

  return (
    <tr>
      <td>{nombre}</td>
      <td>{apellido}</td>
      <td>{mail}</td>
      <td>{numeroTelefono}</td>
      <td>{odontologoAsignado}</td>
      <td>{horarioAtencion}</td>
      <td>{lugarAtencion}</td>

      <td>
        <button onClick={() => setDataToEdit(el)}>Editar datos</button>
        <button onClick={() => deleteData(id)}>Cancelar Cita</button>
      </td>
    </tr>
  );
};

export default CrudTableRowPaciente;
