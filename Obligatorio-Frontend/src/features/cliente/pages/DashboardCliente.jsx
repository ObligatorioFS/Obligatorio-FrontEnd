import '../styles/DashboardCliente.css'

const DashboardCliente = () => {
  return (
    <div className="dashboard theme-client">
      {/* =========================
        HEADER SUPERIOR
      ========================== */}
      <header className="dashboard-header">
        <div className="brand-mark">
          <span>CA</span>
          <div>
            <strong>Club Activo</strong>
            <small>Jugador</small>
          </div>
        </div>

        <button className="logout-btn" type="button">Cerrar sesion</button>
      </header>

      <main className="main-content">
        {/* =========================
          BANNER PRINCIPAL
        ========================== */}
        <header className="topbar">
          <div>
            <p className="eyebrow">Hola, jugador</p>
            <h1>Tu actividad en el club</h1>
            <p>Revisa tus clases, solicita rutinas y administra tu plan.</p>
          </div>
          <button className="primary-btn compact" type="button">Cambiar a plan plus</button>
        </header>

        {/* =========================
          ESTADISTICAS
        ========================== */}
        <section className="stats-grid">
          <article className="stat-card">
            <span>Clases inscriptas</span>
            <strong>3</strong>
            <small>Esta semana</small>
          </article>
          <article className="stat-card">
            <span>Rutinas</span>
            <strong>2</strong>
            <small>Objetivos activos</small>
          </article>
          <article className="stat-card">
            <span>Plan</span>
            <strong>Plus</strong>
            <small>Beneficios disponibles</small>
          </article>
          <article className="stat-card">
            <span>Proxima clase</span>
            <strong>18:00</strong>
            <small>Funcional, lunes</small>
          </article>
        </section>

        {/* =========================
          CLASES DISPONIBLES
        ========================== */}
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Clases disponibles</h2>
              <p>GET /v1/clases e inscripcion con PUT /v1/clases/:idClase/inscribir-usuario.</p>
            </div>
            <select>
              <option>Todos los dias</option>
              <option>lunes</option>
              <option>martes</option>
              <option>miercoles</option>
              <option>jueves</option>
              <option>viernes</option>
            </select>
          </div>

          {/* =========================
            CALENDARIO SEMANAL
          ========================== */}
          <div className="schedule-board">
            <div className="schedule-grid">
              {/* =========================
                LUNES
              ========================== */}
              <section className="day-column">
                <div className="day-header">
                  <strong>Lunes</strong>
                  <span>4 clases</span>
                </div>

                <article className="schedule-card">
                  <span className="class-time">18:00</span>
                  <strong>Funcional total</strong>
                  <p>Fuerza y resistencia.</p>
                  <div className="class-meta">
                    <span>Sala norte</span>
                    <span>14 / 20 cupos</span>
                  </div>
                  <button className="primary-btn compact" type="button">Inscribirme</button>
                </article>

                <article className="schedule-card">
                  <span className="class-time">20:00</span>
                  <strong>Running indoor</strong>
                  <p>Cardio progresivo.</p>
                  <div className="class-meta">
                    <span>Sala cardio</span>
                    <span>9 / 15 cupos</span>
                  </div>
                  <button className="primary-btn compact" type="button">Inscribirme</button>
                </article>

                <article className="schedule-card">
                  <span className="class-time">21:00</span>
                  <strong>Box funcional</strong>
                  <p>Circuito intenso.</p>
                  <div className="class-meta">
                    <span>Sala fuerza</span>
                    <span>10 / 14 cupos</span>
                  </div>
                  <button className="primary-btn compact" type="button">Inscribirme</button>
                </article>

                <article className="schedule-card">
                  <span className="class-time">21:45</span>
                  <strong>Stretching</strong>
                  <p>Vuelta a la calma.</p>
                  <div className="class-meta">
                    <span>Sala calma</span>
                    <span>7 / 16 cupos</span>
                  </div>
                  <button className="primary-btn compact" type="button">Inscribirme</button>
                </article>
              </section>

              {/* =========================
                MARTES
              ========================== */}
              <section className="day-column">
                <div className="day-header">
                  <strong>Martes</strong>
                  <span>1 clase</span>
                </div>

                <article className="schedule-card">
                  <span className="class-time">19:00</span>
                  <strong>Futbol mixto</strong>
                  <p>Entrenamiento tecnico.</p>
                  <div className="class-meta">
                    <span>Cancha 1</span>
                    <span>12 / 18 cupos</span>
                  </div>
                  <button className="primary-btn compact" type="button">Inscribirme</button>
                </article>
              </section>

              {/* =========================
                MIERCOLES
              ========================== */}
              <section className="day-column">
                <div className="day-header">
                  <strong>Miercoles</strong>
                  <span>1 clase</span>
                </div>

                <article className="schedule-card">
                  <span className="class-time">20:00</span>
                  <strong>Natacion inicial</strong>
                  <p>Tecnica y respiracion.</p>
                  <div className="class-meta">
                    <span>Piscina</span>
                    <span>8 / 12 cupos</span>
                  </div>
                  <button className="primary-btn compact" type="button">Inscribirme</button>
                </article>
              </section>

              {/* =========================
                JUEVES
              ========================== */}
              <section className="day-column empty">
                <div className="day-header">
                  <strong>Jueves</strong>
                  <span>Sin clases</span>
                </div>
                <p>No hay horarios publicados.</p>
              </section>

              {/* =========================
                VIERNES
              ========================== */}
              <section className="day-column">
                <div className="day-header">
                  <strong>Viernes</strong>
                  <span>1 clase</span>
                </div>

                <article className="schedule-card">
                  <span className="class-time">09:00</span>
                  <strong>Yoga movilidad</strong>
                  <p>Movilidad y elongacion.</p>
                  <div className="class-meta">
                    <span>Sala calma</span>
                    <span>11 / 16 cupos</span>
                  </div>
                  <button className="primary-btn compact" type="button">Inscribirme</button>
                </article>
              </section>

              {/* =========================
                SABADO
              ========================== */}
              <section className="day-column">
                <div className="day-header">
                  <strong>Sabado</strong>
                  <span>1 clase</span>
                </div>

                <article className="schedule-card">
                  <span className="class-time">10:30</span>
                  <strong>Funcional express</strong>
                  <p>Circuito de cuerpo completo.</p>
                  <div className="class-meta">
                    <span>Sala norte</span>
                    <span>6 / 20 cupos</span>
                  </div>
                  <button className="primary-btn compact" type="button">Inscribirme</button>
                </article>
              </section>
            </div>
          </div>
        </section>

        {/* =========================
          SOLICITAR RUTINA
        ========================== */}
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

        {/* =========================
          MIS RUTINAS
        ========================== */}
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
      </main>
    </div>
  )
}

export default DashboardCliente
