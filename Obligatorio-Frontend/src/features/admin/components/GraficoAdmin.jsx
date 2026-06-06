import { Bar } from "react-chartjs-2"
import { useSelector } from "react-redux"
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js"
import "../styles/GraficoAdmin.css"

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)

const GraficoAdmin = () => {
  const ocupacionPorDia = useSelector(
    state => state.estadisticas.estadisticas.ocupacionPorDia
  ) || []
  const cargando = useSelector(state => state.estadisticas.cargando)

  const capitalizar = texto => {
    if (!texto) return "Sin dia"
    return texto.charAt(0).toUpperCase() + texto.slice(1)
  }

  const data = {
    labels: ocupacionPorDia.map(item => capitalizar(item.dia)),
    datasets: [
      {
        label: "Ocupacion diaria",
        data: ocupacionPorDia.map(item => item.ocupacion),
        backgroundColor: [
          "#2563eb",
          "#16803c",
          "#b45309",
          "#7c3aed",
          "#0891b2",
          "#be123c",
        ],
        borderSkipped: false,
        borderRadius: 8,
        barThickness: 26,
      },
    ],
  }

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#172033",
        padding: 12,
        titleFont: {
          weight: "800",
        },
        bodyFont: {
          weight: "700",
        },
        callbacks: {
          label: context => {
            const item = ocupacionPorDia[context.dataIndex]
            const detalleCupos = item?.capacidad
              ? ` (${item.ocupados || 0}/${item.capacidad} cupos)`
              : ""

            return `${context.raw}% de ocupacion${detalleCupos}`
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "rgba(83, 97, 121, 0.14)",
        },
        ticks: {
          callback: value => `${value}%`,
          color: "#536179",
          font: {
            weight: "700",
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#172033",
          font: {
            weight: "800",
          },
        },
      },
    },
  }

  return (
    <section className="panel grafico-admin">
      <div className="panel-header">
        <div>
          <h2>Ocupacion por dia</h2>
          <p>Porcentaje de cupos ocupados segun la capacidad de cada dia.</p>
        </div>
      </div>

      <div className="grafico-admin__chart">
        {cargando ? (
          <div className="grafico-admin__loading">
            <span className="spinner" />
            <p>Cargando estadisticas...</p>
          </div>
        ) : (
          <Bar data={data} options={options} />
        )}
      </div>
    </section>
  )
}

export default GraficoAdmin
