'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { updateUserBadge } from '@/lib/actions';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn py-1 px-2 btn-xs bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300" disabled={pending}>
      {pending ? 'Saving...' : 'Save'}
    </button>
  );
}

export function UpdateBadgeForm({ userId, currentBadge }: { userId: string, currentBadge: string }) {
  const [state, formAction] = useFormState(updateUserBadge, null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.success);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="flex items-center gap-2">
      <input type="hidden" name="userId" value={userId} />
      <input
        type="text"
        name="badge"
        defaultValue={currentBadge}
        className="input input-bordered input-xs w-28 bg-gray-50 py-1 px-2 border border-gray-300 focus:border-blue-500 focus:ring-blue-500"/>
      <SubmitButton />
    </form>
  );
}