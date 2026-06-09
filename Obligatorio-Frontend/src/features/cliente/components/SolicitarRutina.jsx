import "../styles/SolicitarRutina.css";
import { useDispatch, useSelector } from "react-redux";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { agregarRutina } from "../../rutinasSlice";
import { setActividades } from "../../actividadesSlice";
import { BASE_URL } from "../../../config/api";
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal";
import { obtenerEstadisticasCliente } from "../../../config/utils/estadisticasClienteUtils";

const SolicitarRutina = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ mode: "onSubmit" });
//
  const dispatch = useDispatch();
  const { mensajeExito, setMensajeExito } = useMensajeTemporal();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE_URL}/actividades`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Error al cargar actividades");
      })
      .then((data) => dispatch(setActividades(data)))
      .catch((error) => console.error(error));
  }, [dispatch]);

  const handleOnClickSolicitarRutina = (data) => {
    setCargando(true);
    setError("");
    setMensajeExito("");

    const nuevaRutina = {
      actividad: data.actividad,
      objetivo: data.objetivo,
    };

    fetch(`${BASE_URL}/rutinas`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          method: "POST",
          body: JSON.stringify(nuevaRutina),
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
          .then((rutinaRes) => {
            dispatch(agregarRutina(rutinaRes));
            obtenerEstadisticasCliente(dispatch, navigate);
            reset();
            setMensajeExito("Rutina creada correctamente");
            return;
          })
          .catch((e) => {
            setError(e.message);
          })
          .finally(() => setCargando(false));
      };
  

  const actividades = useSelector(state => state.actividades.actividades)

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Solicitar rutina</h2>
      </div>

      <form onSubmit={handleSubmit(handleOnClickSolicitarRutina)} className="routine-form" data-api="POST /v1/rutinas">
        <label>
          Actividad
          <select {...register("actividad", { required: true })} name="actividad">
            {actividades.map(actividad => (
              <option key={actividad._id} value={actividad._id}>
                {actividad.nombre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Objetivo
          <textarea {...register("objetivo")} name="objetivo" placeholder="Ganar resistencia, bajar peso, fuerza..."></textarea>
        </label>
        <button disabled={cargando} className="secondary-btn" type="submit">
          {cargando ? "Solicitando..." : "Solicitar"}
        </button>
      </form>
      <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
      {(error || (isSubmitted && !isValid)) && (
        <div className="form-error">
          {error && <p>{error}</p>}
          {errors.actividad && <p>La actividad es requerida</p>}
          {errors.objetivo && <p>El objetivo es requerido</p>}
        </div>
      )}
    </section>
  )
}

export default SolicitarRutina