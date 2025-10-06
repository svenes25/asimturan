import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api.ts";

type ContactInfo = {
    address: string;
    phone: string;
    email: string;
    workingHours: string;
};

export function useContactInfo() {
    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        address: "",
        phone: "",
        email: "",
        workingHours: ""
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    // Veriyi çek
    const fetchContactInfo = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await api.get("/communication");
            setContactInfo(res.data[0]);
        } catch (err: any) {
            setError(err.message || "İletişim bilgisi alınamadı.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Veriyi güncelle
    const updateContactInfo = useCallback(async (contactInfo) => {
        setIsSaving(true);
        setError(null);
        setSuccess(false);
        try {
            await api.put("/communication", contactInfo);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Güncelleme başarısız.");
        } finally {
            setIsSaving(false);
        }
    }, []);

    useEffect(() => {
        fetchContactInfo();
    }, [fetchContactInfo]);

    return {
        contactInfo,
        setContactInfo,
        isLoading,
        isSaving,
        error,
        success,
        fetchContactInfo,
        updateContactInfo
    };
}