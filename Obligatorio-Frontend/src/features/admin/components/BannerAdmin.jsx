import '../../shared/styles/Banner.css'

const Banner = () => {
  const nombre = localStorage.getItem('nombreUsu') || 'Jugador'

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Administrador {nombre}</p>
        <h1>Gestion del club</h1>
      </div>

      <a className="primary-btn compact" href="#clases-registradas">
        Gestionar cupos
      </a>
    </header>
  )
}

export default Banner
