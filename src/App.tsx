import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { TrainerHiringForm } from './components/TrainerHiringForm';
import { Footer } from './components/Footer';

export function App() {
  const appsScriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '';

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-800 font-sans antialiased selection:bg-blue-500 selection:text-white">
      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Clean Corporate Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        <TrainerHiringForm appsScriptUrl={appsScriptUrl} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
