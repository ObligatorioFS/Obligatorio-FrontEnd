import '../styles/Auth.css'
import { Link, useNavigate } from 'react-router'
import {  useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { jwtDecode } from 'jwt-decode'
import MensajeError from '../components/MensajeError'

const Registro = () => {

const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({ mode: "onChange" })

    const navigate = useNavigate()

    const [error, setError] = useState("") //si "" --> no hay error
    const [cargando, setCargando] = useState(false)

     useEffect(() => {
     if (localStorage.getItem('token')) {
     try {
      const payload = jwtDecode(localStorage.getItem('token'))
      if (payload.rolUsu === 'admin') {
        navigate('/dashboardAdmin')
      } else {
        navigate('/dashboardCliente')
      }

      return
    } catch {
      localStorage.clear()
    }
  }
}, [])

    const handleOnClickRegistro = data => {
      setCargando(true)
    
      fetch('https://obligatorio-full-stack-ecru.vercel.app/v1/registrar', {
       headers: {
         'Content-Type': 'application/json'
       },
       method: "POST",
       body: JSON.stringify(data)
     }).then(res =>{
      if(res.ok){
        return res.json();
      }
      return res.json().then(data => {
      throw new Error(data.message || 'Error al registrar usuario')
    })}).then(data =>{
      localStorage.setItem('token', data.token)
      const payload = jwtDecode(data.token)
      localStorage.setItem('rolUsu', payload.rolUsu)
      localStorage.setItem('planUsu', payload.planUsu)
      reset()
      navigate('/dashboardCliente')
     }).catch(e =>{
      setError(e.message)
     }).finally(() => setCargando(false))  
    }


  return (
  <main className="auth-layout">

    <section className="auth-card register-card">
      <form onSubmit={handleSubmit(handleOnClickRegistro)} className="auth-form">
        <div className="brand register-brand">
          <span>CA</span>
          <div>
            <strong>Club Activo</strong>
            <small>Registro de jugador</small>
          </div>
        </div>

        <div>
          <h2>Crear cuenta</h2>
          <p>Completa tus datos para registrarte como jugador.</p>
        </div>

        <div className="register-grid">
          <label>
            Nombre
            <input {...register('nombre',
              {
                  required: "El nombre es obligatorio",
                  minLength: {value: 2, message: 'El nombre debe tener mínimo 2 caracteres'},
                  maxLength: { value: 30, message: "El nombre debe tener como máximo 30 caracteres" }
              }
            )} type="text" name="nombre" placeholder="Nombre" required />
            <MensajeError mensaje={errors.nombre?.message} />
          </label>
          <label>
            Apellido
            <input {...register('apellido',
              {
                  required: "El apellido es obligatorio",
                  minLength: {value: 2, message: 'El apellido debe tener mínimo 2 caracteres'},
                  maxLength: { value: 30, message: "El apellido debe tener como máximo 30 caracteres" }
              }
            )} type="text" name="apellido" placeholder="Apellido" required />
            <MensajeError mensaje={errors.apellido?.message} />
          </label>
        </div>

        <label>
          Email
          <input {...register('email',
              {
                required: "El email es obligatorio",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'El formato del email no es válido'}
              }
            )} disabled={cargando} type="email" name="email" placeholder="usuario@club.com" required/>
            <MensajeError mensaje={errors.email?.message} />
          </label>
          <label>
          Contraseña
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

        <button disabled={cargando} className="primary-btn" type="submit">{cargando ? "Registrando..." : "Registrar"}</button>
      </form>
      {
        <MensajeError mensaje={error} />
      }

      {/* =========================
        LINK A LOGIN
      ========================== */}
      <div className="register-link">
        <p>Ya tenes cuenta?</p>
        <Link className="secondary-btn" to="/login">Volver al login</Link>
      </div>
    </section>
  </main>
    )
}

export default Registro
