"use client";

import { useState } from "react";
import TextInput from "../ui/TextInput";
import SubmitButton from "../ui/SubmitButton";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    if (!data.session) {
      toast.error("Please confirm your email before logging in.");
      return;
    }

    if (data.session) {
      toast.success("Login successful");
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    }
  };

  return (
    <div className="space-y-2 flex flex-col min-h-screen justify-center items-center mx-2">
      <div className="border p-4 rounded gap-y-4 flex flex-col w-full md:max-w-sm">
        <h1 className="text-2xl font-bold">Login</h1>
        <TextInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <TextInput
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <SubmitButton label="Login" onClick={handleLogin} textColor="text-white" />
      </div>
      <button
        className="text-blue-500 italic cursor-pointer"
        onClick={() => router.push("/signup")}
      >
        Dont have an account? Sign up
      </button>
    </div>
  );
}
