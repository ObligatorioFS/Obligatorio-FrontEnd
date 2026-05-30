import "../styles/Auth.css";
import { Link, useNavigate } from 'react-router'
import {  useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import MensajeError from "../components/MensajeError";
import { jwtDecode } from 'jwt-decode'

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
        if (localStorage.getItem("token")) {
            const payload = jwtDecode(localStorage.getItem("token"));
            if(payload.rolUsu === "admin"){
              navigate('/dashboardAdmin')
            }else{
              navigate('/dashboardCliente')
            }
            return
        }
    }, [])

    const handleOnClickLogin = data => {
      setCargando(true)
    
      fetch('https://obligatorio-full-stack-ecru.vercel.app/v1/login', {
       headers: {
         'Content-Type': 'application/json'
       },
       method: "POST",
       body: JSON.stringify(data)
     }).then(res =>{
      if(res.ok){
        return res.json()
      }else if (res.status == 401){
        throw new Error("Error de usuairo y/o contraseña")
      }else{
        throw new Error("Error al iniciar sesion")
      }
     }).then(data =>{
      localStorage.setItem('token', data.token)
      const payload = jwtDecode(data.token)
      localStorage.setItem('rolUsu', payload.rolUsu)
      localStorage.setItem('planUsu', payload.planUsu)
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
        <form onSubmit={handleSubmit(handleOnClickLogin)} className="auth-form" data-api="POST /v1/login">
          <div className="brand login-brand">
            <span>CA</span>
            <div>
              <strong>Club Activo</strong>
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
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'El formato del email no es válido'}
              }
            )} disabled={cargando} type="email" name="email" placeholder="usuario@club.com" required/>
            <MensajeError mensaje={errors.email?.message} />
            </label>
          <label>Contraseña
            <input {...register('password',
             {
               required: 'La contraseña es obligatoria',
               minLength: {value: 8, message: 'La contraseña debe tener mínimo 8 caracteres'
             },
              maxLength: {value: 30, message: 'La contraseña debe tener máximo 30 caracteres'
             },
              pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, message: 'Debe tener al menos una mayúscula, una minúscula y un número'
             }
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
