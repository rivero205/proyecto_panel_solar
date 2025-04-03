"use client"

import { useState, useEffect } from "react"
import StationCard from "../components/StationCard"
import "./Estaciones.css"
import { endpoints } from "../config/api"

const Estaciones = () => {
  const [stations, setStations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch(endpoints.getLatestReadings);
        const data = await response.json();
        setStations(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stations:', error);
        setLoading(false);
      }
    };

    fetchStations();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchStations, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="estaciones-page">
      <div className="estaciones-header">
        <h1>Estaciones</h1>
      </div>

      {loading ? (
        <div className="loading">
          <div className="loading-sun">
            <div className="loading-sun-core"></div>
            <div className="loading-sun-rays"></div>
          </div>
          <p>Cargando estaciones...</p>
        </div>
      ) : (
        <>
          <div className="stations-grid">
            {stations.map((station) => (
              <StationCard key={station.id_estacion} station={station} />
            ))}
          </div>

          <div className="all-stations-section">
            <h2>Todas las Estaciones</h2>
            {/* Aquí podría ir una tabla con todas las estaciones y sus datos históricos */}
          </div>
        </>
      )}
    </div>
  )
}

export default Estaciones

