import { useParams, useNavigate } from "react-router-dom";
import useProductForm from "../../hooks/useProductForm";
import useImages from "../../hooks/useImages"; 
import ProductForm from "../../components/products/ProductForm";

function AdminEditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        product,
        handleChange,
        handleSubmit,
        loading,
    } = useProductForm(id, () => navigate("/admin/products"));

    const {
        images,
        handleImageChange,
        handleAddImage,
        handleRemoveImage,
    } = useImages(product.image);

    if (loading) return <p className="pt-22 w-full h-screen bg-white">Carregando produto...</p>;

    return (
        <div className="max-w-md mx-auto mt-22 mb-10 p-4">
            <h1 className="text-3xl font-bold mb-4">Editar Produto</h1>
            <ProductForm
                product={{ ...product, image: images }}
                onChange={handleChange}
                onSubmit={handleSubmit}
                handleImageChange={(i, v) => handleImageChange(i, v, handleChange)}
                handleAddImage={() => handleAddImage(handleChange)}
                handleRemoveImage={(i) => handleRemoveImage(i, handleChange)}
            />
        </div>
    );
}

export default AdminEditProductPage;
