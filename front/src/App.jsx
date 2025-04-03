import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Sidebar from "./components/Sidebar"
import Dashboard from "./pages/Dashboard"
import Estaciones from "./pages/Estaciones"

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/estaciones" element={<Estaciones />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

