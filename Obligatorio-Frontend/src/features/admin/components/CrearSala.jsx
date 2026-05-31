import { useRef } from "react"
import "../styles/CrearSala.css"
import { crearSala } from "../../salasSlice"
import { useDispatch } from "react-redux"

export const CrearSala = () => {

 const dispatch = useDispatch()
 const nombreRef = useRef()
 const capacidadRef = useRef()

 const handleOnClickCrearSala = () => {
    const nuevaSala = {
        nombre: nombreRef.current.value,
        capacidadMax: capacidadRef.current.value
    }
    dispatch(crearSala(nuevaSala))
 }

  return (

      <article className="panel crear-sala">
        <div className="panel-header">
          <h2>Nueva sala</h2>
        </div>
        <form className="stack-form" data-api="POST /v1/salas">
          <input ref={nombreRef} name="nombre" type="text" placeholder="Sala principal" />
          <input ref={capacidadRef} name="capacidadMax" type="number" placeholder="40" />
          <button onClick={handleOnClickCrearSala} className="secondary-btn" type="submit">Crear sala</button>
        </form>
      </article>
  )
}
