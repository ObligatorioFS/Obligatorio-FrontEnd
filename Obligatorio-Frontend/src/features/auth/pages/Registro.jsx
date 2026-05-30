import '../styles/Auth.css'
import { Link } from 'react-router'

const Registro = () => {





  
  return (
  <main className="auth-layout">
    {/* =========================
      FORMULARIO REGISTRO
    ========================== */}
    <section className="auth-card register-card">
      <form className="auth-form" data-api="POST /v1/registrar">
        <div className="brand register-brand">
          <span>CA</span>
          <div>
            <strong>Club Activo</strong>
            <small>Registro de jugador</small>
          </div>
        </div>

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
        <Link className="secondary-btn" to="/login">Volver al login</Link>
      </div>
    </section>
  </main>
    )
}

export default Registro
