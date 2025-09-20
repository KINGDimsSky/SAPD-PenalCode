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
    <div className="bg-white border border-gray-200 rounded-lg shadow-md">
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-800">Violation List</h2>
        <p className="text-sm text-gray-500 mt-1">
          Cari dan tambahkan pelanggaran dari daftar di bawah ini.
        </p>
        <input
          type="text"
          className="input py-1 px-2 input-bordered w-full mt-4 bg-white border rounded-md border-gray-300 focus:border-sky-500 focus:ring-sky-500"
          placeholder="Search by code or name..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="border-t border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Violation</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jailtime</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fine</th>
              <th className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {violations.map((v) => {
              const isAdded = selectedCodes.has(v.code);
              return (
                <tr key={v.code} className="hover:bg-gray-50 border-b border-gray-200">
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm font-mono text-gray-700">{v.code}</td>
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm text-gray-700">{v.name}</td>
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm text-gray-700">{v.jailtime} min</td>
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm text-gray-700">
                    ${v.fine.toLocaleString('id-ID')}
                  </td>
                  <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">
                    <button
                      className="btn py-1 px-2 rounded-lg btn-sm bg-sky-500 hover:bg-sky-600 text-white border-none disabled:bg-gray-300 disabled:text-gray-500"
                      onClick={() => onAdd(v)}
                      disabled={isAdded}
                    >
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
