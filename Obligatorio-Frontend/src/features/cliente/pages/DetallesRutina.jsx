import { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../config/api";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import "../styles/DetallesRutina.css";
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal";

const DetallesRutina = () => {
    const { id } = useParams();
    const location = useLocation();
    const { rutina: rutinaState } = location.state || {};

    const [cargando, setCargando] = useState(true);
    const [rutina, setRutina] = useState(rutinaState || null);
    const { mensaje, setMensaje, mensajeExito, setMensajeExito } = useMensajeTemporal();

    const navigate = useNavigate();

    // OBTENER DETALLE DE LA RUTINA
    const obtenerRutina = () => {
        fetch(`${BASE_URL}/rutinas/${id}`, {
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
            .then((data) => setRutina(data))
            .finally(() => setCargando(false));
    };

    useEffect(() => {
        if (!rutinaState) {
            obtenerRutina();
        } else {
            setCargando(false);
        }
    }, []);

    if (cargando) {
        return <div className="cargando">Cargando rutina...</div>;
    }

    if (!rutina) {
        return <div className="error">No se encontró la rutina</div>;
    }

    return (
        <div className="detalles-rutina-page">
            {mensaje && <MensajeAlerta mensaje={mensaje} setMensaje={setMensaje} />}
            {mensajeExito && (
                <MensajeAlerta
                    mensaje={mensajeExito}
                    setMensaje={setMensajeExito}
                    esExito={true}
                />
            )}

            <div className="detalles-rutina">
                <div className="detalles-rutina__top">
                    <div className="detalles-rutina__title-row">
                        <Link to="/dashboardCliente" className="detalles-rutina__back" />
                        <h1>{rutina.objetivo}</h1>
                    </div>
                </div>
                <div className="detalles-rutina__summary">
                    <div>
                        <span>Actividad</span>
                        <strong>{rutina.actividad?.nombre || "Sin actividad"}</strong>
                    </div>
                </div>

                <div className="detalles-rutina__section">
                    <div>
                        <strong>Objetivo</strong>
                        <p>{rutina.objetivo}</p>
                    </div>
                    {rutina.ejercicios && rutina.ejercicios.length > 0 ? (
                        <div className="ejercicios">
                            <strong>Ejercicios:</strong>
                            <ul>
                                {rutina.ejercicios.map((ejercicio) => (
                                    <li>{ejercicio}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="sin-ejercicios">
                            <p>Tu rutina está en proceso de personalización. Nuestro equipo de profesionales completará los ejercicios específicos en breve.</p>
                        </div>
                    )}

                    <div className="detalles-rutina__acciones">
                        <Link to="/dashboardCliente" className="primary-btn">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetallesRutina;
