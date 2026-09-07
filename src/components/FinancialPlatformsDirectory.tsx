import React, { useState, useMemo } from 'react';
import { 
  ExternalLink, Compass, Info, Search, Globe, Activity, 
  BarChart3, LineChart, Database, Network, Bot, 
  Layers, ShieldCheck, Zap, RefreshCw, Cpu, 
  ArrowRightLeft, Sparkles, CheckCircle2, ChevronRight, Terminal, Star
} from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';

export interface FinancialPlatformItem {
  id: string;
  name: string;
  shortName: string;
  url: string;
  blockId: 1 | 2 | 3 | 4;
  blockTitle: string;
  categoryTag: string;
  icon: React.ReactNode;
  summary: string;
  detailedExplanation: string;
  keyFeatures: string[];
  operationalRole: string;
  fiatVsDefiContext: string;
}

export const FINANCIAL_PLATFORMS_DATA: FinancialPlatformItem[] = [
  // --- BLOQUE 1: ANALÍTICA ON-CHAIN & MÉTRICAS CRIPTO ---
  {
    id: 'defillama',
    name: 'DefiLlama',
    shortName: 'DefiLlama',
    url: 'https://defillama.com/',
    blockId: 1,
    blockTitle: 'Bloque 1 • Analítica On-Chain, Métricas de Protocolos & Agregadores Cripto',
    categoryTag: 'Analítica On-Chain & TVL',
    icon: <Database className="text-red-700" size={24} />,
    summary: 'La mayor base de datos abierta, neutral y verificable del ecosistema descentralizado global.',
    detailedExplanation: 'DefiLlama es la infraestructura de referencia en inteligencia on-chain. Rastrea el Valor Total Bloqueado (TVL), comisiones acumuladas, ingresos reales generados por protocolos, tesorerías de DAOs, emisiones de stablecoins, liquidaciones en préstamos y rendimientos (yields) a lo largo de cientos de blockchains. Su código es de código abierto y no acepta pagos por patrocinios de ranking, garantizando datos limpios sin sesgo comercial.',
    keyFeatures: [
      'Rastreo de TVL histórico en más de 200 blockchains y miles de protocolos.',
      'Desglose de comisiones (fees) e ingresos netos diarios de cada dApp.',
      'Monitor en tiempo real de capitalización y flujos de stablecoins (USDT, USDC, USDS, EURC).',
      'Directorio de hackeos, exploits y pérdidas de seguridad auditadas.'
    ],
    operationalRole: 'Auditoría macro de liquidez, validación de solvencia de protocolos y cálculo del ratio P/S (Price to Sales) on-chain.',
    fiatVsDefiContext: 'Equivalente a una combinación abierta de Bloomberg y bancos centrales con transparencia 100% auditable bloque a bloque.'
  },
  {
    id: 'glassnode',
    name: 'Glassnode Studio',
    shortName: 'Glassnode',
    url: 'https://studio.glassnode.com/home',
    blockId: 1,
    blockTitle: 'Bloque 1 • Analítica On-Chain, Métricas de Protocolos & Agregadores Cripto',
    categoryTag: 'Inteligencia Forense & Econometría',
    icon: <Activity className="text-gray-900" size={24} />,
    summary: 'Terminal econométrica institucional de métricas on-chain, modelos de valoración y flujos de ballenas.',
    detailedExplanation: 'Glassnode Studio procesa datos en bruto de las cadenas de bloques más importantes (Bitcoin, Ethereum) para generar indicadores matemáticos avanzados sobre el comportamiento de los inversores. Permite analizar el coste base de acumulación (Realized Cap), métricas de rentabilidad (MVRV Ratio, SOPR), flujos netos hacia y desde exchanges, balances de mineros y la oferta en manos de tenedores a largo plazo (Long-Term Holders vs Short-Term Holders).',
    keyFeatures: [
      'Métricas econométricas clave: MVRV, SOPR, NUPL, Puell Multiple y Reserve Risk.',
      'Monitoreo de flujos de depósitos y retiros en exchanges centralizados.',
      'Segmentación por cohortes de billeteras (camarones, tiburones y ballenas).',
      'Análisis del ciclo de mercado y absorción de oferta tras los halvings de Bitcoin.'
    ],
    operationalRole: 'Detección temprana de techos/suelos de ciclo, estrés de liquidez institucional y análisis fundamental de redes.',
    fiatVsDefiContext: 'Sustituye a los informes macroeconómicos de la Reserva Federal con telemetría criptográfica en tiempo real.'
  },
  {
    id: 'coinmarketcap',
    name: 'CoinMarketCap',
    shortName: 'CoinMarketCap',
    url: 'https://coinmarketcap.com/es/',
    blockId: 1,
    blockTitle: 'Bloque 1 • Analítica On-Chain, Métricas de Protocolos & Agregadores Cripto',
    categoryTag: 'Agregador de Mercado Global',
    icon: <BarChart3 className="text-red-700" size={24} />,
    summary: 'El portal de precios, capitalizaciones y rankings de criptoactivos más visitado a nivel internacional.',
    detailedExplanation: 'CoinMarketCap consolida cotizaciones de miles de pares comerciales en casas de cambio centralizadas (CEX) y descentralizadas (DEX). Proporciona el ranking ponderado por capitalización de mercado, volúmenes de 24 horas, datos de suministro circulante y máximo, gráficos históricos completos, métricas de dominancia de Bitcoin y el índice de Miedo y Avaricia (Fear & Greed Index).',
    keyFeatures: [
      'Precios spot ponderados por volumen mundial con conversión multi-divisa.',
      'Rankings de solvencia y liquidez de exchanges (Proof of Reserves).',
      'Seguimiento de tendencias, categorías temáticas (L2s, RWA, AI tokens, DeFi) y airdrops.',
      'Herramienta de seguimiento de cartera personal con alertas de precio.'
    ],
    operationalRole: 'Exploración rápida de cotizaciones, validación de liquidez de exchanges y cálculo de dominancia de mercado.',
    fiatVsDefiContext: 'Cumple el papel de las pizarras de índices mundiales como Dow Jones o S&P aplicadas a toda la criptoeconomía.'
  },
  {
    id: 'cryptoboard',
    name: 'Cryptoboard',
    shortName: 'Cryptoboard',
    url: 'https://cryptoboard-psi.vercel.app/dashboard',
    blockId: 1,
    blockTitle: 'Bloque 1 • Analítica On-Chain, Métricas de Protocolos & Agregadores Cripto',
    categoryTag: 'Dashboard Ejecutivo Cripto',
    icon: <Terminal className="text-gray-900" size={24} />,
    summary: 'Panel de control interactivo para seguimiento ágil y condensado de carteras y mercados.',
    detailedExplanation: 'Cryptoboard es una interfaz web ligera diseñada para operadores y analistas que requieren una vista sintética y sin ruido de los principales indicadores de mercado y posiciones. Presenta widgets interactivos, cotizaciones en vivo y gráficos de tendencia que facilitan la toma de decisiones ágil sin sobrecarga publicitaria ni intermediaciones innecesarias.',
    keyFeatures: [
      'Dashboard limpio optimizado para monitoreo continuo en pantallas operativas.',
      'Seguimiento de métricas clave consolidadas en una única vista ejecutiva.',
      'Carga instantánea sin latencia con foco en la usabilidad directa del usuario.'
    ],
    operationalRole: 'Monitor de cabecera para seguimiento intradiario de variaciones porcentuales y salud de carteras.',
    fiatVsDefiContext: 'Alternativa ágil frente a interfaces bancarias tradicionales lentas con accesos biométricos burocráticos.'
  },
  {
    id: 'coinglass',
    name: 'Coinglass',
    shortName: 'Coinglass',
    url: 'https://www.coinglass.com/es',
    blockId: 1,
    blockTitle: 'Bloque 1 • Analítica On-Chain, Métricas de Protocolos & Agregadores Cripto',
    categoryTag: 'Derivados, Futuros & Liquidaciones',
    icon: <LineChart className="text-red-700" size={24} />,
    summary: 'Terminal analítica líder mundial en derivados: mapas de calor de liquidaciones, open interest, funding rates y ratios long/short.',
    detailedExplanation: 'Coinglass es la infraestructura analítica especializada en los mercados de futuros y derivados de criptomonedas. Proporciona telemetría en tiempo real sobre liquidaciones forzosas en Binance, Bybit, OKX y DEXs como Hyperliquid, calculando el Interés Abierto (Open Interest), tasas de financiación (Funding Rates) y mapas de calor (Liquidation Heatmaps) que muestran las zonas de acumulación de stops y liquidaciones donde el precio tiende a ser atraído.',
    keyFeatures: [
      'Mapa de Calor de Liquidaciones (Liquidation Heatmap) que identifica los cúmulos de precios magnéticos.',
      'Monitor en vivo de volumen de liquidaciones en 24h diferenciando posiciones Long vs. Short.',
      'Seguimiento agregado de Interés Abierto (Open Interest) y flujos de capital en derivados.',
      'Comparativa de Tasas de Financiación (Funding Rates) para arbitraje de tasas y costes de apalancamiento.',
      'Ratios de posicionamiento Long/Short en cuentas institucionales y traders destacados.'
    ],
    operationalRole: 'Detección de barridos de liquidez, estimación de riesgo de liquidaciones en cascada y calibración de apalancamiento prudente.',
    fiatVsDefiContext: 'Equivale a los informes consolidados del CME Group y cámaras de compensación tradicionales, pero con telemetría en tiempo real y acceso público sin barreras de suscripción.'
  },

  // --- BLOQUE 2: TERMINALES BURSÁTILES, ANÁLISIS TÉCNICO & MACROECONOMÍA GLOBAL ---
  {
    id: 'tradingview',
    name: 'TradingView',
    shortName: 'TradingView',
    url: 'https://es.tradingview.com',
    blockId: 2,
    blockTitle: 'Bloque 2 • Terminales Bursátiles, Análisis Técnico & Macroeconomía Global',
    categoryTag: 'Graficación Avanzada & Pine Script',
    icon: <LineChart className="text-red-700" size={24} />,
    summary: 'La plataforma líder mundial en graficación interactiva, análisis técnico multi-mercado y algoritmos.',
    detailedExplanation: 'TradingView es el estándar universal para analistas técnicos y operadores cuantitativos. Cubre acciones, índices bursátiles, materias primas, Forex, bonos soberanos y criptoactivos en una misma plataforma basada en navegador. Permite programar indicadores y estrategias automáticas mediante su lenguaje propio Pine Script, realizar backtesting riguroso y compartir tesis de inversión con millones de usuarios.',
    keyFeatures: [
      'Gráficos vectoriales de máxima fluidez con cientos de indicadores técnicos y figuras geométricas.',
      'Entorno de desarrollo integrado (IDE) Pine Script para crear sistemas cuantitativos.',
      'Screener multi-activo con filtros por ratios de valoración, RSI, medias móviles y volumen.',
      'Alertas en la nube basadas en condiciones de precio, cruces de medias y eventos técnicos.'
    ],
    operationalRole: 'Diseño de estrategias de trading, análisis de soporte/resistencia y correlación multi-activo en tiempo real.',
    fiatVsDefiContext: 'La herramienta que unificó el análisis técnico entre Wall Street y las finanzas descentralizadas Web3.'
  },
  {
    id: 'prorealtime',
    name: 'ProRealTime',
    shortName: 'ProRealTime',
    url: 'https://www.prorealtime.com/',
    blockId: 2,
    blockTitle: 'Bloque 2 • Terminales Bursátiles, Análisis Técnico & Macroeconomía Global',
    categoryTag: 'Terminal Institucional & Trading',
    icon: <Cpu className="text-gray-900" size={24} />,
    summary: 'Software bursátil profesional de alta precisión con datos tick a tick y ejecución directa con brokers.',
    detailedExplanation: 'ProRealTime es una estación de trabajo bursátil preferida por operadores profesionales e institucionales en Europa. Se distingue por la altísima calidad de sus flujos de datos en tiempo real (tick a tick sin filtrado), su potente módulo ProScreener para detección automática de configuraciones de mercado complejas y su conexión directa para operar desde el gráfico con brokers como Interactive Brokers y Saxo Bank.',
    keyFeatures: [
      'Alimentación de datos de mercado institucional tick a tick de latencia ultra-baja.',
      'ProScreener: motor de escaneo de todo el mercado en tiempo real según criterios técnicos propios.',
      'ProBuilder & ProBacktest: desarrollo y simulación de trading algorítmico automatizado.',
      'Detección automática de líneas de tendencia y canales con tecnología ProRealTrend.'
    ],
    operationalRole: 'Trading profesional en mercados de acciones, futuros y divisas con ejecución rigurosa de órdenes.',
    fiatVsDefiContext: 'Representa el estándar de software de alta gama en finanzas tradicionales (TradFi).'
  },
  {
    id: 'investing',
    name: 'Investing.com España',
    shortName: 'Investing.com',
    url: 'https://es.investing.com',
    blockId: 2,
    blockTitle: 'Bloque 2 • Terminales Bursátiles, Análisis Técnico & Macroeconomía Global',
    categoryTag: 'Portal Macro & Calendario Económico',
    icon: <Globe className="text-red-700" size={24} />,
    summary: 'Portal global de información financiera, bonos soberanos, materias primas y calendario macroeconómico.',
    detailedExplanation: 'Investing.com es una de las mayores plataformas de seguimiento macroeconómico del mundo. Es célebre por su Calendario Económico en tiempo real, donde se publican las decisiones de tipos de interés de la Fed, el BCE y el Banco de Japón, datos de inflación (IPC), empleo (NFP) y PIB. Además, proporciona seguimiento exhaustivo de la curva de tipos de bonos del Estado (10Y, 2Y) y futuros de materias primas.',
    keyFeatures: [
      'Calendario económico en vivo con niveles de impacto, consenso de analistas y dato previo/real.',
      'Monitoreo de rendimientos de bonos gubernamentales (EE.UU., Alemania, España, etc.).',
      'Cotizaciones de petróleo Brent/WTI, oro, plata, cobre y gas natural.',
      'Noticias macroeconómicas de última hora y cobertura geopolítica de mercados.'
    ],
    operationalRole: 'Anticipación a anuncios de política monetaria, gestión de riesgo macroeconómico y seguimiento de renta fija.',
    fiatVsDefiContext: 'Mide las variables del dinero fiduciario e inflación que impulsan la adopción de coberturas en activos duros (BTC, DeFi).'
  },
  {
    id: 'yahoo-finance',
    name: 'Yahoo Finanzas',
    shortName: 'Yahoo Finanzas',
    url: 'https://es.finance.yahoo.com',
    blockId: 2,
    blockTitle: 'Bloque 2 • Terminales Bursátiles, Análisis Técnico & Macroeconomía Global',
    categoryTag: 'Análisis Fundamental & Estados Contables',
    icon: <BarChart3 className="text-gray-900" size={24} />,
    summary: 'La plataforma clásica de referencia para consultar estados financieros, balances corporativos y ratios bursátiles.',
    detailedExplanation: 'Yahoo Finanzas proporciona un acceso exhaustivo y gratuito a los estados contables de miles de corporaciones cotizadas en todo el mundo. Permite auditar balances de situación, cuentas de pérdidas y ganancias, flujo de caja operativo y libre (Free Cash Flow), ratios clave de valoración (PER, Price to Book, EV/EBITDA) y la estructura accionarial y de compensación de directivos.',
    keyFeatures: [
      'Balances y cuentas de resultados auditadas de los últimos ejercicios y trimestres.',
      'Ratios de rentabilidad sobre capital (ROE, ROA, margen operativo y margen neto).',
      'Consenso de recomendaciones y precios objetivo de analistas de inversión.',
      'Histórico de dividendos, fechas de corte y ratios de reparto (payout).'
    ],
    operationalRole: 'Valoración fundamental clásica de empresas por descuento de flujos y múltiplos comparables.',
    fiatVsDefiContext: 'Representa el análisis contable regulado tradicional que en DeFi se sustituye por métricas on-chain en Token Terminal y DefiLlama.'
  },
  {
    id: 'msn-dinero',
    name: 'MSN Dinero',
    shortName: 'MSN Dinero',
    url: 'https://www.msn.com/es-es/dinero',
    blockId: 2,
    blockTitle: 'Bloque 2 • Terminales Bursátiles, Análisis Técnico & Macroeconomía Global',
    categoryTag: 'Agregador Financiero & Actualidad',
    icon: <Globe className="text-red-700" size={24} />,
    summary: 'Hub de actualidad económica, seguimiento de bolsas globales y herramientas de finanzas personales de Microsoft.',
    detailedExplanation: 'MSN Dinero (Microsoft Start Dinero) integra noticias de las principales agencias económicas internacionales (Reuters, Bloomberg, EFE) junto con cotizaciones bursátiles globales, tablas de divisas, alertas de inflación y herramientas de cálculo de hipotecas y ahorro personal para inversores particulares.',
    keyFeatures: [
      'Agregación de noticias económicas de alta credibilidad en español.',
      'Resúmenes visuales de apertura y cierre de las principales bolsas mundiales.',
      'Convertidor de divisas fiat oficial con tipos de cambio cruzados en directo.'
    ],
    operationalRole: 'Monitoreo de noticias financieras generales y pulso de opinión económica del inversor minorista.',
    fiatVsDefiContext: 'Canal informativo mainstream que refleja el sentimiento social respecto al sistema bancario y los tipos de interés.'
  },
  {
    id: 'google-finance',
    name: 'Google Finance (Beta)',
    shortName: 'Google Finance',
    url: 'https://www.google.com/finance/beta',
    blockId: 2,
    blockTitle: 'Bloque 2 • Terminales Bursátiles, Análisis Técnico & Macroeconomía Global',
    categoryTag: 'Seguimiento Bursátil Ágil',
    icon: <Sparkles className="text-gray-900" size={24} />,
    summary: 'Herramienta de búsqueda y seguimiento bursátil ágil de Google con interfaz moderna y listas interactivas.',
    detailedExplanation: 'Google Finance (en su versión renovada Beta) ofrece una experiencia de usuario extremadamente rápida y minimalista. Permite crear listas de seguimiento sincronizadas con la cuenta de Google, comparar gráficamente el rendimiento de múltiples índices o acciones en un solo clic y recibir contextualización informativa de eventos clave que explican movimientos de precio repentinos.',
    keyFeatures: [
      'Comparativa gráfica multi-activo inmediata en intervalos de 1D, 5D, 1M, YTD y MAX.',
      'Listas de seguimiento integradas en el ecosistema de búsqueda de Google.',
      'Desglose contextual de noticias que correlacionan con la volatilidad intradiaria.'
    ],
    operationalRole: 'Comprobación instantánea de cotizaciones y comparación de rentabilidad relativa entre activos tradicionales.',
    fiatVsDefiContext: 'Visión rápida de los mercados fiduciarios con la infraestructura de indexación y velocidad de Google.'
  },

  // --- BLOQUE 3: META-AGREGACIÓN CROSS-CHAIN, GESTIÓN DE LIQUIDEZ AMM & PORTAFOLIOS WEB3 ---
  {
    id: 'jumper-exchange',
    name: 'Jumper Exchange (by LI.FI)',
    shortName: 'Jumper Exchange',
    url: 'https://jumper.exchange/es',
    blockId: 3,
    blockTitle: 'Bloque 3 • Meta-Agregación Cross-Chain, Gestión de Liquidez AMM & Portafolios Web3',
    categoryTag: 'Meta-Agregador Cross-Chain',
    icon: <ArrowRightLeft className="text-red-700" size={24} />,
    summary: 'El meta-agregador definitivo de puentes y DEXs: intercambia cualquier token entre decenas de blockchains.',
    detailedExplanation: 'Jumper Exchange, construido sobre el protocolo LI.FI, es el principal meta-agregador del ecosistema Web3. Conecta decenas de puentes (Stargate, Across, Connext, Hop, Circle CCTP) y agregadores de DEX (1inch, Uniswap, Paraswap). Cuando un usuario desea mover o cambiar un activo de una blockchain a otra (por ejemplo de Ethereum a Solana, Arbitrum o Polygon), Jumper calcula algorítmicamente la ruta óptima considerando coste de gas, comisiones de puente, deslizamiento de precio y velocidad de finalidad.',
    keyFeatures: [
      'Enrutamiento inteligente multicadena entre Ethereum, Arbitrum, Optimism, Solana, Base, BNB Chain, etc.',
      'Swaps cross-chain en una sola transacción sin necesidad de puentear manualmente y luego cambiar en DEX.',
      'Integración con Circle CCTP para transferencias nativas de USDC sin riesgo de tokens envueltos (wrapped).',
      'Algoritmo anti-MEV y optimización de costes de gas en capas 2.'
    ],
    operationalRole: 'Movilización fluida de capital entre ecosistemas blockchain con la máxima eficiencia y menor fricción operativa.',
    fiatVsDefiContext: 'Sustituye la red SWIFT interbancaria por una red de enrutamiento criptográfico transparente y completada en segundos.'
  },
  {
    id: 'revert-finance',
    name: 'Revert Finance',
    shortName: 'Revert Finance',
    url: 'https://revert.finance',
    blockId: 3,
    blockTitle: 'Bloque 3 • Meta-Agregación Cross-Chain, Gestión de Liquidez AMM & Portafolios Web3',
    categoryTag: 'Optimización de Liquidez AMM V3',
    icon: <RefreshCw className="text-gray-900" size={24} />,
    summary: 'Suite analítica y operativa profesional para proveedores de liquidez (LP) en creadores de mercado concentrado.',
    detailedExplanation: 'Revert Finance es la herramienta indispensable para quienes gestionan capital en pools de liquidez concentrada (como Uniswap V3). Permite auditar el retorno real sobre la inversión separando las comisiones cobradas de la pérdida impermanente (Impermanent Loss). Ofrece además simuladores de backtesting para predecir si una posición habría sido rentable con datos históricos y bóvedas automatizadas (Auto-Compounder) que reinvierten las comisiones devengadas.',
    keyFeatures: [
      'Cálculo preciso del PnL neto y métrica real de Impermanent Loss vs HODL.',
      'Iniciador V3: backtesting histórico de rangos de precio con datos tick a tick.',
      'Auto-compounder descentralizado que reinvierte comisiones devengadas optimizando el interés compuesto.',
      'Alertas de posición fuera de rango (Out of Range) para evitar que el capital quede ocioso.'
    ],
    operationalRole: 'Gestión profesional de carteras LP, control de riesgo de divergencia y maximización del APY efectivo.',
    fiatVsDefiContext: 'Transforma al proveedor de liquidez minorista en un creador de mercado algorítmico institucional.'
  },
  {
    id: 'krystal-defi',
    name: 'Krystal DeFi',
    shortName: 'Krystal DeFi',
    url: 'https://defi.krystal.app',
    blockId: 3,
    blockTitle: 'Bloque 3 • Meta-Agregación Cross-Chain, Gestión de Liquidez AMM & Portafolios Web3',
    categoryTag: 'Consola Integral Web3',
    icon: <Layers className="text-red-700" size={24} />,
    summary: 'Consola Web3 unificada para gestión de portafolios, swaps multi-ruta y provisión de liquidez en más de 10 redes.',
    detailedExplanation: 'Krystal DeFi es una plataforma integral que actúa como cabina de mando para el usuario Web3. Agrega liquidez de múltiples protocolos de intercambio, plataformas de préstamo (Aave, Compound) y creadores de mercado para permitir que el inversor ejecute rebalanceos de cartera, depósitos con rendimiento y swaps con protección integrada contra ataques de bots de arbitraje y front-running (MEV).',
    keyFeatures: [
      'Gestión consolidada de carteras y saldos en Ethereum, Polygon, Arbitrum, BSC, Avalanche y más.',
      'Smart Swap con agregación multi-DEX que divide órdenes para obtener el mejor precio de ejecución.',
      'Gestor de liquidez simplificado para añadir y retirar capital de pools sin salir de la interfaz.',
      'Mecanismos de protección anti-sándwich para proteger las transacciones en mempool.'
    ],
    operationalRole: 'Panel operativo diario para ejecutar operaciones complejas en DeFi sin dispersión de herramientas.',
    fiatVsDefiContext: 'Funciona como la banca digital privada del futuro, pero sin custodia bancaria: tú mantienes siempre tus claves privadas.'
  },

  // --- BLOQUE 4: INTELIGENCIA FINANCIERA CONVERSACIONAL & MOTORES DE IA EN TIEMPO REAL ---
  {
    id: 'perplexity-finance',
    name: 'Perplexity Finance',
    shortName: 'Perplexity Finance',
    url: 'https://www.perplexity.ai/finance/',
    blockId: 4,
    blockTitle: 'Bloque 4 • Inteligencia Financiera Conversacional & Motores de IA en Tiempo Real',
    categoryTag: 'IA Financiera & Búsqueda en Vivo',
    icon: <Bot className="text-red-700" size={24} />,
    summary: 'Motor de búsqueda conversacional impulsado por IA para análisis financiero, balances y noticias en tiempo real.',
    detailedExplanation: 'Perplexity Finance revoluciona la investigación de mercados combinando grandes modelos de lenguaje con acceso inmediato a bases de datos financieras en vivo y prensa económica. Permite formular preguntas complejas en lenguaje natural (ej. "¿Cuál fue el margen operativo de Nvidia en el último trimestre frente a AMD?") y genera análisis fundamentados con citas transparentes a informes oficiales, balances 10-K y cotizaciones en vivo.',
    keyFeatures: [
      'Síntesis conversacional de balances corporativos, guidance de directivos y conferencias de resultados (earnings calls).',
      'Citas y referencias primarias verificables en cada afirmación analítica.',
      'Seguimiento en directo de noticias macroeconómicas con análisis de impacto en activos.',
      'Capacidad de cruzar variables financieras tradicionales con métricas de adopción cripto.'
    ],
    operationalRole: 'Investigación rápida de tesis de inversión, síntesis de resultados trimestrales y contraste de datos en segundos.',
    fiatVsDefiContext: 'Democratiza el acceso a la síntesis de inteligencia de mercado que antes requería terminales de 25.000$/año.'
  }
];

interface Props {
  onSelectPlatform?: (platformName: string) => void;
  onOpenDirectLinks?: (platformName: string) => void;
}

export const FinancialPlatformsDirectory: React.FC<Props> = ({ onSelectPlatform, onOpenDirectLinks }) => {
  const [selectedBlock, setSelectedBlock] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { isFavorite, toggleFavorite, sortWithFavoritesFirst } = useFavorites();

  const blocksMeta = [
    { id: 'all', label: `Todas las Plataformas (${FINANCIAL_PLATFORMS_DATA.length})`, count: FINANCIAL_PLATFORMS_DATA.length, icon: <Layers size={14} /> },
    { id: 1, label: `Bloque 1: Cripto & On-Chain (${FINANCIAL_PLATFORMS_DATA.filter(p => p.blockId === 1).length})`, count: FINANCIAL_PLATFORMS_DATA.filter(p => p.blockId === 1).length, icon: <Database size={14} /> },
    { id: 2, label: `Bloque 2: Terminales & Bolsa (${FINANCIAL_PLATFORMS_DATA.filter(p => p.blockId === 2).length})`, count: FINANCIAL_PLATFORMS_DATA.filter(p => p.blockId === 2).length, icon: <LineChart size={14} /> },
    { id: 3, label: `Bloque 3: Web3 & AMM (${FINANCIAL_PLATFORMS_DATA.filter(p => p.blockId === 3).length})`, count: FINANCIAL_PLATFORMS_DATA.filter(p => p.blockId === 3).length, icon: <ArrowRightLeft size={14} /> },
    { id: 4, label: `Bloque 4: IA Financiera (${FINANCIAL_PLATFORMS_DATA.filter(p => p.blockId === 4).length})`, count: FINANCIAL_PLATFORMS_DATA.filter(p => p.blockId === 4).length, icon: <Bot size={14} /> },
  ];

  const filteredPlatforms = useMemo(() => {
    const list = FINANCIAL_PLATFORMS_DATA.filter(p => {
      const matchBlock = selectedBlock === 'all' || p.blockId === selectedBlock;
      const matchSearch = searchQuery.trim() === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryTag.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.detailedExplanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.url.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBlock && matchSearch;
    });
    return sortWithFavoritesFirst(list);
  }, [selectedBlock, searchQuery, sortWithFavoritesFirst]);

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className="bg-white border-2 border-gray-900 rounded-[2.5rem] p-8 md:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-700/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-red-700 text-[11px] font-black uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Guía Maestra de Plataformas • 4 Bloques Operativos</span>
          </div>

          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-gray-900">
            Directorio de Plataformas, Terminales & <span className="text-red-700">Agregadores</span>
          </h3>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed max-w-4xl font-semibold">
            Infraestructura verificada para el análisis de mercados de capitales, graficación profesional, inteligencia on-chain, meta-agregación cross-chain y análisis con inteligencia artificial. Cada herramienta incluye acceso directo seguro, enlaces oficiales y análisis comparativo.
          </p>
        </div>
      </div>

      {/* Controls: Search and Block Selector */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Buscar plataforma por nombre, tecnología, URL o caso de uso..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-gray-200 focus:border-red-700 rounded-2xl text-sm font-semibold text-gray-900 placeholder-gray-400 focus:outline-none transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-black text-gray-400 hover:text-red-700 uppercase"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Block Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          {blocksMeta.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBlock(b.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedBlock === b.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:text-red-700 border border-gray-200 hover:border-red-700/40'
              }`}
            >
              {b.icon}
              <span>{b.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Platforms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredPlatforms.map((platform) => (
          <div
            key={platform.id}
            className="bg-white border-2 border-gray-200 hover:border-red-700/60 rounded-[2.5rem] p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-xl transition-all duration-300 group"
          >
            {/* Top Section */}
            <div className="space-y-4">
              {/* Badges and Block indicator */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-red-50 text-red-700 rounded-lg border border-red-100">
                  {platform.categoryTag}
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 px-2.5 py-1 rounded-md">
                  Bloque {platform.blockId}
                </span>
              </div>

              {/* Title and Icon */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gray-50 group-hover:bg-red-50 rounded-2xl border border-gray-200 group-hover:border-red-200 transition-colors">
                    {platform.icon}
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-gray-900 uppercase tracking-tight group-hover:text-red-700 transition-colors">
                      {platform.name}
                    </h4>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-gray-500 hover:text-red-700 hover:underline transition-colors mt-0.5"
                    >
                      <span>{platform.url.replace(/^https?:\/\//, '')}</span>
                      <ExternalLink size={12} className="text-red-700" />
                    </a>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(platform.name);
                  }}
                  className={`p-2.5 rounded-xl border transition-all active:scale-90 flex-shrink-0 ${
                    isFavorite(platform.name)
                      ? 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100 shadow-sm'
                      : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:border-gray-300'
                  }`}
                  title={isFavorite(platform.name) ? `Quitar ${platform.name} de favoritos` : `Marcar ${platform.name} como favorito`}
                  aria-label={`Favorito ${platform.name}`}
                >
                  <Star size={18} className={isFavorite(platform.name) ? 'fill-red-700 text-red-700' : ''} />
                </button>
              </div>

              {/* Summary */}
              <p className="text-gray-700 text-sm font-semibold leading-relaxed">
                {platform.summary}
              </p>

              {/* Detailed Explanation */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
                <p className="text-xs text-gray-800 leading-relaxed font-normal">
                  {platform.detailedExplanation}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 block">
                  Capacidades & Funciones Clave:
                </span>
                <ul className="space-y-1.5">
                  {platform.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                      <CheckCircle2 size={13} className="text-red-700 shrink-0 mt-0.5" />
                      <span className="leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Operational Role Context */}
              <div className="p-3.5 bg-gray-50/70 rounded-xl border border-gray-100 text-[11px] text-gray-600 font-medium">
                <span className="font-bold text-gray-900 block mb-0.5">Rol en la Tesis Operativa:</span>
                {platform.operationalRole}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              {/* Direct Link External Button */}
              <a
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-transform active:scale-95"
              >
                <span>Ir a la Plataforma</span>
                <ExternalLink size={14} />
              </a>

              {/* Modal Buttons */}
              <div className="flex items-center gap-2">
                {onSelectPlatform && (
                  <button
                    onClick={() => onSelectPlatform(platform.shortName)}
                    className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    title={`Ver análisis multi-modo de ${platform.name}`}
                  >
                    <Info size={14} className="text-red-700" />
                    <span>Análisis</span>
                  </button>
                )}

                {onOpenDirectLinks && (
                  <button
                    onClick={() => onOpenDirectLinks(platform.shortName)}
                    className="px-3 py-2 rounded-xl bg-white hover:bg-red-50 text-gray-700 hover:text-red-700 border border-gray-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                    title={`Ver links verificados y documentación oficial de ${platform.name}`}
                  >
                    <Compass size={14} className="text-red-700" />
                    <span>Links</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPlatforms.length === 0 && (
        <div className="text-center py-16 bg-white border border-gray-200 rounded-3xl p-8 space-y-3">
          <Search size={36} className="text-gray-300 mx-auto" />
          <p className="text-gray-700 font-bold">No se encontraron plataformas para la búsqueda realizada.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedBlock('all'); }}
            className="text-xs font-black uppercase text-red-700 hover:underline"
          >
            Restablecer filtros
          </button>
        </div>
      )}
    </div>
  );
};
