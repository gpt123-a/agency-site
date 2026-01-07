"use server";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ActionResult {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  formData: FormData
): Promise<ActionResult> {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    // Basic validation
    if (!name || !email || !message) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "Please enter a valid email address.",
      };
    }

    // Get environment variables
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    const apiKey = process.env.N8N_API_KEY;

    if (!webhookUrl || !apiKey) {
      console.error("Missing environment variables: N8N_WEBHOOK_URL or N8N_API_KEY");
      return {
        success: false,
        message: "Server configuration error. Please try again later.",
      };
    }

    // POST to n8n webhook
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      }),
    });

    // Handle response
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("n8n webhook error:", response.status, errorData);
      
      if (response.status === 401) {
        return {
          success: false,
          message: "Authentication failed. Please try again later.",
        };
      }

      return {
        success: false,
        message: "Failed to submit form. Please try again.",
      };
    }

    const data = await response.json().catch(() => ({}));

    if (data.success) {
      return {
        success: true,
        message: "Form submitted successfully!",
      };
    }

    return {
      success: false,
      message: data.error || "Failed to submit form. Please try again.",
    };
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

