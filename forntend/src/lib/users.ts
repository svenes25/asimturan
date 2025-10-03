"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import api from "@/lib/api.ts"

export function useUsers() {
    const [users, setUsers] = useState<[]>([])
    const [user,setUser] = useState<[]>([])
    const [selectedUser, setSelectedUser] = useState<>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const lastFetchTimeRef = useRef<number>(0)
    const fetchUser = useCallback(async (id: string | string[] | undefined) => {
        if (!id) return;
        try {
            setError(null);
            const response = await api.get(`/users/${id}`);
            setUser(response.data);
        } catch (err: any) {
            setError(err.message || "An error occurred");
        }
    }, []);
    // Kullanıcı seç
    const selectUser = useCallback(
        (userId: number) => {
            const user = users.find((u) => u.id === userId)
            if (user) setSelectedUser(user)
        },
        [users]
    )

    

    // Yeni kullanıcı ekle
    const addUser = useCallback(
        async (userData: Partial<User>) => {
            try {
                const response = await api.postRequest("/users/", userData)
                setUsers((prev) => [...prev, response.data])
            } catch (err) {
                console.error("Error adding user:", err)
                setError("Kullanıcı eklenirken hata oluştu.")
            }
        },
        []
    )

    // Kullanıcı güncelle
    const updateUser = useCallback(async (id: string, data: any) => {
        const res = await api.put(`/users/${id}`, data);
        setUser(res.data);
        return res.data;
    }, []);
    const updateAddress = useCallback(async (id: string, data: any) => {
        const res = await api.put(`/addresses/user/${id}`, data);
        setUser(prev => ({ ...prev, addresses: res.data }));
        return res.data;
    }, []);

    const updatePayment = useCallback(async (id: string, data: any) => {
        const res = await api.put(`payments/user/${id}`, data);
        setUser(prev => ({ ...prev, payment: res.data }));
        return res.data;
    }, []);
    // Kullanıcı sil
    const deleteUser = useCallback(
        async (userId: number) => {
            try {
                await api.deleteRequest(`/users/${userId}`)
                setUsers((prev) => prev.filter((u) => u.id !== userId))
                if (selectedUser?.id === userId) setSelectedUser(null)
            } catch (err) {
                console.error("Error deleting user:", err)
                setError("Kullanıcı silinirken hata oluştu.")
            }
        },
        [selectedUser]
    )

    return {
        fetchUser,
        user,
        users,
        selectedUser,
        isLoading,
        error,
        selectUser,
        addUser,
        updateUser,
        deleteUser,
        updateAddress,
        updatePayment
    }
}
