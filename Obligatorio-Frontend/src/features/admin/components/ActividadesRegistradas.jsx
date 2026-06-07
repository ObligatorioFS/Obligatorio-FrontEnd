import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setActividades } from "../../actividadesSlice";
import Actividad from "./Actividad";
import { BASE_URL } from "../../../config/api";
import MensajeAlerta from "../../shared/components/MensajeAlerta";
import useMensajeTemporal from "../../../config/utils/useMensajeTemporal";


const ActividadesRegistradas = () => {
    const { mensajeExito, setMensajeExito } = useMensajeTemporal()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
      fetch(`${BASE_URL}/actividades`,
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
          throw new Error("No se pudieron cargar las salas")
      })
      .then(data => dispatch(setActividades(data)))
      .catch(error => console.error(error.message))
      .finally()
     }, [])

    const actividades = useSelector(state => state.actividades.actividades);

  return (
      <article className="panel quick-panel actividades-registradas">
        <div className="panel-header">
          <div>
            <h2>Actividades registradas</h2>
            <p>Disciplinas disponibles para crear clases.</p>
          </div>
        </div>

        <div className="quick-list">
         {actividades.length> 0 ?
                    (actividades.map(actividad => <Actividad key={actividad._id} actividad={actividad} setMensajeExitoPadre={setMensajeExito} />))
                    :
                    (<p>No hay actividades</p>)
                }
                <MensajeAlerta mensaje={mensajeExito} tipo="exito" flotante />
        </div>
    
      </article>
  )
}

export default ActividadesRegistradas
