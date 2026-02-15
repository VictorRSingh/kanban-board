"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleSession = async () => {
            const { data: {session}} = await supabase.auth.getSession()

            if (session) {
                router.push("/dashboard");
            } else {
                router.push("/login");
            }
        }
        handleSession();
    }, [])

    return <p className="min-h-screen w-full flex items-center justify-center">Signing you in...</p>
}