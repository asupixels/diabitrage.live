export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between p-6 md:p-24">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-950 border border-blue-800 text-blue-400 text-sm font-medium tracking-wide">
          Institutional Platform
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Diabitrage Asset Management
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
          Secure digital asset administration, compliance tracking, and professional financial portfolio management.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <a
            href="#login"
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 font-semibold text-white transition shadow-lg shadow-blue-600/20"
          >
            Client Portal
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 font-semibold text-slate-300 transition"
          >
            Contact Support
          </a>
        </div>
      </div>

      <footer className="text-sm text-slate-600 pt-12">
        &copy; 2026 Diabitrage Asset Management. All rights reserved.
      </footer>
    </main>
  );
}
