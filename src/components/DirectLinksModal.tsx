import React, { useState } from 'react';
import { 
  X, ExternalLink, Copy, Check, Globe, FileCode2, BarChart2, 
  ShieldCheck, Landmark, GitBranch, Terminal, Compass, 
  Search, AlertCircle, Sparkles, BookOpen, Layers
} from 'lucide-react';
import { PlatformLinksResource, DirectLinkItem } from '../data/directLinksData';

interface Props {
  resource: PlatformLinksResource | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DirectLinksModal: React.FC<Props> = ({ resource, isOpen, onClose }) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('todos');

  if (!isOpen || !resource) return null;

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => {
      setCopiedUrl(null);
    }, 2000);
  };

  const getTypeIcon = (type: DirectLinkItem['type']) => {
    switch (type) {
      case 'dapp':
        return <Terminal size={16} className="text-red-700" />;
      case 'docs':
        return <BookOpen size={16} className="text-gray-900" />;
      case 'analytics':
        return <BarChart2 size={16} className="text-red-700" />;
      case 'github':
        return <GitBranch size={16} className="text-gray-900" />;
      case 'governance':
        return <Landmark size={16} className="text-red-700" />;
      case 'explorer':
        return <Compass size={16} className="text-gray-900" />;
      case 'regulation':
        return <ShieldCheck size={16} className="text-red-700" />;
      default:
        return <Globe size={16} className="text-gray-900" />;
    }
  };

  const getTypeBadge = (type: DirectLinkItem['type']) => {
    switch (type) {
      case 'dapp':
        return <span className="bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">DApp Web3</span>;
      case 'docs':
        return <span className="bg-gray-100 text-gray-800 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Documentación</span>;
      case 'analytics':
        return <span className="bg-gray-900 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Analíticas</span>;
      case 'github':
        return <span className="bg-gray-100 text-gray-800 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">GitHub / Código</span>;
      case 'governance':
        return <span className="bg-red-100 text-red-800 border border-red-200 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Gobernanza</span>;
      case 'explorer':
        return <span className="bg-gray-100 text-gray-800 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Explorador</span>;
      case 'regulation':
        return <span className="bg-red-700 text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Marco Legal</span>;
      default:
        return <span className="bg-gray-50 text-gray-700 border border-gray-200 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">Web Oficial</span>;
    }
  };

  const filteredLinks = resource.links.filter(link => {
    const matchesSearch = link.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          link.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          link.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'todos' || link.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white border-2 border-gray-200 rounded-[2.5rem] w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative"
        role="dialog"
        aria-labelledby="direct-links-modal-title"
      >
        {/* Top Header */}
        <div className="p-6 md:p-8 pb-5 border-b border-gray-100 bg-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-700 transition-colors border border-gray-200"
            title="Cerrar opciones"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <span className="px-3 py-1 bg-red-50 text-red-700 rounded-lg text-[10px] font-black uppercase tracking-wider border border-red-200">
              {resource.category}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-lg text-[10px] font-black uppercase tracking-wider border border-gray-200">
              {resource.badge}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-bold text-gray-500 ml-auto mr-12 hidden sm:flex">
              <ShieldCheck size={15} className="text-red-700" />
              <span>Verificado</span>
            </div>
          </div>

          <h3 id="direct-links-modal-title" className="text-2xl md:text-3xl font-black uppercase text-gray-900 tracking-tight italic">
            {resource.name}
          </h3>

          <p className="text-xs md:text-sm text-gray-600 font-semibold leading-relaxed mt-2 max-w-2xl">
            {resource.summary}
          </p>

          {/* Quick Access to Main Official Site */}
          {resource.officialSite && (
            <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Globe size={15} className="text-red-700" />
                <span className="text-[11px] font-black uppercase tracking-wider text-gray-700">Sitio Principal:</span>
                <a 
                  href={resource.officialSite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-red-700 font-bold hover:underline inline-flex items-center gap-1"
                >
                  {resource.officialSite}
                  <ExternalLink size={12} />
                </a>
              </div>
              <button
                onClick={() => handleCopy(resource.officialSite)}
                className="text-[11px] font-black uppercase tracking-wider text-gray-500 hover:text-gray-900 inline-flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200"
              >
                {copiedUrl === resource.officialSite ? (
                  <>
                    <Check size={12} className="text-red-700" />
                    <span className="text-red-700 font-bold">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copiar URL</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        <div className="px-6 md:px-8 py-3 bg-gray-50/70 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en enlaces..."
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-red-700"
            />
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['todos', 'dapp', 'docs', 'analytics', 'github', 'governance'].map((filterKey) => (
              <button
                key={filterKey}
                onClick={() => setActiveFilter(filterKey)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex-shrink-0 ${
                  activeFilter === filterKey
                    ? 'bg-gray-900 text-white'
                    : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200'
                }`}
              >
                {filterKey === 'todos' ? 'Todos' : filterKey}
              </button>
            ))}
          </div>
        </div>

        {/* Links Options List */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-3.5 flex-1 custom-scrollbar">
          <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-gray-500 mb-2">
            <span>Opciones de Acceso Directo ({filteredLinks.length})</span>
            <span className="text-[11px] text-gray-400 font-bold">1-Click para Abrir o Copiar</span>
          </div>

          {filteredLinks.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <AlertCircle size={28} className="mx-auto text-gray-400 mb-2" />
              <p className="text-xs font-bold uppercase text-gray-600">No se encontraron enlaces con el filtro actual</p>
            </div>
          ) : (
            filteredLinks.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white border-2 border-gray-100 hover:border-red-700/40 rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md transition-all group flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="p-1.5 rounded-lg bg-gray-50 border border-gray-200">
                      {getTypeIcon(item.type)}
                    </span>
                    <h4 className="text-sm md:text-base font-black uppercase tracking-tight text-gray-900 group-hover:text-red-700 transition-colors">
                      {item.label}
                    </h4>
                    {getTypeBadge(item.type)}
                  </div>

                  <p className="text-xs text-gray-600 font-semibold leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="pt-1">
                    <span className="font-mono text-[11px] font-bold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md inline-block max-w-full truncate">
                      {item.url}
                    </span>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <button
                    onClick={() => handleCopy(item.url)}
                    className="flex-1 md:flex-none px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700 hover:text-gray-900 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95"
                    title="Copiar URL al portapapeles"
                  >
                    {copiedUrl === item.url ? (
                      <>
                        <Check size={14} className="text-red-700" />
                        <span className="text-red-700 font-black">Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 group/link"
                  >
                    <span>Abrir</span>
                    <ExternalLink size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Security Notice */}
        <div className="p-4 px-6 md:px-8 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-500 font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-red-700" />
            <span>Todos los enlaces apuntan a dominios oficiales verificados</span>
          </div>
          <span className="font-mono text-gray-400">Verificado en DeFi Master Thesis</span>
        </div>
      </div>
    </div>
  );
};
