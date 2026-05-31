
const RutinasPendientes = () => {
  return (

      <article className="panel quick-panel rutinas-pendientes">
        <div className="panel-header">
          <div>
            <h2>Rutinas pendientes</h2>
            <p>Solicitudes esperando ejercicios.</p>
          </div>
        </div>

        <div className="quick-list">
          <div className="quick-item">
            <div>
              <strong>Fuerza general</strong>
              <span>Jugador: Ana Perez</span>
            </div>
            <button className="secondary-btn compact" type="button">Agregar ejercicios</button>
          </div>
          <div className="quick-item">
            <div>
              <strong>Resistencia</strong>
              <span>Jugador: Juan Gomez</span>
            </div>
            <button className="secondary-btn compact" type="button">Agregar ejercicios</button>
          </div>
        </div>
      </article>
  )
}

export default RutinasPendientes
