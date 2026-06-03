import { useDispatch } from "react-redux"
import MensajeAlerta from "../../shared/components/MensajeAlerta"
import { useEffect, useRef, useState } from "react"
import { actualizarActividad, eliminarActividad } from "../../actividadesSlice"

const Actividad = ({actividad}) => {

  const dispatch = useDispatch()
  const [editando, setEditando] = useState(false)
  const [mensaje, setMensaje] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")
  const inputNombreRef = useRef()


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

    if (!nombre) {
      setMensaje("Nombre es obligatorio")
      return
    }

    fetch(`https://obligatorio-full-stack-ecru.vercel.app/v1/actividades/${actividad._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({ nombre })
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
        dispatch(actualizarActividad({
          id: actividad._id,
          modificado: { nombre }
        }))

        setMensaje("")
        setMensajeExito("Actividad modificada correctamente")
        setEditando(false)
      })
      .catch(error => {
        setMensaje(error.message)
      })
  }

  const handleOnClickEliminar = () => {
    fetch(`https://obligatorio-full-stack-ecru.vercel.app/v1/actividades/${actividad._id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem('token'),
      }
    })
      .then(res => {
        if (res.ok) {
          dispatch(eliminarActividad(actividad._id))
          setMensaje("")
          setMensajeExito("Actividad borrada correctamente")
          return
        }
        if (res.status === 401) {
          throw new Error("Sesion vencida")
        }
        throw new Error("No se pudo borrar la actividad")
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

        <button onClick={handleOnClickEditar} className="table-btn">
          Editar
        </button>
        <button onClick={handleOnClickEliminar} className="table-btn">Eliminar</button>
        <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
      </div>
    )
  } else {
    return (
      <div className="quick-item">
        <div>
          <input ref={inputNombreRef} defaultValue={actividad.nombre} />
          <MensajeAlerta mensaje={mensaje} />
        </div>
        <button onClick={handleOnClickGuardarEdicion} className="table-btn">Guardar</button>
        <button onClick={handleOnClickEliminar} className="table-btn">Eliminar</button>
      </div>
    )
  }
}

export default Actividad