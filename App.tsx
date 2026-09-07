import React, { useState, useEffect } from 'react';
import { Security } from './Plantilla/Seguridad';
import { Cabecera } from './Plantilla/Shell';
import { crypto, getShortcutKey, askGemini } from './Plantilla/Parameters';
import { 
  TrendingUp, TrendingDown, Landmark, Cpu, Wallet, 
  BarChart3, ShieldCheck, Zap, ArrowRight, Layers, 
  PieChart as PieIcon, Activity, Globe, Info, ExternalLink,
  MessageSquare, ChevronDown, ChevronUp, Send, Loader2, Sparkles, HelpCircle,
  Copy, Check, X, AlertTriangle, Scale, Plus, Coins, Gem, CircleDollarSign, DollarSign, Link as LinkIcon, Share2,
  RefreshCw, Smartphone, HardDrive, Shield, Lock, Clock, Network, BookOpen, Code, Terminal, User, FileText, Bot, Compass, ArrowRightLeft, Database,
  Star, NotebookPen
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar, ComposedChart, TooltipProps, LabelList
} from 'recharts';
import { LiquidityPoolSimulator } from './src/components/LiquidityPoolSimulator';
import { PerpetualsEngine } from './src/components/PerpetualsEngine';
import { LendingHealthSimulator } from './src/components/LendingHealthSimulator';
import { RegulatoryComplianceModule } from './src/components/RegulatoryComplianceModule';
import { RiskMatrixEvaluator } from './src/components/RiskMatrixEvaluator';
import { EcosystemInstrumentsExplorer } from './src/components/EcosystemInstrumentsExplorer';
import { EXPANDED_ECOSYSTEM_INSTRUMENTS } from './src/data/ecosystemData';
import { DirectLinksModal } from './src/components/DirectLinksModal';
import { getLinksFor, PlatformLinksResource } from './src/data/directLinksData';
import { DefiVsFiatMatrix } from './src/components/DefiVsFiatMatrix';
import { DexAmmEcosystemGuide } from './src/components/DexAmmEcosystemGuide';
import { FinancialPlatformsDirectory } from './src/components/FinancialPlatformsDirectory';
import { useFavorites } from './src/hooks/useFavorites';
import { ConceptNotesEditor } from './src/components/ConceptNotesEditor';
import { hasConceptNote } from './src/utils/notesStorage';

// --- DATA SETS ---
const multiplierData = [
  { name: 'Base (M0)', value: 1000 },
  { name: 'M1 (Efectivo)', value: 2500 },
  { name: 'M2 (Ahorro)', value: 5000 },
  { name: 'M3 (Depósitos)', value: 9500 },
];

const erosionData = [
  { year: 'Año 0', nominal: 10000, real: 10000 },
  { year: 'Año 5', nominal: 10000, real: 7800 },
  { year: 'Año 10', nominal: 10000, real: 6100 },
  { year: 'Año 15', nominal: 10000, real: 4800 },
  { year: 'Año 20', nominal: 10000, real: 3700 },
];

const riskReturnData = [
  { name: 'Efectivo', retorno: 1.5, riesgo: 0.5, liquidez: 10, color: '#9ca3af' },
  { name: 'Bonos', retorno: 4.2, riesgo: 2.8, liquidez: 8, color: '#6b7280' },
  { name: 'Metales', retorno: 6.5, riesgo: 5.2, liquidez: 6, color: '#fbbf24' },
  { name: 'Inmuebles', retorno: 9.0, riesgo: 6.8, liquidez: 2, color: '#4b5563' },
  { name: 'Acciones', retorno: 12.8, riesgo: 10.5, liquidez: 7, color: '#1f2937' },
  { name: 'Cripto', retorno: 20.5, riesgo: 18.2, liquidez: 9, color: '#b91c1c' },
  { name: 'Derivados', retorno: 28.0, riesgo: 26.5, liquidez: 9, color: '#000000' },
];

const collateralComparisonData = [
  {
    name: 'FIAT (Fraccionaria)',
    principal: 10,
    leverage: 90,
    total: 100,
    desc: 'Reserva 10% / Deuda 90%'
  },
  {
    name: 'DEFI (Sobre-colateral)',
    principal: 150,
    leverage: 0,    
    debt: 100,
    total: 150,
    desc: 'Colateral 150% / Deuda 100%'
  }
];

const responseTimeData = [
  { name: 'SWIFT (Transfronterizo)', min: 4320, label: '3-5 Días' },
  { name: 'SEPA (Europa)', min: 1440, label: '24 Horas' },
  { name: 'Ethereum (Seguridad)', min: 12, label: '12 Minutos' },
  { name: 'Layer 2 (Instantáneo)', min: 0.2, label: '< 10 Seg' },
];

const radarData = [
  { subject: 'Transparencia (Auditoría)', FIAT: 20, DEFI: 100 },
  { subject: 'Accesibilidad (Sin permiso)', FIAT: 45, DEFI: 95 },
  { subject: 'Velocidad (Respuesta)', FIAT: 30, DEFI: 90 },
  { subject: 'Certeza Legal (Estado)', FIAT: 95, DEFI: 35 },
  { subject: 'Estabilidad de Valor', FIAT: 85, DEFI: 45 },
  { subject: 'Disponibilidad (24/7)', FIAT: 40, DEFI: 100 },
];

// --- CONTENT DATA ---
interface EquivalenceItem {
  trad: string;
  defi: string;
  desc: string;
  simple: string;
  extended: string;
  fiatModel?: string;
  defiModel?: string;
  coreDiff?: string;
  example?: string;
}

const EQUIVALENCES: EquivalenceItem[] = [
  { 
    trad: 'Bancos Centrales', 
    defi: 'Algoritmos de Emisión',
    desc: 'Los Bancos Centrales emiten moneda mediante decisiones políticas. En DeFi, los algoritmos de emisión (como el de Bitcoin o EIP-1559) aseguran una oferta monetaria predecible, inmutable y transparente sin intervención humana.',
    simple: 'En vez de que un comité de políticos decida cuánto dinero imprimir cada año, lo hace un programa de ordenador cuyas reglas nadie puede cambiar arbitrariamente. Es un reloj matemático inmutable.',
    extended: 'El análisis de la política monetaria algorítmica revela que la eliminación del factor discrecional humano mitiga el riesgo de hiperinflación y ciclos de deuda política. Al externalizar la confianza en una curva de emisión programada (como el halving de Bitcoin o la quema de comisiones EIP-1559 en Ethereum), se crea un activo con escasez absoluta demostrable on-chain, en contraste con el sistema Fiat donde la masa monetaria M2 puede expandirse indefinidamente según las necesidades de gasto estatal.',
    fiatModel: 'Emisión discrecional por comités (Fed, BCE), política de flexibilización cuantitativa (QE) y devaluación del poder de compra a largo plazo.',
    defiModel: 'Emisión predeterminada por código criptográfico y consenso de red; auditoría pública de suministro en cada bloque.',
    coreDiff: 'Confianza en gobernantes e instituciones políticas frente a certeza matemática y reglas inmutables.',
    example: 'El suministro de Bitcoin está limitado a 21.000.000 de unidades para siempre; ningún gobierno puede imprimir un Bitcoin adicional.'
  },
  { 
    trad: 'Bancos Comerciales', 
    defi: 'Protocolos de Lending',
    desc: 'Mientras los bancos comerciales operan con reserva fraccionaria creando dinero de la nada, los protocolos de lending como Aave permiten el préstamo directo garantizado por colateral digital bloqueado en código.',
    simple: 'Es un banco transparente que funciona solo con código. Tú depositas ahorros y ganas intereses directos; otros piden prestado dejando una garantía mayor que su deuda.',
    extended: 'Los mercados de dinero descentralizados sustituyen el análisis de solvencia subjetivo por la liquidación automática basada en ratios de colateralización (Health Factor). Mientras que un banco comercial crea dinero bancario mediante el crédito (multiplicador monetario con apenas 1% de reserva en el BCE), los protocolos DeFi son sistemas sobre-colateralizados (120%-150%), donde el riesgo de insolvencia sistémica se gestiona mediante bots de liquidación 24/7 sin necesidad de rescates públicos.',
    fiatModel: 'Banca de reserva fraccionaria: presta 90€ por cada 10€ en caja; riesgo de pánico bancario (Bank Run) y rescates con dinero público.',
    defiModel: 'Sobre-colateralización algorítmica (130%-150% de garantía); solvencia matemática sin posibilidad de pánicos bancarios ni rescates.',
    coreDiff: 'Reserva fraccionaria con riesgo de insolvencia frente a reserva íntegra sobre-colateralizada y liquidación continua.',
    example: 'En Aave, para pedir 10.000 USDC debes bloquear al menos 13.000$ en ETH; si ETH cae, bots liquidan la deuda al segundo.'
  },
  { 
    trad: 'Libreta de Ahorro / Cuentas Bancarias', 
    defi: 'Wallets de Autocustodia',
    desc: 'La cuenta tradicional es un registro del dinero que el banco te debe (eres su acreedor). Una Wallet DeFi es tu propia caja fuerte soberana donde tú tienes el control criptográfico absoluto.',
    simple: 'Tu dinero no está en manos de un banco con horarios ni límites de retirada; está guardado en tu propia aplicación protegida por tus llaves privadas.',
    extended: 'La evolución de la custodia transita desde un modelo de deuda (el banco me debe mi dinero y puede limitar retiradas o aplicar corralitos) hacia un modelo de posesión técnica directa. Una wallet no contiene físicamente las monedas, sino las llaves criptográficas para firmar transacciones en la blockchain. Este cambio de paradigma elimina el riesgo de confiscación y censura de transferencias, pero traslada el 100% de la responsabilidad de seguridad al usuario.',
    fiatModel: 'El dinero en el banco es jurídicamente un pasivo de la entidad; el banco puede bloquear tu cuenta, imponer límites o quebrar.',
    defiModel: 'Custodia propia absoluta (Self-Custody) mediante pares de claves pública/privada (Ledger, Trezor, Safe); nadie puede congelar tus fondos.',
    coreDiff: 'Acreedor de una empresa privada frente a dueño soberano e inembargable de tus activos mediante criptografía.',
    example: 'Con una hardware wallet Ledger o una cuenta Safe, nadie en el mundo puede mover tus fondos sin presionar tus botones físicos.'
  },
  { 
    trad: 'Casas de Cambio & Forex', 
    defi: 'Liquidity Pools & AMM',
    desc: 'Las casas de cambio tradicionales dependen de intermediarios y comisiones ocultas. Los Liquidity Pools permiten el intercambio directo mediante fórmulas matemáticas (x·y=k).',
    simple: 'Un gran fondo compartido de dos monedas donde cualquiera puede cambiar una por otra en segundos. El precio se equilibra solo de forma matemática.',
    extended: 'Los Automated Market Makers (AMM) como Uniswap o Curve sustituyen los libros de órdenes centralizados por reservas agrupadas gobernadas por funciones matemáticas invariantes. Los proveedores de liquidez (LP) depositan activos y reciben las comisiones de intercambio en proporción exacta a su aportación, democratizando una actividad que en TradFi monopolizaban los Market Makers de Wall Street.',
    fiatModel: 'Casas de cambio y brokers que imponen spreads de hasta el 3-5%, cierran de noche y exigen intermediación bancaria.',
    defiModel: 'Piscinas de liquidez abiertas 24/7 con comisiones programadas (0.05% a 0.30%) repartidas íntegramente a los proveedores de liquidez.',
    coreDiff: 'Márgenes abusivos de intermediarios cerrados frente a mercados automáticos de código abierto accesibles para todos.',
    example: 'En Uniswap V3, un pool USDC/ETH de 50 millones de dólares procesa cientos de operaciones por minuto sin un solo operador humano.'
  },
  { 
    trad: 'Cámaras de Compensación (DTCC, Iberclear)', 
    defi: 'Liquidación Atómica T+0 On-Chain',
    desc: 'La bolsa tradicional requiere cámaras de compensación centralizadas con liquidación diferida T+1/T+2. En blockchain, la liquidación es atómica e inmediata en el mismo bloque (T+0).',
    simple: 'En vez de esperar 2 días hábiles a que el dinero y los títulos cambien de manos entre bancos, la entrega y el cobro ocurren en el mismo segundo.',
    extended: 'El riesgo de liquidación (Settlement Risk o riesgo Herstatt) es una de las mayores vulnerabilidades de las finanzas tradicionales: el lapso entre la orden y la liquidación definitiva genera exposición a quiebras intermedias. En DeFi, la atomicidad de la EVM garantiza que la transacción o se ejecuta completa (entrega contra pago) o revierte al estado anterior, erradicando el riesgo de contraparte.',
    fiatModel: 'Liquidación diferida a 24-48 horas laborables (T+1 / T+2), con riesgo de contraparte y costes millonarios de compensación.',
    defiModel: 'Liquidación atómica T+0 en el mismo bloque blockchain (12 segundos en Ethereum, menos de 1 segundo en L2s).',
    coreDiff: 'Riesgo de contraparte durante días frente a finalidad irreversible instantánea sin intermediarios.',
    example: 'Si compras un token en DEX, el activo entra a tu wallet exactamente en la misma milésima de segundo en que sale el pago.'
  },
  { 
    trad: 'Bolsas de Valores (NYSE, BME, Nasdaq)', 
    defi: 'DEX & Protocolos de Perpetuales 24/7',
    desc: 'Los mercados tradicionales tienen horarios de oficina estrictos y requieren brokers intermediarios. Los DEX y plataformas de perpetuales operan 24 horas al día, 365 días al año.',
    simple: 'Una bolsa mundial que nunca cierra, donde no necesitas llamar a un broker ni rellenar formularios para comprar o vender.',
    extended: 'Las bolsas tradicionales operan como silos cerrados de 9:00 a 17:30 de lunes a viernes, dejando a los inversores desprotegidos ante eventos de fin de semana (riesgo de gap de apertura). Los protocolos DeFi de derivados (como Hyperliquid o dYdX) proporcionan libros de órdenes transparentes con apalancamiento, ejecución algorítmica y oráculos descentralizados sin interrupción temporal.',
    fiatModel: 'Mercados abiertos apenas el 22% del tiempo semanal, con acceso restringido a través de miembros del mercado y brokers autorizados.',
    defiModel: 'Mercados globales continuos 100% del tiempo (24/7/365), con acceso directo sin permisos conectando una wallet.',
    coreDiff: 'Acceso corporativo restringido y horario de oficina frente a operativa financiera continua, ubicua y universal.',
    example: 'Durante cualquier festivo o domingo por la noche, puedes ajustar tu cartera o cubrir riesgo sin esperar a la campana de apertura.'
  },
  { 
    trad: 'Agencias de Rating (Moody\'s, S&P)', 
    defi: 'Oráculos & Health Factor On-Chain',
    desc: 'Las agencias tradicionales emiten calificaciones subjetivas periódicas con conflicto de interés. DeFi evalúa la solvencia en tiempo real mediante oráculos de precios y Factores de Salud matemáticos.',
    simple: 'En vez de que una agencia califique si alguien es de fiar una vez al año, el sistema calcula al segundo la salud financiera exacta con datos reales.',
    extended: 'El modelo "el emisor paga" de las agencias de calificación tradicionales generó distorsiones catastróficas, como la calificación AAA a hipotecas basura en la crisis de 2008. En DeFi, la solvencia no es una opinión: redes de oráculos descentralizadas (Chainlink, Pyth) transmiten precios agregados criptográficamente, y los contratos inteligentes liquidan posiciones en milisegundos si el colateral se devalúa.',
    fiatModel: 'Calificaciones trimestrales o anuales, subjetivas, opacas y vulnerables a conflictos de interés de clientes corporativos.',
    defiModel: 'Health Factor calculado en cada bloque con fuentes de precios externas auditables y liquidación determinista si cae de 1.0.',
    coreDiff: 'Opiniones crediticias diferidas frente a comprobación matemática de colateral en tiempo real.',
    example: 'Si el colateral de un préstamo cae un 5%, el Health Factor en Aave se actualiza en el siguiente bloque y cualquier bot puede auditarlo.'
  },
  { 
    trad: 'Red SWIFT & Bancos Corresponsales', 
    defi: 'Redes L1/L2 & Protocolos Cross-Chain',
    desc: 'Las transferencias transfronterizas tradicionales tardan días y descuentan múltiples comisiones. En blockchain, los fondos viajan de forma directa entre redes en cuestión de segundos.',
    simple: 'Mandar dinero a la otra punta del mundo es tan fácil y rápido como enviar un correo electrónico, sin que bancos intermediarios cobren peajes.',
    extended: 'El sistema SWIFT es un sistema de mensajería (no de liquidación) que depende de una cadena de bancos corresponsales. Cada salto en la cadena añade comisiones, riesgo de bloqueo y fricción temporal. Las blockchains públicas y protocolos de paso nativo (como CCTP de Circle o puentes con pruebas de validez ZK) mueven activos de billetera a billetera con liquidación inmediata y comisiones de gas reducidas.',
    fiatModel: 'Demoras de 2 a 5 días hábiles, comisiones de 20€ a 60€, comisiones ocultas de tipo de cambio y riesgo de retención administrativa.',
    defiModel: 'Envío directo wallet-a-wallet en segundos; costes de céntimos en Capas 2 (Arbitrum, Base, Optimism) sin fronteras nacionales.',
    coreDiff: 'Infraestructura de telecomunicaciones bancaria fragmentada frente a una red global unificada de valor abierto.',
    example: 'Enviar 100.000 EURC o USDC entre España y Japón a través de una Capa 2 tarda 3 segundos y cuesta menos de 0.05€ en gas.'
  },
  { 
    trad: 'Fondos de Inversión y Gestoras de Activos', 
    defi: 'Bóvedas Estandarizadas ERC-4626 & Vaults',
    desc: 'Los fondos tradicionales cobran comisiones de gestión y custodia opacas. En DeFi, las bóvedas ERC-4626 automatizan estrategias de rendimiento mediante código auditable.',
    simple: 'Una hucha inteligente que invierte automáticamente tus activos en las mejores oportunidades seguras y te da tus beneficios sin que un banquero se quede la mitad.',
    extended: 'El estándar ERC-4626 unificó la arquitectura de bóvedas generadoras de rendimiento (Yield-Bearing Vaults) en Ethereum. Los depositantes reciben acciones (shares) que representan su cuota del pool. La reinversión de intereses (auto-compounding) se ejecuta algorítmicamente mediante contratos inteligentes, garantizando que el 100% de los rendimientos netos pertenezcan a los participantes con comisiones de protocolo transparentes.',
    fiatModel: 'Comisiones de gestión del 1.5% al 2.5% anual más comisión de éxito, suscripción y reembolso con liquidación a valor liquidativo diferido.',
    defiModel: 'Smart Vaults transparentes con composabilidad total; suscripción y rescate instantáneo bloque a bloque con cálculo exacto de NAV.',
    coreDiff: 'Gestión delegada opaca con altos costes fijos frente a ejecución algorítmica auditable y líquida en todo momento.',
    example: 'Bóvedas en Yearn Finance o Beefy reinvierten automáticamente las recompensas de liquidez cada pocas horas optimizando el interés compuesto.'
  },
  { 
    trad: 'Tribunales Concursales & Rescates Estatales', 
    defi: 'Liquidación Algorítmica Autónoma',
    desc: 'En TradFi, las quiebras implican años de juicios y rescates con dinero público. En DeFi, el código liquida la deuda en segundos protegiendo a los depositantes sin dinero del contribuyente.',
    simple: 'Si un inversor no puede pagar su deuda, el ordenador vende su garantía al momento para devolver el dinero a quien se lo prestó. Nadie tiene que ir a juicio ni pedir rescates al gobierno.',
    extended: 'El riesgo moral ("Moral Hazard") del sistema financiero tradicional radica en la premisa de "Too Big To Fail": los bancos asumen riesgos excesivos sabiendo que el Estado los rescatará con impuestos. Los protocolos DeFi carecen de prestamista de última instancia político; la solvencia descansa en la inclemencia del código, donde los bots de liquidación compran garantías devaluadas con descuento, impidiendo el contagio sistémico.',
    fiatModel: 'Concursos de acreedores de 5 a 10 años, pérdidas multimillonarias para depositantes no cubiertos y rescates pagados por los contribuyentes.',
    defiModel: 'Liquidación matemática inmediata en el mismo bloque donde se detecta el subcolateral; cero fondos públicos comprometidos.',
    coreDiff: 'Rescates políticos con dinero público frente a liquidación algorítmica sin coste social ni riesgo moral.',
    example: 'Durante caídas súbitas del 50% en el mercado cripto, protocolos como MakerDAO liquidaron cientos de millones de dólares sin fallar un solo retiro.'
  }
];

const CRYPTO_ASSETS = [
  { name: 'Bitcoin (BTC)', icon: <Coins />, url: 'https://bitcoin.org', category: 'Capa 1 • PoW', desc: 'Reserva de valor digital descentralizada y política monetaria inmutable fijada en 21 millones de unidades.' },
  { name: 'Ethereum (ETH)', icon: <Gem />, url: 'https://ethereum.org', category: 'Capa 1 • PoS', desc: 'Plataforma líder de computación descentralizada, contratos inteligentes y capa de liquidación de rollups L2.' },
  { name: 'Solana (SOL)', icon: <Zap />, url: 'https://solana.com', category: 'Capa 1 • PoH', desc: 'Blockchain monolítica de alto rendimiento con consenso Proof of History, finalización sub-segundo y micro-comisiones.' },
  { name: 'Cardano (ADA)', icon: <ShieldCheck />, url: 'https://cardano.org', category: 'Capa 1 • PoS', desc: 'Red de contratos inteligentes desarrollada con revisión por pares científicos y modelo de transacciones EUTXO.' },
  { name: 'XRP (XRP)', icon: <Globe />, url: 'https://ripple.com/xrp/', category: 'Red de Pagos', desc: 'Red de pagos transfronterizos y liquidación interbancaria instantánea con mínimas comisiones de red.' },
  { name: 'Polkadot (DOT)', icon: <Share2 />, url: 'https://polkadot.network', category: 'Capa 0 • Interop', desc: 'Protocolo de interoperabilidad multicadena gobernado por una Relay Chain que comunica parachains soberanas.' },
  { name: 'BNB Chain (BNB)', icon: <Coins />, url: 'https://www.bnbchain.org', category: 'Capa 1 • EVM', desc: 'Ecosistema de contratos inteligentes compatible con EVM respaldado por Binance, enfocado en alto volumen.' },
  { name: 'Avalanche (AVAX)', icon: <Zap />, url: 'https://avax.network', category: 'Capa 1 • Subnets', desc: 'Plataforma escalable de contratos inteligentes basada en consenso Snowman y arquitectura modular de subredes.' },
];

const STABLECOINS = [
  { name: 'Tether (USDT)', icon: <DollarSign />, url: 'https://tether.to', category: 'Fiduciaria Off-Chain', desc: 'La mayor stablecoin del mercado por volumen y liquidez, respaldada por Letras del Tesoro de EE.UU. y efectivo.' },
  { name: 'USD Coin (USDC)', icon: <CircleDollarSign />, url: 'https://www.circle.com/en/usdc', category: 'Ficha EMT MiCA', desc: 'Moneda digital de Circle regulada bajo normativa MiCA en la UE, auditada mensualmente y con respaldo 1:1 en bancos.' },
  { name: 'DAI (DAI)', icon: <Layers />, url: 'https://makerdao.com', category: 'Sobre-Colateralizada', desc: 'Stablecoin descentralizada emitida por MakerDAO mediante contratos inteligentes colateralizados con criptoactivos y RWA.' },
  { name: 'EURC (EURC)', icon: <CircleDollarSign />, url: 'https://www.circle.com/en/eurc', category: 'Ficha EMT Euro MiCA', desc: 'Stablecoin referenciada 1:1 al Euro emitida por Circle conforme a la regulación de activos digitales de la Unión Europea.' },
  { name: 'USDS (Sky)', icon: <Layers />, url: 'https://sky.money', category: 'DeFi • Ecosistema Sky', desc: 'Evolución de DAI integrada en el protocolo Sky, con recompensas de ahorro nativas (Sky Savings Rate) y gobernanza abierta.' },
  { name: 'PayPal USD (PYUSD)', icon: <Wallet />, url: 'https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd', category: 'Fiduciaria Institucional', desc: 'Stablecoin emitida por Paxos Trust para PayPal respaldada al 100% por depósitos en dólares y bonos federales.' },
];

const HOT_WALLETS = [
  { name: 'MetaMask', icon: <Smartphone />, url: 'https://metamask.io', category: 'Hot Wallet • EVM', desc: 'La extensión de navegador y app móvil más extendida del mundo para conectar con dApps de Ethereum y redes EVM.' },
  { name: 'Rabby Wallet', icon: <Smartphone />, url: 'https://rabby.io', category: 'Seguridad DeFi', desc: 'Monedero Web3 con escaneo de seguridad predictivo antes de firmar transacciones y cambio automático de red.' },
  { name: 'Phantom', icon: <Smartphone />, url: 'https://phantom.app', category: 'Solana & Multi-Chain', desc: 'Billetera líder de Solana con soporte multi-cadena para Ethereum, Bitcoin y Base, con interfaz ágil para tokens y NFTs.' },
  { name: 'Trust Wallet', icon: <Smartphone />, url: 'https://trustwallet.com', category: 'Multicadena Móvil', desc: 'Billetera móvil con soporte para más de 70 blockchains y visor integrado de finanzas descentralizadas.' },
  { name: 'Safe (Gnosis)', icon: <Lock />, url: 'https://safe.global', category: 'Smart Wallet Multi-Sig', desc: 'Contrato inteligente de custodia con multifirma (Multi-Signature) estándar para tesorerías institucionales y DAOs.' },
];

const COLD_WALLETS = [
  { name: 'Ledger', icon: <HardDrive />, url: 'https://www.ledger.com', category: 'Hardware • Secure Element', desc: 'Monedero hardware con chip certificado Secure Element (EAL5+/EAL6+) para aislamiento total de claves fuera de línea.' },
  { name: 'Trezor', icon: <HardDrive />, url: 'https://trezor.io', category: 'Hardware Open-Source', desc: 'El primer monedero hardware de la historia con código fuente y esquemas de hardware totalmente abiertos y auditables.' },
  { name: 'BitBox', icon: <HardDrive />, url: 'https://shiftcrypto.ch', category: 'Hardware Suizo', desc: 'Dispositivo suizo de máxima seguridad con edición dedicada para Bitcoin y arquitectura de doble chip de protección.' },
];

const DEFI_PLATFORMS = [
  { name: 'Uniswap', icon: <RefreshCw />, url: 'https://uniswap.org', category: 'AMM DEX Líder', desc: 'DEX creador de mercado automatizado (AMM) pionero en liquidez concentrada (V3) y hooks programables (V4).' },
  { name: 'Curve Finance', icon: <RefreshCw />, url: 'https://curve.fi', category: 'AMM Stablecoins', desc: 'DEX hiper-eficiente optimizado para swaps entre activos de paridad similar con mínimo deslizamiento.' },
  { name: 'Balancer', icon: <RefreshCw />, url: 'https://balancer.fi', category: 'Pools Multi-Token', desc: 'Protocolo de liquidez programable con piscinas ponderadas de hasta 8 activos y vaults inteligentes.' },
  { name: 'PancakeSwap', icon: <RefreshCw />, url: 'https://pancakeswap.finance', category: 'DEX Multicadena', desc: 'Exchange descentralizado nacido en BNB Chain con swaps, pools de liquidez y mercados de futuros.' },
  { name: 'Trader Joe', icon: <Zap />, url: 'https://traderjoexyz.com', category: 'DEX Liquidity Book', desc: 'DEX líder en Avalanche y Arbitrum con arquitectura de liquidez concentrada en tramos de precio discretos.' },
  { name: 'Camelot', icon: <Activity />, url: 'https://camelot.exchange', category: 'DEX L2 Arbitrum', desc: 'DEX nativo de Arbitrum centrado en infraestructura de liquidez componible y pools duales.' },
  { name: 'Raydium', icon: <Zap />, url: 'https://raydium.io', category: 'DEX Solana AMM', desc: 'AMM y libro de órdenes on-chain en Solana integrado con la liquidez compartida del ecosistema SPL.' },
  { name: 'Orca', icon: <RefreshCw />, url: 'https://www.orca.so', category: 'DEX Whirlpools', desc: 'DEX de referencia en Solana basado en pools de liquidez concentrada de ultra-baja latencia.' },
  { name: 'Beefy Finance', icon: <TrendingUp />, url: 'https://beefy.com', category: 'Yield Optimizer', desc: 'Optimizador multi-cadena que reinvierte automáticamente los rendimientos de piscinas DeFi (auto-compounder).' },
  { name: 'Yearn Finance', icon: <Layers />, url: 'https://yearn.fi', category: 'Yield Aggregator', desc: 'Protocolo pionero en bóvedas de rendimiento que ejecutan complejas estrategias automatizadas de inversión.' },
  { name: 'AutoShark', icon: <TrendingUp />, url: 'https://autoshark.finance', category: 'Yield Farming', desc: 'Agregador de rendimiento y optimizador de granjas de liquidez con estrategias de auto-reinversión.' },
  { name: 'Rocket Pool', icon: <ShieldCheck />, url: 'https://rocketpool.net', category: 'Liquid Staking ETH', desc: 'Protocolo descentralizado y permisionless de Liquid Staking para Ethereum con operadores de nodo comunitarios.' },
  { name: 'Jito', icon: <Zap />, url: 'https://jito.network', category: 'LST + MEV Solana', desc: 'Protocolo líder de Liquid Staking y extracción ética de MEV en Solana que comparte propinas con los stakers.' },
  { name: 'Aave', icon: <TrendingUp />, url: 'https://aave.com', category: 'Lending & Borrowing', desc: 'Mercado monetario descentralizado líder mundial para depósitos y préstamos sobre-colateralizados y flash loans.' },
  { name: 'Hyperliquid', icon: <TrendingUp />, url: 'https://hyperliquid.xyz', category: 'Perps L1 On-Chain', desc: 'Blockchain de Capa 1 específica para un libro de órdenes de futuros perpetuos con ejecución atómica y 0 gas.' },
  { name: 'Morpho', icon: <Activity />, url: 'https://morpho.org', category: 'Lending Modular', desc: 'Protocolo de crédito modular con mercados aislados y vaults que optimizan el rendimiento sobre Aave y Compound.' },
  { name: 'Lido', icon: <Activity />, url: 'https://lido.fi', category: 'Liquid Staking Líder', desc: 'El mayor protocolo de staking líquido del mundo, emisor de stETH respaldado por validadores institucionales.' },
  { name: 'MakerDAO', icon: <Landmark />, url: 'https://makerdao.com', category: 'CDP & Sky Protocol', desc: 'Emisor de la stablecoin descentralizada DAI y arquitectura Sky respaldada por colateral cripto y bonos RWA.' },
  { name: 'GMX', icon: <TrendingUp />, url: 'https://gmx.io', category: 'Perpetuals DEX', desc: 'Exchange descentralizado de contratos de futuros perpetuos con apalancamiento de hasta 50x y liquidez GM.' },
  { name: 'Pendle', icon: <Zap />, url: 'https://pendle.finance', category: 'Mercado de Yields', desc: 'Protocolo de negociación y tokenización de rendimiento futuro dividiendo los activos en tokens PT y YT.' },
  { name: 'EigenLayer', icon: <Layers />, url: 'https://eigenlayer.xyz', category: 'Restaking Líder', desc: 'Infraestructura de restaking que permite reutilizar el ETH en staking para asegurar servicios validados (AVS).' },
  { name: 'Chainlink', icon: <Network />, url: 'https://chain.link', category: 'Oráculos & CCIP', desc: 'Red descentralizada de oráculos de referencia en la industria que suministra datos de precios y CCIP a DeFi.' },
  { name: 'Ondo Finance', icon: <Gem />, url: 'https://ondo.finance', category: 'RWA Tokenizados', desc: 'Pionero en activos del mundo real (RWA), facilitando acceso on-chain a bonos del Tesoro de EE.UU. (USDY).' },
  { name: 'Across Protocol', icon: <Network />, url: 'https://across.to', category: 'Puente Cross-Chain', desc: 'Puente interoperable de alta velocidad y bajo coste impulsado por intents e incentivos de rebalanceo.' },
  { name: 'Ethena', icon: <DollarSign />, url: 'https://ethena.fi', category: 'Dólar Sintético', desc: 'Protocolo emisor de USDe respaldado por cobertura delta-neutral en futuros de ETH/BTC y rendimientos de staking.' },
  { name: 'DefiLlama', icon: <Database />, url: 'https://defillama.com/', category: 'Analítica On-Chain', desc: 'La mayor base de datos abierta de métricas on-chain, TVL, comisiones, ingresos y auditorías del ecosistema.' },
  { name: 'Glassnode', icon: <Activity />, url: 'https://studio.glassnode.com/home', category: 'Inteligencia On-Chain', desc: 'Plataforma econométrica institucional con métricas avanzadas (MVRV, SOPR) y análisis forense de Bitcoin.' },
  { name: 'CoinMarketCap', icon: <BarChart3 />, url: 'https://coinmarketcap.com/es/', category: 'Rankings Globales', desc: 'Agregador de precios, capitalizaciones de mercado, volumen 24h y rankings de criptoactivos y exchanges.' },
  { name: 'Cryptoboard', icon: <Terminal />, url: 'https://cryptoboard-psi.vercel.app/dashboard', category: 'Dashboard Ejecutivo', desc: 'Panel interactivo ligero de monitoreo ágil y condensado de carteras y cotizaciones en tiempo real.' },
  { name: 'Coinglass', icon: <TrendingUp />, url: 'https://www.coinglass.com/es', category: 'Derivados & Liquidaciones', desc: 'Terminal analítica líder en futuros: mapas de calor de liquidaciones, open interest, funding rates y ratios long/short.' },
  { name: 'TradingView', icon: <Activity />, url: 'https://es.tradingview.com', category: 'Graficación Técnica', desc: 'Plataforma líder mundial de graficación interactiva, indicadores financieros avanzados y scripts cuantitativos.' },
  { name: 'ProRealTime', icon: <Cpu />, url: 'https://www.prorealtime.com/', category: 'Trading Institucional', desc: 'Software profesional de análisis técnico con ejecución directa de órdenes, backtesting y escáneres bursátiles.' },
  { name: 'Investing.com', icon: <Globe />, url: 'https://es.investing.com', category: 'Portal Macro & Forex', desc: 'Portal financiero global con calendarios macroeconómicos, materias primas, bonos, divisas y criptoactivos.' },
  { name: 'Yahoo Finanzas', icon: <BarChart3 />, url: 'https://es.finance.yahoo.com', category: 'Datos Bursátiles', desc: 'Portal de referencia en cotizaciones de bolsa, estados financieros corporativos y noticias económicas.' },
  { name: 'MSN Dinero', icon: <Globe />, url: 'https://www.msn.com/es-es/dinero', category: 'Seguimiento Financiero', desc: 'Plataforma de seguimiento patrimonial, tendencias macroeconómicas y cotizaciones bursátiles internacionales.' },
  { name: 'Google Finance', icon: <Sparkles />, url: 'https://www.google.com/finance/beta', category: 'Monitor de Mercados', desc: 'Buscador financiero ágil de cotizaciones en tiempo real, seguimiento de carteras personales y noticias.' },
  { name: 'Jumper Exchange', icon: <ArrowRightLeft />, url: 'https://jumper.exchange/es', category: 'Meta-Agregador Puentes', desc: 'Meta-agregador de puentes y DEXs desarrollado por LI.FI que localiza la ruta óptima de swap cross-chain.' },
  { name: 'Revert Finance', icon: <RefreshCw />, url: 'https://revert.finance', category: 'Gestión Uniswap V3', desc: 'Herramienta especializada en analítica y optimización de posiciones de liquidez concentrada en AMMs.' },
  { name: 'Krystal DeFi', icon: <Layers />, url: 'https://defi.krystal.app', category: 'Gestor de Carteras', desc: 'Consola integral para monitoreo de carteras Web3, préstamos, swaps multired y exploración de dApps.' },
  { name: 'Perplexity Finance', icon: <Bot />, url: 'https://www.perplexity.ai/finance/', category: 'IA Financiera', desc: 'Motor de búsqueda conversacional con inteligencia artificial enfocado en balances y datos macroeconómicos.' },
];

const GLOSSARY_TERMS = [
  { t: 'Liquidación', d: 'Cierre forzoso de posición ante insolvencia.' },
  { t: 'Impermanent Loss', d: 'Pérdida por volatilidad relativa en pools.' },
  { t: 'Smart Contract', d: 'Código informático autoejecutable.' },
  { t: 'TVL', d: 'Valor Total Bloqueado en protocolos.' },
  { t: 'Hash', d: 'Identificador único criptográfico.' },
  { t: 'APY', d: 'Rendimiento Anual Equivalente.' },
  { t: 'Oráculo', d: 'Proveedor de datos externos a la blockchain.' },
  { t: 'Gas', d: 'Costo de procesamiento de transacciones.' },
  { t: 'DAO', d: 'Organización Autónoma Descentralizada.' },
  { t: 'Mainnet', d: 'Red principal de una blockchain activa.' },
  { t: 'Slippage', d: 'Diferencia entre precio esperado y ejecutado.' },
  { t: 'Governance', d: 'Sistema de votación para cambios en protocolos.' },
  { t: 'Perpetuals', d: 'Derivados sin fecha de vencimiento con funding rate.' },
  { t: 'Funding Rate', d: 'Tasa periódica entre longs y shorts para anclar precio.' },
  { t: 'Mark Price', d: 'Precio ponderado para evitar liquidaciones por manipulación.' },
  { t: 'Health Factor', d: 'Ratio de solvencia de colateral en préstamos (alerta < 1).' },
  { t: 'LTV', d: 'Porcentaje máximo de préstamo según la garantía aportada.' },
  { t: 'Liquid Staking', d: 'Derivado líquido (LST) del capital en validación PoS.' },
  { t: 'Restaking', d: 'Reutilización del colateral PoS para respaldar AVS (EigenLayer).' },
  { t: 'Slashing', d: 'Penalización confiscatoria por negligencia o ataque del validador.' },
  { t: 'Vaults ERC-4626', d: 'Estándar tokenizado de bóvedas de rendimiento interoperables.' },
  { t: 'Puentes Cross-Chain', d: 'Protocolos de comunicación y paso de activos entre cadenas.' },
  { t: 'MEV', d: 'Valor máximo extraíble por reordenación de transacciones en mempool.' },
  { t: 'RWA', d: 'Activos del mundo real tokenizados con derechos de rendimiento legal.' },
  { t: 'Reglamento MiCA', d: 'Marco armonizado de criptoactivos en toda la Unión Europea.' },
  { t: 'Fichas EMT', d: 'E-Money Tokens referenciados a una única moneda fiduciaria oficial.' },
  { t: 'Fichas ART', d: 'Asset-Referenced Tokens respaldados por cestas de activos o materias.' },
  { t: 'Modelo 721 AEAT', d: 'Declaración informativa anual sobre criptoactivos situados en el extranjero.' },
  { t: 'Modelo 172/173', d: 'Obligación de reporte fiscal de saldos y operaciones en España.' },
  { t: 'Aprobaciones Ilimitadas', d: 'Riesgo crítico de allowance infinito que permite drenar fondos.' },
  { t: 'Firma Ciega', d: 'Blind signing en hardware wallet sin validar el destino real de fondos.' }
];

interface InfoVersion {
  technical: string;
  simple: string;
  extended: string;
  defiVsFiat?: {
    fiatTrad: string;
    defiOnChain: string;
    coreDifference: string;
  };
}

const KNOWLEDGE_BASE: Record<string, InfoVersion> = {
  // Mercados
  'Acciones': {
    technical: 'Las acciones representan una fracción del capital social de una empresa. Al adquirir una acción, el inversor se convierte en socio y adquiere derechos económicos (dividendos) y políticos (voto). Es un activo de renta variable, lo que significa que su rentabilidad no está garantizada.',
    simple: 'Es como comprar un trocito de un pastel (la empresa). Si a la empresa le va bien y el pastel se hace más grande, tu trocito vale más dinero. Si se hace pequeño, pierdes dinero.',
    extended: 'El análisis estructural de las acciones revela que son el principal motor de acumulación de riqueza a largo plazo en el sistema capitalista. Al poseer acciones, el inversor participa de la plusvalía generada por la empresa. En el contexto de la transición hacia lo digital, estamos viendo la aparición de las "Security Tokens", que son acciones representadas en blockchain, permitiendo fraccionamiento masivo, trading 24/7 y distribución automática de dividendos mediante contratos inteligentes, eliminando la necesidad de registradores centrales y depositarios de valores.',
    defiVsFiat: {
      fiatTrad: 'Emisión centralizada registrada en cámaras de valores (Iberclear/DTCC), negociación en bolsas exclusivas con horarios limitados (9:00 a 17:30) y liquidación T+2 mediante brokers intermediarios.',
      defiOnChain: 'Tokens de seguridad (Security Tokens) y acciones sintéticas negociables 24/7, fraccionamiento en micro-unidades y cobro de dividendos automático por Smart Contracts.',
      coreDifference: 'Deuda fiduciaria con intermediación burocrática y silos de mercado frente a soberanía del token y liquidez abierta global instantánea.'
    }
  },
  'Bonos': {
    technical: 'Títulos de deuda emitidos por Estados o empresas para financiarse. El emisor se compromete a devolver el capital en una fecha pactada y a pagar intereses periódicos (cupón). Se consideran renta fija porque el flujo de caja es predecible.',
    simple: 'Es como si tú le prestaras dinero a un país o a una empresa grande. Ellos te prometen que te lo devolverán en el futuro y, mientras tanto, te pagan una pequeña propina cada mes por el favor.',
    extended: 'Los mercados de renta fija son mucho más grandes que los de renta variable, ya que representan la base del crédito mundial. La valoración de un bono es inversamente proporcional a los tipos de interés: cuando el banco central sube tipos, el valor de los bonos antiguos en el mercado secundario cae. En DeFi, este concepto se replica mediante los "Zero-coupon bonds" on-chain o tokens de rendimiento fijo (yield stripping), permitiendo a los usuarios asegurar una tasa de retorno predecible sobre su capital digital, algo fundamental para la planificación financiera institucional dentro del ecosistema cripto.',
    defiVsFiat: {
      fiatTrad: 'Emisión de deuda estatal o corporativa con cupón fijo; liquidación institucional, barreras mínimas de entrada (nominales de 1.000€ a 100.000€) y riesgo de devaluación monetaria por inflación inducida.',
      defiOnChain: 'Rendimiento fijo tokenizado (Pendle Finance), bonos del tesoro tokenizados on-chain (Ondo Finance USDY/OUSG) y deuda respaldada por contratos inteligentes sin barreras de entrada.',
      coreDifference: 'Deuda soberana opaca con inflación discrecional frente a rendimiento programado con colateral demostrable on-chain.'
    }
  },
  'Futuros': {
    technical: 'Contratos que obligan a las partes a comprar o vender un activo en una fecha futura específica a un precio acordado hoy. Se utilizan para cobertura de riesgos (hedging) o especulación pura con alto apalancamiento.',
    simple: 'Es un trato para comprar algo mañana al precio de hoy. Sirve para asegurar que no te suban el precio de repente, o para intentar adivinar si algo va a subir o bajar mucho.',
    extended: 'Los mercados de futuros son esenciales para la fijación de precios en materias primas y divisas. Permiten a los productores (como agricultores) protegerse de caídas de precios vendiendo su cosecha antes de producirla. En cripto, los "Perpetual Swaps" han revolucionado esta dinámica al eliminar la fecha de vencimiento del contrato. Esto permite mantener posiciones apalancadas indefinidamente mediante un sistema de "funding rates" que alinea el precio del contrato con el precio de mercado (spot), creando el instrumento financiero más líquido del ecosistema digital actual.',
    defiVsFiat: {
      fiatTrad: 'Contratos con vencimiento obligatorio trimestral o mensual negociados en mercados regulados (CME), con cámaras de compensación centralizadas y margen de mantenimiento manual.',
      defiOnChain: 'Perpetual Swaps sin fecha de expiración, balanceados mediante tasa de financiación (Funding Rate) cada hora y liquidados automáticamente en el bloque mediante oráculos.',
      coreDifference: 'Vencimientos forzados e intermediación de cámaras de compensación frente a contratos continuos auto-regulados matemáticamente.'
    }
  },
  'Opciones': {
    technical: 'Contratos que otorgan el derecho (pero no la obligación) de comprar o vender un activo a un precio determinado antes de una fecha concreta. Requieren el pago de una prima.',
    simple: 'Es como pagar un ticket para tener el derecho a decidir más tarde si quieres comprar algo o no. Si el precio te conviene, lo usas; si no, simplemente pierdes lo que te costó el ticket.',
    extended: 'Las opciones son herramientas avanzadas de gestión de convexidad. Permiten construir perfiles de riesgo-recompensa asimétricos, donde la pérdida máxima está limitada a la prima pagada, pero el beneficio potencial es ilimitado. En DeFi, protocolos como Lyra u Opyn permiten la creación de mercados de opciones sin permiso (permissionless), donde cualquier usuario puede proveer liquidez y ganar primas, democratizando una actividad que en las finanzas tradicionales estaba reservada exclusivamente a las mesas de trading de los grandes bancos de inversión.',
    defiVsFiat: {
      fiatTrad: 'Mercados OTC o CBOE reservados a operadores acreditados e institucionales; cobro de primas reservado a creadores de mercado bancarios.',
      defiOnChain: 'DeFi Options Vaults (DOVs) y protocolos sin permisos (Lyra, Dopex) donde cualquier usuario retail puede suscribir o vender opciones y cobrar primas directamente.',
      coreDifference: 'Monopolio de mesas de tesorería bancaria frente a vaults de opciones transparentes y abiertos a cualquier inversor.'
    }
  },
  
  // Instrumentos DeFi
  'Stablecoins': {
    technical: 'Tokens diseñados para mantener un valor estable vinculando su precio a un activo externo, generalmente el dólar estadounidense o euro. Mitigan la volatilidad y permiten operativa financiera con unidades de cuenta predecibles.',
    simple: 'Son monedas digitales que siempre valen 1 dólar o 1 euro. Son geniales para proteger tus ahorros sin miedo a que el precio suba y baje cada cinco minutos.',
    extended: 'Existen tres tipos principales de arquitecturas para stablecoins: 1) Centralizadas (USDT, USDC, EURC) respaldadas por depósitos bancarios reales y letras del tesoro; 2) Cripto-colateralizadas (DAI/USDS) que usan activos como ETH para garantizar su valor mediante deuda; y 3) Algorítmicas con sobre-colateralización. Las stablecoins son el "puente de liquidez" definitivo; sin ellas, la operativa DeFi sería impracticable debido a la volatilidad inherente de los activos nativos.',
    defiVsFiat: {
      fiatTrad: 'Dinero bancario en cuenta corriente respaldado por el balance del banco comercial privado y sujeto a reserva fraccionaria, con transferencias que demoran días hábiles.',
      defiOnChain: 'Tokens fiduciarios o cripto-garantizados que se transmiten en segundos globalmente a coste marginal, auditables en tiempo real on-chain con pruebas de reservas (PoR).',
      coreDifference: 'Saldos bancarios atrapados en horarios de oficina y fronteras nacionales frente a efectivo digital global programable 24/7/365.'
    }
  },
  'DEX': {
    technical: 'Exchange Descentralizado. Permite el intercambio directo de criptoactivos (P2P) sin intermediarios centrales. Utilizan Pools de Liquidez y algoritmos AMM (Automated Market Maker) para determinar precios.',
    simple: 'Es un mercado de intercambio que funciona solo, sin jefes ni cajeros. Puedes cambiar tus monedas por otras al instante y de forma segura gracias a las matemáticas.',
    extended: 'La gran innovación de los DEX frente a los exchanges centralizados (CEX) y las casas de bolsa es la custodia propia y la resistencia a la censura. Mientras que una entidad centralizada puede congelar fondos o manipular el libro de órdenes, un DEX es un protocolo neutral ejecutado por código inmutable. Los usuarios interactúan directamente con un Smart Contract mediante firmas criptográficas.',
    defiVsFiat: {
      fiatTrad: 'Casas de cambio y brokers que custodian tus fondos, aplican spreads abusivos, exigen verificación KYC exhaustiva y pueden retener saldos.',
      defiOnChain: 'Intercambio directo wallet-a-wallet mediante contratos inteligentes auditados; custodia soberana en todo momento sin riesgo de retención por terceros.',
      coreDifference: 'Custodia delegada a un broker intermediario frente a intercambio peer-to-contract no custodial.'
    }
  },
  'Staking': {
    technical: 'Proceso de bloquear criptoactivos para apoyar la seguridad y operatividad de una red blockchain (Proof of Stake). A cambio, el usuario recibe recompensas en forma de nuevos tokens e ingresos de comisiones.',
    simple: 'Es como poner tus monedas en un depósito a plazo fijo para ayudar a que la red funcione bien. Por ayudar, la red te regala monedas extra como si fueran intereses.',
    extended: 'El Staking representa el "coste de capital" nativo de una blockchain. Al bloquear activos, el usuario asume el riesgo de "slashing" (penalización por mala conducta del nodo) a cambio de participar en el consenso y recibir recompensas por emisión y comisiones de red. El surgimiento del "Liquid Staking" (LSD) permite a los usuarios hacer staking y obtener un derivado líquido (como stETH) que puede ser reutilizado en DeFi.',
    defiVsFiat: {
      fiatTrad: 'Depósito a plazo fijo bancario donde el banco presta tu dinero a terceros y te entrega una fracción ínfima del interés, asumiendo tú el riesgo crediticio del banco.',
      defiOnChain: 'Participación directa en el consenso y seguridad de la infraestructura blockchain, cobrando directamente las tarifas de gas generadas por la red.',
      coreDifference: 'Rentabilidad sujeta al margen bancario privado frente a rendimiento nativo directo de la infraestructura tecnológica.'
    }
  },
  'Yield Farming': {
    technical: 'Estrategia para maximizar rendimientos moviendo capital entre diferentes protocolos DeFi, buscando los incentivos más altos por proveer liquidez o realizar préstamos.',
    simple: 'Es como ir moviendo tus ahorros de un banco a otro buscando siempre el que te dé más regalos o mejores intereses cada semana.',
    extended: 'El Yield Farming es el proceso de optimización de recompensas más dinámico de DeFi. Los protocolos emiten sus propios tokens de gobernanza para atraer liquidez rápida. El depositante aporta liquidez a pools para capturar estos incentivos. Aunque genera retornos elevados, implica riesgos de seguridad en contratos inteligentes, impermanent loss y volatilidad del token de recompensa.',
    defiVsFiat: {
      fiatTrad: 'Cuentas remuneradas promocionales de bancos que exigen nómina, vinculaciones y aplican comisiones de mantenimiento tras unos meses.',
      defiOnChain: 'Estrategias de provisión de liquidez en pools abiertos que generan comisiones reales por transacción más incentivos del protocolo sin permanencias.',
      coreDifference: 'Promociones bancarias con ataduras comerciales frente a generación de flujo de caja transparente según el volumen real de transacciones.'
    }
  },
  'Sintéticos': {
    technical: 'Activos digitales que replican el valor de activos del mundo real (oro, materias primas, acciones) mediante oráculos y contratos inteligentes, permitiendo exposición sin salir de la blockchain.',
    simple: 'Son "monedas espejo". Puedes tener algo que vale exactamente lo mismo que el oro o una acción de Apple, pero dentro del mundo cripto, sin tener que ir a un banco tradicional.',
    extended: 'Los activos sintéticos (Synths) expanden el alcance de DeFi hacia la economía real. Mediante el uso de oráculos de alta fidelidad (como Chainlink o Pyth), un contrato inteligente puede rastrear el precio de índices bursátiles o materias primas. Esto permite a usuarios de cualquier país acceder a mercados internacionales sin intermediarios ni restricciones de capital.',
    defiVsFiat: {
      fiatTrad: 'CFDs y derivados bancarios OTC con costes nocturnos de financiación (rollover/swap) y riesgo de contraparte de la entidad emisora.',
      defiOnChain: 'Tokens sintéticos sobre-colateralizados con oráculos descentralizados, negociables 24/7 sin spread de corretaje ni riesgo de crédito bancario.',
      coreDifference: 'Contratos bilaterales con un broker privado frente a posiciones sintéticas garantizadas matemáticamente en la blockchain.'
    }
  },
  'Seguros': {
    technical: 'Protocolos que ofrecen protección contra riesgos específicos como fallos en el código de un contrato inteligente, hackeos de pools o desvinculación (depeg) de stablecoins.',
    simple: 'Funciona como el seguro de un coche: pagas un poco para estar tranquilo. Si algo sale mal en el código de una aplicación y pierdes dinero, el seguro te lo devuelve.',
    extended: 'El mercado de seguros DeFi (Decentralized Insurance) utiliza pools de capital compartidos donde los "underwriters" (aseguradores) asumen el riesgo a cambio de una parte de la prima. La resolución de siniestros a menudo se realiza mediante jurados descentralizados u oráculos de auditoría, eliminando la asimetría habitual de las compañías aseguradoras.',
    defiVsFiat: {
      fiatTrad: 'Compañías de seguros tradicionales con pólizas farragosas, letra pequeña, peritos que dilatan indemnizaciones y largos litigios judiciales.',
      defiOnChain: 'Pools de cobertura de riesgo paramétricos y gobernados por Smart Contracts o DAOs, con cobro automático si se cumple la condición comprobada.',
      coreDifference: 'Litigio contractual con aseguradoras con ánimo de lucro frente a coberturas auditables ejecutadas por código.'
    }
  },
  
  // Gráficas - Nuevas entradas
  'Multiplicador Monetario': {
    technical: 'Visualización de la expansión de la oferta monetaria desde la Base Monetaria (M0) hasta la Masa Monetaria amplia (M3). Representa el efecto de la reserva fraccionaria donde el crédito bancario multiplica el dinero físico original.',
    simple: 'Muestra cómo los bancos "crean" dinero digital cada vez que alguien pide un préstamo. Empieza con poco dinero real y acaba con un montón de dinero en cuentas bancarias que solo existe como números en ordenadores.',
    extended: 'La jerarquía del dinero fiat (M0 a M3) es la base del sistema bancario moderno. Mientras M0 es responsabilidad directa del Banco Central, el salto hacia M3 depende de la voluntad de los bancos comerciales de prestar (velocidad del dinero). Este sistema permite una expansión económica elástica pero introduce el riesgo sistémico de liquidez. En comparación, la mayoría de los protocolos DeFi operan bajo un modelo de reserva íntegra o sobre-colateralizada, eliminando este multiplicador y, con ello, la capacidad de crear activos sin respaldo directo.'
  },
  'Erosión del Poder Adquisitivo': {
    technical: 'Comparativa temporal entre el Valor Nominal del dinero y su Valor Real (Poder Adquisitivo) bajo un escenario de inflación sostenida. Ilustra la pérdida de valor de la unidad de cuenta fiat en el tiempo.',
    simple: 'Es la prueba de que el dinero guardado debajo del colchón pierde valor. Con los mismos 10.000€, hoy compras un coche y dentro de 20 años quizás solo compres una bicicleta.',
    extended: 'La inflación actúa como un impuesto silencioso y regresivo. Al aumentar la masa monetaria por encima del crecimiento de la productividad, el valor de cada unidad disminuye. Esta gráfica subraya por qué Bitcoin, con su suministro limitado a 21 millones, se posiciona como una "reserva de valor" frente al fiat; mientras la línea roja (valor real fiat) siempre tiende a bajar, un activo con escasez absoluta busca preservar el esfuerzo del ahorrador frente a la expansión monetaria discrecional.'
  },
  'Matriz Riesgo vs Beneficio': {
    technical: 'Análisis de la frontera de eficiencia que relaciona la volatilidad histórica de un activo con su retorno esperado. Destaca la asimetría entre activos tradicionales (bonos/acciones) y criptoactivos.',
    simple: 'Es el mapa del inversor. Te dice que si quieres ganar mucho dinero (como con las criptos), tienes que estar dispuesto a ver cómo tu saldo sube y baja muy fuerte. Los bonos son más tranquilos, pero pagan mucho menos.',
    extended: 'La correlación entre riesgo y retorno es un pilar de la teoría moderna de carteras (Markowitz). Los criptoactivos han introducido una nueva clase de activos con "betas" muy altas. La clave de la gestión financiera moderna no es evitar el riesgo, sino entender la convexidad: buscar activos donde el beneficio potencial sea órdenes de magnitud superior a la pérdida máxima (100% del capital). Esta gráfica ayuda a visualizar por qué el efectivo, aunque parezca seguro, tiene un retorno real negativo tras inflación.'
  },
  'Garantía Sistémica': {
    technical: 'Diferenciación estructural entre el modelo de reserva fraccionaria fiat (donde se presta dinero que no existe físicamente) y el modelo de sobre-colateralización DeFi (donde para tomar 100$ prestados debes bloquear 150$ en garantía).',
    simple: 'En los bancos normales, por cada 10€ que guardan, prestan 90€ que no tienen. En DeFi, es al revés: para que te presten 100€, tienes que dejar 150€ en prenda. Es mucho más seguro ante crisis.',
    extended: 'El riesgo de contraparte se gestiona de formas opuestas. El sistema fiat depende de la "confianza" y de los rescates estatales (too big to fail) para cubrir el agujero de la reserva fraccionaria. DeFi utiliza la "certeza algorítmica": si el valor de tu garantía baja, un contrato inteligente te liquida automáticamente para asegurar que el prestamista siempre recupere su dinero. No hay juicios ni esperas; es solvencia matemática pura ejecutada por código inmutable.'
  },
  'Radar de Atributos Sistémicos': {
    technical: 'Evaluación comparativa multidimensional de los sistemas Fiat y DeFi atendiendo a seis vectores críticos: Transparencia, Accesibilidad, Velocidad, Certeza Legal, Estabilidad y Disponibilidad.',
    simple: 'Es una comparativa de "poderes". DeFi gana en estar abierto a todos, ser transparente y funcionar 24h, pero el sistema tradicional aún ofrece más seguridad legal (leyes del país) y precios más estables.',
    extended: 'El radar muestra la complementariedad actual de ambos sistemas. Fiat destaca por su "Certeza Legal" y "Estabilidad de Valor" (gracias a la intervención de bancos centrales), mientras que DeFi es imbatible en "Transparencia" (auditoría on-chain) y "Disponibilidad" (sin horarios bancarios). La evolución futura apunta hacia una convergencia donde el sistema tradicional adopte la eficiencia de la blockchain para mejorar su transparencia y velocidad, manteniendo el marco regulatorio protector.'
  },
  'Finalidad Transaccional': {
    technical: 'Métrica de latencia para alcanzar el estado de irreversibilidad de una transacción. Compara los tiempos de asentamiento desde el sistema SWIFT (días) hasta las redes de Capa 2 (milisegundos).',
    simple: 'Muestra cuánto tarda tu dinero en llegar de verdad a su destino y que nadie pueda echar atrás el pago. Los bancos tardan días en mandarlo a otro país; DeFi lo hace en segundos o minutos.',
    extended: 'La "finalidad" (finality) es el momento en que una transacción se considera inamovible en el registro. El sistema tradicional es "probabilístico" y lento debido a los múltiples intermediarios que deben conciliar balances manualmente. En blockchain, la finalidad es técnica y rápida. Esto reduce drásticamente el riesgo de liquidación en mercados financieros, permitiendo un comercio global mucho más dinámico y eliminando la necesidad de garantías intermedias durante el tiempo de tránsito del dinero.'
  },

  // Wallets y otros
  'MetaMask': {
    technical: 'La wallet de navegador más popular para Ethereum. Actúa como puente entre tu navegador y las dApps de DeFi, permitiendo gestionar activos y firmar transacciones de forma sencilla.',
    simple: 'Es como tu cartera digital en el navegador. Con ella puedes entrar a todas las aplicaciones de finanzas modernas y autorizar pagos con un solo clic.',
    extended: 'MetaMask ha evolucionado de ser un simple plugin a ser el estándar industrial para la inyección de proveedores Web3 en aplicaciones cliente. Soporta redes compatibles con EVM (Ethereum Virtual Machine) y permite la gestión de múltiples cuentas. Su arquitectura es "hot" (caliente), lo que significa que las llaves están cifradas en el disco del ordenador, siendo vulnerable a malware. Por ello, la práctica recomendada para grandes capitales es conectar MetaMask a una hardware wallet, usando la interfaz del navegador solo para la interacción y el dispositivo físico para la firma segura.'
  },
  'Trust Wallet': {
    technical: 'Wallet móvil multichain que soporta una amplia variedad de activos y redes. Es conocida por su interfaz amigable y su navegador de dApps integrado.',
    simple: 'Es una aplicación para el móvil donde guardas tus monedas digitales. Es fácil de usar y te permite llevar tus ahorros siempre contigo.',
    extended: 'Como wallet móvil, Trust Wallet optimiza la experiencia de usuario (UX) para el uso cotidiano. Es "multichain", lo que significa que soporta Bitcoin, Ethereum, Solana y muchas otras redes simultáneamente bajo una misma frase semilla (Seed Phrase). Incluye funciones de staking integradas y soporte para visualización de NFTs. Es la puerta de entrada ideal para el usuario minorista que desea transitar desde un exchange centralizado hacia la custodia propia sin enfrentarse a la complejidad técnica de las interfaces de escritorio.'
  },
  'Phantom': {
    technical: 'La wallet líder del ecosistema Solana, ahora multichain. Destaca por su rapidez, diseño minimalista y excelente gestión de NFTs y tokens en red de alta velocidad.',
    simple: 'Una cartera digital súper rápida y bonita. Está pensada para que usar tus monedas sea tan fácil y cómodo como mandar un mensaje de WhatsApp.',
    extended: 'Phantom fue diseñada específicamente para aprovechar la baja latencia de Solana. Ofrece una visualización de NFTs superior y una gestión de swaps (intercambios) internos muy eficiente. Recientemente se ha expandido a Ethereum y Polygon, buscando convertirse en una wallet universal. Su enfoque en la "inteligencia de seguridad" (escaneo de transacciones para detectar estafas antes de firmar) es un referente en la industria, ayudando a los usuarios a navegar por el peligroso entorno de los contratos inteligentes maliciosos.'
  },
  'Ledger': {
    technical: 'Hardware wallet líder que almacena tus claves privadas en un chip de seguridad certificado. Requiere confirmación física para cada transacción.',
    simple: 'Es un aparatito parecido a un USB donde guardas tus monedas bajo llave. Nadie puede sacarlas de ahí sin que tú pulses un botón físico en el aparato. Es lo más seguro que existe.',
    extended: 'Los dispositivos Ledger utilizan un Elemento Seguro (SE), el mismo tipo de chip usado en pasaportes y tarjetas de crédito, para aislar las claves privadas de cualquier conexión a internet. Esto previene hackeos remotos. El sistema operativo propietario, BOLOS, permite la instalación de aplicaciones para cientos de criptoactivos diferentes. La firma ciega (blind signing) y la seguridad de la pantalla física garantizan que lo que el usuario ve es exactamente lo que está autorizando, constituyendo la defensa definitiva contra el phishing en el mundo digital.'
  },
  'Trezor': {
    technical: 'La primera hardware wallet del mundo. De código abierto y seguridad extrema, permite guardar criptoactivos fuera de línea, protegiéndolos contra ataques remotos.',
    simple: 'Es una caja fuerte digital que cabe en tu mano. Mantiene tus monedas desconectadas de internet para que ningún hacker pueda tocarlas jamás.',
    extended: 'Trezor destaca por su filosofía de código abierto (Open Source). Todo su hardware y software puede ser auditado por la comunidad, eliminando la necesidad de confiar en el fabricante. Utiliza un procesador estándar y basa su seguridad en el aislamiento físico y la entrada de PIN mediante una cuadrícula aleatoria en pantalla. Es la opción preferida por los puristas de la seguridad que valoran la transparencia total del sistema por encima de los chips propietarios cerrados.'
  },
  'BitBox': {
    technical: 'Hardware wallet de fabricación suiza enfocada en la simplicidad y la seguridad minimalista. Ofrece una solución muy robusta tanto para Bitcoin-only como para multichain.',
    simple: 'Seguridad suiza para tus monedas. Es un dispositivo pequeño pero muy potente que protege tu dinero de forma sencilla y sin complicaciones.',
    extended: 'BitBox02 conbina lo mejor de ambos mundos: un microcontrolador de código abierto para el procesamiento de transacciones y un chip de seguridad dedicado para el almacenamiento de claves. Su diseño minimalera evita botones complejos, usando gestos táctiles en los bordes. Ofrece una versión exclusiva para Bitcoin que reduce drásticamente la superficie de ataque al eliminar código innecesario de otras redes. Es el dispositivo ideal para usuarios que buscan seguridad profesional con una curva de aprendizaje mínima.'
  },

  // Criptoactivos
  'Bitcoin (BTC)': {
    technical: 'La primera criptomoneda descentralizada. Diseñada como un sistema de efectivo electrónico P2P, ha evolucionado para ser considerada principalmente una reserva de valor digital u "oro 2.0".',
    simple: 'Es el "oro digital". Solo habrá 21 millones para siempre y nadie puede crear más. Sirve para guardar tus ahorros sin que los bancos o los gobiernos puedan controlarlos o quitártelos.',
    extended: 'El análisis de Bitcoin como red de liquidación global revela que su valor no reside en la velocidad de transacciones, sino en su inmutabilidad y resistencia a la censura. Con un mecanismo de consenso Proof of Work (PoW), Bitcoin consume energía para anclar la verdad histórica en el tiempo físico. Su política monetaria es la más predecible del mundo: el suministro total está limitado a 21 millones y la tasa de emisión se reduce a la mitad cada 4 años (halving). En un mundo de deuda infinita, Bitcoin representa la primera escasez digital absoluta, actuando como el activo base sobre el cual se valora todo el ecosistema cripto.'
  },
  'Ethereum (ETH)': {
    technical: 'Plataforma líder para contratos inteligentes y dApps. ETH es el combustible (gas) necesario para operar en esta red, que alberga la mayoría del ecosistema DeFi actual.',
    simple: 'Es como un ordenador mundial gigante que nunca se apaga. Sus monedas sirven para pagar el funcionamiento de aplicaciones que nadie puede censurar ni detener.',
    extended: 'Tras "The Merge", Ethereum pasó de Proof of Work a Proof of Stake (PoS), reduciendo su consumo energético en un 99.9%. ETH ha evolucionado hacia un activo "triple-point": es un activo de capital (genera rendimiento por staking), una materia prima (se quema para pagar gas) y un activo monetario (reserva de valor en DeFi). Su arquitectura actual se enfoca en el escalado mediante Capas 2 (Rollups), donde Ethereum actúa como la capa de seguridad y disponibilidad de datos, delegando la ejecución transaccional rápida a redes secundarias, consolidándose como la capa de liquidación de la futura internet financiera.'
  },
  'Solana (SOL)': {
    technical: 'Blockchain de alta velocidad diseñada para escalabilidad masiva. Utiliza Proof of History para procesar miles de transacciones por segundo a costes ínfimos.',
    simple: 'Es una red ultra rápida y barata. Hacer un pago o una inversión aquí cuesta menos de un céntimo y se hace en menos de un segundo.',
    extended: 'Solana optimiza el rendimiento mediante la paralelización de transacciones (motor Sealevel) y un reloj descentralizado (Proof of History). A diferencia de Ethereum que usa sharding o capas secundarias, Solana busca escalar de forma monolítica, permitiendo que todas las aplicaciones compartan el mismo estado sincronizado en microsegundos. Esto elimina la fragmentación de liquidez y es ideal para mercados de alta frecuencia (Order Books on-chain) y aplicaciones de consumo masivo que requieren una experiencia similar a la Web2 en términos de velocidad y coste.'
  },
  'Cardano (ADA)': {
    technical: 'Plataforma blockchain desarrollada con un enfoque académico riguroso. Busca ofrecer una infraestructura segura y sostenible para aplicaciones financieras.',
    simple: 'Es una red construida con mucho cuidado por científicos para asegurar que sea muy segura y que dure muchos años sin dar problemas.',
    extended: 'Cardano utiliza el modelo eUTXO (Extended Unspent Transaction Output), una evolución del modelo de Bitcoin que permite contratos inteligentes de forma determinista y escalable. Su proceso de desarrollo se basa en la revisión por pares académica y métodos formales de verificación de código, priorizando la seguridad y la estabilidad sobre la velocidad de lanzamiento. Con su tesorería descentralizada y systema de gobernanza líquida, Cardano busca ser un systema operativo social y financiero autosostenible para naciones en desarrollo y grandes corporaciones.'
  },
  'XRP (XRP)': {
    technical: 'Activo nativo del XRP Ledger, diseñado para facilitar pagos transfronterizos rápidos y de bajo coste, actuando como una moneda puente institucional.',
    simple: 'Es una moneda pensada para que los bancos puedan enviarse dinero de un país a otro en segundos y casi gratis, sin tener que esperar días.',
    extended: 'El XRP Ledger utiliza un algoritmo de consenso federado único que no requiere minería, permitiendo finalidad transaccional en 3-5 segundos. XRP fue diseñado para solucionar el problema de la "liquidez atrapada" en cuentas nostro/vostro que los bancos mantienen en todo el mundo. Al usar XRP como activo puente, las instituciones pueden liquidar pagos en tiempo real sin necesidad de pre-fondear cuentas en el extranjero, ahorrando miles de millones en costes operativos y de capital, posicionándose como la infraestructura Web3 para el sector financiero tradicional.'
  },
  'Polkadot (DOT)': {
    technical: 'Protocolo multichain que conecta diferentes blockchains especializadas en una sola red unificada, permitiendo que operen juntas de forma segura.',
    simple: 'Es como un pegamento que une a diferentes redes de criptonmonedas para que puedan hablar entre ellas y trabajar juntas en equipo.',
    extended: 'Polkadot utiliza una arquitectura de "Relay Chain" (cadena central) y "Parachains" (cadenas laterales especializadas). La Relay Chain proporciona seguridad compartida a todas las parachains, mientras que estas últimas pueden estar optimizadas para tareas específicas (privacidad, DeFi, IoT). El protocolo XCM permite el paso de mensajes y activos entre cadenas de forma nativa. Esto soluciona el problema de la interoperabilidad y permite la creación de una "Internet de Blockchains" donde la innovación no está limitada a una sola red aislada.'
  },

  // Stablecoins Detalle
  'Tether (USDT)': {
    technical: 'La stablecoin más veterana con mayor volumen. Respaldada por reservas de efectivo y equivalentes mantenidas por Tether Limited.',
    simple: 'Es la moneda digital más usada para tener dólares en internet. Por cada USDT que existe, hay un dólar de verdad guardado en una reserva.',
    extended: 'USDT es el activo más líquido de todo el mercado cripto, a menudo con un volumen de trading diario superior al de Bitcoin. A pesar de las controversias históricas sobre sus auditorías, ha demostrado una resiliencia extrema durante múltiples crisis de mercado. Su papel como "moneda de reserva del trading" es indiscutible. Sin embargo, su naturaleza centralizada implica riesgo de censura, ya que Tether puede congelar direcciones de wallets por requerimientos legales, lo que la hace el activo estable más resistente a la censura y la manipulación centralizada disponible actualmente.'
  },
  'USD Coin (USDC)': {
    technical: 'Stablecoin emitida por Centre (Circle & Coinbase). Se caracteriza por su enfoque en el cumplimiento regulatorio y transparencia auditada mensualmente.',
    simple: 'Es como el dalar digital oficial y bien portado. Siempre pasan auditorías para demostrar que tienen el dinero real bien guardado en el banco.',
    extended: 'USDC se posiciona como la opción "institucional" de las stablecoins. Sus reservas consisten principalmente en efectivo en bancos estadounidenses protegidos por el FDIC y bonos del Tesoro de EE.UU. a corto plazo gestionados por BlackRock. Esta transparencia la hace preferible para protocolos DeFi que buscan bajo riesgo de colateral y para empresas que operan en jurisdicciones reguladas. Su integración nativa en múltiples blockchains y su protocolo CCTP para transferencias entre cadenas sin puentes la convierten en una pieza clave de la infraestructura financiera global.'
  },
  'DAI (DAI)': {
    technical: 'Stablecoin descentralizada emitida por MakerDAO. Mantiene su paridad mediante el sobre-colateral de otros criptoactivos bloqueados en contratos inteligentes.',
    simple: 'Es un dalar digital que no pertenece a ninguna empresa. Se crea automáticamente usando otras criptomonedas como garantía. Es el dalar de la libertad.',
    extended: 'DAI es el experimento de moneda estable más exitoso de la historia de DeFi. No existe por un depósito en un banco, sino por un préstamo garantizado. Los usuarios depositan colateral (como ETH) en "Vaults" y emiten DAI contra ese valor. Si el colateral cae de precio, el systema liquida la posición para asegurar que cada DAI en circulación esté respaldado por más de 1 dólar de valor. Es una moneda gobernada por una DAO (Maker), lo que la hace el activo estable más resistente a la censura y la manipulación centralizada disponible actualmente.'
  },
  'PayPal USD (PYUSD)': {
    technical: 'La incursión de PayPal en cripto. Respaldada por depósitos en dólares y bonos del Tesoro, integrada en su red global de pagos.',
    simple: 'Es el dalar digital de PayPal. Sirve para que puedas usar criptomonedas dentro de tu cuenta de PayPal de toda la vida.',
    extended: 'PYUSD representa la convergencia final entre la Fintech tradicional y la Blockchain. Emitida por Paxos para PayPal, cumple con los más altos estándares regulatorios de Nueva York. Su gran ventaja competitiva es la red de distribución: millones de comercios y usuarios de PayPal pueden ahora interactuar con un activo blockchain sin fricción. Para DeFi, PYUSD es una fuente de liquidez masiva que conecta el capital de consumo masivo con los protocolos de rendimiento descentralizados.'
  },

  // Plataformas DeFi
  'Uniswap': {
    technical: 'El DEX con mayor volumen y TVL del ecosistema. Ofrece pools V3/V4 con liquidez concentrada (los proveedores de liquidez eligen rangos de precio específicos) y es el estándar de facto en Ethereum y sus L2s (Arbitrum, Optimism, Base, etc.). Dispone de tiers de comisiones de 0.01%, 0.05%, 0.30% y 1.00%.',
    simple: 'Es la casa de cambio descentralizada más grande del mundo. Puedes cambiar cualquier moneda por otra al segundo y quien pone dinero en el fondo elige en qué precios quiere trabajar para ganar más comisiones.',
    extended: 'Uniswap revolucionó las finanzas con el modelo AMM (x·y=k) en V2 y luego con los NFTs de posición de liquidez concentrada en V3. En V4 introduce "Hooks", contratos modulares que permiten pools con órdenes límite dinámicas, oráculos TWAMM integrados y tarifas dinámicas personalizadas. Es el núcleo de liquidez para pares volátiles mayores como ETH/USDC y WBTC/ETH en todas las redes EVM.',
    defiVsFiat: {
      fiatTrad: 'Bolsas y brokers tradicionales (NYSE, Nasdaq) que operan en horarios bancarios restringidos con intermediarios comisionistas y custodia forzosa.',
      defiOnChain: 'Intercambio no custodial disponible 24/7/365, con liquidación atómica inmediata y fondos de liquidez gobernados por contratos inmutables.',
      coreDifference: 'Monopolio de creadores de mercado institucionales centralizados frente a provisión de liquidez abierta y matemáticamente eficiente.'
    }
  },
  'Curve Finance': {
    technical: 'Creador de mercado automatizado especializado en activos que deben mantener paridad o correlación estrecha (stablecoins como USDC/USDT/crvUSD y derivados LST como stETH/ETH). Utiliza el invariante Stableswap para minimizar el deslizamiento (slippage).',
    simple: 'Es el mercado perfecto para cambiar monedas que valen lo mismo (como un dólar digital por otro, o dos tipos de Ethereum). Te asegura que no perderás valor en el cambio.',
    extended: 'Curve Finance es considerada la "columna vertebral" de la liquidez estable en DeFi. Su algoritmo híbrido combina la curva de suma constante (deslizamiento cero) con la de producto constante (liquidez infinita), permitiendo transacciones de millones de dólares con spreads de centavos. La gobernanza basada en veCRV (Vote-Escrowed CRV) desató las célebres "Curve Wars", donde protocolos como Convex compiten por sobornar votos para dirigir emisiones de liquidez.',
    defiVsFiat: {
      fiatTrad: 'Mesas de cambio interbancarias de divisas (Forex) con spreads abusivos y liquidaciones diferidas a través de corresponsales.',
      defiOnChain: 'Swaps de activos paritarios con slippage prácticamente nulo y comisiones ultra-bajas (0.04%) liquidadas en milisegundos.',
      coreDifference: 'Spreads opacos fijados por bancos frente a una curva matemática optimizada específicamente para tokens vinculados.'
    }
  },
  'Balancer': {
    technical: 'Protocolo AMM generalizado que permite crear piscinas de liquidez con hasta 8 activos simultáneos y ponderaciones arbitrarias (no limitadas al 50/50, como 80/20 o 60/40), con arquitectura Single Vault eficiente en gas.',
    simple: 'Es como crear tu propio fondo de inversión automático con varias monedas a la vez, donde tú decides qué porcentaje tiene cada una.',
    extended: 'Balancer actúa como un gestor de cartera automatizado e indexador sin comisiones de custodia. Su fórmula de producto ponderado multidimensional rebalancea los activos de forma constante mientras los usuarios hacen swaps pagando comisiones a los LPs. Su modelo 80/20 reduce drásticamente el Impermanent Loss en comparación con pools 50/50 tradicionales, y sus Boosted Pools canalizan la liquidez ociosa hacia protocolos de préstamo como Aave.',
    defiVsFiat: {
      fiatTrad: 'Fondos indexados y ETFs tradicionales gestionados por entidades centralizadas con comisiones anuales de gestión y retrasos en rescates.',
      defiOnChain: 'Piscinas multi-activo autónomas donde los depositantes cobran comisiones de trading en lugar de pagar costes de mantenimiento.',
      coreDifference: 'Costes de gestión pasiva en banca tradicional frente a rentabilidad generada por rebalanceo algorítmico on-chain.'
    }
  },
  'PancakeSwap': {
    technical: 'El AMM dominante en la red BNB Chain con presencia multicadena (Ethereum, Arbitrum, Base). Ofrece pares estándar V2, piscinas de liquidez concentrada V3, granjas de rendimiento (farms) y Smart Router.',
    simple: 'Es el intercambio descentralizado estrella de BNB Chain, muy rápido y con comisiones de red diminutas para cambiar tokens y ponerlos a rentar.',
    extended: 'PancakeSwap es el principal polo de liquidez para proyectos en el ecosistema BNB Chain. Su evolución ha incorporado pools de liquidez concentrada V3, swaps con descuento mediante el token CAKE, y mecanismos de quema deflacionaria. Para los inversores, representa una alternativa de bajo costo de transacción frente a la red principal de Ethereum.',
    defiVsFiat: {
      fiatTrad: 'Mercados secundarios locales con barreras de entrada por divisas nacionales y elevadas tarifas de liquidación.',
      defiOnChain: 'Intercambio global abierto con comisiones de red de escasos céntimos y programas de liquidez incentivados por el protocolo.',
      coreDifference: 'Tarifas elevadas por intermediación en finanzas locales frente a micropagos y microswaps fluidos on-chain.'
    }
  },
  'Trader Joe': {
    technical: 'DEX insignia de Avalanche expandido a Arbitrum y BNB Chain. Desarrolló el modelo "Liquidity Book", una arquitectura de liquidez concentrada basada en "bins" de precio que garantiza deslizamiento cero dentro de cada rango.',
    simple: 'Un exchange ultra-rápido nacido en Avalanche que organiza los precios en cajitas individuales para que los intercambios no tengan pérdidas por deslizamiento.',
    extended: 'El Liquidity Book de Trader Joe supuso una innovación fundamental frente a Uniswap V3 al discretizar el espacio de precios en "bins". Los proveedores de liquidez pueden configurar distribuciones personalizadas (spot, bid-ask, curve) y cobran comisiones variables de volatilidad que compensan activamente a los LPs frente a las pérdidas por arbitraje y MEV tóxico.',
    defiVsFiat: {
      fiatTrad: 'Libros de órdenes centralizados sujetos a manipulación por creadores de mercado de alta frecuencia propietarios.',
      defiOnChain: 'Bins de liquidez discretos programables y transparentes con compensación dinámica de volatilidad en beneficio del proveedor.',
      coreDifference: 'Intermediación asimétrica de firmas bursátiles frente a micro-mercados de liquidez matemática de acceso público.'
    }
  },
  'Camelot': {
    technical: 'DEX nativo y personalizado para el ecosistema Arbitrum. Combina pools clásicas y algebraicas de liquidez concentrada con comisiones dinámicas y posiciones en spNFTs para incentivos dirigidos.',
    simple: 'El intercambio especializado en la red Arbitrum que ayuda a los proyectos locales a ofrecer mejores recompensas a quienes aportan liquidez.',
    extended: 'Camelot se diseñó como el centro de liquidez componible de Arbitrum. Mediante sus posiciones tokenizadas en spNFT (Staked Position NFTs), los protocolos asociados pueden configurar programas de incentivos con bloqueos temporales, multiplicadores de rendimiento y comisiones variables calibradas al par.',
    defiVsFiat: {
      fiatTrad: 'Bolsas de valores regionales dependientes de subsidios de cámaras de comercio y agencias estatales.',
      defiOnChain: 'Infraestructura de liquidez diseñada específicamente para sinergias inter-protocolo en una Capa 2 de Ethereum.',
      coreDifference: 'Burocracia financiera regional frente a componibilidad de incentivos mediante contratos inteligentes en L2.'
    }
  },
  'Raydium': {
    technical: 'El mayor DEX de la blockchain Solana por volumen transaccional mensual (>35.600M USD). Dispone de pools AMM estándar (con comisión de aprox. 0.25%) y pools CLMM (Concentrated Liquidity Market Maker) con comisiones variables.',
    simple: 'Es el gigante de los intercambios en Solana. Procesa miles de millones de dólares al mes a la velocidad de la luz y con comisiones de menos de un céntimo.',
    extended: 'Raydium es la puerta de entrada de liquidez en Solana. En periodos de alta actividad en tokens SPL, su volumen mensual ha superado los 35.600 millones de USD. Ofrece tanto pools clásicas para nuevos lanzamientos de tokens como piscinas CLMM de alta eficiencia de capital, interconectándose fluidamente con los agregadores de swaps de Solana como Jupiter.',
    defiVsFiat: {
      fiatTrad: 'Sistemas bursátiles tradicionales con liquidación en días y costes fijos desproporcionados para órdenes de pequeño tamaño.',
      defiOnChain: 'Capacidad de procesamiento de miles de transacciones por segundo en Solana con liquidación en 400 milisegundos y coste de milésimas de dólar.',
      coreDifference: 'Latencia y costes de infraestructura bancaria pesada frente a swaps de alta frecuencia deterministas sobre blockchain monolítica.'
    }
  },
  'Orca': {
    technical: 'Segundo DEX de referencia en Solana, pionero de Whirlpools (liquidez concentrada en Solana). Gestiona pares institucionales como SOL/USDC con decenas de millones en TVL y comisiones flexibles entre 0.01% y 1.00%.',
    simple: 'Un exchange en Solana conocido por su facilidad de uso y sus Whirlpools, que permiten ganar buenas comisiones aportando liquidez en rangos de precio controlados.',
    extended: 'Orca se distingue por su código rigurosamente auditado en Rust y una experiencia de usuario orientada tanto al retail como a integraciones institucionales. Sus Whirlpools ofrecen a los proveedores de liquidez herramientas avanzadas para optimizar el ratio de comisiones frente a impermanent loss, posicionándose como el motor de liquidez más eficiente en los pares mayores de Solana.',
    defiVsFiat: {
      fiatTrad: 'Mesas de corretaje privadas donde los inversores minoristas pagan diferenciales muy superiores a los fondos institucionales.',
      defiOnChain: 'Acceso a la misma estructura de liquidez concentrada y comisiones para cualquier usuario con una billetera Web3.',
      coreDifference: 'Asimetría de costes entre minoristas e instituciones frente a igualdad matemática absoluta de ejecución on-chain.'
    }
  },
  'Beefy Finance': {
    technical: 'Optimizador de rendimiento descentralizado y multicadena que automatiza el interés compuesto (auto-compounding) sobre fondos de liquidez de más de 20 blockchains.',
    simple: 'Un piloto automático para tus inversiones DeFi: reinvierte tus beneficios una y otra vez para que ganes más dinero gracias al interés compuesto sin hacer nada.',
    extended: 'Beefy Finance resuelve el problema de la gestión manual de recompensas: en lugar de exigir que el usuario reclame tokens de recompensa, pague gas, los venda y re-deposite en el pool, los vaults de Beefy ejecutan cosechas colectivas automatizadas. Esto multiplica el APY efectivo mediante interés compuesto exponencial y minimiza costes de transacción.',
    defiVsFiat: {
      fiatTrad: 'Fondos de inversión que retienen dividendos y aplican comisiones de suscripción y custodia periódicas.',
      defiOnChain: 'Bóvedas no custodiales que ejecutan reinversiones de alto rendimiento mediante smart contracts públicos auditados.',
      coreDifference: 'Comisiones de gestor tradicional frente a reinversión algorítmica colectiva que maximiza el interés compuesto.'
    }
  },
  'Yearn Finance': {
    technical: 'Protocolo pionero de agregación de rendimiento y gestión autónoma de activos en DeFi. Sus bóvedas V3 se basan en el estándar ERC-4626 y ejecutan estrategias multi-pool de bajo riesgo.',
    simple: 'El "cerebro" inversor de DeFi: busca automáticamente los protocolos más seguros y rentables para mover tus ahorros y sacarles el máximo partido.',
    extended: 'Creado por Andre Cronje, Yearn inauguró la categoría de yield aggregators en Ethereum. Sus yVaults utilizan estrategias codificadas por estrategas independientes que compiten por optimizar la rentabilidad de activos como USDC, DAI o ETH, aprovechando préstamos, arbitrajes y comisiones de pools de liquidez con rigurosas auditorías.',
    defiVsFiat: {
      fiatTrad: 'Bancos privados y gestoras de patrimonio con barreras de capital mínimo y contratos de delegación discrecional opacos.',
      defiOnChain: 'Bóvedas ERC-4626 abiertas a cualquier cantidad, con depósitos y retiros instantáneos bloque a bloque.',
      coreDifference: 'Gestión patrimonial delegada a ejecutivos de banca privada frente a estrategias abiertas codificadas en smart contracts.'
    }
  },
  'AutoShark': {
    technical: 'Optimizador de rendimiento y agregador de liquidez orientado principalmente al ecosistema BNB Chain, ofreciendo bóvedas compuestas para pools de PancakeSwap.',
    simple: 'Una herramienta de interés compuesto para BNB Chain que reinvierte automáticamente los beneficios de tus fondos de liquidez.',
    extended: 'AutoShark automatiza la reinversión de granjas y piscinas de liquidez de PancakeSwap, optimizando el retorno para usuarios que operan en BNB Chain mediante dividendos de su token nativo y distribución de comisiones.',
    defiVsFiat: {
      fiatTrad: 'Cuentas de remuneración escalonada que exigen condiciones comerciales de vinculación.',
      defiOnChain: 'Estrategias de interés compuesto automático para pares de liquidez en redes EVM de bajo coste.',
      coreDifference: 'Intereses fijos bancarios devaluados por inflación frente a yield compuesto derivado del volumen de intercambio.'
    }
  },
  'Rocket Pool': {
    technical: 'Protocolo de staking líquido descentralizado para Ethereum. Permite operar validadores con solo 8 o 16 ETH (minipools) y emite el token líquido rETH, respaldado por una red sin permiso de operadores de nodo.',
    simple: 'Te permite ganar recompensas por asegurar Ethereum con la cantidad de dinero que quieras, recibiendo rETH a cambio para poder usarlo libremente.',
    extended: 'A diferencia de competidores centralizados, Rocket Pool prioriza la resistencia a la censura permitiendo que cualquier persona ejecute un validador en su propio hardware. El token rETH devenga valor de forma intrínseca contra ETH a medida que se acumulan las recompensas del consenso, siendo un colateral predilecto en Curve, Balancer y Aave.',
    defiVsFiat: {
      fiatTrad: 'Depósitos estructurados bancarios donde la entidad presta los fondos a sus propios clientes sin transparencia.',
      defiOnChain: 'Participación directa y líquida en la seguridad criptográfica del protocolo descentralizado más grande del mundo.',
      coreDifference: 'Dependencia del balance bancario frente a rendimiento nativo del consenso de la red Ethereum.'
    }
  },
  'Jito': {
    technical: 'Protocolo líder de staking líquido en Solana que captura recompensas del consenso Proof of Stake más beneficios de MEV (Maximal Extractable Value). Emite JitoSOL, uno de los activos colaterales más líquidos de la red.',
    simple: 'Gana intereses por tu Solana combinando las recompensas normales con los beneficios extra que generan los ordenadores más rápidos de la red (MEV).',
    extended: 'Jito transformó la economía de Solana al crear un cliente validador modificado que subasta el espacio de bloque a buscadores de MEV de forma transparente, redistribuyendo las ganancias a los poseedores de JitoSOL. Esto reduce el spam en la red y maximiza el APR de los usuarios en pools de Raydium y Orca.',
    defiVsFiat: {
      fiatTrad: 'Beneficios de intermediación bursátil y subastas de flujo de órdenes (PFOF) capturados exclusivamente por brokers como Robinhood o Citadel.',
      defiOnChain: 'Redistribución transparente y directa del MEV a los depositantes ordinarios a través del token JitoSOL.',
      coreDifference: 'Extracción privada de valor por brokers financieros frente a democratización del valor del ordenamiento de transacciones.'
    }
  },
  'Aave': {
    technical: 'Protocolo de mercado monetario descentralizado donde los usuarios pueden prestar o pedir prestado activos con tipos de interés dinámicos.',
    simple: 'Es el "banco del futuro". Puedes dejar tus ahorros para que otros los usen y te paguen intereses, o pedir prestado dinero tú mismo si dejas una garantía.',
    extended: 'Aave gestiona miles de millones de dólares en activos mediante un systema de pools de liquidez compartidos. Su innovación más famosa son los "Flash Loans" (préstamos instantáneos), que permiten pedir prestadas sumas masivas sin colateral siempre que se devuelvan en la misma transacción atómica de la blockchain. Esto ha permitido una eficiencia de arbitraje y refinanciación de deuda sin precedentes, eliminando las barreras de capital para los desarrolladores y traders sofisticados en el ecosistema DeFi.'
  },
  'Lido': {
    technical: 'Plataforma líder en "Liquid Staking". Permite hacer staking y recibir un activo líquido equivalente para seguir usándolo en DeFi mientras ganas recompensas.',
    simple: 'Te permite ganar intereses por tus ahorros pero sin tener que "bloquearlos". Es como tener tu dinero en el banco ganando intereses y poder gastarlo a la vez.',
    extended: 'Lido soluciona el dilema del staking: ¿seguridad de red o liquidez? Al emitir stETH (staked ETH), Lido permite que el capital que asegura la red de Ethereum siga siendo productivo en pools de liquidez o como colateral en préstamos. Al ser una DAO que delega el stake en múltiples validadores profesionales, Lido reduce el riesgo de centralización de nodos individuales, aunque su enorme cuota de mercado en Ethereum es un tema de debate recurrente sobre la descentralización a largo plazo de la red.'
  },
  'MakerDAO': {
    technical: 'Organización Autónoma Descentralizada que gestiona el systema DAI. Actúa como un banco central algorítmico sin intervención humana directa.',
    simple: 'Es la organización que fabrica los dólares digitales DAI. Funciona por votación de los usuarios y algoritmos, no por decisiones de políticos.',
    extended: 'MakerDAO es el "Banco Central de DeFi". Gestiona la política de tipos de interés (DSR - DAI Savings Rate) y los parámetros de colateral mediante votaciones de los poseedores del token MKR. Recientemente ha iniciado "Endgame", un plan de reestructuración masivo para diversificar sus reservas en activos del mundo real (RWA) como deuda pública y bonos corporativos, buscando que DAI sea una moneda estable respaldada por una combinación de activos digitales y tradicionales, blindando el protocolo contra riesgos sistémicos del mundo cripto.'
  },

  // --- LAS 14 PLATAFORMAS EN LOS 4 BLOQUES OPERATIVOS ---
  // BLOQUE 1: ANALÍTICA ON-CHAIN, MÉTRICAS DE PROTOCOLOS & AGREGADORES CRIPTO
  'DefiLlama': {
    technical: 'Plataforma agregadora de analítica on-chain de código abierto y neutral. Rastrea TVL, volumen de DEXs, comisiones, ingresos netos, tesorerías de DAOs, stablecoins y métricas de préstamos en más de 200 cadenas.',
    simple: 'Es la mayor enciclopedia y observatorio en tiempo real de DeFi: te dice cuánto dinero hay metido en cada protocolo, cuánto ganan y qué cadenas crecen más sin publicidad pagada.',
    extended: 'DefiLlama se ha consolidado como la fuente de datos primarios definitiva para la comunidad Web3 e inversores institucionales. Al no cobrar a proyectos por ser listados ni manipular rankings con fines publicitarios, sus adaptadores de código abierto leen directamente los contratos inteligentes de cada protocolo. Es indispensable para auditar la relación Precio/Ventas (P/S), ratios de tesorería y el riesgo de concentración de liquidez.',
    defiVsFiat: {
      fiatTrad: 'Informes trimestrales de bancos centrales y agencias de calificación privadas con conflictos de interés.',
      defiOnChain: 'Métricas agregadas leídas directamente de los smart contracts y bloques en tiempo real.',
      coreDifference: 'Auditoría pública y neutral de liquidez frente a informes financieros periódicos opacos y diferidos.'
    }
  },
  'Glassnode': {
    technical: 'Terminal de inteligencia on-chain y econometría forense. Genera indicadores derivados de las cadenas de bloques principales (MVRV, SOPR, Realized Cap, flujos de ballenas y mineros).',
    simple: 'Un microscopio financiero que te muestra exactamente qué están haciendo los grandes inversores (ballenas), mineros y particulares con sus Bitcoin y Ethereum.',
    extended: 'Glassnode Studio procesa terabytes de datos de transacciones de blockchain para generar modelos econométricos cuantitativos. Permite identificar zonas de sobrecompra o infravaloración extrema analizando el precio al que se movió cada moneda por última vez (Realized Price). Es la herramienta estándar para analistas macro que buscan entender si el mercado está en fase de acumulación o distribución sin basarse en rumores.',
    defiVsFiat: {
      fiatTrad: 'Estadísticas opacas de liquidación en cámaras de compensación privadas (DTCC) inaccesibles al público.',
      defiOnChain: 'Telemetría forense de cada satoshi y wei movido entre billeteras y exchanges en la blockchain.',
      coreDifference: 'Opacidad de custodia institucional frente a trazabilidad matemática verificable de flujos de capital.'
    }
  },
  'Glassnode Studio': {
    technical: 'Terminal de inteligencia on-chain y econometría forense. Genera indicadores derivados de las cadenas de bloques principales (MVRV, SOPR, Realized Cap, flujos de ballenas y mineros).',
    simple: 'Un microscopio financiero que te muestra exactamente qué están haciendo los grandes inversores (ballenas), mineros y particulares con sus Bitcoin y Ethereum.',
    extended: 'Glassnode Studio procesa terabytes de datos de transacciones de blockchain para generar modelos econométricos cuantitativos. Permite identificar zonas de sobrecompra o infravaloración extrema analizando el precio al que se movió cada moneda por última vez (Realized Price). Es la herramienta estándar para analistas macro que buscan entender si el mercado está en fase de acumulación o distribución sin basarse en rumores.',
    defiVsFiat: {
      fiatTrad: 'Estadísticas opacas de liquidación en cámaras de compensación privadas (DTCC) inaccesibles al público.',
      defiOnChain: 'Telemetría forense de cada satoshi y wei movido entre billeteras y exchanges en la blockchain.',
      coreDifference: 'Opacidad de custodia institucional frente a trazabilidad matemática verificable de flujos de capital.'
    }
  },
  'CoinMarketCap': {
    technical: 'Agregador de precios, capitalización bursátil, volúmenes de trading y liquidez de criptoactivos en exchanges centralizados y descentralizados a nivel mundial.',
    simple: 'La lista de precios más popular del mundo cripto: te enseña el valor actual de cada moneda, cuánto dinero mueve y qué puesto ocupa en el ranking.',
    extended: 'Adquirido por Binance, CoinMarketCap unifica datos de libros de órdenes y pools de miles de pares comerciales. Introduce puntuaciones de liquidez para combatir el volumen falso (wash trading), publica ratios de prueba de reservas (Proof of Reserves) de exchanges y monitoriza métricas de dominancia de Bitcoin e índices de sentimiento social.',
    defiVsFiat: {
      fiatTrad: 'Listados de cotizaciones en diarios económicos y terminales bancarias cerradas.',
      defiOnChain: 'Pizarra global 24/7 abierta que recopila miles de mercados simultáneamente.',
      coreDifference: 'Pizarras de cotización con horarios de apertura y cierre frente a mercados globales continuos e ininterrumpidos.'
    }
  },
  'Cryptoboard': {
    technical: 'Dashboard web interactivo enfocado en la visualización sintética de carteras cripto, variaciones de precios intradiarios y métricas esenciales de mercado.',
    simple: 'Un cuadro de mando limpio y rápido para mirar cómo van tus monedas y el mercado sin complicarte la vida con menús pesados.',
    extended: 'Cryptoboard resuelve la sobrecarga informativa mediante una interfaz minimalista y ágil. Permite monitorizar de un vistazo la salud y el rendimiento porcentual de una cesta de criptoactivos, sirviendo como monitor de cabecera en entornos de control y salas de operaciones.',
    defiVsFiat: {
      fiatTrad: 'Extractos de cuenta bancaria que tardan días en consolidar y reflejar el valor neto patrimonial.',
      defiOnChain: 'Consolidación visual instantánea de activos con precios actualizados al segundo.',
      coreDifference: 'Actualización periódica bancaria con retraso frente a monitorización en tiempo real.'
    }
  },
  'Coinglass': {
    technical: 'Terminal analítica especializada en derivados y futuros de criptomonedas, con mapas de calor de liquidaciones masivas (Liquidation Heatmaps), interés abierto agregado (Open Interest), tasas de financiación (Funding Rates) y ratios Long/Short.',
    simple: 'Es la pantalla de referencia para ver dónde están los niveles de riesgo extremo del mercado: te muestra cuánto dinero apalancado hay apostando a que el precio sube o baja y a qué precios exactos se ejecutarán liquidaciones masivas.',
    extended: 'Coinglass es la infraestructura analítica por excelencia para comprender la liquidez oculta y el posicionamiento especulativo en los mercados de futuros cripto. Sus algoritmos procesan millones de órdenes en Binance, Bybit, OKX y plataformas descentralizadas para proyectar los mapas de calor de liquidación. Estos niveles actúan como zonas magnéticas de atracción del precio antes de reversiones bruscas, permitiendo anticipar barridos de liquidez y cascadas de liquidación provocadas por desapalancamiento forzoso.',
    defiVsFiat: {
      fiatTrad: 'Informes semanales COT (Commitments of Traders) de la CFTC estadounidense con días de desfase y datos agregados opacos de bolsas cerradas.',
      defiOnChain: 'Telemetría de derivados y liquidaciones en tiempo real segundo a segundo, accesible públicamente a cualquier operador e investigador.',
      coreDifference: 'Información institucional diferida y asimétrica frente a transparencia radical de liquidez y apalancamiento en vivo.'
    }
  },

  // BLOQUE 2: TERMINALES BURSÁTILES, ANÁLISIS TÉCNICO & MACROECONOMÍA GLOBAL
  'TradingView': {
    technical: 'Plataforma líder mundial de graficación técnica interactiva y desarrollo algorítmico multi-activo con lenguaje propio Pine Script.',
    simple: 'La pantalla definitiva para dibujar líneas, ver velas japonesas y estudiar el precio de acciones, oro, divisas o criptomonedas con las mejores herramientas.',
    extended: 'TradingView es el estándar de facto para el análisis chartista en todo el planeta. Su arquitectura web permite trazar canales de regresión, perfiles de volumen (Volume Profile), medias exponenciales y osciladores con fluidez extrema. Su lenguaje Pine Script permite compilar y ejecutar estrategias cuantitativas con backtesting histórico detallado.',
    defiVsFiat: {
      fiatTrad: 'Software propietario costoso con licencias rígidas como Bloomberg Terminal o Reuters Eikon.',
      defiOnChain: 'Plataforma web colaborativa que analiza tanto bolsas de Nueva York o Madrid como pares de Uniswap.',
      coreDifference: 'Herramientas de trading restringidas a mesas institucionales frente a análisis técnico democratizado universal.'
    }
  },
  'ProRealTime': {
    technical: 'Estación de trabajo bursátil profesional e institucional con feeds de datos tick a tick sin filtrado, detector de patrones y escaneo ProScreener.',
    simple: 'Un programa para ordenadores que usan los traders de bolsa más serios para ver cada movimiento exacto del mercado y operar directamente con sus brokers.',
    extended: 'ProRealTime destaca por la fidelidad de sus feeds de datos bursátiles y su motor de escaneo ProScreener, capaz de filtrar miles de valores simultáneamente en busca de condiciones de ruptura de volatilidad o volumen inusual. Permite la integración directa con brokers institucionales (Interactive Brokers, Saxo Bank) para ejecutar órdenes con algoritmos avanzados.',
    defiVsFiat: {
      fiatTrad: 'El pináculo del análisis técnico regulado en acciones, materias primas y futuros bursátiles europeos.',
      defiOnChain: 'Modelo de ejecución mediante intermediarios regulados frente al auto-enrutamiento por smart contract.',
      coreDifference: 'Trading institucional con cámara de compensación centralizada frente a liquidación atómica on-chain.'
    }
  },
  'Investing.com': {
    technical: 'Portal global de información macroeconómica, tipos de interés de bancos centrales, rendimientos de deuda soberana y calendario de anuncios económicos.',
    simple: 'El sitio donde mirar cuándo habla el presidente del banco central, qué pasa con la inflación y cuánto pagan los bonos del Estado.',
    extended: 'Investing.com es fundamental para anticipar la volatilidad del mercado provocada por eventos de política monetaria. Su calendario económico en tiempo real detalla el impacto esperado (bajo, medio, alto) de cada publicación macro (IPC, NFP, PIB, decisiones de la Fed y BCE), correlacionando las variaciones del dólar (DXY) con los activos de riesgo y Bitcoin.',
    defiVsFiat: {
      fiatTrad: 'Mide las decisiones de emisión y política monetaria de los bancos centrales fiduciarios (Fiat).',
      defiOnChain: 'Proporciona las variables externas de inflación y tipos que condicionan el coste de oportunidad en DeFi.',
      coreDifference: 'Monedas gestionadas por comités políticos frente a políticas monetarias programadas matemáticamente.'
    }
  },
  'Yahoo Finanzas': {
    technical: 'Repositorio de análisis fundamental y contable de corporaciones públicas. Proporciona balances, cuentas de resultados, flujos de caja y múltiplos bursátiles.',
    simple: 'La biblioteca clásica para ver las cuentas de una empresa: cuánto gana, cuánta deuda tiene y qué dividendos paga.',
    extended: 'Yahoo Finanzas es la herramienta de iniciación y consulta estándar para el inversor en valor (Value Investing). Permite revisar el historial de cuentas anuales 10-K, el ratio PER (Price to Earnings), el valor contable y el consenso de analistas de Wall Street para miles de empresas cotizadas.',
    defiVsFiat: {
      fiatTrad: 'Estados contables trimestrales validados por firmas auditoras tradicionales (Big Four).',
      defiOnChain: 'En DeFi la contabilidad es pública y continua: cada fee ingresada se refleja en la blockchain en vivo.',
      coreDifference: 'Auditorías contables con meses de desfase frente a contabilidad en triple entrada en tiempo real.'
    }
  },
  'MSN Dinero': {
    technical: 'Hub agregador de noticias macroeconómicas, seguimiento de índices mundiales y conversor de tipos de cambio de divisas de Microsoft Start.',
    simple: 'Una portada rápida de noticias de dinero, economía y cotizaciones de bolsas para estar informado de lo que pasa en el mundo.',
    extended: 'MSN Dinero conecta fuentes de noticias de primer nivel para ofrecer un panorama general del clima macroeconómico. Es especialmente útil para seguir la reacción de la opinión pública y los medios tradicionales ante cambios en hipotecas, desempleo y comercio internacional.',
    defiVsFiat: {
      fiatTrad: 'Distribución de información económica filtrada para el público inversor minorista.',
      defiOnChain: 'Comunidades descentralizadas y foros de gobernanza abiertos donde los datos fluyen sin filtro editorial.',
      coreDifference: 'Prensa financiera mediada frente a foros de gobernanza y canales abiertos de Discord y X.'
    }
  },
  'Google Finance': {
    technical: 'Módulo bursátil ultraligero de Google para seguimiento de activos, índices bursátiles mundiales, listas personalizadas y comparación de rendimiento relativo.',
    simple: 'La forma más rápida de mirar en Google cómo van tus acciones o monedas favoritas y compararlas en un solo gráfico.',
    extended: 'Google Finance Beta se enfoca en la velocidad de respuesta y la integración con el motor de búsqueda global. Permite contrastar de forma interactiva el rendimiento porcentual de varios índices o activos en un horizonte temporal común, vinculando picos de volatilidad con noticias de última hora.',
    defiVsFiat: {
      fiatTrad: 'Herramienta de búsqueda masiva de cotizaciones de acciones y fondos tradicionales.',
      defiOnChain: 'Buscadores on-chain como Etherscan y DexScreener que analizan transacciones de billetera a billetera.',
      coreDifference: 'Indexación de cotizaciones corporativas frente a indexación de transacciones descentralizadas.'
    }
  },

  // BLOQUE 3: META-AGREGACIÓN CROSS-CHAIN, GESTIÓN DE LIQUIDEZ AMM & PORTAFOLIOS WEB3
  'Jumper Exchange': {
    technical: 'Meta-agregador de puentes cross-chain y DEXs impulsado por el protocolo LI.FI. Enruta intercambios de activos entre decenas de cadenas optimizando coste, slippage y seguridad.',
    simple: 'El mejor puente para mover dinero entre blockchains distintas: encuentra el camino más rápido y barato para cambiar tus tokens de una red a otra en un solo paso.',
    extended: 'Jumper Exchange elimina los silos entre blockchains. En lugar de obligar al usuario a transferir a un puente, esperar, pagar comisiones y luego buscar un DEX en la cadena de destino, Jumper ejecuta la operación compuesta de forma atómica: Swap origen -> Puente óptimo -> Swap destino. Se integra con puentes verificados (Across, Stargate, CCTP) garantizando la mínima exposición al riesgo de puente.',
    defiVsFiat: {
      fiatTrad: 'Transferencias internacionales SWIFT que tardan entre 2 y 5 días laborables con comisiones del 3% al 5%.',
      defiOnChain: 'Enrutamiento cross-chain autónomo entre blockchains completado en segundos con total trazabilidad.',
      coreDifference: 'Red de corresponsales bancarios lenta y costosa frente a puentes criptográficos programables y fluidos.'
    }
  },
  'Revert Finance': {
    technical: 'Suite analítica y de automatización para proveedores de liquidez (LP) en AMMs concentrados (Uniswap V3). Audita Impermanent Loss, realiza backtesting y ofrece auto-compounding.',
    simple: 'Una herramienta imprescindible si pones dinero en piscinas de liquidez: te calcula exactamente si estás ganando o perdiendo frente a solo guardar las monedas, y reinvierte tus ganancias automáticamente.',
    extended: 'Gestionar liquidez en Uniswap V3 requiere calcular la pérdida impermanente en rangos de precios específicos. Revert Finance ofrece paneles de PnL exactos, herramientas de backtesting basadas en datos históricos reales de volumen y ticks, y bóvedas automatizadas que reinvierten las comisiones devengadas sin que el usuario deba pagar gas manualmente cada pocas horas.',
    defiVsFiat: {
      fiatTrad: 'Departamentos de gestión de tesorería y creación de mercado en bancos de inversión cerrados al público.',
      defiOnChain: 'Herramientas abiertas que permiten a cualquier inversor particular actuar como creador de mercado algorítmico profesional.',
      coreDifference: 'Market making reservado a entidades con licencia bursátil frente a provisión de liquidez abierta con análisis riguroso.'
    }
  },
  'Krystal DeFi': {
    technical: 'Consola Web3 integral para gestión de portafolios multicadena, agregación de swaps con protección anti-MEV y administración unificada de pools de liquidez.',
    simple: 'Tu aplicación de banca digital Web3: te permite ver todos tus tokens repartidos en distintas redes, cambiarlos al mejor precio y meterlos en piscinas para ganar intereses.',
    extended: 'Krystal DeFi consolida la operativa dispersa de Web3 en una única interfaz. Su motor Smart Swap divide órdenes entre múltiples creadores de mercado para minimizar el impacto en precio, al tiempo que incorpora protección contra transacciones sandwich en la mempool, permitiendo depósitos y retiros en protocolos de préstamo y pools desde una misma consola.',
    defiVsFiat: {
      fiatTrad: 'Portales de banca online que solo gestionan dinero de una única entidad financiera bajo control central.',
      defiOnChain: 'Consola multi-red no custodiada donde el usuario interactúa con decenas de protocolos manteniendo sus claves.',
      coreDifference: 'Custodia delegada en un banco que puede congelar tu cuenta frente a soberanía total no custodiada.'
    }
  },

  // BLOQUE 4: INTELIGENCIA FINANCIERA CONVERSACIONAL & MOTORES DE IA EN TIEMPO REAL
  'Perplexity Finance': {
    technical: 'Motor de búsqueda conversacional impulsado por modelos de lenguaje avanzados con acceso en tiempo real a bases de datos financieras y noticias contrastadas.',
    simple: 'Un asistente con inteligencia artificial al que le preguntas cualquier duda de economía, empresas o balances y te responde al instante explicándolo con fuentes y datos oficiales.',
    extended: 'Perplexity Finance transforma la investigación de inversiones al sintetizar memorias anuales, conferencias de resultados corporativos (earnings calls), cotizaciones en vivo y noticias macroeconómicas en segundos. Cada afirmación incluye enlaces directos a las fuentes primarias de información, eliminando alucinaciones y acelerando la validación de tesis de inversión.',
    defiVsFiat: {
      fiatTrad: 'Análisis bursátiles de bancos de inversión que tardan días en publicarse y requieren costosas suscripciones.',
      defiOnChain: 'Síntesis inmediata por inteligencia artificial con acceso abierto a información financiera en tiempo real.',
      coreDifference: 'Monopolio de informes de analistas institucionales frente a análisis interactivo con IA y fuentes abiertas.'
    }
  },

  // Glosario
  'Liquidación': {
    technical: 'Mecanismo algorítmico de gestión de riesgo mediante el cual una posición apalancada en futuros o un préstamo en DeFi se cierra forzosamente al cruzar el precio de liquidación o al caer el Health Factor por debajo de 1.0, vendiendo el colateral para preservar la solvencia.',
    simple: 'Si pides un préstamo o te apalancas y el valor de tu garantía baja de forma peligrosa, el sistema vende tu garantía de inmediato para pagar la deuda. No hay llamadas telefónicas ni esperas: el código actúa en segundos para que nadie incurra en pérdidas impagadas.',
    extended: 'La liquidación es el cortafuegos de defensa inmunológica de los mercados descentralizados y de futuros. En protocolos de préstamo (Aave, Morpho, MakerDAO), los bots liquidadores externos compiten en milisegundos por adquirir el colateral en riesgo con un descuento (bonificación del 5% al 10%), amortizando la deuda del prestatario y garantizando que el protocolo permanezca 100% solvente en cualquier caída súbita. En mercados de futuros y contratos perpetuos (analizados exhaustivamente por Coinglass), las liquidaciones masivas desencadenan las denominadas "cascadas de liquidación" (Long o Short Squeezes), barriendo cúmulos de órdenes y provocando mechas de alta volatilidad.',
    defiVsFiat: {
      fiatTrad: 'Llamadas de margen discrecionales (Margin Call) con plazos de cortesía y riesgo de rescates estatales cuando quiebran grandes firmas.',
      defiOnChain: 'Ejecución matemática en tiempo real (T+0) gobernada por Smart Contracts y oráculos, liquidada por bots sin discriminación de usuario.',
      coreDifference: 'Rescates políticos y opacidad en finanzas tradicionales frente a liquidación algorítmica sin clemencia ni rescates con dinero público.'
    }
  },
  'Impermanent Loss': {
    technical: 'Situación en la que un proveedor de liquidez obtiene menos valor manteniendo activos en un pool que simplemente guardándolos en su wallet, debido a volatilidad.',
    simple: 'Es un riesgo de los mercados de intercambio: a veces, si el precio de las monedas cambia mucho, habrías ganado más dinero simplemente guardándolas en tu bolsillo que poniéndolas a trabajar.',
    extended: 'El Impermanent Loss (IL) ocurre debido al reequilibrio constante del pool por parte de los arbitrajistas. Si un activo sube mucho de precio respecto al otro, el pool termina vendiendo el activo que sube para comprar el que se queda atrás. La pérdida solo es "final" si el usuario retira la liquidez cuando los precios han divergido. Si los precios vuelven a su ratio original, el IL desaparece. Los proveedores de liquidez aceptan este riesgo a cambio de las comisiones de trading y los incentivos de minería de liquidez.'
  },
  'Smart Contract': {
    technical: 'Protocolo informático autoejecutable basado en blockchain que cumple acuerdos automáticamente sin necesidad de intermediarios humanos.',
    simple: 'Es un contrato digital que se cumple solo. No necesitas a un abogado ni a un juez; si se cumple la condición A, el contrato hace B. Pase lo que pase.',
    extended: 'Los Smart Contracts son "ley de código" (Code is Law). Permiten la programabilidad del dinero. Un contrato puede retener fondos en depósito de garantía (escrow), distribuirlos según votos, o ejecutar liquidaciones complejas sin posibilidad de intervención externa o fraude. La seguridad de estos contratos es el pilar de DeFi; un error en el código puede llevar a la pérdida total de fondos, lo que ha dado lugar a una industria de auditoría de seguridad y verificación formal de software extremadamente rigurosa.'
  },
  'TVL': {
    technical: 'Total Value Locked. Métrica que representa la cantidad total de activos que están actualmente depositados o bloqueados en un protocolo DeFi.',
    simple: 'Es una forma de saber cuánto dinero hay guardado en una aplicación. Cuanto más alto sea el TVL, más gente confía su dinero en ese systema.',
    extended: 'El TVL es el equivalente al "AUM" (Assets Under Management) en las finanzas tradicionales. Es un indicador de confianza y liquidez. Sin embargo, puede ser engañoso debido al "doble conteo" (por ejemplo, usar un derivado de staking como colateral en otro protocolo). Para un análisis profundo, se debe observar el "TVL ajustado" (eliminando la volatilidad del precio del token nativo) y la ratio de utilización, que indica qué parte de ese capital bloqueado está siendo realmente prestada o utilizada de forma productiva.'
  },
  'Hash': {
    technical: 'Resultado alfanumérico generado por un algoritmo criptográfico a partir de cualquier dato de entrada, utilizado para asegurar la integridad.',
    simple: 'Es como la "huella dactilar" única de un dato digital. Si cambias aunque sea una coma, la huella cambia por completo, lo que sirve para saber que nadie ha hecho trampas.',
    extended: 'Los hashes son la base de la inmutabilidad blockchain. El algoritmo SHA-256 de Bitcoin convierte megabytes de transacciones en un string de 64 caracteres. Al encadenar estos hashes (donde cada bloque contiene el hash del anterior), se crea una estructura de datos donde es computacionalmente imposible alterar el pasado sin rehacer todo el trabajo posterior. Es el mecanismo que permite que miles de ordenadores en todo el mundo se pongan de acuerdo sobre quién tiene qué dinero sin conocerse entre sí.'
  },
  'APY': {
    technical: 'Annual Percentage Yield. Rendimiento porcentual anual que incluye el efecto del interés compuesto, a diferencia del APR.',
    simple: 'Es el beneficio real que vas a ganar en un año si dejas que las ganancias se sumen a tus ahorros para ganar todavía más beneficios. El "interés sobre el interés".',
    extended: 'En DeFi, el APY puede variar segundo a segundo según la oferta y la demanda del pool. A diferencia de los bancos que capitalizan intereses mensual o anualmente, los protocolos DeFi a menudo lo hacen "bloque a bloque" (cada pocos segundos). Esto hace que el poder del interés compuesto sea mucho más visible y acelerado. Comprender la diferencia entre APR (tasa nominal) y APY (tasa efectiva) es vital para comparar correctamente los rendimientos entre diferentes granjas de rendimiento y protocolos de préstamo.'
  },
  'Oráculo': {
    technical: 'Servicio técnico que envía datos del mundo real a un contrato inteligente en la blockchain, permitiendo que este interactúe con el exterior.',
    simple: 'Es como un mensajero que le dice a la blockchain qué tiempo hace o a cuánto está el precio del pan en la calle, para que las aplicaciones puedan tomar decisiones.',
    extended: 'Las blockchains son systemas cerrados por diseño para garantizar el determinismo. Los oráculos (como Chainlink) rompen este aislamiento inyectando datos externos (precios de activos, resultados deportivos, clima). El desafío es el "problema del oráculo": si el dato que entra es falso, el contrato inteligente ejecutará una acción incorrecta de forma inmutable. Por ello, se usan redes de oráculos descentzializados que agregan datos de múltiples fuentes y penalizan a los informadores deshonestos, garantizando que el disparador de los contratos DeFi sea siempre la verdad del mercado.'
  },
  'Gas': {
    technical: 'Unidad de medida del esfuerzo computacional necesario para ejecutar una operación en redes como Ethereum, pagada en la criptomoneda nativa.',
    simple: 'Es la "comisión" que pagas por usar la red. Cada vez que haces un movimiento, tienes que pagar un poquito para que los ordenadores del mundo procesen tu petición.',
    extended: 'El mercado de gas es un systema de subasta por espacio en bloque. Cuando la red está saturada, el precio del gas sube, expulsando a las transacciones de bajo valor. Esto ha llevado a la implementación del EIP-1559 en Ethereum, que quema una parte del gas base, volviendo al ETH potencialmente deflacionario. El análisis del gas es un indicador de la salud y adopción de la red; un gas alto indica una demanda masiva por el espacio de computación más seguro y descentzializado del mundo.'
  },
  'DAO': {
    technical: 'Decentralized Autonomous Organization. Entidad gobernada por código y por sus poseedores de tokens, sin una estructura jerárquica tradicional.',
    simple: 'Es una empresa o club digital donde no hay jefes. Todos los que tienen monedas del club votan para decidir qué se hace con el dinero y el futuro del proyecto.',
    extended: 'Las DAOs representan el futuro de la gobernanza corporativa. Eliminan la burocracia mediante propuestas on-chain que se ejecutan automáticamente si son aprobadas. El capital de la tesorería de la DAO está bloqueado en contratos y solo puede moverse por votación mayoritaria. Esto permite la colaboración global a escala masiva entre personas que no se conocen. Los retos actuales incluyen la fatiga del votante, la concentración de votos en "ballenas" y la incertidumbre legal sobre la responsabilidad jurídica de estas entidades en el mundo físico.'
  },
  'Mainnet': {
    technical: 'La versión final y activa de una red blockchain donde las transacciones tienen valor real y son procesadas por validadores oficiales.',
    simple: 'Es la red "de verdad". Aquí el dinero es real y lo que hagas tiene consecuencias. Antes de esto, se usan redes de prueba para no perder dinero si hay fallos.',
    extended: 'El despliegue en Mainnet es el hito final de cualquier proyecto cripto. Significa que el código ha sido lo suficientemente probado en redes de test (Testnets) y auditado para manejar capital real. Operar en Mainnet implica costes de gas reales y riesgos finales. La inmutabilidad de la Mainnet es lo que da valor a los activos; es el libro mayor sagrado donde se asientan las transferencias de valor definitivas que el mundo reconoce como verdad financiera.'
  },
  'Slippage': {
    technical: 'La diferencia entre el precio esperado de una transacción y el precio al que realmente se ejecuta, común en mercados con baja liquidez.',
    simple: 'Es la pequeña diferencia de precio que hay entre el momento en que pulsas "comprar" y el momento en que se hace la compra. A veces las cosas suben o bajan en esos microsegundos.',
    extended: 'El slippage (deslizamiento) es una medida de la profundidad del mercado. En un AMM, cada compra mueve el precio hacia arriba. Si una orden es muy grande respecto al tamaño del pool, el precio subirá significativamente durante la ejecución de la orden. Los usuarios pueden configurar una "tolerancia de slippage" (ej: 0.5%) para cancelar la orden si el precio se mueve más de lo aceptable, protegiéndose contra la volatilidad extrema y los ataques de sándwich por parte de bots de MEV.'
  },
  'Governance': {
    technical: 'Mecanismo por el cual los poseedores de tokens proponen y votan cambios técnicos o económicos, ejerciendo la soberanía.',
    simple: 'Es el derecho a voto. Si tienes las monedas de un proyecto, puedes opinar y decidir cómo quieres que mejore en el futuro.',
    extended: 'La gobernanza on-chain es el corazón de la descentralización. Permite que los protocolos evolucionen sin bifurcaciones (forks) traumáticas. Los poseedores de tokens pueden votar sobre parámetros de riesgo, actualización de contratos, gestión de tesorería e incluso la visión estratégica del proyecto. Es un experimento masivo de democracia líquida y plutocracia técnica que está redefiniendo cómo se toman las decisiones en las infraestructuras críticas de la sociedad digital.'
  },
  'Pools de Liquidez': {
    technical: 'Depósitos de tokens emparejados bloqueados en un contrato inteligente que opera mediante un algoritmo de Creador de Mercado Automatizado (AMM), como x·y=k. Sustituyen al libro de órdenes centralizado tradicional.',
    simple: 'Son huchas compartidas donde la gente mete pares de monedas para que otros puedan intercambiarlas al instante a cambio de pagar una pequeña comisión.',
    extended: 'Los pools de liquidez son la espina dorsal del intercambio descentralizado. La evolución desde Uniswap v2 hacia Uniswap v3 introdujo la "liquidez concentrada", permitiendo a los proveedores de liquidez asignar capital exclusivamente dentro de rangos de precio específicos. Esto multiplicó la eficiencia de capital hasta por 4000x, pero exigió una gestión activa del Impermanent Loss.'
  },
  'Perpetuales': {
    technical: 'Contratos de futuros perpetuos sin fecha de vencimiento que replican el precio de mercado mediante pagos continuos de Funding Rate entre posiciones largas y cortas.',
    simple: 'Son apuestas financieras para ganar dinero si una moneda sube o baja, usando dinero prestado (apalancamiento), pero sin fecha límite para cerrar la operación.',
    extended: 'Los contratos perpetuos concentran más del 80% del volumen mundial de derivados cripto. Protocolos como Hyperliquid, GMX y dYdX permiten operar con apalancamiento de hasta 50x directamente on-chain con custodia propia. La liquidación se calcula de forma transparente según el Mark Price para impedir que manipulaciones de mechas locales en un solo exchange liquiden a los usuarios injustamente.'
  },
  'Funding Rate': {
    technical: 'Tasa de financiación periódica (habitualmente cada 1 u 8 horas) transferida directamente entre operadores de posiciones largas y cortas para forzar la convergencia entre el precio del contrato y el precio spot subyacente.',
    simple: 'Es una pequeña cuota que se pagan entre sí los apostadores alcistas y bajistas para mantener el precio del contrato pegado a la realidad del mercado.',
    extended: 'Cuando el Funding Rate es positivo, los compradores pagan a los vendedores, indicando sentimiento alcista y saturación de posiciones largas. Cuando es negativo, los vendedores pagan a los compradores. Los fondos cuantitativos aprovechan estas tasas para crear estrategias delta-neutrales (Arbitraje de Tasa de Financiación o Cash-and-Carry), capturando retornos del 10-30% anual sin asumir riesgo direccional de precio.'
  },
  'Mark Price': {
    technical: 'Precio de referencia calculado mediante oráculos descentralizados (Chainlink, Pyth) y medias móviles ponderadas para determinar el margen y las liquidaciones, aislando la posición del Last Traded Price manipulable.',
    simple: 'Es el precio "oficial y limpio" que usa el sistema para ver si debes ser liquidado, evitando que un movimiento trampa o estafa puntual te quite tu dinero.',
    extended: 'El Mark Price es el cortafuegos crítico de los derivados modernos. Sin Mark Price, un atacante con suficiente capital podría hacer una orden flash en el libro local para desplomar el precio un 10% durante 2 segundos, liquidar a todos los operadores apalancados y recomprar su posición. Al indexar el cálculo al Mark Price de múltiples fuentes externas, se garantiza la integridad matemática del colateral.'
  },
  'Health Factor': {
    technical: 'Métrica de solvencia en protocolos de lending (Aave, Compound) calculada como la suma de los colaterales ponderados por su umbral de liquidación dividida entre la deuda total acumulada. Si el Health Factor cae por debajo de 1.0, la posición entra en liquidación forzosa.',
    simple: 'Es el termómetro de seguridad de tu deuda. Si está por encima de 1.5 estás tranquilo; si baja de 1.0, el protocolo vende tus garantías para cobrarse lo que le debes.',
    extended: 'El factor de salud exige vigilancia continua de los tipos de interés de endeudamiento y la volatilidad del colateral. Los usuarios avanzados utilizan alertas automáticas y bots de desapalancamiento para aportar margen adicional antes de que bots liquidadores ejecuten la venta de garantía con una penalización del 5% al 10%.'
  },
  'LTV': {
    technical: 'Loan-to-Value. Ratio porcentual máximo que determina cuánto capital puede solicitarse en préstamo por cada unidad de colateral bloqueado en el protocolo.',
    simple: 'El porcentaje máximo que te prestan según lo que dejes como aval. Si dejas 100€ de colateral con un LTV del 75%, solo puedes pedir prestado hasta 75€.',
    extended: 'Los LTVs se calibran mediante modelos de riesgo algorítmico basados en la liquidez y volatilidad histórica del activo. Activos estables como USDC pueden admitir LTVs de hasta el 85%, mientras que criptoactivos volátiles se limitan al 50-65% para asegurar colchón de liquidación suficiente ante caídas bruscas de mercado.'
  },
  'Liquid Staking': {
    technical: 'Emisión de derivados sintéticos transferibles (LST como stETH) que representan tokens bloqueados en contratos de validación Proof-of-Stake, devengando recompensas de consenso mientras conservan liquidez.',
    simple: 'Pones tus criptomonedas a validar la red para ganar intereses, pero a cambio te dan un recibo digital que puedes vender, prestar o usar como si fuera dinero normal.',
    extended: 'El Liquid Staking resolvió el dilema de liquidez de Ethereum, donde más de 30 millones de ETH habrían quedado inmovilizados. No obstante, introduce riesgos de concentración en operadores dominantes (Lido) y riesgos de descorrelación (depeg) temporal en momentos de pánico sistémico.'
  },
  'Restaking': {
    technical: 'Reutilización del capital validado en Ethereum para extender la seguridad económica a módulos externos denominados AVS (Actively Validated Services), introducido por EigenLayer.',
    simple: 'Es usar el mismo aval bancario para respaldar dos negocios diferentes a la vez y cobrar doble comisión, pero con el peligro de que si fallas en uno, te quitan todo.',
    extended: 'El restaking crea un mercado abierto de seguridad descentralizada. Permite a oráculos, puentes y rollups alquilar la seguridad de Ethereum sin necesidad de emitir su propio token de mil millones de dólares. El riesgo estructural reside en el apilamiento de slashing, donde un fallo en un contrato AVS secundario puede confiscar el ETH original.'
  },
  'Slashing': {
    technical: 'Mecanismo de consenso punitivo en redes Proof of Stake mediante el cual una porción del capital bloqueado por un validador es confiscada y destruida algorítmicamente debido a una infracción grave.',
    simple: 'La multa que te pone la red si tu ordenador intenta hacer trampas o validar dos bloques contradictorios: te queman parte de tus monedas sin juicio ni recurso.',
    extended: 'El slashing alinea los incentivos de honestidad con el coste económico directo. Existen dos tipos de penalización: inactividad menor (liveness penalty) por estar desconectado, y slashing crítico por double signing (firmar dos historias de la blockchain al mismo tiempo). En protocolos de restaking, las condiciones de slashing se extienden al cumplimiento de reglas de software de terceros.'
  },
  'Vaults ERC-4626': {
    technical: 'Estándar técnico de Ethereum para bóvedas con rendimiento tokenizado, que normaliza las funciones de depósito, retiro y cálculo de acciones (shares) contables.',
    simple: 'Es como un formato universal de cuenta de inversión. Al igual que el USB-C vale para cualquier móvil, este estándar permite que cualquier fondo conecte con cualquier aplicación DeFi.',
    extended: 'Antes del estándar ERC-4626, cada agregador de rendimiento (Yearn, Beefy) utilizaba funciones propietarias, fragmentando la liquidez y aumentando el riesgo de errores en contratos inteligentes. La estandarización elimina intermediarios y reduce la superficie de ataque en el desarrollo de productos financieros estructurados.'
  },
  'Puentes Cross-Chain': {
    technical: 'Protocolos criptográficos que posibilitan la transferencia de mensajes, datos o liquidez entre cadenas de bloques independientes con arquitecturas dispares.',
    simple: 'Carreteras digitales que unen países blockchain distintos. Te permiten pasar tus monedas de Ethereum a Arbitrum, Solana o Avalanche.',
    extended: 'Los puentes son históricamente el vector más vulnerable de todo el ecosistema Web3, acumulando más de 2.500 millones de dólares en hackeos (Ronin, Wormhole, Nomad). Las arquitecturas modernas migran desde custodios multifirma (Lock & Mint) hacia protocolos de mensajería con verificación ZK (Zero Knowledge) y verificación descentralizada de estado (LayerZero, CCIP).'
  },
  'MEV': {
    technical: 'Maximal Extractable Value. Ganancia económica que los constructores de bloques y validadores pueden extraer reordenando, insertando o censurando transacciones dentro de un bloque antes de su inclusión definitiva.',
    simple: 'Son robots invisibles que miran las órdenes pendientes en la sala de espera y se adelantan para comprar antes que tú y venderte más caro (ataque sándwich).',
    extended: 'El MEV representa tanto un lubricante de mercado (para liquidaciones y arbitraje de precios entre DEXs) como un impuesto oculto al usuario final. La arquitectura Flashbots y el desarrollo de subastas MEV-Boost buscan democratizar y mitigar este fenómeno perjudicial para la experiencia de trading.'
  },
  'RWA': {
    technical: 'Real World Assets. Tokenización en blockchain de instrumentos financieros tradicionales (bonos del tesoro de EE.UU., créditos corporativos, bienes raíces) mediante entidades de propósito especial (SPV) y oráculos de cumplimiento legal.',
    simple: 'Traer activos del mundo físico de toda la vida (letras del tesoro, edificios, facturas de empresas) al mundo digital de la blockchain para comprar trocitos y cobrar rendimientos.',
    extended: 'Los RWA constituyen el gran puente de entrada del capital institucional hacia DeFi. Emisores como Ondo Finance, Franklin Templeton y BlackRock (BUIDL) ofrecen rendimientos de deuda soberana estadounidense directamente en stablecoins, fusionando la solvencia de la economía tradicional con la programabilidad 24/7 on-chain.'
  },
  'Reglamento MiCA': {
    technical: 'Reglamento (UE) 2023/1114 sobre los Mercados de Criptoactivos. Marco normativo integral de la Unión Europea que establece requisitos uniformes de transparencia, solvencia, gobernanza y custodia para emisores y proveedores de servicios de criptoactivos (CASP).',
    simple: 'La gran ley europea que pone reglas estrictas a las empresas de criptomonedas para proteger a los usuarios de estafas, quiebras y abusos como los de FTX.',
    extended: 'MiCA entró en vigor de forma escalonada: Títulos III y IV aplicables desde el 30 de junio de 2024 para stablecoins (EMT y ART), y el resto de la normativa aplicable desde el 30 de diciembre de 2024. España fijó el fin de su régimen transitorio para el 1 de julio de 2026. Es el primer estándar regulatorio continental del mundo y obliga a mantener reservas líquidas segregadas 1:1 para tokens referenciados a fiat.'
  },
  'Fichas EMT': {
    technical: 'E-Money Tokens. Fichas de dinero electrónico según el Artículo 3(1)(7) de MiCA, concebidas para mantener un valor estable referenciado exclusivamente a una moneda oficial soberana (como EURC referenciada al Euro). Solo entidades de crédito o de dinero electrónico pueden emitirlas.',
    simple: 'Son las monedas digitales legales que equivalen exactamente a euros o dólares reconocidos, supervisadas por bancos centrales.',
    extended: 'Las fichas EMT otorgan a los titulares un derecho de reembolso directo a la par en cualquier momento y prohíben expresamente el devengo de intereses pasivos a los usuarios para no competir deslealmente con los depósitos bancarios tradicionales.'
  },
  'Fichas ART': {
    technical: 'Asset-Referenced Tokens. Fichas referenciadas a activos según el Artículo 3(1)(6) de MiCA, cuyo valor se respalda en una cesta de divisas, materias primas o múltiples criptoactivos distintos de una única moneda oficial.',
    simple: 'Monedas respaldadas por un conjunto de cosas (oro, varias monedas juntas o bonos) que buscan tener un precio estable.',
    extended: 'Los emisores de ART deben someterse a estrictos requerimientos de fondos propios, límites de volumen de transacciones trimestrales y custodia independiente de la reserva en instituciones financieras de primer nivel para prevenir riesgos de contagio sistémico.'
  },
  'Modelo 721 AEAT': {
    technical: 'Declaración informativa anual de la Agencia Tributaria española sobre saldos en monedas virtuales situadas en entidades extranjeras de custodia o exchanges sin establecimiento permanente en España, aplicable cuando el valor total conjunto supere los 50.000 euros a 31 de diciembre.',
    simple: 'El formulario oficial de Hacienda donde tienes que avisar si tienes más de 50.000 euros en criptomonedas guardadas en exchanges de fuera de España como Binance o Coinbase.',
    extended: 'Aprobado por la Orden HFP/886/2023, debe presentarse entre el 1 de enero y el 31 de marzo del ejercicio siguiente. Las carteras no custodias (self-custody wallets como Ledger o Metamask donde el contribuyente conserva sus claves privadas) no se consideran situadas en el extranjero a efectos del modelo 721, según criterio vinculante de la Dirección General de Tributos.'
  },
  'Modelo 172/173': {
    technical: 'Modelos de declaración informativa fiscal para personas o entidades residentes fiscales en España que proporcionen servicios de custodia de claves criptográficas o servicios de cambio de moneda virtual por moneda fiduciaria.',
    simple: 'Los formularios que los exchanges españoles deben rellenar obligatoriamente para mandar a Hacienda una lista de todos los saldos y transacciones de sus clientes.',
    extended: 'Estos modelos proporcionan a la AEAT una visión exhaustiva y automatizada de los movimientos del ecosistema dentro de las fronteras nacionales, enlazando la fiscalidad con los estándares de la directiva europea DAC8.'
  },
  'Aprobaciones Ilimitadas': {
    technical: 'Concesión de autorización de gasto con valor de 2^256-1 (type(uint256).max) mediante el método approve() en contratos ERC-20. Otorga al contrato inteligente derecho indefinido de extracción de fondos de la billetera.',
    simple: 'Darle una tarjeta de crédito sin límite de gasto a una aplicación. Si la aplicación sufre un hackeo un año después, pueden vaciarte la cartera entera sin que te des cuenta.',
    extended: 'Constituye la principal causa de drenado silencioso de cuentas en DeFi. La buena praxis de seguridad exige aprobar únicamente la cantidad exacta requerida para cada operación o utilizar herramientas como revoke.cash y Etherscan Token Approvals para revocar los permisos tras su uso.'
  },
  'Firma Ciega': {
    technical: 'Blind signing. Procedimiento de autorización de transacciones en hardware wallets en el que el dispositivo muestra una cadena hexadecimal opaca en lugar de desglosar los parámetros y destino del contrato inteligente.',
    simple: 'Firmar un contrato con los ojos vendados confiando ciegamente en lo que pone en la pantalla del ordenador, sin poder verificarlo en la pantalla del llavero físico.',
    extended: 'El phishing moderno utiliza contratos trampa que solicitan firmas ciegas de permisos o transacciones multicall. Los estándares modernos de Clear Signing y las actualizaciones de firmware permiten que el hardware wallet decodifique y muestre con exactitud el destinatario, tokens y montos reales antes de autorizar.'
  }
};

const SECTION_FAQS = {
  'sec-01': ['¿Qué es el dinero fiat?', '¿Cómo funciona el multiplicador monetario?', '¿Por qué la inflación se considera un impuesto silencioso?', '¿Qué diferencia hay entre M0, M1, M2 y M3?'],
  'sec-02': ['¿Qué diferencia hay entre renta fija y variable?', '¿Cómo funcionan los contratos de futuros?', '¿Qué es el apalancamiento financiero?', '¿Cuál es la relación riesgo/beneficio en la bolsa?'],
  'sec-03': ['¿Qué es un Smart Contract?', '¿Cómo funciona la reserva fraccionaria vs sobre-colateral?', '¿Qué significa que DeFi es inmutable?', '¿Qué son los oráculos en blockchain?'],
  'sec-04': ['¿Qué es una Stablecoin?', '¿Cómo funciona un Exchange Descentralizado (DEX)?', '¿Qué es el Liquidity Mining?', '¿Cómo se mitiga el Impermanent Loss?'],
  'sec-05': ['¿Por qué Bitcoin es el "oro digital"?', '¿Cuál es la utilidad de Ethereum?', '¿Qué es el Proof of Stake (PoS)?', '¿Para qué sirven los tokens de gobernanza?'],
  'sec-06': ['¿Qué es la finalidad transaccional?', '¿Por qué DeFi está disponible 24/7?', '¿Cómo se auditan los protocolos on-chain?', '¿Cuál es la diferencia de costes entre SWIFT y DeFi?'],
  'sec-07': ['¿Cómo funciona la fórmula x·y=k en un AMM?', '¿Cuál es la diferencia entre Uniswap V2 y V3?', '¿Qué es el Funding Rate en los contratos perpetuals?', '¿Cómo se calcula el precio de liquidación en derivados?'],
  'sec-08': ['¿Cómo se calcula el Health Factor en lending?', '¿Qué es un Flash Loan y cómo se usa?', '¿Cuál es la diferencia entre LST y LRT?', '¿Qué riesgos tienen los puentes cross-chain y los oráculos?'],
  'sec-09': ['¿Qué diferencia hay entre un token EMT y un ART bajo MiCA?', '¿Cuándo es obligatorio presentar el Modelo 721 ante la AEAT?', '¿Cómo se tributa una permuta cripto-a-cripto en España?', '¿Qué es el régimen transitorio de MiCA en España?'],
  'sec-10': ['¿Cuáles son las 8 dimensiones de riesgo de una cartera cripto?', '¿Por qué las aprobaciones ilimitadas (allowances) son peligrosas?', '¿Qué diferencia hay entre Blind Signing y Clear Signing?', '¿Cómo auditar un contrato inteligente antes de depositar?']
};

// --- COMPONENTES AUXILIARES ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-2xl backdrop-blur-md bg-white/95 animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
        <p className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-50 pb-1">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></div>
                <span className="text-[11px] font-bold text-gray-900 uppercase">{entry.name}:</span>
              </div>
              <span className="text-[12px] font-black text-red-700 font-mono">
                {entry.value?.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

const formatAiResponse = (text: string, isLightBg: boolean = false) => {
  if (!text) return null;
  const lines = text.split('\n').filter(l => l.trim() !== '');
  const textColorClass = isLightBg ? "text-gray-900" : "text-gray-200";
  const headerColorClass = isLightBg ? "text-red-800 font-black" : "text-red-700 font-black";
  
  return (
    <div className={`space-y-3 font-sans antialiased text-[13px] leading-relaxed ${textColorClass}`}>
      {lines.map((line, idx) => {
        let content = line.trim();
        if (content.startsWith('###')) {
          return <h5 key={idx} className={`text-[11px] font-black uppercase tracking-widest ${headerColorClass} mt-4 border-b border-black/5 pb-1`}>{content.replace(/###/g, '').trim()}</h5>;
        }
        if (content.startsWith('*') || content.startsWith('-')) {
          return (
            <div key={idx} className="flex gap-2 pl-2">
              <span className="text-red-700 font-black text-sm">›</span>
              <span className="font-semibold">{content.substring(1).trim().replace(/\*\*/g, '')}</span>
            </div>
          );
        }
        const cleanLine = content.replace(/\*\*(.*?)\*\*/g, '$1');
        return <p key={idx} className="font-semibold">{cleanLine}</p>;
      })}
    </div>
  );
};

interface InfoPanelProps {
  sectionId: keyof typeof SECTION_FAQS;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ sectionId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'consulting' | 'notes'>('consulting');
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const faqs = SECTION_FAQS[sectionId];

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleAsk = async (text?: string) => {
    const question = text || query;
    if (!question.trim() || isLoading) return;
    setIsLoading(true);
    setAnswer('');
    setCopied(false);
    try {
      const response = await askGemini(`Actúa como un experto en finanzas y economía. Responde de forma concisa pero profunda. Tema: ${String(sectionId)}. Pregunta: ${question}`);
      setAnswer(response);
    } catch (e) {
      setAnswer("Error al conectar con el motor IA. Verifica la configuración del systema.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyAnswer = () => {
    if (!answer) return;
    navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sectionTitles: Record<string, string> = {
    'sec-01': 'Dinero y Deuda Fiat',
    'sec-02': 'Mercados y Bolsa Tradicional',
    'sec-03': 'Arquitectura DeFi & On-Chain',
    'sec-04': 'Ecosistema DeFi & Finanzas Cripto',
    'sec-05': 'Protocolos Líderes & Infraestructura',
    'sec-06': 'Glosario Crítico y Tesis',
    'sec-07': 'AMM, Pools & Perpetuales',
    'sec-08': 'Préstamos On-Chain, Staking & Arquitectura',
    'sec-09': 'Regulación MiCA, Fiscalidad & Compliance',
    'sec-10': 'Matriz de Riesgo en 8 Dimensiones'
  };
  const sectionLabel = sectionTitles[String(sectionId)] || `Sección ${String(sectionId)}`;

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 group ${
          isOpen ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-100 hover:border-red-700 hover:text-red-700'
        }`}
      >
        <MessageSquare size={16} className={isOpen ? 'text-red-500' : 'group-hover:rotate-12 transition-transform'} />
        <span className="text-[11px] font-black uppercase tracking-widest">Saber Más</span>
        {hasConceptNote(String(sectionId)) && (
          <span className="w-1.5 h-1.5 rounded-full bg-red-700" title="Contiene notas guardadas"></span>
        )}
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-full md:w-[500px] bg-white border border-gray-200 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.18)] z-40 overflow-hidden animate-in slide-in-from-top-4 duration-300 flex flex-col">
          {/* Header */}
          <div className="p-5 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between gap-3">
             <div className="flex items-center gap-3 min-w-0">
               <div className="p-2 bg-red-700 rounded-xl text-white shadow-lg shadow-red-700/20 shrink-0">
                 {activeTab === 'notes' ? <NotebookPen size={18} /> : <HelpCircle size={18} />}
               </div>
               <div className="min-w-0">
                 <h4 className="text-[12px] font-black uppercase tracking-tight text-gray-900 truncate">
                   {activeTab === 'notes' ? `Mis Notas: ${sectionLabel}` : 'Consultoría Inteligente'}
                 </h4>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5 truncate">
                   {activeTab === 'notes' ? 'Texto Enriquecido Memorizado' : `Soporte IA • ${sectionLabel}`}
                 </p>
               </div>
             </div>

             <div className="flex items-center gap-1.5 shrink-0">
               <button
                 onClick={() => setActiveTab('consulting')}
                 className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                   activeTab === 'consulting' 
                     ? 'bg-gray-900 text-white shadow-sm' 
                     : 'bg-white text-gray-500 hover:text-gray-900 border border-gray-200'
                 }`}
               >
                 IA
               </button>
               <button
                 onClick={() => setActiveTab('notes')}
                 className={`px-2.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                   activeTab === 'notes' 
                     ? 'bg-red-700 text-white shadow-sm' 
                     : 'bg-white text-gray-500 hover:text-red-700 border border-gray-200'
                 }`}
                 title="Mis Notas con texto enriquecido para esta sección"
               >
                 <NotebookPen size={12} />
                 <span>Notas</span>
                 {hasConceptNote(String(sectionId)) && (
                   <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
                 )}
               </button>
               <button
                 onClick={() => setIsOpen(false)}
                 className="p-1.5 rounded-xl bg-white text-gray-400 hover:text-red-700 border border-gray-200 transition-colors active:scale-90"
                 title="Cerrar panel (ESC)"
               >
                 <X size={15} />
               </button>
             </div>
          </div>

          {/* Panel Body */}
          {activeTab === 'notes' ? (
            <div className="p-6 max-h-[520px] overflow-y-auto custom-scrollbar">
              <ConceptNotesEditor
                conceptId={String(sectionId)}
                conceptTitle={sectionLabel}
              />
            </div>
          ) : (
            <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Preguntas Frecuentes</p>
                <div className="flex flex-col gap-2">
                  {faqs.map((faq, i) => (
                    <button key={i} onClick={() => { setQuery(faq); handleAsk(faq); }} className="text-left p-3 rounded-2xl bg-white border border-gray-100 text-[11px] font-bold text-gray-700 hover:border-red-700 hover:text-red-700 transition-all group">
                      <div className="flex items-center justify-between">
                        <span className="max-w-[90%]">{faq}</span>
                        <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Consulta Personalizada</p>
                <div className="relative">
                  <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Escribe tu duda técnica..." className="w-full bg-gray-50 border border-gray-200 p-4 rounded-3xl text-[12px] font-medium min-h-[80px] outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none shadow-inner" />
                  <button onClick={() => handleAsk()} disabled={isLoading || !query.trim()} className="absolute bottom-3 right-3 p-3 bg-gray-900 text-white rounded-2xl hover:bg-black shadow-lg disabled:opacity-20 active:scale-90 transition-all">
                    {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
              </div>
              {(answer || isLoading) && (
                <div className="bg-gray-900 text-white p-7 rounded-[2.5rem] shadow-2xl animate-in fade-in zoom-in-95 duration-500 relative overflow-hidden group border-l-4 border-red-700">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-red-700/5 blur-[80px] rounded-full"></div>
                  <div className="flex items-center justify-between mb-4 relative z-10 border-b border-white/5 pb-2">
                     <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Análisis del Motor</span>
                     </div>
                     {!isLoading && answer && (
                       <button onClick={copyAnswer} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all active:scale-90 flex items-center gap-1.5" title="Copiar respuesta">
                         {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                         <span className="text-[10px] font-black uppercase tracking-widest">{copied ? 'Copiado' : 'Copiar'}</span>
                       </button>
                     )}
                  </div>
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-6 gap-3 text-[12px] text-gray-500 uppercase font-black tracking-widest">
                      <Loader2 size={24} className="animate-spin text-red-700" /> 
                      <span>Sincronizando Conocimiento...</span>
                    </div>
                  ) : (
                    <div className="relative z-10">{formatAiResponse(answer)}</div>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between px-6">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Cerrar con tecla [ESC]</p>
            <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">IA Engine: Gemini v3 Flash</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [isAuth, setIsAuth] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isDevMode = !window.location.hostname || window.location.hostname === 'localhost';
    return isDevMode || localStorage.getItem('app_is_auth_v2') === 'true';
  });

  const [userIp, setUserIp] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(data => setUserIp(data.ip))
      .catch(() => setUserIp('Offline'));
  }, []);

  const { isFavorite, toggleFavorite, sortWithFavoritesFirst } = useFavorites();

  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [selectedEquivalence, setSelectedEquivalence] = useState<typeof EQUIVALENCES[0] | null>(null);
  
  const [modalViewMode, setModalViewMode] = useState<'technical' | 'simple' | 'extended' | 'ai' | 'diff' | 'notes'>('technical');
  const [aiModalResponse, setAiModalResponse] = useState<string>('');
  const [isAiModalLoading, setIsAiModalLoading] = useState(false);
  const [aiFollowUp, setAiFollowUp] = useState('');

  // ESC key listener to close modals
  useEffect(() => {
    const handleGlobalEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDetail(null);
        setSelectedEquivalence(null);
        setIsDirectLinksOpen(false);
      }
    };
    window.addEventListener('keydown', handleGlobalEsc);
    return () => window.removeEventListener('keydown', handleGlobalEsc);
  }, []);

  const [directLinksResource, setDirectLinksResource] = useState<PlatformLinksResource | null>(null);
  const [isDirectLinksOpen, setIsDirectLinksOpen] = useState(false);

  const openDirectLinks = (nameOrId: string) => {
    const resource = getLinksFor(nameOrId);
    if (resource) {
      setDirectLinksResource(resource);
      setIsDirectLinksOpen(true);
    } else {
      setDirectLinksResource({
        id: nameOrId.toLowerCase().replace(/\s+/g, '-'),
        name: nameOrId,
        category: 'Ecosistema',
        tag: 'DeFi & Web3',
        badge: 'Recursos Oficiales',
        officialSite: 'https://defillama.com',
        summary: `Acceso y recursos directos verificados para ${nameOrId}.`,
        links: [
          { label: 'DefiLlama Overview', url: 'https://defillama.com', type: 'analytics', desc: 'Métricas de TVL, liquidez y volumen on-chain.' },
          { label: 'Documentación Oficial Web3', url: 'https://ethereum.org/es/developers/docs/', type: 'docs', desc: 'Especificaciones técnicas y estándares.' }
        ]
      });
      setIsDirectLinksOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuth(true);
    localStorage.setItem('app_is_auth_v2', 'true');
  };

  const handleAiModalAsk = async (topic: string, query?: string) => {
    setModalViewMode('ai');
    if (!query && aiModalResponse && !isAiModalLoading) return;
    
    setIsAiModalLoading(true);
    if (query) {
      setAiModalResponse(prev => prev + `\n\n### Profundización: ${query}\n`);
    } else {
      setAiModalResponse('');
    }

    try {
      const basePrompt = `Actúa como un profesor emérito de finanzas y criptoeconomía. Genera una Masterclass breve pero de altísimo nivel técnico sobre: "${topic}". Explica su relevancia en la transición del systema Fiat hacia DeFi.`;
      const prompt = query ? `Sobre el tema "${topic}", responde a la siguiente duda técnica de seguimiento: "${query}". Mantén el tono de Masterclass técnica de alta fidelidad.` : basePrompt;
      const res = await askGemini(prompt);
      
      if (query) {
        setAiModalResponse(prev => prev + res);
      } else {
        setAiModalResponse(res);
      }
      setAiFollowUp('');
    } catch (e) {
      setAiModalResponse(prev => prev + "\n\nSISTEMA: Error de conexión con el motor de IA. Por favor, intente de nuevo.");
    } finally {
      setIsAiModalLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuth) {
      const savedIpsRaw = localStorage.getItem('app_memorized_ips_v2');
      if (savedIpsRaw) {
        fetch('https://api.ipify.org?format=json')
          .then(res => res.json())
          .then(data => {
            const savedIps: string[] = JSON.parse(savedIpsRaw);
            const obfuscatedCurrent = crypto.obfuscate(data.ip);
            if (savedIps.includes(obfuscatedCurrent)) handleLoginSuccess();
          }).catch(() => {});
      }
    }
  }, [isAuth]);

  useEffect(() => {
    if (!selectedDetail && !selectedEquivalence) {
      setModalViewMode('technical');
      setAiModalResponse('');
      setIsAiModalLoading(false);
      setAiFollowUp('');
    }
  }, [selectedDetail, selectedEquivalence]);

  return (
    <>
      {!isAuth && <Security onLogin={handleLoginSuccess} />}
      <div className={!isAuth ? 'blur-md pointer-events-none select-none opacity-50' : 'animate-in fade-in duration-700'}>
        <Cabecera userIp={userIp}>
          
          <section className="py-10 bg-white rounded-[2rem] px-8 md:px-12 mb-16 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 translate-x-1/2 pointer-events-none transition-transform group-hover:translate-x-[45%] duration-700"></div>
            <div className="relative z-10 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-[2px] w-6 bg-red-700"></span>
                  <span className="text-xs font-black uppercase tracking-widest text-gray-600">Master Thesis</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 leading-[0.85]">Economía <span className="text-red-700">Fiat ➜ DeFi</span></h2>
                <div className="mt-4 flex justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-gray-700"><span className="w-1.5 h-1.5 rounded-full bg-red-700 animate-pulse"></span> dinero cautivo en bancos</div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-gray-700"><span className="w-1.5 h-1.5 rounded-full bg-gray-900"></span> Protocolos On-Chain</div>
                </div>
              </div>
              <div className="md:w-1/3 border-l-4 border-gray-900 pl-6 py-1"><p className="text-gray-700 text-base uppercase tracking-tight font-bold leading-relaxed max-w-sm">Evolución de los systemas de dinero cautivo en bancos hacia la infraestructura de protocolos descentralizados.</p></div>
            </div>
            <a href="https://notebooklm.google.com/notebook/45496add-d540-4b9d-8075-0becfdb16126" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-8 text-xs font-black uppercase tracking-wider text-red-700 hover:text-gray-900 flex items-center gap-1.5 transition-all group/link bg-white/70 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-gray-200 shadow-sm">Para saber más <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" /></a>
          </section>

          {/* 01. FIAT */}
          <section id="sec-01" className="mb-40 space-y-12">
            <div className="border-b-4 border-gray-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><Landmark className="text-red-700" size={32} />01. El Ecosistema Fiat</h3><p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">Confianza Institucional y Expansión de Deuda</p></div>
              <InfoPanel sectionId="sec-01" />
            </div>
            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100/50 relative overflow-hidden group"><div className="absolute top-0 right-0 w-32 h-32 bg-red-700/5 blur-3xl rounded-full"></div><p className="text-gray-800 text-lg md:text-xl leading-relaxed relative z-10 max-w-5xl">El systema Fiat se sustenta en el <span className="font-black text-gray-900">curso legal</span> y la confianza institucional. Bajo el modelo de <span className="text-red-700 font-black">dinero cautivo en bancos</span>, las entidades financieras crean moneda digital mediante el crédito, multiplicando la base monetaria real.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col relative group/chart">
                <div className="absolute top-6 right-6 flex items-center gap-1.5 z-10 opacity-0 group-hover/chart:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite('Multiplicador Monetario');
                    }}
                    className={`p-2 rounded-full border transition-all active:scale-90 cursor-pointer ${
                      isFavorite('Multiplicador Monetario')
                        ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                        : 'bg-gray-50 text-gray-400 hover:text-red-700 border-gray-200'
                    }`}
                    title={isFavorite('Multiplicador Monetario') ? 'Quitar de favoritos' : 'Marcar como favorito'}
                  >
                    <Star size={16} className={isFavorite('Multiplicador Monetario') ? 'fill-red-700 text-red-700' : ''} />
                  </button>
                  <button 
                    onClick={() => setSelectedDetail('Multiplicador Monetario')}
                    className="p-2 bg-gray-50 text-gray-500 hover:text-red-700 rounded-full border border-gray-200 transition-all active:scale-90"
                    title="Más información sobre esta gráfica"
                  >
                    <Info size={18} />
                  </button>
                </div>
                <h4 className="text-xs font-black uppercase tracking-wider mb-8 text-gray-700 border-l-2 border-red-700 pl-3">Multiplicador Monetario (M0-M3)</h4>
                <div className="h-64 flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }} data={multiplierData}>
                      <defs>
                        <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#b91c1c" stopOpacity={1} />
                          <stop offset="100%" stopColor="#7f1d1d" stopOpacity={1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} tick={{ fill: '#374151', fontWeight: 700 }} />
                      <YAxis hide />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb', radius: 12 }} />
                      <Bar dataKey="value" fill="url(#barGradient)" radius={[12, 12, 4, 4]} barSize={40} animationDuration={1500} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-red-700 text-white p-12 rounded-[3.5rem] shadow-2xl shadow-red-700/30 relative overflow-hidden group/chart flex flex-col justify-between">
                <div className="absolute top-8 right-8 flex items-center gap-1.5 z-10 opacity-0 group-hover/chart:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite('Erosión del Poder Adquisitivo');
                    }}
                    className={`p-2 rounded-full border transition-all active:scale-90 cursor-pointer ${
                      isFavorite('Erosión del Poder Adquisitivo')
                        ? 'bg-white text-red-700 border-white shadow-sm'
                        : 'bg-white/10 text-white hover:bg-white hover:text-red-700 border-white/20'
                    }`}
                    title={isFavorite('Erosión del Poder Adquisitivo') ? 'Quitar de favoritos' : 'Marcar como favorito'}
                  >
                    <Star size={16} className={isFavorite('Erosión del Poder Adquisitivo') ? 'fill-red-700 text-red-700' : ''} />
                  </button>
                  <button 
                    onClick={() => setSelectedDetail('Erosión del Poder Adquisitivo')}
                    className="p-2 bg-white/10 text-white hover:bg-white hover:text-red-700 rounded-full border border-white/20 transition-all active:scale-90"
                    title="Más información sobre esta gráfica"
                  >
                    <Info size={18} />
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingDown size={32} className="text-red-200 group-hover:scale-110 transition-transform" />
                    <h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none">El Impuesto Silencioso</h4>
                  </div>
                  <p className="text-red-100 text-base md:text-lg font-bold uppercase tracking-tight leading-tight mb-6">La inflación disuelve el <span className="text-white font-black underline decoration-white/30 decoration-4">poder adquisitivo real</span> del ahorro nominal.</p>
                </div>
                <div className="h-48 bg-white/5 backdrop-blur-sm rounded-[2rem] p-6 relative z-10 border border-white/10 mt-auto">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={erosionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="erosionGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#fff" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#fff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Tooltip content={<CustomTooltip />} />
                      <Area type="monotone" dataKey="real" stroke="#fff" fill="url(#erosionGradient)" strokeWidth={4} animationDuration={2000} />
                      <Line type="monotone" dataKey="nominal" stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </section>

          {/* 02. MERCADOS */}
          <section id="sec-02" className="mb-40 space-y-12">
            <div className="border-b-4 border-red-700 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><BarChart3 className="text-gray-900" size={32} />02. Mercados y Bolsa</h3><p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">Activos, Cotizaciones y Derivados</p></div>
              <InfoPanel sectionId="sec-02" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sortWithFavoritesFirst([
                { title: 'Acciones', desc: 'Renta Variable. Títulos de propiedad corporativa.', icon: <Activity /> },
                { title: 'Bonos', desc: 'Renta Fija. Deuda emitida con retorno predecible.', icon: <ShieldCheck /> },
                { title: 'Futuros', desc: 'Compromiso de intercambio en fecha futura.', icon: <Zap /> },
                { title: 'Opciones', desc: 'Derecho a compra o venta de activos.', icon: <Layers /> },
              ]).map(item => (
                <div 
                  key={item.title} 
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedDetail(item.title)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDetail(item.title); } }}
                  className="p-8 text-left rounded-[2.5rem] border bg-white border-gray-100 shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 group relative active:scale-95 cursor-pointer"
                >
                   <div className="mb-4 transition-transform group-hover:scale-125 duration-300 text-red-700">{item.icon}</div>
                   <div className="flex items-center justify-between gap-2 mb-2">
                     <h4 className="font-black text-xl uppercase italic tracking-tighter text-gray-900">{item.title}</h4>
                     <div className="flex items-center gap-1.5">
                       <button
                         type="button"
                         onClick={(e) => {
                           e.stopPropagation();
                           toggleFavorite(item.title);
                         }}
                         className={`p-1.5 rounded-full border transition-all active:scale-90 ${
                           isFavorite(item.title)
                             ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                             : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:bg-red-50 border-gray-100'
                         }`}
                         title={isFavorite(item.title) ? `Quitar ${item.title} de favoritos` : `Marcar ${item.title} como favorito`}
                         aria-label={`Favorito ${item.title}`}
                       >
                         <Star size={15} className={isFavorite(item.title) ? 'fill-red-700 text-red-700' : ''} />
                       </button>
                       <button
                         type="button"
                         onClick={(e) => { e.stopPropagation(); openDirectLinks(item.title); }}
                         className="p-1.5 rounded-full bg-gray-50 text-gray-400 hover:text-red-700 hover:bg-red-50 transition-all border border-gray-100"
                         title={`Opciones con URLs y links directos de ${item.title}`}
                       >
                         <Compass size={16} />
                       </button>
                       <div className="p-1.5 rounded-full bg-gray-50 text-gray-500 group-hover:text-red-700 group-hover:bg-red-50 transition-all">
                         <Info size={16} />
                       </div>
                     </div>
                   </div>
                   <p className="text-sm leading-relaxed font-semibold text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-xl shadow-gray-100/50 relative group/chart">
               <div className="absolute top-10 right-10 flex items-center gap-1.5 z-10 opacity-0 group-hover/chart:opacity-100 transition-opacity">
                 <button
                   type="button"
                   onClick={(e) => {
                     e.stopPropagation();
                     toggleFavorite('Matriz Riesgo vs Beneficio');
                   }}
                   className={`p-2 rounded-full border transition-all active:scale-90 cursor-pointer ${
                     isFavorite('Matriz Riesgo vs Beneficio')
                       ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                       : 'bg-gray-50 text-gray-400 hover:text-red-700 border-gray-200'
                   }`}
                   title={isFavorite('Matriz Riesgo vs Beneficio') ? 'Quitar de favoritos' : 'Marcar como favorito'}
                 >
                   <Star size={18} className={isFavorite('Matriz Riesgo vs Beneficio') ? 'fill-red-700 text-red-700' : ''} />
                 </button>
                 <button 
                   onClick={() => setSelectedDetail('Matriz Riesgo vs Beneficio')}
                   className="p-2 bg-gray-50 text-gray-500 hover:text-red-700 rounded-full border border-gray-200 transition-all active:scale-90"
                   title="Análisis detallado del riesgo vs beneficio"
                 >
                   <Info size={22} />
                 </button>
               </div>
               <h4 className="text-center text-xs font-black uppercase tracking-wider mb-12 text-gray-700">Matriz Riesgo vs Beneficio</h4>
               <div className="h-[400px] max-w-5xl mx-auto">
                 <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={riskReturnData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} tick={{ fill: '#111827', fontWeight: 700 }} />
                      <YAxis yAxisId="left" hide domain={[0, 30]} />
                      <YAxis yAxisId="right" orientation="right" hide domain={[0, 30]} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                      <Legend verticalAlign="top" height={36} iconType="circle" />
                      <Bar yAxisId="left" dataKey="retorno" name="Beneficio (%)" radius={[15, 15, 5, 5]} barSize={50} animationBegin={500} animationDuration={2000}>
                        {riskReturnData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                      </Bar>
                      <Line yAxisId="right" type="monotone" dataKey="riesgo" name="Índice de Riesgo" stroke="#dc2626" strokeWidth={4} dot={{ r: 6, fill: '#dc2626', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} animationDuration={2500} />
                    </ComposedChart>
                 </ResponsiveContainer>
               </div>
               <div className="flex justify-center gap-12 mt-8">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 bg-gray-900 rounded-full"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Beneficio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-1 bg-red-700 rounded-full"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Volatilidad / Riesgo</span>
                  </div>
               </div>
            </div>
          </section>

          {/* 03. ARQUITECTURA DEFI */}
          <section id="sec-03" className="mb-40 space-y-12">
            <div className="border-b-4 border-gray-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><Cpu className="text-red-700" size={32} />03. Arquitectura DeFi</h3><p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">Soberanía Matemática y Código Inmutable</p></div>
              <InfoPanel sectionId="sec-03" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6 pl-2 border-l-2 border-red-700">
                   <h4 className="text-xs font-black uppercase tracking-wider text-red-700">Equivalencias de Sistema</h4>
                   <span className="text-xs font-bold uppercase bg-red-50 text-red-700 px-2.5 py-0.5 rounded-md">Detalle por elemento</span>
                </div>
                
                <div className="space-y-4">
                  {sortWithFavoritesFirst(EQUIVALENCES, (item) => item.defi).map((item) => (
                    <div key={item.trad} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(item.defi);
                        }}
                        className={`p-2.5 rounded-xl border transition-all active:scale-90 shrink-0 cursor-pointer ${
                          isFavorite(item.defi)
                            ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                            : 'bg-white text-gray-400 hover:text-red-700 border-gray-200 hover:border-red-300'
                        }`}
                        title={isFavorite(item.defi) ? `Quitar ${item.defi} de favoritos` : `Marcar ${item.defi} como favorito`}
                        aria-label={`Favorito ${item.defi}`}
                      >
                        <Star size={16} className={isFavorite(item.defi) ? 'fill-red-700 text-red-700' : ''} />
                      </button>
                      <button 
                        onClick={() => setSelectedEquivalence(item)}
                        className="flex-1 bg-white border border-gray-200 p-5 rounded-[1.3rem] flex justify-between items-center group hover:border-gray-600 transition-all shadow-sm hover:shadow-md duration-300 relative overflow-hidden"
                      >
                        <span className="font-bold text-xs uppercase text-gray-700 tracking-wider group-hover:text-gray-900 transition-colors">{item.trad}</span>
                        <div className="p-1.5 bg-gray-50 rounded-lg text-gray-500 group-hover:text-gray-900 transition-colors">
                           <Landmark size={14} />
                        </div>
                      </button>
                      <div className="flex-shrink-0">
                        <ArrowRight className="text-red-700" size={16} strokeWidth={3} />
                      </div>
                      <button 
                        onClick={() => setSelectedEquivalence(item)}
                        className="flex-1 bg-white border border-gray-200 p-5 rounded-[1.3rem] flex justify-between items-center group hover:border-red-600 transition-all shadow-sm hover:shadow-xl hover:-translate-y-0.5 duration-300 relative overflow-hidden"
                      >
                        <span className="font-extrabold text-xs uppercase text-gray-900 tracking-tight">{item.defi}</span>
                        <div className="p-1.5 bg-red-50 rounded-lg text-red-700">
                           <Cpu size={14} />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-12 rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-8 shadow-xl shadow-gray-100/50 border border-gray-100 relative group/chart overflow-hidden">
                <div className="absolute top-10 right-10 flex items-center gap-1.5 z-10 opacity-0 group-hover/chart:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite('Garantía Sistémica');
                    }}
                    className={`p-2 rounded-full border transition-all active:scale-90 cursor-pointer ${
                      isFavorite('Garantía Sistémica')
                        ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                        : 'bg-gray-50 text-gray-400 hover:text-red-700 border-gray-200'
                    }`}
                    title={isFavorite('Garantía Sistémica') ? 'Quitar de favoritos' : 'Marcar como favorito'}
                  >
                    <Star size={18} className={isFavorite('Garantía Sistémica') ? 'fill-red-700 text-red-700' : ''} />
                  </button>
                  <button 
                    onClick={() => setSelectedDetail('Garantía Sistémica')}
                    className="p-2 bg-gray-50 text-gray-500 hover:text-red-700 rounded-full border border-gray-200 transition-all active:scale-90"
                    title="Seguridad de las garantías en DeFi"
                  >
                    <Info size={22} />
                  </button>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/5 blur-[100px] pointer-events-none"></div>
                <div className="absolute top-6 right-8 text-xs font-black text-gray-400 uppercase tracking-widest vertical-text">LIQUIDITY CERTAINTY</div>
                
                <div className="flex items-center gap-4 mb-2 relative z-10">
                   <Scale size={32} className="text-red-700 group-hover:rotate-12 transition-transform duration-500" />
                   <h4 className="text-2xl font-black uppercase tracking-tighter italic text-gray-900">Garantía Sistémica</h4>
                </div>
                <p className="text-gray-700 text-base font-semibold max-w-md mx-auto mb-4 relative z-10 leading-relaxed">Diferencia entre la ilusión del crédito Fiat y el respaldo real DeFi.</p>
                
                <div className="h-64 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={collateralComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" fontSize={12} axisLine={false} tickLine={false} tick={{ fill: '#111827', fontWeight: 700 }} />
                      <YAxis hide domain={[0, 160]} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                      <Bar dataKey="principal" name="Respaldo Real" stackId="a" fill="#b91c1c" radius={[0, 0, 0, 0]}>
                        <LabelList dataKey="desc" position="top" style={{ fill: '#111827', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }} />
                      </Bar>
                      <Bar dataKey="leverage" name="Crédito (Fraccionario)" stackId="a" fill="#374151" radius={[15, 15, 0, 0]} />
                      <Bar dataKey="debt" name="Deuda Emitida" fill="#ffffff" stroke="#111827" strokeWidth={2} radius={[15, 15, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex gap-6 mt-4 relative z-10">
                   <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-red-700 rounded-full"></span>
                      <span className="text-xs font-bold uppercase text-gray-700">Respaldo Real</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-gray-700 rounded-full"></span>
                      <span className="text-xs font-bold uppercase text-gray-700">Crédito</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 bg-white border border-black rounded-full"></span>
                      <span className="text-xs font-bold uppercase text-gray-700">Préstamo</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Matriz Comparativa Detallada: DeFi vs Mercado Fiat */}
            <div className="pt-8">
              <DefiVsFiatMatrix 
                onOpenDetailModal={(name) => setSelectedDetail(name)} 
                onOpenDirectLinks={(name) => openDirectLinks(name)} 
              />
            </div>
          </section>

          {/* 04. INSTRUMENTOS DEFI */}
          <section id="sec-04" className="mb-40 space-y-12">
             <div className="border-b-4 border-red-700 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <Wallet className="text-gray-900" size={32} />04. Instrumentos DeFi & Ecosistema
                </h3>
                <p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">
                  Infraestructura Programable, Derivados, AMM, RWA y Regulación
                </p>
              </div>
              <InfoPanel sectionId="sec-04" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {sortWithFavoritesFirst([ 
                 { t: 'Stablecoins', d: 'Tokens vinculados al Fiat. Estabilidad on-chain.', tag: 'Anclaje' }, 
                 { t: 'DEX', d: 'Intercambio mediante pools algorítmicos.', tag: 'Liquidez' }, 
                 { t: 'Pools de Liquidez', d: 'Curvas AMM (x·y=k) y liquidez concentrada V3.', tag: 'AMM Core' },
                 { t: 'Perpetuales', d: 'Futuros sintéticos 24/7 sin expiración con Funding Rate.', tag: 'Derivados' },
                 { t: 'Préstamos On-Chain', d: 'Crédito sobre-colateralizado y cálculo de Health Factor.', tag: 'Lending' },
                 { t: 'Liquid Staking', d: 'Derivados líquidos (LST) con recompensas PoS pasivas.', tag: 'Staking' },
                 { t: 'Restaking', d: 'Validación extendida para servicios AVS con EigenLayer.', tag: 'Seguridad' },
                 { t: 'Account Abstraction', d: 'Smart Wallets ERC-4337, firmas biométricas y paymasters sin gas.', tag: 'UX Web3' },
                 { t: 'Rollups & Capas 2', d: 'Escalado L2 ZK y Optimistic con blobs EIP-4844 y comisiones mínimas.', tag: 'L2 Scaling' },
                 { t: 'Agregadores DEX', d: 'Enrutamiento multi-pool, subastas CoW y protección anti-MEV.', tag: 'Enrutamiento' },
                 { t: 'Vaults ERC-4626', d: 'Bóvedas estandarizadas de rendimiento automatizado.', tag: 'Yield' },
                 { t: 'Puentes Cross-Chain', d: 'Paso de liquidez entre redes L1 y L2 con seguridad cripto.', tag: 'Bridges' },
                 { t: 'Oráculos & MEV', d: 'Feeds de precios externos y extracción de arbitraje.', tag: 'Infra' },
                 { t: 'RWA', d: 'Bonos del tesoro y crédito real tokenizados en blockchain.', tag: 'Mundo Real' },
                 { t: 'DAOs', d: 'Gobernanza descentralizada y tesorerías programadas.', tag: 'Gobernanza' },
                 { t: 'Seguros', d: 'Protección contra fallos de código y depeg de stablecoins.', tag: 'Cobertura' },
                 { t: 'EURC & Fichas EMT', d: 'Dinero electrónico respaldado 1:1 en euros bajo regulación MiCA.', tag: 'MiCA EMT' },
                 { t: 'Reglamento MiCA', d: 'Marco regulatorio uniforme UE (fichas EMT y ART).', tag: 'Legal UE' },
                 { t: 'Modelo 721 AEAT', d: 'Declaración informativa española para custodia exterior.', tag: 'Fiscalidad' }
               ]).map(item => (
                 <div 
                  key={item.t} 
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedDetail(item.t)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDetail(item.t); } }}
                  className="text-left bg-white p-7 rounded-[2rem] border border-gray-100 hover:border-red-700/40 hover:shadow-2xl transition-all group active:scale-[0.98] flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-black text-lg uppercase italic text-gray-900 group-hover:text-red-700 tracking-tighter group-hover:scale-105 transition-transform origin-left">{item.t}</h4>
                      <div className="flex items-center gap-2">
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(item.t);
                          }}
                          className={`p-1.5 rounded-xl border transition-all active:scale-90 cursor-pointer ${
                            isFavorite(item.t)
                              ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                              : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:border-gray-200'
                          }`}
                          title={isFavorite(item.t) ? `Quitar ${item.t} de favoritos` : `Marcar ${item.t} como favorito`}
                          aria-label={`Favorito ${item.t}`}
                        >
                          <Star size={13} className={isFavorite(item.t) ? 'fill-red-700 text-red-700' : ''} />
                        </button>
                        <span className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{item.tag}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-semibold">{item.d}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-bold uppercase text-gray-500">
                    <div className="flex items-center gap-1.5 group-hover:text-red-700 transition-colors">
                      <span>Ver Análisis</span>
                      <Info size={16} />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openDirectLinks(item.t);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-gray-50 hover:bg-red-700 text-gray-700 hover:text-white border border-gray-200 transition-all flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider shadow-sm cursor-pointer"
                      title={`Opciones con URLs y links directos de ${item.t}`}
                    >
                      <Compass size={13} className="text-red-700 group-hover:text-white" />
                      <span>Links</span>
                    </button>
                  </div>
                </div>
               ))}
            </div>
          </section>

          {/* 05. LÍDERES */}
          <section id="sec-05" className="mb-40 space-y-24">
            <div className="border-b-4 border-gray-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><Globe className="text-red-700" size={32} />05. Protocolos Líderes</h3><p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">Los pilares de la infraestructura digital</p></div>
              <InfoPanel sectionId="sec-05" />
            </div>
            
            {/* CRIPTOACTIVOS */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 border-l-4 border-red-700 pl-4">Criptoactivos de Reserva</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortWithFavoritesFirst(CRYPTO_ASSETS).map((c) => (
                  <div 
                    key={c.name} 
                    className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-red-600 transition-all group relative hover:z-30"
                    title={`${c.name} (${c.category}): ${c.desc}`}
                  >
                    {/* Tooltip explicativo al pasar el cursor */}
                    <div 
                      className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 max-w-[90vw] p-3 bg-gray-950 text-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 border border-gray-800"
                      role="tooltip"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-gray-800">
                        <span className="font-black text-white text-[11px] uppercase tracking-tight truncate">{c.name}</span>
                        <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/40 shrink-0">
                          {c.category}
                        </span>
                      </div>
                      <p className="text-gray-300 text-[11px] font-normal leading-relaxed">
                        {c.desc}
                      </p>
                      <div className="mt-2 pt-1 border-t border-gray-800 flex items-center justify-between text-[9px] text-gray-400 uppercase tracking-wider font-mono">
                        <span>Pasa a ver detalles</span>
                        <span className="text-red-400 font-bold">Ver análisis →</span>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-950"></div>
                    </div>

                    <button 
                      onClick={() => window.open(c.url, '_blank')}
                      className="p-3 bg-gray-900 text-white rounded-xl hover:bg-red-700 transition-colors flex-shrink-0 active:scale-90"
                      title={`Visitar web oficial de ${c.name}`}
                    >
                      {React.cloneElement(c.icon as React.ReactElement<any>, { size: 16 })}
                    </button>
                    <button 
                      onClick={() => setSelectedDetail(c.name)}
                      className="flex-1 px-3 py-3 text-left font-bold text-xs uppercase tracking-tight text-gray-900 truncate hover:text-red-700 transition-colors"
                    >
                      {c.name}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(c.name);
                      }}
                      className={`p-2 rounded-xl border transition-all active:scale-90 flex-shrink-0 mr-1 ${
                        isFavorite(c.name)
                          ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                          : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:border-gray-300'
                      }`}
                      title={isFavorite(c.name) ? `Quitar ${c.name} de favoritos` : `Marcar ${c.name} como favorito`}
                      aria-label={`Favorito ${c.name}`}
                    >
                      <Star size={14} className={isFavorite(c.name) ? 'fill-red-700 text-red-700' : ''} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); openDirectLinks(c.name); }}
                      className="p-2.5 rounded-xl bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-700 border border-gray-200 transition-all flex-shrink-0 mr-1"
                      title={`Opciones con URLs y links directos de ${c.name}`}
                    >
                      <Compass size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* STABLECOINS */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 border-l-4 border-gray-900 pl-4">Stablecoins Globales & Fichas EMT</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {sortWithFavoritesFirst(STABLECOINS).map((s) => (
                  <div 
                    key={s.name} 
                    className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-gray-900 transition-all group relative hover:z-30"
                    title={`${s.name} (${s.category}): ${s.desc}`}
                  >
                    {/* Tooltip explicativo al pasar el cursor */}
                    <div 
                      className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 max-w-[90vw] p-3 bg-gray-950 text-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 border border-gray-800"
                      role="tooltip"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-gray-800">
                        <span className="font-black text-white text-[11px] uppercase tracking-tight truncate">{s.name}</span>
                        <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/40 shrink-0">
                          {s.category}
                        </span>
                      </div>
                      <p className="text-gray-300 text-[11px] font-normal leading-relaxed">
                        {s.desc}
                      </p>
                      <div className="mt-2 pt-1 border-t border-gray-800 flex items-center justify-between text-[9px] text-gray-400 uppercase tracking-wider font-mono">
                        <span>Pasa a ver detalles</span>
                        <span className="text-red-400 font-bold">Ver análisis →</span>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-950"></div>
                    </div>

                    <button 
                      onClick={() => window.open(s.url, '_blank')}
                      className="p-3 bg-red-700 text-white rounded-xl hover:bg-gray-900 transition-colors flex-shrink-0"
                      title={`Visitar emisor de ${s.name}`}
                    >
                      {React.cloneElement(s.icon as React.ReactElement<any>, { size: 16 })}
                    </button>
                    <button 
                      onClick={() => setSelectedDetail(s.name)}
                      className="flex-1 px-3 py-3 text-left font-bold text-xs uppercase tracking-tight text-gray-900 truncate hover:text-red-700 transition-colors"
                    >
                      {s.name}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(s.name);
                      }}
                      className={`p-2 rounded-xl border transition-all active:scale-90 flex-shrink-0 mr-1 ${
                        isFavorite(s.name)
                          ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                          : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:border-gray-300'
                      }`}
                      title={isFavorite(s.name) ? `Quitar ${s.name} de favoritos` : `Marcar ${s.name} como favorito`}
                      aria-label={`Favorito ${s.name}`}
                    >
                      <Star size={14} className={isFavorite(s.name) ? 'fill-red-700 text-red-700' : ''} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); openDirectLinks(s.name); }}
                      className="p-2.5 rounded-xl bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-700 border border-gray-200 transition-all flex-shrink-0 mr-1"
                      title={`Opciones con URLs y links directos de ${s.name}`}
                    >
                      <Compass size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* WALLETS */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 border-l-4 border-red-700 pl-4">Infraestructura de Custodia (Wallets)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <span className="flex items-center gap-2 text-xs font-black uppercase text-red-700 tracking-wider px-2">
                    <Smartphone size={16} /> Hot Wallets (Uso Diario & Smart Wallets)
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    {sortWithFavoritesFirst(HOT_WALLETS).map((w) => (
                      <div 
                        key={w.name} 
                        className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-red-700 transition-all group relative hover:z-30"
                        title={`${w.name} (${w.category}): ${w.desc}`}
                      >
                        {/* Tooltip explicativo al pasar el cursor */}
                        <div 
                          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 max-w-[90vw] p-3 bg-gray-950 text-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 border border-gray-800"
                          role="tooltip"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-gray-800">
                            <span className="font-black text-white text-[11px] uppercase tracking-tight truncate">{w.name}</span>
                            <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/40 shrink-0">
                              {w.category}
                            </span>
                          </div>
                          <p className="text-gray-300 text-[11px] font-normal leading-relaxed">
                            {w.desc}
                          </p>
                          <div className="mt-2 pt-1 border-t border-gray-800 flex items-center justify-between text-[9px] text-gray-400 uppercase tracking-wider font-mono">
                            <span>Pasa a ver detalles</span>
                            <span className="text-red-400 font-bold">Ver análisis →</span>
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-950"></div>
                        </div>

                        <button onClick={() => window.open(w.url, '_blank')} className="p-3 bg-gray-900 text-white rounded-xl hover:bg-red-700 transition-colors flex-shrink-0">
                          {React.cloneElement(w.icon as React.ReactElement<any>, { size: 16 })}
                        </button>
                        <button onClick={() => setSelectedDetail(w.name)} className="flex-1 px-3 py-3 text-left font-bold text-xs uppercase tracking-tight text-gray-900 hover:text-red-700 transition-colors">
                          {w.name}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(w.name);
                          }}
                          className={`p-2 rounded-xl border transition-all active:scale-90 flex-shrink-0 mr-1 ${
                            isFavorite(w.name)
                              ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                              : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:border-gray-300'
                          }`}
                          title={isFavorite(w.name) ? `Quitar ${w.name} de favoritos` : `Marcar ${w.name} como favorito`}
                          aria-label={`Favorito ${w.name}`}
                        >
                          <Star size={14} className={isFavorite(w.name) ? 'fill-red-700 text-red-700' : ''} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); openDirectLinks(w.name); }}
                          className="p-2.5 rounded-xl bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-700 border border-gray-200 transition-all flex-shrink-0 mr-1"
                          title={`Opciones con URLs y links directos de ${w.name}`}
                        >
                          <Compass size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase text-gray-600 tracking-wider px-2">
                    <HardDrive size={16} /> Cold Wallets (Seguridad Máxima de Claves)
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    {sortWithFavoritesFirst(COLD_WALLETS).map((w) => (
                      <div 
                        key={w.name} 
                        className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-gray-900 transition-all group relative hover:z-30"
                        title={`${w.name} (${w.category}): ${w.desc}`}
                      >
                        {/* Tooltip explicativo al pasar el cursor */}
                        <div 
                          className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 max-w-[90vw] p-3 bg-gray-950 text-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 border border-gray-800"
                          role="tooltip"
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-gray-800">
                            <span className="font-black text-white text-[11px] uppercase tracking-tight truncate">{w.name}</span>
                            <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/40 shrink-0">
                              {w.category}
                            </span>
                          </div>
                          <p className="text-gray-300 text-[11px] font-normal leading-relaxed">
                            {w.desc}
                          </p>
                          <div className="mt-2 pt-1 border-t border-gray-800 flex items-center justify-between text-[9px] text-gray-400 uppercase tracking-wider font-mono">
                            <span>Pasa a ver detalles</span>
                            <span className="text-red-400 font-bold">Ver análisis →</span>
                          </div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-950"></div>
                        </div>

                        <button onClick={() => window.open(w.url, '_blank')} className="p-3 bg-red-700 text-white rounded-xl hover:bg-gray-900 transition-colors flex-shrink-0">
                          {React.cloneElement(w.icon as React.ReactElement<any>, { size: 16 })}
                        </button>
                        <button onClick={() => setSelectedDetail(w.name)} className="flex-1 px-3 py-3 text-left font-bold text-xs uppercase tracking-tight text-gray-900 hover:text-red-700 transition-colors">
                          {w.name}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(w.name);
                          }}
                          className={`p-2 rounded-xl border transition-all active:scale-90 flex-shrink-0 mr-1 ${
                            isFavorite(w.name)
                              ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                              : 'bg-gray-50 text-gray-400 hover:text-red-700 hover:border-gray-300'
                          }`}
                          title={isFavorite(w.name) ? `Quitar ${w.name} de favoritos` : `Marcar ${w.name} como favorito`}
                          aria-label={`Favorito ${w.name}`}
                        >
                          <Star size={14} className={isFavorite(w.name) ? 'fill-red-700 text-red-700' : ''} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); openDirectLinks(w.name); }}
                          className="p-2.5 rounded-xl bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-700 border border-gray-200 transition-all flex-shrink-0 mr-1"
                          title={`Opciones con URLs y links directos de ${w.name}`}
                        >
                          <Compass size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DEFI PLATFORMS */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-wider text-gray-700 border-l-4 border-red-700 pl-4">Infraestructura DeFi & Plataformas Analíticas</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sortWithFavoritesFirst(DEFI_PLATFORMS).map((p) => (
                  <div 
                    key={p.name} 
                    className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-red-700 transition-all group relative hover:z-30"
                    title={`${p.name} (${p.category}): ${p.desc}`}
                  >
                    {/* Tooltip explicativo al pasar el cursor */}
                    <div 
                      className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 max-w-[90vw] p-3 bg-gray-950 text-white rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 border border-gray-800"
                      role="tooltip"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-gray-800">
                        <span className="font-black text-white text-[11px] uppercase tracking-tight truncate">{p.name}</span>
                        <span className="text-[9px] font-bold text-red-400 uppercase tracking-wider bg-red-950/80 px-1.5 py-0.5 rounded border border-red-800/40 shrink-0">
                          {p.category}
                        </span>
                      </div>
                      <p className="text-gray-300 text-[11px] font-normal leading-relaxed">
                        {p.desc}
                      </p>
                      <div className="mt-2 pt-1 border-t border-gray-800 flex items-center justify-between text-[9px] text-gray-400 uppercase tracking-wider font-mono">
                        <span>Pasa a ver detalles</span>
                        <span className="text-red-400 font-bold">Ver análisis →</span>
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-950"></div>
                    </div>

                    <button 
                      onClick={() => window.open(p.url, '_blank')}
                      className="p-3 bg-gray-900 text-white rounded-xl hover:bg-red-700 transition-colors flex-shrink-0"
                      title={`Visitar web oficial de ${p.name}`}
                    >
                      {React.cloneElement(p.icon as React.ReactElement<any>, { size: 16 })}
                    </button>
                    <button 
                      onClick={() => setSelectedDetail(p.name)}
                      className="flex-1 px-3 py-3 text-left font-bold text-xs uppercase tracking-tight text-gray-900 truncate hover:text-red-700 transition-colors"
                    >
                      {p.name}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(p.name);
                      }}
                      className={`p-2 rounded-xl border transition-all active:scale-90 flex-shrink-0 mr-1 ${
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
                      onClick={(e) => { e.stopPropagation(); openDirectLinks(p.name); }}
                      className="p-2.5 rounded-xl bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-700 border border-gray-200 transition-all flex-shrink-0 mr-1"
                      title={`Opciones con URLs y links directos de ${p.name} (DApp, Docs, Stats)`}
                    >
                      <Compass size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECCIÓN ESPECIAL: COINGLASS & CONCEPTO DE LIQUIDACIONES */}
            <div className="bg-white border-2 border-red-700/80 rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-red-700 text-white font-black text-[10px] uppercase tracking-widest rounded-full">
                      Derivados & Gestión de Riesgo
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-800 font-mono text-[10px] font-bold rounded-full">
                      Telemetría en Tiempo Real
                    </span>
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-950 flex items-center gap-3">
                    <TrendingUp className="text-red-700" size={28} />
                    Coinglass & Concepto de Liquidaciones
                  </h4>
                  <p className="text-gray-600 text-sm font-medium mt-1 max-w-3xl">
                    Anatomía del desapalancamiento forzoso: cómo los contratos inteligentes y motores de riesgo cierran posiciones insolventes y cómo Coinglass mapea la liquidez acumulada en futuros y perpetuos.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite('Coinglass');
                    }}
                    className={`p-2.5 rounded-xl border transition-all active:scale-95 cursor-pointer flex items-center justify-center ${
                      isFavorite('Coinglass')
                        ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                        : 'bg-white text-gray-400 hover:text-red-700 border-gray-200'
                    }`}
                    title={isFavorite('Coinglass') ? 'Quitar Coinglass de favoritos' : 'Marcar Coinglass como favorito'}
                    aria-label="Favorito Coinglass"
                  >
                    <Star size={16} className={isFavorite('Coinglass') ? 'fill-red-700 text-red-700' : ''} />
                  </button>
                  <button
                    onClick={() => openDirectLinks('Coinglass')}
                    className="px-4 py-2.5 rounded-xl bg-gray-900 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm active:scale-95"
                    title="Ver enlaces directos a herramientas oficiales de Coinglass"
                  >
                    <Compass size={15} />
                    <span>Enlaces Coinglass</span>
                  </button>
                  <a
                    href="https://www.coinglass.com/es/pro/futures/LiquidationHeatMap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm active:scale-95"
                    title="Abrir el Mapa de Calor de Liquidaciones oficial de Coinglass"
                  >
                    <span>Mapa de Calor</span>
                    <ExternalLink size={14} />
                  </a>
                  <button
                    onClick={() => setSelectedDetail('Liquidación')}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-900 font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all active:scale-95"
                    title="Consultar la tesis técnica y pedagógica completa sobre Liquidaciones"
                  >
                    <Info size={14} className="text-red-700" />
                    <span>Tesis Técnica</span>
                  </button>
                </div>
              </div>

              {/* Grid explicativo de los pilares de la liquidación */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertTriangle size={18} />
                    <span className="text-xs font-black uppercase tracking-wider text-gray-900">¿Qué es Liquidar?</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-normal">
                    El cierre forzoso e irrevocable de una posición apalancada cuando la garantía cae por debajo del margen de mantenimiento exigido, protegiendo al protocolo o exchange de la insolvencia.
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-red-700">
                    <TrendingDown size={18} />
                    <span className="text-xs font-black uppercase tracking-wider text-gray-900">Futuros & Mark Price</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-normal">
                    En exchanges y DEXs de perpetuos, las liquidaciones se activan mediante el <strong>Mark Price</strong> (precio índice de oráculos agregados) para mitigar manipulaciones de libros locales.
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-red-700">
                    <Cpu size={18} />
                    <span className="text-xs font-black uppercase tracking-wider text-gray-900">DeFi Lending & HF &lt; 1.0</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-normal">
                    En Aave o Morpho, si el <strong>Health Factor</strong> cae de 1.0, bots liquidadores pagan parte de la deuda y reciben colateral con bonificación (5-10%), asegurando la liquidez del protocolo.
                  </p>
                </div>

                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-200 space-y-2">
                  <div className="flex items-center gap-2 text-red-700">
                    <Layers size={18} />
                    <span className="text-xs font-black uppercase tracking-wider text-gray-900">Cascadas & Squeezes</span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-normal">
                    La ejecución masiva de órdenes forzadas retroalimenta el precio provocando <strong>Long Squeezes</strong> o <strong>Short Squeezes</strong>. Coinglass identifica estos cúmulos magnéticos de liquidez.
                  </p>
                </div>
              </div>

              {/* Banner de integración y herramientas Coinglass */}
              <div className="bg-gray-900 text-white rounded-2xl p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border border-gray-800">
                <div className="space-y-2 max-w-2xl">
                  <span className="text-[10px] font-black uppercase tracking-widest text-red-400">Terminal Analítica de Futuros</span>
                  <h5 className="text-xl font-black uppercase tracking-tight text-white">¿Cómo interpretar los mapas de liquidación en Coinglass?</h5>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    El <strong>Liquidation Heatmap</strong> proyecta bandas de color donde yacen precios de liquidación de miles de traders. Los creadores de mercado e instituciones buscan estos focos de liquidez para cerrar órdenes antes de giros de mercado. Monitorear el <strong>Open Interest (Interés Abierto)</strong> y el <strong>Funding Rate</strong> revela el sesgo especulativo del mercado.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 shrink-0 w-full lg:w-auto">
                  <a
                    href="https://www.coinglass.com/es/pro/futures/LiquidationHeatMap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/80 hover:bg-red-700 rounded-xl text-center transition-colors border border-gray-700 group"
                  >
                    <span className="text-[10px] text-gray-400 group-hover:text-white block font-mono">HeatMap</span>
                    <span className="text-xs font-black uppercase text-white">Mapa Calor</span>
                  </a>
                  <a
                    href="https://www.coinglass.com/es/LiquidationData"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/80 hover:bg-red-700 rounded-xl text-center transition-colors border border-gray-700 group"
                  >
                    <span className="text-[10px] text-gray-400 group-hover:text-white block font-mono">24h Data</span>
                    <span className="text-xs font-black uppercase text-white">Liquidaciones</span>
                  </a>
                  <a
                    href="https://www.coinglass.com/es/funding-rates"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800/80 hover:bg-red-700 rounded-xl text-center transition-colors border border-gray-700 group col-span-2 sm:col-span-1"
                  >
                    <span className="text-[10px] text-gray-400 group-hover:text-white block font-mono">Funding</span>
                    <span className="text-xs font-black uppercase text-white">Tasas Fin.</span>
                  </a>
                </div>
              </div>
            </div>

            {/* DIRECTORIO MAESTRO DE PLATAFORMAS & ANALÍTICA EN 4 BLOQUES */}
            <div className="pt-12 border-t-2 border-gray-100">
              <FinancialPlatformsDirectory 
                onSelectPlatform={(name) => setSelectedDetail(name)}
                onOpenDirectLinks={(name) => openDirectLinks(name)}
              />
            </div>
          </section>

          {/* 06. COMPARATIVA */}
          <section id="sec-06" className="mb-40 space-y-12">
            <div className="border-b-4 border-red-700 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><BarChart3 size={32} className="text-gray-900" />06. Comparativa Sistémica</h3><p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">Vector de Atributos y Eficiencia de Respuesta</p></div>
              <InfoPanel sectionId="sec-06" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
               <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 relative overflow-hidden group/chart">
                 <div className="absolute top-10 right-10 flex items-center gap-1.5 z-10 opacity-0 group-hover/chart:opacity-100 transition-opacity">
                   <button
                     type="button"
                     onClick={(e) => {
                       e.stopPropagation();
                       toggleFavorite('Radar de Atributos Sistémicos');
                     }}
                     className={`p-2 rounded-full border transition-all active:scale-90 cursor-pointer ${
                       isFavorite('Radar de Atributos Sistémicos')
                         ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                         : 'bg-gray-50 text-gray-400 hover:text-red-700 border-gray-200'
                     }`}
                     title={isFavorite('Radar de Atributos Sistémicos') ? 'Quitar de favoritos' : 'Marcar como favorito'}
                   >
                     <Star size={18} className={isFavorite('Radar de Atributos Sistémicos') ? 'fill-red-700 text-red-700' : ''} />
                   </button>
                   <button 
                     onClick={() => setSelectedDetail('Radar de Atributos Sistémicos')}
                     className="p-2 bg-gray-50 text-gray-500 hover:text-red-700 rounded-full border border-gray-200 transition-all active:scale-90"
                     title="Comparativa detallada de atributos"
                   >
                     <Info size={22} />
                   </button>
                 </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/5 blur-[100px] pointer-events-none"></div>
                 <h4 className="text-xs font-black uppercase tracking-wider text-red-700 mb-10 text-center relative z-10">Radar de Atributos Sistémicos</h4>
                 <div className="h-96 relative z-10">
                   <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                       <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
                       <PolarAngleAxis dataKey="subject" tick={{ fill: '#1f2937', fontSize: 12, fontWeight: 700 }} />
                       <Radar name="SISTEMA FIAT" dataKey="FIAT" stroke="#4b5563" fill="#4b5563" fillOpacity={0.15} strokeWidth={3} />
                       <Radar name="SISTEMA DEFI" dataKey="DEFI" stroke="#b91c1c" fill="#b91c1c" fillOpacity={0.25} strokeWidth={3} />
                       <Tooltip content={<CustomTooltip />} />
                       <Legend wrapperStyle={{ paddingTop: '30px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }} />
                     </RadarChart>
                   </ResponsiveContainer>
                 </div>
               </div>

               <div className="space-y-12">
                 <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50 relative group/chart overflow-hidden">
                   <div className="absolute top-8 right-8 flex items-center gap-1.5 z-10 opacity-0 group-hover/chart:opacity-100 transition-opacity">
                     <button
                       type="button"
                       onClick={(e) => {
                         e.stopPropagation();
                         toggleFavorite('Finalidad Transaccional');
                       }}
                       className={`p-2 rounded-full border transition-all active:scale-90 cursor-pointer ${
                         isFavorite('Finalidad Transaccional')
                           ? 'bg-red-50 text-red-700 border-red-200 shadow-sm'
                           : 'bg-gray-50 text-gray-400 hover:text-red-700 border-gray-200'
                       }`}
                       title={isFavorite('Finalidad Transaccional') ? 'Quitar de favoritos' : 'Marcar como favorito'}
                     >
                       <Star size={16} className={isFavorite('Finalidad Transaccional') ? 'fill-red-700 text-red-700' : ''} />
                     </button>
                     <button 
                       onClick={() => setSelectedDetail('Finalidad Transaccional')}
                       className="p-2 bg-gray-50 text-gray-500 hover:text-red-700 rounded-full border border-gray-200 transition-all active:scale-90"
                       title="Análisis de velocidad de asentamiento"
                     >
                       <Info size={18} />
                     </button>
                   </div>
                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                      <h4 className="text-xs font-black uppercase tracking-wider text-gray-700">Tiempo de Respuesta (Finalidad)</h4>
                      <Clock size={18} className="text-red-700 animate-pulse" />
                   </div>
                   <div className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                       <BarChart layout="vertical" data={responseTimeData} margin={{ left: 20, right: 60 }}>
                         <XAxis type="number" hide scale="log" domain={[0.1, 10000]} />
                         <YAxis dataKey="name" type="category" width={140} fontSize={12} axisLine={false} tickLine={false} tick={{ fill: '#111827', fontWeight: 700 }} />
                         <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                         <Bar dataKey="min" fill="#b91c1c" radius={[0, 10, 10, 0]} barSize={28}>
                            <LabelList dataKey="label" position="right" style={{ fill: '#111827', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase' }} offset={10} />
                         </Bar>
                       </BarChart>
                     </ResponsiveContainer>
                   </div>
                   <p className="text-xs text-gray-600 font-bold uppercase text-center mt-6 tracking-wider">Escala logarítmica de latencia transaccional</p>
                 </div>

                 <div className="space-y-6">
                   <h4 className="text-xs font-black uppercase tracking-wider text-red-700 px-6 border-l-4 border-red-700">Atributos de Disponibilidad y Certeza</h4>
                   <div className="grid grid-cols-2 gap-6">
                     <div className="text-center p-8 border-2 border-gray-200 rounded-[2.5rem] bg-white shadow-sm hover:shadow-xl transition-all group duration-500">
                       <div className="mb-2 flex justify-center"><Smartphone size={28} className="text-gray-900 group-hover:scale-110 transition-transform" /></div>
                       <span className="block text-4xl font-black text-gray-900 mb-1 italic tracking-tighter">24/7</span>
                       <span className="text-xs font-bold uppercase text-gray-700 tracking-wider">Mercado sin Cierre</span>
                     </div>
                     <div className="text-center p-8 border-2 border-red-700 bg-red-50/30 rounded-[2.5rem] shadow-xl shadow-red-700/5 hover:-translate-y-1 transition-all group duration-500">
                       <div className="mb-2 flex justify-center"><Shield size={28} className="text-red-700 group-hover:scale-110 transition-transform" /></div>
                       <span className="block text-4xl font-black text-red-700 mb-1 italic tracking-tighter">100%</span>
                       <span className="text-xs font-bold uppercase text-red-700 tracking-wider">Certeza Algorítmica</span>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </section>

          {/* 07. AMM, POOLS DE LIQUIDEZ & PERPETUALS */}
          <section id="sec-07" className="mb-40 space-y-12">
            <div className="border-b-4 border-gray-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <RefreshCw className="text-red-700" size={32} />07. AMM, Pools & Perpetuales
                </h3>
                <p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">
                  Formación de Precios sin Libro de Órdenes, Pérdida Impermanente y Derivados Sintéticos 24/7
                </p>
              </div>
              <InfoPanel sectionId="sec-07" />
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100/50 relative overflow-hidden">
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed relative z-10 max-w-5xl">
                Los <span className="font-black text-gray-900">Creadores de Mercado Automatizados (AMM)</span> eliminan los intermediarios bursátiles tradicionales mediante fórmulas deterministas (<code className="bg-white px-2 py-0.5 rounded font-mono font-black text-red-700 border border-gray-200">x · y = k</code>). Paralelamente, los <span className="text-red-700 font-black">Contratos Perpetuos (Perps)</span> replican futuros financieros sin vencimiento mediante un <span className="font-black text-gray-900">Funding Rate</span> algorítmico y aislamiento con <span className="font-black text-gray-900">Mark Price</span>.
              </p>
            </div>

            {/* Simulators & Ecosystem Platform Guide */}
            <div className="space-y-12">
              <LiquidityPoolSimulator />
              <PerpetualsEngine />
              <DexAmmEcosystemGuide onSelectPlatform={(name) => setSelectedDetail(name)} />
            </div>
          </section>

          {/* 08. PRÉSTAMOS, STAKING & INSTRUMENTOS EXPANDIDOS */}
          <section id="sec-08" className="mb-40 space-y-12">
            <div className="border-b-4 border-red-700 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <Coins className="text-gray-900" size={32} />08. Préstamos On-Chain, Staking & Arquitectura
                </h3>
                <p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">
                  Health Factor, Liquid Staking (LST), Restaking (LRT), Bóvedas ERC-4626 y Puentes
                </p>
              </div>
              <InfoPanel sectionId="sec-08" />
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100/50 relative overflow-hidden">
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed relative z-10 max-w-5xl">
                A diferencia de la reserva bancaria fraccionaria que crea depósitos de la nada, los mercados monetarios DeFi (<span className="font-black text-gray-900">Aave, Morpho</span>) exigen <span className="text-red-700 font-black">sobre-colateralización algorítmica</span> rigurosa controlada por el <span className="font-black text-gray-900">Health Factor</span>. Explora el simulador de liquidaciones y la biblioteca interactiva de arquitectura de protocolos.
              </p>
            </div>

            {/* Lending Simulator */}
            <LendingHealthSimulator />

            {/* Ecosystem Explorer */}
            <div className="pt-6">
              <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-3">
                <h4 className="text-xl font-black uppercase italic tracking-tight text-gray-900">
                  Explorador de Instrumentos de la Tesis
                </h4>
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                  Click para inspeccionar arquitectura y evidencias
                </span>
              </div>
              <EcosystemInstrumentsExplorer onSelectInstrument={(inst) => setSelectedDetail(inst.name)} />
            </div>
          </section>

          {/* 09. REGULACIÓN, FISCALIDAD & COMPLIANCE */}
          <section id="sec-09" className="mb-40 space-y-12">
            <div className="border-b-4 border-gray-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <Scale className="text-red-700" size={32} />09. Marco Regulatorio, Fiscalidad & Cumplimiento
                </h3>
                <p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">
                  Reglamento Europeo MiCA (UE 2023/1114), Directiva DAC8, Travel Rule y Modelos 172, 173 y 721 AEAT
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-manual', { detail: { target: 'cap-18' } }))}
                  className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 border border-red-200 text-red-700 text-xs font-black uppercase rounded-xl transition-all shadow-sm"
                  title="Abrir Capítulo 18 (MiCA) y Capítulo 19 (Fiscalidad España) en el Manual"
                >
                  <BookOpen size={14} />
                  <span>Manual Cap. 18 & 19</span>
                </button>
                <InfoPanel sectionId="sec-09" />
              </div>
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100/50 relative overflow-hidden">
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed relative z-10 max-w-5xl">
                La transición institucional exige total certidumbre jurídica. El <span className="font-black text-gray-900">Reglamento MiCA</span> unifica la supervisión de proveedores (CASP) y emisores de tokens en los 27 Estados de la UE. Paralelamente, en España la <span className="text-red-700 font-black">AEAT</span> aplica un exhaustivo régimen informativo mediante los <span className="font-black text-gray-900">Modelos 172, 173 y 721</span> con trazabilidad total bajo la directiva DAC8.
              </p>
            </div>

            {/* Regulatory Interactive Module */}
            <RegulatoryComplianceModule />
          </section>

          {/* 10. MATRIZ DE RIESGO & HIGIENE OPERATIVA */}
          <section id="sec-10" className="mb-40 space-y-12">
            <div className="border-b-4 border-red-700 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
                  <ShieldCheck className="text-gray-900" size={32} />10. Matriz de Riesgo en 8 Dimensiones
                </h3>
                <p className="text-gray-600 font-bold uppercase text-xs tracking-wider mt-2">
                  Gestión de Aprobaciones Ilimitadas, Firma Ciega, Riesgo de Contraparte y Auditoría de Seguridad
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.dispatchEvent(new CustomEvent('open-manual', { detail: { target: 'cap-15' } }))}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-900 text-xs font-black uppercase rounded-xl transition-all shadow-sm"
                  title="Abrir Capítulo 15 (Matriz de Riesgo) y Capítulo 16 (Seguridad) en el Manual"
                >
                  <BookOpen size={14} />
                  <span>Manual Cap. 15 & 16</span>
                </button>
                <InfoPanel sectionId="sec-10" />
              </div>
            </div>

            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100/50 relative overflow-hidden">
              <p className="text-gray-800 text-lg md:text-xl leading-relaxed relative z-10 max-w-5xl">
                Operar en DeFi con seguridad institucional requiere auditar las <span className="font-black text-gray-900">8 dimensiones de riesgo estructural</span>: mercado, contraparte/crédito, smart contract, despeg de stablecoin, operativo, ciberseguridad, legal/fiscal y concentración. Evalúa tu índice de higiene operativa frente a las dos mayores amenazas silenciosas: <span className="text-red-700 font-black">aprobaciones ilimitadas (infinite allowances)</span> y la <span className="text-red-700 font-black">firma ciega (blind signing)</span>.
              </p>
            </div>

            {/* Risk Matrix Evaluator */}
            <RiskMatrixEvaluator />
          </section>

          {/* GLOSARIO TÉCNICO */}
          <section id="glosario" className="pt-12 pb-4 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-700">
                  <div className="p-2 bg-red-50 rounded-xl"><BookOpen size={24} /></div>
                  <span className="text-xs font-black uppercase tracking-wider">Master Knowledge</span>
                </div>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900 leading-none">Glosario<br/><span className="text-red-700">Estructural</span></h3>
              </div>
              <div className="max-w-md">
                <p className="text-gray-600 text-base font-semibold uppercase leading-relaxed text-right border-r-4 border-red-700 pr-6">Conceptos fundamentales para comprender la infraestructura de las finanzas programables y la criptoeconomía moderna.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sortWithFavoritesFirst(GLOSSARY_TERMS, item => item.t).map((item) => (
                <div 
                  key={item.t} 
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedDetail(item.t)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDetail(item.t); } }}
                  className="text-left bg-white p-6 rounded-[1.5rem] border border-gray-200 hover:border-red-700 shadow-sm hover:shadow-xl transition-all group relative active:scale-[0.98] cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-red-700 font-black text-sm uppercase tracking-wider group-hover:italic transition-all">{item.t}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.t);
                          }}
                          className={`p-1.5 rounded-lg border transition-all active:scale-90 ${
                            isFavorite(item.t)
                              ? 'bg-red-50 text-red-700 border-red-200 shadow-xs'
                              : 'bg-gray-50 text-gray-400 hover:text-red-700 border-gray-200'
                          }`}
                          title={isFavorite(item.t) ? `Quitar ${item.t} de favoritos` : `Marcar ${item.t} como favorito`}
                          aria-label={`Favorito ${item.t}`}
                        >
                          <Star size={12} className={isFavorite(item.t) ? 'fill-red-700 text-red-700' : ''} />
                        </button>
                        <Plus size={16} className="text-gray-400 group-hover:text-red-700 group-hover:rotate-90 transition-all" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed group-hover:text-gray-900 transition-colors">{item.d}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between text-gray-400">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 group-hover:text-red-700 transition-colors">
                      Ver Ficha Técnica
                    </span>
                    <Terminal size={12} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* MODAL DE INFORMACIÓN */}
          {selectedDetail && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-100 animate-in zoom-in-95 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/5 blur-3xl rounded-full"></div>
                
                {/* Cabecera del Modal */}
                <div className="p-8 pb-4 flex items-center justify-between relative z-10 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-red-700 rounded-xl text-white shadow-lg shadow-red-700/20">
                      <Info size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">{selectedDetail}</h3>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                        {modalViewMode === 'diff' ? "Comparativa DeFi vs Mercado Fiat" : modalViewMode === 'simple' ? "Lenguaje Sencillo" : modalViewMode === 'extended' ? "Investigación Profunda" : modalViewMode === 'ai' ? "Respuesta IA Gemini" : "Análisis Técnico"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleFavorite(selectedDetail)}
                      className={`p-3 rounded-xl transition-all active:scale-90 flex items-center gap-1.5 font-bold text-xs uppercase ${
                        isFavorite(selectedDetail)
                          ? 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
                          : 'bg-gray-100 text-gray-400 hover:text-red-700'
                      }`}
                      title={isFavorite(selectedDetail) ? "Quitar de favoritos" : "Marcar como favorito"}
                    >
                      <Star size={20} className={isFavorite(selectedDetail) ? 'fill-red-700 text-red-700' : ''} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('diff')}
                      className={`p-3 rounded-xl transition-all active:scale-90 flex items-center gap-1.5 font-bold text-xs uppercase ${modalViewMode === 'diff' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Comparativa DeFi vs Mercado Fiat"
                    >
                      <ArrowRightLeft size={22} />
                      <span className="hidden sm:inline">Vs Fiat</span>
                    </button>
                    <button 
                      onClick={() => setModalViewMode('technical')}
                      className={`p-3 rounded-xl transition-all active:scale-90 ${modalViewMode === 'technical' ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:text-gray-900'}`}
                      title="Versión Técnica"
                    >
                      <Code size={24} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('extended')}
                      className={`p-3 rounded-xl transition-all active:scale-90 ${modalViewMode === 'extended' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Análisis Detallado"
                    >
                      <BookOpen size={24} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('simple')}
                      className={`p-3 rounded-xl transition-all active:scale-90 ${modalViewMode === 'simple' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Versión Neófito"
                    >
                      <Sparkles size={24} />
                    </button>
                    <button 
                      onClick={() => handleAiModalAsk(selectedDetail)}
                      disabled={isAiModalLoading}
                      className={`p-3 rounded-xl transition-all active:scale-90 ${modalViewMode === 'ai' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Consultar a la IA"
                    >
                      {isAiModalLoading ? <Loader2 size={24} className="animate-spin" /> : <Bot size={24} />}
                    </button>
                    <button 
                      onClick={() => setModalViewMode('notes')}
                      className={`p-3 rounded-xl transition-all active:scale-90 relative flex items-center gap-1.5 font-bold text-xs uppercase ${modalViewMode === 'notes' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-600 hover:text-red-700 hover:bg-red-50'}`}
                      title="Mis Notas Personales (Texto Enriquecido)"
                    >
                      <NotebookPen size={20} />
                      <span className="hidden sm:inline">Notas</span>
                      {hasConceptNote(selectedDetail) && (
                        <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
                      )}
                    </button>
                    <button 
                      onClick={() => openDirectLinks(selectedDetail)}
                      className="p-3 rounded-xl bg-gray-100 text-gray-700 hover:text-white hover:bg-red-700 transition-all active:scale-90 flex items-center gap-1.5 font-bold text-xs uppercase"
                      title="Abrir opciones y enlaces directos"
                    >
                      <Compass size={22} className="text-red-700 hover:text-white" />
                      <span className="hidden sm:inline">Links</span>
                    </button>
                    <div className="w-[1px] h-10 bg-gray-100 mx-2"></div>
                    <button onClick={() => setSelectedDetail(null)} className="p-3 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-red-700 transition-all active:scale-90" title="Cerrar (Esc)">
                      <X size={28} />
                    </button>
                  </div>
                </div>

                {/* Contenido del Modal */}
                <div className="p-8 pt-6 relative z-10 overflow-y-auto max-h-[70vh] custom-scrollbar">
                  <div className="min-h-[120px]">
                    {modalViewMode === 'diff' ? (
                      <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                          <span className="p-2.5 bg-red-100 text-red-700 rounded-xl">
                            <ArrowRightLeft size={20} />
                          </span>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-700 block">Diferenciador Sistémico</span>
                            <h4 className="text-lg md:text-xl font-black uppercase text-gray-900 tracking-tight">
                              {selectedDetail}: Mercado Fiat vs Protocolo DeFi
                            </h4>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Modelo Fiat */}
                          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Landmark size={18} className="text-gray-500" />
                              <span className="text-xs font-black uppercase tracking-wider text-gray-500">Mecanismo Fiat Tradicional</span>
                            </div>
                            <p className="text-sm md:text-base text-gray-800 leading-relaxed font-semibold">
                              {KNOWLEDGE_BASE[selectedDetail]?.defiVsFiat?.fiatTrad || 'Intermediación centralizada dependiente de bancos, cámaras de compensación, liquidación diferida en días hábiles (T+1/T+2) y supervisión discrecional.'}
                            </p>
                          </div>

                          {/* Modelo DeFi */}
                          <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm space-y-3 ring-1 ring-red-100">
                            <div className="flex items-center gap-2 text-red-700">
                              <Cpu size={18} />
                              <span className="text-xs font-black uppercase tracking-wider text-red-700">Protocolo DeFi On-Chain</span>
                            </div>
                            <p className="text-sm md:text-base text-gray-900 leading-relaxed font-bold">
                              {KNOWLEDGE_BASE[selectedDetail]?.defiVsFiat?.defiOnChain || 'Liquidación atómica inmediata (T+0) gobernada por Smart Contracts auditables, autocustodia con claves privadas y operatividad ininterrumpida 24/7/365.'}
                            </p>
                          </div>
                        </div>

                        {/* Diferencia Crítica */}
                        <div className="bg-white p-5 rounded-2xl border-l-4 border-red-700 border-gray-200 shadow-sm">
                          <span className="text-[11px] font-black uppercase text-red-700 tracking-wider block mb-1">Diferencia Estructural Crítica:</span>
                          <p className="text-sm md:text-base font-semibold text-gray-900 leading-relaxed">
                            {KNOWLEDGE_BASE[selectedDetail]?.defiVsFiat?.coreDifference || 'Sustitución de la confianza institucional opaca y riesgo de contraparte por certeza matemática criptográfica y liquidez global accesible sin permiso.'}
                          </p>
                        </div>
                      </div>
                    ) : modalViewMode === 'simple' ? (
                      <div className="bg-red-50/30 p-8 rounded-3xl border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-lg md:text-xl text-gray-900 leading-relaxed font-bold italic">
                          {KNOWLEDGE_BASE[selectedDetail]?.simple || "Traducción a lenguaje sencillo próximamente disponible."}
                        </p>
                      </div>
                    ) : modalViewMode === 'extended' ? (
                      <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                           <FileText size={60} className="text-red-700" />
                         </div>
                         <div className="flex items-center gap-2 mb-4 relative z-10">
                           <FileText size={18} className="text-red-700" />
                           <span className="text-[11px] font-black uppercase tracking-widest text-red-700">Tesis de Investigación</span>
                         </div>
                         <p className="text-base md:text-lg text-gray-900 leading-relaxed font-semibold relative z-10">
                           {KNOWLEDGE_BASE[selectedDetail]?.extended || "El análisis detallado para este término está siendo verificado por el equipo de investigación."}
                         </p>
                      </div>
                    ) : modalViewMode === 'ai' ? (
                      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2 flex flex-col">
                        {isAiModalLoading && !aiModalResponse ? (
                          <div className="flex flex-col items-center justify-center py-10 gap-3">
                             <Loader2 size={32} className="animate-spin text-red-700" />
                             <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Procesando Consulta IA...</span>
                          </div>
                        ) : (
                          <>
                            <div className="prose-sm overflow-y-auto custom-scrollbar pr-2 mb-8">
                               {formatAiResponse(aiModalResponse, true)}
                            </div>
                            
                            <div className="border-t border-gray-200 pt-8 space-y-4">
                               <div className="flex items-center gap-2 mb-1">
                                  <MessageSquare size={16} className="text-red-700" />
                                  <span className="text-[12px] font-black uppercase tracking-widest text-gray-900">¿Más preguntas?</span>
                               </div>
                               <div className="relative group">
                                  <input 
                                    type="text" 
                                    value={aiFollowUp}
                                    onChange={(e) => setAiFollowUp(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && aiFollowUp.trim() && handleAiModalAsk(selectedDetail, aiFollowUp)}
                                    placeholder="Profundiza sobre este concepto con nuestra IA..."
                                    className="w-full bg-white border border-gray-200 p-4 rounded-2xl text-[13px] font-semibold pr-12 outline-none focus:ring-2 focus:ring-red-700/10 transition-all shadow-inner"
                                  />
                                  <button 
                                    onClick={() => aiFollowUp.trim() && handleAiModalAsk(selectedDetail, aiFollowUp)}
                                    disabled={isAiModalLoading || !aiFollowUp.trim()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-900 text-white rounded-xl hover:bg-black disabled:opacity-20 transition-all"
                                  >
                                    {isAiModalLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                  </button>
                               </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : modalViewMode === 'notes' ? (
                      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2">
                        <ConceptNotesEditor conceptId={selectedDetail} conceptTitle={selectedDetail} />
                      </div>
                    ) : (
                      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-lg text-gray-900 leading-relaxed font-semibold">
                          {KNOWLEDGE_BASE[selectedDetail]?.technical || "Información técnica detallada en proceso de sincronización."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Pie del modal con atajo ESC */}
                <div className="px-8 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Manual de Ecosistema & Instrumentos</span>
                  <span className="flex items-center gap-1.5 text-red-700 font-mono">
                    <kbd className="px-2 py-0.5 bg-white border border-gray-200 rounded shadow-xs text-[10px] font-black text-gray-800">ESC</kbd> para cerrar
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MODAL DE EQUIVALENCIAS DE SISTEMA */}
          {selectedEquivalence && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-4xl overflow-hidden border border-gray-100 animate-in zoom-in-95 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/5 blur-3xl rounded-full"></div>
                
                {/* Cabecera con Selector */}
                <div className="p-8 pb-4 flex items-center justify-between relative z-10 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-gray-900 rounded-xl text-white shadow-lg">
                      <Cpu size={28} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">{selectedEquivalence.defi}</h3>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                         {modalViewMode === 'diff' ? "Comparativa TradFi vs DeFi" : modalViewMode === 'simple' ? "Análisis Neófito" : modalViewMode === 'extended' ? "Profundización" : modalViewMode === 'ai' ? "Análisis por IA" : "Análisis Técnico"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => toggleFavorite(selectedEquivalence.defi)}
                      className={`p-3 rounded-xl transition-all active:scale-90 flex items-center gap-1.5 font-bold text-xs uppercase ${
                        isFavorite(selectedEquivalence.defi)
                          ? 'bg-red-50 text-red-700 border border-red-200 shadow-sm'
                          : 'bg-gray-100 text-gray-400 hover:text-red-700'
                      }`}
                      title={isFavorite(selectedEquivalence.defi) ? "Quitar de favoritos" : "Marcar como favorito"}
                    >
                      <Star size={20} className={isFavorite(selectedEquivalence.defi) ? 'fill-red-700 text-red-700' : ''} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('diff')}
                      className={`p-3 rounded-xl transition-all active:scale-90 flex items-center gap-1.5 font-bold text-xs uppercase ${modalViewMode === 'diff' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Comparativa TradFi vs DeFi"
                    >
                      <ArrowRightLeft size={22} />
                      <span className="hidden sm:inline">Vs Fiat</span>
                    </button>
                    <button 
                      onClick={() => setModalViewMode('technical')}
                      className={`p-3 rounded-xl transition-all active:scale-90 ${modalViewMode === 'technical' ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:text-gray-900'}`}
                      title="Análisis Técnico"
                    >
                      <Terminal size={24} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('extended')}
                      className={`p-3 rounded-xl transition-all active:scale-90 ${modalViewMode === 'extended' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Profundización"
                    >
                      <BookOpen size={24} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('simple')}
                      className={`p-3 rounded-xl transition-all active:scale-90 ${modalViewMode === 'simple' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Análisis Neófito"
                    >
                      <User size={24} />
                    </button>
                    <button 
                      onClick={() => handleAiModalAsk(`${selectedEquivalence.trad} vs ${selectedEquivalence.defi}`)}
                      disabled={isAiModalLoading}
                      className={`p-3 rounded-xl transition-all active:scale-90 ${modalViewMode === 'ai' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Análisis por IA"
                    >
                      {isAiModalLoading ? <Loader2 size={24} className="animate-spin" /> : <Bot size={24} />}
                    </button>
                    <button 
                      onClick={() => setModalViewMode('notes')}
                      className={`p-3 rounded-xl transition-all active:scale-90 relative flex items-center gap-1.5 font-bold text-xs uppercase ${modalViewMode === 'notes' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-600 hover:text-red-700 hover:bg-red-50'}`}
                      title="Mis Notas Personales (Texto Enriquecido)"
                    >
                      <NotebookPen size={20} />
                      <span className="hidden sm:inline">Notas</span>
                      {hasConceptNote(selectedEquivalence.defi) && (
                        <span className="w-2 h-2 rounded-full bg-red-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
                      )}
                    </button>
                    <div className="w-[1px] h-10 bg-gray-100 mx-2"></div>
                    <button onClick={() => setSelectedEquivalence(null)} className="p-3 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-red-700 transition-all active:scale-90" title="Cerrar (Esc)">
                      <X size={28} />
                    </button>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8 pt-6 relative z-10 overflow-y-auto max-h-[70vh] custom-scrollbar">
                  <div className="min-h-[120px]">
                    {modalViewMode === 'diff' ? (
                      <div className="bg-gray-50 p-6 md:p-8 rounded-3xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2 space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                          <span className="p-2.5 bg-red-100 text-red-700 rounded-xl">
                            <ArrowRightLeft size={20} />
                          </span>
                          <div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-red-700 block">Comparativa de Paradigmas</span>
                            <h4 className="text-lg md:text-xl font-black uppercase text-gray-900 tracking-tight">
                              {selectedEquivalence.trad} ➔ {selectedEquivalence.defi}
                            </h4>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Modelo TradFi / Fiat */}
                          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-3">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Landmark size={18} className="text-gray-500" />
                              <span className="text-xs font-black uppercase tracking-wider text-gray-500">Modelo TradFi / Fiat</span>
                            </div>
                            <p className="text-sm md:text-base text-gray-800 leading-relaxed font-semibold">
                              {selectedEquivalence.fiatModel || selectedEquivalence.trad}
                            </p>
                          </div>

                          {/* Modelo DeFi */}
                          <div className="bg-white p-6 rounded-2xl border border-red-200 shadow-sm space-y-3 ring-1 ring-red-100">
                            <div className="flex items-center gap-2 text-red-700">
                              <Cpu size={18} />
                              <span className="text-xs font-black uppercase tracking-wider text-red-700">Modelo DeFi On-Chain</span>
                            </div>
                            <p className="text-sm md:text-base text-gray-900 leading-relaxed font-bold">
                              {selectedEquivalence.defiModel || selectedEquivalence.defi}
                            </p>
                          </div>
                        </div>

                        {/* Diferencia Crítica */}
                        <div className="bg-white p-5 rounded-2xl border-l-4 border-red-700 border-gray-200 shadow-sm space-y-2">
                          <span className="text-[11px] font-black uppercase text-red-700 tracking-wider block">Diferencia Crítica Estructural:</span>
                          <p className="text-sm md:text-base font-semibold text-gray-900 leading-relaxed">
                            {selectedEquivalence.coreDiff || selectedEquivalence.desc}
                          </p>
                          {selectedEquivalence.example && (
                            <div className="pt-2 border-t border-gray-100 flex items-start gap-2 text-sm text-gray-600 font-medium">
                              <span className="text-gray-400 font-bold uppercase text-[11px]">Ejemplo Práctico:</span>
                              <span>{selectedEquivalence.example}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : modalViewMode === 'simple' ? (
                      <div className="bg-red-50/30 p-8 rounded-3xl border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-lg md:text-xl text-gray-900 leading-relaxed italic font-bold">
                          {selectedEquivalence.simple}
                        </p>
                      </div>
                    ) : modalViewMode === 'extended' ? (
                      <div className="bg-white p-8 rounded-3xl border border-red-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                           <FileText size={60} className="text-red-700" />
                         </div>
                         <div className="flex items-center gap-2 mb-4 relative z-10">
                           <FileText size={18} className="text-red-700" />
                           <span className="text-[11px] font-black uppercase tracking-widest text-red-700">Análisis Estructural</span>
                         </div>
                         <p className="text-base md:text-lg text-gray-900 leading-relaxed font-semibold relative z-10 italic">
                           {selectedEquivalence.extended}
                         </p>
                      </div>
                    ) : modalViewMode === 'ai' ? (
                      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2 flex flex-col">
                        {isAiModalLoading && !aiModalResponse ? (
                          <div className="flex flex-col items-center justify-center py-10 gap-3">
                             <Loader2 size={32} className="animate-spin text-red-700" />
                             <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">Generando Análisis...</span>
                          </div>
                        ) : (
                          <>
                            <div className="prose-sm overflow-y-auto custom-scrollbar pr-2 mb-8">
                               {formatAiResponse(aiModalResponse, true)}
                            </div>
                            
                            <div className="border-t border-gray-200 pt-8 space-y-4">
                               <div className="flex items-center gap-2 mb-1">
                                  <MessageSquare size={16} className="text-red-700" />
                                  <span className="text-[12px] font-black uppercase tracking-widest text-gray-900">¿Más preguntas?</span>
                               </div>
                               <div className="relative group">
                                  <input 
                                    type="text" 
                                    value={aiFollowUp}
                                    onChange={(e) => setAiFollowUp(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && aiFollowUp.trim() && handleAiModalAsk(`${selectedEquivalence.trad} vs ${selectedEquivalence.defi}`, aiFollowUp)}
                                    placeholder="Consulta más detalles técnicos sobre esta transición..."
                                    className="w-full bg-white border border-gray-200 p-4 rounded-2xl text-[13px] font-semibold pr-12 outline-none focus:ring-2 focus:ring-red-700/10 transition-all shadow-inner"
                                  />
                                  <button 
                                    onClick={() => aiFollowUp.trim() && handleAiModalAsk(`${selectedEquivalence.trad} vs ${selectedEquivalence.defi}`, aiFollowUp)}
                                    disabled={isAiModalLoading || !aiFollowUp.trim()}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gray-900 text-white rounded-xl hover:bg-black disabled:opacity-20 transition-all"
                                  >
                                    {isAiModalLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                                  </button>
                               </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : modalViewMode === 'notes' ? (
                      <div className="bg-white p-6 md:p-8 rounded-3xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2">
                        <ConceptNotesEditor 
                          conceptId={selectedEquivalence.defi} 
                          conceptTitle={`${selectedEquivalence.trad} ➔ ${selectedEquivalence.defi}`} 
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-lg text-gray-700 leading-relaxed font-semibold italic">
                          {selectedEquivalence.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex gap-4 relative z-10">
                    <div className="flex-1 p-5 bg-gray-100 rounded-2xl text-center">
                      <span className="block text-[10px] font-black uppercase text-gray-400 mb-1">Pasado Fiat</span>
                      <span className="text-[12px] font-black uppercase text-gray-600">{selectedEquivalence.trad}</span>
                    </div>
                    <div className="flex-1 p-5 bg-red-50 rounded-2xl text-center border border-red-100">
                      <span className="block text-[10px] font-black uppercase text-red-400 mb-1">Futuro DeFi</span>
                      <span className="text-[12px] font-black uppercase text-red-700">{selectedEquivalence.defi}</span>
                    </div>
                  </div>
                </div>

                {/* Pie del modal con atajo ESC */}
                <div className="px-8 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <span>Matriz de Transición TradFi a DeFi</span>
                  <span className="flex items-center gap-1.5 text-red-700 font-mono">
                    <kbd className="px-2 py-0.5 bg-white border border-gray-200 rounded shadow-xs text-[10px] font-black text-gray-800">ESC</kbd> para cerrar
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* MODAL DE OPCIONES Y LINKS DIRECTOS */}
          <DirectLinksModal 
            isOpen={isDirectLinksOpen}
            onClose={() => setIsDirectLinksOpen(false)}
            resource={directLinksResource}
          />

          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            section { scroll-margin-top: 100px; }
            .vertical-text { writing-mode: vertical-rl; text-orientation: mixed; }
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
          `}</style>
        </Cabecera>
      </div>
    </>
  );
}
