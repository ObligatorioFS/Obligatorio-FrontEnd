import { useDispatch } from "react-redux"
import MensajeAlerta from "../../shared/components/MensajeAlerta"
import { useEffect, useRef, useState } from "react"
import { actualizarActividad, eliminarActividad } from "../../actividadesSlice"
import { useNavigate } from "react-router"

const Actividad = ({actividad}) => {

  const dispatch = useDispatch()
  const [editando, setEditando] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")
  const [cargando, setCargando] = useState(false)
  const inputNombreRef = useRef()
  const inputDescripcionRef = useRef()
  const navigate = useNavigate()


  useEffect(() => {
  if (!mensaje && !mensajeExito) return
  const timeoutId = setTimeout(() => {
    setMensaje("")
    setMensajeExito("")
  }, 3000)
  return () => clearTimeout(timeoutId)
  }, [mensaje, mensajeExito])

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

    fetch(`https://obligatorio-full-stack-ecru.vercel.app/v1/actividades/${actividad._id}`, {
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
        setMensaje("")
        setMensajeExito("Actividad modificada correctamente")
        setEditando(false)
      })
      .catch(error => {
        setMensaje(error.message)
      }).finally(() => setCargando(false))
  }

  const handleOnClickEliminar = () => {
    fetch(`https://obligatorio-full-stack-ecru.vercel.app/v1/actividades/${actividad._id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    })
      .then(async res => {
        if (res.ok) {
          dispatch(eliminarActividad(actividad._id))
          setMensaje("")
          setMensajeExito("Actividad borrada correctamente")
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
      })
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
        <button onClick={handleOnClickEliminar} className="table-btn icon-btn delete-btn" aria-label="Eliminar actividad">Eliminar</button>
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
