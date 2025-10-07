import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api.ts";

type Category = {
    id: number;
    name: string;
};

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Tüm kategorileri çek
    const fetchCategories = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.get("/categories");
            setCategories(res.data);
        } catch (err: any) {
            setError(err.message || "Kategoriler alınamadı.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Tek kategori çek
    const fetchCategory = useCallback(async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.get(`/categories/${id}`);
            setSelectedCategory(res.data);
        } catch (err: any) {
            setError(err.message || "Kategori alınamadı.");
        } finally {
            setIsLoading(false);
        }
    }, []);
    const updateCategory = useCallback(async (id: number, name: string) => {
        setError(null);
        try {
            const res = await api.put(`/categories/${id}`, { name });
            setCategories((prev) =>
                prev.map((cat) => (cat.id === id ? res.data : cat))
            );
            return res.data;
        } catch (err: any) {
            setError(err.message || "Kategori güncellenemedi.");
        }
    }, []);
    // Yeni kategori ekle
    const createCategory = useCallback(async (name: string) => {
        setError(null);
        try {
            const res = await api.post("/categories", { name });
            setCategories((prev) => [...prev, res.data]);
            return res.data;
        } catch (err: any) {
            setError(err.message || "Kategori eklenemedi.");
        }
    }, []);

    // Kategori sil
    const deleteCategory = useCallback(async (id: number) => {
        setError(null);
        try {
            await api.delete(`/categories/${id}`);
            setCategories((prev) => prev.filter((cat) => cat.id !== id));
            if (selectedCategory?.id === id) setSelectedCategory(null);
        } catch (err: any) {
            setError(err.message || "Kategori silinemedi.");
        }
    }, [selectedCategory]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    return {
        categories,
        updateCategory,
        selectedCategory,
        isLoading,
        error,
        fetchCategories,
        fetchCategory,
        createCategory,
        deleteCategory,
        setSelectedCategory
    };
}