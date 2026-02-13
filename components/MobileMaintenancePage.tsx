
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  name: string;
  email: string;
  text: string;
  date: string;
}

const MobileMaintenancePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', text: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedMessages, setSavedMessages] = useState<Message[]>([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('argos_sea_messages') || '[]');
    setSavedMessages(logs);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      ...formData,
      date: new Date().toLocaleString(),
    };

    const updatedMessages = [newMessage, ...savedMessages];
    localStorage.setItem('argos_sea_messages', JSON.stringify(updatedMessages));
    setSavedMessages(updatedMessages);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-background-dark text-slate-100 min-h-screen flex flex-col overflow-x-hidden">
      <nav className="w-full px-6 py-6 lg:px-12 flex justify-between items-center border-b border-primary/10">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-icons text-white">directions_boat</span>
          </div>
          <span className="text-2xl font-[800] tracking-tighter text-white uppercase">Argos Sea</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">Home</Link>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 lg:py-20 max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Coming Soon
            </div>
            <h1 className="text-5xl lg:text-7xl font-[800] leading-tight tracking-tight text-white">
              L'orizzonte si <span className="text-primary">allarga.</span>
            </h1>
            <p className="text-lg lg:text-xl text-slate-400 max-w-xl leading-relaxed">
              Stiamo portando la precisione della navigazione marittima sul palmo della tua mano.
            </p>

            <div className="relative mt-8 group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-orange rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-background-dark border-8 border-slate-800 rounded-[3rem] p-4 shadow-2xl w-60 h-[480px] overflow-hidden">
                <div className="bg-primary/5 h-full rounded-[2rem] overflow-hidden flex flex-col relative">
                  <img 
                    className="w-full h-full object-cover opacity-60 mix-blend-overlay" 
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800" 
                    alt="Smartphone background"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <span className="material-icons text-5xl text-primary mb-4">phishing</span>
                    <div className="h-2 w-24 bg-primary/30 rounded-full mb-2"></div>
                    <div className="h-2 w-16 bg-primary/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto lg:mr-0">
            {!isSubmitted ? (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-primary/10 p-8 lg:p-10 rounded-2xl shadow-2xl">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Modulo di Contatto</h2>
                  <p className="text-slate-400">Salva la tua richiesta nel nostro sistema.</p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">Nome Completo</label>
                    <input 
                      required
                      className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-white" 
                      placeholder="Mario Rossi" 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">Email</label>
                    <input 
                      required
                      className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-white" 
                      placeholder="mario.rossi@example.com" 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wider">Messaggio</label>
                    <textarea 
                      className="w-full bg-slate-800 border-slate-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary text-white resize-none" 
                      placeholder="Scrivi qui..." 
                      rows={4}
                      value={formData.text}
                      onChange={(e) => setFormData({...formData, text: e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-accent-orange hover:bg-orange-600 text-white font-[800] py-4 px-6 rounded-lg shadow-lg shadow-orange-500/20 transform transition-all active:scale-95 flex items-center justify-center gap-2 tracking-widest uppercase">
                    <span>Salva Messaggio</span>
                    <span className="material-icons text-sm">save</span>
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-slate-900/50 backdrop-blur-xl border border-primary/20 p-10 rounded-2xl shadow-2xl text-center animate-in zoom-in duration-300">
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-icons text-4xl">done_all</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Ricevuto!</h3>
                <p className="text-slate-400 mb-8">La tua richiesta è stata registrata con successo nel database di Argos Sea.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-primary/10 text-primary px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-widest"
                >
                  Nuovo Messaggio
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer & Background remains same */}
      <footer className="w-full px-6 py-8 border-t border-primary/10 mt-auto bg-slate-950/20">
        <div className="max-w-7xl mx-auto flex justify-center text-sm text-slate-500">
          © 2024 ARGOS SEA. Database Operativo Locale.
        </div>
      </footer>
    </div>
  );
};

export default MobileMaintenancePage;
