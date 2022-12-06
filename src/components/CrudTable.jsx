import React from "react";
import CrudTableRow from "./CrudTableRow";
import Table from 'react-bootstrap/Table'

const CrudTable = ({ data, agendarTurno }) => {
  return (
    <div>
      <h3>Odontólogos Disponibles</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Nombre del especialista</th>
            <th>Horarios de Atención</th>
            <th>Lugar de Atención</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((el) => (
              <CrudTableRow
                key={el.id}
                el={el}
                agendarTurno={agendarTurno}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">Sin datos</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CrudTable;