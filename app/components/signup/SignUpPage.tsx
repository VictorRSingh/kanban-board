"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import TextInput from "../ui/TextInput";
import SubmitButton from "../ui/SubmitButton";
import toast from "react-hot-toast";
import { ToastOptions } from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

export default function SignUp() {
    const router = useRouter();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");

    const handleSignUp = async () => {
        if(!email || !password) {
            toast.error("Email and password required");
            return
        }
        if(password != password2) {
            toast.error("Password must match");
            return
        }

        if(!username) {
          toast.error("Please enter a username");
          return
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                username: username
              },
              emailRedirectTo: `${window.location.origin}/auth/callback`
            }
        });

        if(error?.status === 422) {
          toast.error(error.message);
          return
        } else if (error?.status === 429) {
          toast.error(error.message + " Please try again in 5 minutes");
          return
        } else {
          router.push("/confirmEmail")
        }
    }

  return (
    <div className="space-y-2 flex flex-col min-h-screen justify-center items-center mx-2">
      <div className="border p-4 rounded gap-y-4 flex flex-col w-full md:max-w-sm">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} type="text" />
        <TextInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        <TextInput label="Confirm Password" value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" />
        <SubmitButton label="Sign Up" onClick={handleSignUp} />
      </div>
      <button
        className="text-blue-500 italic cursor-pointer"
        onClick={() => router.push("/")}
      >
        Already have an account? Login
      </button>
    </div>
  );
}
