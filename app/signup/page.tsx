"use client";

import { useRouter } from "next/navigation";
export default function SignUp() {
    const router = useRouter();
    return (
        <div className="w-full space-y-2 flex flex-col">
            <div className="border mx-2 p-4 rounded gap-y-4 flex flex-col">
                <h1 className="text-2xl font-bold">SignUp</h1>
                {/* <TextInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                <TextInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                <SubmitButton label="Login" onClick={handleLogin} /> */}
            </div>
            <button className="text-blue-500 italic cursor-pointer"
                onClick={() => router.push("/")}
            >Already have an account? Login
            </button>
        </div>
    )
}