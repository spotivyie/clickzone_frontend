import { useEffect, useState } from "react";
import axios from "axios";
import {
    ResponsiveContainer,
    AreaChart,
    XAxis,
    YAxis,
    Tooltip,
    Area,
} from "recharts";

const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

function OrdersByMonthChart() {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    const [year, setYear] = useState(currentYear);
    const [month, setMonth] = useState(currentMonth);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

    useEffect(() => {
        if (!year || !month) return;

        setLoading(true);
        const token = localStorage.getItem("token");

        axios
        .get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/orders/list-by-month`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { year, month },
        })
        .then((res) => {
            const dailyCounts = {};

            res.data.forEach((order) => {
                const day = new Date(order.createdAt).getDate();
                dailyCounts[day] = (dailyCounts[day] || 0) + 1;
            });

            const daysInMonth = new Date(year, month, 0).getDate();
            const chartData = [];

            for (let day = 1; day <= daysInMonth; day++) {
            chartData.push({
                day: day.toString(),
                orders: dailyCounts[day] || 0,
            });
            }

            setData(chartData);
        })
        .catch((error) => {
            console.error("Erro ao buscar pedidos do mês:", error);
            setData([]);
        })
        .finally(() => setLoading(false));
    }, [year, month]);

    return (
        <div className="mt-8 p-4 max-w-6xl mx-auto">
            {/* Seletor de ano e mês */}
            <h1 className="text-2xl font-bold mb-4">Mensal - {monthNames[month - 1]}</h1>
            <div className="flex gap-4 mb-6">
                <div>
                    <label htmlFor="year" className="block font-semibold mb-1">Ano</label>
                    <select
                        id="year"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        className="border rounded p-2"
                    >
                        {yearOptions.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="month" className="block font-semibold mb-1">Mês</label>
                    <select
                        id="month"
                        value={month}
                        onChange={(e) => setMonth(Number(e.target.value))}
                        className="border rounded p-2"
                    >
                        {monthNames.map((name, i) => (
                            <option key={i} value={i + 1}>{name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Gráfico */}
            <div className="bg-white p-4 rounded shadow mt-6">
                <h2 className="text-lg font-semibold mb-4">
                    Pedidos em {monthNames[month - 1]}/{year}
                </h2>

                {loading ? (
                    <p>Carregando gráfico...</p>
                ) : data.length === 0 ? (
                    <p>Sem dados para mostrar.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="day"/>
                        <YAxis />
                        <Tooltip  
                            formatter={(value, name) => [`${value}`, name]}
                            labelFormatter={(label) => `Dia ${label}`}
                        />
                        <Area
                            type="monotone"
                            dataKey="orders"
                            name="Pedidos"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorOrders)"
                        />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>
        </div>
    );
}

export default OrdersByMonthChart;
