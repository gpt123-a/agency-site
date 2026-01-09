"use server";

export type Lead = {
  row_number: number;
  Date: string;
  Name: string;
  Email: string;
  Status: string;
  "Review Link"?: string;
};

// --- FUNCTION 1: THE READER (Fetches leads & Calculates IDs) ---
export async function fetchLeads() {
  try {
    const response = await fetch(process.env.N8N_READ_LEADS_WEBHOOK_URL!, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.N8N_API_KEY!,
        "ngrok-skip-browser-warning": "true",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Get the raw list
    const rawLeads = data.leads || data || [];
    
    // 👇 SMART FIX: We manually assign Row Numbers (Index + 2)
    // Index 0 becomes Row 2, Index 1 becomes Row 3, etc.
    const leads = Array.isArray(rawLeads) 
      ? rawLeads.map((lead: any, index: number) => ({
          ...lead,
          row_number: index + 2 
        }))
      : [];
    
    return { success: true, leads };
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { success: false, message: "Failed to fetch leads" };
  }
}

// --- FUNCTION 2: THE WRITER (Updates the status) ---
export async function updateLeadStatus(rowNumber: number) {
  try {
    const response = await fetch("http://localhost:5678/webhook/update-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ row_number: rowNumber }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true, message: "Status updated successfully" };
  } catch (error) {
    console.error("Error updating status:", error);
    return { success: false, message: "Failed to update status" };
  }
}

// --- FUNCTION 3: THE CREATOR (Adds new leads) ---
export async function addLead(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const date = new Date().toLocaleDateString();

  try {
    const response = await fetch("http://localhost:5678/webhook/add-lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message, date }),
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to add lead");
    return { success: true };
  } catch (error) {
    console.error("Error adding lead:", error);
    return { success: false };
  }
}