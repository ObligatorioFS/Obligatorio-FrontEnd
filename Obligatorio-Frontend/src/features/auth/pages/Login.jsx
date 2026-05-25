import '../styles/Login.css'

const Login = () => {
  return(
  <main className="auth-layout">
    {/* =========================
      HERO / PRESENTACION
    ========================== */}
    <section className="auth-hero">
      {/* =========================
        MARCA
      ========================== */}
      <div className="brand">
        <span>CA</span>
        <div>
          <strong>Club Activo</strong>
          <small>Social y deportivo</small>
        </div>
      </div>

      {/* =========================
        TEXTO PRINCIPAL
      ========================== */}
      <div className="hero-copy">
        <p className="eyebrow">Sistema de gestion</p>
        <h1>Entrena, reserva y administra tu club desde un solo lugar.</h1>
        <p>
          Un acceso unico para jugadores y administradores, conectado con
          clases, actividades, salas, rutinas y planes.
        </p>
      </div>

      {/* =========================
        FEATURES
      ========================== */}
      <div className="feature-list">
        <article>
          <span>01</span>
          <strong>Clases y cupos</strong>
          <p>Consulta horarios, salas disponibles e inscripciones.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Rutinas</strong>
          <p>Solicita objetivos y revisa ejercicios personalizados.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Administracion</strong>
          <p>El sistema redirige segun el rol del usuario.</p>
        </article>
      </div>
    </section>

    {/* =========================
      FORMULARIO LOGIN
    ========================== */}
    <section className="auth-card login-card">
      <form className="login-form" data-api="POST /v1/login">
        <div>
          <h2>Iniciar sesion</h2>
          <p>
            Ingresa con tu email y contrasena. Si sos nuevo, registrate para acceder a todas las funciones del club. 
          </p>
        </div>

        <label>
          Email
          <input type="email" name="email" placeholder="usuario@club.com" required />
        </label>

        <label>
          Contrasena
          <input type="password" name="password" placeholder="Tu contrasena" required />
        </label>

        <button className="primary-btn" type="submit">Entrar</button>
      </form>

      {/* =========================
        LINK A REGISTRO
      ========================== */}
      <div className="register-link">
        <p>No tenes cuenta de jugador?</p>
        <a className="secondary-btn" href="registro.html">Registrarse aqui</a>
      </div>
    </section>
  </main>
  ) 

} 

export default Login
