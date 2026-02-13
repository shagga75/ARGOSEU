
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const FORMSPREE_ID = "mjgeyjov"; 

const MobileMaintenancePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        setIsSubmitted(true);
      } else {
        throw new Error("Errore Formspree");
      }
    } catch (err) {
      setError("Errore di invio. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background-dark text-slate-100 min-h-screen flex flex-col p-6">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center gap-2" onClick={() => navigate("/")}>
          <span className="material-icons text-primary">directions_boat</span>
          <span className="font-bold uppercase text-lg tracking-tight">Argos Sea</span>
        </div>
        <Link to="/" className="text-xs opacity-50 uppercase font-black tracking-widest">Esci</Link>
      </header>

      <main className="flex-grow flex flex-col">
        {!isSubmitted ? (
          <div className="space-y-8 animate-in slide-in-from-bottom duration-500">
            <div>
              <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Supporto</h1>
              <p className="text-slate-400">Invia una richiesta diretta al nostro team operativo.</p>
            </div>

            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs font-bold">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Nome</label>
                <input 
                  required
                  type="text"
                  name="name"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary transition-all"
                  placeholder="Il tuo nome"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                <input 
                  required
                  type="email"
                  name="email"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary transition-all"
                  placeholder="tua@email.it"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Messaggio</label>
                <textarea 
                  required
                  rows={4}
                  name="message"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-2xl p-4 outline-none focus:border-primary resize-none transition-all"
                  placeholder="Come possiamo aiutarti?"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-accent-orange text-white font-black py-5 rounded-2xl shadow-lg uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-2"
              >
                {isSubmitting ? <span className="material-icons animate-spin">sync</span> : 'Invia Richiesta'}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="material-icons text-5xl text-primary">mail_lock</span>
            </div>
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">Spedito!</h2>
              <p className="text-slate-400">Abbiamo ricevuto la tua comunicazione.</p>
            </div>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="bg-white/5 px-10 py-4 rounded-full font-bold uppercase text-[10px] tracking-widest border border-white/10"
            >
              Scrivi ancora
            </button>
          </div>
        )}
      </main>

      <footer className="mt-12 py-8 text-center border-t border-white/5 opacity-30">
        <p className="text-[10px] uppercase tracking-[0.4em]">Argos Sea Mobile • Email Relay</p>
      </footer>
    </div>
  );
};

export default MobileMaintenancePage;
