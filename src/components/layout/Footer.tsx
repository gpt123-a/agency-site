import { Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Brand */}
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <Phone size={18} />
            </div>
            <span className="text-white font-bold text-xl">Ayub Automations</span>
          </div>

          {/* Copyright */}
          <div className="text-sm">
            © 2025 Ayub Automations All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};