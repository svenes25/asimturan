"use client";
import Link from "next/link";
import { ShoppingCart, Minus, Plus, User, MapPin, Menu, X } from "lucide-react";
import React, {useEffect, useState} from "react";
import {useCart} from "@/lib/cart";

export default function Header({ user }) {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cart, updateQuantity, getTotalItems, getTotalPrice, setCart} = useCart();
    const [cartOpen, setCartOpen] = useState(false);
    useEffect(() => {
        const onCartUpdated = (e: Event) => {
            const detail = (e as CustomEvent).detail;
            if (detail) setCart(detail);
        };
        const onStorage = (e: StorageEvent) => {
            if (e.key === "cart_sync" && e.newValue) {
                try { setCart(JSON.parse(e.newValue)); } catch { /* ignore */ }
            }
        };

        window.addEventListener("cart:updated", onCartUpdated);
        window.addEventListener("storage", onStorage);
        return () => {
            window.removeEventListener("cart:updated", onCartUpdated);
            window.removeEventListener("storage", onStorage);
        };
    }, [setCart]);

    return (
        <div className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <Link
                            href="/home"
                            className="text-3xl font-bold text-blue-600"
                        >
                            ASIM TURAN
                        </Link>

                        {/* Desktop Menü */}
                        <nav className="hidden md:flex space-x-6">
                            <Link
                                href="/home"
                                className="hover:text-blue-600 transition-colors"
                            >
                                Ana Sayfa
                            </Link>
                            <Link
                                href="/products"
                                className="hover:text-blue-600 transition-colors"
                            >
                                Ürünler
                            </Link>
                            <Link
                                href="/contact"
                                className="hover:text-blue-600 transition-colors"
                            >
                                İletişim
                            </Link>
                            {!user && (
                                <>
                                    <Link
                                        href="/login"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        Giriş Yap
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        Kayıt Ol
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>

                    {/* Kullanıcı ve Sepet */}
                    <div className="flex items-center space-x-4">
                        {user && (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    <User size={20} />
                                    <span className="hidden md:inline">
                                        Merhaba, {user.firstName}
                                    </span>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg p-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                                <MapPin
                                                    className="text-blue-600"
                                                    size={24}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold">
                                                    Adresim
                                                </h3>
                                                <p className="text-gray-600">
                                                    Ankara Cad. No:12 <br />
                                                    İstanbul / Türkiye
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Sepet */}
                        <div className="relative">
                            <button
                                onClick={() => setCartOpen(!cartOpen)}
                                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <ShoppingCart size={20} />
                                <span>{getTotalItems()}</span> {/* This will update instantly */}
                            </button>

                            {cartOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg mb-4">Sepetim</h3>
                                        {cart.length === 0 ? (
                                            <p className="text-gray-500">Sepetiniz boş</p>
                                        ) : (
                                            <>
                                                {cart.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center justify-between py-2 border-b"
                                                    >
                                                        <div className="flex-1">
                                                            <h4 className="font-medium text-sm">{item.name}</h4>
                                                            <p className="text-gray-600 text-sm">{item.price}₺</p>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded">
                                                                <Minus size={12} />
                                                            </button>
                                                            <span className="w-8 text-center">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded">
                                                                <Plus size={12} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="mt-4 pt-4 border-t">
                                                    <div className="flex justify-between font-semibold">
                                                        <span>Toplam: {getTotalPrice()}₺</span>
                                                    </div>
                                                    <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                                        Satın Al
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {/* Mobil Menü Butonu */}
                        <div className="md:hidden">
                            <button
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                className="text-gray-700 hover:text-blue-600 transition-colors"
                            >
                                {mobileMenuOpen ? (
                                    <X size={24} />
                                ) : (
                                    <Menu size={24} />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobil Menü */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
                        <nav className="flex flex-col p-4 space-y-2">
                            <Link
                                href="/home"
                                className="hover:text-blue-600 transition-colors"
                            >
                                Ana Sayfa
                            </Link>
                            <Link
                                href="/products"
                                className="hover:text-blue-600 transition-colors"
                            >
                                Ürünler
                            </Link>
                            <Link
                                href="/contact"
                                className="hover:text-blue-600 transition-colors"
                            >
                                İletişim
                            </Link>
                            {!user && (
                                <>
                                    <Link
                                        href="/login"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        Giriş Yap
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        Kayıt Ol
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </div>
    );
}
