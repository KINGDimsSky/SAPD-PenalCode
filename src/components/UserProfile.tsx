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
  };
};

const factionColors: { [key: string]: string } = {
  Admin: "text-red-600",
  SAPD: "text-blue-600",
  SAFD: "text-pink-600",
  SANews: "text-yellow-600",
};

const BackgroundRoleColors: { [key: string]: string } = {
  Admin: "bg-red-100 text-red-700",
  SAPD: "bg-blue-100 text-blue-700",
  SAFD: "bg-pink-100 text-pink-700",
  SANews: "bg-yellow-100 text-yellow-700",
};

export function UserProfile({ user }: UserProfileProps) {
  const textColorClass = factionColors[user?.faction || ""] || "text-gray-700";
  const BackGroundClass =
    BackgroundRoleColors[user?.faction || ""] || "bg-gray-300 text-gray-700";

  return (
    <div className="mt-auto p-4 border-t border-gray-200">
      <div className="flex items-center gap-3">
        <Image
          src={user?.image || "/user.png"}
          alt={user?.Nickname || "User Avatar"}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="text-sm">
          <p className={`font-semibold ${textColorClass}`}>
            {user?.Nickname}
          </p>
          <div className="flex gap-4 mt-1">
            <p className="text-xs text-gray-500">{user?.role}</p>
            <span className={`px-2 text-xs rounded-lg ${BackGroundClass}`}>
              {user?.faction}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="flex items-center gap-3 rounded-lg w-full px-3 py-2 mt-4 text-gray-500 transition-all duration-200 hover:text-red-600 hover:bg-red-100"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  );
}
