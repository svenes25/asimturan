"use client";
import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api.ts";

export function useCampaigns() {
    const [campaigns, setCampaigns] = useState<[]>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCampaigns = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.get("/campaigns");
            setCampaigns(res.data);
        } catch (err: any) {
            setError(err.message || "Kampanyalar alınamadı.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Tek kampanya çek
    const fetchCampaign = useCallback(async (id: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.get(`/campaigns/${id}`);
            setSelectedCampaign(res.data);
        } catch (err: any) {
            setError(err.message || "Kampanya alınamadı.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    const createCampaign = useCallback(
        async (data: Omit<Campaign, "id" | "created_at" | "updated_at">) => {
            setError(null);
            try {
                const res = await api.post("/campaigns", data);
                const campaignId = res.data.id;
                for (const productId of data.products) {
                    await api.post("/campaign_products", {
                        campaign_id: campaignId,
                        product_id: productId,
                    });
                }
                for (const categoryId of data.categories) {
                    await api.post("/campaign_categories", {
                        campaign_id: campaignId,
                        category_id: categoryId,
                    });
                }

                setCampaigns((prev) => [...prev, res.data]);
                return res.data;
            }catch (err: any) {
                setError(err.message || "Kampanya eklenemedi.");
            }
        },
        []
    );


    // Kampanya güncelle
    const updateCampaign = useCallback(async (data: Campaign) => {
        setError(null);
        try {
            const res = await api.put(`/campaigns/${data.id}`, data);
            setCampaigns((prev) =>
                prev.map((c) => (c.id === data.id ? res.data : c))
            );
            return res.data;
        } catch (err: any) {
            setError(err.message || "Kampanya güncellenemedi.");
        }
    }, []);

    // Kampanya sil
    const deleteCampaign = useCallback(async (id: number) => {
        const confirmed = window.confirm("Bu kampanyayı silmek istediğinize emin misiniz?");
        if (!confirmed) return;

        setError(null);
        try {
            await api.delete(`/campaigns/${id}`);
            setCampaigns((prev) => prev.filter((c) => c.id !== id));
            if (selectedCampaign?.id === id) setSelectedCampaign(null);
            await api.delete(`/campaign_categories/${id}`);
            await api.delete(`/campaign_products/${id}`);
        } catch (err: any) {
            setError(err.message || "Kampanya silinemedi.");
        }
    }, [selectedCampaign]);

    // Storage veya görsel yükleme yoksa sadece CRUD yeterli
    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    return {
        campaigns,
        selectedCampaign,
        isLoading,
        error,
        fetchCampaigns,
        fetchCampaign,
        createCampaign,
        updateCampaign,
        deleteCampaign,
        setSelectedCampaign
    };
}
