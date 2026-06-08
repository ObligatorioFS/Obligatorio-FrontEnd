import { useDispatch } from "react-redux"
import '../styles/Rutina.css'
import MensajeAlerta from "../../shared/components/MensajeAlerta"
import { useState } from "react"
import { actualizarRutina, removeRutina } from "../../rutinasSlice"
import { useNavigate, Link } from "react-router"
import { BASE_URL } from "../../../config/api"
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal"

const Rutina = ({ rutina }) => {

  return (
    <article key={rutina._id} className="routine-card">
      <div>
        <h3>{rutina.objetivo}</h3>
        <p>{rutina.actividad?.descripcion || "Sin descripción"}</p>
      </div>

      <div className="routine-meta">
        <span>{rutina.actividad?.nombre || "Sin actividad"}</span>
      </div>

      <Link
        className="primary-btn compact"
        to={`/dashboardCliente/rutinas/${rutina._id}`}
        state={{ rutina }}
      >
        Ver Rutina
      </Link>
    </article>
  )
}

export default Rutina
