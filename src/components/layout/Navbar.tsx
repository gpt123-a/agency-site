import Link from "next/link";
import { Phone } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Phone size={18} />
          </div>
          Ayub Automations
        </Link>

        {/* Right: Buttons */}
        <div className="flex items-center gap-4">
          <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 hidden md:block transition">
            How it Works
          </Link>

          {/* NEW: Client Login Link */}
          <Link href="/dashboard" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition">
            Client Login
          </Link>

          <Link href="/book" className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition">
            Book a Demo
          </Link>
        </div>

      </div>
    </nav>
  );
};