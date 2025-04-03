import { Search, Bell } from "react-feather"
import "./SearchBar.css"

const SearchBar = () => {
  const currentDate = new Date()
  const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`
  const formattedTime = currentDate.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className="search-bar">
      <div className="search-container">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Buscar estación..." />
      </div>
      <div className="right-section">
        <div className="notification-icon">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </div>
        <div className="date-time">
          <div className="date">{formattedDate}</div>
          <div className="time">{formattedTime}</div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar

