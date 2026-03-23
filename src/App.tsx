import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Monitor, 
  Wind, 
  Printer, 
  FileText, 
  UserRound, 
  Music, 
  Film, 
  MessageSquare, 
  X, 
  Send, 
  Phone, 
  Calendar,
  ChevronRight,
  Cpu,
  ShieldCheck,
  Zap,
  Instagram
} from 'lucide-react';
import Markdown from 'react-markdown';
import { SERVICES, Service } from './constants';
import { getChatResponse } from './services/geminiService';
import { generateLogo } from './services/logoGenerator';

const IconMap: Record<string, any> = {
  Monitor, Wind, Printer, FileText, UserRound, Music, Film
};

export default function App() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: 'Olá! Bem-vindo à M4rlon Tech. Sou seu assistente digital. Como posso ajudar com sua tecnologia hoje? 💻✨' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchLogo = async () => {
      const url = await generateLogo();
      setLogoUrl(url);
    };
    fetchLogo();
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
    history.push({ role: 'user', parts: [{ text: userMessage }] });

    const response = await getChatResponse(history);
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-panel sticky top-0 z-50 px-6 py-4 flex justify-center items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center neon-border overflow-hidden">
            <img 
              src={logoUrl || "/logo.png"} 
              alt="Logo" 
              className="w-full h-full object-contain p-1"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
                (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-cpu text-brand-primary w-6 h-6"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>';
              }}
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white uppercase italic">
              M4rlon <span className="text-brand-primary">Tech</span>
            </h1>
            <p className="text-xs uppercase tracking-[0.3em] text-brand-primary font-bold">Serviços de Informática</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        {/* Hero Section */}
        <section className="mb-20 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider mb-4 border border-brand-primary/20">
                Soluções Digitais & Manutenção
              </span>
              <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Sua tecnologia em <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">boas mãos.</span>
              </h2>
            </motion.div>
          </div>
          <div className="flex-1 relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative z-10"
            >
              <div className="w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden neon-border relative group bg-brand-surface flex items-center justify-center p-8">
                <img 
                  src={logoUrl || "/logo.png"} 
                  alt="M4rlon Tech Logo" 
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/tech/800/800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent pointer-events-none" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-brand-primary/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-secondary/20 rounded-full blur-3xl animate-pulse" />
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h3 className="text-3xl font-bold mb-2">Nossos Serviços</h3>
              <p className="text-white/50">Organizados para facilitar sua escolha.</p>
            </div>
            <div className="flex gap-2">
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">Hardware</div>
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">Digital</div>
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-medium">Mídia</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => {
              const Icon = IconMap[service.icon];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-panel p-6 rounded-2xl group transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mb-6">
                    <Icon className="text-brand-primary" size={24} />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-brand-primary font-bold mb-2 block">
                    {service.category}
                  </span>
                  <h4 className="text-xl font-bold mb-2">{service.title}</h4>
                  <p className="text-sm text-white/50 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[10px] text-white/40">
                      <Zap size={12} className="text-brand-primary" />
                      {service.delivery}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
              Precisa formatar seu PC, dar aquela geral na impressora ou atualizar sua biblioteca de filmes e músicas? Escolha um dos nossos serviços acima e agende seu horário.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => setIsChatOpen(true)}
                className="bg-brand-primary text-brand-dark px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-brand-primary/20"
              >
                <MessageSquare size={20} />
                Falar com Assistente
              </button>
              <a 
                href="https://wa.me/5587991927749" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-panel px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/5 transition-colors"
              >
                <Phone size={20} />
                WhatsApp
              </a>
              <a 
                href="https://www.instagram.com/m4rlontech/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass-panel px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-white/5 transition-colors"
              >
                <Instagram size={20} />
                Instagram
              </a>
            </div>
          </div>
        </section>

        {/* Stats / Trust */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 py-12 border-y border-white/5">
          <div className="text-center">
            <p className="text-4xl font-bold text-white mb-1">100%</p>
            <p className="text-xs uppercase tracking-widest text-white/40">Satisfação</p>
          </div>
          <div className="text-center">
            <Zap className="text-brand-primary mx-auto mb-2" size={32} />
            <p className="text-xs uppercase tracking-widest text-white/40">Agilidade</p>
          </div>
          <div className="text-center">
            <FileText className="text-brand-primary mx-auto mb-2" size={32} />
            <p className="text-xs uppercase tracking-widest text-white/40">Transparência</p>
          </div>
          <div className="text-center">
            <ShieldCheck className="text-brand-primary mx-auto mb-2" size={32} />
            <p className="text-xs uppercase tracking-widest text-white/40">Confiança</p>
          </div>
          <div className="text-center">
            <UserRound className="text-brand-primary mx-auto mb-2" size={32} />
            <p className="text-xs uppercase tracking-widest text-white/40">Atendimento personalizado</p>
          </div>
          <div className="text-center">
            <Zap className="text-brand-primary mx-auto mb-2" size={32} />
            <p className="text-xs uppercase tracking-widest text-white/40">Qualidade</p>
          </div>
          <div className="text-center">
            <Cpu className="text-brand-primary mx-auto mb-2" size={32} />
            <p className="text-xs uppercase tracking-widest text-white/40">Eficiência</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            Técnico de Informática | M4rlon Tech – oferecendo soluções tecnológicas confiáveis e suporte técnico de qualidade.
          </p>
        </div>
      </footer>

      {/* Chat Widget */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-6 right-6 w-full max-w-[400px] h-[600px] z-[100] flex flex-col glass-panel rounded-3xl overflow-hidden shadow-2xl border-brand-primary/20"
          >
            {/* Chat Header */}
            <div className="p-4 bg-brand-primary/10 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-brand-dark">
                    <Cpu size={20} />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-brand-dark rounded-full" />
                </div>
                <div>
                  <p className="text-sm font-bold">TechPersona</p>
                  <p className="text-[10px] text-emerald-500 font-medium">Online Agora</p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-primary text-brand-dark font-medium rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-white/90 rounded-tl-none'
                  }`}>
                    <div className="markdown-body">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white/5 border-t border-white/10">
              <div className="relative">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="w-full bg-brand-dark border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-brand-primary transition-colors"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-center text-white/30 mt-3">
                M4rlon Tech Assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      {!isChatOpen && (
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-brand-primary text-brand-dark rounded-full flex items-center justify-center shadow-2xl shadow-brand-primary/30 z-50 hover:scale-110 transition-transform"
        >
          <MessageSquare size={28} />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-brand-dark rounded-full" />
        </motion.button>
      )}
    </div>
  );
}
