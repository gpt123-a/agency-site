"use client";

import { Lead, updateLeadStatus } from "@/app/actions";
import { useState } from "react";

interface LeadsTableProps {
  leads: Lead[];
  onStatusUpdate?: () => void;
}

export function LeadsTable({ leads, onStatusUpdate }: LeadsTableProps) {
  // FIX: Track loading state by Row Number (ID) instead of Email
  const [updatingRows, setUpdatingRows] = useState<Set<number>>(new Set());

  // FIX: This function now accepts a Number (Row ID)
  const handleMarkCompleted = async (rowNumber: number) => {
    if (!rowNumber) return;

    setUpdatingRows((prev) => new Set(prev).add(rowNumber));

    try {
      // Send the NUMBER to the server action
      const result = await updateLeadStatus(rowNumber);
      
      if (result.success) {
        if (onStatusUpdate) {
          onStatusUpdate();
        }
      } else {
        alert(result.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating the status");
    } finally {
      setUpdatingRows((prev) => {
        const next = new Set(prev);
        next.delete(rowNumber);
        return next;
      });
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (leads.length === 0) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 text-center">
        <p className="text-slate-400">No leads found.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Review Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
          {Array.isArray(leads) && leads.map((lead, index) => {
              const status = lead.Status?.trim() || "";
              const isDone = status === "Done";
              
              // FIX: Check if THIS specific row is loading
              const isUpdating = updatingRows.has(lead.row_number);

              return (
                <tr
                  key={index}
                  className="bg-slate-800 hover:bg-slate-750 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                    {lead.Name || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {lead.Email || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300 max-w-md truncate">
                    {lead.Message || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                    {formatDate(lead.Date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {isDone ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-600 text-gray-200">
                        ⏳ Review Chaser Active
                      </span>
                    ) : (
                      <button
                        // FIX: Pass the row_number instead of email
                        onClick={() => handleMarkCompleted(lead.row_number)} 
                        disabled={isUpdating || !lead.row_number}
                        className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isUpdating ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Updating...
                          </>
                        ) : (
                          "✅ Mark as Completed"
                        )}
                      </button>
                    )}
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