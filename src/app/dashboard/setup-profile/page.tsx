'use client';

import { useFormState } from 'react-dom';
import { updateUserProfile } from '@/lib/actions'; 
import { SubmitButton } from '@/components/SubmitButton'; 
import { useEffect, useState } from 'react';
import { signOut } from 'next-auth/react'; // <-- IMPORT FUNGSI LOGOUT

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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-96 border p-6">
        <h1 className="text-xl font-semibold">Setup Your Profile</h1>
        <p className="text-xs mt-1">Lengkapi profil Anda.</p>
        
        <form action={formAction} className="flex flex-col w-full mt-6">
          <label htmlFor="nickname">Nickname</label>
          <input className="p-2 text-sm rounded-lg bg-transparent border border-white/15 placeholder-text-sm mt-2" 
            type="text" 
            id="nickname" 
            name="nickname" 
            placeholder="Nickname baru Anda" 
            required/>
          
          {state?.error && <p className="text-xs text-red-500 mt-2">{state.error}</p>}
          {successMessage && <p className="text-xs text-green-500 mt-2">{successMessage}</p>}

          <SubmitButton text='Save' loadingText='Saving Profile..'></SubmitButton>
        </form>
      </div>
    </div>
  );
}