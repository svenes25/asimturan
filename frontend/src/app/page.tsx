"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
export default function Page() {
    const router = useRouter();

    useEffect(() => {
        router.push("/home");
    }, [router]);

    return null;
}

