import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import useOrderDetails from "../../hooks/useOrderDetails";
import { useEffect } from "react";
import { CreditCard } from "lucide-react";

const OrderConfirmationPage = () => {
    const { orderId } = useParams();
    const { clearCart } = useCart();
    const navigate = useNavigate();
    const { order, loading } = useOrderDetails(orderId, clearCart);

    useEffect(() => {
        clearCart();
    }, [clearCart]);

    if (loading) return <p className="p-4">Carregando pedido...</p>;
    if (!order) return <p className="p-4 text-red-500">Pedido não encontrado.</p>;

    return (
        <div className="mt-22 mb-10 p-4 md:p-0 md:py-4 max-w-4xl mx-auto">
            <div className="text-sm text-gray-500 mb-4">
                <span className="hover:underline cursor-pointer text-blue-600" onClick={() => navigate('/')}>Início</span>
                <span className="mx-1">›</span>
                <span className="text-gray-700">Confirmação do pedido</span>
            </div>

            <h2 className="text-3xl font-bold mb-4 text-green-600">Pedido confirmado!</h2>
            <p className="mb-6 text-gray-700">Obrigado pela sua compra! Aqui estão os detalhes do seu pedido:</p>

            <div className="flex gap-6 text-sm text-gray-700 mb-4">
                <p>Pedido feito em: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p>Status do pedido: <span className="font-medium">{order.status}</span></p>
            </div>

            <div className="mt-6 border rounded border-gray-300 p-4">
                <h3 className="text-2xl font-semibold mb-4">Produtos</h3>
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

            <div className="flex gap-10 md:gap-20 mt-4 mb-6 border rounded border-gray-300 p-4">
                <div>
                    <h3 className="text-2xl font-semibold pb-2">Endereço de Entrega</h3>
                    <p>{order.shipping.address}</p>
                    <p>{order.shipping.city}</p>
                    <p>{order.shipping.state}</p>
                    <p>CEP: {order.shipping.zip}</p>
                </div>

                <div>
                    <h3 className="text-2xl font-semibold pb-2">Método de Pagamento</h3>
                    <div className="flex items-center mb-1">
                        <CreditCard size={20} />
                        <p className="pl-1">
                            {order.payment.method === "card" ? "Cartão" : order.payment.method.toUpperCase()}
                        </p>
                    </div>
                    <p>Total: <span className="font-bold">{order.payment.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></p>
                </div>
            </div>

            <button
                onClick={() => navigate('/')}
                className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            >
                Voltar para loja
            </button>
        </div>
    );
};

export default OrderConfirmationPage;
