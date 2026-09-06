import React, { useState } from 'react';
import { 
  Scale, FileText, AlertTriangle, CheckCircle2, 
  Calendar, Building2, ShieldCheck, HelpCircle, 
  DollarSign, ArrowRight, BookOpen, Clock, AlertCircle
} from 'lucide-react';

export const RegulatoryComplianceModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mica' | 'aeat' | 'criterios'>('aeat');

  // Simulator for Spain Model 721 threshold
  const [foreignExchangesBalance, setForeignExchangesBalance] = useState<number>(38000);
  const [foreignDeFiBalance, setForeignDeFiBalance] = useState<number>(18000);
  const [hardwareWalletBalance, setHardwareWalletBalance] = useState<number>(25000);

  const totalForeignBalance = foreignExchangesBalance + foreignDeFiBalance;
  const isModel721Mandatory = totalForeignBalance > 50000;

  return (
    <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-100/50 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 bg-red-700 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-red-700">Marco Normativo y Fiscal</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-gray-900">
            Regulación UE (MiCA, DAC8) & Hacienda España (721, 172, 173)
          </h4>
          <p className="text-[12px] text-gray-500 font-bold uppercase tracking-tight mt-1">
            Trazabilidad, obligaciones de información, plazos legales y fiscalidad de operaciones
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
          <button
            onClick={() => setActiveTab('aeat')}
            className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
              activeTab === 'aeat' 
                ? 'bg-red-700 text-white shadow-md shadow-red-700/20' 
                : 'text-gray-400 hover:text-red-700'
            }`}
          >
            Hacienda (Mod. 721, 172, 173)
          </button>
          <button
            onClick={() => setActiveTab('mica')}
            className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
              activeTab === 'mica' 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            Reglamento MiCA & UE
          </button>
          <button
            onClick={() => setActiveTab('criterios')}
            className={`px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
              activeTab === 'criterios' 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'text-gray-400 hover:text-gray-900'
            }`}
          >
            6 Criterios Contables
          </button>
        </div>
      </div>

      {/* Content for AEAT Tab */}
      {activeTab === 'aeat' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Interactive Model 721 Checker */}
          <div className="p-6 md:p-8 bg-gray-50 rounded-3xl border border-gray-200 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-red-700 tracking-widest block mb-1">
                  Evaluador de Obligación Informativa
                </span>
                <h5 className="text-xl font-black uppercase text-gray-900">
                  Modelo 721: Criptoactivos en el Extranjero
                </h5>
                <p className="text-[12px] text-gray-500 font-semibold mt-1">
                  Umbral legal conjunto: 50.000 € a 31 de diciembre. Plazo anual de presentación: del 1 de enero al 31 de marzo.
                </p>
              </div>

              <div className={`px-5 py-3 rounded-2xl border text-center ${
                isModel721Mandatory 
                  ? 'bg-red-700 text-white border-red-700 shadow-lg shadow-red-700/20' 
                  : 'bg-gray-900 text-white border-gray-900'
              }`}>
                <span className="text-[9px] font-black uppercase tracking-widest block opacity-80">Estado de Obligación</span>
                <span className="text-sm font-black uppercase tracking-tight">
                  {isModel721Mandatory ? 'Presentación OBLIGATORIA' : 'Exento por saldo (< 50.000 €)'}
                </span>
              </div>
            </div>

            {/* Inputs for simulated balances */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-200">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
                  Exchanges Extranjeros (Binance, Bybit...)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-400">€</span>
                  <input 
                    type="number"
                    value={foreignExchangesBalance}
                    onChange={(e) => setForeignExchangesBalance(Math.max(0, Number(e.target.value)))}
                    step={1000}
                    className="w-full font-mono text-sm font-black text-gray-900 outline-none"
                  />
                </div>
                <span className="text-[9px] text-red-700 font-bold block mt-1">Computa para Mod. 721</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-200">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
                  Custodios / Plataformas DeFi Extranjeras
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-400">€</span>
                  <input 
                    type="number"
                    value={foreignDeFiBalance}
                    onChange={(e) => setForeignDeFiBalance(Math.max(0, Number(e.target.value)))}
                    step={1000}
                    className="w-full font-mono text-sm font-black text-gray-900 outline-none"
                  />
                </div>
                <span className="text-[9px] text-red-700 font-bold block mt-1">Computa para Mod. 721</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-gray-200">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-1">
                  Monederos Fríos (Auto-custodia Física)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-gray-400">€</span>
                  <input 
                    type="number"
                    value={hardwareWalletBalance}
                    onChange={(e) => setHardwareWalletBalance(Math.max(0, Number(e.target.value)))}
                    step={1000}
                    className="w-full font-mono text-sm font-black text-gray-900 outline-none"
                  />
                </div>
                <span className="text-[9px] text-gray-400 font-bold block mt-1">Auto-custodia (Criterio no localizado)</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between pt-2 border-t border-gray-200 text-[12px] text-gray-600 font-semibold gap-2">
              <span>Saldo total computable en el extranjero: <strong className="font-mono text-gray-900 text-sm font-black">€{totalForeignBalance.toLocaleString()}</strong></span>
              <span className="text-red-700 font-bold">
                {isModel721Mandatory 
                  ? `Supera el límite legal por €${(totalForeignBalance - 50000).toLocaleString()}` 
                  : `Margen disponible antes de obligación: €${(50000 - totalForeignBalance).toLocaleString()}`}
              </span>
            </div>
          </div>

          {/* Cards for Modelos 172, 173 and 721 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white border border-gray-200 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-gray-100 text-gray-700 rounded">AEAT</span>
                <span className="text-[10px] font-black uppercase text-red-700">Mes de Enero</span>
              </div>
              <h6 className="text-lg font-black uppercase text-gray-900">Modelo 172</h6>
              <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                Declaración informativa sobre saldos en monedas virtuales. Obligación de entidades residentes en España que presten servicios de custodia o salvaguarda de claves privadas.
              </p>
              <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-mono">
                Saldos referidos a 31 de diciembre.
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-gray-100 text-gray-700 rounded">AEAT</span>
                <span className="text-[10px] font-black uppercase text-red-700">Mes de Enero</span>
              </div>
              <h6 className="text-lg font-black uppercase text-gray-900">Modelo 173</h6>
              <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                Declaración informativa sobre operaciones con monedas virtuales (adquisición, transmisión, permuta y transferencias). Obligación de intermediarios o agencias de cambio residentes.
              </p>
              <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-mono">
                Detalle individualizado por NIF y operación.
              </div>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-red-100 text-red-700 rounded font-black">Contribuyente</span>
                <span className="text-[10px] font-black uppercase text-red-700">1 Ene - 31 Mar</span>
              </div>
              <h6 className="text-lg font-black uppercase text-gray-900">Modelo 721</h6>
              <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                Declaración informativa de monedas virtuales en el extranjero. Exigible a personas físicas o jurídicas residentes si el saldo agregado a 31 de diciembre supera los 50.000 €.
              </p>
              <div className="pt-2 border-t border-gray-100 text-[10px] text-gray-400 font-mono">
                Obligación sucesiva si el saldo se incrementa en más de 20.000 €.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content for MiCA Tab */}
      {activeTab === 'mica' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-3xl space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-700 block">Categoría 1 (MiCA)</span>
              <h6 className="text-lg font-black uppercase text-gray-900">EMT (Fichas Dinero Electrónico)</h6>
              <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                Stablecoins referenciadas a una única divisa oficial (ej. EUR, USD). Reembolsables en efectivo al valor nominal en todo momento. Solo pueden ser emitidas por Entidades de Crédito o Entidades de Dinero Electrónico autorizadas.
              </p>
              <div className="pt-2 border-t border-gray-200 text-[10px] font-bold text-gray-500">
                Límite transaccional de 200M € diarios si no es moneda oficial de la UE.
              </div>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-3xl space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-700 block">Categoría 2 (MiCA)</span>
              <h6 className="text-lg font-black uppercase text-gray-900">ART (Fichas Ref. a Activos)</h6>
              <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                Fichas cuyo valor se referencia a una cesta de divisas, materias primas o varios criptoactivos. Requieren aprobación previa de la EBA y el Banco de España, con exigencias masivas de reservas líquidas segregadas.
              </p>
              <div className="pt-2 border-t border-gray-200 text-[10px] font-bold text-gray-500">
                Supervisión directa de la Autoridad Bancaria Europea si es significativa.
              </div>
            </div>

            <div className="p-6 bg-gray-50 border border-gray-200 rounded-3xl space-y-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-700 block">Categoría 3 (MiCA)</span>
              <h6 className="text-lg font-black uppercase text-gray-900">Otros Criptoactivos (Utility)</h6>
              <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                Tokens que otorgan acceso a bienes o servicios. Requieren Libro Blanco (Whitepaper) registrado y auditado, exento de autorización bancaria si no tienen promesa financiera ni derecho de amortización fiduciaria.
              </p>
              <div className="pt-2 border-t border-gray-200 text-[10px] font-bold text-gray-500">
                Responsabilidad civil del emisor por omisiones en el whitepaper.
              </div>
            </div>
          </div>

          {/* Verified Timeline Banner */}
          <div className="p-6 bg-gray-900 text-white rounded-3xl space-y-3">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-red-500" />
              <h5 className="text-sm font-black uppercase tracking-wider">
                Calendario Crítico y Plazos Verificados en España (Capítulo 18 del Manual)
              </h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-[11px] font-semibold text-gray-300">
              <div className="border-l-2 border-red-500 pl-3">
                <span className="text-white font-black block">30 Dic 2024</span>
                Aplicación general del régimen de servicios para proveedores de criptoactivos (CASP).
              </div>
              <div className="border-l-2 border-red-500 pl-3">
                <span className="text-white font-black block">1 Marzo 2026</span>
                Límite fijado por CNMV/Banco de España para entidades que presten servicios de pago con EMT.
              </div>
              <div className="border-l-2 border-red-500 pl-3">
                <span className="text-white font-black block">1 Julio 2026</span>
                Fin definitivo del periodo transitorio de adaptación para proveedores existentes en España.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content for 6 Criterios Contables Tab */}
      {activeTab === 'criterios' && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <p className="text-[12px] text-gray-500 font-semibold">
            Los 6 criterios indispensables que deben quedar documentados formalmente para soportar cualquier auditoría o inspección de la Agencia Tributaria:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
              <span className="font-mono text-xs font-black text-red-700 block">1. Método de Imputación de Costes (FIFO)</span>
              <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                Obligatoriedad de aplicar el criterio First-In, First-Out (las primeras monedas adquiridas son las primeras que se consideran transmitidas), calculado homogéneamente por cada tipo de activo.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
              <span className="font-mono text-xs font-black text-red-700 block">2. Fuente y Método de Valoración Oficial en Euros</span>
              <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                Toda operación debe registrar el contravalor en euros en el instante exacto (timestamp UTC) utilizando un feed de precios de referencia contrastable y documentado (ej. BCE, CoinGecko, Kraken).
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
              <span className="font-mono text-xs font-black text-red-700 block">3. Tratamiento Fiscal de las Comisiones de Gas</span>
              <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                El gas consumido en compras incrementa el valor de adquisición. En ventas, reduce el valor de transmisión neto. En transacciones fallidas, no puede deducirse como menor valor de transmisión.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
              <span className="font-mono text-xs font-black text-red-700 block">4. Momento de Devengo de Recompensas (Staking / Yield)</span>
              <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                Diferenciación estricta entre la generación teórica del rendimiento y su puesta a disposición efectiva en la wallet. Se computa como rendimiento del capital mobiliario por su valor en euros al momento de percepción.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
              <span className="font-mono text-xs font-black text-red-700 block">5. Permutas Cripto-a-Cripto como Hecho Imponible</span>
              <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                Intercambiar ETH por USDC, o BTC por SOL, constituye una alteración patrimonial sujeta a IRPF / IS en España, con independencia de que los fondos nunca hayan salido a una cuenta bancaria fiat.
              </p>
            </div>

            <div className="p-5 bg-gray-50 border border-gray-200 rounded-2xl space-y-1">
              <span className="font-mono text-xs font-black text-red-700 block">6. Conciliación de Comisiones e Impermanent Loss en Pools</span>
              <p className="text-[11px] text-gray-600 font-semibold leading-relaxed">
                Las comisiones acumuladas dentro del pool tributan al momento de su liquidación o retiro efectivo, computando la variación neta frente al capital inicialmente aportado y considerando el IL como pérdida patrimonial.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
