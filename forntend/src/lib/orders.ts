"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import api from "@/lib/api.ts"

// Order tipi
export interface Order {
    id: number
    userId: number
    products: { productId: number; quantity: number }[]
    totalPrice: number
    status: string
    createdAt?: string
    updatedAt?: string
}

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [order, setOrder] = useState<Order | null>(null)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const lastFetchRef = useRef<number>(0)

    /* ----------------------------- TÜM ORDERS GETİR ----------------------------- */
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

    /* ----------------------------- TEK ORDER GETİR ----------------------------- */
    const fetchOrder = useCallback(async (id: string | number | undefined) => {
        if (!id) return
        try {
            setError(null)
            const res = await api.get(`/orders/${id}`)
            setOrder(res.data)
        } catch (err: any) {
            setError(err.message || "Sipariş alınırken hata oluştu.")
        }
    }, [])

    /* ----------------------------- ORDER SEÇ ----------------------------- */
    const selectOrder = useCallback(
        (orderId: number) => {
            const found = orders.find((o) => o.id === orderId)
            if (found) setSelectedOrder(found)
        },
        [orders]
    )

    /* ----------------------------- ORDER EKLE ----------------------------- */
    const addOrder = useCallback(async (data: Partial<Order>) => {
        try {
            setError(null)
            const res = await api.postRequest("/orders", data)
            setOrders((prev) => [...prev, res.data])
        } catch (err: any) {
            console.error("Error adding order:", err)
            setError("Sipariş eklenirken hata oluştu.")
        }
    }, [])

    /* ----------------------------- ORDER GÜNCELLE ----------------------------- */
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

    /* ----------------------------- ORDER SİL ----------------------------- */
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

    /* ----------------------------- OTOMATİK YENİLEME ----------------------------- */
    useEffect(() => {
        const now = Date.now()
        if (now - lastFetchRef.current > 5000) {
            fetchOrders()
            lastFetchRef.current = now
        }
    }, [fetchOrders])

    /* ----------------------------- GERİ DÖNENLER ----------------------------- */
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
    }
}
