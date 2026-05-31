import '../styles/Estadisticas.css'

const TarjetaEstadistica = ({ tituloTarjeta, valorTarjeta, detalleTarjeta, color }) => {
  return (
    <article className={`stat-card ${color ? color : 'stat-card--default'}`}>
      <span>{tituloTarjeta ? tituloTarjeta : 'Sin datos'}</span>
      <strong>{valorTarjeta || 'Sin datos'}</strong>
      <small>{detalleTarjeta ? detalleTarjeta : 'Sin datos'}</small>
    </article>
  )
}

export default TarjetaEstadistica
