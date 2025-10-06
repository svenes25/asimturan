"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import api from "@/lib/api.ts"

export function useProducts() {
    const [products, setProducts] = useState<[]>([])
    const [product, setProduct] = useState<>(null)
    const [selectedProduct, setSelectedProduct] = useState<>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const lastFetchRef = useRef<number>(0)
    const fetchProducts = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)
            const res = await api.get("/products")
            setProducts(res.data)
        } catch (err: any) {
            setError(err.message || "Ürünler alınırken hata oluştu.")
        } finally {
            setIsLoading(false)
        }
    }, [])
    const fetchProduct = useCallback(async (id: string | number | undefined) => {
        if (!id) return
        try {
            setError(null)
            const res = await api.get(`/products/${id}`)
            setProduct(res.data)
        } catch (err: any) {
            setError(err.message || "Ürün alınırken hata oluştu.")
        }
    }, [])

    const selectProduct = useCallback(
        (productId: number) => {
            const found = products.find((p) => p.id === productId)
            if (found) setSelectedProduct(found)
        },
        [products]
    )

    const addProduct = useCallback(async (data: Partial<Product>) => {
        try {
            setError(null)
            const res = await api.postRequest("/products", data)
            setProducts((prev) => [...prev, res.data])
        } catch (err: any) {
            console.error("Error adding product:", err)
            setError("Ürün eklenirken hata oluştu.")
        }
    }, [])

    const updateProduct = useCallback(async (id: string | number, data: any) => {
        try {
            const res = await api.put(`/products/${id}`, data)
            setProduct(res.data)
            setProducts((prev) =>
                prev.map((p) => (p.id === Number(id) ? res.data : p))
            )
            return res.data
        } catch (err: any) {
            setError("Ürün güncellenirken hata oluştu.")
        }
    }, [])

    const deleteProduct = useCallback(
        async (id: number) => {
            try {
                await api.deleteRequest(`/products/${id}`)
                setProducts((prev) => prev.filter((p) => p.id !== id))
                if (selectedProduct?.id === id) setSelectedProduct(null)
            } catch (err: any) {
                console.error("Error deleting product:", err)
                setError("Ürün silinirken hata oluştu.")
            }
        },
        [selectedProduct]
    )

    useEffect(() => {
        const now = Date.now()
        if (now - lastFetchRef.current > 5000) {
            fetchProducts()
            lastFetchRef.current = now
        }
    }, [fetchProducts])

    return {
        fetchProducts,
        fetchProduct,
        products,
        product,
        selectedProduct,
        isLoading,
        error,
        selectProduct,
        addProduct,
        updateProduct,
        deleteProduct,
    }
}
