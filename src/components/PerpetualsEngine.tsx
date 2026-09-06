import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, AlertTriangle, ShieldAlert, 
  HelpCircle, DollarSign, Activity, Percent, Clock, Zap
} from 'lucide-react';

interface AssetConfig {
  symbol: string;
  name: string;
  spotPrice: number;
  indexPrice: number;
  markPrice: number;
  typicalFundingRate8h: number; // in % e.g. 0.01%
}

const PERP_ASSETS: AssetConfig[] = [
  { symbol: 'BTC-PERP', name: 'Bitcoin', spotPrice: 62450, indexPrice: 62460, markPrice: 62455, typicalFundingRate8h: 0.012 },
  { symbol: 'ETH-PERP', name: 'Ethereum', spotPrice: 3280, indexPrice: 3282, markPrice: 3281, typicalFundingRate8h: 0.015 },
  { symbol: 'SOL-PERP', name: 'Solana', spotPrice: 148.5, indexPrice: 148.6, markPrice: 148.55, typicalFundingRate8h: 0.022 }
];

export const PerpetualsEngine: React.FC = () => {
  const [selectedAssetIdx, setSelectedAssetIdx] = useState<number>(0);
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG');
  const [collateralUSD, setCollateralUSD] = useState<number>(1000);
  const [leverage, setLeverage] = useState<number>(10);
  const [marginMode, setMarginMode] = useState<'isolated' | 'cross'>('isolated');

  const asset = PERP_ASSETS[selectedAssetIdx];

  // Mathematical calculations
  const {
    positionSizeUSD,
    positionSizeTokens,
    maintenanceMarginUSD,
    maintenanceMarginRate,
    liquidationPrice,
    distanceToLiquidationPercent,
    funding8hCostUSD,
    funding30dCostUSD,
    riskLevel
  } = useMemo(() => {
    const sizeUSD = collateralUSD * leverage;
    const tokens = sizeUSD / asset.markPrice;
    
    // Maintenance margin rate varies with leverage (standard exchange tier: e.g. 0.5% + (leverage-1)*0.05%)
    const mmRate = 0.005 + (leverage / 100) * 0.08;
    const mmUSD = sizeUSD * mmRate;

    // Liquidation Price calculation:
    // For LONG: Collateral - (Entry - LiqPrice) * Tokens = MaintenanceMargin
    // LiqPrice = Entry - (Collateral - MaintenanceMargin) / Tokens
    // For SHORT: Collateral - (LiqPrice - Entry) * Tokens = MaintenanceMargin
    // LiqPrice = Entry + (Collateral - MaintenanceMargin) / Tokens
    let liqPrice = 0;
    const marginAvailable = collateralUSD - mmUSD;
    
    if (direction === 'LONG') {
      liqPrice = asset.markPrice - (marginAvailable / tokens);
      liqPrice = Math.max(0, liqPrice);
    } else {
      liqPrice = asset.markPrice + (marginAvailable / tokens);
    }

    const distPct = Math.abs((liqPrice - asset.markPrice) / asset.markPrice) * 100;
    
    // Funding cost: Size * FundingRate
    // If LONG and rate > 0: Long pays Short
    // If SHORT and rate > 0: Short receives
    const fundingRateDec = asset.typicalFundingRate8h / 100;
    const funding8h = sizeUSD * fundingRateDec * (direction === 'LONG' ? 1 : -1);
    const funding30d = funding8h * 3 * 30; // 3 cycles per day * 30 days

    let risk: 'Seguro' | 'Moderado' | 'Alto' | 'Extremo' = 'Seguro';
    if (distPct < 2.5) risk = 'Extremo';
    else if (distPct < 7) risk = 'Alto';
    else if (distPct < 15) risk = 'Moderado';

    return {
      positionSizeUSD: sizeUSD,
      positionSizeTokens: tokens,
      maintenanceMarginUSD: mmUSD,
      maintenanceMarginRate: mmRate * 100,
      liquidationPrice: Math.round(liqPrice * 100) / 100,
      distanceToLiquidationPercent: Number(distPct.toFixed(2)),
      funding8hCostUSD: Number(funding8h.toFixed(2)),
      funding30dCostUSD: Number(funding30d.toFixed(2)),
      riskLevel: risk
    };
  }, [asset, direction, collateralUSD, leverage]);

  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100/50 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-700">Simulador de Derivados</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-gray-900">
            Perpetuales (Perps) & Motor de Liquidación
          </h4>
          <p className="text-[12px] text-gray-500 font-bold uppercase tracking-tight mt-1">
            Apalancamiento, Mark Price vs Spot, Funding Rate (8h) y umbral de liquidación forzosa
          </p>
        </div>

        {/* Asset Selector */}
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
          {PERP_ASSETS.map((a, idx) => (
            <button
              key={a.symbol}
              onClick={() => setSelectedAssetIdx(idx)}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-black uppercase font-mono transition-all ${
                selectedAssetIdx === idx 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {a.symbol}
            </button>
          ))}
        </div>
      </div>

      {/* The 4 Prices Banner (Chapter 13 Requirement) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-gray-50/70 rounded-2xl border border-gray-200">
        <div>
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest block">1. Spot Price (Contado)</span>
          <span className="text-lg font-black font-mono text-gray-900">${asset.spotPrice.toLocaleString()}</span>
          <span className="text-[8px] text-gray-400 block">Mercado spot real</span>
        </div>
        <div>
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest block">2. Index Price (Índice)</span>
          <span className="text-lg font-black font-mono text-gray-900">${asset.indexPrice.toLocaleString()}</span>
          <span className="text-[8px] text-gray-400 block">Media de exchanges</span>
        </div>
        <div>
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest block">3. Mark Price (Marca)</span>
          <span className="text-lg font-black font-mono text-red-700">${asset.markPrice.toLocaleString()}</span>
          <span className="text-[8px] text-red-700 font-bold block">Decide PnL y liquidación</span>
        </div>
        <div>
          <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest block">4. Liq. Price Estimado</span>
          <span className="text-lg font-black font-mono text-red-700 underline decoration-red-300">
            ${liquidationPrice.toLocaleString()}
          </span>
          <span className="text-[8px] text-red-700 font-bold block">Margen de corte ({distanceToLiquidationPercent}%)</span>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Direction Toggle */}
        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
            Dirección de la Posición
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDirection('LONG')}
              className={`py-2 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1.5 transition-all ${
                direction === 'LONG'
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-400 border border-gray-200'
              }`}
            >
              <TrendingUp size={14} className={direction === 'LONG' ? 'text-green-400' : ''} /> Long (Alcista)
            </button>
            <button
              onClick={() => setDirection('SHORT')}
              className={`py-2 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1.5 transition-all ${
                direction === 'SHORT'
                  ? 'bg-red-700 text-white shadow-md shadow-red-700/20'
                  : 'bg-white text-gray-400 border border-gray-200'
              }`}
            >
              <TrendingDown size={14} className={direction === 'SHORT' ? 'text-red-200' : ''} /> Short (Bajista)
            </button>
          </div>
          <span className="text-[9px] text-gray-400 font-bold mt-2 block">
            {direction === 'LONG' ? 'Beneficio si el precio sube' : 'Beneficio si el precio cae'}
          </span>
        </div>

        {/* Colateral Input */}
        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
            Colateral Depositado ($ USD)
          </label>
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-gray-900" />
            <input 
              type="number" 
              value={collateralUSD} 
              onChange={(e) => setCollateralUSD(Math.max(50, Number(e.target.value)))}
              step={250}
              className="w-full bg-white border border-gray-200 px-3 py-1.5 rounded-xl font-mono text-sm font-black text-gray-900 outline-none focus:border-red-700"
            />
          </div>
          <span className="text-[9px] text-gray-400 font-bold mt-1 block">Garantía líquida aportada</span>
        </div>

        {/* Leverage Slider */}
        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Apalancamiento
            </label>
            <span className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
              leverage > 20 ? 'bg-red-700 text-white' : 'bg-gray-900 text-white'
            }`}>
              {leverage}x
            </span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="50" 
            step="1"
            value={leverage} 
            onChange={(e) => setLeverage(Number(e.target.value))}
            className="w-full accent-red-700 cursor-pointer"
          />
          <div className="flex justify-between text-[8px] font-mono text-gray-400 mt-1">
            <span>1x (Spot)</span>
            <span>10x</span>
            <span>25x</span>
            <span>50x (Extremo)</span>
          </div>
        </div>

        {/* Margin Mode */}
        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
            Modo de Margen
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMarginMode('isolated')}
              className={`py-2 rounded-xl text-xs font-black uppercase transition-all ${
                marginMode === 'isolated'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-400 border border-gray-200'
              }`}
            >
              Aislado
            </button>
            <button
              onClick={() => setMarginMode('cross')}
              className={`py-2 rounded-xl text-xs font-black uppercase transition-all ${
                marginMode === 'cross'
                  ? 'bg-red-700 text-white shadow-md'
                  : 'bg-white text-gray-400 border border-gray-200'
              }`}
            >
              Cruzado
            </button>
          </div>
          <span className="text-[9px] text-gray-400 font-bold mt-2 block">
            {marginMode === 'isolated' ? 'Pérdida acotada al colateral' : 'Compromete todo el saldo de la cuenta'}
          </span>
        </div>
      </div>

      {/* Primary Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
            Tamaño de Posición Total
          </span>
          <span className="text-3xl font-black font-mono text-gray-900 tracking-tight">
            ${positionSizeUSD.toLocaleString()}
          </span>
          <p className="text-[11px] text-gray-500 font-bold mt-2 font-mono">
            {positionSizeTokens.toFixed(4)} {asset.name}
          </p>
        </div>

        <div className="p-6 bg-red-50/50 border border-red-100 rounded-3xl">
          <span className="text-[10px] font-black uppercase text-red-700 tracking-widest block mb-1">
            Precio de Liquidación
          </span>
          <span className="text-3xl font-black font-mono text-red-700 tracking-tight">
            ${liquidationPrice.toLocaleString()}
          </span>
          <p className="text-[11px] text-red-700 font-bold mt-2">
            Activado ante una variación del <span className="font-mono font-black">{distanceToLiquidationPercent}%</span>
          </p>
        </div>

        <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
            Tasa de Financiación (Funding Rate)
          </span>
          <span className="text-3xl font-black font-mono text-gray-900 tracking-tight">
            {asset.typicalFundingRate8h}%
          </span>
          <p className="text-[11px] text-gray-500 font-bold mt-2">
            Coste estimado: <span className="font-mono font-black">{funding8hCostUSD > 0 ? `-$${Math.abs(funding8hCostUSD)}` : `+$${Math.abs(funding8hCostUSD)}`}</span> cada 8h
          </p>
        </div>

        <div className={`p-6 rounded-3xl border ${
          riskLevel === 'Extremo' 
            ? 'bg-red-700 text-white border-red-700' 
            : riskLevel === 'Alto'
            ? 'bg-red-800 text-white border-red-800'
            : 'bg-gray-900 text-white border-gray-900'
        }`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-200">
              Riesgo de Liquidación
            </span>
            <ShieldAlert size={16} />
          </div>
          <span className="text-3xl font-black font-mono tracking-tight uppercase">
            {riskLevel}
          </span>
          <p className="text-[11px] font-bold mt-2 text-gray-200">
            {leverage >= 20 ? 'Margen mínimo. Picos de volatilidad liquidarán.' : 'Margen prudente para oscilaciones normales.'}
          </p>
        </div>
      </div>

      {/* Critical Chapter 13 Warnings Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
          <div className="flex items-center gap-2 text-gray-900 font-black text-xs uppercase">
            <Clock size={16} className="text-red-700" /> Impacto Acumulativo de Funding
          </div>
          <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
            En 30 días, el coste por mantener esta posición abierta rondará los <span className="font-mono font-black text-gray-900">${Math.abs(funding30dCostUSD)}</span>. El funding es a menudo el factor determinante del resultado.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
          <div className="flex items-center gap-2 text-gray-900 font-black text-xs uppercase">
            <AlertTriangle size={16} className="text-red-700" /> Desapalancamiento ADL
          </div>
          <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
            Si el fondo de seguro no absorbe pérdidas de liquidaciones fallidas, el motor cerrará forzosamente posiciones ganadoras mediante <span className="font-black text-gray-900">Auto-Deleveraging (ADL)</span> sin consentimiento.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-1">
          <div className="flex items-center gap-2 text-gray-900 font-black text-xs uppercase">
            <Zap size={16} className="text-red-700" /> Margen de Mantenimiento
          </div>
          <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
            La liquidación ocurre cuando el margen disponible toca el margen de mantenimiento (<span className="font-mono font-black text-gray-900">{maintenanceMarginRate.toFixed(2)}%</span>), nunca cuando el saldo llega a 0.
          </p>
        </div>
      </div>
    </div>
  );
};
