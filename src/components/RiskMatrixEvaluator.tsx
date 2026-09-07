import React, { useState, useMemo } from 'react';
import { 
  ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2, 
  HelpCircle, Zap, Lock, KeyRound, Radio, RefreshCw,
  Star 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { RISK_DIMENSIONS_DATA, REGULATORY_CHECKLIST } from '../data/ecosystemData';
import { useFavorites } from '../hooks/useFavorites';

export const RiskMatrixEvaluator: React.FC = () => {
  const { isFavorite, toggleFavorite, sortWithFavoritesFirst } = useFavorites();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c4: false,
    c5: true
  });

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = REGULATORY_CHECKLIST.length;
  const hygieneScore = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100/50 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-700">Evaluador de Seguridad Integral</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-gray-900">
            Matriz de Riesgo en 8 Dimensiones & Higiene Operativa
          </h4>
          <p className="text-[12px] text-gray-500 font-bold uppercase tracking-tight mt-1">
            Gestión de aprobaciones ilimitadas, firma ciega, riesgos de contraparte y controles clave
          </p>
        </div>

        {/* Hygiene Score Badge */}
        <div className="flex items-center gap-3 bg-gray-50 px-5 py-3 rounded-2xl border border-gray-200">
          <div>
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block">Índice de Higiene</span>
            <span className="text-xl font-black font-mono text-gray-900">{hygieneScore}%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-black text-xs font-mono">
            {completedCount}/{totalCount}
          </div>
        </div>
      </div>

      {/* 8 Dimensions Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dimensions List */}
        <div className="space-y-3">
          <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-2">
            Las 8 Dimensiones de Riesgo Estructural (Capítulo 15 del Manual)
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sortWithFavoritesFirst(RISK_DIMENSIONS_DATA, dim => dim.dimension).map((dim) => (
              <div 
                key={dim.dimension} 
                className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200 hover:border-red-700/40 transition-all space-y-1 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(dim.dimension);
                      }}
                      className={`p-1 rounded-md border transition-all active:scale-90 ${
                        isFavorite(dim.dimension)
                          ? 'bg-red-50 text-red-700 border-red-200 shadow-xs'
                          : 'bg-white text-gray-400 hover:text-red-700 border-gray-200'
                      }`}
                      title={isFavorite(dim.dimension) ? "Quitar de favoritos" : "Marcar como favorito"}
                    >
                      <Star size={11} className={isFavorite(dim.dimension) ? 'fill-red-700 text-red-700' : ''} />
                    </button>
                    <span className="font-black text-xs text-gray-900 truncate">{dim.dimension}</span>
                  </div>
                  <span className="font-mono text-[10px] font-black text-red-700 bg-red-50 px-1.5 py-0.5 rounded border border-red-100 shrink-0">
                    Nivel {dim.score}/100
                  </span>
                </div>
                <span className="text-[10px] font-bold text-gray-500 block">{dim.metric}</span>
                <p className="text-[10px] text-gray-600 font-semibold leading-relaxed pt-1">
                  {dim.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Hygiene Checklist & Silent Hazards */}
        <div className="space-y-6">
          <div>
            <h5 className="text-[11px] font-black uppercase tracking-wider text-gray-400 mb-3">
              Lista de Control Obligatoria (Checklist de Operaciones Seguras)
            </h5>
            <div className="space-y-2">
              {REGULATORY_CHECKLIST.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div 
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isChecked 
                        ? 'bg-gray-50 border-gray-300' 
                        : 'bg-white border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      isChecked ? 'bg-red-700 text-white' : 'border-2 border-gray-300'
                    }`}>
                      {isChecked && <CheckCircle2 size={14} />}
                    </div>
                    <div>
                      <span className={`text-xs font-black block ${isChecked ? 'text-gray-900' : 'text-gray-700'}`}>
                        {item.title}
                      </span>
                      <span className="text-[11px] text-gray-500 font-semibold leading-tight block mt-0.5">
                        {item.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Critical Security Box: Allowances and Blind Signing */}
          <div className="p-5 bg-red-50/60 rounded-2xl border border-red-100 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-red-700">
              <ShieldAlert size={16} /> Los 2 Riesgos Silenciosos Más Frecuentes
            </div>
            <div className="space-y-2 text-[11px] text-gray-700 font-semibold leading-relaxed">
              <p>
                <strong className="text-gray-900 font-black">1. Aprobaciones Ilimitadas (Infinite Token Approvals):</strong> Dar permiso de gasto ilimitado (allowance) a una dApp permite que, si ese contrato es hackeado meses después, un atacante pueda vaciar todos tus tokens sin pedir tu firma. Escanear y revocar periódicamente.
              </p>
              <p>
                <strong className="text-gray-900 font-black">2. Firma Ciega (Blind Signing):</strong> Autorizar transacciones en hardware wallets sin que la pantalla física del dispositivo muestre con exactitud el contrato de destino y la cantidad transferida. Exigir siempre Clear Signing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
