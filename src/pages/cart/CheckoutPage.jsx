import { useState } from "react";
import { useNavigate } from "react-router-dom";
//context
import { useCart } from "../../context/CartContext";
//stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
//components
import CheckoutForm from "../../components/cart/CheckoutForm";
import ShippingAddress from "../../components/shipping/ShippingAddress";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutPage() {
    const { cartItems, cartCount } = useCart();
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        street: "",
        city: "",
        state: "",
        zip: "",
    });

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    // Função chamada pelo CheckoutForm em caso de sucesso no pagamento cartão
    const handleCardPaymentSuccess = (orderId) => {
        navigate(`/pedido/${orderId}/confirmado`);
    };

    return (
        <div className="max-w-6xl mx-auto mt-22 mb-10 p-4">
            <h1 className="text-3xl font-bold mb-4">Finalizar Compra</h1>
            <p className="mb-6 text-gray-600">Você tem {cartCount} item(s) no carrinho.</p>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Esquerda: Endereço + Pagamento */}
                <div className="flex-1 space-y-6">
                    <ShippingAddress address={address} onChange={handleChange} />

                    <div>
                        <h2 className="text-xl font-semibold mb-3">Forma de Pagamento</h2>
                        <div className="mt-4">
                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    amount={totalPrice}
                                    address={address}
                                    cartItems={cartItems}
                                    onPaymentSuccess={handleCardPaymentSuccess}
                                />
                            </Elements>
                        </div>
                    </div>
                </div>

                {/* Direita: Resumo do pedido */}
                <div className="w-full lg:w-1/3 space-y-4 bg-white p-6 rounded-xl shadow-md h-fit">
                    <h2 className="text-xl font-semibold">Resumo do Pedido</h2>
                    <p className="text-gray-600">Itens no carrinho: {cartCount}</p>
                    <div className="text-lg">
                        Total: <span className="font-bold">R$ {totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
