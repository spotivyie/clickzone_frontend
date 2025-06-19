import { useEffect, useState } from "react";
import axios from "axios";

export default function useProfileForm() {
    const [form, setForm] = useState({ name: "", email: "", password: "", image: "", imageFile: null });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
        setForm(prevForm => ({
            ...prevForm,
            name: user.name,
            email: user.email,
            password: "",
            image: user.image || ""
        }));
            console.log("Carregando usuário do localStorage:", user);
        }
}, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e, hasImage = false) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user.id || user._id;

        try {
            let dataToSend;

            if (hasImage && form.imageFile) {
                dataToSend = new FormData();
                dataToSend.append("name", form.name);
                dataToSend.append("email", form.email);
                dataToSend.append("password", form.password || "");
                dataToSend.append("image", form.imageFile);
            } else {
                dataToSend = {
                    name: form.name,
                    email: form.email,
                    password: form.password || "",
                };
            }

            const res = await axios.put(
                `${import.meta.env.VITE_API_URL}/api/users/${userId}`,
                dataToSend,
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    ...(hasImage && form.imageFile ? { "Content-Type": "multipart/form-data" } : {})
                },
            }
        );

        localStorage.setItem("user", JSON.stringify(res.data));
        window.dispatchEvent(new Event("userChanged"));
        setSuccess("Dados atualizados com sucesso!");
        } catch (err) {
            setError(err.response?.data?.msg || "Erro ao atualizar perfil");
        }
    };

    return { form, setForm, error, success, handleChange, handleSubmit };
}
