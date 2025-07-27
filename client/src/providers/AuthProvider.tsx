import React, { useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { User } from "@/types/IUser";
import { AuthContext } from "@/context/AuthContext";
import { API } from "@/constants.tsx/Api.const";
import { removeToken, saveToken } from "@/cookie/cookie";

// Configure axios defaults
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            const response = await axios.get(`${API.API_BASE_URL}/auth/me`);
            setUser(response.data.user);
        } catch (error) {
            console.error("Auth check failed:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const response = await axios.post(`${API.API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            setUser(response.data.user);
            saveToken(response.data.token);

            return true;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    const register = async (
        email: string,
        password: string,
        name: string
    ): Promise<boolean> => {
        try {
            const response = await axios.post(`${API.API_BASE_URL}/auth/register`, {
                email,
                password,
                name,
            });

            setUser(response.data.user);
            saveToken(response.data.token);
            return true;
        } catch (error) {
            console.error("Registration error:", error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await axios.post(`${API.API_BASE_URL}/auth/logout`);
            setUser(null);
            removeToken();


        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
