import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//components
import InputField from "../../components/common/InputField";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.dispatchEvent(new Event("userChanged"));

            navigate("/");
        } catch (err) {
            setError("Credenciais inválidas. Tente novamente.", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-200 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Acessar Conta</h2>
                {error && (
                    <p className="text-red-600 text-sm text-center mb-4">{error}</p>
                )}
                <form onSubmit={handleLogin} className="space-y-4">
                    <InputField
                        label="E-mail"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        label="Senha"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-md font-semibold transition duration-300"
                    >
                        Entrar
                    </button>
                </form>
                <div className="text-sm text-center mt-6 text-gray-700">
                    Não tem uma conta?{" "}
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Criar conta
                    </Link>
                </div>
                <p className="text-xs text-center text-gray-400 mt-6">
                    © {new Date().getFullYear()} ClickZone. Todos os direitos reservados.
                </p>
            </div>
        </div>
    );
}

export default Login;
