import React from "react";
import useFetchOrders from "../../hooks/useFetchOrders";
import AdminOrdersTable from "../../components/dashboard/AdminOrdersTable"; 

function AdminOrdersPage() {
    const { orders, setOrders, loading, error } = useFetchOrders();

    if (loading) return <p className="p-4">Carregando pedidos...</p>;
    if (error) return <p className="p-4 text-red-600">{error}</p>;

    return (
        <div className="mt-22 mb-10 p-4 md:p-0 md:py-4 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Pedidos (Admin)</h2>

            {orders.length === 0 ? (
                <p className="w-full h-screen bg-white">Nenhum pedido encontrado.</p>
            ) : (
                <AdminOrdersTable orders={orders} setOrders={setOrders} />
            )}
        </div>
    );
}

export default AdminOrdersPage;
