import { useState, useEffect } from "react";

export default function useUserAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const updateUser = () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");
            if (token && userData) {
                setUser(JSON.parse(userData));
            } else {
                setUser(null);
            }
        };

        window.addEventListener("storage", updateUser);
        window.addEventListener("userChanged", updateUser);
        updateUser();

        return () => {
            window.removeEventListener("storage", updateUser);
            window.removeEventListener("userChanged", updateUser);
        };
    }, []);

    return user;
}
