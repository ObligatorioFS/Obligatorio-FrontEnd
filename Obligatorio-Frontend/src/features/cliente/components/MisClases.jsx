import { useDispatch, useSelector } from "react-redux";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../../config/api";
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal";
import { setMisClases } from "../../clasesSlice";
import Clase from "./Clase";
import "../styles/MisClases.css";

const MisClases = () => {
  const { mensajeExito, setMensajeExito } = useMensajeTemporal()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
      fetch(`${BASE_URL}/clases/clases-usuario`,
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
        throw new Error("No se pudieron cargar las clases inscriptas")
      })
      .then(data => dispatch(setMisClases(data)))
      .catch(error => console.error(error.message))
      .finally()
    }, [])

  const clases = useSelector(state => state.clases.misClases)

  return (
    <section className="panel">
          <div className="panel-header">
            <div>
              <h2>Mis Clases</h2>
            </div>
          </div>

          <div className="routine-grid">
            <article className="routine-card">
              {clases.length> 0 ?
                    (clases.map(clase => <Clase key={clase._id} clase={clase} />))
                    :
                    (<p>No estas inscripto en ninguna clase.</p>)
                }
            </article>
            <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
          </div>
        </section>
  )
}

export default MisClases