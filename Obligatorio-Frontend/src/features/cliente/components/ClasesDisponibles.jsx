import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { obtenerClases } from "../../../config/utils/clasesUtils";
import Paginate from "../../admin/components/Paginate";
import Clase from "./Clase";
import "../styles/ClasesDisponibles.css";

const ClasesDisponibles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [diaFiltro, setDiaFiltro] = useState("");
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  const clases = useSelector((state) => state.clases.clases);
  const cargando = useSelector((state) => state.clases.cargando);

  const fetchClases = (page = 1, dia = diaFiltro) => {
    obtenerClases({
      dispatch,
      navigate,
      page,
      dia,
    });
  };

  useEffect(() => {
    fetchClases();
  }, []);

  const handleOnClickFiltrarDia = (dia) => {
    setDiaFiltro(dia);
    fetchClases(1, dia);
  };

  return (
    <section className="panel clases-disponibles">
      <div className="panel-header">
        <div>
          <h2>Clases disponibles</h2>
          <p>Elegí un día y encontrá el horario que mejor se adapte a vos.</p>
        </div>
      </div>

      <div className="day-tabs">
        <button
          className={`day-tab ${diaFiltro === "" ? "active" : ""}`}
          type="button"
          onClick={() => handleOnClickFiltrarDia("")}
        >
          Todos
        </button>

        {dias.map((dia) => (
          <button
            key={dia}
            className={`day-tab ${diaFiltro === dia ? "active" : ""}`}
            type="button"
            onClick={() => handleOnClickFiltrarDia(dia)}
          >
            {dia}
          </button>
        ))}
      </div>

      <div className="available-classes-grid">
        {cargando ? (
          <div className="client-classes-loading">
            <span className="spinner" />
            <p>Cargando clases...</p>
          </div>
        ) : clases.length > 0 ? (
          clases.map((clase) => <Clase key={clase._id} clase={clase} />)
        ) : (
          <p className="client-classes-empty">No hay clases disponibles</p>
        )}
      </div>

      <Paginate fnFetchClases={fetchClases} />
    </section>
  );
};

export default ClasesDisponibles;
