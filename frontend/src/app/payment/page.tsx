"use client";

import React, {useEffect, useState} from "react";
import {
    CreditCard,
    Building2,
    Smartphone,
    Lock,
    CheckCircle,
    AlertCircle,
    ArrowLeft,
    ShoppingBag,
    Truck,
    MapPin,
    User,
    Mail,
    Phone,
    Calendar,
    Shield
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import {useAuth} from "@/lib/auth";
import {useCart} from "@/lib/cart";
import {useCampaigns} from "@/lib/campaign";
import {useProducts} from "@/lib/products";
import {useOrders} from "@/lib/orders";

export default function PaymentPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const {user} = useAuth()
    const {cart } = useCart()
    const { campaigns } = useCampaigns();
    const [cartItems, setItemsWithDiscount] = useState([]);
    const {addOrder} = useOrders()
    const getDiscountedPrice = (product: any) => {
        if (!campaigns || campaigns.length === 0) return product.price;

        const campaign = campaigns.find((c: any) =>
            c.products?.some((p: any) => p.id === product.id) ||
            c.categories?.some((cat: any) =>
                product.categories?.some((pcat: any) => pcat.id === cat.id)
            )
        );

        if (!campaign) return product.price;

        if (campaign.type === "Sabit") {
            return Math.max(product.price - campaign.price, 0);
        } else if (campaign.type === "Yüzde") {
            return product.price * (1 - campaign.price / 100);
        }
        return product.price;
    };
    useEffect(() => {
        if (cart.length > 0) {
            const updated = cart.map(item => ({
                ...item,
                discountedPrice: getDiscountedPrice(item),
            }));
            setItemsWithDiscount(updated);
        }
    }, [cart, campaigns]);
    const [formData, setFormData] = useState({
        firstName: user?.name || "",
        lastName: user?.surname || "",
        email: user?.mail || "",
        phone: user?.tel || "",

        address: user?.addresses.address || "",
        cardNumber: user?.payments.number ||  "",
        cardName: user?.payments.name || "",
        expiryDate: user?.payments.date || "",
        cvv: user?.payments.cvv || "",

        // Mobile Payment
        mobileNumber: user?.tel || "",
        mobileProvider: "apple-pay",

        saveInfo: false,
        agreeTerms: false
    });
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountedTotal = cartItems.reduce((sum, item) => {
        const priceToUse =
            item.discountedPrice && item.discountedPrice !== item.price
                ? item.discountedPrice
                : item.price;
        return sum + priceToUse * item.quantity;
    }, 0);
    const shipping = 15.00;
    const indirim = subtotal - discountedTotal
    const total = subtotal + shipping - indirim ;
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

        // Clear error for this field
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };

    const handleCardNumberChange = (e) => {
        const formatted = formatCardNumber(e.target.value);
        setFormData({ ...formData, cardNumber: formatted });
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        if (v.length >= 2) {
            return v.slice(0, 2) + "/" + v.slice(2, 4);
        }
        return v;
    };

    const handleExpiryChange = (e) => {
        const formatted = formatExpiryDate(e.target.value);
        setFormData({ ...formData, expiryDate: formatted });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cart.length === 0) {
            return;
        }
        setProcessing(true);
        try {
            const orderDetails = cart.map(item => {
                const discountedPrice = getDiscountedPrice(item)
                return {
                    product_id: item.id,
                    piece: item.quantity,
                    price: discountedPrice
                };
            });
            const orderData = {
                user_id: user.id,
                time: new Date().toISOString(),
                status: "Beklemede",
                status_detail: "Sipariş oluşturuldu",
                detail: orderDetails
            };
            await addOrder(orderData);
            setTimeout(() => {
                setProcessing(false);
                setPaymentSuccess(true);
            }, 3000);
        } catch (err) {
            console.error(err);
            setProcessing(false);
        }
    };
    if (paymentSuccess) {
        return (
            <div>
                <Header />
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
                    <div className="max-w-md w-full mx-4">
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
                                <CheckCircle className="h-12 w-12 text-green-600" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Ödeme Başarılı</h2>
                            <p className="text-gray-600 mb-6">
                                Siparişiniz onaylandı. En kısa sürede size bir onay e-postası göndereceğiz.
                            </p>
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                <p className="text-sm text-gray-600 mb-1">Sipariş Toplamı</p>
                                <p className="text-3xl font-bold text-gray-900">{total.toFixed(2)}₺</p>
                            </div>
                            <button
                                onClick={() => router.push(`/profile/${user.id}`)}
                                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                            >
                                Siparişimi Görüntüle
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    return (
        <div>
            <Header />
            <div className="py-8 bg-gray-50 min-h-screen">
                <div className="container mx-auto px-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
                    >
                        <ArrowLeft size={20} className="mr-2" />
                        Geri Dön
                    </button>

                    <h1 className="text-3xl font-bold mb-8">Konrol</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Forms */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Contact Information */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <User className="mr-2 text-blue-600" size={24} />
                                        İletişim Bilgileri
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                İsim *
                                            </label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                                    errors.firstName ? "border-red-500" : "border-gray-300"
                                                }`}
                                                placeholder="John"
                                            />
                                            {errors.firstName && (
                                                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Soyisim
                                            </label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                                    errors.lastName ? "border-red-500" : "border-gray-300"
                                                }`}
                                                placeholder="Doe"
                                            />
                                            {errors.lastName && (
                                                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                                        errors.email ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Telefon Numarası
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <Truck className="mr-2 text-blue-600" size={24} />
                                        Kargo Adresi
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Adres
                                            </label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                                <input
                                                    type="text"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleInputChange}
                                                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                                        errors.address ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                    placeholder="123 Main Street, Apt 4B"
                                                />
                                            </div>
                                            {errors.address && (
                                                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method Selection */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                                        <Lock className="mr-2 text-blue-600" size={24} />
                                        Ödeme Bilgileri
                                    </h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod("card")}
                                            className={`p-4 border-2 rounded-lg flex flex-col items-center transition-all ${
                                                paymentMethod === "card"
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <CreditCard className={paymentMethod === "card" ? "text-blue-600" : "text-gray-400"} size={32} />
                                            <span className="mt-2 font-medium">Kart</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod("mobile")}
                                            className={`p-4 border-2 rounded-lg flex flex-col items-center transition-all ${
                                                paymentMethod === "mobile"
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                            }`}
                                        >
                                            <Smartphone className={paymentMethod === "mobile" ? "text-blue-600" : "text-gray-400"} size={32} />
                                            <span className="mt-2 font-medium">Mobil Ödeme</span>
                                        </button>
                                    </div>

                                    {/* Credit Card Form */}
                                    {paymentMethod === "card" && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Kart Numarası
                                                </label>
                                                <div className="relative">
                                                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                    <input
                                                        type="text"
                                                        name="cardNumber"
                                                        value={formData.cardNumber}
                                                        onChange={handleCardNumberChange}
                                                        maxLength="19"
                                                        className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                                            errors.cardNumber ? "border-red-500" : "border-gray-300"
                                                        }`}
                                                        placeholder="1234 5678 9012 3456"
                                                    />
                                                </div>
                                                {errors.cardNumber && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Kart Üstündeki İsim *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                                        errors.cardName ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                    placeholder="JOHN DOE"
                                                />
                                                {errors.cardName && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Son Kullanım Tarihi *
                                                    </label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                        <input
                                                            type="text"
                                                            name="expiryDate"
                                                            value={formData.expiryDate}
                                                            onChange={handleExpiryChange}
                                                            maxLength="5"
                                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                                                errors.expiryDate ? "border-red-500" : "border-gray-300"
                                                            }`}
                                                            placeholder="MM/YY"
                                                        />
                                                    </div>
                                                    {errors.expiryDate && (
                                                        <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        CVV *
                                                    </label>
                                                    <div className="relative">
                                                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                                        <input
                                                            type="text"
                                                            name="cvv"
                                                            value={formData.cvv}
                                                            onChange={handleInputChange}
                                                            maxLength="4"
                                                            className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                                                errors.cvv ? "border-red-500" : "border-gray-300"
                                                            }`}
                                                            placeholder="123"
                                                        />
                                                    </div>
                                                    {errors.cvv && (
                                                        <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Mobile Payment Form */}
                                    {paymentMethod === "mobile" && (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Sağlayıcı Seçin
                                                </label>
                                                <select
                                                    name="mobileProvider"
                                                    value={formData.mobileProvider}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="apple-pay">Apple Pay</option>
                                                    <option value="google-pay">Google Pay</option>
                                                    <option value="paypal">PayPal</option>
                                                    <option value="venmo">Venmo</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Telefon Numarası
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="mobileNumber"
                                                    value={formData.mobileNumber}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                                        errors.mobileNumber ? "border-red-500" : "border-gray-300"
                                                    }`}
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                                {errors.mobileNumber && (
                                                    <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Terms and Submit */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <div className="space-y-4">
                                        <label className="flex items-start">
                                            <input
                                                type="checkbox"
                                                name="saveInfo"
                                                checked={formData.saveInfo}
                                                onChange={handleInputChange}
                                                className="mt-1 mr-2"
                                            />
                                            <span className="text-sm text-gray-600">
                                                Bir dahaki sefere daha hızlı ödeme yapabilmek için bilgilerimi kaydet.
                                            </span>
                                        </label>
                                        <label className="flex items-start">
                                            <input
                                                type="checkbox"
                                                name="agreeTerms"
                                                checked={formData.agreeTerms}
                                                onChange={handleInputChange}
                                                className="mt-1 mr-2"
                                            />
                                            <span className="text-sm text-gray-600">
                                                <a href="payment/warning" className="text-blue-600 hover:underline">
                                                    Şartlar ve Koşullar
                                                </a>{" "}
                                                ile{" "}
                                                <a href="payment/warning" className="text-blue-600 hover:underline">
                                                    Gizlilik Polikası'nı
                                                </a>{" "}
                                               kabul ediyorum
                                            </span>
                                        </label>
                                        {errors.agreeTerms && (
                                            <p className="text-red-500 text-xs">{errors.agreeTerms}</p>
                                        )}
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className={`w-full mt-6 py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center ${
                                            processing
                                                ? "bg-gray-400 cursor-not-allowed"
                                                : "bg-blue-600 hover:bg-blue-700 text-white"
                                        }`}
                                    >
                                        {processing ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                Ödeme işleniyor...
                                            </>
                                        ) : (
                                            <>
                                                <Lock size={20} className="mr-2" />
                                                Ödemeyi Tamamla - {total.toFixed(2)}₺
                                            </>
                                        )}
                                    </button>

                                    <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                                        <Shield size={16} className="mr-2" />
                                        Ödeme bilgileriniz güvenli ve şifrelidir
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                <h2 className="text-xl font-semibold mb-4 flex items-center">
                                    <ShoppingBag className="mr-2 text-blue-600" size={24} />
                                    Sipariş Özeti
                                </h2>

                                {/* Cart Items */}
                                <div className="space-y-4 mb-6">
                                    {cartItems && cartItems.length > 0 ? (
                                        cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-4">
                                                <img
                                                    src={`http://localhost:8000${item.image_url}`}
                                                    alt={item.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                                                    <p className="text-sm text-gray-500">Adet: {item.quantity}</p>
                                                </div>

                                                <div className="text-right">
                                                    {item.discountedPrice && item.discountedPrice !== item.price ? (
                                                        <>
                                                          <span className="block text-gray-400 line-through text-sm">
                                                            {(item.price * item.quantity).toFixed(2)}₺
                                                          </span>
                                                            <span className="block text-blue-600 font-semibold">
                                                            {(item.discountedPrice * item.quantity).toFixed(2)}₺
                                                          </span>
                                                        </>
                                                    ) : (
                                                        <span className="block text-blue-600 font-semibold">
                                                          {(item.price * item.quantity).toFixed(2)}₺
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">Sepetiniz boş.</p>
                                    )}
                                </div>

                                {/* Price Breakdown */}
                                <div className="border-t border-gray-200 pt-4 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Toplam</span>
                                        <span className="text-gray-900">{((subtotal ?? 0).toFixed(2))}₺</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">İndirim</span>
                                        <span className="text-gray-900">- {((indirim ?? 0).toFixed(2))}₺</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Kargo</span>
                                        <span className="text-gray-900">{((shipping ?? 0).toFixed(2))}₺</span>
                                    </div>
                                    <div className="border-t border-gray-200 pt-3 flex justify-between">
                                        <span className="text-lg font-semibold text-gray-900">Ana Toplam</span>
                                        <span className="text-lg font-bold text-blue-600">
                                          {((total ?? 0).toFixed(2))}₺
                                        </span>
                                    </div>
                                </div>

                                {/* Security Badges */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <Shield size={16} className="mr-1" />
                                            Güvenli
                                        </div>
                                        <div className="flex items-center">
                                            <Lock size={16} className="mr-1" />
                                            Şifreli
                                        </div>
                                        <div className="flex items-center">
                                            <CheckCircle size={16} className="mr-1" />
                                            Doğrulandı
                                        </div>
                                    </div>
                                    <p className="text-center text-xs text-gray-500 mt-3">
                                        %100 güvenli ödeme işleme
                                    </p>
                                </div>

                                {/* Accepted Payment Methods */}
                                <div className="mt-6">
                                    <p className="text-xs text-gray-500 text-center mb-2">Kabul Ediyoruz</p>
                                    <div className="flex justify-center items-center space-x-3">
                                        <div className="bg-gray-100 px-3 py-2 rounded text-xs font-medium">VISA</div>
                                        <div className="bg-gray-100 px-3 py-2 rounded text-xs font-medium">Master Card</div>
                                    </div>
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