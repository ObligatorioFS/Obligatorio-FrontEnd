import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import { store } from './store/store'
import DashboardAdmin from './features/admin/pages/DashboardAdmin'
import DashboardCliente from './features/cliente/pages/DashboardCliente'
import Login from './features/auth/pages/Login'
import Registro from './features/auth/pages/Registro'
import Layout from './features/shared/components/Layout'
import RutaNoEncontrada from './features/shared/components/RutaNoEncontrada'


function App() {


  return (
    <Provider store={store}>
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registro' element={<Registro />} />
        
        <Route path='/' element={<Layout />}>
           <Route path='/dashboardAdmin' element={<DashboardAdmin />} />
           <Route path='/dashboardCliente' element={<DashboardCliente />} />
           
          </Route>


         <Route path='*' element={<RutaNoEncontrada />} />
      </Routes>
    
      </BrowserRouter>
    </Provider>
  )
}

export default App
