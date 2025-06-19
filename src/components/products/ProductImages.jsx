import React from "react";

function ProductImages({ images = [], name, selectedImage, onSelectImage }) {
    return (
        <div className="lg:sticky top-2">
            {/* Imagem principal */}
            <div className="w-full h-[400px] rounded-xl flex items-center justify-center mb-4">
                <img
                    src={selectedImage}
                    alt={name}
                    className="max-h-full max-w-full object-contain"
                />
            </div>

            {/* Miniaturas */}
            <div className="flex gap-2 overflow-x-auto">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Imagem ${idx + 1}`}
                        onClick={() => onSelectImage(img)}
                        className={`w-20 h-20 object-contain rounded-md cursor-pointer border-2 ${
                            img === selectedImage ? "border-black" : "border-gray-200"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default ProductImages;
