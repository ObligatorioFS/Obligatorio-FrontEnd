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
  const clases = useSelector(state => state.clases.clases)

  //Hay que hacer un endopint para estadisticas, sino muestra solo lo que tenemos en react
  //Y no lo que esta en la base de datos, que es lo que realmente queremos mostrar
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado"]
  const etiquetas = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]

  const clasesPorDia = dias.map(dia => {
    return clases.filter(clase => clase.dia === dia).length
  })

  const data = {
    labels: etiquetas,
    datasets: [
      {
        label: "Clases",
        data: clasesPorDia,
        backgroundColor: "#2563eb",
        borderRadius: 7,
        barThickness: 34,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: context => `${context.raw} clases`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  return (
    <section className="panel grafico-admin">
      <div className="panel-header">
        <div>
          <h2>Clases por dia</h2>
          <p>Distribucion semanal de clases registradas.</p>
        </div>
      </div>

      <div className="grafico-admin__chart">
        <Bar data={data} options={options} />
      </div>
    </section>
  )
}

export default GraficoAdmin
