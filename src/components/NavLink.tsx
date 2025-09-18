'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { navItems} from "@/lib/data"; 

export function NavLinks({ userRole, userBadge }: { userRole?: string, userBadge?: string }) {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  useEffect(() => {
    for (const item of navItems) {
      if (item.subItems && item.subItems.some(sub => pathname === sub.href)) {
        setOpenDropdown(item.label);
        break;
      }
    }
  }, [pathname]);

 if (!userRole || userBadge === 'none') {
    const guestItems = navItems.filter(
      item => item.label === 'Home' || item.label === 'Public Tools'
    );

    return (
      <nav className="flex flex-col gap-4 mt-8">
        {guestItems.map(item => {
          if (!item.href) return null;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all duration-200 ease-in-out hover:text-amber-600 hover:bg-amber-100 ${isActive ? "bg-amber-100 text-amber-700 font-medium" : ""}`}>
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
        
        <div className="px-3 py-2 text-center text-xs text-gray-500 bg-gray-100 rounded-lg">
           Anda harus login & memiliki badge untuk menggunakan fitur lain!
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-2 mt-8">
      {navItems.map((item) => {
        if (item.subItems) {
          const isParentActive = pathname.startsWith(item.basePath!);
          const isOpen = openDropdown === item.label;

          const filteredSubItems = item.subItems.filter(subItem => 
            userRole === 'Admin' || !subItem.requiredBadge || subItem.requiredBadge === userBadge
          );
          
          return (
            <div key={item.label}>
              <button
                onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                className={`flex items-center justify-between w-full gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all duration-200 ease-in-out hover:text-amber-600 hover:bg-amber-100 ${isParentActive ? "bg-amber-100 text-amber-700 font-medium" : ""}`}>
                <div className="flex items-center gap-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="mt-1 ml-4 py-1 flex flex-col gap-1 border-l-2 border-amber-100 pl-4">
                  {filteredSubItems.length > 0 ? (
                    filteredSubItems.map(subItem => {
                      const isSubActive = pathname === subItem.href;
                      return (
                        <Link key={subItem.href} href={subItem.href} className={`block rounded-md px-3 py-1.5 text-sm text-gray-500 hover:text-amber-600 hover:bg-amber-100 ${isSubActive ? "bg-amber-100 text-amber-700 font-medium" : ""}`}>
                          {subItem.label}
                        </Link>
                      )
                    })
                  ) : (
                    <span className="px-3 py-1.5 text-sm text-gray-400 italic">No faction tools available.</span>
                  )}
                </div>
              )}
            </div>
          );
        }

        if (!item.href) return null;
        const isActive = pathname === item.href;
        if (item.adminOnly && userRole !== 'Admin') return null;

        return (
          <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all duration-200 ease-in-out hover:text-amber-600 hover:bg-amber-100 ${isActive ? "bg-amber-100 text-amber-700 font-medium" : ""}`}>
            <item.icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}