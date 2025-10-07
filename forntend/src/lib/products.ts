import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api.ts";

type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
};

export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Tüm ürünleri çek
    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.get("/products");
            setProducts(res.data);
        } catch (err: any) {
            setError(err.message || "Ürünler alınamadı.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Tek ürün çek
    const fetchProduct = useCallback(async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.get(`/products/${id}`);
            setSelectedProduct(res.data);
        } catch (err: any) {
            setError(err.message || "Ürün alınamadı.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Yeni ürün ekle
    const createProduct = useCallback(async (data: Omit<Product, "id">) => {
        setError(null);
        try {
            const res = await api.post("/products", data);
            setProducts((prev) => [...prev, res.data]);
            return res.data;
        } catch (err: any) {
            setError(err.message || "Ürün eklenemedi.");
        }
    }, []);

    // Ürün güncelle
    const updateProduct = useCallback(async (data: Omit<Product, "id">) => {
        setError(null);
        console.log(data)
        try {
            const res = await api.put(`/products/${data.id}`, data);
            setProducts((prev) =>
                prev.map((p) => (p.id === data.id ? res.data : p))
            );
            return res.data;
        } catch (err: any) {
            setError(err.message || "Ürün güncellenemedi.");
        }
    }, []);

    // Ürün sil (onaylı)
    const deleteProduct = useCallback(async (id: number) => {
        const confirmed = window.confirm("Bu ürünü silmek istediğinize emin misiniz?");
        if (!confirmed) return;

        setError(null);
        try {
            await api.delete(`/products/${id}`);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            if (selectedProduct?.id === id) setSelectedProduct(null);
        } catch (err: any) {
            setError(err.message || "Ürün silinemedi.");
        }
    }, [selectedProduct]);

    // Görsel yükle
    const uploadImage = useCallback(async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await api.post("/products/upload-image", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            return res.data.url;
        } catch (err: any) {
            setError(err.message || "Görsel yüklenemedi.");
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        selectedProduct,
        isLoading,
        error,
        fetchProducts,
        fetchProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        setSelectedProduct
    };
}