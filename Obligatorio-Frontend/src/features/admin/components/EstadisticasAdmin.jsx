import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import TarjetaEstadistica from "../../shared/components/TarjetaEstadistica";
import { obtenerEstadisticasAdmin } from "../../../config/utils/estadisticasUtils";

const EstadisticasAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const estadisticas = useSelector((state) => state.estadisticas.estadisticas);
  const cargando = useSelector(state => state.estadisticas.cargando)

  useEffect(() => {
    obtenerEstadisticasAdmin(dispatch, navigate);
  }, []);

  const actividadMasPopular = estadisticas.actividadMasPopular?.nombre || "Sin datos";
  const ocupacionPromedio = estadisticas.ocupacionPromedio ?? 0;
  const spinner = <span className="spinner" aria-label="Cargando estadisticas" />;

  return (
    <section className="stats-grid">
      <TarjetaEstadistica tituloTarjeta="Clases activas"
        valorTarjeta={cargando ? spinner : estadisticas.clasesActivas ?? 0}
        detalleTarjeta={cargando ? "Cargando..." : `${estadisticas.cuposOcupados ?? 0} cupos ocupados`}
        color="stat-card--clases"
      />
      <TarjetaEstadistica
        tituloTarjeta="Actividades disponibles"
        valorTarjeta={cargando ? spinner : estadisticas.actividadesDisponibles ?? 0}
        detalleTarjeta={cargando ? "Cargando..." : `Mas popular: ${actividadMasPopular}`}
        color="stat-card--actividades"
      />

      <TarjetaEstadistica
        tituloTarjeta="Salas disponibles"
        valorTarjeta={cargando ? spinner : estadisticas.salasDisponibles ?? 0}
        detalleTarjeta={cargando ? "Cargando..." : `Ocupacion promedio: ${ocupacionPromedio}%`}
        color="stat-card--salas"
      />

      <TarjetaEstadistica
        tituloTarjeta="Rutinas pendientes"
        valorTarjeta={cargando ? spinner : estadisticas.rutinasPendientes ?? 0}
        detalleTarjeta={cargando ? "Cargando..." : "Sin ejercicios asignados"}
        color="stat-card--rutinas"
      />
    </section>
  );
};

export default EstadisticasAdmin;
