import { useDispatch } from "react-redux"
import MensajeAlerta from "../../shared/components/MensajeAlerta"
import { useEffect, useRef, useState } from "react"
import { actualizarActividad, eliminarActividad } from "../../actividadesSlice"
import { useNavigate } from "react-router"
import { BASE_URL } from "../../../config/api"

const Rutina = ({ rutina }) => {

  const dispatch = useDispatch()
  const [editando, setEditando] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")
  const [cargando, setCargando] = useState(false)
  const navigate = useNavigate()
  const inputEjercicioRef = useRef()

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
    const ejercicios = inputEjercicioRef.current.value

    if (!ejercicios) {
      setMensaje("El campo ejercicio es obligatorio")
      return
    }
    setCargando(true)

    fetch(`${BASE_URL}/rutinas/${rutina._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ ejercicios })
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
        dispatch(actualizarRutina({
          id: rutina._id,
          modificado: { ejercicios }
        }))
        setMensaje("")
        setMensajeExito("Rutina modificada correctamente")
        setEditando(false)
      })
      .catch(error => {
        setMensaje(error.message)
      }).finally(() => setCargando(false))
  }

  }

  const handleOnClickGuardarEdicion = () => {
    setCargando(true)
  }

  if (!editando) {
    return (
      <div className="quick-item">
        <h2>
          {rutina.objetivo}
        </h2>
        <p>
          <strong>Actividad:</strong> {rutina.actividad.nombre}
        </p>
        <p >
          <strong>Para:</strong> {rutina.usuario.email}
        </p>
        <button onClick={handleOnClickEditar} className="table-btn icon-btn edit-btn" aria-label="Editar actividad">
          Editar
        </button>
        <MensajeAlerta mensaje={mensaje} flotante />
        <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
      </div>
    )
  } else {
    return (
      <div className="quick-item">
        <div>
          <h2>{rutina.objetivo}</h2>
          <p>
            <strong>Actividad:</strong> {rutina.actividad.nombre}
          </p>
          <p>
            <strong>Para:</strong> {rutina.usuario.email}
          </p>
        </div>
        <div>
          <label>
            <strong>Ejercicios:</strong>
          </label>
          <input type="text" placeholder="Ingrese la rutina" />
          <MensajeAlerta mensaje={mensaje} />
        </div>
        <button onClick={handleOnClickAgregarEjercicio} className="table-btn save-btn" disabled={cargando}>
          {cargando ? "Agregando ejercicio..." : "Agrregar ejercicios"}
        </button>
        <button onClick={handleOnClickGuardarEdicion} className="table-btn save-btn" disabled={cargando}>
          {cargando ? "Guardando..." : "Guardar"}
        </button>
      </div>
    )
  }
}