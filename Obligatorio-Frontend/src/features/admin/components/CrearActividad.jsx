
import "../styles/CrearActividad.css"

const CrearActividad = () => {
  return (

      <article className="panel crear-actividad">
        <div className="panel-header">
          <h2>Nueva actividad</h2>
        </div>
        <form className="stack-form" data-api="POST /v1/actividades">
          <input name="nombre" type="text" placeholder="Nombre" />
          <textarea name="descripcion" placeholder="Descripcion"></textarea>
          <button className="secondary-btn" type="submit">Crear actividad</button>
        </form>
      </article>
  )
}

export default CrearActividad
