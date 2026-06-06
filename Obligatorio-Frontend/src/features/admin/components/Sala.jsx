import { useDispatch } from "react-redux"
import MensajeAlerta from "../../shared/components/MensajeAlerta"
import { useEffect, useRef, useState } from "react"
import { actualizarSala } from "../../salasSlice"
import { BASE_URL } from "../../../config/api"


const Sala = ({ sala }) => {

  const dispatch = useDispatch()
  const [editando, setEditando] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")
   const [cargando, setCargando] = useState(false)
  const inputNombreRef = useRef()
  const inputCapacidadMaxRef = useRef()

  useEffect(() => {
    if (!mensajeExito) return

    const timeoutId = setTimeout(() => setMensajeExito(""), 3000)

    return () => clearTimeout(timeoutId)
  }, [mensajeExito])

  const handleOnClickEditar = () => {
        setMensaje("")
        setEditando(true)
    }

  const handleOnClickGuardarEdicion = () => {
  const nombre = inputNombreRef.current.value
  const capacidadMax = inputCapacidadMaxRef.current.value

  if (!nombre || !capacidadMax) {
    setMensaje("Nombre y capacidad obligatorios")
    return
  }
  setCargando(true)

  fetch(`${BASE_URL}/salas/${sala._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({nombre, capacidadMax
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      if (res.status === 401) {
        throw new Error("Sesion vencida")
      }
      throw new Error("No se pudo modificar la sala")
    })
    .then(() => {
      dispatch(actualizarSala({
        id: sala._id,
        modificado: { nombre, capacidadMax }
      }))

      setMensaje("")
      setMensajeExito("Sala modificada correctamente")
      setEditando(false)
    })
    .catch(error => {
      setMensaje(error.message)
    }).finally(() => setCargando(false))
}

if (!editando) {
  return (
    <div className="quick-item">
      <div>
        <strong>{sala.nombre}</strong>
        <span>{sala.capacidadMax} cupos</span>
      </div>

      <button onClick={handleOnClickEditar} className="table-btn icon-btn edit-btn" aria-label="Editar sala">
        Editar
      </button>
      <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
    </div>
  )
} else {
  return (
    <div className="quick-item">
      <div>
        <input ref={inputNombreRef} defaultValue={sala.nombre} />
        <input
          ref={inputCapacidadMaxRef}
          type="number"
          defaultValue={sala.capacidadMax}
        />
        <MensajeAlerta mensaje={mensaje} />
      </div>
      <button onClick={handleOnClickGuardarEdicion} className="table-btn save-btn" disabled={cargando} >
        {cargando ? "Guardando..." : "Guardar"}
      </button>
    </div>
  )
}
}

export default Sala
