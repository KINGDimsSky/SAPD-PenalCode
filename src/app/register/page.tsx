"use client";

import Link from "next/link";
import { registerUser } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/SubmitButton";
import Image from "next/image";

const initialState = { error: undefined, success: false };

export default function RegisterPage() {
  const [state, formAction] = useFormState(registerUser, initialState);

  return (
    <div className="relative bg-gray-50 p-4 flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-lg sm:max-w-md mt-8 md:mt-0">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <Link
            href="/"
            className="flex flex-col items-center gap-2 font-semibold text-gray-800"
          >
            <Image
              src="/sagov.png"
              alt="San Andreas Government Logo"
              width={70}
              height={70}
              priority
            />
            <div className="text-lg tracking-tight">Velocity Penalcode</div>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Register Your Account
        </h1>
        <p className="text-sm text-gray-400 text-center mt-1">
          Please fill in your details to create an account.
        </p>

        {/* Form */}
        <form action={formAction} className="flex flex-col w-full mt-6 space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Tyler Durden"
              required
              className="input w-full mt-1 py-1 px-2 rounded-md input-bordered bg-white border-gray-300 focus:border-green-600 focus:ring-green-600 placeholder:text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mt-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="***"
              required
              className="input w-full mt-1 py-1 px-2 rounded-md input-bordered bg-white border-gray-300 focus:border-green-600 focus:ring-green-600 placeholder:text-sm"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmpword" className="block text-sm font-medium text-gray-600 mt-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmpword"
              name="confirmpword"
              placeholder="***"
              required
              className="input w-full mt-1 py-1 px-2 rounded-md input-bordered bg-white border-gray-300 focus:border-green-600 focus:ring-green-600 placeholder:text-sm"
            />
          </div>

          {/* Error Message */}
          {state?.error && <p className="text-xs text-red-500 text-center">{state.error}</p>}

          {/* Submit Button */}
          <SubmitButton text="Register" loadingText="Registering..." />
        </form>

        {/* Login Link */}
        <div className="flex flex-col gap-2 mt-8 text-center">
          <p className="text-xs text-gray-500 tracking-tight">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold hover:text-gray-700 transition-colors">
              Login
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
