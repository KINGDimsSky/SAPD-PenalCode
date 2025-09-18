'use client';

import { useState } from "react";
import Image from "next/image";
import { NavLinks } from "@/components/NavLink";
import { UserProfile } from "@/components/UserProfile";

export default function MobileNav({ user }: { user?: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar Top */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 flex items-center justify-between px-4 py-2">
        <button onClick={() => setOpen(true)} className="p-2">
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-700"></span>
        </button>

        <div className="flex flex-col items-center">
          <Image src="/sagov.png" alt="Logo" width={40} height={40} />
          <span className="text-sm font-semibold">San Andreas Portal</span>
        </div>

        <div className="w-6" />
      </div>

        {/* Overlay */}
        <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
            open
            ? "opacity-100 pointer-events-auto backdrop-blur-sm bg-white/20"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg flex flex-col p-4 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center my-6">
          <Image src="/sagov.png" alt="Logo" width={70} height={70} />
          <div className="text-lg font-semibold tracking-tight mt-1">
            San Andreas Portal
          </div>
        </div>
        <div className="flex-1">
          <NavLinks userRole={user?.role} />
        </div>
        <UserProfile user={user} />
      </aside>
    </>
  );
}
