"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import {useAuth} from "@/lib/auth";

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const {login,user,isAdmin} = useAuth()
    const [users, setUsers] = useState([
        {
            id: 1,
            email: 'demo@example.com',
            password: 'demo123',
            firstName: 'Demo',
            lastName: 'User',
        }
    ]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError("");
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const userData = await login(formData.email, formData.password);
            if (userData.role === "admin") {
                router.push("/admin");
            } else {
                router.push(`/profile/${userData.id}`);
            }
        } catch (err) {
            console.error("Login failed:", err);
            // Hata mesajı gösterebilirsin
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Header />
            <div className="py-8">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
                        <h1 className="text-3xl font-bold text-center mb-8">Giriş Yap</h1>

                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                                {error}
                            </div>
                        )}

                        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6">
                            <p className="text-sm">Admin giriş bilgileri:</p>
                            <p className="text-sm">
                                <strong>E-posta:</strong> admin@gmail.com
                            </p>
                            <p className="text-sm">
                                <strong>Şifre:</strong> admin
                            </p>
				<p className="text-sm">User giriş bilgileri:</p>
                            <p className="text-sm">
                                <strong>E-posta:</strong> user@gmail.com
                            </p>
                            <p className="text-sm">
                                <strong>Şifre:</strong> user
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    E-posta Adresi *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="E-posta adresinizi girin"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Şifre *
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Şifrenizi girin"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} className="text-gray-400" />
                                        ) : (
                                            <Eye size={20} className="text-gray-400" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                } text-white`}
                            >
                                {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                            </button>

                            <div className="text-center">
                                <p className="text-gray-600">
                                    Hesabınız yok mu?{" "}
                                    <button
                                        type="button"
                                        className="text-blue-600 hover:text-blue-800 font-semibold"
                                        onClick={() => router.push("/register")}
                                    >
                                        Buradan kayıt olun
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
