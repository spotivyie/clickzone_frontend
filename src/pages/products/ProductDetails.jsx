import { useParams } from "react-router-dom";
import { useState, useEffect, React } from "react";
//page
import AddReviewPage from "./AddReviewPage.jsx";
//components
import Add from "../../components/cart/QuantityProduct.jsx";
import ReviewList from "../../components/review/ReviewList.jsx";
import ProductDescription from "../../components/products/ProductDescription.jsx";
import ProductImages from "../../components/products/ProductImages.jsx";
import ReviewSummary from "../../components/review/ReviewSummary.jsx";
//hooks
import useProductWithReviews from "../../hooks/useProductWithReviews.jsx";
import useAuthLocalStorage from "../../hooks/useAuthLocalStorage.jsx";

function ProductDetails() {
    const { id } = useParams();
    const { product, reviews, setReviews, loading } = useProductWithReviews(id);
    const { token: userToken, userId } = useAuthLocalStorage();
    console.log("Token atual:", userToken);
    console.log("UserId atual:", userId);

    // Estado para controlar a imagem selecionada, inicializa quando o produto mudar
    const [selectedImage, setSelectedImage] = useState(null);

    // Atualiza selectedImage quando o produto for carregado/alterado
    useEffect(() => {
        if (product) {
            setSelectedImage(
                Array.isArray(product.image) ? product.image[0] : product.image
            );
        }
    }, [product]);

    const addReviewToList = (newReview) => {
        setReviews((prev) => [newReview, ...prev]);
    };

    if (loading) return <p className="text-center mt-10">Carregando produto...</p>;
    if (!product) return <p className="text-center mt-10 text-red-500">Produto não encontrado.</p>;

    return (
        <div className="py-16 max-w-6xl mx-auto">
            <div className="px-4 md:px-0 mt-10 md:mt-22 flex flex-col lg:flex-row gap-12 lg:gap-20">
                {/* Imagem */}
                <div className="w-full lg:w-1/2 lg:sticky top-20">
                    <ProductImages
                        images={Array.isArray(product.image) ? product.image : [product.image]}
                        name={product.name}
                        selectedImage={selectedImage}
                        onSelectImage={setSelectedImage}
                    />
                </div>

                {/* Detalhes */}
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-700 text-sm">
                        Categoria: <span className="font-medium text-gray-800">{product.category}</span>
                    </p>
                    <div className="text-gray-700 leading-relaxed mt-2">
                        <ProductDescription description={product.description} />
                    </div>
                    <p className="text-gray-700">
                        Preço: <span className="font-medium text-black">{product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                    </p>
                    <div className="mt-6">
                        <Add
                            productId={product._id}
                            stockNumber={product.stock}
                            product={product}
                            selectedImage={selectedImage} 
                        />
                    </div>
                </div>
            </div>

            {/* Avaliações */}
            <div className="px-4 md:px-0 mt-32 flex flex-col lg:flex-row gap-22 border-t border-gray-200">
                {/* Coluna da esquerda: resumo das avaliações */}
                <div className="w-full lg:w-1/3">
                    <ReviewSummary reviews={reviews} />
                    {userToken ? (
                        <AddReviewPage
                            productId={product._id}
                            token={userToken}
                            onReviewAdded={addReviewToList}
                        />
                    ) : (
                        <p className="text-sm text-gray-500 mt-6 text-center">Faça login para deixar uma avaliação.</p>
                    )}
                </div>

                {/* Coluna da direita: adicionar e listar comentários */}
                <div className="w-full lg:w-2/3 flex flex-col gap-8">
                    <ReviewList
                        reviews={reviews}
                        setReviews={setReviews}
                        productId={product._id}
                        userId={userId}
                        token={userToken}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;