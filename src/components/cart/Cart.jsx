import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

function Navbar() {
    const { cartCount } = useCart();

    return (
        <div className="text-white">
            <Link to="/carrinho" className="relative">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartCount}
                    </span>
                )}
            </Link>
        </div>
    );
}

export default Navbar;
