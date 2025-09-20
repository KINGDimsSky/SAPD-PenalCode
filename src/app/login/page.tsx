"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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
      router.push("/");
    } else {
      setError("Terjadi kesalahan, silakan coba lagi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative bg-gray-50 p-4 flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-lg sm:max-w-md">
        <div className="flex flex-col items-center gap-2 mb-8">
          <Link href="/" className="flex flex-col items-center gap-2 font-semibold text-gray-800">
            <Image src="/sagov.png" alt="San Andreas Government Logo" width={70}
              height={70}
              priority/>
            <div className="text-lg tracking-tight">San Andreas Portal</div>
          </Link>
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Welcome Back!
        </h1>
        <p className="text-sm text-gray-400 text-center mt-1">
          Please enter your details to login.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col w-full mt-6 space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input type="text" id="username"
              name="username"
              placeholder="Tyler Durden"
              required
              className="input w-full border border-gray-300 mt-1 py-1 px-2 rounded-md input-bordered bg-white  placeholder:text-sm"/>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mt-2">
              Password
            </label>
            <input type="password" id="password"
              name="password"
              placeholder="***"
              required
              className="input border border-gray-300 w-full mt-1 py-1 px-2 rounded-md input-bordered bg-white placeholder:text-sm"/>
          </div>
          {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="p-2 w-full mt-4 bg-green-500 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 rounded-lg text-sm text-white">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-8 text-center">
          <p className="text-xs text-gray-500 tracking-tight">
            Don't have an account?{" "}
            <Link href="/register" className="font-semibold hover:text-gray-700 transition-colors">
              Register
            </Link>
          </p>
        </div>
      </div>
      <p className="text-xs text-gray-400 tracking-tight mt-4 text-center">
        Powered By DimsSky & CandraDev. All Rights Reserved.
      </p>
    </div>
  );
}
