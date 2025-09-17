'use client';

import Link from "next/link";
import { signIn } from "next-auth/react"; 
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Username atau password salah.");
      setIsSubmitting(false);
    } else if (result?.ok) {
      router.push("/dashboard");
    } else {
      setError("Terjadi kesalahan, silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-96 border border-white/15 rounded-lg p-6">
        <h1 className="text-xl font-semibold tracking-tight uppercase">Velocity Penalcode</h1>
        <p className="text-xs mt-1 font-light tracking-tight text-white/70">Welcome Back!, Please enter your Details.</p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full mt-6">
          <label htmlFor="username" className="font-medium">Username</label>
          <input className="p-2 text-sm rounded-lg bg-transparent border border-white/15 placeholder:text-sm mt-2" type="text" id="username" name="username" placeholder="Tyler Durden" required/> 
          <label htmlFor="password" className="font-medium mt-4">Password</label>
          <input className="p-2 text-sm rounded-lg bg-transparent border border-white/15 placeholder:text-sm mt-2" type="password" id="password" name="password" placeholder="***" required/>
          
          {error && (<p className="text-xs text-red-500 mt-2">{error}</p>)}

          <button type="submit" disabled={isSubmitting}
           className="p-2 w-full mt-6 bg-green-500 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 rounded-lg text-sm">
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form> 

        <div className="flex flex-col gap-2 mt-8">
          <p className="text-xs tracking-tight flex gap-2">Don't Have an Account? <Link href={'/register'} className="font-semibold hover:text-white/50 duration-300">Register</Link></p>
        </div>
      </div>
      <p className="text-xs text-white/50 tracking-tight mt-4">Powered By DimsSky & CandraDev All right Reserved</p>
    </div>
  )
}