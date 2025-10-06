"use client";

import { useState, useCallback, useEffect } from "react";
import api from "./api";

export function useAuth() {
    const [user, setUser] = useState<any>(() => {
        // Başlangıçta localStorage'dan oku
        if (typeof window !== "undefined") {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Kullanıcıyı localStorage'a kaydet
    const saveUser = useCallback((userData: any) => {
        setUser(userData);
        if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(userData));
        }
    }, []);

    // Kullanıcıyı localStorage'dan temizle
    const clearUser = useCallback(() => {
        setUser(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("user");
        }
    }, []);

    /* ----------------------------- LOGIN ----------------------------- */
    const login = useCallback(async (mail: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post("/users/login", { mail, password });
            saveUser(response.data);
            return response.data;
        } catch (err: any) {
            setError(err?.response?.data?.detail || "Login failed");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [saveUser]);

    /* ----------------------------- REGISTER ----------------------------- */
    const register = useCallback(async (formData: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post("/users/register", {
                first_name: formData.firstName,
                last_name: formData.lastName,
                mail: formData.email,
                password: formData.password,
            });
            saveUser(response.data);
            return response.data;
        } catch (err: any) {
            setError(err?.response?.data?.detail || "Register failed");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, [saveUser]);

    /* ----------------------------- LOGOUT ----------------------------- */
    const logout = useCallback(() => {
        clearUser();
        // İstersen backend token logout işlemi yapabilirsin
    }, [clearUser]);

    /* ----------------------------- ADMIN KONTROL ----------------------------- */
    const isAdmin = useCallback(() => {
        return user?.role === "admin";
    }, [user]);

    /* ----------------------------- EFFECT: Sayfa yenilenince localStorage'dan oku ----------------------------- */
    useEffect(() => {
        if (typeof window !== "undefined" && !user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) setUser(JSON.parse(storedUser));
        }
    }, [user]);

    return { user, isLoading, error, login, logout, register, isAdmin,saveUser };
}
