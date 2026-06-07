import { useDispatch } from "react-redux"
import '../styles/Rutina.css'
import MensajeAlerta from "../../shared/components/MensajeAlerta"
import { useEffect, useState } from "react"
import { actualizarActividad, eliminarActividad } from "../../actividadesSlice"
import { actualizarRutina, removeRutina } from "../../rutinasSlice"
import { useNavigate } from "react-router"
import { BASE_URL } from "../../../config/api"

const Rutina = ({ rutina }) => {

  const dispatch = useDispatch()
  const [editando, setEditando] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const [ejercicioInput, setEjercicioInput] = useState("")
  const [ejerciciosList, setEjerciciosList] = useState(rutina?.ejercicios || [])

  useEffect(() => {
  if (!mensaje && !mensajeExito) return
  const timeoutId = setTimeout(() => {
    setMensaje("")
    setMensajeExito("")
  }, 3000)
  return () => clearTimeout(timeoutId)
  }, [mensaje, mensajeExito])


  /* /rutinas/:id     PUT*/

  const handleOnClickEditar = () => {
    setMensaje("")
    setEditando(true)
  }

  const handleOnClickAgregarEjercicio = () => {
    if (!ejercicioInput.trim()) {
      setMensaje("El campo ejercicio es obligatorio")
      return
    }
    setEjerciciosList(prev => [...prev, ejercicioInput.trim()])
    setEjercicioInput("")
    setMensaje("")
  }

  const handleEliminarEjercicio = (index) => {
    setEjerciciosList(prev => prev.filter((_, i) => i !== index))
  }

  const handleOnClickGuardarEdicion = () => {
    if (!ejerciciosList || ejerciciosList.length === 0) {
      setMensaje("Debe agregar al menos un ejercicio")
      return
    }
    setCargando(true)

    fetch(`${BASE_URL}/rutinas/${rutina._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ ejercicios: ejerciciosList })
    })
      .then(async res => {
        if (res.ok) {
          return res.json()
        }
        if (res.status === 401) {
          localStorage.removeItem("token")
          navigate("/login")
          return
        }
        const error = await res.json()
        throw new Error(error.message || 'No se pudo modificar la rutina')
      })
      .then(() => {
        dispatch(actualizarRutina({
          id: rutina._id,
          modificado: { ejercicios: ejerciciosList }
        }))
        dispatch(removeRutina(rutina._id))
        setMensaje("")
        setMensajeExito("Rutina modificada correctamente")
        setEditando(false)
      })
      .catch(error => {
        setMensaje(error.message)
      }).finally(() => setCargando(false))
  }

  if (!editando) {
    return (
      <div className="quick-item rutina-card">
        <div className="rutina-header">
          <h2>Objetivo: {rutina.objetivo}</h2>
          <div className="rutina-meta rutina-summary-meta">
            <p><strong>Actividad:</strong> {rutina.actividad.nombre}</p>
            <p><strong>Para:</strong> {rutina.usuario.email}</p>
          </div>
        </div>
        <div className="rutina-summary-actions">
          <button onClick={handleOnClickEditar} className="table-btn icon-btn edit-btn" aria-label="Editar rutina" />
        </div>
        <MensajeAlerta mensaje={mensaje} flotante />
        <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
      </div>
    )
  } else {
    return (
      <div className="quick-item rutina-card">
        <div className="rutina-header">
          <h2>Objetivo: {rutina.objetivo}</h2>
          <div className="rutina-meta">
            <p><strong>Actividad:</strong> {rutina.actividad.nombre}</p>
            <p><strong>Para:</strong> {rutina.usuario.email}</p>
          </div>
        </div>
        <div className="rutina-section">
          <div className="rutina-section-header">
            <label>
              <strong>Ejercicios</strong>
            </label>
          </div>
          <div className="rutina-input-row">
            <input
              type="text"
              placeholder="Ingrese ejercicio"
              value={ejercicioInput}
              onChange={(e) => setEjercicioInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleOnClickAgregarEjercicio() }}
            />
            <button onClick={handleOnClickAgregarEjercicio} className="rutina-btn" disabled={cargando}>
              Agregar
            </button>
          </div>
          <MensajeAlerta mensaje={mensaje} />
          <ul className="rutina-list">
            {ejerciciosList && ejerciciosList.map((ej, idx) => (
              <li key={idx} className="rutina-list-item">
                <span>{ej}</span>
                <button onClick={() => handleEliminarEjercicio(idx)} className="delete-btn">Eliminar</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rutina-actions">
          <button onClick={handleOnClickGuardarEdicion} className="rutina-btn" disabled={cargando}>
            {cargando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    )
  }
}

export default Rutina