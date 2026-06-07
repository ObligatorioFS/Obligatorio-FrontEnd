import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { obtenerEstadisticasCliente } from "../../../config/utils/estadisticasClienteUtils";
import TarjetaEstadistica from "../../shared/components/TarjetaEstadistica";
import "../styles/EstadisticasCliente.css";

const EstadisticasCliente = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const estadisticas = useSelector((state) => state.estadisticas.cliente);
  const cargando = useSelector((state) => state.estadisticas.cargando);

  useEffect(() => {
    obtenerEstadisticasCliente(dispatch, navigate);
  }, []);

  const spinner = <span className="spinner" aria-label="Cargando"></span>;
  const planActual = estadisticas.plan || "Sin datos";
  const esPremium = estadisticas.plan === "premium";
  const clasesInscriptas = estadisticas.clasesInscriptas ?? 0;
  const limitePlus = 4;

  const proximaClase = estadisticas.proximaClase
  ? `${estadisticas.proximaClase.dia} ${estadisticas.proximaClase.hora}`
    : "Sin clases";

  const detalleProximaClase = estadisticas.proximaClase
    ? `${estadisticas.proximaClase.actividad} - ${estadisticas.proximaClase.sala}`
    : "Todavia no estas inscripto";

  return (
    <section className="stats-grid cliente-stats">
      <TarjetaEstadistica
        tituloTarjeta="Cupos disponibles"
        valorTarjeta={
          cargando
            ? spinner
            : esPremium
              ? "\u221e"
              : (estadisticas.cuposRestantes ?? 0)
        }
        detalleTarjeta={
          cargando
            ? "Cargando..."
            : esPremium
              ? "Cupos ilimitados"
              : `${estadisticas.porcentajePlanUsado ?? 0}% del plan usado`
        }
        color="stat-card--cliente"
      />
      <TarjetaEstadistica
        tituloTarjeta="Proxima clase"
        valorTarjeta={cargando ? spinner : proximaClase}
        detalleTarjeta={cargando ? "Cargando..." : detalleProximaClase}
        color="stat-card--cliente"
      />
      <TarjetaEstadistica
        tituloTarjeta="Rutinas asignadas"
        valorTarjeta={cargando ? spinner : (estadisticas.rutinasAsignadas ?? 0)}
        detalleTarjeta={
          cargando
            ? "Cargando..."
            : `${estadisticas.rutinasPendientes ?? 0} pendientes`
        }
        color="stat-card--cliente"
      />
      <TarjetaEstadistica
        tituloTarjeta="Plan actual"
        valorTarjeta={cargando ? spinner : planActual}
        detalleTarjeta={
          cargando
            ? "Cargando..."
            : esPremium
              ? `${clasesInscriptas}/\u221e clases inscriptas`
              : `${clasesInscriptas}/${limitePlus} clases inscriptas`
        }
        color="stat-card--cliente"
      />
    </section>
  );
};

export default EstadisticasCliente;
