import "../styles/CrearClase.css"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { agregarClase } from '../../clasesSlice'



const CrearClase = () => {
  const dispatch = useDispatch()

  const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid, isSubmitted }
  } = useForm({ mode: "onSubmit" })

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleOnClickCrearClase = (data) => {
    const nuevaClase = {
      descripcion: data.descripcion,
      dia: data.dia,
      hora: data.hora,
      capacidadMax: Number(data.capacidadMax),
      actividad: data.actividad,
      sala: data.sala
    }
    console.log("Datos enviados:", nuevaClase)

    fetch('https://obligatorio-full-stack-ecru.vercel.app/v1/clases', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: localStorage.getItem('token')
            },
            method: "POST",
            body: JSON.stringify(nuevaClase)
        }).then(async res => {
            if (res.ok) {
                return res.json()
            } else if (res.status == 401) {
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                const error = await res.json()
                throw new Error(error.message || 'Error al crear la nota')
            }
        }).then(claseRes => {
            const actividadObj = typeof claseRes.actividad === 'object' && claseRes.actividad !== null
              ? claseRes.actividad
              : actividades.find(a => a._id === claseRes.actividad)

            const salaObj = typeof claseRes.sala === 'object' && claseRes.sala !== null
              ? claseRes.sala
              : salas.find(s => s._id === claseRes.sala)

            dispatch(agregarClase({
              ...claseRes,
              actividad: actividadObj,
              sala: salaObj
            }))
            reset()
            return
        }).catch(e => {
            setError(e.message)
        }).finally(() => setCargando(false))
  }
  

  
  const actividades = useSelector(state => state.actividades.actividades)
  const salas = useSelector(state => state.salas.salas)

  return (
      <article className="panel crear-clase">
        <div className="panel-header">
          <div>
            <h2>Crear clase</h2>
            <p>Formulario alineado con POST /v1/clases.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleOnClickCrearClase)} className="form-grid" data-api="POST /v1/clases">
          <label>
            Descripcion
            <input {...register('descripcion',
                    {
                        required: "La descripcion es requerida",
                        minLength: { value: 2, message: "La descripcion debe tener al menos 2 caracteres" },
                        maxLength: { value: 200, message: "La descripcion debe tener como máximo 200 caracteres" }
                    }
                )}name="descripcion" type="text" placeholder="Funcional para adultos" />
          </label>
          <label>
            Dia
            <select {...register('dia')} name="dia">
              <option>lunes</option>
              <option>martes</option>
              <option>miercoles</option>
              <option>jueves</option>
              <option>viernes</option>
              <option>sabado</option>
            </select>
          </label>
          <label>
            Hora
            <input {...register('hora')} name="hora" type="time" defaultValue="18:00" />
          </label>
          <label>
            Capacidad
            <input {...register('capacidadMax')} name="capacidadMax" type="number" min="1" placeholder="" />
          </label>
          <label>
            Actividad
            <select {...register('actividad', {
              required: "Debes seleccionar una actividad",
              validate: (value) => value !== "" || "Debes seleccionar una actividad"
            })} name="actividad">
              <option value="">Seleccionar actividad</option>
              {actividades.map(actividad => (
                <option key={actividad._id} value={actividad._id}>
                  {actividad.nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            Sala
            <select {...register('sala', {
              required: "Debes seleccionar una sala",
              validate: (value) => value !== "" || "Debes seleccionar una sala"
            })} name="sala">
              <option value="">Seleccionar sala</option>
              {salas.map(sala => (
                <option key={sala._id} value={sala._id}>
                  {sala.nombre}
                </option>
              ))}
            </select>
          </label>
          <button className="primary-btn" type="submit">Guardar clase</button>
        </form>
        {(error || (isSubmitted && !isValid)) &&
                <div className="form-error">
                    {error && <p>{error}</p>}
                    {errors.descripcion && <p>{errors.descripcion.message}</p>}
                    {errors.dia && <p>{errors.dia.message}</p>}
                    {errors.hora && <p>{errors.hora.message}</p>}
                    {errors.capacidadMax && <p>{errors.capacidadMax.message}</p>}
                    {errors.actividad && <p>{errors.actividad.message}</p>}
                    {errors.sala && <p>{errors.sala.message}</p>}
                </div>
        }
      </article>
  
  )
}

export default CrearClase
