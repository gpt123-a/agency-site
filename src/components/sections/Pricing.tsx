import { Check } from "lucide-react";

export const Pricing = ({ data }: { data: any }) => {
  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* CHANGED: Flexbox for centering + Max-width for "Bigger" look */}
        <div className="flex justify-center items-center">
          {data.cards.map((card: any, index: number) => (
            <div
              key={index}
              className="relative w-full max-w-2xl bg-white rounded-3xl p-10 shadow-2xl border-2 border-blue-100 hover:border-blue-500 transition-all duration-300"
            >
              {card.popular && (
                <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase shadow-lg">
                    {/* Hardcoded badge for impact */}
                    Most Popular Choice
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {card.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-extrabold text-slate-900">
                    {card.price}
                  </span>
                  <span className="text-xl text-slate-500">/mo</span>
                </div>
                <p className="text-slate-500 mt-2 font-medium">
                  + $2,500 One-Time Installation
                </p>
              </div>

              <ul className="space-y-5 mb-10">
                {card.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                      <Check className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-lg text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="w-full bg-blue-600 text-white py-5 rounded-xl font-bold text-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                {card.buttonText}
              </button>
              
              <p className="text-center text-slate-400 text-sm mt-6">
                30-Day "No-Lead-Left-Behind" Guarantee included.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};