import "../styles/CrearClase.css"

const CrearClase = () => {
  return (
      <article className="panel crear-clase">
        <div className="panel-header">
          <div>
            <h2>Crear clase</h2>
            <p>Formulario alineado con POST /v1/clases.</p>
          </div>
        </div>

        <form className="form-grid" data-api="POST /v1/clases">
          <label>
            Descripcion
            <input name="descripcion" type="text" placeholder="Funcional para adultos" />
          </label>
          <label>
            Dia
            <select name="dia">
              <option>lunes</option>
              <option>martes</option>
              <option>miercoles</option>
              <option>jueves</option>
              <option>viernes</option>
              <option>sabado</option>
            </select>
          </label>
          <label>
            Hora
            <input name="hora" type="time" defaultValue="18:00" />
          </label>
          <label>
            Capacidad
            <input name="capacidadMax" type="number" min="1" placeholder="20" />
          </label>
          <label>
            Actividad
            <select name="actividad" required>
              <option value="">Seleccionar actividad</option>
              <option value="actividad-funcional-id">Funcional</option>
              <option value="actividad-natacion-id">Natacion</option>
              <option value="actividad-yoga-id">Yoga</option>
            </select>
          </label>
          <label>
            Sala
            <select name="sala" required>
              <option value="">Seleccionar sala</option>
              <option value="sala-norte-id">Sala norte</option>
              <option value="sala-piscina-id">Piscina</option>
              <option value="sala-calma-id">Sala calma</option>
            </select>
          </label>
          <button className="primary-btn" type="submit">Guardar clase</button>
        </form>
      </article>
  )
}

export default CrearClase
