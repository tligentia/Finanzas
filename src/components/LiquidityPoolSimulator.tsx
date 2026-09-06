import React, { useState, useMemo } from 'react';
import { 
  ArrowRightLeft, AlertTriangle, TrendingUp, TrendingDown, 
  HelpCircle, RefreshCw, Layers, ShieldCheck, DollarSign, Activity
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine 
} from 'recharts';

export const LiquidityPoolSimulator: React.FC = () => {
  const [model, setModel] = useState<'v2' | 'v3'>('v2');
  const [initialInvestment, setInitialInvestment] = useState<number>(5000);
  const [priceChangePercent, setPriceChangePercent] = useState<number>(25); // -80 to +300
  const [feeTier, setFeeTier] = useState<number>(0.3); // 0.05%, 0.3%, 1.0%
  const [annualVolumeMult, setAnnualVolumeMult] = useState<number>(15); // fee APY proxy
  const [daysElapsed, setDaysElapsed] = useState<number>(90);

  // Math calculations for Impermanent Loss
  // ratio k = (1 + priceChangePercent / 100)
  // IL_v2 = (2 * sqrt(k)) / (1 + k) - 1
  const {
    ilPercent,
    feesEarnedUSD,
    hodlValueUSD,
    poolValueWithoutFeesUSD,
    poolValueTotalUSD,
    netPnLPercent,
    isNetPositive
  } = useMemo(() => {
    const k = Math.max(0.01, 1 + priceChangePercent / 100);
    const sqrtK = Math.sqrt(k);
    
    let ilRatio = (2 * sqrtK) / (1 + k) - 1; // negative number or 0
    if (model === 'v3') {
      // Concentrated liquidity amplifies IL by leverage factor within active range
      // For a typical range of +/- 25%, leverage is ~4x to 5x
      const amplificationFactor = 3.2;
      ilRatio = Math.max(-0.95, ilRatio * amplificationFactor);
    }
    
    const ilPct = ilRatio * 100; // e.g. -2.5%
    
    // Value if just holding (HODL) 50% Asset A + 50% Asset B
    // Asset B is stable (1x), Asset A went to k
    const hodlVal = (initialInvestment / 2) + (initialInvestment / 2) * k;
    
    // Value in pool before fees = HODL * (1 + IL)
    const poolValBase = hodlVal * (1 + ilRatio);
    
    // Fees calculation: Daily yield based on annual volume
    // e.g. Base Fee APY = feeTier * annualVolumeMult
    const estimatedApy = feeTier * annualVolumeMult * (model === 'v3' ? 2.5 : 1.0); // v3 has higher fee efficiency
    const dailyRate = estimatedApy / 365 / 100;
    const feesEarned = initialInvestment * dailyRate * daysElapsed;
    
    const poolTotal = poolValBase + feesEarned;
    const netPnLPct = ((poolTotal - initialInvestment) / initialInvestment) * 100;
    
    return {
      ilPercent: ilPct,
      feesEarnedUSD: Math.round(feesEarned),
      hodlValueUSD: Math.round(hodlVal),
      poolValueWithoutFeesUSD: Math.round(poolValBase),
      poolValueTotalUSD: Math.round(poolTotal),
      netPnLPercent: Number(netPnLPct.toFixed(2)),
      isNetPositive: poolTotal >= initialInvestment
    };
  }, [model, initialInvestment, priceChangePercent, feeTier, annualVolumeMult, daysElapsed]);

  // Curve data for chart
  const chartData = useMemo(() => {
    const points = [-80, -60, -40, -20, 0, 20, 40, 60, 80, 100, 150, 200, 300];
    return points.map(pt => {
      const k = Math.max(0.01, 1 + pt / 100);
      const sqrtK = Math.sqrt(k);
      const v2IL = ((2 * sqrtK) / (1 + k) - 1) * 100;
      const v3IL = Math.max(-100, v2IL * 3.2);
      return {
        desviacion: `${pt > 0 ? '+' : ''}${pt}%`,
        rawVal: pt,
        ilV2: Number(v2IL.toFixed(2)),
        ilV3: Number(v3IL.toFixed(2))
      };
    });
  }, []);

  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100/50 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-700">Simulador Algorítmico</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-gray-900">
            Pools de Liquidez & Impermanent Loss
          </h4>
          <p className="text-[12px] text-gray-500 font-bold uppercase tracking-tight mt-1">
            Descomposición de rendimiento neto: Comisiones generadas frente a pérdida por divergencia relativa
          </p>
        </div>

        {/* Model Selector */}
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
          <button
            onClick={() => setModel('v2')}
            className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
              model === 'v2' 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            V2 (Rango Total x·y=k)
          </button>
          <button
            onClick={() => setModel('v3')}
            className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
              model === 'v3' 
                ? 'bg-red-700 text-white shadow-md shadow-red-700/20' 
                : 'text-gray-400 hover:text-red-700'
            }`}
          >
            V3 (Liquidez Concentrada)
          </button>
        </div>
      </div>

      {/* Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Capital Inicial */}
        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
            Inversión Inicial ($ USD)
          </label>
          <div className="flex items-center gap-2">
            <DollarSign size={18} className="text-red-700" />
            <input 
              type="number" 
              value={initialInvestment} 
              onChange={(e) => setInitialInvestment(Math.max(100, Number(e.target.value)))}
              step={500}
              className="w-full bg-white border border-gray-200 px-3 py-1.5 rounded-xl font-mono text-sm font-black text-gray-900 outline-none focus:border-red-700"
            />
          </div>
          <span className="text-[9px] text-gray-400 font-bold mt-1 block">50% Activo A + 50% Activo B</span>
        </div>

        {/* Variación de Precio */}
        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Divergencia Precio Activo A
            </label>
            <span className={`font-mono text-xs font-black px-2 py-0.5 rounded ${
              priceChangePercent >= 0 ? 'bg-gray-900 text-white' : 'bg-red-700 text-white'
            }`}>
              {priceChangePercent >= 0 ? `+${priceChangePercent}%` : `${priceChangePercent}%`}
            </span>
          </div>
          <input 
            type="range" 
            min="-80" 
            max="300" 
            step="5"
            value={priceChangePercent} 
            onChange={(e) => setPriceChangePercent(Number(e.target.value))}
            className="w-full accent-red-700 cursor-pointer"
          />
          <div className="flex justify-between text-[8px] font-mono text-gray-400 mt-1">
            <span>-80%</span>
            <span>0% (Paridad)</span>
            <span>+300%</span>
          </div>
        </div>

        {/* Nivel de Comisión (Fee Tier) */}
        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
          <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
            Comisión del Pool (Swap Fee)
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {[0.05, 0.3, 1.0].map((t) => (
              <button
                key={t}
                onClick={() => setFeeTier(t)}
                className={`py-1.5 rounded-lg text-[10px] font-black font-mono transition-all ${
                  feeTier === t 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400'
                }`}
              >
                {t}%
              </button>
            ))}
          </div>
          <span className="text-[9px] text-gray-400 font-bold mt-2 block">
            {feeTier === 0.05 ? 'Pares estables' : feeTier === 0.3 ? 'Pares estándar (ETH/USDC)' : 'Pares exóticos'}
          </span>
        </div>

        {/* Tiempo de Depósito */}
        <div className="bg-gray-50/70 p-5 rounded-2xl border border-gray-100">
          <div className="flex justify-between items-center mb-2">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
              Días en el Pool
            </label>
            <span className="font-mono text-xs font-black text-gray-900 bg-white px-2 py-0.5 rounded border border-gray-200">
              {daysElapsed} días
            </span>
          </div>
          <input 
            type="range" 
            min="7" 
            max="365" 
            step="7"
            value={daysElapsed} 
            onChange={(e) => setDaysElapsed(Number(e.target.value))}
            className="w-full accent-gray-900 cursor-pointer"
          />
          <span className="text-[9px] text-gray-400 font-bold mt-1 block">Acumulación de comisiones</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-red-50/50 border border-red-100 rounded-3xl">
          <span className="text-[10px] font-black uppercase text-red-700 tracking-widest block mb-1">
            Pérdida Impermanente (IL)
          </span>
          <span className="text-3xl font-black font-mono text-red-700 tracking-tight">
            {ilPercent.toFixed(2)}%
          </span>
          <p className="text-[11px] text-gray-600 font-bold mt-2 leading-tight">
            {model === 'v3' ? 'Amplificada por rango concentrado' : 'Calculada bajo curva x·y=k'}
          </p>
        </div>

        <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
            Comisiones Cobradas
          </span>
          <span className="text-3xl font-black font-mono text-gray-900 tracking-tight">
            +${feesEarnedUSD.toLocaleString()}
          </span>
          <p className="text-[11px] text-gray-500 font-bold mt-2 leading-tight">
            Retorno bruto acumulado en {daysElapsed} días
          </p>
        </div>

        <div className="p-6 bg-gray-50 border border-gray-100 rounded-3xl">
          <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
            Valor si hubieses hecho HODL
          </span>
          <span className="text-3xl font-black font-mono text-gray-900 tracking-tight">
            ${hodlValueUSD.toLocaleString()}
          </span>
          <p className="text-[11px] text-gray-500 font-bold mt-2 leading-tight">
            Conservando los tokens sin depositarlos
          </p>
        </div>

        <div className={`p-6 rounded-3xl border ${
          isNetPositive 
            ? 'bg-gray-900 text-white border-gray-900' 
            : 'bg-red-700 text-white border-red-700'
        }`}>
          <span className="text-[10px] font-black uppercase text-gray-300 tracking-widest block mb-1">
            Resultado Neto Final
          </span>
          <span className="text-3xl font-black font-mono tracking-tight">
            ${poolValueTotalUSD.toLocaleString()}
          </span>
          <div className="flex items-center gap-1.5 mt-2">
            {netPnLPercent >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span className="text-[11px] font-bold font-mono">
              {netPnLPercent >= 0 ? `+${netPnLPercent}%` : `${netPnLPercent}%`} sobre el capital inicial
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h5 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
            Curva de Impermanent Loss: Rango Completo (V2) vs Rango Concentrado (V3)
          </h5>
          <div className="flex items-center gap-4 text-[10px] font-black uppercase">
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-3 h-0.5 bg-gray-400"></span> V2 Clásico
            </span>
            <span className="flex items-center gap-1 text-red-700">
              <span className="w-3 h-0.5 bg-red-700"></span> V3 Concentrado
            </span>
          </div>
        </div>

        <div className="h-64 bg-gray-50/50 rounded-2xl p-4 border border-gray-100">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
              <XAxis dataKey="desviacion" stroke="#9ca3af" fontSize={10} tickLine={false} />
              <YAxis unit="%" domain={[-80, 5]} stroke="#9ca3af" fontSize={10} tickLine={false} />
              <Tooltip 
                formatter={(val: any) => [`${val}%`, 'Pérdida Impermanente']}
                contentStyle={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '11px', fontWeight: 'bold' }}
              />
              <ReferenceLine y={0} stroke="#6b7280" strokeDasharray="2 2" />
              <Line type="monotone" dataKey="ilV2" name="IL V2 (Total)" stroke="#6b7280" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="ilV3" name="IL V3 (Concentrado)" stroke="#b91c1c" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Educational Callout */}
      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-4">
        <div className="p-2 bg-red-700 text-white rounded-xl flex-shrink-0 mt-0.5">
          <AlertTriangle size={18} />
        </div>
        <div className="space-y-1 text-[12px] text-gray-600 font-semibold leading-relaxed">
          <span className="font-black uppercase text-gray-900 tracking-wider block">
            Fórmula de Descomposición Obligatoria (Capítulo 9 del Manual):
          </span>
          <p>
            <span className="font-mono text-red-700 font-black">Resultado = Comisiones + Incentivos − Impermanent Loss − Gas de entrada/salida − Impacto Fiscal</span>.
            Un APY promocional del 50% compuesto por tokens inflacionarios que caen un 70% genera pérdidas de capital neto.
          </p>
        </div>
      </div>
    </div>
  );
};
