import { Link } from "react-router";
import "../styles/Clase.css";

const Clase = ({ clase }) => {
  const inscriptos = clase.inscriptos?.length || 0;

  return (
    <article className="available-class-card">
      <div className="available-class-card__top">
        <span className="class-time">{clase.hora}</span>
        <small>{clase.dia}</small>
      </div>

      <div>
        <h3>{clase.actividad?.nombre || "Sin actividad"}</h3>
        <p>{clase.actividad?.descripcion || "Sin descripcion"}</p>
      </div>

      <div className="class-meta">
        <span>{clase.sala?.nombre || "Sin sala"}</span>
        <span>
          {inscriptos} / {clase.capacidadMax} cupos
        </span>
      </div>

      <Link
        className="primary-btn compact"
        to={`/dashboardCliente/clases/${clase._id}`}
        state={{ clase }}
      >
        Ver detalle
      </Link>
    </article>
  );
};

export default Clase;
