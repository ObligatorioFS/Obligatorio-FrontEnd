import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../config/api";
import { obtenerClases } from "../../../config/utils/clasesUtils";
import { obtenerEstadisticasCliente } from "../../../config/utils/estadisticasClienteUtils";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import "../styles/DetalleClaseCliente.css";
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal";

const DetalleClaseCliente = () => {
  const { id } = useParams();

  const [cargando, setCargando] = useState(true);
  const [clase, setClase] = useState(null);
  const { mensaje, setMensaje, mensajeExito, setMensajeExito } = useMensajeTemporal();
  const [inscribiendo, setInscribiendo] = useState(false);
  const [removiendo, setRemoviendo] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // OBTENER DETALLE DE LA CLASE
  const obtenerClase = () => {
    fetch(`${BASE_URL}/clases/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 401) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
          }
        }
      })
      .then((data) => setClase(data))
      .finally(() => setCargando(false));
  };

  useEffect(() => {
    obtenerClase();
  }, []);

  // INSCRIBIRSE A LA CLASE
  const handleOnClickInscribirse = () => {
    setInscribiendo(true);

    fetch(`${BASE_URL}/clases/${id}/inscribir-usuario`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.ok) {
          obtenerClase();
          obtenerClases({
            dispatch,
            navigate,
            page: 1,
          });
          obtenerEstadisticasCliente(dispatch, navigate);
          setMensaje("");
          setMensajeExito("Inscripcion realizada correctamente");
          return;
        }

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const error = await res.json();
        throw new Error(error.message || "No se pudo realizar la inscripcion");
      })
      .catch((error) => {
        setMensaje(error.message);
      })
      .finally(() => {
        setInscribiendo(false);
      });
  };

  // REMOVER INSCRIPCION DE LA CLASE
  const handleOnClickRemoverInscripcion = () => {
    setRemoviendo(true);

    fetch(`${BASE_URL}/clases/${id}/remover-inscripcion`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.ok) {
          obtenerClase();
          obtenerClases({
            dispatch,
            navigate,
            page: 1,
          });
          obtenerEstadisticasCliente(dispatch, navigate);

          setMensaje("");
          setMensajeExito("Inscripcion cancelada correctamente");
          return;
        }

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const error = await res.json();
        throw new Error(error.message || "No se pudo cancelar la inscripcion");
      })
      .catch((error) => {
        setMensaje(error.message);
      })
      .finally(() => {
        setRemoviendo(false);
      });
  };

  if (cargando || !clase) {
    return (
      <main className="detalle-clase-cliente-page">
        <article className="panel detalle-clase-cliente">
          <h2>Cargando...</h2>
        </article>
      </main>
    );
  }

  const imagenClase = clase.imagenURL || clase.imagen;
  const cuposOcupados = clase.inscriptos?.length || 0;
  const capacidadMax = clase.capacidadMax || 0;

  return (
    <main className="detalle-clase-cliente-page">
      <article className="panel detalle-clase-cliente">
        <div className="detalle-clase-cliente__top">
          <div>
            <div className="detalle-clase-cliente__title-row">
              <Link
                className="detalle-clase-cliente__back"
                to="/dashboardCliente"
                aria-label="Volver al tablero"
                title="Volver al tablero"
              />
              <h1>{clase.actividad?.nombre || "Sin actividad"}</h1>
            </div>
            <p>{clase.actividad?.descripcion || "Sin descripcion"}</p>
          </div>

          <span className="detalle-clase-cliente__badge">
            {cuposOcupados} / {capacidadMax} cupos
          </span>
        </div>

        <MensajeAlerta mensaje={mensaje} flotante />
        <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />

        <section className="detalle-clase-cliente__summary">
          <div>
            <span>Dia</span>
            <strong>{clase.dia || "Sin dia"}</strong>
          </div>
          <div>
            <span>Hora</span>
            <strong>{clase.hora || "Sin hora"}</strong>
          </div>
          <div>
            <span>Sala</span>
            <strong>{clase.sala?.nombre || "Sin sala"}</strong>
          </div>
          <div>
            <span>Cupos</span>
            <strong>
              {cuposOcupados} / {capacidadMax}
            </strong>
          </div>
        </section>

        <section className="detalle-clase-cliente__section">
          <div className="detalle-clase-cliente__section-header">
            <div>
              <h2>Imagen de la clase</h2>
              <p>Conoce la clase antes de inscribirte.</p>
            </div>
          </div>

          {imagenClase ? (
            <div className="detalle-clase-cliente__image-card">
              <img
                src={imagenClase}
                alt="Imagen de la clase"
                className="detalle-clase-cliente__image"
              />
            </div>
          ) : (
            <p className="detalle-clase-cliente__empty">
              Esta clase todavia no tiene imagen.
            </p>
          )}
        </section>

        <section className="detalle-clase-cliente__section">
          <div className="detalle-clase-cliente__section-header">
            <div>
              <h2>Inscripcion</h2>
              <p>Podes anotarte o cancelar tu inscripcion a esta clase.</p>
            </div>
          </div>

          <div className="detalle-clase-cliente__actions">
            <button
              className="primary-btn detalle-clase-cliente__btn"
              type="button"
              onClick={handleOnClickInscribirse}
              disabled={inscribiendo || removiendo}
            >
              {inscribiendo ? "Inscribiendo..." : "Inscribirme"}
            </button>

            <button
              className="table-btn danger detalle-clase-cliente__btn"
              type="button"
              onClick={handleOnClickRemoverInscripcion}
              disabled={inscribiendo || removiendo}
            >
              {removiendo ? "Cancelando..." : "Cancelar inscripcion"}
            </button>
          </div>
        </section>
      </article>
    </main>
  );
};

export default DetalleClaseCliente;
