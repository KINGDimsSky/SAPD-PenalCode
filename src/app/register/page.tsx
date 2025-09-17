'use client';

import Link from "next/link";
import { registerUser } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/SubmitButton";

export default function Registerpage () {
  const initialState = { error: undefined, success: false };
  const [state, formAction] = useFormState(registerUser, initialState);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-96 border border-white/15 rounded-lg p-6">
        <h1 className="text-xl font-semibold tracking-tight uppercase">Velocity Penalcode</h1>
        <p className="text-xs mt-1 font-light tracking-tight text-white/70">Please Register your Details.</p>
        <form action={formAction} className="flex flex-col w-full mt-6">
          <label htmlFor="username" className="font-medium">Username</label>
          <input className="p-2 text-sm rounded-lg bg-transparent border border-white/15 placeholder:text-sm mt-2" type="text" id="username" name="username" placeholder="Tyler Durden" required/>
          
          <label htmlFor="password" className="font-medium mt-4">Password</label>
          <input className="p-2 text-sm rounded-lg bg-transparent border border-white/15 placeholder:text-sm mt-2" type="password" id="password" name="password" placeholder="***" required/>
          
          <label htmlFor="confirmpword" className="font-medium mt-4">Confirm Password</label>
          <input className="p-2 text-sm rounded-lg bg-transparent border border-white/15 placeholder:text-sm mt-2" type="password" id="confirmpword" name="confirmpword" placeholder="***" required/>
          {state?.error && ( <p className="text-xs text-red-500 mt-2">{state.error}</p> )}
            <SubmitButton text="Register" loadingText="Registering..." />
        </form>
        <div className="flex flex-col gap-2 mt-8">
          <p className="text-xs tracking-tight flex gap-2">Already Have an Account? <Link href={'/'} className="font-semibold hover:text-white/50 duration-300">Login</Link></p>
        </div>
      </div>
      <p className="text-xs text-white/50 tracking-tight mt-4">Powered By DimsSky & CandraDev All right Reserved</p>
    </div>
  )
}