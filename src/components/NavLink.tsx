'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import {Shield, Crown, UserPen, BookText, Scale} from 'lucide-react';

const navItems = [
  { href: "/dashboard", label: "Penal Code", icon: Scale },
  { href: "/dashboard/Employefile", label: "Employe File", icon: BookText },
  { href: "/dashboard/factions", label: "Factions", icon: Shield },
  { href: "/dashboard/setup-profile", label: "Profile", icon: UserPen },
  { href: "/dashboard/admin", label: "Admin", icon: Crown, adminOnly: true },
];

export function NavLinks({ userRole }: { userRole?: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2 mt-8">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        if (item.adminOnly && userRole !== 'Admin') return null;

        return (
          <Link key={item.href} href={item.href}
            className={`
              flex items-center gap-3 rounded-lg px-3 py-2 text-neutral-400 
              transition-all duration-200 ease-in-out
              hover:text-green-300 hover:bg-green-500/10
              ${isActive ? "bg-green-500/20 text-green-300 font-medium" : ""}`}>
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}