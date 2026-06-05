import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setClases } from "../../clasesSlice";
import FilaClase from "./FilaClase";
import "../styles/ClasesRegistradas.css";

const ClasesRegistradas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [diaFiltro, setDiaFiltro] = useState("");
  const [actividadFiltro, setActividadFiltro] = useState("");
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  const obtenerClases = () => {
    const params = new URLSearchParams({
      page: "1",
      limit: "10",
    });

    if (diaFiltro) {
      params.append("dia", diaFiltro);
    }

    if (actividadFiltro) {
      params.append("idActividad", actividadFiltro);
    }

    fetch(
      `https://obligatorio-full-stack-ecru.vercel.app/v1/clases?${params.toString()}`,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      },
    )
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const error = await res.json();
        throw new Error(error.message || "Error al obtener las clases");
      })
      .then((data) => dispatch(setClases(data.clases)))
      .catch((error) => console.error(error.message));
  };

    useEffect(() => {
    obtenerClases();
  }, []);

  const handleOnClickFiltrar = () => {
    obtenerClases();
  };

  const clases = useSelector((state) => state.clases.clases);
  const actividades = useSelector((state) => state.actividades.actividades);

  return (
    <section id="clases-registradas" className="panel">
      <div className="panel-header">
        <div>
          <h2>Clases registradas</h2>
          <p>Gestiona las clases registradas en el sistema.</p>
        </div>
        <div className="filters">
          <select
            value={diaFiltro}
            onChange={(e) => setDiaFiltro(e.target.value)}
          >
            <option value="">Todos los dias</option>
            {dias.map((dia) => (
              <option key={dia} value={dia}>
                {dia}
              </option>
            ))}
          </select>

          <select
            value={actividadFiltro}
            onChange={(e) => setActividadFiltro(e.target.value)}
          >
            <option value="">Todas las actividades</option>
            {actividades.map((actividad) => (
              <option key={actividad._id} value={actividad._id}>
                {actividad.nombre}
              </option>
            ))}
          </select>
          <button
            className="ghost-btn"
            type="button"
            onClick={handleOnClickFiltrar}
          >
            Filtrar
          </button>
        </div>
      </div>

      {/* =========================
        TABLA DE CLASES
      ========================== */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Día</th>
              <th>Hora</th>
              <th>Sala</th>
              <th>Cupos</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clases.length > 0 ? (
              clases.map((clase) => (
                <FilaClase
                  key={clase._id}
                  id={clase._id}
                  actividad={clase.actividad}
                  dia={clase.dia}
                  hora={clase.hora}
                  sala={clase.sala}
                  capacidadMax={clase.capacidadMax}
                  inscriptos={clase.inscriptos?.length || 0}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay clases registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ClasesRegistradas;
