'use client';

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

type UserProfileProps = {
  user?: {
    Nickname?: string | null;
    image?: string | null;
    role?: string | null;
    faction?: string | null;
  }
}

const factionColors: { [key: string]: string } = {
  'Admin': 'text-red-500',
  'SAPD': 'text-blue-500',
  'SAFD': 'text-pink-500',
  'SANNEWS': 'text-yellow-500',
};

const BackgroundRoleColors: { [key: string]: string } = {
  'Admin': 'bg-red-700',
  'SAPD': 'bg-blue-700',
  'SAFD': 'bg-pink-700',
  'SANNEWS': 'bg-yellow-700',
};

export function UserProfile({ user }: UserProfileProps) {
  const textColorClass = factionColors[user?.faction || ''] || 'text-white';
  const BackGroundClass = BackgroundRoleColors[user?.faction || 'bg-gray-600'];

  return (
    <div className="mt-auto p-4 border-t border-white/10">
      <div className="flex items-center gap-3">
        <Image src={user?.image || '/user.png'} alt={user?.Nickname || 'User Avatar'}
          width={40}
          height={40}
          className="rounded-full"/>
        <div className="text-sm">
          <p className={`font-semibold ${textColorClass}`}>{user?.Nickname}</p>
          <div className="flex gap-6 mt-2">
            <p className="text-xs text-white/60">{user?.role}</p>
            <h2 className={`px-2 text-xs rounded-lg ${BackGroundClass}`}>{user?.faction}</h2>
          </div>
        </div>
      </div>
      <button onClick={() => signOut({ callbackUrl: '/' })} className="flex items-center gap-3 rounded-lg w-full px-3 py-2 mt-4 text-white/60 transition-all duration-200 hover:text-white hover:bg-red-500/20">
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
}