import { useEffect } from "react"
import { useDispatch  } from "react-redux"
import { useNavigate } from "react-router"
import { setRutinas } from "../../rutinasSlice"
import { BASE_URL } from "../../../config/api"

const RutinasPendientes = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${BASE_URL}/rutinas`,
        {
          method: 'GET',
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
                return
            }
        }
    })
    .then(data => dispatch(setRutinas(data)))
    .catch()
    .finally()
   }, [])

  return (

      <article className="panel quick-panel rutinas-pendientes">
        <div className="panel-header">
          <div>
            <h2>Rutinas pendientes</h2>
            <p>Solicitudes esperando ejercicios.</p>
          </div>
        </div>

        <div className="quick-list">
          <div className="quick-item">
            <div>
              <strong>Fuerza general</strong>
              <span>Jugador: Ana Perez</span>
            </div>
            <button className="secondary-btn compact" type="button">Agregar ejercicios</button>
          </div>
          <div className="quick-item">
            <div>
              <strong>Resistencia</strong>
              <span>Jugador: Juan Gomez</span>
            </div>
            <button className="secondary-btn compact" type="button">Agregar ejercicios</button>
          </div>
        </div>
      </article>
  )
}

export default RutinasPendientes
