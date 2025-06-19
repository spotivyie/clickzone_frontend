import { useMemo } from "react";

function parseJwt(token) {
    try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch {
            return null;
        }
    }

function useAuthLocalStorage() {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    const user = useMemo(() => {
        try {
            return userData ? JSON.parse(userData) : null;
        } catch {
            return null;
        }
    }, [userData]);

    const decoded = useMemo(() => {
        if (!token) return null;
        return parseJwt(token);
    }, [token]);

    const userId = user?.id || user?._id || decoded?.id || decoded?._id || null;

    return {
        token,
        user,
        userId,
        isAdmin: user?.isAdmin || false,
        isLoggedIn: !!token,
    };
}

export default useAuthLocalStorage;
