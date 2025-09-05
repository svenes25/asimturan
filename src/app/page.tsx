"use client"
import HomePage from "./home/page";
import Header from "@/components/header";
import { useState } from "react";
import Footer from "@/components/footer";
import ProductsPage from "@/app/products/page";
export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  return (
      <div className="min-h-screen bg-gray-50">
        <main className="min-h-screen">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'products' && <ProductsPage />}
          {/*{currentPage === 'contact' && <ContactPage />}*/}
          {/*{currentPage === 'product' && <ProductPage />}*/}
          {/*{currentPage === 'login' && <LoginPage />}*/}
          {/*{currentPage === 'register' && <RegisterPage />}*/}
          {/*{currentPage === 'profile' && <ProfilePage />}*/}
          {/*{currentPage === 'orders' && <OrdersPage />}*/}
        </main>
      </div>
  );
}
