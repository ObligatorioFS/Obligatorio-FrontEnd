import "../styles/Auth.css";
import { Link, useNavigate } from 'react-router'
import {  useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import MensajeError from "../components/MensajeError";
import { jwtDecode } from 'jwt-decode'
import { BASE_URL } from "../../../config/api";

const Login = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onChange" })

    const navigate = useNavigate()

    const [error, setError] = useState("") //si "" --> no hay error
    const [cargando, setCargando] = useState(false)

     useEffect(() => {
         const token = localStorage.getItem('token')
         if (!token) return
         try {
         const payload = jwtDecode(token)
         if (payload.rolUsu === 'admin') {
         navigate('/dashboardAdmin')
        }else{
         navigate('/dashboardCliente')
        }
        }catch{
        localStorage.clear()
      }
   }, [])

    const handleOnClickLogin = data => {
      setCargando(true)
    
      fetch(`${BASE_URL}/login`, {
       headers: {
         'Content-Type': 'application/json'
       },
       method: "POST",
       body: JSON.stringify(data)
     }).then(res =>{
      if(res.ok){
        return res.json()
      }else if (res.status == 401){
        throw new Error("Error de usuario y/o contraseña")
      }else{
        throw new Error("Error al iniciar sesion")
      }
     }).then(data =>{
      localStorage.setItem('token', data.token)
      const payload = jwtDecode(data.token)
      localStorage.setItem('rolUsu', payload.rolUsu)
      localStorage.setItem('planUsu', payload.planUsu)
      localStorage.setItem('nombreUsu', data.usuario.nombre)
      if(payload.rolUsu === "admin"){
              navigate('/dashboardAdmin')
            }else{
              navigate('/dashboardCliente')
            }
        return
     }).catch(e =>{
      setError(e.message)
     }).finally(() => setCargando(false))  
    }

  return (
    <main className="auth-layout">

      <section className="auth-card login-card">
        <form onSubmit={handleSubmit(handleOnClickLogin)} className="auth-form">
          <div className="brand login-brand">
            <span>CA</span>
            <div>
              <strong>Club360</strong>
              <small>Social y deportivo</small>
            </div>
          </div>

          <div>
            <h2>Iniciar sesion</h2>
            <p>
              Ingresa con tu email y contrasena. Si sos nuevo, registrate para
              acceder a todas las funciones del club.
            </p>
          </div>

          <label>Email
            <input {...register('email',
              {
                required: "El email es obligatorio",
              }
            )} disabled={cargando} type="email" name="email" placeholder="usuario@club.com" required/>
            <MensajeError mensaje={errors.email?.message} />
            </label>
          <label>Contraseña
            <input {...register('password',
             {
               required: 'La contraseña es obligatoria'
             })} disabled={cargando} type="password" name="password" placeholder="Tu contraseña" required/>
            <MensajeError mensaje={errors.password?.message} />
          </label>
          <button disabled={cargando} className="primary-btn" type="submit">{cargando ? "Cargando..." : "Iniciar sesión"}</button>
        </form>
        {
         <MensajeError mensaje={error} />
        }

        {/* =========================
        LINK A REGISTRO
      ========================== */}
        <div className="register-link">
          <p>No tenes cuenta de jugador?</p>
          <Link className="secondary-btn" to="/registro">
            Registrarse aqui
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Login
