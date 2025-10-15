"use client";

import {
    Save,
    Trash2,
    X, UserPlus, Shield,
} from "lucide-react";
import React, {useEffect, useState} from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Sidebar from "@/components/sidebar";
import {useUsers} from "@/lib/users";

export default function ProductsManagement() {
    const {fetchUsers,selectAdmin,selectedUser,addAdmin} = useUsers()
    const [admins, setAdmins] = useState(selectedUser);
    const [showAddAdminForm , setshowAddAdminForm ] = useState(null);
    const [newAdmin, setNewAdmin] = useState({ email: "" });
    useEffect(() => {
        const runOnMount = async () => {
            await fetchUsers();
        };
        runOnMount();
    }, []);
    useEffect(() => {
        if (selectedUser) {
            setAdmins(selectedUser)
        }
    }, [selectedUser]);
    const handleDeleteAdmin = async(id) => {
        if (confirm("Are you sure you want to remove this administrator?")) {
            setAdmins(admins.filter(a => a.id !== id));
            const adminMail = admins.find(a => a.id === id)?.mail;
            const payload = {
                mail: adminMail,
                role: "user"
            };
            await addAdmin(payload);
        }
    };
    const handleAddAdmin = async () => {
        const payload = {
            mail: newAdmin.email,
            role: "admin",
        };
        await addAdmin(payload);
        setshowAddAdminForm(false);
        setNewAdmin({ email: "" });
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
                            <Sidebar/>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 space-y-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold">Admin Yönetimi</h2>
                                <button
                                    onClick={() => setshowAddAdminForm({ id: null, name: "", email: "", role: "Product Manager", status: "Active" })}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                                >
                                    <UserPlus size={20} className="mr-2" />
                                    Admin Ekle
                                </button>
                            </div>

                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İsim</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Butonlar</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {admins?.map((admin) => (
                                        <tr key={admin.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                                            <Shield size={20} className="text-gray-600" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{admin.name} {admin.surname}</div>
                                                        <div className="text-sm text-gray-500">{admin.mail}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.tel}</td>

                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                <button
                                                    onClick={() => handleDeleteAdmin(admin.id)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {/* Edit Admin Modal */}
                                {showAddAdminForm && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                                        <div className="bg-white rounded-lg p-6 w-full max-w-md">
                                            <h3 className="text-lg font-semibold mb-4">Yeni Yönetici Ekle</h3>

                                            <div className="space-y-4">
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    value={newAdmin.email}
                                                    onChange={(e) =>
                                                        setNewAdmin({ ...newAdmin, email: e.target.value })
                                                    }
                                                    className="w-full px-4 py-2 border rounded-lg"
                                                />
                                            </div>

                                            <div className="flex space-x-3 mt-6">
                                                <button
                                                    onClick={handleAddAdmin}
                                                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 flex items-center justify-center"
                                                >
                                                    <Save size={16} className="inline mr-2" />
                                                    Kaydet
                                                </button>
                                                <button
                                                    onClick={() => setshowAddAdminForm(false)}
                                                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 flex items-center justify-center"
                                                >
                                                    <X size={16} className="inline mr-2" />
                                                    İptal
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
