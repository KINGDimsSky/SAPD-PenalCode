import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { NavLinks } from "@/components/NavLink";
import { UserProfile } from "@/components/UserProfile";

export default async function DashboardLayout({children}: {children: React.ReactNode;}) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen overflow-hidden w-full bg-black text-neutral-200">
      <aside className="w-64 flex-col border-r border-neutral-800 bg-neutral-950 p-4 hidden md:flex">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center px-4">
            <Link className="flex items-center gap-2 font-semibold text-white" href="/dashboard">
              <span className="text-lg tracking-tight uppercase">Velocity PENALCODE</span>
            </Link>
          </div>
          <div className="flex-1">
            <NavLinks userRole={session?.user?.role} />
          </div>
          <UserProfile user={session?.user} />
        </div>
      </aside>
      <main className="flex flex-1 overflow-y-auto flex-col p-4 md:p-6">
        {children}
      </main>
    </div>
  );
}