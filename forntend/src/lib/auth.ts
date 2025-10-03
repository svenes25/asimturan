"use client";

import { useState, useCallback } from "react";
import api from "./api";

export function useAuth() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (mail, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post("/users/login", { mail, password });
            setUser(response.data);
            return response.data;
        } catch (err) {
            setError(err?.response?.data?.detail || "Login failed");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);
    const register = useCallback(async (formData) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.post("/users/register", {
                first_name: formData.firstName,
                last_name: formData.lastName,
                mail: formData.email,
                password: formData.password,
            });
            setUser(response.data);
            return response.data;
        } catch (err) {
            setError(err?.response?.data?.detail || "Login failed");
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const isAdmin = useCallback(() => {
        return user?.role === "admin";
    }, [user]);

    return { user, isLoading, error, login, isAdmin ,register};
}
