import { Link } from "react-router-dom";
//context
import { useCart } from "../../context/CartContext";
//hooks
import useRequireAuth from "../../hooks/useRequireAuth"; 

function CartPage() {
    const { cartItems, addToCart, removeFromCart, decreaseQuantity, cartCount } = useCart();

    useRequireAuth(); 

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (cartItems.length === 0)
        return (
            <p className="mt-30 mb-10 w-full h-140 bg-white p-4 max-w-6xl mx-auto text-center">
                Seu carrinho está vazio.
            </p>
        );

    return (
        <div className="mt-22 mb-22 w-full bg-white p-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-8">Meu Carrinho ({cartCount} itens)</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Lista de produtos */}
                <div className="flex-1">
                    <ul>
                        {cartItems.map((item) => (
                            <li
                                key={item._id}
                                className="flex justify-between items-center mb-4 border p-4 rounded"
                            >
                                <div className="flex items-start gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-20 object-cover rounded-md"
                                    />  
                                    <div>
                                        <h2 className="font-semibold">{item.name}</h2>
                                        <p>R$ {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() => decreaseQuantity(item._id)}
                                                className="px-2 bg-gray-200 rounded"
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                onClick={() => addToCart({ ...item, quantity: 1 })}
                                                className="px-2 bg-gray-200 rounded"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-600 hover:text-red-800 font-semibold"
                                >
                                    Remover
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Total e botão */}
                <div className="w-full lg:w-1/3 border p-6 rounded shadow-md h-fit">
                    <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
                    <div className="text-lg mb-4">
                        Total: <span className="font-bold">{totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </div>
                    <Link to="/checkout">
                        <button className="w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
                            Finalizar Compra
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
