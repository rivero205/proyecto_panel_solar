import "./StationCard.css"

const StationCard = ({ station }) => {
  const {
    id_estacion,
    fecha_registro,
    voltaje_bateria,
    estado_carga,
    luz_solar,
    voltaje_panel,
    potencia_almacenada,
    usuarios_totales,
  } = station

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}:00`
  }

  // Determinar color de la barra de batería
  const getBatteryColor = (percentage) => {
    if (percentage >= 70) return "green"
    if (percentage >= 40) return "yellow"
    return "red"
  }

  // Determinar color de la barra de potencia
  const getPowerColor = (power) => {
    if (power >= 180) return "yellow"
    if (power >= 150) return "yellow"
    return "yellow"
  }

  return (
    <div className="station-card">
      <div className="station-header">
        <h2>{id_estacion}</h2>
        <p>Última actualización: {formatDate(fecha_registro)}</p>
      </div>

      <div className="station-details">
        <div className="battery-status">
          <h3>Estado de Batería</h3>
          <div className="battery-percentage">{estado_carga}%</div>
          <p>Voltaje: {voltaje_bateria}V</p>
          <div className="progress-bar">
            <div
              className={`progress-fill ${getBatteryColor(estado_carga)}`}
              style={{ width: `${estado_carga}%` }}
            ></div>
          </div>
        </div>

        <div className="panel-status">
          <h3>Panel Solar</h3>
          <div className="status-indicator">
            {luz_solar ? (
              <>
                <div className="animated-sun-container">
                  <div className="animated-sun">
                    <div className="sun-core"></div>
                    <div className="sun-rays"></div>
                  </div>
                </div>
                <span className="status-text active">Activo</span>
              </>
            ) : (
              <>
                <div className="moon-icon-container">
                  <div className="moon-icon"></div>
                </div>
                <span className="status-text inactive">Inactivo</span>
              </>
            )}
          </div>
          <p>Voltaje: {voltaje_panel}V</p>
          <p>Potencia: {potencia_almacenada}W</p>
          <div className="progress-bar">
            <div
              className={`progress-fill ${getPowerColor(potencia_almacenada)}`}
              style={{ width: `${(potencia_almacenada / 200) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="users-section">
        <h3>Usuarios Totales</h3>
        <div className="users-count">{usuarios_totales}</div>
        <p>Personas utilizando la energía</p>
      </div>
    </div>
  )
}

export default StationCard

