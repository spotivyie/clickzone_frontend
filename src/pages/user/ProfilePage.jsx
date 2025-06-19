import { useEffect } from "react";
import { Mail, Lock, User, Plus } from "lucide-react"; 
import InputField from "../../components/common/InputField";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useProfileForm from "../../hooks/useProfileForm";
import useImageUpload from "../../hooks/useImageUpload";

function ProfilePage() {
    useAuthRedirect();

    const { form, setForm, error, success, handleChange, handleSubmit} = useProfileForm();
    const { imageFile, preview, fileRef, handleImageChange, setPreviewUrl} = useImageUpload();

    useEffect(() => {
        if (form.image && !preview) {
            const url = `${import.meta.env.VITE_API_URL}/${form.image.replace(/\\/g, "/")}`;
            setPreviewUrl(url);
        }
    }, [form.image, preview, setPreviewUrl]);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, imageFile: file })); 
            handleImageChange(e);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-30 mb-20 px-6 md:px-10">
            <h2 className="text-3xl font-bold mb-8 text-center">Meu Perfil</h2>

            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-5">
                <input
                    type="file"
                    accept="image/*"
                    ref={fileRef}
                    className="hidden"
                    onChange={onFileChange}
                />

                <div
                    onClick={() => fileRef.current.click()}
                    className="w-32 h-32 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200 transition overflow-hidden mx-auto mb-6"
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

                {[
                    { label: "Nome", icon: User, type: "text", name: "name" },
                    { label: "Email", icon: Mail, type: "email", name: "email" },
                    { label: "Nova Senha", icon: Lock, type: "password", name: "password" }
                ].map(({ label, icon: Icon, ...rest }) => (
                    <div key={rest.name}>
                        <label className="flex items-center gap-2 mb-1 font-medium text-gray-700">
                            <Icon className="w-5 h-5 text-gray-400" />
                            {label}
                        </label>
                        <InputField
                            icon={Icon}
                            value={form[rest.name] || ""}
                            onChange={handleChange}
                            placeholder={label}
                            {...rest}
                        />
                    </div>
                ))}

                {error && <p className="text-red-500 text-sm">{error}</p>}
                {success && <p className="text-green-600 text-sm">{success}</p>}

                <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-2 rounded-md font-semibold hover:bg-gray-700 transition duration-200"
                >
                    Atualizar Perfil
                </button>
            </form>
        </div>
    );
}

export default ProfilePage;
