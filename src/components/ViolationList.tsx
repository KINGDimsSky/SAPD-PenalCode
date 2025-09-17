'use client';
import { Violation } from "@/lib/data";

interface Props {
  violations: Violation[];
  selectedCodes: Set<string>;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (violation: Violation) => void;
}

export function ViolationList({ violations, selectedCodes, searchTerm, onSearchChange, onAdd }: Props) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-md">
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-white">Violation List</h2>
        <p className="text-sm text-neutral-400 mt-1">Cari dan tambahkan pelanggaran dari daftar di bawah ini.</p>
        <input
          type="text"
          className="input py-1 px-2  input-bordered w-full mt-4 bg-neutral-800 border-neutral-700 focus:border-green-500 focus:ring-green-500"
          placeholder="Search by code or name..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="border-t border-b border-neutral-700">
            <tr>
              <th className="bg-neutral-800/50 p-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">#</th>
              <th className="bg-neutral-800/50 p-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Violation</th>
              <th className="bg-neutral-800/50 p-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Jailtime</th>
              <th className="bg-neutral-800/50 p-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Fine</th>
              <th className="bg-neutral-800/50 p-4 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900">
            {violations.map((v) => {
              const isAdded = selectedCodes.has(v.code);
              return (
                <tr key={v.code} className="hover:bg-neutral-800/50 border-b border-neutral-800">
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm font-mono text-neutral-300">{v.code}</td>
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">{v.name}</td>
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">{v.jailtime} min</td>
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">${v.fine.toLocaleString('id-ID')}</td>
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">
                    <button className="btn py-1 px-2 rounded-lg btn-sm bg-green-600 hover:bg-green-700 text-white border-none disabled:bg-neutral-700 disabled:text-neutral-400"
                      onClick={() => onAdd(v)}
                      disabled={isAdded}>
                      {isAdded ? 'Added' : 'Add'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}