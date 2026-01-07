import { MessageSquare, Calendar, Star, Zap } from "lucide-react";

const iconMap: any = {
  MessageSquare: MessageSquare,
  Calendar: Calendar,
  Star: Star,
  Zap: Zap,
};

export const Features = ({ data }: { data: any }) => {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">{data.title}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{data.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.items.map((item: any, idx: number) => {
            const Icon = iconMap[item.icon] || Zap;
            return (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};