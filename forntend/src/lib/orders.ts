"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import api from "@/lib/api.ts"
export function useOrders() {
    const [orders, setOrders] = useState<[]>([])
    const [order, setOrder] = useState<null>(null)
    const [selectedOrder, setSelectedOrder] = useState<null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const lastFetchRef = useRef<number>(0)
    const [total, setTotal] = useState<[]>([])

    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const res = await api.get("/orders")
            setOrders(res.data)
        } catch (err: any) {
            setError(err.message || "Siparişler alınırken hata oluştu.")
        } finally {
            setIsLoading(false)
        }
    }, [])
    const fetchTotal = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const res = await api.get("/orders/total-earnings")
            setTotal(res.data)
        } catch (err: any) {
            setError(err.message || "Siparişler alınırken hata oluştu.")
        } finally {
            setIsLoading(false)
        }
    }, [])

    const fetchOrder = useCallback(async (id) => {
        if (!id) return;
        try {
            setError(null);
            const res = await api.get(`/orders/${id}`);
            setOrder(res.data);
        } catch (err) {
            setError(err.message || 'Sipariş alınırken hata oluştu.');
        }
    }, [setOrder, setError]);

    const selectOrder = useCallback(
        (orderId: number) => {
            const found = orders.find((o) => o.id === orderId)
            if (found) setSelectedOrder(found)
        },
        [orders]
    )

    const addOrder = useCallback(async (data: Partial<Order>) => {
        try {
            setError(null)
            const res = await api.post("/orders", data)
            setOrders((prev) => [...prev, res.data])
            localStorage.removeItem("cart_v1")
            window.dispatchEvent(new CustomEvent("cart:updated", { detail: [] }))
        } catch (err: any) {
            console.error("Error adding order:", err)
            setError("Sipariş eklenirken hata oluştu.")
        }
    }, [])
    const updateOrder = useCallback(async (id: string | number, data: any) => {
        try {
            const res = await api.put(`/orders/${id}`, data)
            setOrder(res.data)
            setOrders((prev) =>
                prev.map((o) => (o.id === Number(id) ? res.data : o))
            )
            return res.data
        } catch (err: any) {
            setError("Sipariş güncellenirken hata oluştu.")
        }
    }, [])

    const deleteOrder = useCallback(
        async (id: number) => {
            try {
                await api.deleteRequest(`/orders/${id}`)
                setOrders((prev) => prev.filter((o) => o.id !== id))
                if (selectedOrder?.id === id) setSelectedOrder(null)
            } catch (err: any) {
                console.error("Error deleting order:", err)
                setError("Sipariş silinirken hata oluştu.")
            }
        },
        [selectedOrder]
    )

    useEffect(() => {
        const now = Date.now()
        if (now - lastFetchRef.current > 5000) {
            fetchOrders()
            fetchTotal()
            lastFetchRef.current = now
        }
    }, [fetchOrders])

    return {
        fetchOrders,
        fetchOrder,
        orders,
        order,
        selectedOrder,
        isLoading,
        error,
        selectOrder,
        addOrder,
        updateOrder,
        deleteOrder,
        fetchTotal,
        total
    }
}
