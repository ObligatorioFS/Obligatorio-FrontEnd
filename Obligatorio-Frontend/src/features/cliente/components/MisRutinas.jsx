

const MisRutinas = () => {
  return (
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Mis rutinas</h2>
              <p>Vista pensada para GET /v1/rutinas/rutinas-usuario.</p>
            </div>
          </div>

          <div className="routine-grid">
            <article className="routine-card">
              <strong>Fuerza general</strong>
              <span>Actividad: funcional</span>
              <ul>
                <li>3x15 sentadillas</li>
                <li>3x10 flexiones</li>
                <li>4x30 segundos plancha</li>
              </ul>
            </article>

            <article className="routine-card">
              <strong>Resistencia</strong>
              <span>Actividad: running</span>
              <ul>
                <li>10 minutos trote suave</li>
                <li>6 series de 400m</li>
                <li>Estiramiento final</li>
              </ul>
            </article>
          </div>
        </section>
  )
}

export default MisRutinas