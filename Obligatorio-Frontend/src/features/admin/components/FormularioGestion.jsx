import CrearActividad from "./CrearActividad"
import CrearClase from "./CrearClase"
import { CrearSala } from "./CrearSala"
import "../styles/FormularioGestion.css"


const FormularioGestion = () => {
  return (
    <section className="content-grid">
     <CrearClase />
     <CrearActividad />
     <CrearSala />
    </section>

  )
}

export default FormularioGestion
