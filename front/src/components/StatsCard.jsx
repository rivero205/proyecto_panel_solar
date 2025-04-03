import { Battery, Activity, Users } from "react-feather"
import "./StatsCard.css"

const StatsCard = ({ title, value, description, icon }) => {
  const getIcon = () => {
    switch (icon) {
      case "sun":
        return (
          <div className="animated-sun-container">
            <div className="animated-sun">
              <div className="sun-core"></div>
              <div className="sun-rays"></div>
            </div>
          </div>
        )
      case "battery":
        return <Battery className="stats-icon battery" />
      case "activity":
        return <Activity className="stats-icon activity" />
      case "users":
        return <Users className="stats-icon users" />
      default:
        return null
    }
  }

  return (
    <div className="stats-card">
      <div className="stats-content">
        <h3>{title}</h3>
        <div className="stats-value">{value}</div>
        <p>{description}</p>
      </div>
      <div className="stats-icon-container">{getIcon()}</div>
    </div>
  )
}

export default StatsCard

