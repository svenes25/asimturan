import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api.ts";

// Assuming these types are defined in your application context
type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
};

// Yeni ProductStarsCreate şemasına karşılık gelen tip tanımı
type ProductStarCreate = {
    product_id: number;
    user_id: number;
    stars: number;
};

// Ürün yıldız (star) modelinin API'den dönen tam hali
type ProductStar = ProductStarCreate & {
    id: number;
    created_at: string;
    updated_at: string;
};

// Yorum (Comment) modelinin API'den dönen tam hali
type ProductCommentCreate = {
    product_id: number;
    user_id: number;
    comment: string;
};

type ProductComment = ProductCommentCreate & {
    id: number;
    created_at: string;
    updated_at: string;
};


export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [productsRead, setProductsRead] = useState<any[]>([]);
    const [productsStars, setProductsStars] = useState<ProductStar[]>([]); // Tipi güncelledik
    const [productsComments, setProductsComments] = useState<ProductComment[]>([]); // Tipi güncelledik
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const readRes = await api.get("/products/read");
            setProductsRead(readRes.data);

            // Stars
            const starsRes = await api.get("/product_stars");
            setProductsStars(starsRes.data);

            // Comments (Yorumlar)
            const commentsRes = await api.get("/product_comments");
            setProductsComments(commentsRes.data);

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
            const commentsRes = await api.get(`/products/${id}`);
            setSelectedProduct(commentsRes.data);
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

    // SERVİS 1: Ürün yıldız puanı (star) gönderme ve güncelleme
    const submitProductStar = useCallback(async (data: ProductStarCreate) => {
        setError(null);

        // Kullanıcı ID'si ve Ürün ID'sine göre mevcut puanlamayı kontrol et
        const existingStar = productsStars.find(
            (star) => star.product_id === data.product_id && star.user_id === data.user_id
        );

        let res;
        let successMessage: string;

        try {
            if (existingStar) {
                // Mevcut puanlama varsa, PUT (Güncelleme) isteği gönder
                res = await api.put(`/product_stars/${existingStar.id}`, data);
                successMessage = "Puanlama başarıyla güncellendi!";

                // Yerel state'i güncelle: Mevcut yıldızı yenisiyle değiştir
                setProductsStars(prev => prev.map(star =>
                    star.id === existingStar.id ? res.data : star
                ));

            } else {
                // Mevcut puanlama yoksa, POST (Yeni Kayıt) isteği gönder
                res = await api.post("/product_stars", data);
                successMessage = "Puanlama başarıyla kaydedildi!";

                // Yerel state'i güncelle: Yeni yıldızı listeye ekle
                setProductsStars(prev => [...prev, res.data]);
            }

            alert(successMessage);
            return res.data;

        } catch (err: any) {
            const action = existingStar ? 'güncellenirken' : 'kaydedilirken';
            setError(err.message || `Puanlama ${action} hata oluştu.`);
            return null;
        }
    }, [productsStars, setProductsStars]); // productsStars bağımlılığı kontrol için gerekli

    // SERVİS 2: Ürün yorumu (comment) gönderme ve güncelleme (Yeni Eklendi)
    const submitProductComment = useCallback(async (data: ProductCommentCreate) => {
        setError(null);

        // Kullanıcı ID'si ve Ürün ID'sine göre mevcut yorumu kontrol et
        const existingComment = productsComments.find(
            (comment) => comment.product_id === data.product_id && comment.user_id === data.user_id
        );

        let res;
        let successMessage: string;

        try {
            if (existingComment) {
                // Mevcut yorum varsa, PUT (Güncelleme) isteği gönder
                res = await api.put(`/product_comments/${existingComment.id}`, data);
                successMessage = "Yorum başarıyla güncellendi!";

                // Yerel state'i güncelle
                setProductsComments(prev => prev.map(comment =>
                    comment.id === existingComment.id ? res.data : comment
                ));

            } else {
                // Mevcut yorum yoksa, POST (Yeni Kayıt) isteği gönder
                res = await api.post("/product_comments", data);
                successMessage = "Yorum başarıyla kaydedildi!";

                // Yerel state'i güncelle
                setProductsComments(prev => [...prev, res.data]);
            }

            alert(successMessage);
            return res.data;

        } catch (err: any) {
            const action = existingComment ? 'güncellenirken' : 'kaydedilirken';
            setError(err.message || `Yorum ${action} hata oluştu.`);
            return null;
        }
    }, [productsComments, setProductsComments]);


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        productsRead,
        productsStars,
        productsComments,
        selectedProduct,
        isLoading,
        error,
        fetchProducts,
        fetchProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        setSelectedProduct,
        submitProductStar,
        submitProductComment,
    };
}