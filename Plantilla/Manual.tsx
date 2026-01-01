
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, HelpCircle, ShieldCheck, Cpu, Zap, Database, ChevronRight, Menu, Layout, Key, Lock, ArrowRight, TrendingUp, TrendingDown, BarChart3, Globe, Layers, Activity, Search, Shield, BookOpen, Terminal, Smartphone, ExternalLink } from 'lucide-react';

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
  { id: 'man-intro', title: 'Tesis y Propósito', icon: <Layout size={16} /> },
  { id: 'man-fiat', title: 'El Sistema Bancario', icon: <TrendingUp size={16} /> },
  { id: 'man-bolsa', title: 'Mercados de Capital', icon: <Activity size={16} /> },
  { id: 'man-arch', title: 'Arquitectura DeFi', icon: <Cpu size={16} /> },
  { id: 'man-inst', title: 'Instrumentos Programables', icon: <Layers size={16} /> },
  { id: 'man-prot', title: 'Protocolos Líderes', icon: <Globe size={16} /> },
  { id: 'man-comp', title: 'Comparativa Sistémica', icon: <BarChart3 size={16} /> },
  { id: 'man-glosario', title: 'Glosario Maestro', icon: <BookOpen size={16} /> },
  { id: 'man-gemini', title: 'Configuración Gemini', icon: <Key size={16} /> },
];

export const Manual: React.FC<ManualProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      <div className="bg-white w-full h-full md:h-[90vh] md:max-w-5xl md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border border-gray-100 animate-in zoom-in-95 duration-300">
        
        {/* HEADER DEL MANUAL */}
        <div className="p-4 md:p-8 border-b border-gray-100 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 md:hidden hover:bg-gray-100 rounded-xl text-gray-900 transition-colors">
              <Menu size={24} />
            </button>
            <div className="p-3 bg-red-700 rounded-2xl text-white shadow-xl shadow-red-700/20">
              <HelpCircle size={24} />
            </div>
            <div>
              <h3 className="font-black text-gray-900 uppercase tracking-tighter text-2xl leading-none">Manual de Operaciones</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1">Ecosistema Financiero Digital v26.01C</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-50 rounded-full text-gray-400 hover:text-red-700 transition-all active:scale-90">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          
          {/* NAVEGACIÓN LATERAL */}
          <aside className={`absolute md:relative z-20 w-72 h-full bg-white border-r border-gray-50 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="p-6 space-y-1 overflow-y-auto custom-scrollbar">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 px-3">Capítulos</p>
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all group ${
                    activeSection === section.id 
                      ? 'bg-red-50 text-red-700 shadow-sm border border-red-100' 
                      : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={activeSection === section.id ? 'text-red-700' : 'text-gray-400'}>{section.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-tight">{section.title}</span>
                  </div>
                  {activeSection === section.id && <ChevronRight size={12} className="animate-in slide-in-from-left-1" />}
                </button>
              ))}
            </div>
            <div className="mt-auto p-8 bg-gray-50/50 border-t border-gray-100">
               <div className="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  Sincronización Activa
               </div>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-8 md:p-16 space-y-32 custom-scrollbar scroll-smooth bg-white">
            
            {/* TESIS Y PROPÓSITO */}
            <section id="man-intro" className="space-y-8 animate-in fade-in duration-700">
              <div className="space-y-4">
                <span className="inline-block bg-red-700 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Master Thesis</span>
                <h2 className="text-5xl font-black text-gray-900 tracking-tighter leading-[0.9]">Visión<br/><span className="text-red-700 italic">Estratégica</span></h2>
                <p className="text-gray-500 leading-relaxed text-lg font-medium max-w-2xl italic border-l-4 border-gray-100 pl-6">
                  "Esta plataforma analiza la transición desde la confianza institucional (Fiat) hacia la certeza algorítmica (DeFi), proporcionando un entorno pedagógico para entender la nueva infraestructura del valor."
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="p-8 bg-gray-900 text-white rounded-[2rem] space-y-4 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform"><Globe size={60} className="text-red-600" /></div>
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-red-500">Desintermediación</h4>
                    <p className="text-[13px] text-gray-400 leading-relaxed">Explora cómo los protocolos de código abierto sustituyen la necesidad de un tercero de confianza en la gestión del valor.</p>
                 </div>
                 <div className="p-8 bg-gray-50 border border-gray-100 rounded-[2rem] space-y-4 hover:border-red-200 transition-all duration-500">
                    <h4 className="font-black text-xs uppercase tracking-[0.2em] text-gray-900">Soberanía Digital</h4>
                    <p className="text-[13px] text-gray-500 leading-relaxed">Aprende los pilares de la autocustodia: la capacidad técnica de ser tu propio banco sin limitaciones geográficas ni censura.</p>
                 </div>
              </div>
            </section>

            {/* EL SISTEMA BANCARIO */}
            <section id="man-fiat" className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-red-700"></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-700">El Mecanismo de Deuda</h3>
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Reserva Fraccionaria<br/>y <span className="text-gray-400">Dinero Cautivo</span></h2>
              <div className="space-y-6 text-gray-600 text-sm leading-relaxed max-w-3xl">
                <p>El sistema Fiat se basa en el curso legal. Los bancos crean dinero digital mediante préstamos, manteniendo solo una fracción en reserva. Este proceso se conoce como <strong>Multiplicador Monetario</strong>.</p>
                <div className="space-y-4">
                  <div className="flex gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm">
                    <div className="text-red-700 font-black text-xl">M1</div>
                    <p className="text-xs"><strong>Efectivo y Depósitos:</strong> La forma más líquida de dinero, controlada por políticas de tipos de interés.</p>
                  </div>
                  <div className="flex gap-4 p-5 bg-red-700 text-white rounded-2xl shadow-xl">
                    <div className="font-black text-xl"><TrendingDown size={24} /></div>
                    <p className="text-xs"><strong>Inflación:</strong> El impuesto silencioso que erosiona el poder adquisitivo real. Consulta la gráfica en la sección 01 para ver el impacto nominal vs real.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* MERCADOS DE CAPITAL */}
            <section id="man-bolsa" className="space-y-8">
               <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-gray-900"></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-900">Bolsa e Inversión</h3>
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter italic">Riesgo, Retorno<br/>y <span className="text-red-700">Volatilidad</span></h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
                La Bolsa de Valores es el mercado centralizado para la negociación de activos. Esta aplicación analiza la relación entre la rentabilidad esperada y el riesgo asumido.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="block font-black text-[11px] uppercase text-gray-900">Renta Fija (Bonos)</span>
                    <p className="text-[11px] text-gray-400 mt-1">Préstamos a entidades a cambio de un cupón predecible. Riesgo moderado.</p>
                 </div>
                 <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <span className="block font-black text-[11px] uppercase text-red-700">Renta Variable (Acciones)</span>
                    <p className="text-[11px] text-gray-400 mt-1">Propiedad parcial de empresas. Potencial de crecimiento ilimitado pero con riesgo de capital.</p>
                 </div>
              </div>
            </section>

            {/* ARQUITECTURA DEFI */}
            <section id="man-arch" className="space-y-8">
              <div className="flex items-center gap-3 text-red-700">
                <Cpu size={24} />
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">Soberanía Matemática</h3>
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Equivalencias<br/>de <span className="text-red-700 underline decoration-gray-900">Sistema</span></h2>
              <p className="text-gray-600 text-sm leading-relaxed">DeFi no es solo una alternativa, es una réplica programable de todo el sistema financiero tradicional:</p>
              <div className="space-y-3">
                 {[
                   { f: 'Banco Central', d: 'Algoritmos de Emisión (Smart Contracts)' },
                   { f: 'Banco Comercial', d: 'Protocolos de Lending (Aave)' },
                   { f: 'Casas de Cambio', d: 'Liquidity Pools / DEX (Uniswap)' },
                   { f: 'Libreta Bancaria', d: 'Wallets de Autocustodia' }
                 ].map((eq, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-red-700 transition-colors">
                      <span className="text-[10px] font-black uppercase text-gray-400">{eq.f}</span>
                      <ArrowRight size={14} className="text-red-700" />
                      <span className="text-[10px] font-black uppercase text-gray-900 italic">{eq.d}</span>
                   </div>
                 ))}
              </div>
            </section>

            {/* INSTRUMENTOS PROGRAMABLES */}
            <section id="man-inst" className="space-y-8">
              <div className="flex items-center gap-3">
                <Layers size={20} className="text-red-700" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Capas de Valor</h3>
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Finanzas<br/>Sin Permiso</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <h4 className="font-black text-xs uppercase tracking-widest text-red-700">Stablecoins</h4>
                    <p className="text-[12px] text-gray-500 leading-relaxed italic">El puente fundamental. Tokens que mantienen la paridad 1:1 con el dólar (USDC, DAI), permitiendo operar sin la volatilidad extrema del mercado cripto.</p>
                 </div>
                 <div className="space-y-3">
                    <h4 className="font-black text-xs uppercase tracking-widest text-gray-900">Yield Farming</h4>
                    <p className="text-[12px] text-gray-500 leading-relaxed italic">La optimización de incentivos. Poner a trabajar tus activos en diferentes protocolos para obtener recompensas por proveer liquidez o seguridad.</p>
                 </div>
              </div>
            </section>

            {/* PROTOCOLOS LÍDERES */}
            <section id="man-prot" className="space-y-8">
              <div className="flex items-center gap-3 text-red-700">
                 <Globe size={24} />
                 <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">Infraestructura Global</h3>
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Los Pilares<br/>del <span className="text-gray-400">Ecosistema</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-3">
                    <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center font-black">BTC</div>
                    <h4 className="font-black text-[11px] uppercase">Bitcoin</h4>
                    <p className="text-[10px] text-gray-400">Oro Digital. Reserva de valor pura con escasez absoluta.</p>
                 </div>
                 <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-3">
                    <div className="w-10 h-10 bg-red-700 text-white rounded-xl flex items-center justify-center font-black">ETH</div>
                    <h4 className="font-black text-[11px] uppercase">Ethereum</h4>
                    <p className="text-[10px] text-gray-400">Ordenador Mundial. Base de los contratos inteligentes.</p>
                 </div>
                 <div className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-3">
                    <div className="w-10 h-10 bg-gray-100 text-gray-900 rounded-xl flex items-center justify-center font-black">UNI</div>
                    <h4 className="font-black text-[11px] uppercase">Uniswap</h4>
                    <p className="text-[10px] text-gray-400">Intercambio sin dueños. Liquidez descentralizada.</p>
                 </div>
              </div>
            </section>

            {/* COMPARATIVA SISTÉMICA */}
            <section id="man-comp" className="space-y-8">
               <div className="flex items-center gap-3">
                  <BarChart3 size={20} className="text-red-700" />
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Vector de Atributos</h3>
               </div>
               <h2 className="text-4xl font-black text-gray-900 tracking-tighter italic">Finalidad y<br/><span className="text-red-700">Eficiencia</span></h2>
               <p className="text-gray-500 text-sm leading-relaxed max-w-3xl">
                 La diferencia crítica reside en la <strong>Finalidad Transaccional</strong>. Mientras que el sistema SWIFT requiere días para liquidar pagos internacionales, una red de Capa 2 (L2) o Solana lo hace en segundos con una fracción del coste.
               </p>
               <div className="bg-gray-50 p-8 rounded-[3rem] border border-gray-100 space-y-4">
                  <div className="flex items-center gap-3 text-[11px] font-black uppercase text-gray-900">
                    <Smartphone size={16} /> Disponibilidad 24/7/365
                  </div>
                  <p className="text-[12px] text-gray-500 leading-relaxed">DeFi no cierra los fines de semana ni festivos. La infraestructura opera perpetuamente gracias al consenso distribuido.</p>
               </div>
            </section>

            {/* GLOSARIO MAESTRO */}
            <section id="man-glosario" className="space-y-12">
              <div className="flex items-center gap-3">
                 <BookOpen size={20} className="text-red-700" />
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Diccionario Estructural</h3>
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter italic">Glosario de<br/><span className="text-red-700">Términos</span></h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                 {[
                   { t: 'Liquidación', d: 'Cierre forzoso de una posición cuando el valor del colateral cae por debajo del umbral de seguridad para cubrir la deuda.' },
                   { t: 'Impermanent Loss', d: 'La pérdida temporal de fondos que sufren los proveedores de liquidez debido a la volatilidad en un pool de intercambio.' },
                   { t: 'Smart Contract', d: 'Contratos autoejecutables donde los términos del acuerdo están escritos directamente en líneas de código inmutables.' },
                   { t: 'TVL', d: 'Total Value Locked. La métrica que mide la cantidad total de activos depositados en un protocolo DeFi específico.' },
                   { t: 'Hash', d: 'Identificador criptográfico único que garantiza que la información contenida en un bloque no ha sido alterada.' },
                   { t: 'APY', d: 'Annual Percentage Yield. El rendimiento anual que incluye el efecto del interés compuesto sobre el capital.' },
                   { t: 'DAO', d: 'Organización Autónoma Descentralizada. Entidades gobernadas por sus miembros mediante votación on-chain.' },
                   { t: 'Mainnet', d: 'La red principal y activa de una blockchain donde las transacciones tienen valor económico real.' }
                 ].map((term, i) => (
                   <div key={i} className="space-y-2 group">
                      <div className="flex items-center gap-2">
                        <Terminal size={12} className="text-red-700" />
                        <h4 className="font-black text-xs uppercase tracking-widest group-hover:text-red-700 transition-colors">{term.t}</h4>
                      </div>
                      <p className="text-[12px] text-gray-400 leading-relaxed italic border-l-2 border-gray-100 pl-4">{term.d}</p>
                   </div>
                 ))}
              </div>
            </section>

            {/* CONFIGURACIÓN GEMINI (API KEY) */}
            <section id="man-gemini" className="space-y-8 pb-32">
               <div className="flex items-center gap-3 text-red-700">
                  <Key size={24} className="animate-pulse" />
                  <h3 className="text-[11px] font-black uppercase tracking-[0.4em]">Activación del Motor</h3>
               </div>
               <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Cómo obtener tu<br/><span className="text-red-700 underline decoration-gray-900">Gemini API Key</span></h2>
               <div className="bg-white border border-gray-200 p-10 rounded-[3rem] space-y-8 shadow-xl">
                  <p className="text-gray-600 text-sm font-bold italic">Sigue estos pasos para habilitar la Inteligencia Financiera en la App:</p>
                  <div className="space-y-6">
                    {[
                      { step: '01', t: 'Accede a Google AI Studio', d: 'Visita https://aistudio.google.com/ e inicia sesión con tu cuenta de Google.' },
                      { step: '02', t: 'Crea tu API Key', d: 'Haz clic en "Get API key" en el menú lateral y luego en "Create API key in new project".' },
                      { step: '03', t: 'Copia el Código', d: 'Copia la cadena alfanumérica que empieza por "AIza...".' },
                      { step: '04', t: 'Vincula en Ajustes', d: 'Abre el panel de Ajustes en esta App, pega la clave y pulsa Guardar.' }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-6 items-start group">
                        <span className="text-3xl font-black text-red-100 group-hover:text-red-700 transition-colors leading-none">{step.step}</span>
                        <div className="space-y-1">
                          <h4 className="font-black text-xs uppercase tracking-widest">{step.t}</h4>
                          <p className="text-[12px] text-gray-400 leading-relaxed">{step.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-lg">
                       Ir a Google AI Studio <ExternalLink size={14} />
                    </a>
                  </div>
               </div>
            </section>

          </div>
        </div>

        {/* PIE DE ACCIÓN MÓVIL */}
        <div className="p-6 border-t border-gray-100 bg-white md:hidden">
          <button 
            onClick={onClose} 
            className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl font-black text-sm uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl"
          >
            Cerrar Manual
          </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
        section { scroll-margin-top: 120px; }
      `}</style>
    </div>
  );
};
