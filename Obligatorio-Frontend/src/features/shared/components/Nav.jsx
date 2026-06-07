import { useNavigate } from "react-router";
import "../styles/Nav.css";

const Nav = () => {
  const navigate = useNavigate();
  const rol = localStorage.getItem("rolUsu");
  const esAdmin = rol === "admin";
  const nombre = localStorage.getItem('nombreUsu') || 'Usuario'
  const handleOnClickCerrarSesion = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className={`dashboard-header ${esAdmin ? "theme-admin" : "theme-client"}`}>
      <div className="brand-mark">
        <span>CA</span>

        <div>
          <strong>Club Activo</strong>
          <small>{esAdmin ? "Panel Admin" : `Hola, ${nombre}`}</small>
        </div>
      </div>

      <div>
        <button
          className="logout-btn"
          type="button"
          onClick={handleOnClickCerrarSesion}
        >
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Nav;
