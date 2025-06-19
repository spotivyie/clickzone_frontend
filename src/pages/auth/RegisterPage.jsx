import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Plus, X } from "lucide-react";
import InputField from "../../components/common/InputField"; 
import useImageUpload from "../../hooks/useImageUpload";

function RegisterPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const { imageFile, preview, fileRef, handleImageChange, removeImage } = useImageUpload();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("password", form.password);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            localStorage.setItem("token", res.data.token);
            const decoded = JSON.parse(atob(res.data.token.split('.')[1]));
            const user = {
                id: decoded.id,
                name: form.name,
                email: form.email,
                isAdmin: decoded.isAdmin || false,
            };

            localStorage.setItem("user", JSON.stringify(user));
            window.dispatchEvent(new Event("userChanged"));
            navigate("/");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.msg || "Erro ao registrar");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4 mt-18">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                    Criar nova conta
                </h2>
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <label className="flex justify-center text-sm font-medium text-gray-700">
                        Foto de perfil (opcional)
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    <div className="flex justify-center relative mb-4">
                        <div
                            onClick={() => fileRef.current.click()}
                            className="w-28 h-28 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition relative overflow-hidden"
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Foto de perfil"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Plus className="w-8 h-8 text-gray-500" />
                            )}
                        </div>

                        {preview && (
                            <button
                                type="button"
                                onClick={removeImage}
                                className="absolute top-0 right-0 bg-white rounded-full shadow p-1 text-gray-600 hover:text-red-600 transition"
                                title="Remover imagem"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    <InputField
                        label="Nome"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                    />
                    <InputField
                        label="E-mail"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="seu@email.com"
                    />
                    <InputField
                        label="Senha"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Crie uma senha segura"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-md font-semibold transition duration-300"
                    >
                        Registrar
                    </button>
                </form>
                <div className="text-sm text-center mt-6 text-gray-700">
                    Já tem uma conta?{" "}
                    <Link to="/login" className="text-blue-600 hover:underline font-medium">
                        Entrar
                    </Link>
                </div>
                <p className="text-xs text-center text-gray-400 mt-6">
                    © {new Date().getFullYear()} ClickZone. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;
