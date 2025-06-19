import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const monthNames = [
  "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
  "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#A28DFF", "#8884d8", "#33CCFF", "#FF9933",
  "#66CC66", "#FF6666", "#9999FF", "#FFCC66"
];

function OrdersByMonthPieChart() {
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");

    axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/orders-by-month`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { year: currentYear },
    })
    .then((res) => {
      // Resposta tem formato: [{ _id: { month: 1 }, totalOrders, totalRevenue }, ...]
      // Criar array com 12 meses preenchidos com 0 caso não venha dados para algum mês
      const chartData = Array(12).fill(0).map((_, i) => {
        const monthData = res.data.find(item => item._id.month === i + 1);
        return {
          name: monthNames[i],
          orders: monthData ? monthData.totalOrders : 0,
          revenue: monthData ? monthData.totalRevenue : 0,
        };
      });

      setData(chartData);
    })
    .catch((error) => {
      console.error("Erro ao buscar pedidos do ano:", error);
      setData([]);
    })
    .finally(() => setLoading(false));
  }, [currentYear]);

  // Tooltip customizado para mostrar pedidos e valor formatado
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { orders, revenue, name } = payload[0].payload;
      return (
        <div className="bg-white p-2 border rounded border-gray-300 shadow">
          <p>{name}</p>
          <p className="text-indigo-400">Pedidos: {orders}</p>
          <p className="text-green-500">Total: {revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-8 p-4 lg:w-1/3 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Pedidos por Mês - {currentYear}</h1>

      {loading ? (
        <p>Carregando gráfico...</p>
      ) : data.length === 0 ? (
        <p>Sem dados para mostrar.</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="orders"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              fill="#8884d8"
              // label={({ name, percent }) =>
              //   `${name} ${(percent * 100).toFixed(0)}%`
              // }
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default OrdersByMonthPieChart;
