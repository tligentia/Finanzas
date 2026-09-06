import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, AlertTriangle, ShieldAlert, DollarSign, 
  Percent, ArrowRight, Zap, RefreshCw, CheckCircle2
} from 'lucide-react';

interface CollateralOption {
  symbol: string;
  name: string;
  maxLTV: number; // e.g. 80%
  liquidationThreshold: number; // e.g. 85%
  liquidationBonus: number; // e.g. 5%
}

const COLLATERAL_OPTIONS: CollateralOption[] = [
  { symbol: 'ETH', name: 'Ethereum', maxLTV: 80, liquidationThreshold: 85, liquidationBonus: 5 },
  { symbol: 'WBTC', name: 'Wrapped Bitcoin', maxLTV: 75, liquidationThreshold: 80, liquidationBonus: 6 },
  { symbol: 'wstETH', name: 'Lido Staked ETH', maxLTV: 78, liquidationThreshold: 83, liquidationBonus: 7 },
  { symbol: 'USDC', name: 'USD Coin', maxLTV: 90, liquidationThreshold: 93, liquidationBonus: 2 }
];

export const LendingHealthSimulator: React.FC = () => {
  const [selectedCollateralIdx, setSelectedCollateralIdx] = useState<number>(0);
  const [collateralValueUSD, setCollateralValueUSD] = useState<number>(10000);
  const [borrowPercentageOfMax, setBorrowPercentageOfMax] = useState<number>(65); // % of max LTV borrowed

  const selectedCol = COLLATERAL_OPTIONS[selectedCollateralIdx];

  const {
    maxBorrowUSD,
    borrowedAmountUSD,
    currentLTV,
    healthFactor,
    collateralDropToLiquidationPercent,
    liquidationPenaltyUSD,
    status
  } = useMemo(() => {
    const maxBorrow = collateralValueUSD * (selectedCol.maxLTV / 100);
    const borrowed = maxBorrow * (borrowPercentageOfMax / 100);
    const ltv = borrowed > 0 ? (borrowed / collateralValueUSD) * 100 : 0;
    
    // Health factor = (Collateral * LiquidationThreshold) / Debt
    // If Debt == 0, HF = Infinity
    const hf = borrowed > 0 ? (collateralValueUSD * (selectedCol.liquidationThreshold / 100)) / borrowed : 99;
    
    // Drop to liquidation: Price where (Collateral * DropFactor * Threshold) = Debt
    // Collateral * DropFactor = Debt / Threshold
    // DropFactor = Debt / (Collateral * Threshold) = 1 / HF
    // DropPercent = (1 - 1 / HF) * 100
    const dropPct = hf > 1 ? (1 - (1 / hf)) * 100 : 0;

    const penaltyUSD = borrowed * (selectedCol.liquidationBonus / 100);

    let stat: 'Optimo' | 'Moderado' | 'Peligro' | 'Liquidacion' = 'Optimo';
    if (hf <= 1.0) stat = 'Liquidacion';
    else if (hf < 1.2) stat = 'Peligro';
    else if (hf < 1.6) stat = 'Moderado';

    return {
      maxBorrowUSD: Math.round(maxBorrow),
      borrowedAmountUSD: Math.round(borrowed),
      currentLTV: Number(ltv.toFixed(1)),
      healthFactor: Number(hf.toFixed(2)),
      collateralDropToLiquidationPercent: Number(dropPct.toFixed(1)),
      liquidationPenaltyUSD: Math.round(penaltyUSD),
      status: stat
    };
  }, [selectedCol, collateralValueUSD, borrowPercentageOfMax]);

  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100/50 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-700">Simulador de Riesgo Crediticio</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-gray-900">
            Lending On-Chain & Factor de Salud (Health Factor)
          </h4>
          <p className="text-[12px] text-gray-500 font-bold uppercase tracking-tight mt-1">
            Garantía sobre-colateralizada, umbral de liquidación y margen de absorción ante caídas
          </p>
        </div>

        {/* Collateral Selector */}
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
          {COLLATERAL_OPTIONS.map((col, idx) => (
            <button
              key={col.symbol}
              onClick={() => setSelectedCollateralIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase font-mono transition-all ${
                selectedCollateralIdx === idx 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {col.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
            Valor de Colateral Depositado ($ USD)
          </label>
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-gray-900" />
            <input 
              type="number" 
              value={collateralValueUSD} 
              onChange={(e) => setCollateralValueUSD(Math.max(500, Number(e.target.value)))}
              step={1000}
              className="w-full bg-white border border-gray-200 px-3 py-1.5 rounded-xl font-mono text-sm font-black text-gray-900 outline-none focus:border-red-700"
            />
          </div>
          <span className="text-[9px] text-gray-400 font-bold mt-1 block">
            LTV Máx: {selectedCol.maxLTV}% | Umbral Liq: {selectedCol.liquidationThreshold}%
          </span>
        </div>

        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100 md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Deuda Prestada (Uso del Cupo Máximo)
            </label>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
                ${borrowedAmountUSD.toLocaleString()} USD
              </span>
              <span className="font-mono text-xs font-black text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                LTV: {currentLTV}%
              </span>
            </div>
          </div>
          <input 
            type="range" 
            min="5" 
            max="100" 
            step="1"
            value={borrowPercentageOfMax} 
            onChange={(e) => setBorrowPercentageOfMax(Number(e.target.value))}
            className="w-full accent-red-700 cursor-pointer"
          />
          <div className="flex justify-between text-[8px] font-mono text-gray-400 mt-1">
            <span>Mínimo (Seguro)</span>
            <span>50% del cupo</span>
            <span>100% (Al borde de liquidación)</span>
          </div>
        </div>
      </div>

      {/* Primary Gauge and Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className={`p-6 rounded-3xl border ${
          status === 'Liquidacion'
            ? 'bg-red-700 text-white border-red-700'
            : status === 'Peligro'
            ? 'bg-red-800 text-white border-red-800'
            : 'bg-gray-900 text-white border-gray-900'
        }`}>
          <span className="text-[10px] font-black uppercase text-gray-200 tracking-widest block mb-1">
            Factor de Salud (HF)
          </span>
          <span className="text-4xl font-black font-mono tracking-tight">
            {healthFactor}
          </span>
          <p className="text-[11px] font-bold mt-2 text-gray-200">
            {status === 'Liquidacion' 
              ? 'Posición liquidable por bots' 
              : status === 'Peligro'
              ? 'Riesgo inminente de liquidación'
              : 'Colateral suficiente y seguro'}
          </p>
        </div>

        <div className="p-6 bg-red-50/50 border border-red-100 rounded-3xl">
          <span className="text-[10px] font-black uppercase text-red-700 tracking-widest block mb-1">
            Caída Soportada del Colateral
          </span>
          <span className="text-3xl font-black font-mono text-red-700 tracking-tight">
            -{collateralDropToLiquidationPercent}%
          </span>
          <p className="text-[11px] text-gray-600 font-bold mt-2">
            Si el activo cae este % se ejecuta la liquidación forzosa
          </p>
        </div>

        <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
            Penalización de Liquidación (Bonus)
          </span>
          <span className="text-3xl font-black font-mono text-gray-900 tracking-tight">
            -${liquidationPenaltyUSD.toLocaleString()}
          </span>
          <p className="text-[11px] text-gray-500 font-bold mt-2">
            Pérdida extra cobrada por el bot liquidador ({selectedCol.liquidationBonus}%)
          </p>
        </div>

        <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
            Cupo Máximo Disponible
          </span>
          <span className="text-3xl font-black font-mono text-gray-900 tracking-tight">
            ${maxBorrowUSD.toLocaleString()}
          </span>
          <p className="text-[11px] text-gray-500 font-bold mt-2">
            Límite legal del protocolo antes de rechazar préstamos
          </p>
        </div>
      </div>

      {/* Protocol Architecture Note */}
      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-900">
            <Zap size={15} className="text-red-700" /> Préstamos Relámpago (Flash Loans)
          </div>
          <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
            Permiten pedir prestados millones de dólares sin colateral con la condición innegociable de devolverlos con comisión dentro del mismo bloque atómico de transacción. Si la transacción no devuelve los fondos, la blockchain revierte todo como si nunca hubiese ocurrido.
          </p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-900">
            <AlertTriangle size={15} className="text-red-700" /> Riesgo de Apalancamiento en Bucle (Looping)
          </div>
          <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
            Depositar ETH, pedir prestado USDC, comprar más ETH y volver a depositarlo crea un apalancamiento artificial. Aunque eleva la rentabilidad si el activo sube, multiplica drásticamente la probabilidad de liquidación en cascada ante caídas repentinas.
          </p>
        </div>
      </div>
    </div>
  );
};
