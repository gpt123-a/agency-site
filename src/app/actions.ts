"use server";

// FIX: Added "Message" to the allowed types
export type Lead = {
  row_number: number;
  Date: string;
  Name: string;
  Email: string;
  Status: string;
  "Review Link"?: string;
  Message?: string; 
};

// --- FUNCTION 1: THE READER ---
export async function fetchLeads() {
  try {
    const url = process.env.N8N_READ_LEADS_WEBHOOK_URL;
    if (!url) console.error("MISSING VAR: N8N_READ_LEADS_WEBHOOK_URL");

    const response = await fetch(url!, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.N8N_API_KEY || "",
        "ngrok-skip-browser-warning": "true",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const rawLeads = data.leads || data || [];
    
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

// --- FUNCTION 2: THE WRITER ---
export async function updateLeadStatus(rowNumber: number) {
  try {
    const url = process.env.N8N_UPDATE_STATUS_WEBHOOK_URL;
    
    const response = await fetch(url!, {
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

// --- FUNCTION 3: THE CREATOR ---
export async function submitContactForm(_prevState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const date = new Date().toLocaleDateString();

  try {
    const readUrl = process.env.N8N_READ_LEADS_WEBHOOK_URL || "";
    const baseUrl = readUrl.replace("/webhook/read-leads", "");
    const addUrl = `${baseUrl}/webhook/add-lead`;

    const response = await fetch(addUrl, {
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

// --- ALIAS FOR COMPATIBILITY ---
export const addLead = submitContactForm;