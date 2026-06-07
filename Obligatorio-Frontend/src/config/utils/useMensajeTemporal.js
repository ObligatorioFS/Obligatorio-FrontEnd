import { useEffect, useState } from "react"

const useMensajeTemporal = (tiempo = 3000) => {
  const [mensaje, setMensaje] = useState("")
  const [mensajeExito, setMensajeExito] = useState("")

  useEffect(() => {
    if (!mensaje && !mensajeExito) return

    const timeoutId = setTimeout(() => {
      setMensaje("")
      setMensajeExito("")
    }, tiempo)

    return () => clearTimeout(timeoutId)
  }, [mensaje, mensajeExito, tiempo])

  return {
    mensaje,
    setMensaje,
    mensajeExito,
    setMensajeExito
  }
}

export default useMensajeTemporal