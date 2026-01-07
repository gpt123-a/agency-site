export default function BookPage() {
    return (
      <main className="min-h-screen bg-slate-50 pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="h-[600px] w-full bg-slate-50 flex items-center justify-center">
            <iframe 
              src="https://cal.com/ayub-lahiani" 
              className="w-full h-full" 
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </main>
    );
  }