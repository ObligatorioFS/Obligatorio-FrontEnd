import ActividadesRegistradas from "./ActividadesRegistradas"
import RutinasPendientes from "./RutinasPendientes"
import SalasRegistradas from "./SalasRegistradas"
import "../styles/AdministracionRapida.css"


const AdministracionRapida = () => {
  return (
    <section className="quick-admin-grid">
      
      <SalasRegistradas />
      <ActividadesRegistradas />
      <RutinasPendientes />
  
    </section>
  )
}

export default AdministracionRapida
