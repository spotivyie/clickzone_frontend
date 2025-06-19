import InputField from "../common/InputField";
import { Trash2 } from "lucide-react";

function ProductForm({ product, onChange, onSubmit, handleImageChange, handleAddImage, handleRemoveImage }) {
    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <InputField
                label="Nome"
                name="name"
                value={product.name}
                onChange={onChange}
                placeholder="Nome do produto"
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                    name="description"
                    value={product.description}
                    onChange={onChange}
                    className="border p-2 w-full resize-none border-gray-700 rounded"
                    placeholder="Descrição"
                    rows={4}
                />
            </div>

            <InputField
                label="Preço"
                name="price"
                type="number"
                value={product.price}
                onChange={onChange}
                placeholder="Preço"
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URLs das Imagens</label>
                {product.image.map((imgUrl, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <input
                            type="text"
                            name={`image-${index}`}
                            value={imgUrl}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            placeholder={`URL da imagem ${index + 1}`}
                            className="flex-grow border border-gray-700 rounded-md px-3 py-3"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="text-red-600 hover:text-red-800"
                            aria-label="Remover imagem"
                            title="Remover imagem"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={handleAddImage}
                    className="mt-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Adicionar nova imagem
                </button>
            </div>

            <InputField
                label="Categoria"
                name="category"
                value={product.category}
                onChange={onChange}
                placeholder="Categoria do produto"
            />

            <InputField
                label="Estoque"
                name="stock"
                type="number"
                value={product.stock}
                onChange={onChange}
                placeholder="Quantidade em estoque"
            />

            <button
                type="submit"
                className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
                Salvar
            </button>
        </form>
    );
}

export default ProductForm;
