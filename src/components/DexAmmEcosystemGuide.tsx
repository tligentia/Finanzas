import React, { useState, useMemo, useEffect } from 'react';
import { 
  RefreshCw, Layers, Compass, ExternalLink, Zap, ShieldAlert, 
  Coins, ArrowRightLeft, TrendingUp, CheckCircle2, ChevronRight, 
  BarChart3, Info, Sparkles, AlertTriangle, Scale, Network, 
  Search, Shield, Check, FileText, Database, HelpCircle, Star
} from 'lucide-react';
import { DirectLinksModal } from './DirectLinksModal';
import { getLinksFor, PlatformLinksResource } from '../data/directLinksData';
import { useFavorites } from '../hooks/useFavorites';

export interface DexPlatformItem {
  id: string;
  name: string;
  shortName: string;
  category: 'amm-dex' | 'solana' | 'yield-aggregator' | 'lst-yield';
  blockTitle: string;
  chains: string[];
  poolTypes: string[];
  feeStructure: string;
  dominantFeature: string;
  description: string;
  practicalUseCase: string;
  metric?: string;
  url: string;
  keyTokens?: string[];
  risksNotice: string;
}

const DEX_AMM_PLATFORMS: DexPlatformItem[] = [
  // BLOQUE 1: Principales DEX AMM (pools clásicas y concentradas)
  {
    id: 'uniswap',
    name: 'Uniswap',
    shortName: 'Uniswap V3 / V4',
    category: 'amm-dex',
    blockTitle: 'Principales DEX AMM (Pools Clásicas y Concentradas)',
    chains: ['Ethereum', 'Arbitrum', 'Optimism', 'Base', 'Polygon', 'BNB Chain'],
    poolTypes: ['Liquidez Concentrada (V3)', 'Pools Custom Hooks (V4)', 'Pools Clásicas (V2)'],
    feeStructure: 'Tiers personalizables: 0.01%, 0.05%, 0.30%, 1.00%',
    dominantFeature: 'Estándar de facto en Ethereum y L2s con el mayor volumen y TVL acumulado.',
    description: 'El DEX con mayor volumen y TVL del ecosistema. Ofrece pools V3/V4 con liquidez concentrada (los LPs eligen rangos de precio específicos para maximizar la eficiencia de capital) y es el estándar de facto en Ethereum y sus principales Capas 2 (Arbitrum, Optimism, Base, etc.).',
    practicalUseCase: 'Pares altamente volátiles y pools de mayor liquidez global (ETH/USDC, WBTC/ETH).',
    metric: 'Mayor volumen diario global (>1.500M$ / día)',
    url: 'https://uniswap.org',
    keyTokens: ['UNI', 'ETH', 'USDC', 'WBTC'],
    risksNotice: 'Impermanent Loss elevado si el precio sale del rango concentrado asignado por el LP.'
  },
  {
    id: 'curve',
    name: 'Curve Finance',
    shortName: 'Curve (Stableswap)',
    category: 'amm-dex',
    blockTitle: 'Principales DEX AMM (Pools Clásicas y Concentradas)',
    chains: ['Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'Avalanche', 'Fantom'],
    poolTypes: ['Stableswap Invariant', 'CryptoSwap V2 (Correlacionados y Volátiles)'],
    feeStructure: 'Ultra-baja: 0.04% estándar en pares paritarios',
    dominantFeature: 'Columna vertebral de liquidez de stablecoins y activos correlacionados.',
    description: 'Especializado en activos que deben mantener paridad o estrecha correlación (stablecoins como USDC/USDT/EURC, y LSTs como stETH/ETH o rETH/ETH). Es la “columna vertebral” de liquidez estable en DeFi y el sustrato más integrado por otros protocolos para liquidaciones sin deslizamiento.',
    practicalUseCase: 'Intercambio masivo entre stablecoins y activos derivados de staking sin alterar su paridad.',
    metric: 'Mínimo deslizamiento (Slippage) en trades de gran volumen',
    url: 'https://curve.fi',
    keyTokens: ['CRV', 'crvUSD', 'USDC', 'stETH'],
    risksNotice: 'Riesgo sistémico de depeg en caso de fallo de uno de los colaterales del pool.'
  },
  {
    id: 'balancer',
    name: 'Balancer',
    shortName: 'Balancer V2 / V3',
    category: 'amm-dex',
    blockTitle: 'Principales DEX AMM (Pools Clásicas y Concentradas)',
    chains: ['Ethereum', 'Arbitrum', 'Optimism', 'Polygon', 'Base', 'Gnosis'],
    poolTypes: ['Pools Multi-Token (hasta 8 tokens)', 'Ponderaciones Custom (80/20, 60/40)', 'Boosted Pools'],
    feeStructure: 'Comisiones dinámicas ajustadas por gobernanza y volatilidad',
    dominantFeature: 'Piscinas multi-activo con pesos personalizados (no solo 50/50) para índices y tesorerías.',
    description: 'Permite crear pools de liquidez con hasta 8 tokens simultáneos con ponderaciones personalizadas (por ejemplo 80/20 o 60/40, superando el clásico límite restrictivo 50/50). Resulta idóneo para la gestión de índices sintéticos, tesorerías de DAOs y estrategias de cobertura complejas.',
    practicalUseCase: 'Creación de fondos indexados automatizados y reducción de impermanent loss mediante pesos asimétricos.',
    metric: 'Single Vault Architecture (eficiencia máxima de gas)',
    url: 'https://balancer.fi',
    keyTokens: ['BAL', 'veBAL', 'WETH', 'USDC'],
    risksNotice: 'Complejidad matemática acumulativa al agrupar múltiples tokens en un único smart contract.'
  },
  {
    id: 'pancakeswap',
    name: 'PancakeSwap',
    shortName: 'PancakeSwap V2 / V3',
    category: 'amm-dex',
    blockTitle: 'Principales DEX AMM (Pools Clásicas y Concentradas)',
    chains: ['BNB Chain', 'Ethereum', 'Arbitrum', 'Base', 'Aptos', 'Linea'],
    poolTypes: ['Pares Estándar V2', 'Liquidez Concentrada V3', 'Granjas de Yield (Farms)'],
    feeStructure: '0.01%, 0.05%, 0.25%, 1.00% con descuentos por staking de CAKE',
    dominantFeature: 'Líder absoluto de cuota y liquidez en BNB Chain con ecosistema de gamificación y farms.',
    description: 'El AMM dominante en BNB Chain y en franca expansión multicadena. Dispone de pools de pares estándar con alta liquidez, granjas de rendimiento (farms) con recompensas nativas y opciones avanzadas de liquidez concentrada en sus versiones recientes.',
    practicalUseCase: 'Operativa de bajo costo de gas en BNB Chain y generación de yield mediante programas de incentivos.',
    metric: 'Mayor volumen transaccional histórico de BNB Chain',
    url: 'https://pancakeswap.finance',
    keyTokens: ['CAKE', 'BNB', 'USDT', 'BTCB'],
    risksNotice: 'Emisiones inflacionarias continuas del token de recompensa CAKE y riesgo de dilución.'
  },
  {
    id: 'trader-joe-camelot',
    name: 'Trader Joe / Camelot / DEX Nativos L1/L2',
    shortName: 'Trader Joe & Camelot',
    category: 'amm-dex',
    blockTitle: 'Principales DEX AMM (Pools Clásicas y Concentradas)',
    chains: ['Avalanche', 'Arbitrum', 'BNB Chain'],
    poolTypes: ['Liquidity Book (Bins Discretos)', 'Pools Nitro con spNFTs', 'Comisiones Dinámicas'],
    feeStructure: 'Comisiones variables basadas en volatilidad y slippage cero dentro del bin',
    dominantFeature: 'Concentran la liquidez nativa local y ofrecen pools altamente incentivadas por las redes.',
    description: 'En cadenas y L2s específicas como Avalanche (Trader Joe) o Arbitrum (Camelot), estos DEX concentran la mayor parte de la liquidez local. Trader Joe introduce la arquitectura “Liquidity Book” con bins de precio de deslizamiento nulo, mientras Camelot ofrece pools altamente personalizadas e incentivadas para proyectos nativos.',
    practicalUseCase: 'Aprovechar la liquidez concentrada y recompensas específicas de ecosistemas Layer 1 y Layer 2 locales.',
    metric: 'Liderazgo en cuota nativa de ecosistemas Avalanche y Arbitrum',
    url: 'https://traderjoexyz.com',
    keyTokens: ['JOE', 'GRAIL', 'AVAX', 'ARB'],
    risksNotice: 'Dependencia de la actividad y subsidios locales de la red en la que se encuentran desplegados.'
  },

  // BLOQUE 2: Ecosistema Solana
  {
    id: 'raydium',
    name: 'Raydium',
    shortName: 'Raydium Protocol',
    category: 'solana',
    blockTitle: 'Ecosistema Solana',
    chains: ['Solana'],
    poolTypes: ['AMM Clásicas (x·y=k)', 'CLMM (Liquidez Concentrada)', 'OpenBook Orderbook Hybrid'],
    feeStructure: '~0.25% en pools estándar; variables (desde 0.01% a 2%) en CLMM',
    dominantFeature: 'El DEX más grande de Solana por volumen mensual (>35.600M USD).',
    description: 'El DEX más grande de Solana por volumen mensual (>35.600 millones de USD). Ofrece pools AMM clásicas (con comisión estándar de aprox. 0,25%) y pools CLMM (liquidez concentrada) con comisiones variables según el nivel de actividad y volatilidad del par.',
    practicalUseCase: 'Swaps ultra-rápidos, lanzamientos masivos de nuevos tokens SPL y provisión concentrada en pares SOL.',
    metric: '>35.600M USD de volumen mensual en Solana',
    url: 'https://raydium.io',
    keyTokens: ['RAY', 'SOL', 'USDC', 'JTO'],
    risksNotice: 'Elevada volatilidad en lanzamientos de tokens de baja capitalización y congestión en picos de red.'
  },
  {
    id: 'orca',
    name: 'Orca',
    shortName: 'Orca (Whirlpools)',
    category: 'solana',
    blockTitle: 'Ecosistema Solana',
    chains: ['Solana'],
    poolTypes: ['Whirlpools (Liquidez Concentrada)', 'Pools Estables de Baja Fricción'],
    feeStructure: 'Entre 0.01% y 1.00% según el par (0.01% en stables, 0.05% en SOL/USDC)',
    dominantFeature: 'Segundo DEX de Solana, pionero de Whirlpools (liquidez concentrada de alta eficiencia).',
    description: 'Segundo DEX en Solana, altamente especializado en Whirlpools (liquidez concentrada). Sus pools como SOL/USDC superan decenas de millones en TVL institucional; ofrece comisiones entre 0,01% y 1% según el perfil del par, con una UX pulida y optimizada para routing.',
    practicalUseCase: 'Máxima eficiencia de capital en pares clave de Solana (SOL/USDC, JitoSOL/SOL) con mínimo slippage.',
    metric: 'Pools institucionales como SOL/USDC con decenas de millones en TVL',
    url: 'https://www.orca.so',
    keyTokens: ['ORCA', 'SOL', 'USDC', 'JitoSOL'],
    risksNotice: 'Gestión activa continua requerida para evitar que el precio se desplace fuera del rango de los Whirlpools.'
  },

  // BLOQUE 3: Protocolos de yield y agregadores
  {
    id: 'beefy-yearn-autoshark',
    name: 'Beefy Finance, Yearn, AutoShark, etc.',
    shortName: 'Agregadores de Yield',
    category: 'yield-aggregator',
    blockTitle: 'Protocolos de Yield y Agregadores (Capas de Optimización)',
    chains: ['Multicadena (Ethereum, Arbitrum, Base, Optimism, BNB Chain, Polygon, etc.)'],
    poolTypes: ['Bóvedas Auto-Compound', 'Estrategias Multi-Pool', 'Vaults ERC-4626'],
    feeStructure: 'Comisiones de rendimiento (performance fee ~4-10% sobre ganancias cosechadas)',
    dominantFeature: 'Depositan automáticamente en pools de DEX y optimizan recompensas mediante reinversión continua.',
    description: 'Si tu objetivo es maximizar rendimiento sobre pools existentes, se emplean capas adicionales. Agregadores como Beefy Finance, Yearn Finance o AutoShark depositan de manera autónoma los tokens LP en contratos de staking, cosechan recompensas y las reinvierten (auto-compound) periódicamente, minimizando fricciones y gastos de gas.',
    practicalUseCase: 'Generar interés compuesto automático sin tener que reclamar y vender recompensas manualmente a diario.',
    metric: 'Automatización 100% de cosechas y cientos de estrategias simultáneas',
    url: 'https://beefy.com',
    keyTokens: ['BIFI', 'YFI', 'Vault LP Tokens'],
    risksNotice: 'Riesgo acumulativo de smart contract al superponer la capa del agregador sobre el DEX subyacente.'
  },
  {
    id: 'lido-rocket-jito-pendle',
    name: 'Lido, Rocket Pool, Jito, Pendle',
    shortName: 'LST & Tokenización de Yield',
    category: 'lst-yield',
    blockTitle: 'Protocolos de Yield y Agregadores (Capas de Optimización)',
    chains: ['Ethereum', 'Solana', 'Arbitrum', 'Mantle'],
    poolTypes: ['Staking Líquido (LST)', 'Staking Líquido con MEV', 'AMM de Tipos de Interés (PT/YT)'],
    feeStructure: '5% a 10% sobre las recompensas de staking de la red subyacente',
    dominantFeature: 'Sus tokens derivados (stETH, JitoSOL, PT/YT) sirven como activos fundamentales de las pools DEX.',
    description: 'Aunque su función primaria es el staking líquido y la tokenización de yield, a menudo sus tokens derivados (stETH de Lido, rETH de Rocket Pool, JitoSOL de Jito o PT/YT de Pendle) se emplean como los activos principales y más demandados dentro de las pools de liquidez en Curve, Uniswap, Raydium y Orca.',
    practicalUseCase: 'Obtener doble rendimiento: recompensa del staking base más comisiones de intercambio en los DEX.',
    metric: 'Respaldo del colateral de la mayor parte de las pools estables y pares mayores',
    url: 'https://lido.fi',
    keyTokens: ['stETH', 'rETH', 'JitoSOL', 'PT / YT (Pendle)'],
    risksNotice: 'Riesgo de descorrelación temporal (despeg de LST) respecto al activo subyacente en periodos de estrés de liquidez.'
  }
];

interface Props {
  onSelectPlatform?: (name: string) => void;
}

export const DexAmmEcosystemGuide: React.FC<Props> = ({ onSelectPlatform }) => {
  const [selectedBlock, setSelectedBlock] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeDirectLinksResource, setActiveDirectLinksResource] = useState<PlatformLinksResource | null>(null);
  const [isDirectLinksOpen, setIsDirectLinksOpen] = useState(false);
  const { isFavorite, toggleFavorite, sortWithFavoritesFirst } = useFavorites();

  // Close modals on ESC
  useEffect(() => {
    if (!isDirectLinksOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDirectLinksOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDirectLinksOpen]);

  // Criteria Quick Simulator State
  const [selectedChainCriteria, setSelectedChainCriteria] = useState<string>('all');
  const [selectedAssetCriteria, setSelectedAssetCriteria] = useState<string>('all');

  const openLinksFor = (e: React.MouseEvent, platformName: string) => {
    e.stopPropagation();
    const res = getLinksFor(platformName);
    if (res) {
      setActiveDirectLinksResource(res);
      setIsDirectLinksOpen(true);
    } else {
      // Fallback
      setActiveDirectLinksResource({
        id: platformName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        name: platformName,
        category: 'Plataforma DeFi',
        tag: 'Ecosistema DEX',
        badge: 'Recursos Oficiales',
        officialSite: 'https://defillama.com',
        summary: `Recursos y enlaces verificados de ${platformName}.`,
        links: [
          { label: 'DefiLlama Protocol Analytics', url: 'https://defillama.com', type: 'analytics', desc: 'Métricas de TVL y volumen agregado.' },
          { label: 'Documentación Oficial', url: 'https://ethereum.org/es/developers/docs/', type: 'docs', desc: 'Guías técnicas y arquitectura Web3.' }
        ]
      });
      setIsDirectLinksOpen(true);
    }
  };

  const filteredPlatforms = useMemo(() => {
    const list = DEX_AMM_PLATFORMS.filter(item => {
      const matchBlock = 
        selectedBlock === 'todos' ? true :
        selectedBlock === 'amm-dex' ? item.category === 'amm-dex' :
        selectedBlock === 'solana' ? item.category === 'solana' :
        selectedBlock === 'yield' ? (item.category === 'yield-aggregator' || item.category === 'lst-yield') : true;

      const matchSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.chains.some(c => c.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.dominantFeature.toLowerCase().includes(searchTerm.toLowerCase());

      return matchBlock && matchSearch;
    });

    return sortWithFavoritesFirst(list, (item) => item.name);
  }, [selectedBlock, searchTerm, sortWithFavoritesFirst]);

  return (
    <div className="bg-white border-2 border-gray-900 rounded-[2.5rem] p-6 sm:p-10 shadow-xl space-y-12">
      {/* Header */}
      <div className="border-b-2 border-gray-200 pb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full text-red-700 text-xs font-black uppercase tracking-wider">
            <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
            <span>Infraestructura de Intercambio & Liquidez On-Chain</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter text-gray-900 leading-none">
            Ecosistema de Plataformas DEX & AMM
          </h3>
          <p className="text-gray-700 text-base max-w-4xl leading-relaxed font-semibold">
            Análisis exhaustivo de creadores de mercado automatizados, redes de alta velocidad, capas de rendimiento y criterios sistemáticos para provisión de liquidez.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[260px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar DEX, red, token..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-700 transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-900"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs by Block */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 pb-4">
        {[
          { id: 'todos', label: 'Todos los Bloques' },
          { id: 'amm-dex', label: '1. DEX AMM Multicadena' },
          { id: 'solana', label: '2. Ecosistema Solana' },
          { id: 'yield', label: '3. Yield & Agregadores' },
          { id: 'criteria', label: '4. Criterios de Selección' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedBlock(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              selectedBlock === tab.id
                ? 'bg-gray-900 text-white shadow-md'
                : 'bg-gray-50 text-gray-600 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PLATFORMS DISPLAYED ACCORDING TO BLOCKS */}
      {selectedBlock !== 'criteria' && (
        <div className="space-y-12">
          {/* Bloque 1: DEX AMM */}
          {(selectedBlock === 'todos' || selectedBlock === 'amm-dex') && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-l-4 border-red-700 pl-4 py-1">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900">
                    Bloque 1: Principales DEX AMM (Pools Clásicas y Concentradas)
                  </h4>
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-wider">
                    Infraestructura fundacional en Ethereum, Capas 2 y cadenas compatibles con EVM
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPlatforms
                  .filter(p => p.category === 'amm-dex')
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onSelectPlatform?.(p.name)}
                      className="bg-white border-2 border-gray-200 hover:border-red-700 rounded-3xl p-6 sm:p-7 transition-all hover:shadow-xl group flex flex-col justify-between cursor-pointer space-y-5"
                    >
                      <div className="space-y-4">
                        {/* Header card */}
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-md">
                                {p.shortName}
                              </span>
                              {p.metric && (
                                <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-md">
                                  {p.metric}
                                </span>
                              )}
                            </div>
                            <h5 className="text-2xl font-black uppercase text-gray-900 group-hover:text-red-700 transition-colors">
                              {p.name}
                            </h5>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(p.name);
                              }}
                              className={`p-1.5 sm:p-2 rounded-xl border transition-all active:scale-90 ${
                                isFavorite(p.name)
                                  ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                                  : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:border-gray-300'
                              }`}
                              title={isFavorite(p.name) ? `Quitar ${p.name} de favoritos` : `Marcar ${p.name} como favorito`}
                              aria-label={`Favorito ${p.name}`}
                            >
                              <Star size={14} className={isFavorite(p.name) ? 'fill-red-700 text-red-700' : ''} />
                            </button>
                            <button
                              onClick={(e) => openLinksFor(e, p.name)}
                              className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-red-700 text-gray-700 hover:text-white border border-gray-200 transition-all flex items-center gap-1 text-[11px] font-black uppercase tracking-wider shadow-sm"
                              title={`Ver URLs y enlaces directos de ${p.name}`}
                            >
                              <Compass size={13} className="text-red-700 group-hover:text-white" />
                              <span>Links</span>
                            </button>
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-xl bg-gray-900 text-white hover:bg-red-700 transition-colors"
                              title={`Web oficial ${p.name}`}
                            >
                              <ExternalLink size={13} />
                            </a>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-semibold">
                          {p.description}
                        </p>

                        {/* Feature Banner */}
                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 space-y-1.5">
                          <span className="text-[10px] font-black uppercase text-red-700 tracking-wider block">
                            Característica Principal:
                          </span>
                          <p className="text-xs text-gray-900 font-bold">
                            {p.dominantFeature}
                          </p>
                        </div>

                        {/* Badges and details */}
                        <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 font-bold uppercase text-[11px] min-w-[70px]">Cadenas:</span>
                            <div className="flex flex-wrap gap-1">
                              {p.chains.map(c => (
                                <span key={c} className="bg-gray-100 text-gray-800 font-bold text-[10px] px-2 py-0.5 rounded">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 font-bold uppercase text-[11px] min-w-[70px]">Modelos:</span>
                            <span className="text-gray-800 font-semibold text-xs">{p.poolTypes.join(' · ')}</span>
                          </div>

                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 font-bold uppercase text-[11px] min-w-[70px]">Comisiones:</span>
                            <span className="text-gray-800 font-mono font-bold text-xs">{p.feeStructure}</span>
                          </div>
                        </div>
                      </div>

                      {/* Footer card with risks notice */}
                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                        <div className="flex items-center gap-1.5 text-red-700 font-bold text-[11px] uppercase">
                          <AlertTriangle size={13} />
                          <span className="truncate max-w-[280px]">{p.risksNotice}</span>
                        </div>
                        <span className="text-gray-900 group-hover:text-red-700 font-bold uppercase text-[10px] flex items-center gap-0.5">
                          Detalle <ChevronRight size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Bloque 2: Ecosistema Solana */}
          {(selectedBlock === 'todos' || selectedBlock === 'solana') && (
            <div className="space-y-6 pt-6 border-t-2 border-gray-100">
              <div className="flex items-center gap-3 border-l-4 border-gray-900 pl-4 py-1">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900">
                    Bloque 2: Ecosistema Solana (Alta Frecuencia & CLMM)
                  </h4>
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-wider">
                    Infraestructura de alta capacidad transaccional y liquidez concentrada en Solana
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPlatforms
                  .filter(p => p.category === 'solana')
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onSelectPlatform?.(p.name)}
                      className="bg-white border-2 border-gray-200 hover:border-gray-900 rounded-3xl p-6 sm:p-7 transition-all hover:shadow-xl group flex flex-col justify-between cursor-pointer space-y-5"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[10px] font-black uppercase tracking-wider bg-gray-900 text-white px-2.5 py-0.5 rounded-md">
                                {p.shortName}
                              </span>
                              {p.metric && (
                                <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-md">
                                  {p.metric}
                                </span>
                              )}
                            </div>
                            <h5 className="text-2xl font-black uppercase text-gray-900 group-hover:text-red-700 transition-colors">
                              {p.name}
                            </h5>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(p.name);
                              }}
                              className={`p-1.5 sm:p-2 rounded-xl border transition-all active:scale-90 ${
                                isFavorite(p.name)
                                  ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                                  : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:border-gray-300'
                              }`}
                              title={isFavorite(p.name) ? `Quitar ${p.name} de favoritos` : `Marcar ${p.name} como favorito`}
                              aria-label={`Favorito ${p.name}`}
                            >
                              <Star size={14} className={isFavorite(p.name) ? 'fill-red-700 text-red-700' : ''} />
                            </button>
                            <button
                              onClick={(e) => openLinksFor(e, p.name)}
                              className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-900 text-gray-700 hover:text-white border border-gray-200 transition-all flex items-center gap-1 text-[11px] font-black uppercase tracking-wider shadow-sm"
                              title={`Ver URLs y enlaces directos de ${p.name}`}
                            >
                              <Compass size={13} className="text-gray-900 group-hover:text-white" />
                              <span>Links</span>
                            </button>
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-xl bg-gray-900 text-white hover:bg-red-700 transition-colors"
                              title={`Web oficial ${p.name}`}
                            >
                              <ExternalLink size={13} />
                            </a>
                          </div>
                        </div>

                        <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-semibold">
                          {p.description}
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 space-y-1.5">
                          <span className="text-[10px] font-black uppercase text-gray-700 tracking-wider block">
                            Rol Estratégico en Solana:
                          </span>
                          <p className="text-xs text-gray-900 font-bold">
                            {p.dominantFeature}
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 font-bold uppercase text-[11px] min-w-[70px]">Mecanismo:</span>
                            <span className="text-gray-800 font-semibold text-xs">{p.poolTypes.join(' · ')}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 font-bold uppercase text-[11px] min-w-[70px]">Tarifas:</span>
                            <span className="text-gray-800 font-mono font-bold text-xs">{p.feeStructure}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 font-bold uppercase text-[11px] min-w-[70px]">Pares Clave:</span>
                            <span className="text-gray-800 font-bold text-xs">{p.keyTokens?.join(' · ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                        <div className="flex items-center gap-1.5 text-gray-700 font-bold text-[11px] uppercase">
                          <AlertTriangle size={13} />
                          <span className="truncate max-w-[280px]">{p.risksNotice}</span>
                        </div>
                        <span className="text-gray-900 group-hover:text-red-700 font-bold uppercase text-[10px] flex items-center gap-0.5">
                          Detalle <ChevronRight size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Bloque 3: Yield y Agregadores */}
          {(selectedBlock === 'todos' || selectedBlock === 'yield') && (
            <div className="space-y-6 pt-6 border-t-2 border-gray-100">
              <div className="flex items-center gap-3 border-l-4 border-red-700 pl-4 py-1">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-gray-900">
                    Bloque 3: Protocolos de Yield y Agregadores (Capas Adicionales)
                  </h4>
                  <p className="text-gray-600 text-xs font-bold uppercase tracking-wider">
                    Optimización de recompensas, auto-compound de pools de liquidez y tokenización de flujos
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPlatforms
                  .filter(p => p.category === 'yield-aggregator' || p.category === 'lst-yield')
                  .map((p) => (
                    <div
                      key={p.id}
                      onClick={() => onSelectPlatform?.(p.name)}
                      className="bg-white border-2 border-gray-200 hover:border-red-700 rounded-3xl p-6 sm:p-7 transition-all hover:shadow-xl group flex flex-col justify-between cursor-pointer space-y-5"
                    >
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[10px] font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-md">
                                {p.shortName}
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-md">
                                Capa de Optimización
                              </span>
                            </div>
                            <h5 className="text-2xl font-black uppercase text-gray-900 group-hover:text-red-700 transition-colors">
                              {p.name}
                            </h5>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(p.name);
                              }}
                              className={`p-1.5 sm:p-2 rounded-xl border transition-all active:scale-90 ${
                                isFavorite(p.name)
                                  ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                                  : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:border-gray-300'
                              }`}
                              title={isFavorite(p.name) ? `Quitar ${p.name} de favoritos` : `Marcar ${p.name} como favorito`}
                              aria-label={`Favorito ${p.name}`}
                            >
                              <Star size={14} className={isFavorite(p.name) ? 'fill-red-700 text-red-700' : ''} />
                            </button>
                            <button
                              onClick={(e) => openLinksFor(e, p.name)}
                              className="px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-red-700 text-gray-700 hover:text-white border border-gray-200 transition-all flex items-center gap-1 text-[11px] font-black uppercase tracking-wider shadow-sm"
                              title={`Ver URLs y enlaces directos de ${p.name}`}
                            >
                              <Compass size={13} className="text-red-700 group-hover:text-white" />
                              <span>Links</span>
                            </button>
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1.5 rounded-xl bg-gray-900 text-white hover:bg-red-700 transition-colors"
                              title={`Web oficial ${p.name}`}
                            >
                              <ExternalLink size={13} />
                            </a>
                          </div>
                        </div>

                        <p className="text-gray-800 text-sm sm:text-base leading-relaxed font-semibold">
                          {p.description}
                        </p>

                        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 space-y-1.5">
                          <span className="text-[10px] font-black uppercase text-red-700 tracking-wider block">
                            Mecánica de Optimización:
                          </span>
                          <p className="text-xs text-gray-900 font-bold">
                            {p.dominantFeature}
                          </p>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 font-bold uppercase text-[11px] min-w-[70px]">Estrategias:</span>
                            <span className="text-gray-800 font-semibold text-xs">{p.poolTypes.join(' · ')}</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-gray-500 font-bold uppercase text-[11px] min-w-[70px]">Tokens Base:</span>
                            <span className="text-gray-800 font-bold text-xs">{p.keyTokens?.join(' · ')}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
                        <div className="flex items-center gap-1.5 text-red-700 font-bold text-[11px] uppercase">
                          <ShieldAlert size={13} />
                          <span className="truncate max-w-[280px]">{p.risksNotice}</span>
                        </div>
                        <span className="text-gray-900 group-hover:text-red-700 font-bold uppercase text-[10px] flex items-center gap-0.5">
                          Detalle <ChevronRight size={12} />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Bloque 4: Criterios Rápidos para Elegir Plataforma */}
      {(selectedBlock === 'todos' || selectedBlock === 'criteria') && (
        <div className="space-y-8 pt-8 border-t-4 border-gray-900">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-red-700">
                <Scale size={16} />
                <span>Matriz de Decisión Operativa</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-gray-900">
                Bloque 4: Criterios Rápidos para Elegir Plataforma
              </h4>
              <p className="text-gray-600 text-xs sm:text-sm font-semibold max-w-3xl">
                Guía sistemática para seleccionar la infraestructura óptima según cadena, perfil de activo, estructura de comisiones y tolerancia a riesgos estructurales.
              </p>
            </div>
          </div>

          {/* 4 Cards Grid of Criteria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Criterio 1: Cadena donde operas */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-7 space-y-4 hover:border-red-700 transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-50 text-red-700 rounded-2xl border border-red-100">
                  <Network size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-700">Criterio 1</span>
                  <h5 className="text-lg font-black uppercase text-gray-900">Cadena donde operas</h5>
                </div>
              </div>

              <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                La selección del DEX depende directamente del entorno de ejecución, la profundidad de liquidez disponible y el coste de gas de la red:
              </p>

              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-gray-600 uppercase">Ethereum y Capas 2 (Arbitrum, Optimism, Base)</span>
                  <span className="text-xs font-black text-gray-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                    Uniswap, Curve, Balancer
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-gray-600 uppercase">BNB Chain</span>
                  <span className="text-xs font-black text-gray-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                    PancakeSwap
                  </span>
                </div>
                <div className="p-3 bg-gray-50 rounded-2xl border border-gray-200 flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-gray-600 uppercase">Solana (Alta velocidad)</span>
                  <span className="text-xs font-black text-gray-900 bg-white px-2.5 py-1 rounded-lg border border-gray-200">
                    Raydium / Orca
                  </span>
                </div>
              </div>
            </div>

            {/* Criterio 2: Tipo de activos */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-7 space-y-4 hover:border-gray-900 transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 text-gray-900 rounded-2xl border border-gray-200">
                  <Coins size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Criterio 2</span>
                  <h5 className="text-lg font-black uppercase text-gray-900">Tipo de Activos a Operar</h5>
                </div>
              </div>

              <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                El comportamiento de correlación de los tokens dicta el algoritmo matemático idóneo para evitar pérdidas por deslizamiento:
              </p>

              <div className="space-y-2.5 pt-2 border-t border-gray-100">
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-gray-900">Stablecoins y LST (stETH, EURC, USDC)</span>
                    <span className="text-xs font-black text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">Curve Finance</span>
                  </div>
                  <p className="text-[11px] text-gray-600 font-semibold">
                    Curva Stableswap diseñada para minimizar el deslizamiento en activos con paridad 1:1 o correlación estrecha.
                  </p>
                </div>

                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase text-gray-900">Pares Volátiles (ETH/USDC, SOL/USDC)</span>
                    <span className="text-xs font-black text-gray-900 bg-white border border-gray-200 px-2 py-0.5 rounded">Uniswap V3 / Orca Whirlpools</span>
                  </div>
                  <p className="text-[11px] text-gray-600 font-semibold">
                    Modelos de liquidez concentrada donde el proveedor delimita el rango para multiplicar comisiones por volumen.
                  </p>
                </div>
              </div>
            </div>

            {/* Criterio 3: Comisiones e incentivos */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-7 space-y-4 hover:border-red-700 transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-50 text-red-700 rounded-2xl border border-red-100">
                  <TrendingUp size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-700">Criterio 3</span>
                  <h5 className="text-lg font-black uppercase text-gray-900">Comisiones e Incentivos (Yield)</h5>
                </div>
              </div>

              <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                Evaluar el balance entre los costes de intercambio retenidos por el pool y las recompensas suplementarias:
              </p>

              <ul className="space-y-2 pt-2 border-t border-gray-100 text-xs font-semibold text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <span><strong>Tarifas del pool (Swap Fees):</strong> Revisa el porcentaje de comisión directa (0.01%, 0.05%, 0.30% o 1.00%) que cobran los LPs en cada operación.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <span><strong>Recompensas en tokens nativos:</strong> Verifica si la plataforma ofrece programas de liquidez incentivada (Liquidity Mining) pagados en tokens del protocolo (UNI, CAKE, CRV, RAY).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
                  <span><strong>Emisiones (Farms) & APR:</strong> Diferencia entre el APR orgánico (por volumen real de trading) y el APR inflacionario generado por emisión de tokens.</span>
                </li>
              </ul>
            </div>

            {/* Criterio 4: Riesgos Estructurales */}
            <div className="bg-white border-2 border-gray-200 rounded-3xl p-6 sm:p-7 space-y-4 hover:border-gray-900 transition-colors shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gray-100 text-gray-900 rounded-2xl border border-gray-200">
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Criterio 4</span>
                  <h5 className="text-lg font-black uppercase text-gray-900">Gestión de Riesgos Críticos</h5>
                </div>
              </div>

              <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                Todo proveedor de liquidez debe auditar rigurosamente las 4 dimensiones de riesgo previas al depósito:
              </p>

              <div className="space-y-2 pt-2 border-t border-gray-100 text-xs font-semibold text-gray-800">
                <div className="p-2.5 bg-red-50/50 rounded-xl border border-red-100">
                  <span className="font-black text-red-700 block uppercase text-[11px]">1. Impermanent Loss (Pérdida Impermanente)</span>
                  <span className="text-gray-700">Pérdida de valor en pools volátiles respecto a haber mantenido los tokens individualmente en la wallet.</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-black text-gray-900 block uppercase text-[11px]">2. Riesgo de Smart Contract</span>
                  <span className="text-gray-700">Vulnerabilidades en el código del AMM o en las capas agregadoras que puedan permitir exploits o drenaje de fondos.</span>
                </div>
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-black text-gray-900 block uppercase text-[11px]">3. Emisiones Inflacionarias & Gobernanza</span>
                  <span className="text-gray-700">Riesgo de devaluación del token de recompensa por sobre-emisión o decisiones adversas de gobernanza DAO.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Fast Decision Guide */}
          <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-gray-200 pb-4">
              <div>
                <h5 className="text-lg font-black uppercase text-gray-900">
                  Recomendador Rápido de Plataforma Según Tu Caso de Uso
                </h5>
                <p className="text-xs text-gray-600 font-semibold">
                  Selecciona tu cadena y el tipo de activo para ver la plataforma y estrategia recomendada.
                </p>
              </div>
              <span className="text-[10px] font-black uppercase bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full">
                Guía Operativa Instantánea
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-black uppercase text-gray-500 block mb-2">1. Cadena de Operación</label>
                <select
                  value={selectedChainCriteria}
                  onChange={(e) => setSelectedChainCriteria(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-red-700"
                >
                  <option value="all">Todas las Cadenas</option>
                  <option value="eth-l2">Ethereum / L2s (Arbitrum, Base, Optimism)</option>
                  <option value="bnb">BNB Chain</option>
                  <option value="solana">Solana</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-black uppercase text-gray-500 block mb-2">2. Tipo de Activo</label>
                <select
                  value={selectedAssetCriteria}
                  onChange={(e) => setSelectedAssetCriteria(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-bold text-gray-900 focus:outline-none focus:border-red-700"
                >
                  <option value="all">Cualquier Tipo de Par</option>
                  <option value="stables">Stablecoins / LST (Paritarios o Correlacionados)</option>
                  <option value="volatile">Pares Volátiles Mayores (ETH, SOL, BTC)</option>
                  <option value="yield-max">Búsqueda de Auto-Compound & Yield Máximo</option>
                </select>
              </div>

              <div className="flex flex-col justify-end">
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                  <span className="text-[10px] font-black uppercase text-red-700 block">Recomendación Directa:</span>
                  <p className="text-xs font-black text-gray-900 truncate">
                    {selectedChainCriteria === 'solana'
                      ? selectedAssetCriteria === 'stables' ? 'Orca Whirlpools (Pares Stables)' : 'Raydium (CLMM) / Orca'
                      : selectedChainCriteria === 'bnb'
                      ? 'PancakeSwap V3 + AutoShark'
                      : selectedAssetCriteria === 'stables'
                      ? 'Curve Finance (Stableswap)'
                      : selectedAssetCriteria === 'yield-max'
                      ? 'Beefy Finance / Yearn sobre Uniswap'
                      : 'Uniswap V3 / Balancer (Multi-token)'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Direct Links Modal */}
      {activeDirectLinksResource && (
        <DirectLinksModal
          isOpen={isDirectLinksOpen}
          onClose={() => setIsDirectLinksOpen(false)}
          resource={activeDirectLinksResource}
        />
      )}
    </div>
  );
};
