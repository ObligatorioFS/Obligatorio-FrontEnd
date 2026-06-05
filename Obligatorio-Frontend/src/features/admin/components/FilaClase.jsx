import { Link } from "react-router";

const FilaClase = ({ id, actividad, dia, hora, sala, capacidadMax, inscriptos }) => {
  return (
    <tr>
      <td>{actividad?.nombre || 'Sin actividad'}</td>
      <td>{dia}</td>
      <td>{hora}</td>
      <td>{sala?.nombre || 'Sin sala'}</td>
      <td>{inscriptos} / {capacidadMax}</td>
      <td>
        <Link className="table-btn" to={`/dashboardAdmin/clases/${id}`}>
          Ver detalles
        </Link>
      </td>
    </tr>
  )
}

export default FilaClase;
