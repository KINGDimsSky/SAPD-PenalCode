'use client';
import { Violation } from "@/lib/data";

interface Props {
  violations: Violation[];
  onRemove: (code: string) => void;
}

export function SelectedViolationsTable({ violations, onRemove }: Props) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-gray-900">Selected Violations</h2>
        <p className="text-sm text-gray-500 mt-1">Daftar pelanggaran yang telah ditambahkan.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full border-t border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">#</th>
              <th className="p-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Violation</th>
              <th className="p-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Jailtime</th>
              <th className="p-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fine</th>
              <th className="p-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {violations.map((v) => (
              <tr key={v.code} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm font-mono text-gray-800">{v.code}</td>
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm text-gray-800">{v.name}</td>
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm text-gray-800">{v.jailtime} min</td>
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm text-gray-800">${v.fine.toLocaleString('id-ID')}</td>
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">
                  <button
                    className="py-1 px-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs"
                    onClick={() => onRemove(v.code)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            {violations.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-400 p-6">
                  No violations added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
