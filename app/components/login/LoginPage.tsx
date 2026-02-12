"use client";

import { useState } from "react";
import TextInput from "./ui/TextInput";
import SubmitButton from "./ui/SubmitButton";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleLogin = () => {
        console.log("Login clicked");
    }

    return (
        <div className="w-full space-y-2 flex flex-col">
            <div className="border mx-2 p-4 rounded gap-y-4 flex flex-col">
                <h1 className="text-2xl font-bold">Login</h1>
                <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                <TextInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                <SubmitButton label="Login" onClick={handleLogin} />
            </div>
            <button className="text-blue-500 italic cursor-pointer"
                onClick={() => router.push('/signup')}
            >Dont have an account? Sign up
            </button>
        </div>
    )
}