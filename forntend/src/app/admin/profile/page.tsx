"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import Link from "next/link";
export default function OrdersManagement() {
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState({
        firstName: "Enes",
        lastName: "Seven",
        email: "enes@example.com",
        memberSince: "2023-01-01",
    });

    const [formData, setFormData] = useState({
        ...user,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Burada backend API'ye gönderim yapılabilir
        setUser({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            memberSince: user.memberSince,
        });

        if (formData.newPassword && formData.newPassword === formData.confirmPassword) {
            console.log("Password updated:", formData.newPassword);
            // şifre güncelleme API çağrısı
        }

        setEditing(false);
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
                                        {editing ? "Save Changes" : "Edit Profile"}
                                    </button>
                                </div>

                                {/* İsim - Soyisim */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    {["firstName", "lastName"].map((field, idx) => (
                                        <div key={idx}>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                {field === "firstName" ? "First Name" : "Last Name"}
                                            </label>
                                            {editing ? (
                                                <input
                                                    type="text"
                                                    name={field}
                                                    value={formData[field as "firstName" | "lastName"]}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            ) : (
                                                <p className="text-gray-900">{user[field as "firstName" | "lastName"]}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Email */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                    {editing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{user.email}</p>
                                    )}
                                </div>

                                {/* Şifre Güncelleme */}
                                {editing && (
                                    <div className="mb-4">
                                        <h3 className="text-lg font-semibold mb-2">Change Password</h3>
                                        <div className="space-y-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Current Password
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
                                                    New Password
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
                                                    Confirm New Password
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
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                                    <p className="text-gray-900">{user.memberSince}</p>
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
