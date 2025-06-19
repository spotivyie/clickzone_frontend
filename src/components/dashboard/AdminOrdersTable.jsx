import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CheckCircle, Package, Truck } from "lucide-react";

const statusIcons = {
    pago: CheckCircle,
    enviado: Package,
    entregue: Truck,
}

function AdminOrdersCards({ orders, setOrders }) {
    const handleStatusChange = async (orderId, newStatus) => {
        try {
        const token = localStorage.getItem("token");
        await axios.put(
            `${import.meta.env.VITE_API_URL}/api/orders/${orderId}/status`,
            { status: newStatus },
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setOrders((prev) =>
            prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
        } catch (err) {
            alert("Erro ao atualizar status do pedido");
            console.error(err);
        }
    };

    return (
        <div className="grid gap-6">
            {orders.map((order) => (
                <div
                    key={order._id}
                    className="border rounded-lg p-4 shadow-sm bg-white flex flex-col md:flex-row md:justify-between md:items-center gap-4"
                >
                    <div className="space-y-1 text-sm md:w-1/2">
                        <p className="font-semibold">Pedido: {order._id}</p>
                        <p className="text-gray-600">Usuário: {order.userId?.name || "—"}</p>
                        <p className="text-gray-600">Data: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p className="text-gray-600">Total: {order.payment?.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>

                <div className="flex flex-col items-start gap-2 md:items-end md:text-right">
                    <div className="flex items-center gap-3">
                        <span className="capitalize font-medium">{order.status}</span>
                            <div className="flex gap-2">
                                {Object.entries(statusIcons).map(([statusKey, Icon]) => (
                                <Icon
                                    key={statusKey}
                                    size={22}
                                    className={`cursor-pointer transition-colors ${
                                    order.status === statusKey
                                        ? "text-green-600"
                                        : "text-gray-400 hover:text-green-700"
                                    }`}
                                    onClick={() => handleStatusChange(order._id, statusKey)}
                                    title={statusKey.charAt(0).toUpperCase() + statusKey.slice(1)}
                                />
                                ))}
                            </div>
                        </div>
                        <Link
                            to={`/pedido/${order._id}`}
                            className="mt-2 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                        >
                            Ver Pedido
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default AdminOrdersCards;
