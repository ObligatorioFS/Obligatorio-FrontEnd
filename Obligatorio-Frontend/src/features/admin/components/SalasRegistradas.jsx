import { useDispatch, useSelector } from "react-redux"
import Sala from "./Sala"
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { setSalas } from "../../salasSlice";

const SalasRegistradas = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  
  useEffect(() => {
      fetch('https://obligatorio-full-stack-ecru.vercel.app/v1/salas',
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
      .then(data => dispatch(setSalas(data)))
      .catch(error => console.error(error.message))
      .finally()
     }, [])

  const salas = useSelector(state => state.salas.salas);

  return (
    
      <article className="panel quick-panel salas-registradas">
         <div className="quick-list">
         {salas.length> 0 ?
                    salas.map(sala => <Sala key={sala._id} sala={sala} />)
                    :
                    <p>No hay salas</p>
                }
        </div>
      </article>

  )
}

export default SalasRegistradas
