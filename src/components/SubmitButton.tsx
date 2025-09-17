'use client';

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
  loadingText: string;
}

export function SubmitButton({ text, loadingText }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="p-2 w-full mt-6 bg-green-500 hover:bg-green-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 rounded-lg text-sm"
    >
      {pending ? loadingText : text}
    </button>
  );
}