"use client"

import { useState, useEffect } from "react"
import StatsCard from "../components/StatsCard"
import ChartSection from "../components/ChartSection"
import UserDistribution from "../components/UserDistribution"
import "./Dashboard.css"
import { endpoints } from "../config/api"

const Dashboard = () => {
  // Estado para almacenar los datos simulados
  const [dashboardData, setDashboardData] = useState({
    estacionesActivas: 0,
    totalEstaciones: 0,
    nivelPromedioBateria: 0,
    potenciaPromedio: 0,
    usuariosTotales: 0,
    chartData: {
      labels: [],
      voltaje: [],
      potencia: [],
    },
    userDistribution: {
      labels: [],
      values: [],
    },
  })

  // Simular carga de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener todas las lecturas para tener datos históricos
        const response = await fetch(endpoints.getAllData);
        const data = await response.json();
        
        // Obtener las últimas lecturas para cada estación
        const latestReadingsResponse = await fetch(endpoints.getLatestReadings);
        const latestData = await latestReadingsResponse.json();

        // Procesar datos actuales
        const estacionesActivas = latestData.filter(station => station.luz_solar === 1).length;
        const totalEstaciones = latestData.length;
        const nivelPromedioBateria = latestData.reduce((acc, curr) => acc + parseFloat(curr.estado_carga), 0) / totalEstaciones;
        const potenciaPromedio = latestData.reduce((acc, curr) => acc + parseFloat(curr.potencia_almacenada), 0) / totalEstaciones;
        const usuariosTotales = latestData.reduce((acc, curr) => acc + parseInt(curr.usuarios_totales), 0);

        // Preparar datos para la distribución de usuarios
        const userDistribution = {
          labels: latestData.map(station => station.id_estacion),
          values: latestData.map(station => station.usuarios_totales),
        };

        // Procesar datos históricos para la gráfica
        // Obtener las últimas 12 lecturas ordenadas por fecha
        const last12Hours = data
          .sort((a, b) => new Date(b.fecha_registro) - new Date(a.fecha_registro))
          .slice(0, 12)
          .reverse();

        const chartData = {
          labels: last12Hours.map(reading => {
            const date = new Date(reading.fecha_registro);
            return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
          }),
          voltaje: last12Hours.map(reading => parseFloat(reading.voltaje_panel)),
          potencia: last12Hours.map(reading => parseFloat(reading.potencia_almacenada)),
        };

        setDashboardData({
          estacionesActivas,
          totalEstaciones,
          nivelPromedioBateria: Math.round(nivelPromedioBateria),
          potenciaPromedio: Math.round(potenciaPromedio),
          usuariosTotales,
          chartData,
          userDistribution,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchData();
    // Actualizar cada 5 minutos
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-container">
        <StatsCard
          title="Estaciones Activas"
          value={`${dashboardData.estacionesActivas} / ${dashboardData.totalEstaciones}`}
          description="Estaciones recibiendo luz solar"
          icon="sun"
        />
        <StatsCard
          title="Nivel Promedio de Batería"
          value={`${dashboardData.nivelPromedioBateria}%`}
          description="Promedio de todas las estaciones"
          icon="battery"
        />
        <StatsCard
          title="Potencia Promedio"
          value={`${dashboardData.potenciaPromedio}W`}
          description="Potencia almacenada promedio"
          icon="activity"
        />
        <StatsCard
          title="Usuarios Totales"
          value={dashboardData.usuariosTotales}
          description="Personas utilizando la energía"
          icon="users"
        />
      </div>

      <div className="charts-container">
        <ChartSection title="Voltaje y Potencia (Últimas 12 horas)" data={dashboardData.chartData} />
        <UserDistribution data={dashboardData.userDistribution} />
      </div>
    </div>
  )
}

export default Dashboard

