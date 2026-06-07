import "../styles/CrearActividad.css";
import { useDispatch } from "react-redux";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { crearActividad } from "../../actividadesSlice";
import { useEffect } from "react";
import { BASE_URL } from "../../../config/api";
import { obtenerEstadisticasAdmin } from "../../../config/utils/estadisticasAdminUtils"

const CrearActividad = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ mode: "onSubmit" });

  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!mensaje) return;

    const timeoutId = setTimeout(() => setMensaje(""), 3000);

    return () => clearTimeout(timeoutId);
  }, [mensaje]);

  const handleOnClickCrearActividad = (data) => {
    setError("");
    setMensaje("");


    const nuevaActividad = {
      ...data,
  };
  setCargando(true);

    fetch(`${BASE_URL}/actividades`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify(nuevaActividad),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status == 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          const error = await res.json();
          throw new Error(error.message || "Error al crear la clase");
        }
      })
      .then((actividadRes) => {
        dispatch(crearActividad(actividadRes));
        obtenerEstadisticasAdmin(dispatch, navigate);
        reset();
        setMensaje("Actividad  creada correctamente");
        return;
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setCargando(false))
  };

  return (
    <article className="panel crear-actividad">
      <div className="panel-header">
        <h2>Nueva actividad</h2>
      </div>
      <form
        onSubmit={handleSubmit(handleOnClickCrearActividad)}
        className="stack-form"
        data-api="POST /v1/actividades"
      >
        <input
          {...register("nombre", { required: "El nombre es requerido" })}
          name="nombre"
          type="text"
          placeholder="Nombre"
        />
        <textarea
          {...register("descripcion", {
            required: "La descripcion es requerida",
          })}
          name="descripcion"
          placeholder="Descripcion"
        ></textarea>
        <button className="secondary-btn" type="submit" disabled={cargando}>
          {cargando ? "Creando..." : "Crear actividad"}
        </button>
      </form>
      <br/>
      <MensajeAlerta mensaje={mensaje} tipo="exito" flotante />
      <MensajeAlerta mensaje={error} flotante />
      {isSubmitted && !isValid && (
        <div className="form-error">
          {error && <p>{error}</p>}
          {errors.nombre && <p>{errors.nombre.message}</p>}
          {errors.descripcion && <p>{errors.descripcion.message}</p>}
        </div>
      )}
    </article>
  );
};

export default CrearActividad;
