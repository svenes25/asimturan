"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    BarChart3,
    Package,
    Phone,
    Tag,
    Users,
    Mail,
    Truck,
    Folder,
    User
} from "lucide-react";

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const tabs = [
        { id: "dashboard", label: "Kontrol Paneli", icon: BarChart3 },
        { id: "orders", label: "Siparişler", icon: Truck },
        { id: "products", label: "Ürünler", icon: Package },
        { id: "categories", label: "Kategoriler", icon: Folder },
        { id: "contacts", label: "İletişim", icon: Phone },
        { id: "campaigns", label: "Kampanyalar", icon: Tag },
        { id: "admins", label: "Yöneticiler", icon: Users },
        { id: "comments", label: "Yorumlar", icon: Mail },
        { id: "profile", label: "Profil", icon: User },
    ];

    return (
        <nav className="bg-white rounded-lg shadow-md p-4">
            <ul className="space-y-2">
                {tabs.map((tab) => {
                    const isActive = pathname.startsWith(`/admin/${tab.id}`);
                    return (
                        <li key={tab.id}>
                            <button
                                onClick={() => router.push(`/admin/${tab.id}`)}
                                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                                    isActive
                                        ? "bg-purple-100 text-purple-700 font-medium"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`}
                            >
                                <tab.icon size={20} className="mr-3" />
                                {tab.label}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
