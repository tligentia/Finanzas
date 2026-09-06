
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, HelpCircle, ShieldCheck, Cpu, Zap, Database, ChevronRight, Menu, Layout, 
  Key, Lock, ArrowRight, TrendingUp, TrendingDown, BarChart3, Globe, Layers, 
  Activity, Search, Shield, BookOpen, Terminal, Smartphone, ExternalLink, 
  Keyboard, ArrowRightLeft, Compass, Sparkles, CheckCircle2, AlertTriangle,
  FileText, Sliders
} from 'lucide-react';
import { APP_VERSION } from './Version';

interface ManualProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge?: string;
}

const SECTIONS: Section[] = [
  { id: 'man-intro', title: 'Tesis y Propósito', icon: <Layout size={16} /> },
  { id: 'man-struct', title: 'Estructura Global', icon: <Layers size={16} /> },
  { id: 'man-sec', title: 'Seguridad y Acceso PIN', icon: <ShieldCheck size={16} />, badge: 'Teclado' },
  { id: 'man-fiat', title: '01. Sistema Bancario Fiat', icon: <TrendingUp size={16} /> },
  { id: 'man-bolsa', title: '02. Mercados de Capital', icon: <Activity size={16} /> },
  { id: 'man-arch', title: '03. Arquitectura DeFi', icon: <Cpu size={16} /> },
  { id: 'man-matrix', title: 'Matriz DeFi vs Fiat', icon: <ArrowRightLeft size={16} />, badge: 'Nuevo' },
  { id: 'man-inst', title: '04. Instrumentos y Explorador', icon: <Compass size={16} /> },
  { id: 'man-modals', title: 'Modales Multi-Modo (5 Vistas)', icon: <FileText size={16} />, badge: 'Multi-Modo' },
  { id: 'man-gemini', title: '05. Motor IA Gemini & Ajustes', icon: <Key size={16} /> },
  { id: 'man-glosario', title: 'Glosario Maestro DeFi', icon: <BookOpen size={16} /> },
];

export const Manual: React.FC<ManualProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredSections = SECTIONS.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 md:p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full h-full md:h-[92vh] md:max-w-6xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-gray-200 animate-in zoom-in-95 duration-300">
        
        {/* HEADER DEL MANUAL */}
        <div className="p-4 md:p-6 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 md:hidden hover:bg-gray-100 rounded-xl text-gray-900 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </button>
            <div className="p-3 bg-red-700 rounded-2xl text-white shadow-xl shadow-red-700/20">
              <HelpCircle size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-gray-900 uppercase tracking-tighter text-xl md:text-2xl leading-none">Manual de Operaciones</h3>
                <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-black px-2 py-0.5 rounded-full">v{APP_VERSION}</span>
              </div>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em] mt-1">
                Guía Integral de Arquitectura, Funcionalidades y Comparativas
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-700 transition-all active:scale-90"
            title="Cerrar manual (Esc)"
          >
            <X size={26} />
          </button>
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          
          {/* NAVEGACIÓN LATERAL */}
          <aside className={`absolute md:relative z-20 w-80 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            {/* Buscador de secciones */}
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Buscar en el manual..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-700"
                />
              </div>
            </div>

            <div className="p-4 space-y-1 overflow-y-auto custom-scrollbar flex-1">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 px-2">Capítulos del Manual</p>
              {filteredSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group text-left ${
                    activeSection === section.id 
                      ? 'bg-red-50 text-red-700 border border-red-200 font-black shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-semibold'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className={activeSection === section.id ? 'text-red-700' : 'text-gray-400'}>{section.icon}</span>
                    <span className="text-[11px] uppercase tracking-tight truncate">{section.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {section.badge && (
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase ${
                        activeSection === section.id ? 'bg-red-700 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {section.badge}
                      </span>
                    )}
                    {activeSection === section.id && <ChevronRight size={12} className="text-red-700" />}
                  </div>
                </button>
              ))}
            </div>

            <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-black text-gray-500 uppercase tracking-wider">
                <span>Atajos y Teclado</span>
                <Keyboard size={14} className="text-red-700" />
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">
                El PIN soporta teclado físico (<kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-[9px] font-mono">0-9</kbd>, <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-[9px] font-mono">A-Z</kbd>, <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-[9px] font-mono">⌫</kbd>, <kbd className="px-1 py-0.5 bg-white border border-gray-300 rounded text-[9px] font-mono">Esc</kbd>).
              </p>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6 md:p-12 space-y-24 custom-scrollbar scroll-smooth bg-white">
            
            {/* 1. TESIS Y PROPÓSITO */}
            <section id="man-intro" className="space-y-6 animate-in fade-in duration-500">
              <div className="space-y-3">
                <span className="inline-block bg-red-700 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Tesis Central</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter leading-none">
                  Visión y <span className="text-red-700 italic">Arquitectura</span>
                </h2>
                <p className="text-gray-600 leading-relaxed text-base font-medium max-w-3xl border-l-4 border-red-700 pl-5 bg-gray-50 py-3 rounded-r-xl">
                  "Esta plataforma analiza la transición desde la confianza institucional centralizada (Fiat / TradFi) hacia la certeza algorítmica matemática (DeFi On-Chain), proporcionando un entorno pedagógico, analítico y práctico de la nueva infraestructura global del valor."
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-red-700 flex items-center justify-center font-black">
                    <Globe size={20} />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-wider text-gray-900">Desintermediación</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Sustitución de custodios, cámaras de compensación y banqueros por Smart Contracts auditables y de ejecución autónoma.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black">
                    <Shield size={20} />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-wider text-gray-900">Autocustodia</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    El usuario conserva el control criptográfico irrestricto de sus llaves privadas, sin riesgo de corralitos ni censura.
                  </p>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-red-700 text-white flex items-center justify-center font-black">
                    <Activity size={20} />
                  </div>
                  <h4 className="font-black text-xs uppercase tracking-wider text-gray-900">Operatividad 24/7/365</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Liquidación atómica inmediata (T+0) en cualquier momento del año, sin festivos bancarios ni horarios de corte.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. ESTRUCTURA GLOBAL DE LA APLICACIÓN */}
            <section id="man-struct" className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-red-700"></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-red-700">Navegación y Mapa del Sistema</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                Estructura de la <span className="text-gray-500">Plataforma</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                La aplicación está concebida como un recorrido cronológico y técnico dividido en 5 grandes bloques temáticos, complementados con herramientas interactivas y asistentes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { num: '01', title: 'Sistema Bancario Fiat', desc: 'Reserva fraccionaria, multiplicador monetario, inflación nominal vs real y masa monetaria (M1, M2, M3).' },
                  { num: '02', title: 'Mercados de Capital y Bolsa', desc: 'Riesgo y rentabilidad, renta fija frente a variable, volatilidad y frontera eficiente de inversión.' },
                  { num: '03', title: 'Arquitectura DeFi y Equivalencias', desc: 'Mapeo conceptual directo entre banca tradicional y protocolos on-chain. Incluye la Matriz Comparativa Detallada.' },
                  { num: '04', title: 'Instrumentos Programables & Explorador', desc: 'Explorador categorizado de Stablecoins, DEX, Lending, Staking Líquido, Yield Aggregators y Oráculos.' },
                  { num: '05', title: 'Protocolos Líderes & Ecosistemas', desc: 'Fichas exhaustivas de Bitcoin, Ethereum, Solana, Uniswap, Aave, Lido, MakerDAO/Sky con acceso a sus dApps.' },
                  { num: '06', title: 'Asistente IA Financiero Gemini', desc: 'Consultor inteligente contextual con acceso a modelos Gemini para resolución de dudas técnicas o simples.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-5 bg-gray-50 border border-gray-200 rounded-2xl flex items-start gap-4">
                    <span className="text-2xl font-black text-red-700 shrink-0">{item.num}</span>
                    <div>
                      <h4 className="text-xs font-black uppercase text-gray-900 tracking-wide">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. SEGURIDAD Y ACCESO PIN */}
            <section id="man-sec" className="space-y-6">
              <div className="flex items-center gap-3">
                <ShieldCheck size={22} className="text-red-700" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-red-700">Módulo de Seguridad y Autenticación</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                Control de Acceso y <span className="text-red-700">Entrada por Teclado</span>
              </h2>
              
              <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-900 font-black text-xs uppercase tracking-wider">
                      <Keyboard size={18} className="text-red-700" />
                      <span>Entrada Física por Teclado</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Ahora puedes introducir el PIN directamente desde el teclado de tu ordenador o portátil, sin necesidad de hacer clics manuales repetitivos:
                    </p>
                    <ul className="space-y-2 text-xs text-gray-700 font-medium">
                      <li className="flex items-center gap-2">
                        <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded text-[11px] font-mono shadow-sm">0-9 / A-Z</kbd>
                        <span>Introduce dígitos o caracteres alfanuméricos.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded text-[11px] font-mono shadow-sm">Backspace</kbd>
                        <span>Borra el último carácter introducido.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <kbd className="px-2 py-0.5 bg-white border border-gray-300 rounded text-[11px] font-mono shadow-sm">Escape</kbd>
                        <span>Limpia la casilla del PIN por completo.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3 bg-white p-5 rounded-2xl border border-gray-200">
                    <div className="flex items-center gap-2 text-gray-900 font-black text-xs uppercase tracking-wider">
                      <Lock size={16} className="text-red-700" />
                      <span>Códigos de Acceso Verificados</span>
                    </div>
                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-xs font-bold text-gray-600 uppercase">PIN Numérico:</span>
                        <span className="text-xs font-mono font-black text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">7887</span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                        <span className="text-xs font-bold text-gray-600 uppercase">Código Alfanumérico:</span>
                        <span className="text-xs font-mono font-black text-gray-900 bg-gray-100 px-2 py-0.5 rounded border border-gray-300">STAR</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-gray-400 italic mt-2">
                      El teclado en pantalla baraja periódicamente los caracteres para mitigar ataques de captura de pantalla y keyloggers visuales.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <span className="font-bold">Máscara Opcional:</span> Puedes alternar entre visualizar los caracteres o mantenerlos ocultos (`•`).
                  </div>
                  <div className="text-gray-400 font-semibold text-[11px]">
                    Soporte táctil optimizado para smartphones y tablets.
                  </div>
                </div>
              </div>
            </section>

            {/* 4. EL SISTEMA BANCARIO FIAT */}
            <section id="man-fiat" className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-8 bg-red-700"></div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-red-700">Sección 01</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                Reserva Fraccionaria y <span className="text-red-700">Erosión del Valor</span>
              </h2>
              
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed max-w-3xl">
                <p>
                  El sistema bancario convencional funciona mediante <strong>coeficientes de caja fraccionarios</strong>. Cuando depositas 1.000 €, el banco solo custodia una reserva mínima (ej. 1%) y presta el restante, multiplicando la masa monetaria artificialmente mediante deuda.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                  <span className="text-xs font-black text-red-700 uppercase">Multiplicador Monetario</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Calcula cómo un depósito base se transforma en crédito acumulado en el sistema a través de sucesivas iteraciones de préstamo.
                  </p>
                </div>
                <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                  <span className="text-xs font-black text-gray-900 uppercase">Erosión de Poder Adquisitivo</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    La gráfica interactiva contrasta la rentabilidad nominal frente al rendimiento real ajustado por la inflación acumulada.
                  </p>
                </div>
                <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-2">
                  <span className="text-xs font-black text-gray-700 uppercase">Masa Monetaria (M1, M2, M3)</span>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Desglose de liquidez: desde el efectivo en circulación y depósitos a la vista hasta activos semilíquidos e instrumentos a plazo.
                  </p>
                </div>
              </div>
            </section>

            {/* 5. MERCADOS DE CAPITAL Y BOLSA */}
            <section id="man-bolsa" className="space-y-6">
              <div className="flex items-center gap-3">
                <Activity size={20} className="text-gray-900" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-900">Sección 02</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic">
                Bolsa, Retorno y <span className="text-red-700">Riesgo</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                Los mercados de capitales tradicionales proporcionan el mecanismo de fijación de precios para acciones corporativas y deuda soberana o corporativa:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-3">
                  <span className="text-xs font-black text-gray-900 uppercase tracking-wider block">Renta Fija (Bonos y Pagarés)</span>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Préstamo directo al emisor (Estado o empresa) a cambio de un cupón periódico. Su valor de mercado varía de forma inversa a los tipos de interés oficiales fijados por los Bancos Centrales.
                  </p>
                </div>
                <div className="p-6 bg-white border border-gray-200 rounded-2xl space-y-3">
                  <span className="text-xs font-black text-red-700 uppercase tracking-wider block">Renta Variable (Acciones y ETFs)</span>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Participación en el capital y los beneficios de una empresa cotizada. Mayor volatilidad y riesgo de mercado, con potencial de revalorización y dividendos a largo plazo.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. ARQUITECTURA DEFI Y EQUIVALENCIAS */}
            <section id="man-arch" className="space-y-6">
              <div className="flex items-center gap-3 text-red-700">
                <Cpu size={22} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em]">Sección 03</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                Arquitectura On-Chain y <span className="text-red-700">Equivalencias de Sistema</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                DeFi reconstruye cada engranaje del sistema financiero con protocolos autoejecutables sin custodia ni permisos:
              </p>

              <div className="space-y-2.5">
                {[
                  { trad: 'Banco Central', defi: 'Smart Contracts de Emisión Algorítmica', desc: 'Política monetaria inmutable gobernada por código matemático y halvings predecibles.' },
                  { trad: 'Banco Comercial (Préstamos)', defi: 'Protocolos de Lending Pools (Aave, Compound)', desc: 'Préstamos sobrecolateralizados sin análisis crediticio discrecional ni intermediación.' },
                  { trad: 'Bolsas de Valores / Market Makers', defi: 'Automated Market Makers (AMM / Uniswap)', desc: 'Fondos de liquidez autónomos con fórmula matemática x * y = k sin intermediarios.' },
                  { trad: 'Libreta de Ahorro / Depósito', defi: 'Liquid Staking & Yield Vaults (Lido, Yearn)', desc: 'Tokens líquidos que devengan recompensas del consenso proof-of-stake o arbitraje.' },
                  { trad: 'Cámaras de Compensación (Clearinghouse)', defi: 'Consenso Blockchain (L1 / L2 Rollups)', desc: 'Liquidación definitiva T+0 sin días de espera bancaria ni riesgo de contraparte.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="w-full sm:w-1/3">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">TradFi</span>
                      <span className="text-xs font-black text-gray-900 uppercase">{item.trad}</span>
                    </div>
                    <ArrowRight size={16} className="text-red-700 hidden sm:block shrink-0" />
                    <div className="w-full sm:w-1/2">
                      <span className="text-[10px] font-black text-red-700 uppercase tracking-widest block">DeFi On-Chain</span>
                      <span className="text-xs font-black text-gray-900 uppercase italic">{item.defi}</span>
                      <p className="text-[11px] text-gray-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. MATRIZ COMPARATIVA DETALLADA */}
            <section id="man-matrix" className="space-y-6">
              <div className="flex items-center gap-3">
                <ArrowRightLeft size={22} className="text-red-700" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-red-700">Nuevo Módulo Analítico</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                Matriz Comparativa: <span className="text-red-700">DeFi vs Mercado Fiat</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                Ubicada en la Sección 03, la Matriz Comparativa permite desglosar de forma interactiva el contraste entre ambos mundos mediante dos modos de exploración:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-gray-900 font-black text-xs uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-lg bg-red-700 text-white flex items-center justify-center text-[10px]">1</span>
                    <span>Dimensiones Estructurales</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Compara 7 vectores fundamentales de la arquitectura financiera:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4 font-medium">
                    <li>Emisión y Política Monetaria (Discrecional vs Algorítmica).</li>
                    <li>Custodia y Propiedad (Tercero legal vs Llaves privadas).</li>
                    <li>Ejecución de Transacciones (Burocracia vs Smart Contracts).</li>
                    <li>Liquidación y Finalidad (T+1/T+2 diferida vs T+0 atómica).</li>
                    <li>Gobernanza (Consejos directivos opacos vs DAO On-Chain).</li>
                    <li>Apalancamiento (Subjetivo/opaco vs Sobrecolateralizado auditable).</li>
                    <li>Transferencias Internacionales (SWIFT lento vs Redes globales).</li>
                  </ul>
                </div>

                <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-gray-900 font-black text-xs uppercase tracking-wider">
                    <span className="w-6 h-6 rounded-lg bg-gray-900 text-white flex items-center justify-center text-[10px]">2</span>
                    <span>Instrumentos Específicos</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Contraste uno a uno con casos cuantitativos reales, pros, contras y riesgos sistémicos:
                  </p>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4 font-medium">
                    <li>Bolsas de Valores (NYSE/BME) vs AMM DEX (Uniswap).</li>
                    <li>Depósitos Bancarios vs Stablecoins (USDC/USDT).</li>
                    <li>Crédito Bancario vs Lending Pools (Aave).</li>
                    <li>Renta Fija Soberana vs Liquid Staking (Lido stETH).</li>
                    <li>Pólizas de Seguro vs Protocolos de Cobertura (Nexus Mutual).</li>
                    <li>Gestoras de Fondos vs Asset Management Algorítmico (Yearn).</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 8. INSTRUMENTOS PROGRAMABLES Y EXPLORADOR */}
            <section id="man-inst" className="space-y-6">
              <div className="flex items-center gap-3">
                <Compass size={22} className="text-red-700" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-red-700">Sección 04</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                Explorador de <span className="text-red-700">Instrumentos DeFi</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                El explorador integra filtros por categoría y barra de búsqueda en tiempo real para examinar las herramientas que componen el ecosistema:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { cat: 'Stablecoins', desc: 'Monedas con paridad fíat respaldadas por reservas (USDC) o sobrecolateralizadas en cripto (DAI/USDS).' },
                  { cat: 'DEX / AMM', desc: 'Plataformas de intercambio de tokens sin orden libro centralizado mediante piscinas de liquidez.' },
                  { cat: 'Lending & Borrowing', desc: 'Mercados de crédito algorítmico donde los tipos de interés se ajustan automáticamente según la utilización.' },
                  { cat: 'Liquid Staking', desc: 'Derivados que permiten obtener rendimiento por asegurar la red mientras se conserva la liquidez para operar.' },
                  { cat: 'Yield Aggregators', desc: 'Bóvedas que rotan automáticamente el capital hacia las estrategias de mayor rendimiento neto.' },
                  { cat: 'Oráculos & Infraestructura', desc: 'Redes descentralizadas que proveen precios fiables y datos del mundo real a los contratos.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-white border border-gray-200 rounded-xl space-y-2 shadow-sm">
                    <span className="text-xs font-black uppercase tracking-wider text-red-700 block">{item.cat}</span>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. MODALES MULTI-MODO (5 VISTAS) */}
            <section id="man-modals" className="space-y-6">
              <div className="flex items-center gap-3">
                <FileText size={22} className="text-red-700" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-red-700">Interacción y Diagnóstico</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                Modales de Detalle con <span className="text-red-700">5 Modos de Vista</span>
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
                Al hacer clic en cualquier tarjeta de instrumento, protocolo o equivalencia, se abre una ficha analítica que puedes alternar en 5 perspectivas distintas:
              </p>

              <div className="space-y-3">
                {[
                  { mode: 'Vs Fiat (Comparativa)', icon: <ArrowRightLeft size={16} className="text-red-700" />, desc: 'Muestra en columnas paralelas el mecanismo Fiat tradicional frente al protocolo DeFi On-Chain, detallando la diferencia estructural crítica.' },
                  { mode: 'Análisis Técnico', icon: <Cpu size={16} className="text-gray-900" />, desc: 'Desglose exhaustivo de arquitectura, fórmulas de colateral, Smart Contracts, riesgos de código y gobernanza.' },
                  { mode: 'Lenguaje Sencillo (Neófito)', icon: <HelpCircle size={16} className="text-gray-700" />, desc: 'Analogías de la vida cotidiana y explicaciones libres de tecnicismos para comprender el valor práctico sin barreras conceptuales.' },
                  { mode: 'Investigación Profunda', icon: <BookOpen size={16} className="text-gray-700" />, desc: 'Historial de explotación de vulnerabilidades, auditorías de seguridad, casos de estudio y vectores de ataque mitigados.' },
                  { mode: 'Consultor IA Gemini', icon: <Sparkles size={16} className="text-red-700" />, desc: 'Consulta en tiempo real al modelo de Inteligencia Artificial para resolver cualquier duda concreta sobre el instrumento.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-start gap-4">
                    <div className="p-2 bg-white rounded-xl border border-gray-200 shadow-sm shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xs font-black uppercase text-gray-900 tracking-wide">{item.mode}</h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-black uppercase text-red-700 tracking-wider">Enlaces a Plataformas Oficiales</span>
                  <p className="text-xs text-gray-700">
                    Pulsa el icono de brújula (<Compass size={13} className="inline text-red-700 mx-0.5" />) en cualquier ficha para abrir directamente la documentación técnica, paneles analíticos (DefiLlama, Dune, Etherscan) y la dApp oficial del protocolo.
                  </p>
                </div>
              </div>
            </section>

            {/* 10. CONFIGURACIÓN GEMINI Y AJUSTES */}
            <section id="man-gemini" className="space-y-6">
              <div className="flex items-center gap-3 text-red-700">
                <Key size={22} className="animate-pulse" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em]">Motor de Inteligencia Artificial</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter">
                Configuración de <span className="text-red-700">Gemini API Key</span>
              </h2>
              
              <div className="bg-white border border-gray-200 p-6 md:p-8 rounded-3xl space-y-6 shadow-sm">
                <p className="text-gray-600 text-sm font-semibold">
                  Sigue estos pasos para habilitar las respuestas en tiempo real del consultor financiero en la aplicación:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { step: '01', title: 'Google AI Studio', desc: 'Accede a https://aistudio.google.com/ e inicia sesión con tu cuenta de Google.' },
                    { step: '02', title: 'Generar Clave', desc: 'Haz clic en "Get API key" en el panel izquierdo y selecciona "Create API key in new project".' },
                    { step: '03', title: 'Copiar API Key', desc: 'Copia la cadena alfanumérica que empieza por el prefijo "AIza...".' },
                    { step: '04', title: 'Vincular en Ajustes', desc: 'Abre el modal de Ajustes en la barra superior de la app, pega la clave y haz clic en Guardar.' }
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-start gap-3">
                      <span className="text-2xl font-black text-red-700 leading-none">{s.step}</span>
                      <div>
                        <h4 className="text-xs font-black uppercase text-gray-900 tracking-wider">{s.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
                  <a 
                    href="https://aistudio.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-black transition-all active:scale-95 shadow-md"
                  >
                    Obtener API Key en AI Studio <ExternalLink size={14} />
                  </a>
                  <span className="text-[11px] text-gray-400 font-semibold">
                    La clave se guarda de forma local en tu navegador con cifrado seguro.
                  </span>
                </div>
              </div>
            </section>

            {/* 11. GLOSARIO MAESTRO */}
            <section id="man-glosario" className="space-y-6 pb-20">
              <div className="flex items-center gap-3">
                <BookOpen size={20} className="text-red-700" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.35em] text-gray-400">Diccionario Estructural</h3>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic">
                Glosario de <span className="text-red-700">Términos Clave</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { term: 'Total Value Locked (TVL)', def: 'Valor total en dólares de todos los activos bloqueados en los Smart Contracts de un protocolo para proveer liquidez o staking.' },
                  { term: 'Annual Percentage Yield (APY)', def: 'Tasa de rendimiento anual que incorpora el efecto acumulativo del interés compuesto periódico sobre el capital inicial.' },
                  { term: 'Impermanent Loss', def: 'Diferencia de valor entre conservar tokens en la cartera frente a depositarlos en un fondo de liquidez sujeto a arbitraje.' },
                  { term: 'Loan-to-Value (LTV)', def: 'Porcentaje máximo de préstamo que un usuario puede extraer contra el valor total de la garantía aportada en colateral.' },
                  { term: 'Liquidación Forzosa', def: 'Venta automática del colateral por bots liquidadores cuando el valor del activo cae por debajo del umbral de salud fijado.' },
                  { term: 'Slippage (Deslizamiento)', def: 'Diferencia porcentual entre el precio esperado de una orden y el precio exacto al que se ejecuta en el bloque.' },
                  { term: 'MEV (Maximal Extractable Value)', def: 'Beneficio que validadores o bots de arbitraje pueden extraer reorganizando, incluyendo o retrasando transacciones en un bloque.' },
                  { term: 'Rollup de Capa 2 (L2)', def: 'Solución de escalabilidad (como Arbitrum u Optimism) que ejecuta transacciones fuera de la cadena principal y publica pruebas criptográficas en Ethereum.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-2xl space-y-1.5">
                    <div className="flex items-center gap-2">
                      <Terminal size={12} className="text-red-700 shrink-0" />
                      <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">{item.term}</h4>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed pl-5 border-l border-gray-200">{item.def}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* PIE DE ACCIÓN MÓVIL */}
        <div className="p-4 border-t border-gray-200 bg-white md:hidden">
          <button 
            onClick={onClose} 
            className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-xl"
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
        section { scroll-margin-top: 100px; }
      `}</style>
    </div>
  );
};

