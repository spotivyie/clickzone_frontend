import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CreditCard } from "lucide-react";

const OrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setOrder(res.data);
            } catch (err) {
                console.error("Erro ao buscar detalhes do pedido:", err);
            }
        };

        fetchOrder();
    }, [id]);

    if (!order) return <p className="p-4">Carregando...</p>;

    return (
        <div className="mt-22 mb-10 p-4 md:p-0 md:py-4 max-w-4xl mx-auto">
            <div className="text-sm text-gray-500 mb-4">
                <span className="hover:underline cursor-pointer text-blue-600" onClick={() => navigate('/conta')}>Sua conta</span>
                <span className="mx-1">›</span>
                <span className="hover:underline cursor-pointer text-blue-600" onClick={() => navigate('/userOrder')}>Meus pedidos</span>
                <span className="mx-1">›</span>
                <span className="text-gray-700">Detalhes do pedido</span>
            </div>

            <h2 className="text-3xl font-bold mb-4">Detalhes do Pedido</h2>
            <div className="flex gap-6 ">
                <p className="text-gray-700">Pedido feito em: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="text-gray-700">Status do pedido: {order.status}</p>
            </div>

            <div className="mt-6 border rounded border-gray-300 p-4">
                <h3 className="text-2xl font-semibold">Produtos</h3>
                <ul className="divide-y divide-gray-200">
                    {order.items.map((item) => (
                        <li key={item._id} className="py-4 flex items-center gap-4">
                            <img src={item.productId.image} alt={item.productId.name} className="w-20 h-20 object-contain" />
                            <div className="flex-1">
                                <p className="font-medium">{item.productId.name}</p>
                                <p className="text-sm">Quantidade: {item.quantity}</p>
                                <p className="font-semibold pt-4">{(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="flex gap-10 md:gap-20 mt-2 mb-2 border rounded border-gray-300 p-4">
                <div>
                    <h3 className="text-2xl font-semibold pb-2">Endereço de Entrega</h3>
                    <p>{order.shipping.address}</p>
                    <p>{order.shipping.city}</p>
                    <p>{order.shipping.state}</p>
                    <p>{order.shipping.zip}</p>
                </div>   

                <div>
                    <h3 className="text-2xl font-semibold pb-2">Método de Pagamento</h3>
                    <div className="flex items-center">
                        <CreditCard size={20}/>
                        <p className="pl-1">{order.payment.method === "card" ? "Cartão" : order.payment.method}</p>
                    </div>
                    <p>Total: R$ <span className="font-bold">{order.payment.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></p>
                </div>
            </div>
                
        </div>
    );
};

export default OrderDetailsPage;
