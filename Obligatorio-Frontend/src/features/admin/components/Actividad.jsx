import { useDispatch } from "react-redux"
import MensajeAlerta from "../../shared/components/MensajeAlerta"
import { useRef, useState } from "react"
import { actualizarActividad, eliminarActividad } from "../../actividadesSlice"
import { useNavigate } from "react-router"
import { BASE_URL } from "../../../config/api"
import { obtenerEstadisticasAdmin } from "../../../config/utils/estadisticasAdminUtils"
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal"

const Actividad = ({actividad, setMensajeExitoPadre}) => {

  const dispatch = useDispatch()
  const [editando, setEditando] = useState(false)
  const { mensaje, setMensaje, mensajeExito, setMensajeExito } = useMensajeTemporal() //evitar repetir useEffect para el mensaje
  const [cargando, setCargando] = useState(false)
  const [eliminando, setEliminando] = useState(false)
  const inputNombreRef = useRef()
  const inputDescripcionRef = useRef()
  const navigate = useNavigate()

  const handleOnClickEditar = () => {
        setMensaje("")
        setEditando(true)
  }

  const handleOnClickGuardarEdicion = () => {
    const nombre = inputNombreRef.current.value
    const descripcion = inputDescripcionRef.current.value

    if (!nombre || !descripcion) {
      setMensaje("Todos los campos son obligatorios")
      return
    }
    setCargando(true)

    fetch(`${BASE_URL}/actividades/${actividad._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ nombre, descripcion })
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
        throw new Error(error.message || 'No se pudo modificar la sala')
      })
      .then(() => {
        dispatch(actualizarActividad({
          id: actividad._id,
          modificado: { nombre, descripcion }
        }))
        obtenerEstadisticasAdmin(dispatch, navigate);
        setMensaje("")
        setMensajeExito("Actividad modificada correctamente")
        setEditando(false)
      })
      .catch(error => {
        setMensaje(error.message)
      }).finally(() => setCargando(false))
  }

  const handleOnClickEliminar = () => {
    setEliminando(true)
    fetch(`${BASE_URL}/actividades/${actividad._id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    })
      .then(async res => {
        if (res.ok) {
          dispatch(eliminarActividad(actividad._id))
          obtenerEstadisticasAdmin(dispatch, navigate);
          setMensaje("")
          setMensajeExitoPadre("Actividad borrada correctamente")
          return
        }
        else if (res.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
        }
        const error = await res.json()
        throw new Error(error.message || 'No se pudo borrar la actividad')
      })
      .catch(error => {
        setMensaje(error.message)
      }).finally(() => setEliminando(false))
  }

  if (!editando) {
    return (
      <div className="quick-item">
        <div>
          <strong>{actividad.nombre}</strong>
        </div>

        <button onClick={handleOnClickEditar} className="table-btn icon-btn edit-btn" aria-label="Editar actividad">
          Editar
        </button>
        <button onClick={handleOnClickEliminar} className="table-btn icon-btn delete-btn" aria-label="Eliminar actividad" disabled={eliminando}>
          {eliminando ? "Eliminando..." : "Eliminar"}
        </button>
        <MensajeAlerta mensaje={mensaje} flotante />
        <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
      </div>
    )
  } else {
    return (
      <div className="quick-item">
        <div>
          <input ref={inputNombreRef} defaultValue={actividad.nombre} />
          <textarea ref={inputDescripcionRef} defaultValue={actividad.descripcion} />
          <MensajeAlerta mensaje={mensaje} />
        </div>
        <button onClick={handleOnClickGuardarEdicion} className="table-btn save-btn" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar"}
        </button>
      </div>
    )
  }
}

export default Actividad
