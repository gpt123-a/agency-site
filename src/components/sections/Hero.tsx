import Link from "next/link";

export const Hero = ({ data }: { data: any }) => {
  return (
    <section className="py-32 px-4 text-center max-w-6xl mx-auto">
      <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm font-bold">
        {data.badge}
      </span>
      
      {/* FIXED: Added max-w-3xl and mx-auto to force a perfect 2-line break */}
      <h1 className="text-6xl font-extrabold mt-6 mb-6 leading-tight text-slate-900 max-w-3xl mx-auto">
        {data.title}
      </h1>
      
      <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
        {data.subtitle}
      </p>
      
      <Link 
        href="/book" 
        className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition inline-block shadow-lg shadow-blue-600/20"
      >
        {data.buttonText}
      </Link>
    </section>
  );
};