import { NavLink } from "react-router-dom"
import { Home, MapPin, Activity, Battery } from "react-feather"
import "./Sidebar.css"

const Sidebar = () => {
  const currentDate = new Date()
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
  const formattedTime = currentDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="sidebar">
      <div className="logo-container">
        <div className="logo">
          <div className="sun-icon">
            <div className="sun-core"></div>
            <div className="sun-rays"></div>
          </div>
        </div>
        <div className="logo-text">
          <h2>Panel Solar</h2>
          <p>Monitoreo de Estaciones</p>
        </div>
      </div>

      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/estaciones" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}>
          <MapPin size={20} />
          <span>Estaciones</span>
        </NavLink>
      </nav>

      <div className="metrics-section">
        <h3>MÉTRICAS</h3>
        <NavLink to="/metricas/voltaje" className="nav-item">
          <Activity size={20} />
          <span>Voltaje</span>
        </NavLink>
        <NavLink to="/metricas/baterias" className="nav-item">
          <Battery size={20} />
          <span>Baterías</span>
        </NavLink>
      </div>

      <div className="date-time-section">
        <div className="date">{formattedDate}</div>
        <div className="time">{formattedTime}</div>
      </div>
    </div>
  )
}

export default Sidebar

