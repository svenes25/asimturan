"use client"
import HomePage from "./home/page";
import Header from "@/components/header";
import {useEffect, useState} from "react";
import Footer from "@/components/footer";
import ProductsPage from "@/app/products/page";
import {useRouter} from "next/navigation";
export default function Page() {
    const router = useRouter();

    useEffect(() => {
        router.push("/admin/dashboard");
    }, [router]);

    return null;
}

