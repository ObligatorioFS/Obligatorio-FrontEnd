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

   const rutinas = useSelector(state => state.rutinas.rutinas);

  return (

      <article className="panel quick-panel rutinas-pendientes">
        <div className="panel-header">
          <div>
            <h2>Rutinas pendientes</h2>
            <p>Solicitudes esperando ejercicios.</p>
          </div>
        </div>

        <div className="quick-list">
          {rutinas.length> 0 ?
                    (rutinas.map(rutina => <Rutina key={rutina._id} rutina={rutina} />))
                    :
                    (<p>No hay rutinas pendientes</p>)
                }
        </div>
      </article>
  )
}

export default RutinasPendientes
