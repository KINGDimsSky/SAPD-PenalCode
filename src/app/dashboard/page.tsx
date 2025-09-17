'use client';

import { useState, useMemo, useEffect } from 'react';
import { penalCodeData, Violation } from '@/lib/data';
import { SelectedViolationsTable } from '@/components/SelectedViolationTable';
import { ViolationList } from '@/components/ViolationList';

const CopyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>;

export default function PenalCodePage() {
    const [suspectId, setSuspectId] = useState('');
    const [selectedViolations, setSelectedViolations] = useState<Violation[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [copySuccess, setCopySuccess] = useState(false);

    const arrestDetails = useMemo(() => {
        const maxJailtime = 60;
        const maxFine = 50000;
        const total = selectedViolations.reduce((acc, v) => ({ jailtime: acc.jailtime + v.jailtime, fine: acc.fine + v.fine }), { jailtime: 0, fine: 0 });
        const finalJailtime = Math.min(total.jailtime, maxJailtime);
        const finalFine = Math.min(total.fine, maxFine);
        return {
        command: `/arrest ${suspectId || 0} ${finalJailtime} ${finalFine}`,
        charges: selectedViolations.map(v => ({ code: v.code, name: v.name, command: `/su ${suspectId || 0} ${v.code}. ${v.name}`})),
        tickets: selectedViolations.filter(v => v.jailtime === 0).map(v => ({ code: v.code, name: v.name, command: `/ticket ${suspectId || 0} ${v.fine} ${v.code}. ${v.name}`}))
        };
    }, [selectedViolations, suspectId]);

    const filteredViolations = useMemo(() => {
        if (!searchTerm.trim()) return penalCodeData;
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        return penalCodeData.filter(v => v.code.toLowerCase().includes(lowercasedSearchTerm) || v.name.toLowerCase().includes(lowercasedSearchTerm));
    }, [searchTerm]);
    
    const selectedViolationCodes = useMemo(() => new Set(selectedViolations.map(v => v.code)), [selectedViolations]);

    const handleAddViolation = (violation: Violation) => {
        if (!selectedViolationCodes.has(violation.code)) {
        setSelectedViolations(prev => [...prev, violation]);
        }
    };

    const handleRemoveViolation = (code: string) => {
        setSelectedViolations(prev => prev.filter(v => v.code !== code));
    };

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        });
    };
    
  return (
    <div className="space-y-4 md:space-y-6 text-neutral-200">
       {copySuccess && (
        <div className="fixed top-5 right-5 bg-neutral-800 border border-green-500 text-green-300 px-4 py-2 rounded-lg shadow-lg z-50">
          Copied to clipboard!
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-neutral-900 border border-neutral-800 p-4 md:p-6 rounded-lg shadow-md">
          <label htmlFor="suspectId" className="block text-sm font-medium text-neutral-400 mb-2">Suspect ID</label>
          <input 
            id="suspectId" type="text" 
            className="input py-1 px-2 rounded-lg input-bordered w-full bg-neutral-800 border-neutral-700 focus:border-green-500 focus:ring-green-500" 
            placeholder="Enter Suspect ID..."
            value={suspectId}
            onChange={(e) => setSuspectId(e.target.value)}/>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-4 md:p-6 rounded-lg shadow-md">
          <label htmlFor="arrestCommand" className="block text-sm font-medium text-neutral-400 mb-2">Arrest Command</label>
          <div className="join w-full">
            <input id="arrestCommand" type="text" value={arrestDetails.command} className="input py-1 px-2 rounded-lg join-item input-bordered w-full bg-neutral-800 border-neutral-700" readOnly />
            <button className="btn py-1 mt-2 rounded-lg join-item bg-green-600 hover:bg-green-700 text-white border-none px-4" onClick={() => handleCopyToClipboard(arrestDetails.command)}><CopyIcon/></button>
          </div>
        </div>
      </div>
      <SelectedViolationsTable violations={selectedViolations} onRemove={handleRemoveViolation} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-md p-4 md:p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Individual Charges</h2>
          {arrestDetails.charges.length > 0 ? arrestDetails.charges.map(charge => (
            <div key={`charge-${charge.code}`}>
              <label className="text-xs text-neutral-400 font-mono block truncate">{charge.code} - {charge.name}</label>
              <div className="join w-full mt-1">
                <input type="text" value={charge.command} className="input py-1 px-2 rounded-lg join-item input-bordered w-full text-xs md:text-sm bg-neutral-800 border-neutral-700" readOnly />
                <button className="btn py-1 mt-2 rounded-lg join-item btn-sm bg-green-600 hover:bg-green-700 text-white border-none px-3" onClick={() => handleCopyToClipboard(charge.command)}><CopyIcon/></button>
              </div>
            </div>
          )) : <p className="text-neutral-500 pt-4">No Charges Selected.</p>}
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg shadow-md p-4 md:p-6 space-y-4">
          <h2 className="text-xl font-semibold text-white">Individual Tickets</h2>
          {arrestDetails.tickets.length > 0 ? arrestDetails.tickets.map(ticket => (
            <div key={`ticket-${ticket.code}`}>
              <label className="text-xs text-neutral-400 font-mono block truncate">{ticket.code} - {ticket.name}</label>
              <div className="join w-full mt-1">
                <input type="text" value={ticket.command} className="input py-1 px-2 rounded-lg join-item input-bordered w-full text-xs md:text-sm bg-neutral-800 border-neutral-700" readOnly />
                <button className="btn py-1 mt-2 rounded-lg join-item btn-sm bg-green-600 hover:bg-green-700 text-white border-none px-3" onClick={() => handleCopyToClipboard(ticket.command)}><CopyIcon/></button>
              </div>
            </div>
          )) : <p className="text-neutral-500 pt-4">No ticket selected.</p>}
        </div>
      </div>
      <ViolationList violations={filteredViolations} selectedCodes={selectedViolationCodes}
        searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)}
        onAdd={handleAddViolation}/>
    </div>
  );
}