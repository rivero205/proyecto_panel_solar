"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"
import { registerables } from "chart.js"
import "./ChartSection.css"

// Registrar componentes necesarios de Chart.js
Chart.register(...registerables)

// Gradientes personalizados para los gráficos
const createGradient = (ctx, colorStart, colorEnd) => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, colorStart)
  gradient.addColorStop(1, colorEnd)
  return gradient
}

const ChartSection = ({ title, data }) => {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      // Destruir el gráfico anterior si existe
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      const ctx = chartRef.current.getContext("2d")

      // Crear gradientes
      const voltageGradient = createGradient(ctx, "rgba(79, 141, 249, 0.6)", "rgba(79, 141, 249, 0.05)")
      const powerGradient = createGradient(ctx, "rgba(249, 169, 79, 0.6)", "rgba(249, 169, 79, 0.05)")

      // Crear nuevo gráfico
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Voltaje (V)",
              data: data.voltaje,
              borderColor: "#4f8df9",
              backgroundColor: voltageGradient,
              borderWidth: 2,
              pointBackgroundColor: "#4f8df9",
              pointBorderColor: "#fff",
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.4,
              fill: true,
              yAxisID: "y",
            },
            {
              label: "Potencia (W)",
              data: data.potencia,
              borderColor: "#f9a94f",
              backgroundColor: powerGradient,
              borderWidth: 2,
              pointBackgroundColor: "#f9a94f",
              pointBorderColor: "#fff",
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.4,
              fill: true,
              yAxisID: "y1",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: "easeOutQuart",
          },
          plugins: {
            legend: {
              position: "top",
              align: "end",
              labels: {
                boxWidth: 12,
                usePointStyle: true,
                pointStyle: "circle",
                color: "#e0e0e0",
                font: {
                  size: 12,
                  weight: "normal",
                },
                padding: 15,
              },
            },
            tooltip: {
              mode: "index",
              intersect: false,
              backgroundColor: "rgba(15, 18, 25, 0.8)",
              titleColor: "#ffffff",
              bodyColor: "#e0e0e0",
              borderColor: "#4f8df9",
              borderWidth: 1,
              padding: 10,
              displayColors: true,
              callbacks: {
                label: (context) => {
                  let label = context.dataset.label || ""
                  if (label) {
                    label += ": "
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y
                  }
                  return label
                },
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: "#a0a0a0",
                font: {
                  size: 10,
                },
                maxRotation: 0,
              },
            },
            y: {
              type: "linear",
              display: true,
              position: "left",
              title: {
                display: true,
                text: "Voltaje (V)",
                color: "#4f8df9",
                font: {
                  size: 12,
                  weight: "normal",
                },
              },
              grid: {
                color: "rgba(255, 255, 255, 0.05)",
              },
              ticks: {
                color: "#a0a0a0",
                font: {
                  size: 10,
                },
              },
            },
            y1: {
              type: "linear",
              display: true,
              position: "right",
              title: {
                display: true,
                text: "Potencia (W)",
                color: "#f9a94f",
                font: {
                  size: 12,
                  weight: "normal",
                },
              },
              grid: {
                drawOnChartArea: false,
              },
              ticks: {
                color: "#a0a0a0",
                font: {
                  size: 10,
                },
              },
            },
          },
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
    <div className="chart-section">
      <h2>{title}</h2>
      <div className="chart-container">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}

export default ChartSection

