
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  name: string;
  email: string;
  text: string;
  date: string;
}

const PCMaintenancePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', text: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [savedMessages, setSavedMessages] = useState<Message[]>([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('argos_sea_messages') || '[]');
    setSavedMessages(logs);
  }, []);

  // SIMULACIÓN DE ENVÍO A LA NUBE (Aquí conectarías Supabase/Firebase/Tu API)
  const saveToCloud = async (message: Message) => {
    // Aquí iría el fetch real:
    // await fetch('https://tu-api.supabase.co/rest/v1/messages', { method: 'POST', ... })
    return new Promise((resolve) => setTimeout(resolve, 1500)); // Simulamos latencia de red
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);

    const newMessage: Message = {
      id: crypto.randomUUID(),
      ...formData,
      date: new Date().toLocaleString(),
    };

    try {
      // 1. Intentamos guardar en la nube (Simulado)
      await saveToCloud(newMessage);
      
      // 2. Guardamos backup local
      const updatedMessages = [newMessage, ...savedMessages];
      localStorage.setItem('argos_sea_messages', JSON.stringify(updatedMessages));
      setSavedMessages(updatedMessages);
      
      setIsSubmitted(true);
      setFormData({ name: '', email: '', text: '' });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-dark text-slate-100 min-h-screen flex flex-col selection:bg-primary/30">
      <header className="w-full py-8 px-6 lg:px-12 flex justify-between items-center z-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="material-icons text-white">sailing</span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight uppercase text-white">
            Argos <span className="text-primary">Sea</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wider uppercase opacity-70">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <button onClick={() => setShowLogs(!showLogs)} className="hover:text-primary transition-colors uppercase flex items-center gap-1">
            <span className="material-icons text-xs">admin_panel_settings</span> Control Panel
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 relative overflow-hidden maritime-gradient pb-20">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-4xl w-full text-center relative z-10 py-12">
          {!isSubmitted ? (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Online Status: Ready for Cloud
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
                Contatta il supporto <br/> <span className="text-primary italic">Argos Sea</span>
              </h1>
              
              <div className="max-w-xl mx-auto glass-panel rounded-2xl p-8 md:p-10 shadow-xl border border-white/10">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="text-left">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Nome</label>
                      <input 
                        disabled={isSubmitting}
                        required
                        className="w-full bg-white text-slate-900 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary placeholder-slate-400 disabled:opacity-50" 
                        placeholder="Il tuo nome" 
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="text-left">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Email</label>
                      <input 
                        disabled={isSubmitting}
                        required
                        className="w-full bg-white text-slate-900 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary placeholder-slate-400 disabled:opacity-50" 
                        placeholder="nome@email.it" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="text-left">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Messaggio</label>
                    <textarea 
                      disabled={isSubmitting}
                      className="w-full bg-white text-slate-900 border-0 rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary placeholder-slate-400 disabled:opacity-50" 
                      placeholder="Come possiamo aiutarti?" 
                      rows={4}
                      value={formData.text}
                      onChange={(e) => setFormData({...formData, text: e.target.value})}
                    ></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-white font-extrabold py-4 px-6 rounded-lg uppercase tracking-widest text-sm shadow-lg shadow-primary/30 transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <span className="material-icons text-sm">cloud_upload</span> 
                        Invia alla Nube
                      </>
                    )}
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="max-w-xl mx-auto glass-panel rounded-3xl p-12 shadow-2xl border border-primary/20 animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="material-icons text-5xl">verified</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Dati Sincronizzati!</h2>
              <p className="text-slate-400 mb-8">Il messaggio è stato registrato sia localmente che nel cloud (simulato). Il team tecnico riceverà la notifica.</p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-primary font-bold uppercase tracking-widest text-sm hover:underline"
              >
                Invia un nuovo ticket
              </button>
            </div>
          )}

          {showLogs && (
            <div className="mt-16 text-left max-w-4xl mx-auto animate-in slide-in-from-bottom duration-500 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="material-icons text-primary">analytics</span>
                  Database Console
                </h3>
                <span className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full font-bold uppercase">Admin View</span>
              </div>
              <div className="space-y-4">
                {savedMessages.length === 0 ? (
                  <div className="py-12 text-center text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">
                    <span className="material-icons text-4xl mb-2 opacity-20">inventory_2</span>
                    <p className="italic">Nessun dato presente nel database.</p>
                  </div>
                ) : (
                  savedMessages.map((msg) => (
                    <div key={msg.id} className="bg-white/5 border border-white/10 p-5 rounded-xl flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-primary/30 transition-colors">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-white">{msg.name}</span>
                          <span className="text-primary text-xs font-mono">{msg.email}</span>
                        </div>
                        <p className="text-slate-400 text-sm italic">"{msg.text || "No content"}"</p>
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono bg-black/30 px-3 py-2 rounded-lg border border-white/5">
                        TIMESTAMP: {msg.date}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {savedMessages.length > 0 && (
                <button 
                  onClick={() => { localStorage.removeItem('argos_sea_messages'); setSavedMessages([]); }}
                  className="mt-8 text-xs text-red-400/60 hover:text-red-400 uppercase tracking-widest font-bold flex items-center gap-2 transition-colors ml-auto"
                >
                  <span className="material-icons text-xs">delete_sweep</span> Pulisci Database Locale
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="w-full py-8 px-6 lg:px-12 border-t border-white/5 bg-background-dark/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-slate-500 font-medium tracking-wide italic">Cloud Sync Status: <span className="text-green-500 font-bold">READY</span></div>
          <div className="text-xs text-slate-600 uppercase tracking-[0.2em]">Argos Sea Systems • 2024</div>
        </div>
      </footer>
    </div>
  );
};

export default PCMaintenancePage;
