'use client';

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  text: string;
  loadingText: string;
  className?: string;
}

export function SubmitButton({ text, loadingText, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`p-2 w-full 
                bg-orange-300 
                hover:bg-orange-500 
                disabled:bg-gray-500 
                disabled:cursor-not-allowed 
                transition-all duration-300 
                rounded-lg text-sm 
                ${className}`}>
      {pending ? loadingText : text}
    </button>
  );
}