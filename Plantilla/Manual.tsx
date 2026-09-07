import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  X, HelpCircle, ShieldCheck, Cpu, Database, ChevronRight, Menu, Layout, 
  Key, Lock, ArrowRight, TrendingUp, BarChart3, Globe, Layers, 
  Activity, Search, Shield, BookOpen, Terminal, ExternalLink, 
  Keyboard, ArrowRightLeft, Compass, Sparkles, CheckCircle2, AlertTriangle,
  FileText, RefreshCw, Network, Coins, Scale, CheckSquare, Square, Printer, BookMarked
} from 'lucide-react';
import { APP_VERSION } from './Version';
import { 
  MANUAL_META, MANUAL_PARTS, PRELIMINARES_CONTENT,
  ALL_CHAPTERS, ALL_ANNEXES, getChaptersByPart
} from '../src/manual/manualMaster';

interface ManualProps {
  isOpen: boolean;
  onClose: () => void;
  initialTarget?: string;
}

export const Manual: React.FC<ManualProps> = ({ isOpen, onClose, initialTarget }) => {
  const [selectedPart, setSelectedPart] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<string>(initialTarget || 'preliminares');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [checkedChecklistItems, setCheckedChecklistItems] = useState<Record<string, boolean>>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Toggle checklist item
  const toggleChecklist = (id: string) => {
    setCheckedChecklistItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Scroll detection
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollTop = container.scrollTop;
    const threshold = 160;

    // Check preliminares
    const elemPrelim = document.getElementById('sec-preliminares');
    if (elemPrelim && scrollTop < (elemPrelim.offsetTop + elemPrelim.offsetHeight - threshold)) {
      setActiveItem('preliminares');
      return;
    }

    // Check chapters
    for (const chap of ALL_CHAPTERS) {
      const element = document.getElementById(chap.id);
      if (element) {
        const offsetTop = element.offsetTop - threshold;
        if (scrollTop >= offsetTop && scrollTop < offsetTop + element.offsetHeight) {
          setActiveItem(chap.id);
          return;
        }
      }
    }

    // Check annexes
    for (const annex of ALL_ANNEXES) {
      const element = document.getElementById(annex.id);
      if (element) {
        const offsetTop = element.offsetTop - threshold;
        if (scrollTop >= offsetTop && scrollTop < offsetTop + element.offsetHeight) {
          setActiveItem(annex.id);
          return;
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

  useEffect(() => {
    if (isOpen && initialTarget) {
      setTimeout(() => {
        scrollToItem(initialTarget);
      }, 100);
    }
  }, [isOpen, initialTarget]);

  const scrollToItem = (id: string) => {
    const targetElement = document.getElementById(id);
    if (targetElement && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: targetElement.offsetTop - 20,
        behavior: 'smooth'
      });
      setActiveItem(id);
      if (window.innerWidth < 768) setIsSidebarOpen(false);
    }
  };

  // Filter items by search and part
  const filteredChapters = ALL_CHAPTERS.filter(c => {
    const matchesPart = selectedPart === 'all' || c.partId === selectedPart;
    const matchesSearch = !searchTerm || 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPart && matchesSearch;
  });

  const filteredAnnexes = ALL_ANNEXES.filter(a => {
    const matchesPart = selectedPart === 'all' || selectedPart === 'parte-6';
    const matchesSearch = !searchTerm || 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPart && matchesSearch;
  });

  if (!isOpen) return null;

  // Simple parser to render table / text / code / blockquote cleanly
  const renderMarkdownContent = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];
    let inCode = false;
    let codeBlock: string[] = [];

    const flushTable = (key: string) => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const body = tableRows.slice(1);
        elements.push(
          <div key={`table-${key}`} className="overflow-x-auto my-4 rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-100 text-gray-900 uppercase font-black tracking-wider border-b border-gray-200">
                <tr>
                  {header.map((col, idx) => (
                    <th key={idx} className="p-3 whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {body.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-gray-50/80 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-3 text-gray-700 leading-relaxed font-medium">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    const flushCode = (key: string) => {
      if (codeBlock.length > 0) {
        elements.push(
          <pre key={`code-${key}`} className="p-4 my-3 bg-gray-900 text-gray-100 font-mono text-[11px] rounded-2xl overflow-x-auto border border-gray-800 leading-relaxed">
            <code>{codeBlock.join('\n')}</code>
          </pre>
        );
        codeBlock = [];
        inCode = false;
      }
    };

    lines.forEach((line, index) => {
      // Code block toggles
      if (line.trim().startsWith('```')) {
        if (inCode) {
          flushCode(`${index}`);
        } else {
          inCode = true;
        }
        return;
      }

      if (inCode) {
        codeBlock.push(line);
        return;
      }

      // Tables
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        const cells = line.split('|').slice(1, -1).map(c => c.trim().replace(/\*\*/g, ''));
        // Ignore separator line like |---|---|
        if (cells.every(c => /^[-:]+$/.test(c))) {
          return;
        }
        inTable = true;
        tableRows.push(cells);
        return;
      } else if (inTable) {
        flushTable(`${index}`);
      }

      // Headings
      if (line.startsWith('### ')) {
        elements.push(
          <h4 key={index} className="text-lg font-black text-gray-900 tracking-tight mt-6 mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-700"></span>
            {line.replace('### ', '')}
          </h4>
        );
        return;
      }
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={index} className="text-xl font-black text-gray-900 uppercase tracking-tighter mt-8 mb-3 pb-2 border-b border-gray-200">
            {line.replace('## ', '')}
          </h3>
        );
        return;
      }

      // Blockquotes
      if (line.startsWith('> ')) {
        elements.push(
          <div key={index} className="p-4 my-4 bg-red-50/60 border-l-4 border-red-700 rounded-r-2xl text-xs md:text-sm text-gray-800 font-semibold leading-relaxed">
            {line.replace('> ', '')}
          </div>
        );
        return;
      }

      // Horizontal rules
      if (line.trim() === '---') {
        elements.push(<hr key={index} className="my-6 border-gray-200" />);
        return;
      }

      // Lists
      if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
        const itemText = line.trim().substring(2);
        elements.push(
          <li key={index} className="ml-5 list-disc text-xs md:text-sm text-gray-700 leading-relaxed font-medium mb-1">
            {itemText}
          </li>
        );
        return;
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line.trim())) {
        elements.push(
          <div key={index} className="ml-2 text-xs md:text-sm text-gray-700 leading-relaxed font-medium mb-1 flex items-start gap-2">
            <span className="font-bold text-red-700">{line.trim().match(/^\d+\./)?.[0]}</span>
            <span>{line.trim().replace(/^\d+\.\s*/, '')}</span>
          </div>
        );
        return;
      }

      // Regular paragraph
      if (line.trim().length > 0) {
        elements.push(
          <p key={index} className="text-xs md:text-sm text-gray-700 leading-relaxed mb-3 font-normal">
            {line}
          </p>
        );
      }
    });

    if (inTable) flushTable('end');
    if (inCode) flushCode('end');

    return elements;
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 md:p-3 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full h-full md:h-[94vh] md:max-w-7xl md:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-gray-200 animate-in zoom-in-95 duration-300">
        
        {/* HEADER DEL MANUAL */}
        <div className="p-4 md:p-5 border-b border-gray-200 flex justify-between items-center bg-white shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="p-2 md:hidden hover:bg-gray-100 rounded-xl text-gray-900 transition-colors"
              aria-label="Abrir índice del manual"
            >
              <Menu size={24} />
            </button>
            <div className="p-3 bg-red-700 rounded-2xl text-white shadow-xl shadow-red-700/20">
              <BookOpen size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-gray-900 uppercase tracking-tighter text-lg md:text-2xl leading-none">
                  Manual del Ecosistema Cripto, Stablecoins y DeFi
                </h3>
                <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                  v{MANUAL_META.version} (Cierre: {MANUAL_META.closingDate})
                </span>
                <span className="bg-gray-100 text-gray-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                  App v{APP_VERSION}
                </span>
              </div>
              <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-[0.2em] mt-1">
                Conocimiento operativo, trazabilidad y cumplimiento para España y la UE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => window.print()} 
              className="hidden sm:flex items-center gap-1.5 p-2.5 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-xl text-xs font-bold transition-all border border-gray-200"
              title="Imprimir o guardar como PDF"
            >
              <Printer size={16} />
              <span className="hidden lg:inline">Imprimir / PDF</span>
            </button>
            <button 
              onClick={onClose} 
              className="p-3 hover:bg-gray-100 rounded-full text-gray-400 hover:text-red-700 transition-all active:scale-90"
              title="Cerrar manual (Esc)"
            >
              <X size={26} />
            </button>
          </div>
        </div>

        {/* BARRA SUPERIOR DE FILTRO POR PARTES */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 md:px-6 py-2.5 flex items-center gap-2 overflow-x-auto custom-scrollbar shrink-0 text-xs">
          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 shrink-0 mr-1">Partes:</span>
          <button
            onClick={() => setSelectedPart('all')}
            className={`px-3 py-1.5 rounded-xl font-black uppercase text-[10px] tracking-wider shrink-0 transition-all ${
              selectedPart === 'all' 
                ? 'bg-red-700 text-white shadow-sm' 
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            Todas (20 Capítulos + 5 Anexos)
          </button>
          {MANUAL_PARTS.map(part => (
            <button
              key={part.id}
              onClick={() => setSelectedPart(part.id)}
              className={`px-3 py-1.5 rounded-xl font-bold text-[10px] tracking-wider shrink-0 transition-all flex items-center gap-1.5 ${
                selectedPart === part.id 
                  ? 'bg-red-700 text-white shadow-sm font-black' 
                  : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="font-mono font-black">{part.roman}.</span>
              <span>{part.title}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 flex overflow-hidden relative">
          
          {/* NAVEGACIÓN LATERAL / ÍNDICE */}
          <aside className={`absolute md:relative z-20 w-80 lg:w-96 h-full bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            {/* Buscador en todo el manual */}
            <div className="p-3 border-b border-gray-100">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text"
                  placeholder="Buscar en los 20 capítulos y 5 anexos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-red-700"
                />
              </div>
            </div>

            {/* Lista del índice */}
            <div className="p-3 space-y-1 overflow-y-auto custom-scrollbar flex-1">
              
              {/* Preliminares */}
              <button
                onClick={() => scrollToItem('sec-preliminares')}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left ${
                  activeItem === 'preliminares' 
                    ? 'bg-red-50 text-red-700 border border-red-200 font-black shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-50 font-semibold'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <ShieldCheck size={16} className={activeItem === 'preliminares' ? 'text-red-700' : 'text-gray-400'} />
                  <span className="text-xs uppercase tracking-tight truncate">Preliminares & Alcance</span>
                </div>
                {activeItem === 'preliminares' && <ChevronRight size={14} className="text-red-700" />}
              </button>

              {/* Capítulos agrupados por parte */}
              {MANUAL_PARTS.filter(p => p.id !== 'parte-6').map(part => {
                const chaptersOfPart = filteredChapters.filter(c => c.partId === part.id);
                if (chaptersOfPart.length === 0) return null;

                return (
                  <div key={part.id} className="pt-3">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2 pb-1">
                      Parte {part.roman} — {part.title}
                    </p>
                    {chaptersOfPart.map(chap => (
                      <button
                        key={chap.id}
                        onClick={() => scrollToItem(chap.id)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left my-0.5 group ${
                          activeItem === chap.id 
                            ? 'bg-red-50 text-red-700 border border-red-200 font-black shadow-sm' 
                            : 'text-gray-700 hover:bg-gray-50 font-medium'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 shrink-0">
                            {chap.number}
                          </span>
                          <span className="text-xs tracking-tight truncate">{chap.title}</span>
                        </div>
                        {activeItem === chap.id && <ChevronRight size={14} className="text-red-700 shrink-0" />}
                      </button>
                    ))}
                  </div>
                );
              })}

              {/* Anexos */}
              {filteredAnnexes.length > 0 && (
                <div className="pt-4 border-t border-gray-100 mt-3">
                  <p className="text-[10px] font-black text-red-700 uppercase tracking-widest px-2 pb-1">
                    Parte VI — Anexos Maestros
                  </p>
                  {filteredAnnexes.map(annex => (
                    <button
                      key={annex.id}
                      onClick={() => scrollToItem(annex.id)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left my-0.5 group ${
                        activeItem === annex.id 
                          ? 'bg-red-50 text-red-700 border border-red-200 font-black shadow-sm' 
                          : 'text-gray-700 hover:bg-gray-50 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-red-100 text-red-800 shrink-0">
                          {annex.letter}
                        </span>
                        <span className="text-xs tracking-tight truncate">{annex.title}</span>
                      </div>
                      {activeItem === annex.id && <ChevronRight size={14} className="text-red-700 shrink-0" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Atajos de acceso / Teclado */}
            <div className="p-3 bg-gray-50 border-t border-gray-200 space-y-1">
              <div className="flex items-center justify-between text-[10px] font-black text-gray-500 uppercase tracking-wider">
                <span>Acceso Rápido</span>
                <Keyboard size={12} className="text-red-700" />
              </div>
              <p className="text-[10px] text-gray-500">
                PIN teclado: <kbd className="px-1 py-0.2 bg-white border border-gray-300 rounded font-mono text-[9px]">7887</kbd> o <kbd className="px-1 py-0.2 bg-white border border-gray-300 rounded font-mono text-[9px]">STAR</kbd>
              </p>
            </div>
          </aside>

          {/* CONTENIDO PRINCIPAL DEL MANUAL */}
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-5 md:p-10 space-y-16 custom-scrollbar scroll-smooth bg-white">
            
            {/* SECCIÓN PRELIMINARES */}
            <section id="sec-preliminares" className="space-y-6 pb-6 border-b border-gray-200">
              <div className="space-y-3">
                <span className="inline-block bg-red-700 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                  Documento Oficial v1.0
                </span>
                <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter leading-tight">
                  Manual del ecosistema cripto, stablecoins y DeFi
                </h1>
                <p className="text-base md:text-lg font-bold text-gray-700">
                  {MANUAL_META.subtitle}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-medium pt-1">
                  <span className="bg-gray-100 px-3 py-1 rounded-lg"><strong>Cierre:</strong> {MANUAL_META.closingDate}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg"><strong>Marco:</strong> Unión Europea y España</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-lg"><strong>Ámbito:</strong> Formativo y documental</span>
                </div>
              </div>

              {/* Aviso de alcance y limitaciones */}
              <div className="p-6 bg-red-50/70 border-l-4 border-red-700 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-red-800 font-black text-xs uppercase tracking-wider">
                  <AlertTriangle size={18} />
                  <span>Aviso de alcance y limitaciones</span>
                </div>
                <p className="text-xs md:text-sm text-gray-800 leading-relaxed font-semibold">
                  Este manual <strong>no constituye recomendación de inversión</strong>, asesoramiento jurídico, fiscal ni contable, ni instrucciones de custodia de claves. Su objeto es describir el ecosistema, sus componentes, sus riesgos y los registros que una persona o entidad debe conservar para poder explicar, auditar y declarar su actividad.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs text-gray-700">
                  <div className="p-3 bg-white rounded-xl border border-red-200">
                    <span className="font-black text-red-700 block mb-1">1. Hechos Concretos</span>
                    La calificación jurídica y fiscal depende de hechos concretos de cada persona o entidad. Ningún capítulo sustituye a un profesional colegiado.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-red-200">
                    <span className="font-black text-red-700 block mb-1">2. Caducidad Rápida</span>
                    Parámetros, smart contracts y normas caducan rápido. Todo dato fechado lleva marca temporal explícita verificada.
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-red-200">
                    <span className="font-black text-red-700 block mb-1">3. Rigor Documental</span>
                    Lo no verificado se marca expresamente como no verificado. No se rellenan huecos con conjeturas.
                  </div>
                </div>
              </div>

              {/* Cómo usar este manual */}
              <div className="space-y-4 pt-2">
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                  <BookMarked size={20} className="text-red-700" />
                  Estructura en 6 Partes y Pregunta que Responde Cada Una
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-200">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-100 text-gray-900 uppercase font-black tracking-wider border-b border-gray-200">
                      <tr>
                        <th className="p-3">Parte</th>
                        <th className="p-3">Capítulos</th>
                        <th className="p-3">Pregunta que responde</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white font-medium">
                      {MANUAL_PARTS.map(p => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                          <td className="p-3 font-black text-red-700">{p.roman}. {p.title}</td>
                          <td className="p-3 font-mono font-bold text-gray-700">
                            {p.id === 'parte-1' ? '1–4' : p.id === 'parte-2' ? '5–8' : p.id === 'parte-3' ? '9–14' : p.id === 'parte-4' ? '15–16' : p.id === 'parte-5' ? '17–20' : 'A–E'}
                          </td>
                          <td className="p-3 text-gray-800 font-bold">{p.question}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* RENDERIZADO DE CAPÍTULOS */}
            {filteredChapters.map((chapter) => (
              <section 
                key={chapter.id} 
                id={chapter.id} 
                className="space-y-5 pt-4 scroll-mt-24 border-b border-gray-100 pb-14"
              >
                {/* Cabecera del capítulo */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-red-700 text-white font-mono font-black text-xs">
                      Capítulo {chapter.number}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      {chapter.partTitle}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                    {chapter.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
                    {chapter.summary}
                  </p>
                </div>

                {/* Conclusión clave */}
                {chapter.keyTakeaway && (
                  <div className="p-4 bg-gray-50 border-l-4 border-gray-900 rounded-r-xl text-xs md:text-sm text-gray-800 font-semibold leading-relaxed">
                    <span className="text-red-700 font-black uppercase block text-[10px] tracking-wider mb-1">
                      Conclusión Operativa Clave
                    </span>
                    "{chapter.keyTakeaway}"
                  </div>
                )}

                {/* Contenido principal del capítulo */}
                <div className="space-y-3 pt-2">
                  {renderMarkdownContent(chapter.content)}
                </div>

                {/* Campos a registrar si aplica */}
                {chapter.fieldsToRegister && chapter.fieldsToRegister.length > 0 && (
                  <div className="mt-6 p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-3">
                    <span className="text-xs font-black text-gray-900 uppercase tracking-wider flex items-center gap-2">
                      <Database size={14} className="text-red-700" />
                      Campos Mínimos a Registrar (Cadena de Evidencia)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {chapter.fieldsToRegister.map((f, i) => (
                        <div key={i} className="p-2.5 bg-white rounded-xl border border-gray-200">
                          <code className="text-red-700 font-mono font-black text-[11px] block">{f.field}</code>
                          <span className="text-gray-600 text-[11px] mt-0.5 block">{f.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}

            {/* RENDERIZADO DE ANEXOS */}
            {filteredAnnexes.map((annex) => (
              <section 
                key={annex.id} 
                id={annex.id} 
                className="space-y-5 pt-4 scroll-mt-24 border-b border-gray-200 pb-14"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-gray-900 text-white font-mono font-black text-xs">
                      Anexo {annex.letter}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-red-700">
                      Documento Complementario Maestro
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                    {annex.title}
                  </h2>
                  <p className="text-xs md:text-sm text-gray-600 font-medium leading-relaxed">
                    {annex.summary}
                  </p>
                </div>

                {/* Contenido del anexo */}
                <div className="space-y-3 pt-2">
                  {renderMarkdownContent(annex.content)}
                </div>
              </section>
            ))}

            {/* SECCIÓN OPERATIVA ADICIONAL: SEGURIDAD DEL SISTEMA Y PIN */}
            <section id="sec-app-security" className="p-6 bg-gray-50 border border-gray-200 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-gray-900 font-black text-xs uppercase tracking-wider">
                <Key size={16} className="text-red-700" />
                <span>Control de Acceso Operativo de la Aplicación</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                El acceso a las funciones avanzadas de la plataforma está protegido por PIN con soporte para teclado físico (<kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded font-mono text-[10px]">0-9</kbd>, <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded font-mono text-[10px]">A-Z</kbd>, <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded font-mono text-[10px]">Backspace</kbd>, <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded font-mono text-[10px]">Esc</kbd>).
              </p>
              <div className="flex items-center gap-4 text-xs">
                <div className="p-2.5 bg-white border border-gray-200 rounded-xl">
                  <span className="text-gray-500 font-bold block text-[10px]">PIN Numérico:</span>
                  <span className="font-mono font-black text-red-700 text-sm">7887</span>
                </div>
                <div className="p-2.5 bg-white border border-gray-200 rounded-xl">
                  <span className="text-gray-500 font-bold block text-[10px]">Código Alfanumérico:</span>
                  <span className="font-mono font-black text-gray-900 text-sm">STAR</span>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* PIE DE ACCIÓN MÓVIL */}
        <div className="p-4 border-t border-gray-200 bg-white md:hidden shrink-0">
          <button 
            onClick={onClose} 
            className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all active:scale-95 shadow-xl"
          >
            Cerrar Manual
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
        section { scroll-margin-top: 20px; }
      `}</style>
    </div>
  );
};
