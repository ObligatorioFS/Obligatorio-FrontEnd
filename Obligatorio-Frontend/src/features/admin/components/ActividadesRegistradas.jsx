
const ActividadesRegistradas = () => {
  return (

      <article className="panel quick-panel actividades-registradas">
        <div className="panel-header">
          <h2>Actividades</h2>
        </div>

        <div className="quick-list">
          <div className="quick-item">
            <div>
              <strong>Funcional</strong>
              <span>6 clases activas</span>
            </div>
            <button className="table-btn" type="button">Editar</button>
          </div>
          <div className="quick-item">
            <div>
              <strong>Natacion</strong>
              <span>3 clases activas</span>
            </div>
            <button className="table-btn" type="button">Editar</button>
          </div>
          <div className="quick-item">
            <div>
              <strong>Yoga</strong>
              <span>2 clases activas</span>
            </div>
            <button className="table-btn" type="button">Editar</button>
          </div>
        </div>
      </article>
  )
}

export default ActividadesRegistradas
