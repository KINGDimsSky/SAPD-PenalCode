'use client';

import { useFormState } from 'react-dom';
import { updateUserProfile } from '@/lib/actions'; 
import { SubmitButton } from '@/components/SubmitButton'; 
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react';

const initialState = { error: undefined, success: false };

export default function SetupProfilePage() {
  const [state, formAction] = useFormState(updateUserProfile, initialState);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (state?.success) {
      setSuccessMessage("Profil berhasil disimpan! Anda akan dialihkan ke halaman login untuk masuk kembali.");
      const timer = setTimeout(() => {
        signOut({ callbackUrl: '/' });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      <div className="flex flex-col items-center w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-lg p-6 md:p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-white">Setup Your Profile</h1>
        <p className="text-sm mt-1 text-white/60">Selamat datang! Silakan lengkapi profil Anda.</p>
        <form action={formAction} className="flex flex-col w-full mt-8 space-y-4">
          <div>
            <label htmlFor="nickname" className="text-sm font-medium text-white/80">Nickname</label>
            <input 
              className="input input-bordered w-full mt-1 bg-neutral-800 border-neutral-700 focus:border-green-600 focus:ring-green-600" 
              type="text" 
              id="nickname" 
              name="nickname" 
              placeholder="Nickname baru Anda" 
              required/>
          </div>
          <div>
            <label htmlFor="faction" className="text-sm font-medium text-white/80">Faction</label>
            <select name="faction" id="faction" defaultValue="SAPD" className="select select-bordered w-full mt-1 bg-neutral-800 border-neutral-700 focus:border-green-600 focus:ring-green-600">
                <option>SAPD</option>
                <option>SAFD</option>
                <option>SANews</option>
                <option>Civilian</option>
            </select>
          </div>
          <div>
            <label htmlFor="rank" className="text-sm font-medium text-white/80">Rank</label>
            <input 
              className="input input-bordered w-full mt-1 bg-neutral-800 border-neutral-700 focus:border-green-600 focus:ring-green-600" 
              type="text" 
              id="rank" 
              name="rank" 
              placeholder="e.g. Police Officer I"
              defaultValue="Police Officer I" 
              required
            />
          </div>
          <div>
            <label htmlFor="badge" className="text-sm font-medium text-white/80">Badge</label>
            <input 
              className="input input-bordered w-full mt-1 bg-neutral-800 border-neutral-700 focus:border-green-600 focus:ring-green-600" 
              type="text" 
              id="badge" 
              name="badge" 
              placeholder="e.g. none"
              defaultValue="none" 
              required
            />
          </div> 
          {state?.error && <p className="text-xs text-red-500 text-center">{state.error}</p>}
          {successMessage && <p className="text-xs text-green-500 text-center">{successMessage}</p>}
          <SubmitButton text='Save Profile' loadingText='Saving...'></SubmitButton>
        </form>
      </div>
    </div>
  );
}