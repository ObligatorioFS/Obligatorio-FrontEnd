import { useEffect } from 'react'
import '../styles/DashboardCliente.css'
import { useNavigate } from 'react-router'
import EstadisticasCliente from '../components/EstadisticasCliente'
import BannerCliente from '../components/BannerCliente'
import ClasesDisponibles from '../components/ClasesDisponibles'
import SolicitarRutina from '../components/SolicitarRutina'
import MisRutinas from '../components/MisRutinas'
import MisClases from '../components/MisClases'

const DashboardCliente = () => {

   const navigate = useNavigate()
  
     useEffect(() => {
          if (!localStorage.getItem('token')) {
              //redirijo como?
              //hook de useNavigate
              navigate("/login")
              return
          }
      }, [])

  return (
    <div className="dashboard theme-client">
      <main className="main-content">
        <BannerCliente />
        <EstadisticasCliente />
        <ClasesDisponibles />
        <SolicitarRutina />
        <MisRutinas/>
        <MisClases/>
      </main>
    </div>
  )
}

export default DashboardCliente
