export interface DirectLinkItem {
  label: string;
  url: string;
  type: 'dapp' | 'docs' | 'analytics' | 'github' | 'governance' | 'explorer' | 'official' | 'regulation';
  desc: string;
}

export interface PlatformLinksResource {
  id: string;
  name: string;
  category: 'Plataforma DeFi' | 'Criptoactivo' | 'Stablecoin' | 'Wallet' | 'Instrumento' | 'Mercado';
  tag: string;
  badge: string;
  officialSite: string;
  summary: string;
  links: DirectLinkItem[];
}

export const DIRECT_LINKS_REGISTRY: Record<string, PlatformLinksResource> = {
  // --- PLATAFORMAS DEFI ---
  'Uniswap': {
    id: 'uniswap',
    name: 'Uniswap Protocol',
    category: 'Plataforma DeFi',
    tag: 'DEX AMM Líder',
    badge: 'Infraestructura Pública',
    officialSite: 'https://uniswap.org',
    summary: 'El protocolo de intercambio descentralizado (AMM) más grande del mundo por volumen acumulado y liquidez en múltiples cadenas.',
    links: [
      { label: 'DApp Web3 (Swap & Pools)', url: 'https://app.uniswap.org', type: 'dapp', desc: 'Interfaz de usuario oficial para intercambios y depósito de liquidez en V2, V3 y V4.' },
      { label: 'Documentación Técnica (Docs)', url: 'https://docs.uniswap.org', type: 'docs', desc: 'Guías de integración, contratos inteligentes de V3/V4 y APIs de enrutamiento.' },
      { label: 'Analíticas & Volúmenes (Uniswap Info)', url: 'https://info.uniswap.org', type: 'analytics', desc: 'Métricas en tiempo real de TVL, volumen de 24h y rendimiento de pools.' },
      { label: 'DefiLlama Metrics & TVL', url: 'https://defillama.com/protocol/uniswap', type: 'analytics', desc: 'Histórico de valor total bloqueado y desglose multicadena.' },
      { label: 'Portal de Gobernanza & Foros', url: 'https://gov.uniswap.org', type: 'governance', desc: 'Discusión y votación de propuestas de mejora por la DAO de UNI.' },
      { label: 'Repositorio Abierto (GitHub)', url: 'https://github.com/Uniswap', type: 'github', desc: 'Código fuente abierto auditado de contratos core, perfiles y SDKs.' },
      { label: 'Contrato Token UNI (Etherscan)', url: 'https://etherscan.io/token/0x1f9840a85d5af5bf1d1762f925bdaddc4201f984', type: 'explorer', desc: 'Verificación del contrato del token de gobernanza UNI en Ethereum.' }
    ]
  },
  'Aave': {
    id: 'aave',
    name: 'Aave Protocol',
    category: 'Plataforma DeFi',
    tag: 'Mercado Monetario',
    badge: 'Préstamos On-Chain',
    officialSite: 'https://aave.com',
    summary: 'Protocolo descentralizado no custodiado de mercados de liquidez donde depositar activos para obtener intereses o pedir préstamos sobre-colateralizados.',
    links: [
      { label: 'DApp Web3 Oficial (Markets)', url: 'https://app.aave.com', type: 'dapp', desc: 'Interfaz de suministro, préstamo, retiros y gestión de Health Factor.' },
      { label: 'Documentación para Desarrolladores', url: 'https://docs.aave.com', type: 'docs', desc: 'Especificaciones de Aave V3, Flash Loans, liquidaciones y oráculos.' },
      { label: 'Portal de Gobernanza (Aave Governance)', url: 'https://governance.aave.com', type: 'governance', desc: 'Propuestas de riesgo de parámetros de activos y votaciones AIP.' },
      { label: 'DefiLlama Aave Dashboard', url: 'https://defillama.com/protocol/aave', type: 'analytics', desc: 'Desglose de TVL, deudas activas, colateral prestado y salud sistémica.' },
      { label: 'Repositorio GitHub Oficial', url: 'https://github.com/aave', type: 'github', desc: 'Contratos inteligentes auditados de Aave V3 y módulos de seguridad.' },
      { label: 'Contrato Token AAVE (Etherscan)', url: 'https://etherscan.io/token/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9', type: 'explorer', desc: 'Contrato oficial del token AAVE y módulo de seguridad (Safety Module).' }
    ]
  },
  'Lido': {
    id: 'lido',
    name: 'Lido Finance',
    category: 'Plataforma DeFi',
    tag: 'Liquid Staking',
    badge: 'Staking de Ethereum',
    officialSite: 'https://lido.fi',
    summary: 'Protocolo líder de staking líquido que emite stETH por cada ETH delegado a un conjunto distribuido de operadores de nodos profesionales.',
    links: [
      { label: 'DApp de Staking Directo', url: 'https://stake.lido.fi', type: 'dapp', desc: 'Interfaz para convertir ETH a stETH y gestionar solicitudes de retiro.' },
      { label: 'Documentación del Protocolo', url: 'https://docs.lido.fi', type: 'docs', desc: 'Mecanismo de oráculo de rebasing, operadores de nodos y cola de retiro.' },
      { label: 'Dune Dashboard (Staking Lido)', url: 'https://dune.com/lido/lido-staking', type: 'analytics', desc: 'Estadísticas on-chain de cuota de mercado en Ethereum, APR y validadores.' },
      { label: 'Foro de Investigación y Gobernanza', url: 'https://research.lido.fi', type: 'governance', desc: 'Propuestas sobre operadores, dual governance y descentralización.' },
      { label: 'Contrato stETH (Etherscan)', url: 'https://etherscan.io/token/0xae7ab96520de3a18e5e111b5eaab095312d7fe84', type: 'explorer', desc: 'Contrato oficial del token stETH (Liquid Staked ETH) en Mainnet.' }
    ]
  },
  'MakerDAO': {
    id: 'makerdao',
    name: 'MakerDAO / Sky',
    category: 'Plataforma DeFi',
    tag: 'Banco Central DeFi',
    badge: 'Emisor DAI / USDS',
    officialSite: 'https://sky.money',
    summary: 'La organización autónoma descentralizada pionera de DeFi creadora de DAI y de la nueva infraestructura de ahorro USDS y gobernanza SKY.',
    links: [
      { label: 'Sky Portal DApp (Ahorro & Canje)', url: 'https://sky.money', type: 'dapp', desc: 'Acceso a Sky Savings Rate (SSR), canje de DAI por USDS y tokens SKY.' },
      { label: 'DaiStats (Métricas en Vivo)', url: 'https://daistats.com', type: 'analytics', desc: 'Dashboard de suministro de DAI, DSR actual, colaterales y deuda generada.' },
      { label: 'Documentación Técnica Maker', url: 'https://docs.makerdao.com', type: 'docs', desc: 'Arquitectura de contratos multi-colateral Dai, liquidation 2.0 y vaults.' },
      { label: 'Portal de Gobernanza Maker', url: 'https://vote.makerdao.com', type: 'governance', desc: 'Votaciones ejecutivas y de encuesta para tipos de interés y colaterales.' },
      { label: 'DefiLlama MakerDAO Stats', url: 'https://defillama.com/protocol/makerdao', type: 'analytics', desc: 'Evolución de reservas, activos del mundo real (RWA) y tesorería.' }
    ]
  },
  'GMX': {
    id: 'gmx',
    name: 'GMX',
    category: 'Plataforma DeFi',
    tag: 'DEX Perpetuos',
    badge: 'Derivados Descentralizados',
    officialSite: 'https://gmx.io',
    summary: 'Exchange descentralizado de contratos de futuros perpetuos y spot con bajo deslizamiento en Arbitrum y Avalanche.',
    links: [
      { label: 'DApp de Trading & Perpetuos', url: 'https://app.gmx.io', type: 'dapp', desc: 'Interfaz de trading con apalancamiento hasta 50x y pools de liquidez GM.' },
      { label: 'Documentación Oficial (GitBook)', url: 'https://gmxio.gitbook.io/gmx', type: 'docs', desc: 'Funcionamiento de oráculos sintéticos, comisiones y liquidaciones automáticas.' },
      { label: 'GMX Stats & Analytics', url: 'https://stats.gmx.io', type: 'analytics', desc: 'Métricas de volumen diario, fees repartidos a stakers y open interest.' },
      { label: 'DefiLlama GMX Dashboard', url: 'https://defillama.com/protocol/gmx', type: 'analytics', desc: 'TVL en Arbitrum y Avalanche y desglose de composición de pools.' }
    ]
  },
  'Pendle': {
    id: 'pendle',
    name: 'Pendle Finance',
    category: 'Plataforma DeFi',
    tag: 'Tokenización de Rendimiento',
    badge: 'Yield Trading',
    officialSite: 'https://pendle.finance',
    summary: 'Protocolo DeFi que separa los activos generadores de rendimiento en su componente principal (PT) y rendimiento futuro (YT), permitiendo fijar tipos o especular.',
    links: [
      { label: 'DApp Oficial de Pendle', url: 'https://app.pendle.finance', type: 'dapp', desc: 'Plataforma para comprar tipos fijos (PT), operar rendimiento (YT) o aportar liquidez.' },
      { label: 'Documentación Técnica (Docs)', url: 'https://docs.pendle.finance', type: 'docs', desc: 'Guía del AMM de tipos de interés de Pendle y estándares de integración SY.' },
      { label: 'DefiLlama Pendle Analytics', url: 'https://defillama.com/protocol/pendle', type: 'analytics', desc: 'Rastreo de TVL en Ethereum, Arbitrum, Mantle y otras redes.' }
    ]
  },
  'EigenLayer': {
    id: 'eigenlayer',
    name: 'EigenLayer',
    category: 'Plataforma DeFi',
    tag: 'Restaking Protocol',
    badge: 'Seguridad Compartida',
    officialSite: 'https://eigenlayer.xyz',
    summary: 'Protocolo de restaking que permite a los validadores de Ethereum reutilizar su ETH depositado para asegurar servicios validados activamente (AVS).',
    links: [
      { label: 'EigenLayer Web3 App', url: 'https://app.eigenlayer.xyz', type: 'dapp', desc: 'Interfaz de restaking nativo y depósito de tokens LST y selección de operadores.' },
      { label: 'Documentación Técnica (Docs)', url: 'https://docs.eigenlayer.xyz', type: 'docs', desc: 'Especificaciones de AVS, mecanismos de slashing y contratos de delegación.' },
      { label: 'DefiLlama EigenLayer Dashboard', url: 'https://defillama.com/protocol/eigenlayer', type: 'analytics', desc: 'Estadísticas de TVL restakeado y distribución por activo.' }
    ]
  },
  'Chainlink': {
    id: 'chainlink',
    name: 'Chainlink Network',
    category: 'Plataforma DeFi',
    tag: 'Red de Oráculos',
    badge: 'Verdad Externa & CCIP',
    officialSite: 'https://chain.link',
    summary: 'Estándar industrial de oráculos descentralizados que suministra feeds de precios, computación verificable y mensajería cross-chain (CCIP).',
    links: [
      { label: 'Data Feeds en Vivo', url: 'https://data.chain.link', type: 'official', desc: 'Supervisión en tiempo real de los feeds de precios usados por DeFi en todas las redes.' },
      { label: 'Documentación para Desarrolladores', url: 'https://docs.chain.link', type: 'docs', desc: 'Guías de integración de Data Feeds, VRF, Automatizaciones y CCIP.' },
      { label: 'CCIP Explorer (Cross-Chain)', url: 'https://ccip.chain.link', type: 'explorer', desc: 'Rastreador de transacciones y mensajes seguros entre cadenas con CCIP.' },
      { label: 'Contrato Token LINK (Etherscan)', url: 'https://etherscan.io/token/0x514910771af9ca656af840dff83e8264ecf986ca', type: 'explorer', desc: 'Contrato del token LINK en Ethereum Mainnet.' }
    ]
  },
  'Ondo Finance': {
    id: 'ondo-finance',
    name: 'Ondo Finance',
    category: 'Plataforma DeFi',
    tag: 'RWA Institucional',
    badge: 'Bonos del Tesoro Tokenizados',
    officialSite: 'https://ondo.finance',
    summary: 'Líder en tokenización de activos del mundo real (RWA), conectando deuda soberana de EE.UU. (USDY, OUSG) con protocolos descentralizados.',
    links: [
      { label: 'Ondo App & Inversión', url: 'https://ondo.finance/app', type: 'dapp', desc: 'Acceso a emisión y gestión de títulos tokenizados USDY y fondos institucionales.' },
      { label: 'Documentación Oficial RWA', url: 'https://docs.ondo.finance', type: 'docs', desc: 'Estructura legal de SPVs, auditorías de reservas y estándares de cumplimiento.' },
      { label: 'RWA.xyz Ondo Monitor', url: 'https://app.rwa.xyz/treasuries', type: 'analytics', desc: 'Monitor institucional del mercado de bonos del tesoro tokenizados.' }
    ]
  },
  'Hyperliquid': {
    id: 'hyperliquid',
    name: 'Hyperliquid',
    category: 'Plataforma DeFi',
    tag: 'DEX L1 de Perpetuos',
    badge: 'Orderbook On-Chain',
    officialSite: 'https://hyperliquid.xyz',
    summary: 'Blockchain de Capa 1 dedicada a trading de derivados y contratos perpetuos con libro de órdenes totalmente on-chain y liquidación en microsegundos.',
    links: [
      { label: 'Trade App Oficial', url: 'https://app.hyperliquid.xyz', type: 'dapp', desc: 'Terminal de trading profesional para perpetuos y spot con 0 comisiones de gas.' },
      { label: 'Documentación Técnica', url: 'https://hyperliquid.gitbook.io/hyperliquid-docs', type: 'docs', desc: 'Mecanismo de consenso HyperBFT, especificaciones de la API y oráculos internos.' },
      { label: 'DefiLlama Hyperliquid Stats', url: 'https://defillama.com/protocol/hyperliquid', type: 'analytics', desc: 'Evolución de open interest, volumen diario y activos bajo custodia en el puente.' }
    ]
  },
  'Morpho': {
    id: 'morpho',
    name: 'Morpho Protocol',
    category: 'Plataforma DeFi',
    tag: 'Lending Modular',
    badge: 'Morpho Blue & Vaults',
    officialSite: 'https://morpho.org',
    summary: 'Protocolo de préstamos modular y ultraeficiente que permite crear mercados de crédito aislados y sin permiso con oráculos y LTVs independientes.',
    links: [
      { label: 'DApp de Préstamos y Vaults', url: 'https://app.morpho.org', type: 'dapp', desc: 'Interfaz de usuario para depósitos en MetaMorpho Vaults y préstamos Morpho Blue.' },
      { label: 'Documentación Técnica (Docs)', url: 'https://docs.morpho.org', type: 'docs', desc: 'Especificaciones del núcleo Morpho Blue, matemáticas de tipos y auditorías.' },
      { label: 'DefiLlama Morpho Analytics', url: 'https://defillama.com/protocol/morpho', type: 'analytics', desc: 'Histórico de valor bloqueado, deuda viva y mercados más activos.' }
    ]
  },
  'Curve Finance': {
    id: 'curve',
    name: 'Curve Finance',
    category: 'Plataforma DeFi',
    tag: 'AMM de Stables',
    badge: 'Stableswap Invariant',
    officialSite: 'https://curve.fi',
    summary: 'Protocolo descentralizado de intercambio optimizado para activos de paridad similar (stablecoins, LSTs) con mínimo deslizamiento y tarifas ultrabajas.',
    links: [
      { label: 'DApp Oficial de Swaps y Pools', url: 'https://curve.fi', type: 'dapp', desc: 'Interfaz clásica de trading entre stablecoins y provisión de liquidez.' },
      { label: 'Documentación para Desarrolladores', url: 'https://docs.curve.fi', type: 'docs', desc: 'Mecanismo Stableswap, Curve V2 (CryptoSwap), crvUSD y Gauge voting.' },
      { label: 'DefiLlama Curve Analytics', url: 'https://defillama.com/protocol/curve-dex', type: 'analytics', desc: 'TVL agregado en más de 12 blockchains y desglose de liquidez de stablecoins.' },
      { label: 'Gobernanza veCRV', url: 'https://dao.curve.fi', type: 'governance', desc: 'Votación de medidores (gauge weights) y distribución de incentivos CRV.' }
    ]
  },
  'Across Protocol': {
    id: 'across',
    name: 'Across Protocol',
    category: 'Plataforma DeFi',
    tag: 'Puente Cross-Chain',
    badge: 'Basado en Intents',
    officialSite: 'https://across.to',
    summary: 'El puente cross-chain más rápido y económico entre Capas 2 de Ethereum, impulsado por una arquitectura de retransmisores e intents asegurada por UMA.',
    links: [
      { label: 'DApp de Puente Cross-Chain', url: 'https://across.to', type: 'dapp', desc: 'Transferencia instantánea de fondos entre Ethereum, Arbitrum, Optimism, Base, Polygon.' },
      { label: 'Documentación del Protocolo', url: 'https://docs.across.to', type: 'docs', desc: 'Arquitectura de subastas de retransmisión y oráculo optimista de liquidación.' },
      { label: 'L2Beat Bridges Monitor (Across)', url: 'https://l2beat.com/bridges/projects/across', type: 'analytics', desc: 'Evaluación independiente de seguridad y modelo de riesgo por L2Beat.' }
    ]
  },
  'Ethena': {
    id: 'ethena',
    name: 'Ethena Labs',
    category: 'Plataforma DeFi',
    tag: 'Dólar Sintético',
    badge: 'USDe & Bono de Internet',
    officialSite: 'https://ethena.fi',
    summary: 'Protocolo creador de USDe, un dólar sintético respaldado por coberturas cortas delta-neutrales de ETH y BTC y rendimiento de staking nativo.',
    links: [
      { label: 'DApp Oficial de Ethena', url: 'https://app.ethena.fi', type: 'dapp', desc: 'Interfaz de acuñación de USDe, staking (sUSDe) y programas de recompensas.' },
      { label: 'Documentación del Protocolo', url: 'https://docs.ethena.fi', type: 'docs', desc: 'Arquitectura de cobertura delta-neutral, custodios institucionales OES y riesgo de base.' },
      { label: 'Panel de Transparencia de Reservas', url: 'https://app.ethena.fi/dashboards/transparency', type: 'analytics', desc: 'Composición en tiempo real de colaterales, posiciones cortas y custodios.' }
    ]
  },
  'Safe (Gnosis)': {
    id: 'safe-global',
    name: 'Safe (antes Gnosis Safe)',
    category: 'Plataforma DeFi',
    tag: 'Smart Accounts & Multisig',
    badge: 'Custodia Institucional',
    officialSite: 'https://safe.global',
    summary: 'El estándar de oro en custodia con contratos inteligentes multifirma, protegiendo más de 100.000 millones de USD en activos Web3 y DAOs.',
    links: [
      { label: 'Safe Web3 App Oficial', url: 'https://app.safe.global', type: 'dapp', desc: 'Creación y firma colaborativa de transacciones en cuentas multifirma.' },
      { label: 'Documentación para Desarrolladores', url: 'https://docs.safe.global', type: 'docs', desc: 'Safe Core SDK, integración de módulos de Account Abstraction y timelocks.' },
      { label: 'Repositorio GitHub Oficial', url: 'https://github.com/safe-global', type: 'github', desc: 'Contratos inteligentes auditados por múltiples firmas de seguridad.' }
    ]
  },
  'Balancer': {
    id: 'balancer',
    name: 'Balancer Protocol',
    category: 'Plataforma DeFi',
    tag: 'AMM Multi-Token',
    badge: 'Pools hasta 8 Tokens',
    officialSite: 'https://balancer.fi',
    summary: 'Creador de mercado automatizado generalizado que permite pools con hasta 8 tokens y ponderaciones personalizadas (no solo 50/50), ideal para índices, tesorerías y estrategias complejas.',
    links: [
      { label: 'Balancer Web3 App (Pools & Swap)', url: 'https://app.balancer.fi', type: 'dapp', desc: 'Interfaz oficial para provisión de liquidez en pools ponderadas, estables y Boosted Pools.' },
      { label: 'Documentación Técnica (Docs)', url: 'https://docs.balancer.fi', type: 'docs', desc: 'Arquitectura de Balancer V2/V3, Single Vault, fórmulas matemáticas y SDK.' },
      { label: 'DefiLlama Balancer Analytics', url: 'https://defillama.com/protocol/balancer', type: 'analytics', desc: 'Métricas de TVL, volumen de swaps y comisiones acumuladas.' },
      { label: 'Gobernanza veBAL', url: 'https://vote.balancer.fi', type: 'governance', desc: 'Propuestas de la DAO y asignación de gauges de liquidez mediante veBAL.' }
    ]
  },
  'PancakeSwap': {
    id: 'pancakeswap',
    name: 'PancakeSwap',
    category: 'Plataforma DeFi',
    tag: 'DEX Líder BNB Chain',
    badge: 'AMM V2/V3 Multicadena',
    officialSite: 'https://pancakeswap.finance',
    summary: 'El AMM dominante en BNB Chain y presente en múltiples redes, con pools estándar, granjas de rendimiento (farms) y opciones de liquidez concentrada en sus versiones recientes.',
    links: [
      { label: 'PancakeSwap DApp (Swap & Farms)', url: 'https://pancakeswap.finance/swap', type: 'dapp', desc: 'Terminal de intercambio descentralizado, pools de liquidez V3 y farming de CAKE.' },
      { label: 'Documentación Oficial', url: 'https://docs.pancakeswap.finance', type: 'docs', desc: 'Guías de integración, arquitectura de Smart Router y contratos de lotería/farms.' },
      { label: 'DefiLlama PancakeSwap Dashboard', url: 'https://defillama.com/protocol/pancakeswap', type: 'analytics', desc: 'Volumen y valor total bloqueado en BNB Chain, Ethereum, Arbitrum y Base.' }
    ]
  },
  'Trader Joe': {
    id: 'trader-joe',
    name: 'Trader Joe (LFJ)',
    category: 'Plataforma DeFi',
    tag: 'DEX Nativo Avalanche',
    badge: 'Liquidity Book & Bins',
    officialSite: 'https://traderjoexyz.com',
    summary: 'DEX insignia originario de Avalanche expandido a Arbitrum y BNB Chain, pionero del modelo Liquidity Book con bins de precio de deslizamiento nulo.',
    links: [
      { label: 'Trade & Liquidity DApp', url: 'https://traderjoexyz.com/trade', type: 'dapp', desc: 'Terminal de trading y gestión de liquidez discreta en Liquidity Book.' },
      { label: 'Documentación Liquidity Book', url: 'https://docs.traderjoexyz.com', type: 'docs', desc: 'Arquitectura matemática de bins, comisiones de volatilidad variable y SDK.' },
      { label: 'DefiLlama Trader Joe Stats', url: 'https://defillama.com/protocol/trader-joe', type: 'analytics', desc: 'Evolución de TVL en Avalanche y métricas de volumen transaccionado.' }
    ]
  },
  'Camelot': {
    id: 'camelot',
    name: 'Camelot DEX',
    category: 'Plataforma DeFi',
    tag: 'DEX Nativo Arbitrum',
    badge: 'Liquidez Personalizada',
    officialSite: 'https://camelot.exchange',
    summary: 'El DEX nativo centrado en el ecosistema Arbitrum, ofreciendo pools duales (clásicas y nitro), comisiones dinámicas e incentivos dirigidos para protocolos locales.',
    links: [
      { label: 'Camelot App (Swap & Nitro)', url: 'https://app.camelot.exchange', type: 'dapp', desc: 'Interfaz de intercambio descentralizado y pools de rendimiento en Arbitrum.' },
      { label: 'Documentación Oficial', url: 'https://docs.camelot.exchange', type: 'docs', desc: 'Arquitectura de spNFT, comisiones dinámicas y pools concentradas algebraicas.' },
      { label: 'DefiLlama Camelot Analytics', url: 'https://defillama.com/protocol/camelot', type: 'analytics', desc: 'Métricas de dominancia de liquidez local en la red Arbitrum.' }
    ]
  },
  'Raydium': {
    id: 'raydium',
    name: 'Raydium Protocol',
    category: 'Plataforma DeFi',
    tag: 'DEX Gigante Solana',
    badge: 'Volumen >35.600M USD/Mes',
    officialSite: 'https://raydium.io',
    summary: 'El DEX más grande de la blockchain Solana por volumen mensual (>35.600 millones de USD). Ofrece pools AMM estándar (comisión aprox. 0,25%) y CLMM (liquidez concentrada) con comisiones dinámicas variables.',
    links: [
      { label: 'Raydium Swap & CLMM App', url: 'https://raydium.io/swap', type: 'dapp', desc: 'Interfaz principal para swaps en Solana, creación de pools estándar y pools concentradas CLMM.' },
      { label: 'Documentación para Desarrolladores', url: 'https://docs.raydium.io', type: 'docs', desc: 'Arquitectura de programas de Solana, CLMM, integración de SDKs y APIs.' },
      { label: 'DefiLlama Raydium Dashboard', url: 'https://defillama.com/protocol/raydium', type: 'analytics', desc: 'Histórico de volumen diario récord, TVL y cuota de mercado en Solana.' }
    ]
  },
  'Orca': {
    id: 'orca',
    name: 'Orca (Whirlpools)',
    category: 'Plataforma DeFi',
    tag: 'DEX Concentrado Solana',
    badge: 'Whirlpools CLMM',
    officialSite: 'https://www.orca.so',
    summary: 'Segundo DEX de referencia en Solana, especializado en Whirlpools (liquidez concentrada). Sus pools como SOL/USDC superan decenas de millones en TVL con comisiones competitivas entre 0,01% y 1% según la volatilidad del par.',
    links: [
      { label: 'Orca Web3 App (Whirlpools)', url: 'https://www.orca.so', type: 'dapp', desc: 'Terminal de intercambio con protección de slippage y provisión de liquidez en rangos de precios.' },
      { label: 'Documentación Técnica Whirlpools', url: 'https://docs.orca.so', type: 'docs', desc: 'Especificaciones de programas Whirlpool en Rust, SDK de TypeScript y ticks de precios.' },
      { label: 'DefiLlama Orca Analytics', url: 'https://defillama.com/protocol/orca', type: 'analytics', desc: 'Seguimiento de TVL de Whirlpools y volumen de pares principales en Solana.' }
    ]
  },
  'Beefy Finance': {
    id: 'beefy',
    name: 'Beefy Finance',
    category: 'Plataforma DeFi',
    tag: 'Agregador de Rendimiento',
    badge: 'Auto-Compounder Multicadena',
    officialSite: 'https://beefy.com',
    summary: 'Optimizador de rendimiento descentralizado y multicadena que automatiza el interés compuesto (auto-compound) sobre posiciones LP de cientos de DEXs sin fricción manual.',
    links: [
      { label: 'Beefy App (Vaults Multicadena)', url: 'https://app.beefy.com', type: 'dapp', desc: 'Explorador y depósito en bóvedas autocompuestas en más de 20 blockchains.' },
      { label: 'Documentación Oficial', url: 'https://docs.beefy.finance', type: 'docs', desc: 'Estrategias de reinversión de cosechas, auditorías de contratos y tokenómica BIFI.' },
      { label: 'DefiLlama Beefy Dashboard', url: 'https://defillama.com/protocol/beefy', type: 'analytics', desc: 'Estadísticas agregadas de TVL en Arbitrum, Optimism, Polygon, BNB Chain, etc.' }
    ]
  },
  'Yearn Finance': {
    id: 'yearn',
    name: 'Yearn Finance',
    category: 'Plataforma DeFi',
    tag: 'Agregador Pionero Yield',
    badge: 'Vaults V3 ERC-4626',
    officialSite: 'https://yearn.fi',
    summary: 'El protocolo pionero en bóvedas de rendimiento automatizado, gestionando estrategias complejas multi-pool y minimizando costes de gas mediante contratos estandarizados.',
    links: [
      { label: 'Yearn Web3 App (Vaults)', url: 'https://yearn.fi/vaults', type: 'dapp', desc: 'Bóvedas optimizadas de ETH, USDC, DAI y tokens LP con rebalanceo automático.' },
      { label: 'Documentación Técnica (Docs)', url: 'https://docs.yearn.fi', type: 'docs', desc: 'Especificaciones de Yearn V3, contratos compatibles ERC-4626 y desarrollo de estrategias.' },
      { label: 'DefiLlama Yearn Analytics', url: 'https://defillama.com/protocol/yearn-finance', type: 'analytics', desc: 'Métricas de TVL histórico, tesorería de la DAO y comisiones de gestión.' }
    ]
  },
  'AutoShark': {
    id: 'autoshark',
    name: 'AutoShark Finance',
    category: 'Plataforma DeFi',
    tag: 'Agregador BNB Chain',
    badge: 'Yield Farming Optimizer',
    officialSite: 'https://autoshark.finance',
    summary: 'Optimizador de rendimiento y agregador de liquidez orientado a BNB Chain, ofreciendo bóvedas compuestas para pools de PancakeSwap y estrategias de dividendos.',
    links: [
      { label: 'AutoShark Portal', url: 'https://autoshark.finance', type: 'dapp', desc: 'Acceso a bóvedas de interés compuesto sobre pares de BNB Chain.' },
      { label: 'Documentación de Estrategias', url: 'https://autoshark.gitbook.io/autoshark', type: 'docs', desc: 'Mecanismos de reinversión automática y auditorías de seguridad.' }
    ]
  },
  'Rocket Pool': {
    id: 'rocket-pool',
    name: 'Rocket Pool',
    category: 'Plataforma DeFi',
    tag: 'Liquid Staking Descentralizado',
    badge: 'rETH & Nodos sin Permiso',
    officialSite: 'https://rocketpool.net',
    summary: 'Protocolo descentralizado de staking de Ethereum que permite operar minipools con solo 8 o 16 ETH, emitiendo rETH, un token LST utilizado intensamente en pools de liquidez de Curve y Uniswap.',
    links: [
      { label: 'Rocket Pool Staking App', url: 'https://stake.rocketpool.net', type: 'dapp', desc: 'Staking directo de ETH por rETH con recompensas compuestas automáticas.' },
      { label: 'Documentación Oficial', url: 'https://docs.rocketpool.net', type: 'docs', desc: 'Guía de validadores de nodo, Smartnode CLI y contratos de depósito.' },
      { label: 'DefiLlama Rocket Pool Stats', url: 'https://defillama.com/protocol/rocket-pool', type: 'analytics', desc: 'Evolución de ETH depositado, número de operadores de nodo y TVL.' }
    ]
  },
  'Jito': {
    id: 'jito',
    name: 'Jito Network',
    category: 'Plataforma DeFi',
    tag: 'LST & MEV Solana',
    badge: 'JitoSOL Líder en Solana',
    officialSite: 'https://jito.network',
    summary: 'Principal protocolo de staking líquido en Solana que captura recompensas de validación y extracción de MEV institucional. Su token JitoSOL es uno de los colaterales y pares más líquidos en Raydium y Orca.',
    links: [
      { label: 'Jito Staking Portal', url: 'https://jito.network/staking', type: 'dapp', desc: 'Conversión de SOL a JitoSOL con rendimiento acumulado por validación y MEV.' },
      { label: 'Documentación Técnica Jito', url: 'https://docs.jito.network', type: 'docs', desc: 'Cliente validador Jito-Solana, subastas de bloques MEV y gobernanza JTO.' },
      { label: 'DefiLlama Jito Dashboard', url: 'https://defillama.com/protocol/jito', type: 'analytics', desc: 'Rastreador de TVL en Solana, porcentaje de participación y tarifas capturadas.' }
    ]
  },

  // --- CRIPTOACTIVOS ---
  'Bitcoin (BTC)': {
    id: 'bitcoin',
    name: 'Bitcoin (BTC)',
    category: 'Criptoactivo',
    tag: 'Reserva de Valor',
    badge: 'Escasez Absoluta',
    officialSite: 'https://bitcoin.org',
    summary: 'El activo monetario base y primer dinero digital descentralizado del mundo, con una política de emisión fija de 21 millones de unidades garantizada por Proof of Work.',
    links: [
      { label: 'Whitepaper Original (Satoshi Nakamoto)', url: 'https://bitcoin.org/bitcoin.pdf', type: 'official', desc: 'El documento fundacional de 2008: "Bitcoin: A Peer-to-Peer Electronic Cash System".' },
      { label: 'Mempool Space (Explorador en Vivo)', url: 'https://mempool.space', type: 'explorer', desc: 'Explorador visual del mempool de transacciones, comisiones por sat/vB y bloques minados.' },
      { label: 'Bitcoin Core (Software Canónico)', url: 'https://bitcoincore.org', type: 'github', desc: 'Descarga y documentación del cliente oficial y nodo completo de la red Bitcoin.' },
      { label: 'Blockchain.com Explorer', url: 'https://www.blockchain.com/explorer', type: 'explorer', desc: 'Consulta de direcciones públicas, transacciones históricas y tasa de hash.' }
    ]
  },
  'Ethereum (ETH)': {
    id: 'ethereum',
    name: 'Ethereum (ETH)',
    category: 'Criptoactivo',
    tag: 'Capa de Computación',
    badge: 'Contratos Inteligentes',
    officialSite: 'https://ethereum.org',
    summary: 'La plataforma descentralizada líder para contratos inteligentes y computación programable, base fundamental de todo el ecosistema de finanzas descentralizadas.',
    links: [
      { label: 'Portal Oficial de la Fundación', url: 'https://ethereum.org', type: 'official', desc: 'Recursos para usuarios, hoja de ruta del protocolo, validación y dApps.' },
      { label: 'Etherscan (Explorador Canónico)', url: 'https://etherscan.io', type: 'explorer', desc: 'Explorador de bloques, transacciones, contratos verificados y tarifas de gas en Gwei.' },
      { label: 'Ultrasound Money (Dinero Deflacionario)', url: 'https://ultrasound.money', type: 'analytics', desc: 'Métricas de quema de tarifas (EIP-1559), tasa de inflación/deflación de ETH.' },
      { label: 'Beaconcha.in (Monitor PoS)', url: 'https://beaconcha.in', type: 'analytics', desc: 'Monitor del conjunto de validadores, rendimiento de staking y actividad de consenso.' },
      { label: 'L2Beat (Ecosistema de Rollups)', url: 'https://l2beat.com', type: 'analytics', desc: 'Análisis independiente de escalabilidad, TVL y riesgos de las Capas 2 de Ethereum.' }
    ]
  },
  'Solana (SOL)': {
    id: 'solana',
    name: 'Solana (SOL)',
    category: 'Criptoactivo',
    tag: 'Alta Frecuencia',
    badge: 'Proof of History',
    officialSite: 'https://solana.com',
    summary: 'Blockchain de capa 1 diseñada para transacciones masivas de baja latencia con procesamiento paralelo mediante el motor Sealevel.',
    links: [
      { label: 'Web Oficial de Solana', url: 'https://solana.com', type: 'official', desc: 'Portal oficial de desarrolladores, ecosistema y documentación de la red.' },
      { label: 'Solscan (Explorador de Bloques)', url: 'https://solscan.io', type: 'explorer', desc: 'Explorador de cuentas, tokens SPL, instrucciones y transacciones en Solana.' },
      { label: 'Solana Compass (Analíticas de Red)', url: 'https://solanacompass.com', type: 'analytics', desc: 'Métricas de validadores, inflación anual, épocas y recompensas de staking.' },
      { label: 'DefiLlama Solana Ecosystem', url: 'https://defillama.com/chain/Solana', type: 'analytics', desc: 'TVL y volumen de trading en DEXes del ecosistema Solana.' }
    ]
  },
  'BNB (BNB)': {
    id: 'bnb',
    name: 'BNB (BNB Chain)',
    category: 'Criptoactivo',
    tag: 'Ecosistema CeDeFi',
    badge: 'Auto-Burn Trimestral',
    officialSite: 'https://www.bnbchain.org',
    summary: 'Activo nativo de BNB Chain (BSC y opBNB), utilizado para pago de comisiones de gas, gobernanza y programas de quema periódica.',
    links: [
      { label: 'Web Oficial de BNB Chain', url: 'https://www.bnbchain.org', type: 'official', desc: 'Portal de desarrollo, puentes oficiales y documentación de BSC y opBNB.' },
      { label: 'BscScan (Explorador Oficial)', url: 'https://bscscan.com', type: 'explorer', desc: 'Consulta de contratos BEP-20, saldos de direcciones y transacciones en BNB Smart Chain.' },
      { label: 'DefiLlama BNB Chain Stats', url: 'https://defillama.com/chain/BSC', type: 'analytics', desc: 'Métricas de TVL, PancakeSwap y protocolos DeFi desplegados.' }
    ]
  },
  'Cardano (ADA)': {
    id: 'cardano',
    name: 'Cardano (ADA)',
    category: 'Criptoactivo',
    tag: 'Modelo eUTXO',
    badge: 'Revisión Académica',
    officialSite: 'https://cardano.org',
    summary: 'Blockchain de Proof of Stake desarrollada con métodos formales y revisión por pares académica, basada en el modelo de libro mayor eUTXO.',
    links: [
      { label: 'Portal Oficial Cardano', url: 'https://cardano.org', type: 'official', desc: 'Visión general de la arquitectura, investigación académica y filosofía de desarrollo.' },
      { label: 'Cardanoscan (Explorador de Bloques)', url: 'https://cardanoscan.io', type: 'explorer', desc: 'Consulta de bloques, transacciones, pools de stake y épocas de Cardano.' },
      { label: 'Input Output Global (IOG)', url: 'https://iohk.io', type: 'official', desc: 'Compañía de ingeniería e investigación responsable del desarrollo de Cardano.' }
    ]
  },
  'XRP (XRP)': {
    id: 'xrp',
    name: 'XRP (XRP Ledger)',
    category: 'Criptoactivo',
    tag: 'Pagos Transfronterizos',
    badge: 'Consenso Federado',
    officialSite: 'https://ripple.com/xrp/',
    summary: 'Activo digital diseñado para liquidación de pagos institucionales internacionales en tiempo real con costes ínfimos y alta velocidad.',
    links: [
      { label: 'Página Oficial Ripple XRP', url: 'https://ripple.com/xrp/', type: 'official', desc: 'Información institucional sobre liquidez bajo demanda (ODL) y soluciones bancarias.' },
      { label: 'XRPL.org (Comunidad Abierta)', url: 'https://xrpl.org', type: 'docs', desc: 'Documentación técnica del XRP Ledger, motor descentralizado y herramientas.' },
      { label: 'Bithomp (Explorador XRPL)', url: 'https://bithomp.com', type: 'explorer', desc: 'Explorador de cuentas de XRP Ledger, ledgers y métricas de red.' }
    ]
  },
  'Polkadot (DOT)': {
    id: 'polkadot',
    name: 'Polkadot (DOT)',
    category: 'Criptoactivo',
    tag: 'Interoperabilidad',
    badge: 'Relay & Parachains',
    officialSite: 'https://polkadot.network',
    summary: 'Protocolo multichain fundado por Gavin Wood que conecta blockchains independientes (parachains) bajo una capa unificada de seguridad compartida.',
    links: [
      { label: 'Portal Oficial de Polkadot', url: 'https://polkadot.network', type: 'official', desc: 'Información sobre la Relay Chain, subastas de parachains y hoja de ruta Polkadot 2.0.' },
      { label: 'Subscan (Explorador Multicadena)', url: 'https://polkadot.subscan.io', type: 'explorer', desc: 'Explorador de bloques, eventos, transferencias XCM y democracia de Polkadot.' },
      { label: 'Polkadot.js Portal', url: 'https://polkadot.js.org/apps/', type: 'dapp', desc: 'Interfaz de usuario avanzada para interactuar directamente con la cadena y staking.' }
    ]
  },
  'Avalanche (AVAX)': {
    id: 'avalanche',
    name: 'Avalanche (AVAX)',
    category: 'Criptoactivo',
    tag: 'Subnets & C-Chain',
    badge: 'Consenso Avalanche',
    officialSite: 'https://avax.network',
    summary: 'Plataforma para contratos inteligentes y redes personalizadas (Subnets) con finalidad de transacción en menos de un segundo gracias al consenso probabilístico.',
    links: [
      { label: 'Web Oficial de Avalanche', url: 'https://avax.network', type: 'official', desc: 'Portal oficial del ecosistema, subnets institucionales y documentación.' },
      { label: 'Snowtrace (Explorador C-Chain)', url: 'https://snowtrace.io', type: 'explorer', desc: 'Explorador oficial de transacciones y contratos inteligentes en Avalanche C-Chain.' },
      { label: 'DefiLlama Avalanche Stats', url: 'https://defillama.com/chain/Avalanche', type: 'analytics', desc: 'Métricas de TVL y protocolos de liquidez en Avalanche.' }
    ]
  },

  // --- STABLECOINS ---
  'USD Coin (USDC)': {
    id: 'usdc',
    name: 'USD Coin (USDC)',
    category: 'Stablecoin',
    tag: 'EMT Regulada',
    badge: 'Transparencia & Auditoría',
    officialSite: 'https://www.circle.com/en/usdc',
    summary: 'Stablecoin emitida por Circle, con reservas depositadas en bancos regulados y bonos del tesoro de EE.UU., pionera en cumplimiento MiCA en la UE.',
    links: [
      { label: 'Portal Oficial Circle USDC', url: 'https://www.circle.com/en/usdc', type: 'official', desc: 'Información institucional sobre el dólar digital regulado y soluciones empresariales.' },
      { label: 'Informes Mensuales de Reservas (Auditorías)', url: 'https://www.circle.com/en/transparency', type: 'analytics', desc: 'Certificaciones independientes mensuales de Deloitte y desglose de bonos del Tesoro.' },
      { label: 'Circle CCTP (Cross-Chain Protocol)', url: 'https://www.circle.com/en/cross-chain-transfer-protocol', type: 'docs', desc: 'Documentación del protocolo nativo de quemado y acuñación de USDC sin puentes sintéticos.' },
      { label: 'Contrato USDC en Etherscan', url: 'https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48', type: 'explorer', desc: 'Contrato oficial del token USDC en Ethereum Mainnet.' }
    ]
  },
  'Tether (USDT)': {
    id: 'usdt',
    name: 'Tether (USDT)',
    category: 'Stablecoin',
    tag: 'Mayor Liquidez',
    badge: 'Piedra Angular de Trading',
    officialSite: 'https://tether.to',
    summary: 'La stablecoin con mayor volumen diario y presencia global, respaldada por reservas de efectivo, letras del tesoro estadounidense y otros activos.',
    links: [
      { label: 'Portal Oficial de Tether', url: 'https://tether.to', type: 'official', desc: 'Información corporativa y emisión en múltiples redes (Tron, Ethereum, Solana).' },
      { label: 'Panel de Transparencia & Reservas', url: 'https://tether.to/en/transparency/', type: 'analytics', desc: 'Informes trimestrales de atestación de reservas por BDO Italia y balance de tesorería.' },
      { label: 'Contrato USDT en Etherscan', url: 'https://etherscan.io/token/0xdac17f958d2ee523a2206206994597c13d831ec7', type: 'explorer', desc: 'Contrato de USDT en Ethereum Mainnet con permisos de congelación.' }
    ]
  },
  'EURC (EURC)': {
    id: 'eurc',
    name: 'EURC (Euro Coin de Circle)',
    category: 'Stablecoin',
    tag: 'Euro MiCA EMT',
    badge: 'Referencia en Euros UE',
    officialSite: 'https://www.circle.com/en/eurc',
    summary: 'Moneda de dinero electrónico (EMT) regulada denominada en euros emitida por Circle bajo la estricta normativa del Reglamento europeo MiCA.',
    links: [
      { label: 'Portal Oficial Circle EURC', url: 'https://www.circle.com/en/eurc', type: 'official', desc: 'El euro digital plenamente reservado y conforme con las directrices de la UE.' },
      { label: 'Informes de Atestación de Reservas', url: 'https://www.circle.com/en/transparency', type: 'analytics', desc: 'Auditorías de reservas en cuentas bancarias denominadas en euros segregadas.' },
      { label: 'Contrato EURC en Etherscan', url: 'https://etherscan.io/token/0x1aba52e3a39c1ce690bd49271630165a4b742f16', type: 'explorer', desc: 'Contrato verificado del token EURC en Ethereum.' }
    ]
  },
  'DAI (DAI)': {
    id: 'dai',
    name: 'DAI (Multi-Collateral)',
    category: 'Stablecoin',
    tag: 'Descentralizada',
    badge: 'Sobre-Colateralizada',
    officialSite: 'https://makerdao.com',
    summary: 'Moneda digital con valor anclado al dólar estadounidense, emitida por el protocolo MakerDAO mediante contratos inteligentes sobre-colateralizados.',
    links: [
      { label: 'Portal MakerDAO DAI', url: 'https://makerdao.com', type: 'official', desc: 'Información general sobre el ecosistema DAI y gobernanza descentralizada.' },
      { label: 'DaiStats (Transparencia en Tiempo Real)', url: 'https://daistats.com', type: 'analytics', desc: 'Ratio de colateralización agregado, tipos de interés DSR y salud de las bóvedas.' },
      { label: 'Contrato DAI en Etherscan', url: 'https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f', type: 'explorer', desc: 'Contrato ERC-20 oficial de DAI en Ethereum Mainnet.' }
    ]
  },
  'USDS (USDS)': {
    id: 'usds',
    name: 'USDS (Sky Protocol)',
    category: 'Stablecoin',
    tag: 'Evolución de DAI',
    badge: 'Sky Ecosystem',
    officialSite: 'https://sky.money',
    summary: 'La moneda nativa descentralizada de la era Endgame de MakerDAO, que permite acumular recompensas nativas en el Sky Savings Rate (SSR).',
    links: [
      { label: 'Portal Oficial Sky.money', url: 'https://sky.money', type: 'dapp', desc: 'Acuñación, canje 1:1 desde DAI y acceso al Sky Savings Rate sin bloqueo.' },
      { label: 'Documentación Oficial Sky', url: 'https://docs.sky.money', type: 'docs', desc: 'Arquitectura de tokens USDS, SKY y mecanismos de gobernanza.' }
    ]
  },
  'PayPal USD (PYUSD)': {
    id: 'pyusd',
    name: 'PayPal USD (PYUSD)',
    category: 'Stablecoin',
    tag: 'Fintech Institucional',
    badge: 'Emitida por Paxos',
    officialSite: 'https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd',
    summary: 'Stablecoin emitida por Paxos Trust Company para PayPal, regulada por el Departamento de Servicios Financieros del Estado de Nueva York (NYDFS).',
    links: [
      { label: 'Página Oficial PayPal PYUSD', url: 'https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd', type: 'official', desc: 'Uso en la app de PayPal, transferencias gratuitas y compras a comercios.' },
      { label: 'Informes de Transparencia de Paxos', url: 'https://paxos.com/pyusd-transparency/', type: 'analytics', desc: 'Atestaciones mensuales independientes de reservas y custodia bancaria.' },
      { label: 'Contrato PYUSD en Etherscan', url: 'https://etherscan.io/token/0x6c3ea9036406852006290770bedfcaba0e23a0e8', type: 'explorer', desc: 'Contrato oficial del token PYUSD en Ethereum.' }
    ]
  },

  // --- WALLETS ---
  'MetaMask': {
    id: 'metamask',
    name: 'MetaMask',
    category: 'Wallet',
    tag: 'Hot Wallet Web3',
    badge: 'El Estándar EVM',
    officialSite: 'https://metamask.io',
    summary: 'La extensión de navegador y aplicación móvil más utilizada para interactuar con blockchains EVM y aplicaciones descentralizadas.',
    links: [
      { label: 'Descarga Oficial (Extensión y App)', url: 'https://metamask.io/download/', type: 'official', desc: 'Instalación para Chrome, Firefox, Brave, iOS y Android.' },
      { label: 'MetaMask Portfolio DApp', url: 'https://portfolio.metamask.io', type: 'dapp', desc: 'Visualización agregada de activos multicadena, staking nativo y puente.' },
      { label: 'Documentación para Desarrolladores', url: 'https://docs.metamask.io', type: 'docs', desc: 'APIs del proveedor `window.ethereum`, Snaps SDK y gestión de permisos.' },
      { label: 'Centro de Seguridad & Soporte', url: 'https://support.metamask.io', type: 'official', desc: 'Guías de protección de frases semilla y prevención de phishing.' }
    ]
  },
  'Rabby Wallet': {
    id: 'rabby-wallet',
    name: 'Rabby Wallet',
    category: 'Wallet',
    tag: 'Seguridad Avanzada DeFi',
    badge: 'Por DeBank',
    officialSite: 'https://rabby.io',
    summary: 'Wallet de navegador diseñada específicamente para DeFi con simulación previa de transacciones, decodificación de llamadas y análisis de riesgos antirobo.',
    links: [
      { label: 'Descarga Oficial Rabby', url: 'https://rabby.io', type: 'official', desc: 'Descarga de extensión de navegador y aplicación de escritorio.' },
      { label: 'Código Fuente en GitHub', url: 'https://github.com/RabbyHub/Rabby', type: 'github', desc: 'Repositorio abierto y auditorías de seguridad independientes.' },
      { label: 'Revoke.cash (Gestión de Permisos)', url: 'https://revoke.cash', type: 'dapp', desc: 'Herramienta recomendada para escanear y revocar aprobaciones infinitas de tokens.' }
    ]
  },
  'Phantom': {
    id: 'phantom',
    name: 'Phantom Wallet',
    category: 'Wallet',
    tag: 'Multichain',
    badge: 'Líder en Solana & Bitcoin',
    officialSite: 'https://phantom.app',
    summary: 'Monedero amigable multicadena líder en Solana con soporte completo para Ethereum, Polygon y Bitcoin Ordinals.',
    links: [
      { label: 'Descarga Oficial Phantom', url: 'https://phantom.app/download', type: 'official', desc: 'Extensión para navegador y aplicación nativa para smartphones.' },
      { label: 'Documentación para Desarrolladores', url: 'https://docs.phantom.app', type: 'docs', desc: 'Integración del SDK de Phantom para Solana y cadenas EVM.' },
      { label: 'Guías de Seguridad Oficiales', url: 'https://phantom.app/learn', type: 'official', desc: 'Avisos sobre prevención de estafas y gestión de firmas seguras.' }
    ]
  },
  'Trust Wallet': {
    id: 'trust-wallet',
    name: 'Trust Wallet',
    category: 'Wallet',
    tag: 'Hot Wallet Móvil',
    badge: 'Soporte +100 Blockchains',
    officialSite: 'https://trustwallet.com',
    summary: 'Monedero móvil multicadena autogestionado que permite almacenar, enviar y recibir criptoactivos en más de un centenar de redes distintas.',
    links: [
      { label: 'Web Oficial Trust Wallet', url: 'https://trustwallet.com', type: 'official', desc: 'Enlaces oficiales de descarga para Android, iOS y extensiones de navegador.' },
      { label: 'Soporte y Preguntas Frecuentes', url: 'https://support.trustwallet.com', type: 'docs', desc: 'Artículos de asistencia, configuración de redes RPC y resolución de dudas.' }
    ]
  },
  'Ledger': {
    id: 'ledger',
    name: 'Ledger (Hardware Wallet)',
    category: 'Wallet',
    tag: 'Cold Storage',
    badge: 'Chip Seguro EAL 5+',
    officialSite: 'https://www.ledger.com',
    summary: 'Líder mundial en monederos de hardware para almacenamiento en frío con elementos seguros certificados que aíslan las claves privadas de internet.',
    links: [
      { label: 'Portal Oficial Ledger', url: 'https://www.ledger.com', type: 'official', desc: 'Catálogo de dispositivos Ledger Flex, Stax, Nano X y accesorios oficiales.' },
      { label: 'Ledger Live (Suite de Gestión)', url: 'https://www.ledger.com/ledger-live', type: 'dapp', desc: 'Aplicación oficial para gestionar cuentas, verificar firmas y actualizar firmware.' },
      { label: 'Ledger Academy (Educación & Seguridad)', url: 'https://www.ledger.com/academy', type: 'docs', desc: 'Guías fundamentales sobre autocustodia, entropía y copias de seguridad.' }
    ]
  },
  'Trezor': {
    id: 'trezor',
    name: 'Trezor (Hardware Wallet)',
    category: 'Wallet',
    tag: 'Cold Storage',
    badge: '100% Open Source',
    officialSite: 'https://trezor.io',
    summary: 'El primer monedero físico de criptomonedas del mundo, con diseño de hardware y firmware completamente de código abierto y auditable.',
    links: [
      { label: 'Web Oficial Trezor', url: 'https://trezor.io', type: 'official', desc: 'Dispositivos Trezor Safe 3, Safe 5, Model One y Model T.' },
      { label: 'Trezor Suite App', url: 'https://suite.trezor.io', type: 'dapp', desc: 'Aplicación de escritorio y web oficial para realizar transferencias protegidas.' },
      { label: 'Repositorio GitHub Oficial', url: 'https://github.com/trezor', type: 'github', desc: 'Código fuente abierto del firmware, bootloader y aplicaciones de Trezor.' }
    ]
  },
  'BitBox': {
    id: 'bitbox',
    name: 'BitBox (Shift Crypto)',
    category: 'Wallet',
    tag: 'Cold Storage Suizo',
    badge: 'Seguridad de Precisión',
    officialSite: 'https://shiftcrypto.ch',
    summary: 'Dispositivo de hardware suizo con copia de seguridad directa en tarjeta microSD y arquitectura de seguridad con dual-chip.',
    links: [
      { label: 'Web Oficial BitBox02', url: 'https://shiftcrypto.ch', type: 'official', desc: 'Información sobre las versiones BitBox02 Multi-Edition y Bitcoin-only.' },
      { label: 'Descarga BitBoxApp', url: 'https://shiftcrypto.ch/app/', type: 'dapp', desc: 'Software oficial para emparejar el dispositivo físico y firmar transacciones.' },
      { label: 'Repositorio Abierto GitHub', url: 'https://github.com/digitalbitbox', type: 'github', desc: 'Auditorías y código fuente completo del hardware y firmware suizo.' }
    ]
  },

  // --- INSTRUMENTOS DEFI ESPECÍFICOS ---
  'Pools de Liquidez': {
    id: 'pools-liquidez',
    name: 'Pools de Liquidez & AMM',
    category: 'Instrumento',
    tag: 'DeFi Core',
    badge: 'Curvas Matemáticas x·y=k',
    officialSite: 'https://uniswap.org',
    summary: 'Mecanismo donde los proveedores depositan pares de activos a cambio de comisiones por swap, con modelos de liquidez concentrada V3.',
    links: [
      { label: 'Uniswap V3 Pool Explorer', url: 'https://info.uniswap.org/#/pools', type: 'dapp', desc: 'Explorador en tiempo real de rangos de liquidez, comisiones de swap y volumen.' },
      { label: 'DefiLlama Yields & Pools', url: 'https://defillama.com/yields', type: 'analytics', desc: 'Comparador global de APY en pools de liquidez a través de cientos de protocolos.' },
      { label: 'Whitepaper de Uniswap V3 (PDF)', url: 'https://uniswap.org/whitepaper-v3.pdf', type: 'docs', desc: 'Formulación matemática completa de la liquidez concentrada y ticks de precio.' }
    ]
  },
  'Perpetuales': {
    id: 'perpetuales',
    name: 'Contratos Perpetuos On-Chain',
    category: 'Instrumento',
    tag: 'Derivados',
    badge: 'Funding Rate 24/7',
    officialSite: 'https://hyperliquid.xyz',
    summary: 'Derivados sintéticos sin fecha de expiración que permiten apalancamiento mediante liquidaciones dinámicas y tasas de financiación periódicas.',
    links: [
      { label: 'Hyperliquid Perps Trading', url: 'https://app.hyperliquid.xyz', type: 'dapp', desc: 'Terminal descentralizada de perpetuos con orderbook en Capa 1 de baja latencia.' },
      { label: 'GMX V2 Trading', url: 'https://app.gmx.io', type: 'dapp', desc: 'Mercado de futuros con pools de liquidez GM en Arbitrum.' },
      { label: 'Coinglass Funding Rates Global', url: 'https://www.coinglass.com/FundingRate', type: 'analytics', desc: 'Mapa de calor de tasas de financiación de perpetuos en todos los exchanges.' }
    ]
  },
  'Préstamos On-Chain': {
    id: 'prestamos-onchain',
    name: 'Préstamos On-Chain & Lending',
    category: 'Instrumento',
    tag: 'DeFi Core',
    badge: 'Health Factor & LTV',
    officialSite: 'https://aave.com',
    summary: 'Mercados de crédito algorítmicos donde los tipos de interés se ajustan automáticamente según la tasa de utilización del fondo.',
    links: [
      { label: 'Aave Protocol V3 Markets', url: 'https://app.aave.com', type: 'dapp', desc: 'Consola de mercados monetarios con control de factor de salud y LTV.' },
      { label: 'Morpho Blue Markets', url: 'https://app.morpho.org', type: 'dapp', desc: 'Mercados de préstamo modulares y aislados con parámetros inmutables.' },
      { label: 'DefiLlama Borrows & Lending', url: 'https://defillama.com/borrows', type: 'analytics', desc: 'Ranking de los mayores mercados de crédito por volumen y utilización.' }
    ]
  },
  'Liquid Staking': {
    id: 'liquid-staking',
    name: 'Liquid Staking (LST) & Staking Nativo',
    category: 'Instrumento',
    tag: 'Rendimiento',
    badge: 'Derivados PoS',
    officialSite: 'https://lido.fi',
    summary: 'Tokens negociables que representan criptoactivos delegados en validadores de consenso, preservando la liquidez del capital.',
    links: [
      { label: 'Lido Staking App', url: 'https://stake.lido.fi', type: 'dapp', desc: 'Acuñación y canje de stETH con recompensas de staking de Ethereum.' },
      { label: 'Dune Ethereum Staking Dashboard', url: 'https://dune.com/hildobby/eth2-staking', type: 'analytics', desc: 'Cuota de validadores, ratio de staking de la red y salud de la descentralización.' }
    ]
  },
  'Restaking': {
    id: 'restaking',
    name: 'Restaking & Seguridad Compartida',
    category: 'Instrumento',
    tag: 'Infraestructura',
    badge: 'EigenLayer & Symbiotic',
    officialSite: 'https://eigenlayer.xyz',
    summary: 'Reutilización del capital comprometido en Proof of Stake para asegurar servicios auxiliares (AVS), oráculos y puentes a cambio de rendimiento extra.',
    links: [
      { label: 'EigenLayer Console', url: 'https://app.eigenlayer.xyz', type: 'dapp', desc: 'Plataforma para delegar LSTs y ETH nativo en operadores de AVS.' },
      { label: 'Symbiotic Restaking', url: 'https://symbiotic.fi', type: 'dapp', desc: 'Protocolo de restaking modular agnóstico a colaterales.' },
      { label: 'Documentación Oficial AVS', url: 'https://docs.eigenlayer.xyz', type: 'docs', desc: 'Especificaciones técnicas de servicios validados activamente.' }
    ]
  },
  'Vaults ERC-4626': {
    id: 'vaults-erc4626',
    name: 'Bóvedas Tokenizadas ERC-4626',
    category: 'Instrumento',
    tag: 'Rendimiento',
    badge: 'Estándar EIP-4626',
    officialSite: 'https://eips.ethereum.org/EIPS/eip-4626',
    summary: 'Estándar técnico unificado de la comunidad Ethereum que define una API común para depósitos y retiros en bóvedas de rendimiento.',
    links: [
      { label: 'Especificación Oficial EIP-4626', url: 'https://eips.ethereum.org/EIPS/eip-4626', type: 'docs', desc: 'Definición técnica de métodos `deposit()`, `mint()`, `withdraw()` y `redeem()`.' },
      { label: 'Yearn Finance V3 Vaults', url: 'https://yearn.fi', type: 'dapp', desc: 'Bóvedas automatizadas construidas sobre el estándar ERC-4626.' },
      { label: 'Beefy Finance Yield Optimizer', url: 'https://beefy.com', type: 'dapp', desc: 'Auto-compounders multicadena sobre vaults estandarizados.' }
    ]
  },
  'Puentes Cross-Chain': {
    id: 'puentes-crosschain',
    name: 'Puentes Cross-Chain & Mensajería Inter-Red',
    category: 'Instrumento',
    tag: 'Infraestructura',
    badge: 'CCTP, Relayers & Intents',
    officialSite: 'https://across.to',
    summary: 'Protocolos de comunicación que permiten transportar tokens y comandos entre blockchains y Capas 2 con distintas arquitecturas.',
    links: [
      { label: 'Across Protocol Bridge', url: 'https://across.to', type: 'dapp', desc: 'El puente más rápido de la industria fundamentado en subastas de intents.' },
      { label: 'L2Beat Bridges Risk Matrix', url: 'https://l2beat.com/bridges/summary', type: 'analytics', desc: 'Evaluación técnica detallada de los riesgos de centralización de cada puente.' },
      { label: 'Chainlink CCIP Explorer', url: 'https://ccip.chain.link', type: 'explorer', desc: 'Explorador de mensajería y transacciones cross-chain garantizadas por la red de Chainlink.' }
    ]
  },
  'Oráculos & MEV': {
    id: 'oraculos-mev',
    name: 'Oráculos & Gestión de MEV',
    category: 'Instrumento',
    tag: 'Infraestructura',
    badge: 'Datos Verificados & Private RPC',
    officialSite: 'https://chain.link',
    summary: 'Redes descentralizadas que conectan smart contracts con datos externos del mundo real, y herramientas de defensa contra arbitrajes dañinos en el mempool.',
    links: [
      { label: 'Chainlink Data Feeds Portal', url: 'https://data.chain.link', type: 'official', desc: 'Monitor público de feeds de precios de oráculos descentralizados.' },
      { label: 'Pyth Network Price Feeds', url: 'https://pyth.network', type: 'official', desc: 'Oráculo sub-segundo bajo demanda suministrado directamente por bolsas y market makers.' },
      { label: 'Flashbots Protect RPC', url: 'https://flashbots.net', type: 'docs', desc: 'Endpoint RPC gratuito para proteger transacciones de ataques sandwich y front-running.' }
    ]
  },
  'RWA': {
    id: 'rwa',
    name: 'RWA (Activos del Mundo Real)',
    category: 'Instrumento',
    tag: 'Finanzas Híbridas',
    badge: 'Deuda Soberana Tokenizada',
    officialSite: 'https://ondo.finance',
    summary: 'Representación on-chain de activos financieros tradicionales (bonos del tesoro, crédito corporativo, materias primas) con respaldo jurídico.',
    links: [
      { label: 'RWA.xyz Monitor Institucional', url: 'https://app.rwa.xyz', type: 'analytics', desc: 'Plataforma líder de análisis del mercado institucional de deuda y activos tokenizados.' },
      { label: 'Ondo Finance Portal', url: 'https://ondo.finance', type: 'dapp', desc: 'Tesoros públicos tokenizados de máxima liquidez para protocolos DeFi.' },
      { label: 'BlackRock BUIDL (Etherscan)', url: 'https://etherscan.io/token/0x7712c3420373d33e08197775a6873c383e20e890', type: 'explorer', desc: 'Contrato verificado del fondo de liquidez digital institucional de BlackRock.' }
    ]
  },
  'DAOs': {
    id: 'daos',
    name: 'DAOs & Gobernanza On-Chain',
    category: 'Instrumento',
    tag: 'Gobernanza',
    badge: 'Timelocks & Multisig',
    officialSite: 'https://tally.xyz',
    summary: 'Organizaciones Autónomas Descentralizadas donde los tenedores de tokens votan la gestión de tesorería y parámetros de riesgo con retrasos mandatorios.',
    links: [
      { label: 'Snapshot (Votación Off-Chain Sin Gas)', url: 'https://snapshot.org', type: 'dapp', desc: 'Plataforma donde las DAOs votan propuestas de señalización sin pagar comisiones de gas.' },
      { label: 'Tally Governance Portal', url: 'https://www.tally.xyz', type: 'dapp', desc: 'Gestor y explorador de propuestas de gobernanza on-chain con Timelocks ejecutables.' },
      { label: 'DeepDAO Metrics & Treasuries', url: 'https://deepdao.io', type: 'analytics', desc: 'Clasificación de tesorerías de DAOs y participación de votantes.' }
    ]
  },
  'Seguros': {
    id: 'seguros',
    name: 'Seguros Descentralizados & Cobertura',
    category: 'Instrumento',
    tag: 'Protección',
    badge: 'Nexus Mutual & InsurAce',
    officialSite: 'https://nexusmutual.io',
    summary: 'Protocolos de cobertura mutualizada que protegen contra fallos en contratos inteligentes, exploits y depegs de stablecoins.',
    links: [
      { label: 'Nexus Mutual DApp', url: 'https://app.nexusmutual.io', type: 'dapp', desc: 'Contratación de coberturas de protocolo, pools de suscripción y reclamos descentralizados.' },
      { label: 'InsurAce Protocol', url: 'https://app.insurace.io', type: 'dapp', desc: 'Plataforma multicadena de seguros DeFi para carteras y puentes.' }
    ]
  },
  'Reglamento MiCA': {
    id: 'reglamento-mica',
    name: 'Reglamento MiCA (UE 2023/1114)',
    category: 'Instrumento',
    tag: 'Marco Legal',
    badge: 'Normativa Europea Oficial',
    officialSite: 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R1114',
    summary: 'Reglamento europeo que establece el marco armonizado para proveedores de servicios de criptoactivos (CASP) y emisores de fichas EMT y ART.',
    links: [
      { label: 'Texto Oficial del Reglamento en EUR-Lex', url: 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R1114', type: 'regulation', desc: 'Publicación oficial en el Diario Oficial de la Unión Europea del Reglamento (UE) 2023/1114.' },
      { label: 'Portal CNMV - Criptoactivos & MiCA', url: 'https://www.cnmv.es/portal/Fintech/Criptoactivos.aspx', type: 'regulation', desc: 'Directrices del supervisor español sobre el régimen transitorio de MiCA hasta julio de 2026.' },
      { label: 'Registro de Criptoactivos de la ESMA', url: 'https://www.esma.europa.eu', type: 'regulation', desc: 'Registro europeo consolidado de proveedores autorizados y normas técnicas (RTS/ITS).' }
    ]
  },
  'Modelo 721 AEAT': {
    id: 'modelo-721',
    name: 'Modelo 721 AEAT & Fiscalidad España',
    category: 'Instrumento',
    tag: 'Fiscalidad',
    badge: 'Hacienda Pública Española',
    officialSite: 'https://sede.agenciatributaria.gob.es',
    summary: 'Declaración informativa anual sobre monedas virtuales situadas en el extranjero para residentes fiscales con más de 50.000 € en custodia exterior.',
    links: [
      { label: 'Sede Electrónica AEAT - Modelo 721', url: 'https://sede.agenciatributaria.gob.es/Sede/procedimientoini/GI56.shtml', type: 'regulation', desc: 'Presentación telemática del Modelo 721 (plazo del 1 de enero al 31 de marzo).' },
      { label: 'Sede Electrónica AEAT - Modelos 172 y 173', url: 'https://sede.agenciatributaria.gob.es/Sede/procedimientoini/GI54.shtml', type: 'regulation', desc: 'Declaraciones informativas para intermediarios y custodios residentes en España.' },
      { label: 'Directiva Europea DAC8 (UE 2023/2226)', url: 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023L2226', type: 'regulation', desc: 'Marco europeo de intercambio automático de información tributaria sobre criptoactivos.' }
    ]
  },
  'DEX': {
    id: 'dex',
    name: 'Exchanges Descentralizados (DEX)',
    category: 'Instrumento',
    tag: 'Liquidez',
    badge: 'Intercambio Sin Permiso',
    officialSite: 'https://defillama.com/dexs',
    summary: 'Plataformas de intercambio no custodiado donde los usuarios conservan la propiedad de sus claves privadas mientras comercian activos en la blockchain.',
    links: [
      { label: 'DefiLlama DEX Volume Dashboard', url: 'https://defillama.com/dexs', type: 'analytics', desc: 'Comparativa de volumen de trading diario, spreads y cuota de mercado de exchanges descentralizados.' },
      { label: 'Uniswap Web3 App', url: 'https://app.uniswap.org', type: 'dapp', desc: 'El mayor DEX de la historia de las finanzas descentralizadas.' },
      { label: 'CowSwap (Agregador MEV-Protected)', url: 'https://swap.cow.fi', type: 'dapp', desc: 'Protocolo de subastas por lotes (batch auctions) para evitar front-running y sandwich attacks.' }
    ]
  },
  'Stablecoins': {
    id: 'stablecoins-general',
    name: 'Stablecoins & Dinero Digital',
    category: 'Instrumento',
    tag: 'Estabilidad',
    badge: 'EMT, ART & Sintéticos',
    officialSite: 'https://defillama.com/stablecoins',
    summary: 'Tokens concebidos para mantener un valor estable respecto a una divisa fiduciaria o cesta de activos, facilitando pagos y reservas on-chain.',
    links: [
      { label: 'DefiLlama Stablecoins Monitor', url: 'https://defillama.com/stablecoins', type: 'analytics', desc: 'Capitalización de mercado total, cuota de USDT, USDC, USDS y flujos de liquidez.' },
      { label: 'Bluechip (Calificación de Riesgo)', url: 'https://bluechip.org', type: 'analytics', desc: 'Agencia de calificación independiente que evalúa la solvencia y gobernanza de stablecoins.' },
      { label: 'Circle Transparency Portal', url: 'https://www.circle.com/en/transparency', type: 'official', desc: 'Informes de auditoría de las mayores reservas de stablecoins reguladas bajo MiCA.' }
    ]
  },

  // --- MERCADOS TRADICIONALES ---
  'Acciones': {
    id: 'acciones',
    name: 'Mercados de Acciones (Renta Variable)',
    category: 'Mercado',
    tag: 'Mercados Financieros',
    badge: 'Títulos de Propiedad Corporativa',
    officialSite: 'https://www.bolsasymercados.es',
    summary: 'Valores negociables representativos de una fracción del capital social de una empresa que otorgan derechos económicos y políticos.',
    links: [
      { label: 'BME (Bolsas y Mercados Españoles)', url: 'https://www.bolsasymercados.es', type: 'official', desc: 'Cotizaciones oficiales del IBEX 35, Mercado Continuo e información corporativa.' },
      { label: 'CNMV - Registros Oficiales', url: 'https://www.cnmv.es', type: 'regulation', desc: 'Comisión Nacional del Mercado de Valores de España: hechos relevantes y folletos de emisión.' },
      { label: 'Investing.com Cotizaciones Globales', url: 'https://es.investing.com/equities/', type: 'analytics', desc: 'Seguimiento en tiempo real de índices bursátiles y acciones de todo el mundo.' }
    ]
  },
  'Bonos': {
    id: 'bonos',
    name: 'Mercados de Bonos (Renta Fija)',
    category: 'Mercado',
    tag: 'Mercados Financieros',
    badge: 'Deuda Soberana y Corporativa',
    officialSite: 'https://www.tesoro.es',
    summary: 'Títulos de deuda emitidos por Estados o corporaciones que devengan un cupón periódico y reembolsan el principal al vencimiento.',
    links: [
      { label: 'Tesoro Público de España', url: 'https://www.tesoro.es', type: 'official', desc: 'Subastas de Letras, Bonos y Obligaciones del Estado con tipos de interés marginales.' },
      { label: 'Banco Central Europeo (BCE / ECB)', url: 'https://www.ecb.europa.eu', type: 'regulation', desc: 'Tipos de interés oficiales de política monetaria en la Eurozona.' },
      { label: 'US Treasury Direct', url: 'https://www.treasurydirect.gov', type: 'official', desc: 'Información oficial de la deuda pública de Estados Unidos (T-Bills, Notes, Bonds).' }
    ]
  },
  'Futuros': {
    id: 'futuros',
    name: 'Mercados de Futuros',
    category: 'Mercado',
    tag: 'Derivados',
    badge: 'Cámaras de Compensación (CCP)',
    officialSite: 'https://www.cmegroup.com',
    summary: 'Contratos estandarizados en los que las partes se comprometen a intercambiar un activo subyacente a un precio fijado en una fecha futura determinada.',
    links: [
      { label: 'CME Group (Chicago Mercantile Exchange)', url: 'https://www.cmegroup.com', type: 'official', desc: 'La bolsa de futuros y opciones más grande del mundo (materias primas, índices, cripto).' },
      { label: 'MEFF (Mercado Español de Derivados)', url: 'https://www.meff.es', type: 'official', desc: 'Mercado regulado español de futuros y opciones sobre el IBEX 35 y acciones.' }
    ]
  },
  'Opciones': {
    id: 'opciones',
    name: 'Mercados de Opciones',
    category: 'Mercado',
    tag: 'Derivados',
    badge: 'Call & Put (Derechos Asimétricos)',
    officialSite: 'https://www.cboe.com',
    summary: 'Contratos que otorgan al comprador el derecho (pero no la obligación) de comprar (Call) o vender (Put) un activo subyacente a un precio de ejercicio (Strike).',
    links: [
      { label: 'CBOE (Chicago Board Options Exchange)', url: 'https://www.cboe.com', type: 'official', desc: 'El mayor mercado de opciones del mundo e inventor del índice de volatilidad VIX.' },
      { label: 'Deribit (Líder en Opciones Cripto)', url: 'https://www.deribit.com', type: 'dapp', desc: 'Plataforma con más del 85% del volumen mundial de opciones sobre Bitcoin y Ethereum.' },
      { label: 'Greeks.live (Analíticas de Volatilidad)', url: 'https://greeks.live', type: 'analytics', desc: 'Análisis de volatilidad implícita, skew y distribución de strikes de opciones.' }
    ]
  },

  // --- LAS 14 PLATAFORMAS FINANCIERAS, ON-CHAIN & ANALÍTICAS ---
  // BLOQUE 1: ANALÍTICA ON-CHAIN, MÉTRICAS DE PROTOCOLOS & AGREGADORES CRIPTO
  'DefiLlama': {
    id: 'defillama',
    name: 'DefiLlama',
    category: 'Plataforma DeFi',
    tag: 'Analítica On-Chain',
    badge: 'Bloque 1 • Analítica On-Chain',
    officialSite: 'https://defillama.com/',
    summary: 'La mayor base de datos abierta, transparente e independiente del ecosistema descentralizado. Registra TVL (Total Value Locked), comisiones, ingresos de protocolos, tesorerías de DAOs, stablecoins, yields de pools y auditorías de seguridad sin sesgos comerciales.',
    links: [
      { label: 'Portal Oficial DefiLlama', url: 'https://defillama.com/', type: 'official', desc: 'Plataforma completa con rankings, métricas de cadenas y protocolos.' },
      { label: 'Ranking de DEXs & Volúmenes', url: 'https://defillama.com/dexs', type: 'analytics', desc: 'Comparativa de volumen de trading diario, cuota de mercado y fees generadas.' },
      { label: 'Monitor de Stablecoins Global', url: 'https://defillama.com/stablecoins', type: 'analytics', desc: 'Suministro circulante, capitalización y flujos de USDT, USDC, USDS y más.' },
      { label: 'Comparador de Rendimientos (Yields)', url: 'https://defillama.com/yields', type: 'analytics', desc: 'Rastreo y filtrado de APY en miles de pools de liquidez y bóvedas.' },
      { label: 'Desglose de Cadenas (Chains TVL)', url: 'https://defillama.com/chains', type: 'analytics', desc: 'Distribución de capital entre Ethereum, Solana, Arbitrum, BSC, etc.' }
    ]
  },
  'Glassnode': {
    id: 'glassnode',
    name: 'Glassnode Studio',
    category: 'Plataforma DeFi',
    tag: 'Inteligencia On-Chain',
    badge: 'Bloque 1 • Inteligencia On-Chain',
    officialSite: 'https://studio.glassnode.com/home',
    summary: 'Plataforma líder de inteligencia on-chain de grado institucional. Ofrece métricas econométricas y forenses avanzadas (MVRV, SOPR, Puell Multiple), flujos de ballenas, saldos en exchanges y comportamiento de acumulación de Bitcoin y Ethereum.',
    links: [
      { label: 'Glassnode Studio Home', url: 'https://studio.glassnode.com/home', type: 'official', desc: 'Terminal de gráficos y métricas on-chain en tiempo real.' },
      { label: 'Glassnode Insights & Research', url: 'https://insights.glassnode.com', type: 'docs', desc: 'Informes semanales sobre la salud económica de Bitcoin y Ethereum.' },
      { label: 'Glassnode Academy & Documentación', url: 'https://academy.glassnode.com', type: 'docs', desc: 'Definiciones matemáticas de cada indicador on-chain y metodología.' }
    ]
  },
  'Glassnode Studio': {
    id: 'glassnode-studio',
    name: 'Glassnode Studio',
    category: 'Plataforma DeFi',
    tag: 'Inteligencia On-Chain',
    badge: 'Bloque 1 • Inteligencia On-Chain',
    officialSite: 'https://studio.glassnode.com/home',
    summary: 'Plataforma líder de inteligencia on-chain de grado institucional. Ofrece métricas econométricas y forenses avanzadas (MVRV, SOPR, Puell Multiple), flujos de ballenas, saldos en exchanges y comportamiento de acumulación de Bitcoin y Ethereum.',
    links: [
      { label: 'Glassnode Studio Home', url: 'https://studio.glassnode.com/home', type: 'official', desc: 'Terminal de gráficos y métricas on-chain en tiempo real.' },
      { label: 'Glassnode Insights & Research', url: 'https://insights.glassnode.com', type: 'docs', desc: 'Informes semanales sobre la salud económica de Bitcoin y Ethereum.' },
      { label: 'Glassnode Academy & Documentación', url: 'https://academy.glassnode.com', type: 'docs', desc: 'Definiciones matemáticas de cada indicador on-chain y metodología.' }
    ]
  },
  'CoinMarketCap': {
    id: 'coinmarketcap',
    name: 'CoinMarketCap',
    category: 'Criptoactivo',
    tag: 'Agregador de Datos',
    badge: 'Bloque 1 • Agregador de Datos',
    officialSite: 'https://coinmarketcap.com/es/',
    summary: 'El agregador de cotizaciones y capitalización de mercado cripto más consultado del mundo. Proporciona precios en tiempo real, volúmenes de negociación en CEX y DEX, rankings de activos, gráficos históricos y métricas de dominancia.',
    links: [
      { label: 'CoinMarketCap en Español', url: 'https://coinmarketcap.com/es/', type: 'official', desc: 'Página principal en español con precios, capitalización y variaciones.' },
      { label: 'Rankings de Criptomonedas', url: 'https://coinmarketcap.com/es/coins/', type: 'analytics', desc: 'Listado ordenado por capitalización de mercado y volumen transaccional.' },
      { label: 'Ranking de Exchanges (Spot & Derivados)', url: 'https://coinmarketcap.com/es/rankings/exchanges/', type: 'analytics', desc: 'Puntuación de liquidez, reservas y solvencia de casas de cambio.' },
      { label: 'Índice de Miedo y Avaricia (Fear & Greed)', url: 'https://coinmarketcap.com/es/insights/fear-and-greed/', type: 'analytics', desc: 'Sentimiento de mercado ponderado por volatilidad y volumen social.' }
    ]
  },
  'Cryptoboard': {
    id: 'cryptoboard',
    name: 'Cryptoboard',
    category: 'Criptoactivo',
    tag: 'Dashboard de Control',
    badge: 'Bloque 1 • Dashboard de Control',
    officialSite: 'https://cryptoboard-psi.vercel.app/dashboard',
    summary: 'Dashboard interactivo y ligero para la monitorización consolidada de mercados de criptoactivos, carteras y métricas clave en una interfaz visual directa y ágil.',
    links: [
      { label: 'Acceso a Cryptoboard Dashboard', url: 'https://cryptoboard-psi.vercel.app/dashboard', type: 'dapp', desc: 'Panel de control interactivo con métricas consolidadas en tiempo real.' },
      { label: 'Web Oficial Cryptoboard', url: 'https://cryptoboard-psi.vercel.app', type: 'official', desc: 'Página de inicio y características de la plataforma de seguimiento.' }
    ]
  },

  // BLOQUE 2: TERMINALES BURSÁTILES, ANÁLISIS TÉCNICO & MACROECONOMÍA GLOBAL
  'TradingView': {
    id: 'tradingview',
    name: 'TradingView',
    category: 'Mercado',
    tag: 'Graficación Profesional',
    badge: 'Bloque 2 • Graficación Avanzada',
    officialSite: 'https://es.tradingview.com',
    summary: 'La plataforma de graficación avanzada y análisis técnico multi-activo más extendida entre operadores de todo el mundo. Soporta acciones, Forex, materias primas, bonos, criptoactivos, el lenguaje de programación Pine Script y herramientas colaborativas de mercado.',
    links: [
      { label: 'TradingView en Español', url: 'https://es.tradingview.com', type: 'official', desc: 'Portal oficial en español con gráficos interactivos y cotizaciones en vivo.' },
      { label: 'Supercharts TradingView', url: 'https://es.tradingview.com/chart/', type: 'analytics', desc: 'Espacio de trabajo gráfico con cientos de indicadores técnicos y herramientas de dibujo.' },
      { label: 'Screener de Acciones y Cripto', url: 'https://es.tradingview.com/screener/', type: 'analytics', desc: 'Filtro multicriterio por ratios financieros, volumen y osciladores.' },
      { label: 'Comunidad e Ideas de Trading', url: 'https://es.tradingview.com/ideas/', type: 'official', desc: 'Análisis técnicos compartidos por traders profesionales globales.' }
    ]
  },
  'ProRealTime': {
    id: 'prorealtime',
    name: 'ProRealTime',
    category: 'Mercado',
    tag: 'Terminal Institucional',
    badge: 'Bloque 2 • Terminal Institucional',
    officialSite: 'https://www.prorealtime.com/',
    summary: 'Software profesional de análisis técnico y trading bursátil de alta gama. Reconocido por sus feeds de datos tick a tick de máxima precisión, el escáner de mercado en tiempo real ProScreener, backtesting cuantitativo y conexión directa con los principales brokers.',
    links: [
      { label: 'Portal Oficial ProRealTime', url: 'https://www.prorealtime.com/', type: 'official', desc: 'Página web oficial de la plataforma de trading y análisis bursátil.' },
      { label: 'Herramientas de Análisis ProRealTime', url: 'https://www.prorealtime.com/es/caracteristicas', type: 'docs', desc: 'Detección automática de tendencias, ProScreener y gráficos avanzados.' },
      { label: 'Brokers Compatibles (Trading Directo)', url: 'https://www.prorealtime.com/es/trading-con-broker', type: 'official', desc: 'Integración para operar en bolsa con Interactive Brokers, Saxo y más.' }
    ]
  },
  'Investing.com': {
    id: 'investing-com',
    name: 'Investing.com España',
    category: 'Mercado',
    tag: 'Portal Macro & Bursátil',
    badge: 'Bloque 2 • Macro & Bursátil',
    officialSite: 'https://es.investing.com',
    summary: 'Portal global de información financiera y macroeconómica con cotizaciones en tiempo real de índices bursátiles (IBEX 35, S&P 500, Nasdaq), divisas Forex, materias primas, bonos soberanos y el calendario económico de mayor referencia.',
    links: [
      { label: 'Investing.com España', url: 'https://es.investing.com', type: 'official', desc: 'Cotizaciones en directo, noticias económicas y mercados financieros.' },
      { label: 'Calendario Económico Global', url: 'https://es.investing.com/economic-calendar/', type: 'analytics', desc: 'Datos macroeconómicos programados, IPC, PIB, tipos de interés y nóminas no agrícolas.' },
      { label: 'Mercado de Renta Fija (Bonos)', url: 'https://es.investing.com/rates-bonds/', type: 'analytics', desc: 'Rendimientos de bonos del tesoro de EE.UU., Bund alemán y deuda española.' },
      { label: 'Materias Primas & Energía', url: 'https://es.investing.com/commodities/', type: 'analytics', desc: 'Precios del petróleo Brent, crudo WTI, oro, plata y gas natural.' }
    ]
  },
  'Yahoo Finanzas': {
    id: 'yahoo-finanzas',
    name: 'Yahoo Finanzas',
    category: 'Mercado',
    tag: 'Estados Financieros',
    badge: 'Bloque 2 • Estados Financieros',
    officialSite: 'https://es.finance.yahoo.com',
    summary: 'Plataforma clásica de referencia para el análisis fundamental de compañías cotizadas. Permite consultar balances, cuentas de pérdidas y ganancias, flujo de caja libre, ratios de valoración (PER, Price/Book, EV/EBITDA), consenso de analistas y seguimiento de carteras.',
    links: [
      { label: 'Yahoo Finanzas en Español', url: 'https://es.finance.yahoo.com', type: 'official', desc: 'Página de inicio con resúmenes bursátiles y noticias empresariales.' },
      { label: 'Principales Índices Mundiales', url: 'https://es.finance.yahoo.com/world-indices/', type: 'analytics', desc: 'Seguimiento del comportamiento del Dow Jones, S&P 500, DAX e IBEX.' },
      { label: 'Mercados de Divisas (Forex)', url: 'https://es.finance.yahoo.com/currencies/', type: 'analytics', desc: 'Pares de divisas EUR/USD, USD/JPY, GBP/USD y tipos cruzados.' }
    ]
  },
  'MSN Dinero': {
    id: 'msn-dinero',
    name: 'MSN Dinero',
    category: 'Mercado',
    tag: 'Actualidad & Mercados',
    badge: 'Bloque 2 • Actualidad & Mercados',
    officialSite: 'https://www.msn.com/es-es/dinero',
    summary: 'Hub de información financiera y económica de Microsoft Start. Agrupa cotizaciones bursátiles en tiempo real, seguimiento de carteras personales, conversor de divisas, previsiones de bancos centrales y recopilación de prensa económica especializada.',
    links: [
      { label: 'MSN Dinero en Español', url: 'https://www.msn.com/es-es/dinero', type: 'official', desc: 'Noticias macroeconómicas, seguimiento de mercados e índices.' },
      { label: 'Seguimiento de Bolsas Globales', url: 'https://www.msn.com/es-es/dinero/mercados', type: 'analytics', desc: 'Comportamiento diario de las principales bolsas y valores destacados.' }
    ]
  },
  'Google Finance': {
    id: 'google-finance',
    name: 'Google Finance (Beta)',
    category: 'Mercado',
    tag: 'Seguimiento Bursátil Ágil',
    badge: 'Bloque 2 • Seguimiento Bursátil Ágil',
    officialSite: 'https://www.google.com/finance/beta',
    summary: 'Herramienta ágil de Google para el seguimiento en tiempo real de acciones, fondos indexados, índices globales y divisas. Ofrece listas de seguimiento personalizadas, comparativas gráficas directas y noticias relevantes contextualizadas.',
    links: [
      { label: 'Google Finance (Beta)', url: 'https://www.google.com/finance/beta', type: 'official', desc: 'Interfaz renovada con listas de seguimiento dinámicas y gráficos rápidos.' },
      { label: 'Mercados & Índices Google Finance', url: 'https://www.google.com/finance/markets/indexes', type: 'analytics', desc: 'Resumen en tiempo real de índices bursátiles de América, Europa y Asia.' }
    ]
  },

  // BLOQUE 3: META-AGREGACIÓN CROSS-CHAIN, GESTIÓN DE LIQUIDEZ AMM & PORTAFOLIOS WEB3
  'Jumper Exchange': {
    id: 'jumper-exchange',
    name: 'Jumper Exchange (by LI.FI)',
    category: 'Plataforma DeFi',
    tag: 'Meta-Agregador Cross-Chain',
    badge: 'Bloque 3 • Meta-Agregador Cross-Chain',
    officialSite: 'https://jumper.exchange/es',
    summary: 'El meta-agregador de puentes cross-chain y DEXs líder en Web3. Desarrollado sobre la infraestructura LI.FI, enruta intercambios de activos entre decenas de blockchains (Ethereum, Arbitrum, Solana, Polygon, Optimism, Base, etc.) optimizando coste de gas, deslizamiento y velocidad.',
    links: [
      { label: 'DApp Oficial Jumper Exchange (Español)', url: 'https://jumper.exchange/es', type: 'dapp', desc: 'Interfaz de swap y puente entre múltiples blockchains en un solo paso.' },
      { label: 'Documentación de LI.FI Protocol', url: 'https://docs.li.fi', type: 'docs', desc: 'Especificaciones técnicas de enrutamiento cross-chain y seguridad de puentes.' },
      { label: 'Jumper Profile & Misiones Web3', url: 'https://jumper.exchange/profile', type: 'official', desc: 'Seguimiento de actividad cross-chain, volumen acumulado y lealtad.' }
    ]
  },
  'Revert Finance': {
    id: 'revert-finance',
    name: 'Revert Finance',
    category: 'Plataforma DeFi',
    tag: 'Gestor de Liquidez AMM',
    badge: 'Bloque 3 • Gestión de Liquidez AMM',
    officialSite: 'https://revert.finance',
    summary: 'Suite analítica y operativa de grado profesional para proveedores de liquidez (LP) en creadores de mercado concentrado (Uniswap V3). Permite rastrear el rendimiento neto deduciendo la pérdida impermanente (Impermanent Loss), realizar backtesting de rangos y automatizar el auto-compound de comisiones.',
    links: [
      { label: 'DApp de Revert Finance', url: 'https://revert.finance', type: 'dapp', desc: 'Conecta tu wallet para auditar tus posiciones de liquidez en Uniswap V3.' },
      { label: 'Herramienta de Backtesting V3', url: 'https://revert.finance/#/initiator', type: 'analytics', desc: 'Simula rendimientos históricos y riesgos antes de desplegar capital en pools.' },
      { label: 'Automatizador Auto-Compound', url: 'https://revert.finance/#/automator', type: 'dapp', desc: 'Bóvedas que reinvierten automáticamente las comisiones generadas por tu posición.' }
    ]
  },
  'Krystal DeFi': {
    id: 'krystal-defi',
    name: 'Krystal DeFi',
    category: 'Plataforma DeFi',
    tag: 'Consola de Gestión Web3',
    badge: 'Bloque 3 • Consola de Gestión Web3',
    officialSite: 'https://defi.krystal.app',
    summary: 'Consola Web3 integral para la gestión de carteras y operaciones multicadena. Facilita la administración de posiciones en pools de liquidez de múltiples DEXs, optimización de depósitos de préstamo, swaps con agregación de rutas y protección integrada contra ataques de sándwich y MEV.',
    links: [
      { label: 'Krystal DeFi Web DApp', url: 'https://defi.krystal.app', type: 'dapp', desc: 'Interfaz de gestión de portafolio, swaps y provisión de liquidez en múltiples redes.' },
      { label: 'Documentación Oficial Krystal', url: 'https://docs.krystal.app', type: 'docs', desc: 'Guías de uso de Smart Swap, gestión de liquidez y oráculos de precios.' },
      { label: 'Portal Institucional Krystal', url: 'https://krystal.app', type: 'official', desc: 'Características del ecosistema y aplicaciones móviles para iOS y Android.' }
    ]
  },

  // BLOQUE 4: INTELIGENCIA FINANCIERA CONVERSACIONAL & MOTORES DE IA EN TIEMPO REAL
  'Perplexity Finance': {
    id: 'perplexity-finance',
    name: 'Perplexity Finance',
    category: 'Mercado',
    tag: 'Inteligencia Artificial Financiera',
    badge: 'Bloque 4 • Inteligencia Artificial Financiera',
    officialSite: 'https://www.perplexity.ai/finance/',
    summary: 'Motor de búsqueda conversacional de inteligencia artificial optimizado para el análisis financiero en tiempo real. Proporciona resúmenes ejecutivos de balances corporativos, cotizaciones en vivo, noticias de mercado contrastadas y métricas fundamentales con citas a fuentes primarias fiables.',
    links: [
      { label: 'Perplexity Finance Hub', url: 'https://www.perplexity.ai/finance/', type: 'official', desc: 'Terminal conversacional de IA para consultas bursátiles y financieras en directo.' },
      { label: 'Perplexity AI Search', url: 'https://www.perplexity.ai', type: 'official', desc: 'Motor de búsqueda general con capacidades de razonamiento profundo y citas.' }
    ]
  }
};

export const getLinksFor = (nameOrId: string): PlatformLinksResource | null => {
  if (!nameOrId) return null;
  
  // Direct match
  if (DIRECT_LINKS_REGISTRY[nameOrId]) {
    return DIRECT_LINKS_REGISTRY[nameOrId];
  }

  // Case insensitive or partial match
  const lower = nameOrId.toLowerCase().trim();
  for (const [key, val] of Object.entries(DIRECT_LINKS_REGISTRY)) {
    if (key.toLowerCase() === lower || val.id.toLowerCase() === lower || val.name.toLowerCase().includes(lower)) {
      return val;
    }
  }

  return null;
};
