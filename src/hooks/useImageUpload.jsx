import { useRef, useState } from "react";

export default function useImageUpload(initialPreview = null) {
    const fileRef = useRef();
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(initialPreview);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const setPreviewUrl = (url) => {
        setPreview(url);
    };

    const removeImage = () => {
        setImageFile(null);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    return {
        imageFile,
        preview,
        fileRef,
        handleImageChange,
        removeImage,
        setPreviewUrl
    };
}
