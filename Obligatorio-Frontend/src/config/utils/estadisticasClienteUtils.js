import { BASE_URL } from "../api"
import { setCargandoEstadisticas, setEstadisticasCliente } from "../../features/estadisticasSlice"

export const obtenerEstadisticasCliente = (dispatch, navigate) => {
  dispatch(setCargandoEstadisticas(true))
  fetch(`${BASE_URL}/estadisticas/cliente`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  })
    .then(async (res) => {
      if (res.ok) {
        return res.json()
      }

      if (res.status === 401) {
        localStorage.removeItem("token")
        navigate("/login")
        return
      }

      const error = await res.json()
      throw new Error(error.message || "Error al obtener estadisticas")
    })
    .then((data) => {
      if (data) {
        dispatch(setEstadisticasCliente(data))
      }
    })
    .catch((error) => console.error(error.message)).finally(() => dispatch(setCargandoEstadisticas(false)))
}
