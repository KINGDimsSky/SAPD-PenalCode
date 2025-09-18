import { getAllUsers } from "@/lib/services";
import { Users } from 'lucide-react';
import { UpdateBadgeForm } from "@/components/updateBadgeForm";
import { Toaster } from 'sonner'; 

export default async function AdminPage() {
  const users = await getAllUsers();
  const totalUsers = users.length;

  return (
    <div className="space-y-8 bg-gray-50 p-4 md:p-6 rounded-lg">
      <Toaster position="top-center" richColors />
      <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
      <div className="stats shadow bg-white border border-gray-200">
        <div className="stat p-6">
          <div className="stat-figure text-blue-500">
            <Users size={36} />
          </div>
          <div className="stat-title text-gray-500">Total Users</div>
          <div className="stat-value text-gray-800">{totalUsers}</div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Manage Players</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Username</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Nickname</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Faction</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Badge Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id.toString()} className="hover:bg-gray-50">
                  <td className="p-4 whitespace-nowrap text-sm font-medium text-gray-800">{user.username}</td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-600">{user.Nickname}</td>
                  <td className="p-4 whitespace-nowrap text-sm">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${user.role === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4 whitespace-nowrap text-sm text-gray-600">{user.faction}</td>
                  <td className="p-4 whitespace-nowrap text-sm">
                    <UpdateBadgeForm 
                      userId={user._id.toString()} 
                      currentBadge={user.badge}/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}