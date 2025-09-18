import Image from "next/image";
import { NavLinks } from "@/components/NavLink";
import MobileNav from "@/components/MobileNav";
import { UserProfile } from "@/components/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen w-full bg-gray-50 text-gray-900">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-white p-4">
        <div className="flex h-full flex-col gap-2">
          {/* Logo */}
          <div className="flex flex-col items-center my-6">
            <Image src="/sagov.png" alt="Logo" width={70} height={70} priority />
            <div className="text-lg font-semibold tracking-tight mt-1">San Andreas Portal</div>
          </div>
          <div className="flex-1">
            <NavLinks userRole={session?.user?.role}  userBadge={session?.user?.badge}/>
          </div>
          <UserProfile user={session?.user} />
        </div>
      </aside>

      {/* Navbar Mobile */}
      <MobileNav user={session?.user} />

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 pt-24">{children}</main>
    </div>
  );
}


