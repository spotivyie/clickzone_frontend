import { useEffect, useState } from "react"; 
import axios from "axios";
import OrdersByMonthChart from "../../components/dashboard/OrdersByMonthChart ";
import OrdersByAnualChart from "../../components/dashboard/OrdersByAnualChart";
import OrdersByMonthPieChart from "../../components/dashboard/OrdersByMonthPieChart";

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        async function fetchStats() {
        setLoadingStats(true);
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/dashboard/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setStats(res.data);
        } catch (error) {
            console.error("Erro ao buscar estatísticas:", error);
        } finally {
            setLoadingStats(false);
        }
        }
        fetchStats();
    }, []);

    if (loadingStats) return <p className="text-center mt-22">Carregando dados do painel...</p>;
    if (!stats) return <p className="text-center mt-22 text-red-500">Erro ao carregar dados.</p>;

    return (
        <div className="mt-22 mb-10 p-4 md:p-0 md:py-4 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Dashboard do Admin</h1>

            {/* Estatísticas gerais */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-gray-500">Usuários</p>
                    <p className="text-xl font-bold">{stats.users ?? 0}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-gray-500">Produtos</p>
                    <p className="text-xl font-bold">{stats.products ?? 0}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-gray-500">Pedidos</p>
                    <p className="text-xl font-bold">{stats.orders ?? 0}</p>
                </div>
                <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-gray-500">Total em Vendas</p>
                    <p className="text-xl font-bold">{stats.revenue?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) ?? "0.00"}</p>
                </div>
            </div>

            {/* Gráfico pedidos do mês e ano selecionados */}
            <OrdersByMonthChart />
            <div className="lg:flex">
                <OrdersByAnualChart  />
                <OrdersByMonthPieChart/>
            </div>
        </div>
    );
}

export default AdminDashboard;
