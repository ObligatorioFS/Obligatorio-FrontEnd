import "../styles/MisRutinas.css";
import { useDispatch, useSelector } from "react-redux";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../../config/api";
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal";
import { setRutinas } from "../../rutinasSlice";
import Rutina from "./Rutina";

const MisRutinas = () => {
  const { mensajeExito, setMensajeExito } = useMensajeTemporal()
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  useEffect(() => {
    fetch(`${BASE_URL}/rutinas/rutinas-usuario`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        }
      }
    )
    .then(res =>{
      if(res.ok){
        return res.json()
      }else{
        if(res.status === 401){
          localStorage.removeItem('token')
          navigate("/login")
          throw new Error("Sesion vencida")
        }
      }
      throw new Error("No se pudieron cargar las rutinas")
    })
    .then(data => dispatch(setRutinas(data)))
    .catch(error => console.error(error.message))
    .finally()
  }, [])
  
  const rutinas = useSelector((state) => state.rutinas.rutinas)
  
  return (
        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Mis rutinas</h2>
            </div>
          </div>

          <div className="routine-grid">
            <article className="routine-card">
              {rutinas.length> 0 ?
                    (rutinas.map(rutina => <Rutina key={rutina._id} rutina={rutina} />))
                    :
                    (<p>No tienes rutinas asignadas.</p>)
                }
            </article>
            <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
          </div>
        </section>
  )
}

export default MisRutinas