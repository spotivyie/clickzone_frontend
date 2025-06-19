import { createContext, useContext, useRef, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const alreadyAlertedRef = useRef(false); // controle de alerta

    const addToCart = (product) => {
        setCartItems((prev) => {
            const exists = prev.find((item) => item._id === product._id);
            const quantityToAdd = product.quantity || 1;

            if (exists) {
                const newQuantity = exists.quantity + quantityToAdd;

                // Verifica se vai ultrapassar o estoque
                if (newQuantity > exists.stock) {
                    if (!alreadyAlertedRef.current) {
                        alert("Você atingiu o limite de estoque disponível.");
                        alreadyAlertedRef.current = true;

                        // Reseta após um pequeno delay, pode ser ajustado
                        setTimeout(() => {
                            alreadyAlertedRef.current = false;
                        }, 1000);
                    }
                    return prev;
                }

                return prev.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            }

            // Garante que o novo item tenha a propriedade stock
            return [...prev, { ...product, quantity: quantityToAdd }];
        });
    };


    const removeFromCart = (id) => {
        setCartItems((prev) => prev.filter((item) => item._id !== id));
    };

    const decreaseQuantity = (id) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item._id === id
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
                    : item
            )
        );
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                decreaseQuantity,
                clearCart,
                cartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
