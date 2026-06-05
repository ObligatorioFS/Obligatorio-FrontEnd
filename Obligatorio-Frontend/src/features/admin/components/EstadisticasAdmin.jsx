import { useSelector } from "react-redux";
import TarjetaEstadistica from "../../shared/components/TarjetaEstadistica";

const EstadisticasAdmin = () => {
  const clases = useSelector((state) => state.clases.clases);
  const salas = useSelector((state) => state.salas.salas);
  const actividades = useSelector((state) => state.actividades.actividades);
  const rutinas = useSelector((state) => state.rutinas.rutinas);
 
  //Hay que hacer un endopint para estadisticas, sino muestra solo lo que tenemos en react
  //Y no lo que esta en la base de datos, que es lo que realmente queremos mostrar
  const cuposOcupados = clases.reduce((total, clase) => {
    return total + (clase.inscriptos?.length || 0);
  }, 0);

  const cuposDisponibles = clases.reduce((total, clase) => {
    return total + (clase.capacidadMax - (clase.inscriptos?.length || 0));
  }, 0);

  const rutinasPendientes = rutinas.filter(rutina => {
  return rutina.ejercicios.length === 0
}).length

  const actividadesConClases = actividades.filter(actividad => {
  return clases.some(clase => {
    return clase.actividad?._id === actividad._id ||
           clase.actividad?.nombre === actividad.nombre ||
           clase.actividad === actividad.nombre
  })
  }).length

  return (
    <section className="stats-grid">
      <TarjetaEstadistica tituloTarjeta="Clases activas"
        valorTarjeta={clases.length}
        detalleTarjeta={`${cuposOcupados} cupos ocupados`}
        color="stat-card--clases"
      />
      <TarjetaEstadistica
        tituloTarjeta="Actividades disponibles"
        valorTarjeta={actividades.length}
        detalleTarjeta= {`${actividadesConClases} con clases activas`}
        color="stat-card--actividades"
      />

      <TarjetaEstadistica
        tituloTarjeta="Salas disponibles"
        valorTarjeta={salas.length}
        detalleTarjeta= {`${cuposDisponibles} cupos disponibles`}
        color="stat-card--salas"
      />

      <TarjetaEstadistica
        tituloTarjeta="Rutinas pendientes"
        valorTarjeta={rutinasPendientes}
        detalleTarjeta="Sin ejercicios asignados"
        color="stat-card--rutinas"
      />
    </section>
  );
};

export default EstadisticasAdmin;
