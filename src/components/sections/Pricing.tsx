import Link from "next/link";
import { Check } from "lucide-react";

export const Pricing = ({ data }: { data: any }) => {
  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">{data.title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.cards.map((card: any, idx: number) => (
            <div 
              key={idx} 
              className={`relative p-8 rounded-2xl border ${card.popular ? 'border-blue-600 shadow-xl' : 'border-slate-200 shadow-sm'} flex flex-col`}
            >
              {card.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{card.name}</h3>
              <div className="text-4xl font-extrabold text-slate-900 mb-6">
                {card.price}<span className="text-lg text-slate-500 font-normal">/mo</span>
              </div>

              <ul className="space-y-4 mb-8 flex-1">
                {card.features.map((feature: string, fIdx: number) => (
                  <li key={fIdx} className="flex items-center gap-3 text-slate-600">
                    <Check size={18} className="text-blue-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/book" 
                className={`w-full py-3 rounded-lg font-bold text-center transition ${
                  card.popular 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
              >
                {card.buttonText}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};