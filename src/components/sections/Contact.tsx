"use client";
import { useActionState, useEffect, useRef } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { submitContactForm } from "@/app/actions";

export const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);

  // FIX: Pass the server action directly. 
  // We removed the async wrapper that was causing the "Argument" error.
  const [state, formAction, isPending] = useActionState(submitContactForm, { success: false });

  // Reset form on successful submission
  useEffect(() => {
    if (state?.success && formRef.current) {
      formRef.current.reset();
    }
  }, [state?.success]);

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Left Column: Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Let's Start a Conversation</h2>
              <p className="text-slate-600 mb-8 text-lg">
                Not ready to book a demo yet? No problem. Send us a message and we'll get back to you within 24 hours.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Email Us</p>
                    <p className="text-slate-900 font-bold">ayub@ayubautomations.com</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium">Call Us</p>
                    <p className="text-slate-900 font-bold">+1 (555) 000-0000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: The Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <form 
                ref={formRef}
                action={formAction}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                  <input type="text" name="name" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="John Doe" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input type="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="john@company.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition" placeholder="How can we help you?"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-slate-900 text-white py-4 rounded-lg font-bold hover:bg-slate-800 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  {isPending ? "Sending..." : "Send Message"}
                </button>
                
                {/* FIX: Updated to check state.success directly since we simplified the server action */}
                {state?.success && (
                  <p className="text-center text-sm mt-4 text-green-600">
                    Message sent successfully! We'll be in touch.
                  </p>
                )}
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};