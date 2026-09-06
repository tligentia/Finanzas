import React, { useState } from 'react';
import { 
  RefreshCw, TrendingUp, ShieldCheck, Layers, Landmark, 
  Cpu, Wallet, BarChart3, Activity, Globe, DollarSign, 
  CircleDollarSign, Gem, Coins, Zap, Share2, Scale, 
  Lock, ArrowRightLeft, Radio, Network, FileText, 
  ShieldAlert, Clock, CheckCircle2, AlertTriangle, Building2,
  Receipt, Landmark as BankIcon, Database, KeyRound, HelpCircle,
  ChevronRight, ExternalLink, Info, X, Compass, Copy, Check
} from 'lucide-react';
import { EXPANDED_ECOSYSTEM_INSTRUMENTS, EcosystemInstrument } from '../data/ecosystemData';
import { DirectLinksModal } from './DirectLinksModal';
import { getLinksFor, PlatformLinksResource } from '../data/directLinksData';

interface Props {
  onSelectInstrument?: (instrument: EcosystemInstrument) => void;
  onOpenDirectLinks?: (name: string) => void;
}

export const EcosystemInstrumentsExplorer: React.FC<Props> = ({ onSelectInstrument, onOpenDirectLinks }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalInstrument, setActiveModalInstrument] = useState<EcosystemInstrument | null>(null);
  const [viewMode, setViewMode] = useState<'simple' | 'technical' | 'extended' | 'diff'>('technical');
  const [directLinksResource, setDirectLinksResource] = useState<PlatformLinksResource | null>(null);
  const [isDirectLinksOpen, setIsDirectLinksOpen] = useState(false);

  const categories = ['Todos', 'DeFi Core', 'Derivados', 'Infraestructura', 'RWA', 'Regulación'];

  const filtered = selectedCategory === 'Todos'
    ? EXPANDED_ECOSYSTEM_INSTRUMENTS
    : EXPANDED_ECOSYSTEM_INSTRUMENTS.filter(i => i.category === selectedCategory);

  const handleOpen = (inst: EcosystemInstrument) => {
    setActiveModalInstrument(inst);
    if (onSelectInstrument) {
      onSelectInstrument(inst);
    }
  };

  const handleOpenLinks = (e: React.MouseEvent, name: string) => {
    e.stopPropagation();
    if (onOpenDirectLinks) {
      onOpenDirectLinks(name);
      return;
    }
    const res = getLinksFor(name);
    if (res) {
      setDirectLinksResource(res);
      setIsDirectLinksOpen(true);
    } else {
      setDirectLinksResource({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name: name,
        category: 'Instrumento',
        tag: 'DeFi Core',
        badge: 'Recursos Oficiales',
        officialSite: 'https://defillama.com',
        summary: `Enlaces verificados y documentación técnica para ${name}.`,
        links: [
          { label: 'DefiLlama Metrics & TVL', url: 'https://defillama.com', type: 'analytics', desc: 'Métricas agregadas del ecosistema.' },
          { label: 'Ethereum Developer Docs', url: 'https://ethereum.org/es/developers/docs/', type: 'docs', desc: 'Estándares y especificaciones Web3.' }
        ]
      });
      setIsDirectLinksOpen(true);
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
              selectedCategory === cat
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-gray-50 text-gray-400 hover:text-gray-900 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="text-[11px] text-gray-400 font-bold ml-auto hidden sm:block">
          {filtered.length} Elementos del Ecosistema
        </span>
      </div>

      {/* Instruments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((inst) => (
          <div
            key={inst.id}
            onClick={() => handleOpen(inst)}
            className="group bg-white border border-gray-100 rounded-[2rem] p-6 hover:border-red-700/40 hover:shadow-xl hover:shadow-gray-100 transition-all cursor-pointer flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-red-50 text-red-700 rounded-lg border border-red-100">
                  {inst.tag}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase text-gray-400">
                    {inst.category}
                  </span>
                  <button
                    onClick={(e) => handleOpenLinks(e, inst.name)}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-700 border border-gray-200 transition-all flex items-center gap-1 text-[9px] font-black uppercase"
                    title={`Opciones con URLs y links directos de ${inst.name}`}
                  >
                    <Compass size={12} className="text-red-700" />
                    <span>Links</span>
                  </button>
                </div>
              </div>

              <h5 className="text-xl font-black uppercase text-gray-900 group-hover:text-red-700 transition-colors">
                {inst.name}
              </h5>

              <p className="text-[12px] text-gray-500 font-semibold leading-relaxed mt-2 line-clamp-3">
                {inst.summary}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-gray-100">
              {/* Key Parameters preview */}
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                {inst.keyParameters.slice(0, 2).map((kp, idx) => (
                  <div key={idx} className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <span className="text-gray-400 font-bold block truncate">{kp.label}</span>
                    <span className="font-mono font-black text-gray-900 truncate block">{kp.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1 text-[11px] font-black uppercase text-red-700 group-hover:translate-x-1 transition-transform">
                  <span>Ver Arquitectura & Riesgos</span>
                  <ChevronRight size={16} />
                </div>
                <button
                  onClick={(e) => handleOpenLinks(e, inst.name)}
                  className="px-2.5 py-1 rounded-lg bg-gray-900 hover:bg-red-700 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 transition-colors shadow-sm"
                  title="Abrir opciones de enlaces directos"
                >
                  <Compass size={12} />
                  <span>Links</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Instrument Detail */}
      {activeModalInstrument && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 md:p-10 shadow-2xl space-y-6 relative">
            {/* Close button */}
            <button
              onClick={() => setActiveModalInstrument(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-700 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-red-100">
                  {activeModalInstrument.tag}
                </span>
                <span className="text-[11px] font-black uppercase text-gray-400">
                  {activeModalInstrument.category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tight text-gray-900">
                {activeModalInstrument.name}
              </h3>
            </div>

            {/* View Mode Selector (Simple / Técnico / Extendido / Diferencia vs Fiat) */}
            <div className="flex flex-wrap bg-gray-50 p-1 rounded-2xl border border-gray-200 gap-1">
              <button
                onClick={() => setViewMode('simple')}
                className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                  viewMode === 'simple' 
                    ? 'bg-red-700 text-white shadow-md' 
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                Sencilla
              </button>
              <button
                onClick={() => setViewMode('technical')}
                className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                  viewMode === 'technical' 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                Técnica
              </button>
              <button
                onClick={() => setViewMode('extended')}
                className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
                  viewMode === 'extended' 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                Extendido
              </button>
              <button
                onClick={() => setViewMode('diff')}
                className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                  viewMode === 'diff' 
                    ? 'bg-red-700 text-white shadow-md' 
                    : 'text-gray-500 hover:text-red-700 hover:bg-red-50'
                }`}
              >
                <ArrowRightLeft size={13} />
                <span>Vs Mercado Fiat</span>
              </button>
            </div>

            {/* Description Text */}
            {viewMode === 'diff' ? (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider block">Mecanismo Tradicional / Fiat</span>
                    <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                      {activeModalInstrument.fiatVsDefi?.fiatTrad || 
                        `En el sistema Fiat tradicional, la función de ${activeModalInstrument.name.toLowerCase()} depende de intermediarios financieros centralizados (bancos, depositarios, brokers y cámaras de compensación) con liquidación diferida T+1/T+2 y riesgo de contraparte.`}
                    </p>
                  </div>
                  <div className="p-5 bg-red-50/40 rounded-2xl border border-red-100 space-y-2">
                    <span className="text-[10px] font-black uppercase text-red-700 tracking-wider block">Mecanismo DeFi On-Chain</span>
                    <p className="text-xs text-gray-900 leading-relaxed font-bold">
                      {activeModalInstrument.fiatVsDefi?.defiOnChain || 
                        `En DeFi, se ejecuta mediante contratos inteligentes autoejecutables en la blockchain, garantizando custodia propia (Self-Custody), liquidación atómica instantánea (T+0) y ausencia de intermediarios burocráticos.`}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-white border-2 border-red-700/20 rounded-2xl flex items-start gap-3 shadow-sm">
                  <Scale size={18} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-black uppercase text-red-700 tracking-wider block">Diferencia Sistémica Clave</span>
                    <p className="text-xs text-gray-800 font-bold leading-relaxed">
                      {activeModalInstrument.fiatVsDefi?.coreDifference || 
                        `Sustitución de la intermediación con riesgo de contraparte y horarios cerrados por certeza matemática, transparencia de código auditable y disponibilidad continua 24/7.`}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-gray-50/70 rounded-2xl border border-gray-100 text-[13px] text-gray-700 font-semibold leading-relaxed">
                {viewMode === 'simple' && activeModalInstrument.simple}
                {viewMode === 'technical' && activeModalInstrument.technical}
                {viewMode === 'extended' && activeModalInstrument.extended}
              </div>
            )}

            {/* Key Parameters */}
            <div>
              <h6 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">
                Parámetros Críticos de Configuración
              </h6>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {activeModalInstrument.keyParameters.map((kp, idx) => (
                  <div key={idx} className="p-3 bg-white border border-gray-200 rounded-xl">
                    <span className="text-[9px] font-black uppercase text-gray-400 block">{kp.label}</span>
                    <span className="font-mono text-xs font-black text-gray-900 block mt-0.5">{kp.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risks */}
            <div>
              <h6 className="text-[11px] font-black uppercase tracking-wider text-red-700 mb-3 flex items-center gap-1.5">
                <AlertTriangle size={14} /> Factores de Riesgo Estructural
              </h6>
              <div className="space-y-2">
                {activeModalInstrument.risks.map((risk, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[12px] text-gray-600 font-semibold">
                    <span className="text-red-700 font-black">›</span>
                    <span>{risk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Links and Official URLs Action */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-red-50 text-red-700 border border-red-100">
                  <Compass size={18} />
                </div>
                <div>
                  <h6 className="text-xs font-black uppercase tracking-tight text-gray-900">
                    URLs y Opciones de Enlaces Directos
                  </h6>
                  <p className="text-[11px] text-gray-500 font-semibold">
                    DApps Web3 verificadas, exploradores, métricas y documentación oficial
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => handleOpenLinks(e, activeModalInstrument.name)}
                className="w-full sm:w-auto px-4 py-2.5 bg-gray-900 hover:bg-red-700 text-white rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Compass size={14} />
                <span>Ver Enlaces Directos</span>
              </button>
            </div>

            {/* Evidence Required for Audit / Taxes */}
            <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-900 flex items-center gap-1.5">
                <FileText size={14} className="text-red-700" /> Trazabilidad y Evidencia Documental Requerida
              </span>
              <ul className="space-y-1 text-[11px] text-gray-500 font-semibold">
                {activeModalInstrument.evidenceRequired.map((ev, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span>
                    <span>{ev}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Direct Links Options Modal */}
      <DirectLinksModal 
        resource={directLinksResource} 
        isOpen={isDirectLinksOpen} 
        onClose={() => setIsDirectLinksOpen(false)} 
      />
    </div>
  );
};
