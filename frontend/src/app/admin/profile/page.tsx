"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
import {useAuth} from "@/lib/auth";
import {useUsers} from "@/lib/users";
export default function OrdersManagement() {
    const [editing, setEditing] = useState(false);
    const {user,saveUser} = useAuth()
    const {updateUser,updatePassword} = useUsers()
    const [_,setUser] = useState()
    const [formData, setFormData] = useState({
        name: user?.name || "",
        surname: user?.surname || "",
        mail: user?.mail || "",
        tel: user?.tel || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            // Kullanıcı bilgilerini güncelle
            const updatedData: any = {
                name: formData.name,
                surname: formData.surname,
                mail: formData.mail,
                tel: formData.tel,
            };

            const updatedUser = await updateUser(user.id, updatedData);
            saveUser(updatedUser)
            if (formData.newPassword) {
                if (formData.newPassword !== formData.confirmPassword) {
                    alert("Yeni şifre ve tekrar aynı olmalıdır!");
                    return;
                }

                await updatePassword(user.id,formData.currentPassword,formData.newPassword)

                alert("Şifre başarıyla güncellendi!");
            }
            setEditing(false);
            alert("Bilgiler başarıyla güncellendi!");
        } catch (err: any) {
            console.error(err);
            alert(err?.response?.data?.detail || "Güncelleme sırasında hata oluştu");
        }
    };
    return (
        <div>
            <Header />
            <div className="py-8 bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4">
                    {/* Dashboard title */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Paneli</h1>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <Sidebar />
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Admin Profili</h2>
                            </div>
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-xl font-semibold">Personal Information</h2>
                                    <button
                                        onClick={() => (editing ? handleSave() : setEditing(true))}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    >
                                        {editing ? "Kaydet" : "Düzenle"}
                                    </button>
                                </div>

                                {/* İsim - Soyisim */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {["name", "surname", "mail", "tel"].map((field, idx) => (
                                        <div key={idx}>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {field === "name"
                                                    ? "İsim"
                                                    : field === "surname"
                                                        ? "Soyisim"
                                                        : field === "mail"
                                                            ? "Email"
                                                            : "Telefon"}
                                            </label>
                                            {editing ? (
                                                <input
                                                    type={field === "mail" ? "email" : field === "tel" ? "tel" : "text"}
                                                    name={field}
                                                    value={formData[field as "name" | "surname" | "mail" | "tel"]}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900">
                                                    {user?.[field as "name" | "surname" | "mail" | "tel"] || "-"}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>


                                {/* Şifre Güncelleme */}
                                {editing && (
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Şifre Değiştir</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Mevcut Şifre
                                                </label>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Yeni Şifre
                                                </label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Tekrar Yeni Şifre
                                                </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Üyelik tarihi */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Üyelik Tarihi</label>
                                    <p className="text-gray-900">{new Date(user?.created_at).toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
