

const FilaClase = ({/*id*/ actividad,dia,hora,sala,capacidadMax,inscriptos}) => {
  return (
    <tr>
      <td>{actividad?.nombre || 'Sin actividad'}</td>
      <td>{dia}</td>
      <td>{hora}</td>
      <td>{sala?.nombre || 'Sin sala'}</td>
      <td>{inscriptos} / {capacidadMax}</td>
      <td>
        <button className="table-btn" type="button">
          Ver detalles
        </button>
      </td>
    </tr>
  )
}

export default FilaClase
