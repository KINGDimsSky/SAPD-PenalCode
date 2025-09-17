'use client';
import { Violation } from "@/lib/data";

interface Props {
  violations: Violation[];
  onRemove: (code: string) => void;
}

export function SelectedViolationsTable({ violations, onRemove }: Props) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-md">
      <div className="p-4 md:p-6">
        <h2 className="text-xl font-semibold text-white">Selected Violations</h2>
        <p className="text-sm text-neutral-400 mt-1">Daftar pelanggaran yang telah ditambahkan.</p>
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
            {violations.map((v) => (
              <tr key={v.code} className="border-b border-neutral-800">
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm font-mono text-neutral-300">{v.code}</td>
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">{v.name}</td>
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">{v.jailtime} min</td>
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">${v.fine.toLocaleString('id-ID')}</td>
                <td className="p-4 max-w-xs truncate whitespace-nowrap text-sm">
                  <button className="btn py-1 px-2 rounded-lg btn-sm bg-red-600 hover:bg-red-700 text-white border-none"
                    onClick={() => onRemove(v.code)}>Remove</button>
                </td>
              </tr>
            ))}
            {violations.length === 0 && (
              <tr><td colSpan={5} className="text-center text-neutral-500 p-6">No violations added.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}