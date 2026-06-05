import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import "../styles/DetalleClase.css";

const DetalleClase = () => {
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  const [clase, setClase] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const fileRef = useRef();

  const obtenerClase = () => {
    fetch(`https://obligatorio-full-stack-ecru.vercel.app/v1/clases/${id}`, {
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
  }, [id]);

  useEffect(() => {
    if (!mensaje) return;

    const timeoutId = setTimeout(() => setMensaje(""), 3000);

    return () => clearTimeout(timeoutId);
  }, [mensaje]);

  const handleOnClickEliminarClase = () => {
    fetch(`https://obligatorio-full-stack-ecru.vercel.app/v1/clases/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.ok) {
          navigate("/dashboardAdmin");
          return;
        }
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const error = await res.json();
        throw new Error(error.message || "No se pudo eliminar la clase");
      })
      .catch((error) => {
        setMensaje(error.message);
      });
  };

  if (cargando || !clase) {
    return (
      <main className="detalle-clase">
        <article className="panel detalle-clase__card">
          <h2>Cargando...</h2>
        </article>
      </main>
    );
  }

  const imagenClase = clase.imagenURL || clase.imagen;
  const cuposOcupados = clase.inscriptos?.length || 0;
  const capacidadMax = clase.capacidadMax || 0;

  return (
    <main className="detalle-clase">
      <article className="panel detalle-clase__card">
        <div className="detalle-clase__top">
          <div>
            <div className="detalle-clase__title-row">
              <Link
                className="detalle-clase__back"
                to="/dashboardAdmin"
                aria-label="Volver al tablero"
                title="Volver al tablero"
              />
              <h1>{clase.actividad?.nombre || "Sin actividad"}</h1>
            </div>
            <p>{clase.actividad?.descripcion || "Sin descripcion"}</p>
          </div>

          <div className="detalle-clase__top-actions">
            <span className="detalle-clase__badge">
              {cuposOcupados} / {capacidadMax} cupos
            </span>
            <button
              className="table-btn danger detalle-clase__delete"
              type="button"
              onClick={handleOnClickEliminarClase}
            >
              Eliminar clase
            </button>
          </div>
        </div>

        <MensajeAlerta mensaje={mensaje} flotante />

        <section className="detalle-clase__summary">
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
            <span>Inscriptos</span>
            <strong>{cuposOcupados}</strong>
          </div>
        </section>

        <section className="detalle-clase__section">
          <div className="detalle-clase__section-header">
            <div>
              <h2>Imagen de la clase</h2>
              <p>Agrega una imagen para identificar la clase.</p>
            </div>
          </div>

          {imagenClase ? (
            <div className="detalle-clase__image-card">
              <img
                src={imagenClase}
                alt="Imagen de la clase"
                className="detalle-clase__image"
              />
            </div>
          ) : (
            <div className="detalle-clase__form-row">
              <input ref={fileRef} type="file" />
              <button className="secondary-btn detalle-clase__btn" type="button">
                Subir imagen
              </button>
            </div>
          )}
        </section>

        <section className="detalle-clase__grid">
          <div className="detalle-clase__section">
            <div className="detalle-clase__section-header">
              <div>
                <h2>Inscribir usuario</h2>
                <p>Busca un usuario por email e inscribelo en esta clase.</p>
              </div>
            </div>

            <div className="detalle-clase__form-row">
              <input type="email" placeholder="Email del usuario" />
              <button className="primary-btn detalle-clase__btn" type="button">
                Inscribir
              </button>
            </div>
          </div>

          <div className="detalle-clase__section">
            <div className="detalle-clase__section-header">
              <div>
                <h2>Remover usuario</h2>
                <p>Selecciona un inscripto para quitarlo de la clase.</p>
              </div>
            </div>

            <div className="detalle-clase__form-row">
              <select defaultValue="">
                <option value="" disabled>
                  Seleccionar usuario
                </option>
                {clase.inscriptos?.map((usuario) => (
                  <option key={usuario.email} value={usuario.email}>
                    {usuario.nombre} - {usuario.email}
                  </option>
                ))}
              </select>
              <button className="table-btn danger detalle-clase__btn" type="button">
                Remover
              </button>
            </div>
          </div>
        </section>

        <section className="detalle-clase__section">
          <div className="detalle-clase__section-header">
            <div>
              <h2>Usuarios inscriptos</h2>
              <p>Listado actual de usuarios anotados.</p>
            </div>
          </div>

          <div className="detalle-clase__list">
            {clase.inscriptos?.length > 0 ? (
              clase.inscriptos.map((usuario) => (
                <div className="detalle-clase__user" key={usuario.email}>
                  <strong>{usuario.nombre || "Sin nombre"}</strong>
                  <span>{usuario.email}</span>
                </div>
              ))
            ) : (
              <p className="detalle-clase__empty">No hay usuarios inscriptos.</p>
            )}
          </div>
        </section>
      </article>
    </main>
  );
};

export default DetalleClase;
