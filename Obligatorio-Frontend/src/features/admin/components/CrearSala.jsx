import { useState } from "react";
import "../styles/CrearSala.css";
import { crearSala } from "../../salasSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import { BASE_URL } from "../../../config/api";
import { obtenerEstadisticasAdmin } from "../../../config/utils/estadisticasAdminUtils"
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal";

export const CrearSala = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ mode: "onSubmit" });

  const dispatch = useDispatch();
  const { mensajeExito, setMensajeExito } = useMensajeTemporal();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleOnClickCrearSala = (data) => {
    setError("");
    setMensajeExito("");

    const nuevaSala = {
      ...data,
    };
    setCargando(true);

    fetch(`${BASE_URL}/salas`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      method: "POST",
      body: JSON.stringify(nuevaSala),
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status == 401) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          const error = await res.json();
          throw new Error(error.message || "Error al crear la sala");
        }
      })
      .then((salaRes) => {
        dispatch(crearSala(salaRes));
        obtenerEstadisticasAdmin(dispatch, navigate);
        reset();
        setMensajeExito("Sala creada correctamente");
        return;
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setCargando(false));
  };

  return (
    <article className="panel crear-sala">
      <div className="panel-header">
        <h2>Nueva sala</h2>
      </div>
      <form
        onSubmit={handleSubmit(handleOnClickCrearSala)}
        className="stack-form"
        data-api="POST /v1/salas"
      >
        <input
          {...register("nombre", { required: "El nombre es requerido" })}
          type="text"
          placeholder="Sala principal"
        />
        <input
          {...register("capacidadMax", {
            required: "La capacidad máxima es requerida",
            min: { value: 1, message: "La capacidad máxima debe ser al menos 1" },
          })}
          type="number"
          placeholder="40"
        />
        <button className="secondary-btn" type="submit" disabled={cargando}>
          {cargando ? "Creando..." : "Crear sala"}
        </button>
      </form>
      <br />
      <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
      <MensajeAlerta mensaje={error} flotante />
      {isSubmitted && !isValid && (
        <div className="form-error">
          {error && <p>{error}</p>}
          {errors.nombre && <p>{errors.nombre.message}</p>}
          {errors.capacidadMax && <p>{errors.capacidadMax.message}</p>}
        </div>
      )}
    </article>
  );
};
