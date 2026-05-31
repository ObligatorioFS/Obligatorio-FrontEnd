import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { setClases } from "../../clasesSlice"
import FilaClase from "./FilaClase"
import "../styles/ClasesRegistradas.css"

const ClasesRegistradas = () => {

   const dispatch = useDispatch()
   const navigate = useNavigate()
   
   useEffect(() => {
    fetch('https://obligatorio-full-stack-ecru.vercel.app/v1/clases?page=1&limit=10',
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
                return
            }
        }
    })
    .then(data => dispatch(setClases(data.clases)))
    .catch()
    .finally()
   }, [])

  const clases = useSelector(state => state.clases.clases)

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Clases registradas</h2>
          <p>Vista pensada para GET /v1/clases con filtros por dia y actividad.</p>
        </div>
        <div className="filters">
          <select>
            <option>Todos los dias</option>
            <option>lunes</option>
            <option>martes</option>
            <option>miercoles</option>
          </select>
          <button className="ghost-btn" type="button">Filtrar</button>
        </div>
      </div>

      {/* =========================
        TABLA DE CLASES
      ========================== */}
       <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Día</th>
              <th>Hora</th>
              <th>Sala</th>
              <th>Cupos</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clases.length > 0 ? (
              clases.map(clase => (
                <FilaClase
                  key={clase._id}
                  id={clase._id}
                  actividad={clase.actividad}
                  dia={clase.dia}
                  hora={clase.hora}
                  sala={clase.sala}
                  capacidadMax={clase.capacidadMax}
                  inscriptos={clase.inscriptos?.length || 0}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay clases registradas</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ClasesRegistradas
