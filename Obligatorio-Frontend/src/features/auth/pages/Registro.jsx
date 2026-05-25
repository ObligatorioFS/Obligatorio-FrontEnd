import '../styles/Login.css'

const Registro = () => {
  return (
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
          <small>Registro de jugador</small>
        </div>
      </div>

      {/* =========================
        TEXTO PRINCIPAL
      ========================== */}
      <div className="hero-copy">
        <p className="eyebrow">Nueva cuenta</p>
        <h1>Sumate al club y empeza a gestionar tus clases.</h1>
        <p>
          El registro crea una cuenta de jugador con rol cliente. Los
          administradores se gestionan desde el sistema interno del club.
        </p>
      </div>

      {/* =========================
        FEATURES
      ========================== */}
      <div className="feature-list">
        <article>
          <span>01</span>
          <strong>Cuenta jugador</strong>
          <p>Quedas listo para inscribirte a clases y pedir rutinas.</p>
        </article>
        <article>
          <span>02</span>
          <strong>Acceso inmediato</strong>
          <p>El backend devuelve un token despues del registro.</p>
        </article>
        <article>
          <span>03</span>
          <strong>Panel personal</strong>
          <p>Consulta clases, rutinas, plan e inscripciones.</p>
        </article>
      </div>
    </section>

    {/* =========================
      FORMULARIO REGISTRO
    ========================== */}
    <section className="auth-card register-card">
      <form className="login-form" data-api="POST /v1/registrar">
        <div>
          <h2>Crear cuenta</h2>
          <p>Completa tus datos para registrarte como jugador.</p>
        </div>

        <div className="register-grid">
          <label>
            Nombre
            <input type="text" name="nombre" placeholder="Nombre" required />
          </label>
          <label>
            Apellido
            <input type="text" name="apellido" placeholder="Apellido" required />
          </label>
        </div>

        <label>
          Email
          <input type="email" name="email" placeholder="jugador@club.com" required />
        </label>

        <label>
          Contrasena
          <input type="password" name="password" placeholder="Minimo 8 caracteres" required />
        </label>

        <button className="primary-btn" type="submit">Crear cuenta</button>
      </form>

      {/* =========================
        LINK A LOGIN
      ========================== */}
      <div className="register-link">
        <p>Ya tenes cuenta?</p>
        <a className="secondary-btn" href="login.html">Volver al login</a>
      </div>
    </section>
  </main>
    )
}

export default Registro
