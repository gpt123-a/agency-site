"use server";

export type Lead = {
  row_number: number;
  Date: string;
  Name: string;
  Email: string;
  Status: string;
  "Review Link"?: string;
};

// --- FUNCTION 1: THE READER (Uses your Vercel Secret) ---
export async function fetchLeads() {
  try {
    // Uses the Environment Variable you set in Vercel
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
    
    // Assign Row Numbers automatically
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

// --- FUNCTION 2: THE WRITER (Uses your Vercel Secret) ---
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

// --- FUNCTION 3: THE CREATOR (Fixed Name & Link) ---
// FIX: Renamed back to "submitContactForm" so the Contact page works
// FIX: Added _prevState to handle React 19 form actions
export async function submitContactForm(_prevState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const date = new Date().toLocaleDateString();

  try {
    // We construct the "Add Lead" URL using your Read Lead URL base
    // This is a smart hack so we don't need a 3rd env variable
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