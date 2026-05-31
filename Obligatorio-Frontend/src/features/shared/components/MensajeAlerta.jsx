import '../styles/MensajeAlerta.css'

const MensajeAlerta = ({ mensaje, tipo = 'error', flotante = false }) => {
  if (!mensaje) return null

  return (
    <p className={`mensaje-alerta mensaje-alerta--${tipo} ${flotante ? 'mensaje-alerta--flotante' : ''}`}>
      {mensaje}
    </p>
  )
}

export default MensajeAlerta
