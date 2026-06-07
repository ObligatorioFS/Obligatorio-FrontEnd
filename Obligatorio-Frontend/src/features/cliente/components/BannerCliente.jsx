import { useState } from 'react'
import { useNavigate } from 'react-router'
import { BASE_URL } from '../../../config/api'
import MensajeAlerta from '../../shared/components/MensajeAlerta'
import '../styles/BannerCliente.css'

const BannerCliente = () => {
  const navigate = useNavigate()
  const [cargando, setCargando] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')
  const nombre = localStorage.getItem('nombreUsu') || 'Jugador'
  const [plan, setPlan] = useState(localStorage.getItem('planUsu') || 'plus')
  const esPremium = plan === 'premium'

  const handleOnClickCambiarPlan = () => {
    setCargando(true)
    setMensaje('')
    setMensajeExito('')

    fetch(`${BASE_URL}/usuario`, {
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    })
      .then(async res => {
        if (res.ok) {
          localStorage.setItem('planUsu', 'premium')
          setPlan('premium')
          setMensajeExito('Plan actualizado correctamente')
          return
        }
        if (res.status === 401) {
          localStorage.removeItem('token')
          navigate('/login')
          return
        }
        const error = await res.json()
        throw new Error(error.message || 'No se pudo cambiar el plan')
      })
      .catch(error => {
        setMensaje(error.message)
      })
      .finally(() => {
        setCargando(false)
      })
  }

  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Hola, {nombre}</p>
        <h1>Tu actividad en el club</h1>
        <p>Revisa tus clases, solicita rutinas y administra tu plan.</p>
      </div>

      <button
        className="primary-btn compact"
        type="button"
        onClick={handleOnClickCambiarPlan}
        disabled={cargando || esPremium}
      >
        {cargando
          ? 'Cambiando plan...'
          : esPremium
            ? 'Ya sos usuario Premium'
            : 'Cambiar a Plan Premium'}
      </button>
      {mensaje && <MensajeAlerta tipo="error" mensaje={mensaje} />}
      {mensajeExito && <MensajeAlerta tipo="exito" mensaje={mensajeExito} />}
    </header>
  )
}

export default BannerCliente
