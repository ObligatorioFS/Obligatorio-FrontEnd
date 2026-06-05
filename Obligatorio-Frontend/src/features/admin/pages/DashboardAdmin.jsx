import '../styles/DashboardAdmin.css'
import { useNavigate } from 'react-router'
import { useEffect} from 'react'
import Banner from '../../shared/components/Banner'
import EstadisticasAdmin from '../components/EstadisticasAdmin'
import FormularioGestion from '../components/FormularioGestion'
import ClasesRegistradas from '../components/ClasesRegistradas'
import AdministracionRapida from '../components/AdministracionRapida'
import GraficoAdmin from '../components/GraficoAdmin'


const DashboardAdmin = () => {
   
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
  <div className="dashboard theme-admin">
    <main className="main-content">
      <Banner />
      <EstadisticasAdmin />
      <GraficoAdmin />
      <FormularioGestion />
      <ClasesRegistradas  />
      <AdministracionRapida />
    </main>
  </div>
  )
}

export default DashboardAdmin
