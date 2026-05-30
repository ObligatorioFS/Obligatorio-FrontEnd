import '../styles/DashboardAdmin.css'

const DashboardAdmin = () => {
     return (
    <div className="dashboard theme-admin">
  {/* =========================
    HEADER SUPERIOR
  ========================== */}
  <header className="dashboard-header">
    <div className="brand-mark">
      <span>CA</span>
      <div>
        <strong>Club Activo</strong>
        <small>Panel Admin</small>
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
        <p className="eyebrow">Administrador</p>
        <h1>Gestion del club</h1>
      </div>
      <button className="primary-btn compact" type="button">Gestionar cupos</button>
    </header>

    {/* =========================
      ESTADISTICAS
    ========================== */}
    <section className="stats-grid">
      <article className="stat-card">
        <span>Clases activas</span>
        <strong>18</strong>
        <small>6 dias disponibles</small>
      </article>
      <article className="stat-card">
        <span>Jugadores</span>
        <strong>124</strong>
        <small>Usuarios registrados</small>
      </article>
      <article className="stat-card">
        <span>Actividades</span>
        <strong>9</strong>
        <small>Fitness, futbol, natacion</small>
      </article>
      <article className="stat-card">
        <span>Salas</span>
        <strong>5</strong>
        <small>Capacidad controlada</small>
      </article>
    </section>

    {/* =========================
      FORMULARIOS DE GESTION
    ========================== */}
    <section className="content-grid">
      {/* =========================
        CREAR CLASE
      ========================== */}
      <article className="panel wide">
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

      {/* =========================
        CREAR ACTIVIDAD
      ========================== */}
      <article className="panel">
        <div className="panel-header">
          <h2>Nueva actividad</h2>
        </div>
        <form className="stack-form" data-api="POST /v1/actividades">
          <input name="nombre" type="text" placeholder="Nombre" />
          <textarea name="descripcion" placeholder="Descripcion"></textarea>
          <button className="secondary-btn" type="submit">Crear actividad</button>
        </form>
      </article>

      {/* =========================
        CREAR SALA
      ========================== */}
      <article className="panel">
        <div className="panel-header">
          <h2>Nueva sala</h2>
        </div>
        <form className="stack-form" data-api="POST /v1/salas">
          <input name="nombre" type="text" placeholder="Sala principal" />
          <input name="capacidadMax" type="number" placeholder="40" />
          <button className="secondary-btn" type="submit">Crear sala</button>
        </form>
      </article>
    </section>

    {/* =========================
      CLASES RECIENTES
    ========================== */}
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Clases recientes</h2>
          <p>Vista pensada para GET /v1/clases con filtros por dia y actividad.</p>
        </div>
        <div className="filters">
          <select>
            <option>Todos los dias</option>
            <option>lunes</option>
            <option>martes</option>
            <option>miercoles</option>
          </select>
          <button className="ghost-btn" type="button">Filtrar</button>
        </div>
      </div>

      {/* =========================
        TABLA DE CLASES
      ========================== */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Dia</th>
              <th>Hora</th>
              <th>Sala</th>
              <th>Cupos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Funcional</td>
              <td>Lunes</td>
              <td>18:00</td>
              <td>Sala norte</td>
              <td>14 / 20</td>
              <td><button className="table-btn">Editar</button></td>
            </tr>
            <tr>
              <td>Natacion</td>
              <td>Miercoles</td>
              <td>20:00</td>
              <td>Piscina</td>
              <td>8 / 12</td>
              <td><button className="table-btn danger">Eliminar</button></td>
            </tr>
            <tr>
              <td>Yoga</td>
              <td>Viernes</td>
              <td>09:00</td>
              <td>Sala calma</td>
              <td>11 / 16</td>
              <td><button className="table-btn">Editar</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    {/* =========================
      ADMINISTRACION RAPIDA
    ========================== */}
    <section className="quick-admin-grid">
      {/* =========================
        SALAS
      ========================== */}
      <article className="panel quick-panel">
        <div className="panel-header">
          <h2>Salas</h2>
        </div>

        <div className="quick-list">
          <div className="quick-item">
            <div>
              <strong>Sala norte</strong>
              <span>20 cupos</span>
            </div>
            <button className="table-btn" type="button">Editar</button>
          </div>
          <div className="quick-item">
            <div>
              <strong>Piscina</strong>
              <span>12 cupos</span>
            </div>
            <button className="table-btn" type="button">Editar</button>
          </div>
          <div className="quick-item">
            <div>
              <strong>Sala calma</strong>
              <span>16 cupos</span>
            </div>
            <button className="table-btn" type="button">Editar</button>
          </div>
        </div>
      </article>

      {/* =========================
        ACTIVIDADES
      ========================== */}
      <article className="panel quick-panel">
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

      {/* =========================
        RUTINAS PENDIENTES
      ========================== */}
      <article className="panel quick-panel">
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
    </section>
  </main>
    </div>
    )
            
}

export default DashboardAdmin
