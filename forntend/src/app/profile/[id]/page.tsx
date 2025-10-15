"use client"
import React, { useState, useEffect, useCallback } from "react";
import { Star, MessageSquare, Edit3, Check, X } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useUsers } from "@/lib/users";
import { useAuth } from "@/lib/auth";
import { useParams } from "next/navigation";
import { useProducts } from "@/lib/products";
export default function ProfilePage({ onNavigate }) {
    const params = useParams();
    const userId = params.id;
    const [editing, setEditing] = useState(false);
    const { fetchUser, user, updateUser, updateAddress, updatePayment ,updatePassword} = useUsers();
    const { submitProductStar, submitProductComment } = useProducts();
    const [reviewingItem, setReviewingItem] = useState<ReviewItemState>(null);
    const [reviewData, setReviewData] = useState({ stars: 5, comment: "" });
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        mail: "",
        tel: "",
        addresses: [],
        payment: { name: "", number: "", date: "", cvv: "" },
        orders: [],
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                surname: user.surname || "",
                mail: user.mail || "",
                tel: user.tel || "",
                addresses: user.addresses || [],
                // payments bir liste olduğu için ilk elemanı alıyoruz
                payment: user.payments?.[0] || { name: "", number: "", date: "", cvv: "" },
                orders: user.orders || []
            });
        }
    }, [user]);
    useEffect(() => {
        const getUser = async () => {
            if (!userId) {
                onNavigate && onNavigate("login");
                return;
            }
            // fetchUser, userId'yi string olarak alır ve API'ye gönderir.
            // API'deki endpoint'in bunu int olarak işlemesi beklenir.
            await fetchUser(userId);
        };

        getUser();
    }, [userId, fetchUser, onNavigate]);
    const handleChange = (e, field, addrIndex = null) => {
        if (field === "addresses" && addrIndex !== null) {
            const newAddresses = [...formData.addresses];
            newAddresses[addrIndex][e.target.name] = e.target.value;
            setFormData({ ...formData, addresses: newAddresses });
        } else if (field === "payment") {
            setFormData({ ...formData, payment: { ...formData.payment, [e.target.name]: e.target.value } });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };
    const handleSave = async () => {
        try {
            await updateUser(userId, {
                name: formData.name,
                surname: formData.surname,
                mail: formData.mail,
                tel: formData.tel
            });
            const firstAddressObj = (formData.addresses || []).find(a => (a.address || "").trim() !== "");
            const addressString = firstAddressObj ? firstAddressObj.address : "";

            // Adres güncelleme (API'nin tek adres stringi beklediği varsayımıyla)
            await updateAddress(userId, { address: addressString });

            // Ödeme güncelleme (API'nin tek ödeme objesi beklediği varsayımıyla)
            await updatePayment(userId, {
                name: formData.payment.name,
                number: formData.payment.number,
                date: formData.payment.date,
                cvv: formData.payment.cvv
            });

            setEditing(false);
            alert("Profil başarıyla güncellendi!");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Güncelleme sırasında hata oluştu!");
        }
    };
    const startReview = (orderId: number, itemIndex: number) => {
        const order = user.orders.find(o => o.id === orderId);
        if (!order) return;

        const item = order.detail[itemIndex];
        setReviewingItem({ orderId, itemIndex });

        // Mevcut puan/yorum varsa formu onunla doldur
        setReviewData({
            stars: item.stars || 5,
            comment: item.comment || ""
        });
    };
    const saveReview = async () => {
        if (!reviewingItem || !user || !user.orders) return;

        // Sipariş ve Ürün detaylarını bulma
        const order = user.orders.find(o => o.id === reviewingItem.orderId);
        const item = order?.detail[reviewingItem.itemIndex];

        if (!order || !item || !userId) return;

        if (reviewData.comment.length < 5) {
            alert("Lütfen en az 5 karakterlik bir yorum girin.");
            return;
        }

        const numericUserId = Number(userId);

        const reviewStarData: ProductStarCreate = {
            product_id: item.product_id,
            user_id: numericUserId,
            stars: reviewData.stars
        };
        const reviewCommentData: ProductCommentCreate = {
            product_id: item.product_id,
            user_id: numericUserId,
            comment: reviewData.comment
        };

        try {
            const sresult = await submitProductStar(reviewStarData);

            // 2. Yorumu Gönder (submitProductComment, POST/PUT kararını kendi verir)
            const cresult = await submitProductComment(reviewCommentData);

            if (sresult && cresult) {
                // Başarılı olursa, yerel state'i güncelle (sayfa yenilemeden yeni puanı göster)
                const newOrders = formData.orders.map(o => {
                    if (o.id === reviewingItem.orderId) {
                        const newDetails = o.detail.map((d, idx) => {
                            if (idx === reviewingItem.itemIndex) {
                                // Yeni puan ve yorumu ekle
                                return {
                                    ...d,
                                    stars: reviewData.stars,
                                    comment: reviewData.comment
                                };
                            }
                            return d;
                        });
                        return { ...o, detail: newDetails };
                    }
                    return o;
                });

                setFormData(prev => ({ ...prev, orders: newOrders }));
                setReviewingItem(null);
                setReviewData({ stars: 5, comment: "" });
            }
        } catch(error) {
            console.error("Review save failed:", error);
            alert("İnceleme kaydedilirken beklenmedik bir hata oluştu.");
        }
    };
    const cancelReview = () => {
        setReviewingItem(null);
        setReviewData({ stars: 5, comment: "" });
    };
    const renderStars = (stars, interactive = false, onStarClick = null) => {
        const safeRating = Math.round(stars || 0);
        return (
            <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => interactive && onStarClick && onStarClick(star)}
                        className={`focus:outline-none ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
                        disabled={!interactive}
                    >
                        <Star
                            size={interactive ? 24 : 16}
                            className={star <= safeRating ? "text-yellow-400 fill-current" : "text-gray-300"}
                        />
                    </button>
                ))}
            </div>
        );
    };
    if (!user) {
        return (
            <div className="py-8">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl font-bold mb-4">Erişim Engellendi</h1>
                    <p className="text-gray-600 mb-8">Profilinizi görüntülemek için lütfen giriş yapın.</p>
                    <button
                        onClick={() => onNavigate && onNavigate("login")}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Giriş Yap
                    </button>
                </div>
            </div>
        );
    }
    const handleChangePassword = async () => {
        // Önce şifrelerin eşleştiğinden emin ol
        if (formData.newPassword !== formData.confirmPassword) {
            alert("Yeni şifreler eşleşmiyor!");
            return;
        }

        try {
            const response = await updatePassword(user?.id,formData.currentPassword,formData.newPassword)
            alert("Şifre başarıyla değiştirildi!");
            setFormData(prev => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            }));
            setEditing(false)
        } catch (error: any) {
            console.error(error);
            alert(error.message || "Şifre değiştirilemedi");
        }
    };
    return (
        <div>
            <Header />
            <div className="py-8">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h1 className="text-3xl font-bold mb-8">Profilim</h1>

                    {/* Personal Info */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Kişisel Bilgiler</h2>
                            <button
                                onClick={() => (editing ? handleSave() : setEditing(true))}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                {editing ? "Kaydet" : "Güncelle"}
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            {["name", "surname"].map((field, idx) => (
                                <div key={idx}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {field === "name" ? "İsim" : "Soyisim"}
                                    </label>
                                    {editing ? (
                                        <input
                                            type="text"
                                            name={field}
                                            value={formData[field]}
                                            onChange={(e) => handleChange(e, field)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{user[field]}</p>
                                    )}
                                </div>
                            ))}

                            {["mail", "tel"].map((field, idx) => (
                                <div key={idx}>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {field === "mail" ? "Mail" : "Telefon"}
                                    </label>
                                    {editing ? (
                                        <input
                                            type={field === "mail" ? "mail" : "tel"}
                                            name={field}
                                            value={formData[field]}
                                            onChange={(e) => handleChange(e, field)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    ) : (
                                        <p className="text-gray-900">{user[field === "mail" ? "mail" : "tel"]}</p>
                                    )}
                                </div>
                            ))}
                        </div>
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
                                        value={formData.currentPassword || ""}
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
                                        value={formData.newPassword || ""}
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
                                        value={formData.confirmPassword || ""}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <button
                                    onClick={handleChangePassword}
                                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    Şifreyi Güncelle
                                </button>
                            </div>
                        </div>
                            )}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Üyelik Tarihi</label>
                            <p className="text-gray-900">{new Date(user.created_at).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Adres</h2>
                        {editing ? (
                            formData?.addresses.map((addr, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    name="address"
                                    value={addr.address || ""}
                                    onChange={(e) => {
                                        const newAddresses = [...formData.addresses];
                                        newAddresses[idx].address = e.target.value;
                                        setFormData({ ...formData, addresses: newAddresses });
                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Adres"
                                />
                            ))
                        ) : (
                            <p className="text-gray-900">{formData.addresses[0]?.address || "Adres Bilgisi Yok"}</p>
                        )}
                    </div>
                    {/* Payment Info */}
                    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Ödeme Bilgileri</h2>
                        {editing ? (
                            <div className="grid grid-cols-1 gap-3 mb-4">
                                <label className="text-sm font-medium text-gray-700">
                                    Kart Sahibi
                                    <input
                                        name="name"
                                        type="text"
                                        value={formData.payment?.name || ""}
                                        onChange={(e) => handleChange(e, "payment")}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Ör: ENES DEMİR"
                                        autoComplete="cc-name"
                                        aria-label="Kart sahibi adı"
                                    />
                                </label>

                                <label className="text-sm font-medium text-gray-700">
                                    Kart Numarası
                                    <input
                                        name="number"
                                        type="text"
                                        inputMode="numeric"
                                        pattern="\d*"
                                        maxLength={16}
                                        value={formData.payment?.number || ""}
                                        onChange={(e) => {
                                            const digits = e.target.value.replace(/\D/g, "");
                                            const limited = digits.slice(0, 16);
                                            handleChange({ target: { name: e.target.name, value: limited } }, "payment");
                                        }}
                                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="1234567890123456"
                                        autoComplete="cc-number"
                                        aria-label="Kart numarası"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Boşluksuz 16 haneli kart numarası</p>
                                </label>

                                <div className="grid grid-cols-2 gap-3">
                                    <label className="text-sm font-medium text-gray-700">
                                        Son Kullanma Tarihi
                                        <input
                                            name="date"
                                            type="text"
                                            value={formData.payment?.date || ""}
                                            onChange={(e) => {
                                                let v = e.target.value.replace(/[^\d]/g, "");
                                                if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2, 4);
                                                e.target.value = v;
                                                handleChange(e, "payment");
                                            }}
                                            maxLength={5}
                                            placeholder="MM/YY"
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            autoComplete="cc-exp"
                                            aria-label="Kart son kullanma tarihi"
                                        />
                                    </label>

                                    <label className="text-sm font-medium text-gray-700">
                                        CVV
                                        <input
                                            name="cvv"
                                            type="password"
                                            inputMode="numeric"
                                            maxLength={4}
                                            value={formData.payment?.cvv || ""}
                                            onChange={(e) => {
                                                e.target.value = e.target.value.replace(/[^\d]/g, "");
                                                handleChange(e, "payment");
                                            }}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="123"
                                            autoComplete="cc-csc"
                                            aria-label="Kart CVV"
                                        />
                                    </label>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <p className="text-sm text-gray-500">Kayıtlı Kart</p>
                                <p className="text-gray-900 font-medium">
                                    {formData.payment?.number
                                        ? // maskelenmiş gösterim: son 4 hane görünür
                                        "**** **** **** " + (formData.payment.number.replace(/\s/g, "").slice(-4) || "----")
                                        : "Kayıtlı kart yok"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    Kart sahibi: <span className="text-gray-700">{formData.payment?.name || "-"}</span>
                                </p>
                            </div>
                        )}
                    </div>

                    {editing && (
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={() => setEditing(false)}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 mr-4"
                            >
                                İptal
                            </button>
                        </div>
                    )}

                    {/* Orders with Reviews */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Siparişler</h2>
                        {formData?.orders?.map(order => (
                            <div key={order.id} className="mb-6 border-b pb-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="font-semibold text-lg">Sipariş {order.id}</p>
                                        <p className="text-gray-600 text-sm">Tarih {new Date(order.time).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        order.status === 'Teslim Edildi' ? 'bg-green-100 text-green-800' :
                                            order.status === 'Kargoda' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'}`}>
                                        {order.status}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    {order?.detail?.map((item, itemIndex) => (
                                        <div key={itemIndex} className="bg-gray-50 p-4 rounded-lg">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-900">{item.product_name}</h4>
                                                    <p className="text-gray-600">Adet: {item.piece} × {item.price}₺</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-semibold">{item.piece * item.price}₺</p> {/* Toplam sipariş fiyatını gösteriyor, ürün fiyatı değil */}
                                                </div>
                                            </div>

                                            {/* Review Section */}
                                            {order.status === 'Teslim Edildi' && (
                                                <div className="mt-4 pt-4 border-t border-gray-200">
                                                    {reviewingItem &&
                                                    reviewingItem.orderId === order.id &&
                                                    reviewingItem.itemIndex === itemIndex ? (
                                                        // Review Form
                                                        <div className="space-y-4">
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Puanınız
                                                                </label>
                                                                {renderStars(reviewData.stars, true, (stars) =>
                                                                    setReviewData({ ...reviewData, stars })
                                                                )}
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                                    Yorumunuz
                                                                </label>
                                                                <textarea
                                                                    value={reviewData.comment}
                                                                    onChange={(e) => setReviewData({
                                                                        ...reviewData, comment: e.target.value
                                                                    })}
                                                                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                                    rows={3}
                                                                    placeholder="Ürün hakkındaki deneyiminizi paylaşın..."
                                                                />
                                                            </div>
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={saveReview}
                                                                    disabled={!reviewData.comment || reviewData.comment.length < 5}
                                                                    className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                                                                >
                                                                    <Check size={16} className="mr-2" />
                                                                    Kaydet
                                                                </button>
                                                                <button
                                                                    onClick={cancelReview}
                                                                    className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                                                                >
                                                                    <X size={16} className="mr-2" />
                                                                    İptal
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        // Display Review or Review Button
                                                        <div className="space-y-2">
                                                            {item.stars || item.comment ? (
                                                                <div className="flex items-center justify-between">
                                                                    <div>
                                                                        {renderStars(item.stars)}
                                                                        {item.comment && (
                                                                            <p className="text-gray-700 text-sm bg-white p-2 rounded border mt-1">
                                                                                "{item.comment}"
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <button
                                                                        onClick={() => startReview(order.id, itemIndex)}
                                                                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm ml-2"
                                                                    >
                                                                        <Edit3 size={14} className="mr-1" />
                                                                        Düzenle
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                <button
                                                                    onClick={() => startReview(order.id, itemIndex)}
                                                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                                                >
                                                                    <MessageSquare size={16} className="mr-2" />
                                                                    Yorum Yap
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-end mt-4">
                                    <p className="font-bold text-lg">Toplam Sipariş Tutarı: {order.total}₺</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
