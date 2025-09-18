"use client";

import { useFormState } from "react-dom";
import { updateUserProfile } from "@/lib/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const initialState = { error: undefined, success: false };

export default function SetupProfilePage() {
  const [state, formAction] = useFormState(updateUserProfile, initialState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [selectedFaction, setSelectedFaction] = useState<string>("SAPD");

  useEffect(() => {
    if (state?.success) {
      setSuccessMessage(
        "Profil berhasil disimpan! Anda akan dialihkan ke halaman login untuk masuk kembali."
      );
      const timer = setTimeout(() => {
        signOut({ callbackUrl: "/" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="relative bg-gray-50 p-4 flex flex-col md:justify-center md:items-center min-h-[100vh]">
      <div className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-lg sm:max-w-md mt-8 md:mt-0">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-8">
          <Link
            href="/dashboard"
            className="flex flex-col items-center gap-2 font-semibold text-gray-800"
          >
            <Image
              src="/sagov.png"
              alt="San Andreas Government Logo"
              width={70}
              height={70}
              priority
            />
            <div className="text-lg tracking-tight">San Andreas Portal</div>
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Setup Your Profile
        </h1>
        <p className="text-sm text-gray-400 text-center mt-1">
          Selamat datang! Silakan lengkapi profil Anda.
        </p>

        {/* Form */}
        <form action={formAction} className="flex flex-col w-full mt-6 space-y-4">
          {/* Nickname */}
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-600">
              Nickname
            </label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="Tyler Durden"
              required
              className="input w-full mt-1 py-1 px-2 rounded-md input-bordered bg-white border-gray-300 focus:border-green-600 focus:ring-green-600 placeholder:text-sm"
            />
          </div>

          {/* Faction */}
          <div>
            <label htmlFor="faction" className="block text-sm font-medium text-gray-600">
              Faction
            </label>
            <select
              id="faction"
              name="faction"
              value={selectedFaction}
              onChange={(e) => setSelectedFaction(e.target.value)}
              className="select w-full mt-1 py-1 px-2 select-bordered bg-white border-gray-300 focus:border-green-600 focus:ring-green-600 text-gray-600"
            >
              <option className="text-blue-500">SAPD</option>
              <option className="text-pink-500">SAFD</option>
              <option className="text-yellow-500">SANews</option>
            </select>
          </div>

          {/* Rank */}
          <div>
            <label htmlFor="rank" className="block text-sm font-medium text-gray-600">
              Rank
            </label>
            <input
              type="text"
              id="rank"
              name="rank"
              placeholder="e.g. Police Officer I"
              defaultValue="Police Officer I"
              required
              className="input w-full mt-1 py-1 px-2 rounded-md input-bordered bg-white border-gray-300 focus:border-green-600 focus:ring-green-600 text-gray-600"
            />
          </div>

          {/* Badge */}
          <div>
            <label htmlFor="badge" className="block text-sm font-medium text-gray-600">
              Badge
            </label>
            <input
              type="text"
              id="badge"
              name="badge"
              placeholder="e.g. none"
              value={selectedFaction}
              defaultValue="none"
              required
              className="input w-full mt-1 py-1 px-2 rounded-md input-bordered bg-white border-gray-300 focus:border-green-600 focus:ring-green-600 text-gray-600 uppercase"
            />
          </div>

          {/* Messages */}
          {state?.error && <p className="text-xs text-red-500 text-center">{state.error}</p>}
          {successMessage && (
            <p className="text-xs text-green-500 text-center">{successMessage}</p>
          )}

          {/* Submit */}
          <SubmitButton text="Save Profile" loadingText="Saving..." />
        </form>
      </div>
    </div>
  );
}
