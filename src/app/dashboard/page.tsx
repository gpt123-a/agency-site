"use client";

import { fetchLeads, Lead, addLead } from "@/app/actions";
import { LeadsTable } from "@/components/dashboard/LeadsTable";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // New State for Modal

  const loadLeads = async () => {
    setLoading(true);
    const result = await fetchLeads();
    if (result.success && result.leads) {
      setLeads(result.leads);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // Handle Form Submit
// Handle Form Submit
const handleAddLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // 1. OPTIMISTIC UPDATE: Show it on screen IMMEDIATELY (Fake it 'til you make it)
    const newLead: Lead = {
      row_number: 9999, // Temporary ID
      Date: new Date().toLocaleDateString(),
      Name: formData.get("name") as string,
      Email: formData.get("email") as string,
      Status: "New",
      "Review Link": "",
      Message: formData.get("message") as string
    };
    
    setLeads((prev) => [...prev, newLead]); // Add to list instantly
    setIsModalOpen(false); // Close modal instantly

    // 2. Send to server in background
    await addLead(formData);
    
    // 3. Silently refresh the real data after 3 seconds to confirm
    setTimeout(() => {
      loadLeads();
    }, 3000);
  };

  const activeReviewRequests = Array.isArray(leads) 
      ? leads.filter((lead) => lead.Status?.trim() === "Done").length 
      : 0;

  return (
    <main className="min-h-screen bg-slate-900 text-white pt-24"> {/* Header Fix */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Agency Lead Portal</h1>
            <p className="text-slate-400">Manage your leads and track review requests</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            + Add Lead
          </button>
        </div>

        <div className="mb-8">
          <StatsCard count={activeReviewRequests} />
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-400">Loading...</div>
        ) : (
          <LeadsTable leads={leads} onStatusUpdate={loadLeads} />
        )}

        {/* Simple Add Lead Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Add New Lead</h2>
              <form onSubmit={handleAddLead} className="space-y-4">
                <input required name="name" placeholder="Client Name" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                <input required name="email" type="email" placeholder="Email Address" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                <textarea required name="message" placeholder="Client Message" className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white h-24" />
                <div className="flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white px-4 py-2">Cancel</button>
                  <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">Save Lead</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}