import { useEffect, useState } from "react";
import axios from "axios";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";

const monthNames = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
];

function OrdersByAnualChart() {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Opções de anos recentes (5 anos)
    const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

    useEffect(() => {
        async function fetchYearData() {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/orders-by-month`, {
                headers: { Authorization: `Bearer ${token}` },
                params: { year }
            });

            // Mapeia para o formato do gráfico, preenchendo meses sem dados com 0
            const monthsData = Array(12).fill(0).map((_, i) => {
            const monthData = res.data.find(item => item._id.month === i + 1);
            return {
                month: monthNames[i],
                orders: monthData ? monthData.totalOrders : 0,
                revenue: monthData ? monthData.totalRevenue : 0,
            };
            });

            setData(monthsData);
        } catch (error) {
            console.error("Erro ao buscar dados anuais:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
        }

        fetchYearData();
    }, [year]);

    if (loading) return <p className="text-center mt-10">Carregando dados do ano {year}...</p>;

    return (
        <div className="mt-8 p-4 lg:w-2/3 mx-auto">
            <h1 className="text-2xl font-bold mb-4">Anual - {year}</h1>

            <div className="mb-6">
                <label htmlFor="year" className="block font-semibold mb-1">Ano</label>
                <select
                    id="year"
                    value={year}
                    onChange={e => setYear(Number(e.target.value))}
                    className="border rounded p-2"
                >
                    {yearOptions.map(y => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white p-4 rounded shadow">
                <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip
                            formatter={(value, name) => {
                                if (name === "Total") {
                                return [`${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, "Total"];
                                }
                                return [value, "Pedidos"];
                            }}
                        />
                        <Legend />
                        <Bar yAxisId="left" dataKey="orders" name="Pedidos" fill="#8884d8" />
                        <Bar yAxisId="right" dataKey="revenue" name="Total" fill="#10b981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default OrdersByAnualChart;
