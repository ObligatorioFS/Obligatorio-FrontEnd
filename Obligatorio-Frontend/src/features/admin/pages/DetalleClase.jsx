
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import "../styles/DetalleClase.css";
import { BASE_URL } from "../../../config/api";
import { eliminarClase } from "../../clasesSlice";
import { obtenerEstadisticasAdmin } from "../../../config/utils/estadisticasAdminUtils";
import { obtenerClases } from "../../../config/utils/clasesUtils";
import { useDispatch } from "react-redux";
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal";

// falta boton remover toda la lista de inscripos

const DetalleClase = () => {
  const { id } = useParams();
  const [cargando, setCargando] = useState(true);
  const [clase, setClase] = useState(null);
  const { mensaje, setMensaje, mensajeExito, setMensajeExito } = useMensajeTemporal();
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [inscribiendo, setInscribiendo] = useState(false);
  const [removiendo, setRemoviendo] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fileRef = useRef();
  const emailUsuarioRef = useRef();
  const selectUsuarioRef = useRef();

  //OBTENER DETALLE DE LA CLASE
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
  }, [id]);

  //ELIMINAR CLASE
  const handleOnClickEliminarClase = () => {
    fetch(`${BASE_URL}/clases/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(async (res) => {
        if (res.ok) {
          dispatch(eliminarClase(id));
          obtenerClases({
            dispatch,
            navigate,
            page: 1,
            limit: 5,
          });
          obtenerEstadisticasAdmin(dispatch, navigate);
          setMensaje("");
          setMensajeExito("Clase eliminada correctamente");

          setTimeout(() => {
            navigate("/dashboardAdmin");
          }, 1200);

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

  //SUBIR IMAGEN
  const handleOnClickSubirImagen = () => {
    const imagen = fileRef.current.files[0];

    if (!imagen) {
      setMensaje("Debes seleccionar una imagen");
      return;
    }
    if (!imagen.type.startsWith("image/")) {
      setMensaje("El archivo debe ser una imagen");
      return;
    }
    setSubiendoImagen(true);
    const formData = new FormData();
    formData.append("img", imagen);

    fetch(`${BASE_URL}/clases/${id}/imagen`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    })
      .then(async (res) => {
        if (res.ok) {
          obtenerClase();
          setMensaje("");
          return;
        }

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const error = await res.json();
        throw new Error(error.message || "Error subiendo imagen");
      })
      .catch((error) => {
        setMensaje(error.message);
      })
      .finally(() => setSubiendoImagen(false));
  };

  //INSCRIBIR USUARIOS
  const handleOnClickInscribirUsuario = () => {
    const email = emailUsuarioRef.current.value.trim();
    if (!email) {
      setMensaje("Debes ingresar el email del usuario");
      return;
    }
    setInscribiendo(true);
    fetch(`${BASE_URL}/clases/${id}/inscribir-usuario-admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ email }),
    })
      .then(async (res) => {
        if (res.ok) {
          obtenerClase();
          obtenerClases({
            dispatch,
            navigate,
            page: 1,
          });
          obtenerEstadisticasAdmin(dispatch, navigate);
          setMensaje("");
          setMensajeExito("Usuario inscripto correctamente");
          emailUsuarioRef.current.value = "";
          return;
        }
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const error = await res.json();
        throw new Error(error.message || "No se pudo inscribir el usuario");
      })
      .catch((error) => {
        setMensaje(error.message);
      })
      .finally(() => {
        setInscribiendo(false);
      });
  };

  //ELIMINAR USAURIO
  const handleOnClickRemoverUsuario = () => {
    const idUsuario = selectUsuarioRef.current.value;

    if (!idUsuario) {
      setMensaje("Debes seleccionar un usuario");
      return;
    }

    setRemoviendo(true);

    fetch(`${BASE_URL}/clases/${id}/remover-inscripcion-admin`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ idUsuario }),
    })
      .then(async (res) => {
        if (res.ok) {
          obtenerClase();
          obtenerClases({
            dispatch,
            navigate,
            page: 1,
          });
          obtenerEstadisticasAdmin(dispatch, navigate);

          setMensaje("");
          setMensajeExito("Usuario removido correctamente");
          selectUsuarioRef.current.value = "";
          return;
        }

        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const error = await res.json();
        throw new Error(error.message || "No se pudo remover el usuario");
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
        <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />

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
              <input ref={fileRef} type="file" accept="image/*" />
              <button
                className="secondary-btn detalle-clase__btn"
                type="button"
                onClick={handleOnClickSubirImagen}
                disabled={subiendoImagen}
              >
                {subiendoImagen ? "Subiendo..." : "Subir imagen"}
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
              <input
                ref={emailUsuarioRef}
                type="email"
                placeholder="Email del usuario"
              />
              <button
                className="primary-btn detalle-clase__btn"
                type="button"
                onClick={handleOnClickInscribirUsuario}
                disabled={inscribiendo}
              >
                {inscribiendo ? "Inscribiendo..." : "Inscribir"}
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
              <select ref={selectUsuarioRef} defaultValue="">
                <option value="" disabled>
                  Seleccionar usuario
                </option>
                {clase.inscriptos?.map((usuario) => (
                  <option key={usuario._id} value={usuario._id}>
                    {usuario.nombre} - {usuario.email}
                  </option>
                ))}
              </select>
              <button
                className="table-btn danger detalle-clase__btn"
                type="button"
                onClick={handleOnClickRemoverUsuario}
                disabled={removiendo}
              >
                {removiendo ? "Removiendo..." : "Remover"}
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
              <p className="detalle-clase__empty">
                No hay usuarios inscriptos.
              </p>
            )}
          </div>
        </section>
      </article>
    </main>
  );
};

export default DetalleClase;
