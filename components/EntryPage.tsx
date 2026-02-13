
import React from 'react';
import { Link } from 'react-router-dom';

const EntryPage: React.FC = () => {
  return (
    <div className="selection-gradient min-h-screen text-white relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 maritime-pattern pointer-events-none"></div>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <header className="w-full pt-8 px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="flex items-center space-x-3 mb-6">
            <span className="material-icons text-primary text-4xl">sailing</span>
            <span className="text-2xl font-bold tracking-widest uppercase">Argos Sea</span>
          </div>
          <div className="w-full max-w-2xl h-[1px] bg-white/10"></div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight">
            Benvenuto nel portale <span className="text-primary">ARGOS SEA</span>
          </h1>
          <p className="text-lg lg:text-xl text-white/70 font-light">
            Seleziona la modalità di accesso
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* PC Card */}
          <Link to="/maintenance-pc" className="group relative block">
            <div className="bg-background-dark/40 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden card-glow h-full flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  alt="Desktop View" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80" 
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="material-icons text-primary text-5xl">desktop_windows</span>
                </div>
              </div>
              <div className="p-8 text-center border-t border-white/10">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors uppercase tracking-wider">Entra Versione PC</h2>
                <p className="text-white/50 text-sm">Ottimizzato per schermi grandi e postazioni di controllo</p>
                <div className="mt-6 inline-flex items-center text-primary font-semibold text-sm tracking-widest">
                  AVVIA PORTALE <span className="material-icons ml-2 text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Mobile Card */}
          <Link to="/maintenance-mobile" className="group relative block">
            <div className="bg-background-dark/40 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden card-glow h-full flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img 
                  alt="Mobile View" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80" 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <span className="material-icons text-primary text-5xl">smartphone</span>
                </div>
              </div>
              <div className="p-8 text-center border-t border-white/10">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors uppercase tracking-wider">Entra Versione Smartphone</h2>
                <p className="text-white/50 text-sm">Ottimizzato per dispositivi mobile e tablet</p>
                <div className="mt-6 inline-flex items-center text-primary font-semibold text-sm tracking-widest">
                  AVVIA PORTALE <span className="material-icons ml-2 text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>

      <footer className="w-full py-8 px-6 border-t border-white/10 bg-background-dark/20 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/40 text-sm font-light">
            © 2024 ARGOS SEA. Tutti i diritti riservati.
          </div>
          <div className="flex space-x-6 text-white/40 text-xs uppercase tracking-widest">
            <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-primary transition-colors" href="#">Termini di Servizio</a>
            <a className="hover:text-primary transition-colors" href="#">Supporto Tecnico</a>
          </div>
          <div className="text-white/40 text-sm">Versione 2.4.1</div>
        </div>
      </footer>
    </div>
  );
};

export default EntryPage;
