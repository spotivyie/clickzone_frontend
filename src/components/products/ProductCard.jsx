import { Link } from "react-router-dom";
import ButtonCart from "../common/ButtonCart";

function ProductCard({ product }) {
    return (
        <div className="flex flex-col gap-4 h-full border rounded border-gray-200 p-2">
            <Link to={`/produtos/${product._id}`}>
                <div className="aspect-square bg-white rounded overflow-hidden flex items-center justify-center">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>
                <div className="items-center mt-2">
                    <h2 className="font-medium truncate">{product.name}</h2>
                    <p className="text-gray-600 font-semibold flex items-baseline gap-1">
                        <span className="text-xs">R$</span>
                        <span className="text-lg">{product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </p>
                </div>
            </Link>
            <div className="mt-2">
                <ButtonCart product={product} disabled={product.stock <= 0} />
            </div>
        </div>
    );
}

export default ProductCard;
