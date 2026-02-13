
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FORMSPREE_ID = "mjgeyjov"; 

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
}

const PCMaintenancePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDatabase, setShowDatabase] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('argos_messages') || '[]');
    setMessages(saved);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const newMessage: Message = {
          id: Math.random().toString(36).substr(2, 9).toUpperCase(),
          ...formData,
          date: new Date().toLocaleString('it-IT'),
        };

        const updatedMessages = [newMessage, ...messages];
        localStorage.setItem('argos_messages', JSON.stringify(updatedMessages));
        setMessages(updatedMessages);
        
        setIsSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error("Errore durante l'invio.");
      }
    } catch (err) {
      setError("Impossibile inviare il messaggio. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportData = () => {
    if (messages.length === 0) return;
    const dataStr = JSON.stringify(messages, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `argos_backup_${new Date().toISOString().slice(0,10)}.json`);
    linkElement.click();
  };

  const clearDatabase = () => {
    if (window.confirm("Cancellare il registro locale?")) {
      localStorage.removeItem('argos_messages');
      setMessages([]);
    }
  };

  return (
    <div className="bg-background-dark text-slate-100 min-h-screen flex flex-col selection:bg-primary/30">
      <header className="w-full py-6 px-10 flex justify-between items-center border-b border-white/5 backdrop-blur-md sticky top-0 z-50 bg-background-dark/80">
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate("/")}>
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center group-hover:rotate-12 transition-transform">
            <span className="material-icons text-white text-sm">anchor</span>
          </div>
          <span className="text-lg font-black uppercase tracking-widest text-white">Argos <span className="text-primary">Sea</span></span>
        </div>
        <nav className="flex gap-8 items-center">
          <Link to="/" className="text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-primary transition-all">Home</Link>
          <button 
            onClick={() => setShowDatabase(!showDatabase)} 
            className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${showDatabase ? 'bg-primary border-primary text-white' : 'border-white/20 text-white/60 hover:border-white/40'}`}
          >
            {showDatabase ? 'Chiudi Console' : 'Admin Console'}
          </button>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full maritime-pattern opacity-20 pointer-events-none"></div>
        
        <div className="max-w-5xl w-full relative z-10">
          {!isSubmitted ? (
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="flex-1 text-left">
                <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded mb-6">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Protocollo Formspree Attivo</span>
                </div>
                <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-none tracking-tighter">
                  SERVIZIO <br/> <span className="text-primary">ASSISTENZA</span>
                </h1>
                <p className="text-slate-400 text-lg max-w-md leading-relaxed mb-8">
                  Invia una richiesta formale. I dati verranno inoltrati istantaneamente al nostro centro operativo tramite email crittografata.
                </p>
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-xs font-bold mb-6 flex items-center gap-3">
                    <span className="material-icons">error_outline</span> {error}
                  </div>
                )}
              </div>

              <div className="w-full max-w-md bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-xl shadow-2xl relative">
                <form onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Nome Completo</label>
                    <input 
                      required
                      type="text"
                      name="name"
                      className="w-full bg-black/40 border border-white/5 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="E.g. Mario Rossi"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Email</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      className="w-full bg-black/40 border border-white/5 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
                      placeholder="mario@email.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Dettagli</label>
                    <textarea 
                      required
                      rows={4}
                      name="message"
                      className="w-full bg-black/40 border border-white/5 rounded-xl p-4 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                      placeholder="Descrivi la tua richiesta..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-blue-600 disabled:bg-slate-700 text-white font-black py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="material-icons animate-spin text-sm">sync</span> Invio in corso...
                      </>
                    ) : 'Invia Messaggio'}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="text-center bg-white/[0.02] border border-primary/20 p-16 rounded-[3rem] max-w-xl mx-auto backdrop-blur-md">
              <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                <span className="material-icons text-6xl">forward_to_inbox</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tighter uppercase">Inviato!</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed">Il messaggio è stato spedito. Riceverai una risposta a breve.</p>
              <button onClick={() => setIsSubmitted(false)} className="bg-white/5 hover:bg-white/10 px-10 py-4 rounded-full font-bold uppercase text-[10px] tracking-[0.3em] border border-white/10 transition-all">
                Invia un altro
              </button>
            </div>
          )}

          {showDatabase && (
            <div className="mt-24 text-left border-t border-white/10 pt-16 animate-in slide-in-from-bottom duration-700">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
                <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">Registro Locale</h3>
                  <p className="text-slate-500 text-sm max-w-md italic">Copia dei messaggi salvata su questo browser.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={exportData} disabled={messages.length === 0} className="bg-white text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase hover:bg-slate-200 transition-all disabled:opacity-20">Esporta</button>
                  <button onClick={clearDatabase} disabled={messages.length === 0} className="bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-3 rounded-xl font-black text-[10px] uppercase hover:bg-red-500/20 transition-all">Cancella</button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {messages.length === 0 ? (
                  <div className="col-span-2 p-20 border-2 border-dashed border-white/5 rounded-[2rem] text-center text-slate-700">Nessun messaggio salvato</div>
                ) : (
                  messages.map(m => (
                    <div key={m.id} className="bg-white/[0.03] p-6 rounded-2xl border border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-xl font-bold text-white">{m.name}</span>
                        <span className="text-[9px] text-slate-600 font-mono">{m.date}</span>
                      </div>
                      <div className="text-xs text-primary mb-4">{m.email}</div>
                      <p className="text-sm text-slate-300 italic">"{m.message}"</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="py-10 px-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center opacity-30">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Stato: Connesso a Formspree</span>
        <p className="text-[9px] uppercase tracking-[0.5em]">Argos Sea • Crittografia End-to-End</p>
      </footer>
    </div>
  );
};

export default PCMaintenancePage;
