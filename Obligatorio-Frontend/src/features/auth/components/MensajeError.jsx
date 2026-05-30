const MensajeError = ({ mensaje }) => {
  if (!mensaje) return null

  return <span className="form-error">{mensaje}</span>
}

export default MensajeError