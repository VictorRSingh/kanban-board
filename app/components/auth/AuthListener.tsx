"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AuthListener() {
    const router = useRouter();

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event) => {
        // console.log("Auth event", event);

        if (event === "SIGNED_OUT") {
          router.push("/");
        }

        if (event === "TOKEN_REFRESHED") {
          console.log("Token refreshed");
        }
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  return null;
}
