import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const UserOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrders = async () => {
        try {
                const token = localStorage.getItem('token'); 
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="mt-22 mb-10 p-4 md:p-0 md:py-4 max-w-4xl mx-auto">
            <div className="text-sm text-gray-500 mb-4">
                <span className="hover:underline cursor-pointer text-blue-600" onClick={() => navigate('/perfil')}>Sua conta</span>
                <span className="mx-1">›</span>
                <span className="text-gray-700">Meus Pedidos</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Meus Pedidos</h2>
            {orders.length === 0 ? (
                <p className='w-full h-100 bg-white'>Você ainda não comprou nada.</p>
            ) : (
                orders.map((order, index) => {
                    const total = order.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

                    return (
                        <div className='border rounded-lg border-gray-300 mb-6'>
                            <div className='block md:flex justify-between p-4 bg-gray-200 rounded-t-lg'>
                                <div className='flex justify-between gap-8 text-gray-600'>
                                    <div>
                                        <p className='text-sm'>PEDIDO REALIZADO</p>
                                        <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className='text-sm'>TOTAL</p>
                                        <p>{total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                    </div>
                                </div>
                                <p className="flex justify-start md:justify-end">
                                    <Link
                                        to={`/pedido/${order._id}`}
                                        className="text-blue-700 hover:text-gray-800 hover:underline pt-4 md:pt-0"
                                    >
                                        Resumo do pedido
                                    </Link>
                                </p>
                            </div>
                            <div key={index} className=" p-4">
                                <ul className="divide-y divide-gray-200">
                                    {order.items.map((item, i) => (
                                        <li key={i} className="py-2 flex justify-between items-center">
                                            <div className='flex items-center gap-4'>
                                                {item.productId?.image && (
                                                    <img
                                                        src={item.productId.image}
                                                        alt={item.productId.name}
                                                        className="w-20 h-20 object-contain mr-4"
                                                    />
                                                )}
                                                <div className=''>
                                                    {item.productId ? (
                                                        <Link
                                                            to={`/produtos/${item.productId._id}`}
                                                            className="font-medium text-blue-500 hover:underline"
                                                        >
                                                            {item.productId.name}
                                                        </Link>
                                                    ) : (
                                                        <p className="font-medium text-gray-500">Produto removido</p>
                                                    )}
                                                    <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                                                    <p className="text-sm text-gray-600">{(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default UserOrdersPage;
