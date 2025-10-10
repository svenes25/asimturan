"use client";
import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "cart_v1";

function safeParse<T>(value: string | null): T | null {
    if (!value) return null;
    try { return JSON.parse(value) as T; } catch { return null; }
}

function writeStorageDebounced(key: string, timeout = 200) {
    let t: any;
    return (v: any) => {
        clearTimeout(t);
        t = setTimeout(() => {
            try {
                localStorage.setItem(key, JSON.stringify(v));
                // Sekmeler arası senkronizasyon için
                localStorage.setItem(`${key}_last_update`, Date.now().toString());
                // Aynı sekmedeki bileşenleri tetiklemek için
                window.dispatchEvent(new CustomEvent("cart:updated", { detail: v }));
            } catch {}
        }, timeout);
    };
}

export function useCart() {
    const initial = typeof window !== "undefined"
        ? safeParse<any[]>(localStorage.getItem(STORAGE_KEY)) ?? []
        : [];

    const [cart, setCart] = useState<any[]>(initial);
    const writeRef = useRef<(v: any) => void>();
    const isExternalUpdate = useRef(false);

    if (!writeRef.current) writeRef.current = writeStorageDebounced(STORAGE_KEY, 200);

    // İlk yükleme
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setCart(JSON.parse(stored));
    }, []);

    // cart değiştiğinde localStorage'e yaz
    useEffect(() => {
        if (isExternalUpdate.current) {
            isExternalUpdate.current = false;
            return;
        }
        writeRef.current?.(cart);
    }, [cart]);

    // storage ve custom event dinleyicileri
    useEffect(() => {
        const onCustom = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (!detail) return;
            isExternalUpdate.current = true;
            setCart(detail);
        };

        const onStorage = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY || e.key === `${STORAGE_KEY}_last_update`) {
                const parsed = safeParse<any[]>(localStorage.getItem(STORAGE_KEY));
                if (parsed) {
                    isExternalUpdate.current = true;
                    setCart(parsed);
                }
            }
        };

        window.addEventListener("cart:updated", onCustom as EventListener);
        window.addEventListener("storage", onStorage);
        return () => {
            window.removeEventListener("cart:updated", onCustom as EventListener);
            window.removeEventListener("storage", onStorage);
        };
    }, []);

    const persistAndSet = useCallback((updater: any) => {
        setCart((prev) => {
            const next = typeof updater === "function" ? updater(prev) : updater;
            return next;
        });
    }, []);

    const addToCart = useCallback((product: any, quantity = 1) => {
        persistAndSet((prev: any[]) => {
            const existing = prev.find((p) => p.id === product.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p
                );
            }
            return [...prev, { ...product, quantity }];
        });
    }, [persistAndSet]);

    const removeFromCart = useCallback((productId: number) => {
        persistAndSet((prev: any[]) => prev.filter((p) => p.id !== productId));
    }, [persistAndSet]);

    const updateQuantity = useCallback(
        (productId: number, quantity: number) => {
            if (quantity <= 0) return removeFromCart(productId);
            persistAndSet((prev: any[]) =>
                prev.map((p) =>
                    p.id === productId ? { ...p, quantity } : p
                )
            );
        },
        [persistAndSet, removeFromCart]
    );

    const getTotalItems = useCallback(
        () => cart.reduce((t, it) => t + (it.quantity || 0), 0),
        [cart]
    );

    const getTotalPrice = useCallback(
        () => cart.reduce((t, it) => t + (Number(it.price) || 0) * (it.quantity || 0), 0),
        [cart]
    );

    return { cart, addToCart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice, setCart };
}
