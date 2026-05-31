import { useSelector } from 'react-redux'
import TarjetaEstadistica from '../../shared/components/TarjetaEstadistica'

const EstadisticasAdmin = () => {

  const clases = useSelector(state => state.clases.clases)


  return (
    <section className="stats-grid">
      <TarjetaEstadistica tituloTarjeta="Clases activas" valorTarjeta={clases.length} detalleTarjeta="6 dias disponibles" />
      <TarjetaEstadistica tituloTarjeta="Usuarios" valorTarjeta="124" detalleTarjeta="Usuarios registrados" />
      <TarjetaEstadistica tituloTarjeta="Actividades" valorTarjeta="9" detalleTarjeta="Fitness, futbol, natacion" />
      <TarjetaEstadistica tituloTarjeta="Rutinas pendientes" valorTarjeta="5" detalleTarjeta="Capacidad controlada" />
    </section>
  )
}

export default EstadisticasAdmin
