import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, HelpCircle, ShieldCheck, Cpu, Zap, Database, ChevronRight, Menu, Layout, Key, Lock, ArrowRight, TrendingUp, BarChart3, Globe } from 'lucide-react';

interface ManualProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const SECTIONS: Section[] = [
  { id: 'man-intro', title: 'Introducción', icon: <Layout size={16} /> },
  { id: 'man-fiat', title: 'Fiat vs DeFi', icon: <TrendingUp size={16} /> },
  { id: 'man-charts', title: 'Interpretación', icon: <BarChart3 size={16} /> },
  { id: 'man-motor', title: 'Análisis IA', icon: <Cpu size={16} /> },
  { id: 'man-security', title: 'Seguridad', icon: <ShieldCheck size={16} /> },
  { id: 'man-storage', title: 'Privacidad', icon: <Database size={16} /> },
];

export const Manual: React.FC<ManualProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- SCROLL SPY LOGIC ---
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const threshold = 150;

    for (const section of SECTIONS) {
      const element = document.getElementById(section.id);
      if (element) {
        const offsetTop = element.offsetTop - threshold;
        if (scrollTop >= offsetTop) {
          setActiveSection(section.id);
        }
      }
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (isOpen && container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen, handleScroll]);

  // --- NAVIGATION ---
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: element.offsetTop - 20,
        behavior: 'smooth'
      });
      setActiveSection(id);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 md:p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full h-full md:h-[90vh] md:max-w-5xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-300">
        
        {/* TOP BAR */}
        <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 md:hidden hover:bg-gray-200 rounded-lg text-gray-900 transition-colors"
            >
              <Menu size={20} />
            </button>
            <div className="p-2 bg-red-700 rounded-lg text-white hidden sm:block">
              <HelpCircle size={20} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase tracking-tighter text-lg leading-tight">Guía de la Master Thesis</h3>
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest hidden sm:block">Economía Fiat ➜ DeFi • Documentación v2.1</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-700 transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          
          {/* SIDEBAR (NAVIGATOR) */}
          <aside className={`
            absolute md:relative z-20 w-64 h-full bg-white border-r border-gray-100 flex flex-col transition-transform duration-300
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="p-6 space-y-1">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Módulos</p>
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${
                    activeSection === section.id 
                      ? 'bg-red-50 text-red-700 border-l-4 border-red-700' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeSection === section.id ? 'text-red-700' : 'text-gray-400'}>
                      {section.icon}
                    </span>
                    <span className={`text-xs font-black uppercase tracking-tight transition-all ${
                      activeSection === section.id ? 'translate-x-1' : ''
                    }`}>
                      {section.title}
                    </span>
                  </div>
                  {activeSection === section.id && <ChevronRight size={14} />}
                </button>
              ))}
            </div>
            <div className="mt-auto p-6 bg-gray-50/50">
               <div className="flex items-center gap-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-700 animate-pulse"></span>
                  Modo Lectura Activo
               </div>
            </div>
          </aside>

          {/* OVERLAY FOR MOBILE SIDEBAR */}
          {isSidebarOpen && (
            <div 
              className="md:hidden absolute inset-0 bg-black/20 z-10 backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* CONTENT AREA */}
          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-8 md:p-12 space-y-20 custom-scrollbar scroll-smooth"
          >
            {/* INTRO */}
            <section id="man-intro" className="space-y-6">
              <div className="space-y-2">
                <span className="text-red-700 font-black text-[10px] uppercase tracking-[0.3em]">01. Contexto</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Visión de la<br/><span className="text-red-700 italic underline decoration-gray-900 decoration-2">Tesis Master</span></h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                Esta aplicación constituye un entorno interactivo para la exposición de la <strong>evolución de los sistemas financieros</strong>. El objetivo es analizar cómo la confianza institucional (Fiat) está siendo sustituida por la certeza matemática (DeFi).
              </p>
              <div className="bg-gray-900 text-white p-6 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform text-red-600">
                   <Globe size={80} />
                </div>
                <h4 className="font-black text-xs uppercase tracking-widest mb-2">Objetivo Sistémico</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed max-w-sm">
                   Explorar la desintermediación bancaria y la soberanía financiera individual a través de protocolos abiertos y transparentes.
                </p>
              </div>
            </section>

            {/* FIAT VS DEFI */}
            <section id="man-fiat" className="space-y-6">
              <div className="space-y-2">
                <span className="text-red-700 font-black text-[10px] uppercase tracking-[0.3em]">02. Conceptos</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">La Gran<br/>Transición</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                La navegación se divide en 6 bloques que recorren desde el ahorro tradicional hasta las finanzas programables:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-4 border border-gray-100 rounded-2xl">
                    <h5 className="font-black text-[10px] uppercase text-red-700 mb-1">Mundo Fiat</h5>
                    <p className="text-[11px] text-gray-500 italic leading-tight">Crédito, reserva fraccionaria e inflación.</p>
                 </div>
                 <div className="p-4 border border-gray-100 rounded-2xl bg-gray-900">
                    <h5 className="font-black text-[10px] uppercase text-white mb-1">Mundo DeFi</h5>
                    <p className="text-[11px] text-gray-400 italic leading-tight">Lending algorítmico, DEX y Smart Contracts.</p>
                 </div>
              </div>
            </section>

            {/* CHARTS */}
            <section id="man-charts" className="space-y-6">
              <div className="space-y-2">
                <span className="text-red-700 font-black text-[10px] uppercase tracking-[0.3em]">03. Visualización</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Interpretación<br/>de Datos</h2>
              </div>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-1 bg-red-700"></div>
                  <div className="space-y-2">
                    <h4 className="font-black text-xs uppercase">Multiplicador y Erosión</h4>
                    <p className="text-xs text-gray-600">Visualice cómo el crédito bancario crea masa monetaria y cómo la inflación erosiona su capital real en el gráfico "Impuesto Silencioso".</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1 bg-gray-900"></div>
                  <div className="space-y-2">
                    <h4 className="font-black text-xs uppercase">Radar de Atributos</h4>
                    <p className="text-xs text-gray-600">Compare la transparencia y velocidad entre sistemas. Observe cómo DeFi domina en disponibilidad (24/7) y auditoría on-chain.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* MOTOR IA */}
            <section id="man-motor" className="space-y-6">
              <div className="space-y-2">
                <span className="text-red-700 font-black text-[10px] uppercase tracking-[0.3em]">04. Inteligencia</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Análisis por<br/>Motor IA</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                El sistema integra el motor <strong>Gemini 3 Flash</strong> para asistir en el análisis. Acceda a <strong>Ajustes Maestro</strong> para configurar su API Key.
              </p>
              <div className="bg-red-50 border border-red-100 p-6 rounded-3xl space-y-3">
                <div className="flex items-center gap-2 text-red-700">
                  <Zap size={18} />
                  <span className="font-black text-[10px] uppercase tracking-widest">Consultas Sugeridas</span>
                </div>
                <ul className="text-[11px] text-gray-700 space-y-2 italic font-medium">
                  <li>• "¿Cómo afecta la liquidez de Uniswap a la eficiencia de mercado?"</li>
                  <li>• "Compara el riesgo de colateral en Aave frente a un banco tradicional."</li>
                  <li>• "Explica el concepto de Impermanent Loss en pools de liquidez."</li>
                </ul>
              </div>
            </section>

            {/* SECURITY */}
            <section id="man-security" className="space-y-6">
              <div className="space-y-2">
                <span className="text-red-700 font-black text-[10px] uppercase tracking-[0.3em]">05. Blindaje</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Control de<br/>Acceso</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                La seguridad es fundamental en finanzas. Esta aplicación implementa un <strong>PIN de acceso local</strong> (7887) para proteger la visualización del contenido.
              </p>
              <div className="p-4 bg-gray-900 border border-gray-800 rounded-2xl flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <Lock size={16} className="text-red-600" />
                  <span className="text-[10px] font-black uppercase text-white tracking-widest">Protocolo Antifraude</span>
                </div>
                <div className="h-2 w-16 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-700 w-full animate-pulse"></div>
                </div>
              </div>
            </section>

            {/* STORAGE */}
            <section id="man-storage" className="space-y-6 pb-20">
              <div className="space-y-2">
                <span className="text-red-700 font-black text-[10px] uppercase tracking-[0.3em]">06. Privacidad</span>
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">Soberanía de<br/>Datos Locales</h2>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm">
                En línea con la filosofía Web3 y DeFi, esta aplicación no utiliza servidores centrales para sus datos de sesión.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                  <h5 className="font-black text-[9px] uppercase tracking-widest mb-1 text-gray-400">¿Qué es Local?</h5>
                  <p className="text-[11px] font-bold text-gray-700 italic">API Key, PIN Auth, Preferencias de Modelo.</p>
                </div>
                <div className="p-4 border border-gray-100 rounded-2xl bg-gray-50/50">
                  <h5 className="font-black text-[9px] uppercase tracking-widest mb-1 text-gray-400">¿Cómo Limpiar?</h5>
                  <p className="text-[11px] font-bold text-red-700 italic">Botón "RESET MEMORY" en Ajustes.</p>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* BOTTOM ACTION */}
        <div className="p-6 border-t border-gray-100 bg-white md:hidden">
          <button 
            onClick={onClose} 
            className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all"
          >
            Cerrar Guía
          </button>
        </div>
      </div>
    </div>
  );
};