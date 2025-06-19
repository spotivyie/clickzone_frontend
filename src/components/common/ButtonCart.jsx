import { useCart } from "../../context/CartContext";

function ButtonCart({ product }) {
    const { addToCart } = useCart();

    const handleClick = () => {
        if (product.stock > 0) {
            addToCart(product);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={product.stock <= 0}
            className={`rounded-2xl ring-1 w-max py-2 px-4 text-xs mb-1
                ${product.stock <= 0 ? "bg-white text-red-600 cursor-not-allowed" : "hover:bg-black hover:text-white"}
            `}
        >
            {product.stock <= 0 ? "Sem estoque" : "Adicionar ao carrinho"}
        </button>
    );
}

export default ButtonCart;
