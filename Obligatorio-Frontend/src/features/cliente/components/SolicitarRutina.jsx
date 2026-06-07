

const SolicitarRutina = () => {
  return (
        <section className="panel">
          <div className="panel-header">
            <h2>Solicitar rutina</h2>
          </div>

          <form className="routine-form" data-api="POST /v1/rutinas">
            <label>
              Actividad
              <select name="actividad" required>
                <option value="">Seleccionar actividad</option>
                <option value="actividad-funcional-id">Funcional</option>
                <option value="actividad-natacion-id">Natacion</option>
                <option value="actividad-running-id">Running</option>
                <option value="actividad-yoga-id">Yoga</option>
              </select>
            </label>
            <label>
              Objetivo
              <textarea name="objetivo" placeholder="Ganar resistencia, bajar peso, fuerza..."></textarea>
            </label>
            <button className="secondary-btn" type="submit">Solicitar</button>
          </form>
        </section>
  )
}

export default SolicitarRutina