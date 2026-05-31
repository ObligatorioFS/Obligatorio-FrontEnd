import '../styles/Banner.css'

const Banner = () => {
  const rol = localStorage.getItem('rolUsu')
  const esAdmin = rol === 'admin'

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">
          {esAdmin ? 'Administrador' : 'Hola, jugador'}
        </p>
        <h1>
          {esAdmin ? 'Gestion del club' : 'Tu actividad en el club'}
        </h1>
        {!esAdmin && (
          <p>Revisa tus clases, solicita rutinas y administra tu plan.</p>
        )}
      </div>

      <button className="primary-btn compact" type="button">
        {esAdmin ? 'Gestionar cupos' : 'Cambiar a Plan Premium'}
      </button>
    </header>
  )
}

export default Banner
