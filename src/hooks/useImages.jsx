import { useState, useEffect } from "react";

function useImages(initialImages = [""]) {
    const [images, setImages] = useState(initialImages);

    useEffect(() => {
        setImages(Array.isArray(initialImages) && initialImages.length > 0 ? initialImages : [""]);
    }, [initialImages]);

    const updateImages = (newImages, onChange) => {
        setImages(newImages);
        onChange({ target: { name: "image", value: newImages.length ? newImages : [""] } });
    };

    const handleImageChange = (index, value, onChange) => {
        const newImages = [...images];
        newImages[index] = value;
        updateImages(newImages, onChange);
    };

    const handleAddImage = (onChange) => {
        updateImages([...images, ""], onChange);
    };

    const handleRemoveImage = (index, onChange) => {
        const newImages = images.filter((_, i) => i !== index);
        updateImages(newImages, onChange);
    };

    return {
        images,
        handleImageChange,
        handleAddImage,
        handleRemoveImage,
    };
}

export default useImages;
