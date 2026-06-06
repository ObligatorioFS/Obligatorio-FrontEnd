import { BASE_URL } from "../api"
import { setCargandoClases, setClases } from "../../features/clasesSlice"

export const obtenerClases = ({
  dispatch,
  navigate,
  page = 1,
  limit = 5,
  dia = "",
  idActividad = "",
}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  })

  if (dia) {
    params.append("dia", dia)
  }

  if (idActividad) {
    params.append("idActividad", idActividad)
  }
  dispatch(setCargandoClases(true))
  fetch(`${BASE_URL}/clases?${params.toString()}`, {
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
      throw new Error(error.message || "Error al obtener las clases")
    })
    .then((data) => {
      dispatch(setClases(data))
    })
    .catch((error) => {
      console.error(error.message)
    }).finally(() => {dispatch(setCargandoClases(false))})
}