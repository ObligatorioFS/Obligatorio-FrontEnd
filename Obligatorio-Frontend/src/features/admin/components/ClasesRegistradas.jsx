import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FilaClase from "./FilaClase";
import Paginate from "./Paginate";
import { obtenerClases } from "../../../config/utils/clasesUtils";
import "../styles/ClasesRegistradas.css";
import { BASE_URL } from "../../../config/api";
import { actualizarClase } from "../../clasesSlice";
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import { obtenerEstadisticasAdmin } from "../../../config/utils/estadisticasAdminUtils"; 

const ClasesRegistradas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mensaje, setMensaje, mensajeExito, setMensajeExito } = useMensajeTemporal() 
  const [diaFiltro, setDiaFiltro] = useState("");
  const [actividadFiltro, setActividadFiltro] = useState("");
  const [cargando, setCargando] = useState(false)
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"];

  const clases = useSelector((state) => state.clases.clases);
  const actividades = useSelector((state) => state.actividades.actividades);
  const cargandoClases = useSelector(state => state.clases.cargando)

  const fetchClases = (page = 1) => {
    obtenerClases({
      dispatch,
      navigate,
      page,
      dia: diaFiltro,
      idActividad: actividadFiltro,
    });
  };

  useEffect(() => {
    fetchClases();
  }, []);

  const handleOnClickLimpiarInscripciones = () => {
    fetch(`${BASE_URL}/clases/remover-inscripciones-del-dia`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token")
          },
          body: JSON.stringify({ dia: diaFiltro })
        })
          .then(async res => {
            if (res.ok) {
              return res.json()
            }
            if (res.status === 401) {
              localStorage.removeItem("token")
              navigate("/login")
              return
            }
            const error = await res.json()
            throw new Error(error.message || 'No se pudo borrar la lista de inscriptos')
          })
          .then(() => {
            dispatch(actualizarClase({
              id: null,
              modificado: { dia: diaFiltro }
            }))
            obtenerEstadisticasAdmin(dispatch, navigate)
            setMensaje("")
            setMensajeExito(`Inscripciones del ${diaFiltro} borradas correctamente`)
            setEditando(false)
          })
          .catch(error => {
            setMensaje(error.message)
          }).finally()
    
  };

  const handleOnClickFiltrar = () => {
    fetchClases(1);
  };

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
          <button
            disabled={cargando}
            className="ghost-btn"
            type="button"
            onClick={handleOnClickLimpiarInscripciones}
          >
            {cargando ? "Limpiando..." : "Limpiar Inscripciones"}
          </button>
        </div>
      </div>
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
            {cargandoClases ? (
              <tr>
                <td colSpan="6">
                  <div className="table-loading">
                    <span className="spinner" />
                    <p>Cargando clases...</p>
                  </div>
                </td>
              </tr>
            ) : clases.length > 0 ? (
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
      <Paginate fnFetchClases={fetchClases} />
      <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
    </section>
  );
};

export default ClasesRegistradas;
