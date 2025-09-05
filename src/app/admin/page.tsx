"use client";

import React, { useState } from "react";
import {
    Package,
    Users,
    Settings,
    Tag,
    Mail,
    Plus,
    Edit,
    Trash2,
    Search,
    Star,
    DollarSign,
    UserPlus,
    Shield,
    MessageSquare,
    BarChart3,
    Calendar,
    Eye,
    Save,
    X,
    Phone,
    Truck,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

// Sample data for demonstration
const sampleProducts = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        stock: 45,
        category: "Electronics",
        status: "Active",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop"
    },
    {
        id: 2,
        name: "Smart Fitness Watch",
        price: 199.99,
        stock: 32,
        category: "Electronics",
        status: "Active",
        image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=150&h=150&fit=crop"
    },
    {
        id: 3,
        name: "Laptop Stand Pro",
        price: 79.99,
        stock: 0,
        category: "Accessories",
        status: "Out of Stock",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=150&h=150&fit=crop"
    }
];

const sampleCampaigns = [
    {
        id: 1,
        name: "Summer Sale 2025",
        discount: 25,
        type: "Percentage",
        startDate: "2025-06-01",
        endDate: "2025-08-31",
        status: "Active",
        products: ["All Electronics"]
    },
    {
        id: 2,
        name: "New Year Special",
        discount: 50,
        type: "Fixed Amount",
        startDate: "2025-01-01",
        endDate: "2025-01-31",
        status: "Expired",
        products: ["Premium Wireless Headphones"]
    }
];

const sampleAdmins = [
    {
        id: 1,
        name: "John Admin",
        email: "john@admin.com",
        role: "Super Admin",
        lastLogin: "2025-01-15",
        status: "Active"
    },
    {
        id: 2,
        name: "Sarah Manager",
        email: "sarah@admin.com",
        role: "Product Manager",
        lastLogin: "2025-01-14",
        status: "Active"
    }
];

const sampleContacts = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        subject: "Product Inquiry",
        message: "I have a question about the wireless headphones...",
        date: "2025-01-15",
        status: "New"
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob@example.com",
        subject: "Return Request",
        message: "I would like to return my recent purchase...",
        date: "2025-01-14",
        status: "In Progress"
    }
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [products, setProducts] = useState(sampleProducts);
    const [campaigns, setCampaigns] = useState(sampleCampaigns);
    const [admins, setAdmins] = useState(sampleAdmins);
    const [contacts, setContacts] = useState(sampleContacts);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingCampaign, setEditingCampaign] = useState(null);
    const [editingAdmin, setEditingAdmin] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [contactInfo, setContactInfo] = useState({
        address: "Necmettin Erbakan Üniversitesi, Konya",
        phone: "+90 555 123 4567",
        email: "info@firma.com",
        workingHours: "09:00 - 18:00"
    });
// Siparişler için örnek state
    const [orders, setOrders] = useState([
        { id: 101, customer: "Ali Veli", product: "Laptop", status: "Pending", date: "2025-09-05" },
        { id: 102, customer: "Ayşe Yılmaz", product: "Telefon", status: "Shipped", date: "2025-09-04" }
    ]);
    const tabs = [
        { id: "dashboard", label: "Dashboard", icon: BarChart3 },
        { id: "products", label: "Products", icon: Package },
        { id: "campaigns", label: "Campaigns", icon: Tag },
        { id: "admins", label: "Administrators", icon: Users },
        { id: "message", label: "Messages", icon: Mail },
        { id: "orders", label: "Orders", icon: Truck },
        { id: "contacts", label: "Contact", icon: Phone },
    ];

    // Dashboard Statistics
    const stats = {
        totalProducts: products.length,
        totalOrders: 142,
        totalRevenue: 28459.99,
        activeCampaigns: campaigns.filter(c => c.status === "Active").length
    };

    const handleDeleteProduct = (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleDeleteCampaign = (id) => {
        if (confirm("Are you sure you want to delete this campaign?")) {
            setCampaigns(campaigns.filter(c => c.id !== id));
        }
    };

    const handleDeleteAdmin = (id) => {
        if (confirm("Are you sure you want to remove this administrator?")) {
            setAdmins(admins.filter(a => a.id !== id));
        }
    };

    const renderDashboard = () => (
        <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <Package className="text-blue-600" size={24} />
                        <div className="ml-4">
                            <h3 className="text-2xl font-bold">{stats.totalProducts}</h3>
                            <p className="text-gray-600">Total Products</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <BarChart3 className="text-green-600" size={24} />
                        <div className="ml-4">
                            <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
                            <p className="text-gray-600">Total Orders</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <DollarSign className="text-green-600" size={24} />
                        <div className="ml-4">
                            <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
                            <p className="text-gray-600">Total Revenue</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center">
                        <Tag className="text-purple-600" size={24} />
                        <div className="ml-4">
                            <h3 className="text-2xl font-bold">{stats.activeCampaigns}</h3>
                            <p className="text-gray-600">Active Campaigns</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                <div className="space-y-3">
                    <div className="flex items-center p-3 bg-gray-50 rounded">
                        <Package size={16} className="text-blue-600 mr-3" />
                        <span>New product "Bluetooth Speaker" was added</span>
                        <span className="ml-auto text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded">
                        <Tag size={16} className="text-purple-600 mr-3" />
                        <span>Summer Sale campaign activated</span>
                        <span className="ml-auto text-sm text-gray-500">1 day ago</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded">
                        <Users size={16} className="text-green-600 mr-3" />
                        <span>New administrator added: Sarah Manager</span>
                        <span className="ml-auto text-sm text-gray-500">3 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderProducts = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Product Management</h2>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                >
                    <Plus size={20} className="mr-2" />
                    Add Product
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img className="h-12 w-12 rounded object-cover" src={product.image} alt={product.name} />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        <div className="text-sm text-gray-500">{product.category}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        product.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}>
                                        {product.status}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button
                                    onClick={() => setEditingProduct(product)}
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderCampaigns = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Campaign Management</h2>
                <button
                    onClick={() => setEditingCampaign({ id: null, name: "", discount: 0, type: "Percentage", startDate: "", endDate: "", status: "Active", products: [] })}
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
                >
                    <Plus size={20} className="mr-2" />
                    Create Campaign
                </button>
            </div>

            <div className="grid gap-6">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <h3 className="text-lg font-semibold">{campaign.name}</h3>
                                    <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                                        campaign.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                    }`}>
                                        {campaign.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                    <div>
                                        <span className="font-medium">Discount:</span> {campaign.discount}{campaign.type === "Percentage" ? "%" : "$"}
                                    </div>
                                    <div>
                                        <span className="font-medium">Type:</span> {campaign.type}
                                    </div>
                                    <div>
                                        <span className="font-medium">Start Date:</span> {campaign.startDate}
                                    </div>
                                    <div>
                                        <span className="font-medium">End Date:</span> {campaign.endDate}
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <span className="font-medium text-sm">Applicable Products:</span>
                                    <span className="text-sm text-gray-600 ml-1">{campaign.products.join(", ")}</span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => setEditingCampaign(campaign)}
                                    className="text-blue-600 hover:text-blue-900 p-2"
                                >
                                    <Edit size={16} />
                                </button>
                                <button
                                    onClick={() => handleDeleteCampaign(campaign.id)}
                                    className="text-red-600 hover:text-red-900 p-2"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAdministrators = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Administrator Management</h2>
                <button
                    onClick={() => setEditingAdmin({ id: null, name: "", email: "", role: "Product Manager", status: "Active" })}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                    <UserPlus size={20} className="mr-2" />
                    Add Administrator
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Administrator</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                            <Shield size={20} className="text-gray-600" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                                        <div className="text-sm text-gray-500">{admin.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{admin.lastLogin}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        admin.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}>
                                        {admin.status}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button
                                    onClick={() => setEditingAdmin(admin)}
                                    className="text-blue-600 hover:text-blue-900"
                                >
                                    <Edit size={16} />
                                </button>
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
            </div>
        </div>
    );

    const renderMessage = () => (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact Messages</h2>

            <div className="grid gap-6">
                {contacts.map((contact) => (
                    <div key={contact.id} className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center mb-2">
                                    <h3 className="text-lg font-semibold">{contact.subject}</h3>
                                    <span className={`ml-3 px-2 py-1 text-xs font-semibold rounded-full ${
                                        contact.status === "New" ? "bg-blue-100 text-blue-800" :
                                            contact.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                                                "bg-green-100 text-green-800"
                                    }`}>
                                        {contact.status}
                                    </span>
                                </div>
                                <div className="text-sm text-gray-600 mb-2">
                                    <span className="font-medium">From:</span> {contact.name} ({contact.email})
                                </div>
                                <div className="text-sm text-gray-600 mb-4">
                                    <span className="font-medium">Date:</span> {contact.date}
                                </div>
                                <p className="text-gray-700">{contact.message}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button className="text-blue-600 hover:text-blue-900 p-2" title="Reply">
                                    <MessageSquare size={16} />
                                </button>
                                <button className="text-green-600 hover:text-green-900 p-2" title="Mark as resolved">
                                    <Eye size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    const renderOrders = () => (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Orders Management</h2>
            </div>

            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())).map((product) => (
                        <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <img className="h-12 w-12 rounded object-cover" src={product.image} alt={product.name} />
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        <div className="text-sm text-gray-500">{product.category}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                        product.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                    }`}>
                                        {product.status}
                                    </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <select
                                    value={product.status}
                                    onChange={(e) =>
                                        setOrders(prev =>
                                            prev.map(o =>
                                                o.id === product.id ? { ...o, status: e.target.value } : o
                                            )
                                        )
                                    }
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
    const renderContacts = () => (
        <div className="space-y-6">
            <div className="bg-white shadow-md rounded-xl p-6">
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
                    <button
                        onClick={() => alert("Contact info saved!")}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                    >
                        Save
                    </button>
                </div>

                <div className="grid gap-4">
                    <input
                        type="text"
                        value={contactInfo.address}
                        onChange={(e) =>
                            setContactInfo({ ...contactInfo, address: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="Address"
                    />
                    <input
                        type="text"
                        value={contactInfo.phone}
                        onChange={(e) =>
                            setContactInfo({ ...contactInfo, phone: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="Phone"
                    />
                    <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) =>
                            setContactInfo({ ...contactInfo, email: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="Email"
                    />
                    <input
                        type="text"
                        value={contactInfo.workingHours}
                        onChange={(e) =>
                            setContactInfo({ ...contactInfo, workingHours: e.target.value })
                        }
                        className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="Working Hours"
                    />
                </div>
            </div>
        </div>
    );
    return (
        <div>
            <Header/>
            <div className="py-8 bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-2">Manage your e-commerce platform</p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-6">
                        {/* Sidebar */}
                        <div className="lg:w-1/4">
                            <nav className="bg-white rounded-lg shadow-md p-4">
                                <ul className="space-y-2">
                                    {tabs.map((tab) => (
                                        <li key={tab.id}>
                                            <button
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                                                    activeTab === tab.id
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-600 hover:bg-gray-100"
                                                }`}
                                            >
                                                <tab.icon size={20} className="mr-3"/>
                                                {tab.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>

                        {/* Main Content */}
                        <div className="lg:w-3/4">
                            {activeTab === "dashboard" && renderDashboard()}
                            {activeTab === "products" && renderProducts()}
                            {activeTab === "campaigns" && renderCampaigns()}
                            {activeTab === "admins" && renderAdministrators()}
                            {activeTab === "message" && renderMessage()}
                            {activeTab === "orders" && renderOrders()}
                            {activeTab === "contacts" && renderContacts()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Edit Product</h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={editingProduct.name}
                                onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={editingProduct.price}
                                onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={editingProduct.stock}
                                onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value)})}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <select
                                value={editingProduct.status}
                                onChange={(e) => setEditingProduct({...editingProduct, status: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Active">Active</option>
                                <option value="Out of Stock">Out of Stock</option>
                                <option value="Discontinued">Discontinued</option>
                            </select>
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => {
                                    const updatedProducts = products.map(p =>
                                        p.id === editingProduct.id ? editingProduct : p
                                    );
                                    setProducts(updatedProducts);
                                    setEditingProduct(null);
                                }}
                                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                            >
                                <Save size={16} className="inline mr-2" />
                                Save
                            </button>
                            <button
                                onClick={() => setEditingProduct(null)}
                                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                            >
                                <X size={16} className="inline mr-2" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Campaign Modal */}
            {editingCampaign && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            {editingCampaign.id ? "Edit Campaign" : "Create Campaign"}
                        </h3>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Campaign Name"
                                value={editingCampaign.name}
                                onChange={(e) => setEditingCampaign({...editingCampaign, name: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <input
                                type="number"
                                placeholder="Discount Amount"
                                value={editingCampaign.discount}
                                onChange={(e) => setEditingCampaign({...editingCampaign, discount: parseFloat(e.target.value)})}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <select
                                value={editingCampaign.type}
                                onChange={(e) => setEditingCampaign({...editingCampaign, type: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Percentage">Percentage</option>
                                <option value="Fixed Amount">Fixed Amount</option>
                            </select>
                            <input
                                type="date"
                                placeholder="Start Date"
                                value={editingCampaign.startDate}
                                onChange={(e) => setEditingCampaign({...editingCampaign, startDate: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <input
                                type="date"
                                placeholder="End Date"
                                value={editingCampaign.endDate}
                                onChange={(e) => setEditingCampaign({...editingCampaign, endDate: e.target.value})}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                        </div>
                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => {
                                    if (editingCampaign.id) {
                                        // Düzenleme
                                        setCampaigns(prev =>
                                            prev.map(c =>
                                                c.id === editingCampaign.id ? editingCampaign : c
                                            )
                                        );
                                    } else {
                                        // Yeni oluşturma
                                        const newId =
                                            campaigns.length > 0
                                                ? Math.max(...campaigns.map(c => c.id)) + 1
                                                : 1;
                                        setCampaigns(prev => [
                                            ...prev,
                                            { ...editingCampaign, id: newId }
                                        ]);
                                    }
                                    setEditingCampaign(null);
                                }}
                                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
                            >
                                <Save size={16} className="inline mr-2" />
                                Save
                            </button>
                            <button
                                onClick={() => setEditingCampaign(null)}
                                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                            >
                                <X size={16} className="inline mr-2" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Product Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Add Product</h3>
                        <AddOrEditProductForm
                            onCancel={() => setShowAddForm(false)}
                            onSubmit={(newProduct) => {
                                const newId =
                                    products.length > 0
                                        ? Math.max(...products.map(p => p.id)) + 1
                                        : 1;
                                setProducts(prev => [...prev, { ...newProduct, id: newId }]);
                                setShowAddForm(false);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Edit Admin Modal */}
            {editingAdmin && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">
                            {editingAdmin.id ? "Edit Administrator" : "Add Administrator"}
                        </h3>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={editingAdmin.name}
                                onChange={(e) =>
                                    setEditingAdmin({ ...editingAdmin, name: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={editingAdmin.email}
                                onChange={(e) =>
                                    setEditingAdmin({ ...editingAdmin, email: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <select
                                value={editingAdmin.role}
                                onChange={(e) =>
                                    setEditingAdmin({ ...editingAdmin, role: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Super Admin">Super Admin</option>
                                <option value="Product Manager">Product Manager</option>
                                <option value="Marketing Manager">Marketing Manager</option>
                                <option value="Support">Support</option>
                            </select>
                            <select
                                value={editingAdmin.status}
                                onChange={(e) =>
                                    setEditingAdmin({ ...editingAdmin, status: e.target.value })
                                }
                                className="w-full px-4 py-2 border rounded-lg"
                            >
                                <option value="Active">Active</option>
                                <option value="Disabled">Disabled</option>
                            </select>
                        </div>

                        <div className="flex space-x-3 mt-6">
                            <button
                                onClick={() => {
                                    if (editingAdmin.id) {
                                        // Düzenle
                                        setAdmins(prev =>
                                            prev.map(a =>
                                                a.id === editingAdmin.id ? editingAdmin : a
                                            )
                                        );
                                    } else {
                                        // Yeni ekle
                                        const newId =
                                            admins.length > 0
                                                ? Math.max(...admins.map(a => a.id)) + 1
                                                : 1;
                                        setAdmins(prev => [
                                            ...prev,
                                            {
                                                ...editingAdmin,
                                                id: newId,
                                                lastLogin: new Date().toISOString().slice(0, 10)
                                            }
                                        ]);
                                    }
                                    setEditingAdmin(null);
                                }}
                                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                            >
                                <Save size={16} className="inline mr-2" />
                                Save
                            </button>
                            <button
                                onClick={() => setEditingAdmin(null)}
                                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                            >
                                <X size={16} className="inline mr-2" />
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

/** ------------------------------------------
 *  Small, reusable Product Form component
 *  ------------------------------------------ */
function AddOrEditProductForm({
                                  initialValue = {
                                      name: "",
                                      price: 0,
                                      stock: 0,
                                      category: "",
                                      status: "Active",
                                      image: ""
                                  },
                                  onSubmit,
                                  onCancel
                              }: {
    initialValue?: {
        name: string;
        price: number;
        stock: number;
        category: string;
        status: "Active" | "Out of Stock" | "Discontinued";
        image: string;
    };
    onSubmit: (product: any) => void;
    onCancel: () => void;
}) {
    const [form, setForm] = React.useState(initialValue);

    return (
        <>
            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) =>
                        setForm({ ...form, price: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                    type="number"
                    placeholder="Stock"
                    value={form.stock}
                    onChange={(e) =>
                        setForm({ ...form, stock: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                <select
                    value={form.status}
                    onChange={(e) =>
                        setForm({ ...form, status: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                >
                    <option value="Active">Active</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                </select>
                <input
                    type="url"
                    placeholder="Image URL"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                />
            </div>

            <div className="flex space-x-3 mt-6">
                <button
                    onClick={() => onSubmit(form)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    <Save size={16} className="inline mr-2" />
                    Save
                </button>
                <button
                    onClick={onCancel}
                    className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
                >
                    <X size={16} className="inline mr-2" />
                    Cancel
                </button>
            </div>
        </>
    );
}