"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import "./UserDistribution.css"

const UserDistribution = ({ data }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destruir el gráfico anterior si existe
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      // Colores vibrantes para el gráfico
      const colors = [
        "#4f8df9", // Azul brillante
        "#f9a94f", // Naranja brillante
        "#9c4ff9", // Púrpura brillante
      ]

      // Crear nuevo gráfico
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: data.labels,
          datasets: [
            {
              data: data.values,
              backgroundColor: colors,
              borderColor: "#1a1f2e",
              borderWidth: 2,
              hoverOffset: 10,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            animateRotate: true,
            animateScale: true,
            duration: 1500,
            easing: "easeOutQuart",
          },
          plugins: {
            legend: {
              position: "right",
              labels: {
                color: "#e0e0e0",
                padding: 15,
                boxWidth: 12,
                usePointStyle: true,
                pointStyle: "circle",
                font: {
                  size: 12,
                  weight: "normal",
                },
              },
            },
            tooltip: {
              backgroundColor: "rgba(15, 18, 25, 0.8)",
              titleColor: "#ffffff",
              bodyColor: "#e0e0e0",
              borderColor: "#4f8df9",
              borderWidth: 1,
              padding: 10,
              callbacks: {
                label: (context) => {
                  const label = context.label || ""
                  const value = context.raw || 0
                  const total = context.dataset.data.reduce((a, b) => a + b, 0)
                  const percentage = Math.round((value / total) * 100)
                  return `${label}: ${value} (${percentage}%)`
                },
              },
            },
          },
          cutout: "70%",
        },
      })
    }

    // Cleanup
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="user-distribution">
      <h2>Distribución de Usuarios</h2>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}

export default UserDistribution

