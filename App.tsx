import React, { useState, useEffect } from 'react';
import { Security } from './Plantilla/Seguridad';
import { Shell } from './Plantilla/Shell';
import { crypto, getShortcutKey, askGemini } from './Plantilla/Parameters';
import { 
  TrendingUp, TrendingDown, Landmark, Cpu, Wallet, 
  BarChart3, ShieldCheck, Zap, ArrowRight, Layers, 
  PieChart as PieIcon, Activity, Globe, Info, ExternalLink,
  MessageSquare, ChevronDown, ChevronUp, Send, Loader2, Sparkles, HelpCircle,
  Copy, Check, X, AlertTriangle, Scale, Plus, Coins, Gem, CircleDollarSign, DollarSign, Link as LinkIcon, Share2,
  RefreshCw, Smartphone, HardDrive, Shield, Lock, Clock, Network, BookOpen, Code, Terminal, User, FileText, Bot
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, RadarChart, PolarGrid, 
  PolarAngleAxis, Radar, ComposedChart, TooltipProps, LabelList
} from 'recharts';

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
const EQUIVALENCES = [
  { 
    trad: 'Bancos Centrales', 
    defi: 'Algoritmos de Emisión',
    desc: 'Los Bancos Centrales emiten moneda mediante decisiones políticas. En DeFi, los algoritmos de emisión (como el de Bitcoin) aseguran una oferta monetaria predecible, inmutable y transparente sin intervención humana.',
    simple: 'En vez de que un grupo de personas decida cuánto dinero imprimir, lo hace un programa de ordenador que nadie puede cambiar. Es como un reloj que siempre da la hora exacta sin que nadie lo toque.',
    extended: 'El análisis de la política monetaria algorítmica revela que la eliminación del factor discrecional humano mitiga el riesgo de hiperinflación y ciclos de deuda política. Al externalizar la confianza en una curva de emisión programada (como el halving de Bitcoin), se crea una moneda con escasez absoluta demostrable on-chain, algo imposible en el sistema FIAT donde la masa monetaria M2 puede expandirse indefinidamente según las necesidades de liquidez del Estado.'
  },
  { 
    trad: 'Bancos Comerciales', 
    defi: 'Protocolos de Lending',
    desc: 'Mientras los bancos comerciales operan con reserva fraccionaria, los protocolos de lending como Aave permiten el préstamo directo entre usuarios garantizado íntegramente por colateral digital bloqueado en código.',
    simple: 'Es como un banco que funciona solo. Tú pones tus ahorros y otros piden prestado de ahí automáticamente. Lo mejor es que el sistema siempre guarda una garantía real por si el que pidió el dinero no puede devolverlo.',
    extended: 'Los mercados de dinero descentralizados (DeFi Lending) sustituyen el análisis de solvencia subjetivo por la liquidación automática basada en ratios de colateralización (LTV). Mientras que un banco comercial crea dinero bancario mediante el crédito (multiplicador monetario), los protocolos DeFi son sistemas de reserva íntegra o sobre-colateralizados, donde el riesgo de insolvencia sistémica se gestiona mediante bots de liquidación que operan 24/7, garantizando la solvencia del pool sin necesidad de rescates estatales.'
  },
  { 
    trad: 'Libreta de Ahorro', 
    defi: 'Wallets',
    desc: 'La libreta tradicional es un registro de lo que el banco te debe. Una Wallet DeFi es tu propia bóveda donde custodias directamente tus activos mediante claves criptográficas; tú eres tu propio banco.',
    simple: 'Tu dinero ya no está "en el banco", sino que lo tienes tú mismo en una aplicación que solo tú controlas. Es como tener tu propia caja fuerte en el bolsillo, pero digital.',
    extended: 'La evolución de la custodia transita desde un modelo de deuda (el banco me debe mi dinero) hacia un modelo de posesión técnica directa. Una wallet no "contiene" el dinero, sino que gestiona las llaves privadas necesarias para firmar transacciones en el libro mayor distribuido. Este cambio de paradigma elimina el riesgo de contraparte (bail-ins) y el corralito financiero, pero traslada toda la responsabilidad de la seguridad al usuario final (Self-Custody), haciendo que el concepto de "Soberanía Financiera" sea tanto un privilegio como un desafío técnico.'
  },
  { 
    trad: 'Casas de Cambio', 
    defi: 'Liquidity Pools',
    desc: 'Las casas de cambio actúan como intermediarios centralizados. Los Liquidity Pools permiten el intercambio automático (DEX) mediante contratos inteligentes donde el mercado se equilibra matemáticamente.',
    simple: 'Es un montón de monedas digitales donde puedes cambiar unas por otras al instante. No hay un dueño cobrándote comisiones altas; el precio se ajusta solo según cuántas monedas queden en el montón.',
    extended: 'Los Automated Market Makers (AMM) utilizan la constante matemática x*y=k para determinar el precio relativo entre dos activos sin necesidad de un libro de órdenes centralizado. Los proveedores de liquidez depositan activos en estos pools a cambio de comisiones por transacciones. Esta arquitectura permite una liquidez profunda y constante incluso para activos con poco volumen, eliminando la figura del Market Maker institucional y democratizando los beneficios del arbitraje y la provisión de liquidez entre todos los participantes de la red.'
  },
];

const CRYPTO_ASSETS = [
  { name: 'Bitcoin (BTC)', icon: <Coins />, url: 'https://bitcoin.org' },
  { name: 'Ethereum (ETH)', icon: <Gem />, url: 'https://ethereum.org' },
  { name: 'Solana (SOL)', icon: <Zap />, url: 'https://solana.com' },
  { name: 'Cardano (ADA)', icon: <ShieldCheck />, url: 'https://cardano.org' },
  { name: 'XRP (XRP)', icon: <Globe />, url: 'https://ripple.com/xrp/' },
  { name: 'Polkadot (DOT)', icon: <Share2 />, url: 'https://polkadot.network' },
];

const STABLECOINS = [
  { name: 'Tether (USDT)', icon: <DollarSign />, url: 'https://tether.to' },
  { name: 'USD Coin (USDC)', icon: <CircleDollarSign />, url: 'https://www.circle.com/en/usdc' },
  { name: 'DAI (DAI)', icon: <Layers />, url: 'https://makerdao.com' },
  { name: 'PayPal USD (PYUSD)', icon: <Wallet />, url: 'https://www.paypal.com/us/digital-wallet/manage-money/crypto/pyusd' },
];

const HOT_WALLETS = [
  { name: 'MetaMask', icon: <Smartphone />, url: 'https://metamask.io' },
  { name: 'Trust Wallet', icon: <Smartphone />, url: 'https://trustwallet.com' },
  { name: 'Phantom', icon: <Smartphone />, url: 'https://phantom.app' },
];

const COLD_WALLETS = [
  { name: 'Ledger', icon: <HardDrive />, url: 'https://www.ledger.com' },
  { name: 'Trezor', icon: <HardDrive />, url: 'https://trezor.io' },
  { name: 'BitBox', icon: <HardDrive />, url: 'https://shiftcrypto.ch' },
];

const DEFI_PLATFORMS = [
  { name: 'Uniswap', icon: <RefreshCw />, url: 'https://uniswap.org' },
  { name: 'Aave', icon: <TrendingUp />, url: 'https://aave.com' },
  { name: 'Lido', icon: <Activity />, url: 'https://lido.fi' },
  { name: 'MakerDAO', icon: <Landmark />, url: 'https://makerdao.com' },
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
  { t: 'Governance', d: 'Sistema de votación para cambios en protocolos.' }
];

interface InfoVersion {
  technical: string;
  simple: string;
  extended: string;
}

const KNOWLEDGE_BASE: Record<string, InfoVersion> = {
  // Mercados
  'Acciones': {
    technical: 'Las acciones representan una fracción del capital social de una empresa. Al adquirir una acción, el inversor se convierte en socio y adquiere derechos económicos (dividendos) y políticos (voto). Es un activo de renta variable, lo que significa que su rentabilidad no está garantizada.',
    simple: 'Es como comprar un trocito de un pastel (la empresa). Si a la empresa le va bien y el pastel se hace más grande, tu trocito vale más dinero. Si se hace pequeño, pierdes dinero.',
    extended: 'El análisis estructural de las acciones revela que son el principal motor de acumulación de riqueza a largo plazo en el sistema capitalista. Al poseer acciones, el inversor participa de la plusvalía generada por la empresa. En el contexto de la transición hacia lo digital, estamos viendo la aparición de las "Security Tokens", que son acciones representadas en blockchain, permitiendo fraccionamiento masivo, trading 24/7 y distribución automática de dividendos mediante contratos inteligentes, eliminando la necesidad de registradores centrales y depositarios de valores.'
  },
  'Bonos': {
    technical: 'Títulos de deuda emitidos por Estados o empresas para financiarse. El emisor se compromete a devolver el capital en una fecha pactada y a pagar intereses periódicos (cupón). Se consideran renta fija porque el flujo de caja es predecible.',
    simple: 'Es como si tú le prestaras dinero a un país o a una empresa grande. Ellos te prometen que te lo devolverán en el futuro y, mientras tanto, te pagan una pequeña propina cada mes por el favor.',
    extended: 'Los mercados de renta fija son mucho más grandes que los de renta variable, ya que representan la base del crédito mundial. La valoración de un bono es inversamente proporcional a los tipos de interés: cuando el banco central sube tipos, el valor de los bonos antiguos en el mercado secundario cae. En DeFi, este concepto se replica mediante los "Zero-coupon bonds" on-chain o tokens de rendimiento fijo (yield stripping), permitiendo a los usuarios asegurar una tasa de retorno predecible sobre su capital digital, algo fundamental para la planificación financiera institucional dentro del ecosistema cripto.'
  },
  'Futuros': {
    technical: 'Contratos que obligan a las partes a comprar o vender un activo en una fecha futura específica a un precio acordado hoy. Se utilizan para cobertura de riesgos (hedging) o especulación pura con alto apalancamiento.',
    simple: 'Es un trato para comprar algo mañana al precio de hoy. Sirve para asegurar que no te suban el precio de repente, o para intentar adivinar si algo va a subir o bajar mucho.',
    extended: 'Los mercados de futuros son esenciales para la fijación de precios en materias primas y divisas. Permiten a los productores (como agricultores) protegerse de caídas de precios vendiendo su cosecha antes de producirla. En cripto, los "Perpetual Swaps" han revolucionado esta dinámica al eliminar la fecha de vencimiento del contrato. Esto permite mantener posiciones apalancadas indefinidamente mediante un sistema de "funding rates" que alinea el precio del contrato con el precio de mercado (spot), creando el instrumento financiero más líquido del ecosistema digital actual.'
  },
  'Opciones': {
    technical: 'Contratos que otorgan el derecho (pero no la obligación) de comprar o vender un activo a un precio determinado antes de una fecha concreta. Requieren el pago de una prima.',
    simple: 'Es como pagar un ticket para tener el derecho a decidir más tarde si quieres comprar algo o no. Si el precio te conviene, lo usas; si no, simplemente pierdes lo que te costó el ticket.',
    extended: 'Las opciones son herramientas avanzadas de gestión de convexidad. Permiten construir perfiles de riesgo-recompensa asimétricos, donde la pérdida máxima está limitada a la prima pagada, pero el beneficio potencial es ilimitado. En DeFi, protocolos como Lyra u Opyn permiten la creación de mercados de opciones sin permiso (permissionless), donde cualquier usuario puede proveer liquidez y ganar primas, democratizando una actividad que en las finanzas tradicionales estaba reservada exclusivamente a las mesas de trading de los grandes bancos de inversión.'
  },
  
  // Instrumentos DeFi
  'Stablecoins': {
    technical: 'Tokens diseñados para mantener un valor estable vinculando su precio a un activo externo, generalmente el dólar estadounidense. Mitigan la volatilidad y permitir operativa financiera con unidades de cuenta predecibles.',
    simple: 'Son monedas digitales que siempre valen 1 dólar. Son geniales para guardar tus ahorros sin miedo a que el precio suba y baje como loco cada cinco minutos.',
    extended: 'Existen tres tipos principales de arquitecturas para stablecoins: 1) Centralizadas (USDT, USDC) respaldadas por depósitos bancarios reales; 2) Cripto-colateralizadas (DAI) que usan activos como ETH para garantizar su valor mediante deuda; y 3) Algorítmicas que usan incentivos de mercado para mantener la paridad. Las stablecoins son el "puente de liquidez" definitivo; sin ellas, la operativa DeFi sería impracticable debido a la volatilidad inherente de los activos nativos. Son la unidad de cuenta fundamental sobre la cual se calculan los rendimientos (APY) y se liquidan los préstamos en el ecosistema.'
  },
  'DEX': {
    technical: 'Exchange Descentralizado. Permite el intercambio directo de criptoactivos (P2P) sin intermediarios centrales. Utilizan Pools de Liquidez y algoritmos AMM (Automated Market Maker) para determinar precios.',
    simple: 'Es un mercado de intercambio que funciona solo, sin jefes ni cajeros. Puedes cambiar tus monedas por otras al instante y de forma segura gracias a las matemáticas.',
    extended: 'La gran innovación de los DEX frente a los exchanges centralizados (CEX) es la custodia propia y la resistencia a la censura. Mientras que un CEX puede congelar fondos o manipular el libro de órdenes, un DEX es un protocolo neutral ejecutado por código. Los usuarios interactúan directamente con un Smart Contract. El desafío actual es la eficiencia de capital (concentración de liquidez) y la mitigación del MEV (Maximum Extractable Value), donde bots especializados pueden anticiparse a las transacciones de los usuarios para capturar beneficios de arbitraje, un campo de investigación activa en la criptoeconomía.'
  },
  'Staking': {
    technical: 'Proceso de bloquear criptoactivos para apoyar la seguridad y operatividad de una red blockchain (Proof of Stake). A cambio, el usuario recibe recompensas en forma de nuevos tokens.',
    simple: 'Es como poner tus monedas en un depósito a plazo fijo para ayudar a que la red funcione bien. Por "ayudar", la red te regala monedas extra como si fueran intereses.',
    extended: 'El Staking representa el "coste de capital" nativo de una blockchain. Al bloquear activos, el usuario asume el riesgo de "slashing" (penalización por mala conducta del nodo) a cambio de participar en el consenso y recibir recompensas por inflación y comisiones de red. El surgimiento del "Liquid Staking" (LSD) permite a los usuarios hacer staking y obtener un derivado líquido (como stETH) que puede ser usado en otras aplicaciones DeFi, maximizando la eficiencia del capital bloqueado pero introduciendo nuevos riesgos de centralización y seguridad de capas.'
  },
  'Yield Farming': {
    technical: 'Estrategia para maximizar rendimientos moviendo capital entre diferentes protocolos DeFi, buscando los incentivos más altos por proveer liquidez o realizar préstamos.',
    simple: 'Es como ir moviendo tus ahorros de un banco a otro buscando siempre el que te dé más regalos o mejores intereses cada semana.',
    extended: 'El Yield Farming es el proceso de optimización de recompensas más dinámico de DeFi. Los protocolos emiten sus propios tokens de gobernanza para atraer liquidez rápida (Vampire Attacks). El "agricultor" deposita activos en pools para capturar estos incentivos. Aunque puede generar retornos astronómicos, implica riesgos elevados de seguridad en contratos inteligentes, desvinculación de tokens y pérdida de capital por devaluación del token de incentivo. Es la máxima expresión del mercado de capitales sin fricción, donde el dinero fluye instantáneamente hacia donde es más productivo.'
  },
  'Sintéticos': {
    technical: 'Activos digitales que replican el valor de activos del mundo real (oro, petróleo, acciones) mediante oráculos y contratos inteligentes, permitiendo exposición sin salir de la blockchain.',
    simple: 'Son "monedas espejo". Puedes tener algo que vale exactamente lo mismo que el oro o una acción de Apple, pero dentro del mundo cripto, sin tener que ir a un banco tradicional.',
    extended: 'Los activos sintéticos (Synths) expanden el alcance de DeFi hacia la economía real. Mediante el uso de oráculos de alta fidelidad (como Chainlink), un contrato inteligente puede rastrear el precio de Tesla o del Brent. Esto permite a usuarios en países con restricciones financieras acceder a mercados internacionales. La arquitectura requiere que los emisores de sintéticos estén fuertemente colateralizados (a menudo hasta el 400%) para absorber la volatilidad de los activos subyacentes, creando un sistema robusto de exposición sintética global.'
  },
  'Seguros': {
    technical: 'Protocolos que ofrecen protección contra riesgos específicos como fallos en el código de un contrato inteligente, hackeos de pools o desvinculación (depeg) de stablecoins.',
    simple: 'Funciona como el seguro de un coche: pagas un poco para estar tranquilo. Si algo sale mal en el código de una aplicación y pierdes dinero, el seguro te lo devuelve.',
    extended: 'El mercado de seguros DeFi (Decentralized Insurance) utiliza pools de capital compartidos donde los "underwriters" (aseguradores) asumen el riesgo a cambio de una parte de la prima. La resolución de siniestros a menudo se realiza mediante jurados descentralizados u oráculos de auditoría. A medida que DeFi busca atraer capital institucional, estos protocolos son críticos para mitigar el riesgo tecnológico. El resto es escalar la liquidez para cubrir hackeos masivos, lo que está llevando a la creación de derivados de riesgo catastrófico (CAT bonds) on-chain.'
  },
  
  // Wallets
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
    extended: 'BitBox02 conbina lo mejor de ambos mundos: un microcontrolador de código abierto para el procesamiento de transacciones y un chip de seguridad dedicado para el almacenamiento de claves. Su diseño minimalista evita botones complejos, usando gestos táctiles en los bordes. Ofrece una versión exclusiva para Bitcoin que reduce drásticamente la superficie de ataque al eliminar código innecesario de otras redes. Es el dispositivo ideal para usuarios que buscan seguridad profesional con una curva de aprendizaje mínima.'
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
    extended: 'Cardano utiliza el modelo eUTXO (Extended Unspent Transaction Output), una evolución del modelo de Bitcoin que permite contratos inteligentes de forma determinista y escalable. Su proceso de desarrollo se basa en la revisión por pares académica y métodos formales de verificación de código, priorizando la seguridad y la estabilidad sobre la velocidad de lanzamiento. Con su tesorería descentralizada y sistema de gobernanza líquida, Cardano busca ser un sistema operativo social y financiero autosostenible para naciones en desarrollo y grandes corporaciones.'
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
    extended: 'USDT es el activo más líquido de todo el mercado cripto, a menudo con un volumen de trading diario superior al de Bitcoin. A pesar de las controversias históricas sobre sus auditorías, ha demostrado una resiliencia extrema durante múltiples crisis de mercado. Su papel como "moneda de reserva del trading" es indiscutible. Sin embargo, su naturaleza centralizada implica riesgo de censura, ya que Tether puede congelar direcciones de wallets por requerimientos legales, lo que la sitúa en el extremo opuesto de la neutralidad de activos como Bitcoin.'
  },
  'USD Coin (USDC)': {
    technical: 'Stablecoin emitida por Centre (Circle & Coinbase). Se caracteriza por su enfoque en el cumplimiento regulatorio y transparencia auditada mensualmente.',
    simple: 'Es como el dólar digital oficial y bien portado. Siempre pasan auditorías para demostrar que tienen el dinero real bien guardado en el banco.',
    extended: 'USDC se posiciona como la opción "institucional" de las stablecoins. Sus reservas consisten principalmente en efectivo en bancos estadounidenses protegidos por el FDIC y bonos del Tesoro de EE.UU. a corto plazo gestionados por BlackRock. Esta transparencia la hace preferible para protocolos DeFi que buscan bajo riesgo de colateral y para empresas que operan en jurisdicciones reguladas. Su integración nativa en múltiples blockchains y su protocolo CCTP para transferencias entre cadenas sin puentes la convierten en una pieza clave de la infraestructura financiera global.'
  },
  'DAI (DAI)': {
    technical: 'Stablecoin descentralizada emitida por MakerDAO. Mantiene su paridad mediante el sobre-colateral de otros criptoactivos bloqueados en contratos inteligentes.',
    simple: 'Es un dólar digital que no pertenece a ninguna empresa. Se crea automáticamente usando otras criptomonedas como garantía. Es el dólar de la libertad.',
    extended: 'DAI es el experimento de moneda estable más exitoso de la historia de DeFi. No existe por un depósito en un banco, sino por un préstamo garantizado. Los usuarios depositan colateral (como ETH) en "Vaults" y emiten DAI contra ese valor. Si el colateral cae de precio, el sistema liquida la posición para asegurar que cada DAI en circulación esté respaldado por más de 1 dólar de valor. Es una moneda gobernada por una DAO (Maker), lo que la hace el activo estable más resistente a la censura y la manipulación centralizada disponible actualmente.'
  },
  'PayPal USD (PYUSD)': {
    technical: 'La incursión de PayPal en cripto. Respaldada por depósitos en dólares y bonos del Tesoro, integrada en su red global de pagos.',
    simple: 'Es el dólar digital de PayPal. Sirve para que puedas usar criptomonedas dentro de tu cuenta de PayPal de toda la vida.',
    extended: 'PYUSD representa la convergencia final entre la Fintech tradicional y la Blockchain. Emitida por Paxos para PayPal, cumple con los más altos estándares regulatorios de Nueva York. Su gran ventaja competitiva es la red de distribución: millones de comercios y usuarios de PayPal pueden ahora interactuar con un activo blockchain sin fricción. Para DeFi, PYUSD es una fuente de liquidez masiva que conecta el capital de consumo masivo con los protocolos de rendimiento descentralizados.'
  },

  // Plataformas DeFi
  'Uniswap': {
    technical: 'El protocolo de intercambio (DEX) más grande. Introdujo el estándar de pools de liquidez y es una pieza fundamental de la infraestructura descentralizada.',
    simple: 'Es la casa de cambio más grande de internet. Entras con una moneda, sales con otra, y todo ocurre sin que ninguna persona tenga que intervenir.',
    extended: 'Uniswap V3 introdujo la "Liquidez Concentrada", permitiendo a los proveedores de liquidez elegir rangos de precio específicos para sus activos. Esto multiplicó la eficiencia de capital, permitiendo que un DEX compita en spreads con los exchanges centralizados más grandes. Al ser un protocolo inmutable (nadie puede cambiar el código una vez desplegado), Uniswap es una infraestructura pública digital pura, un "bien común" que facilita el intercambio global de valor sin necesidad de permiso ni intermediarios.'
  },
  'Aave': {
    technical: 'Protocolo de mercado monetario descentralizado donde los usuarios pueden prestar o pedir prestado activos con tipos de interés dinámicos.',
    simple: 'Es el "banco del futuro". Puedes dejar tus ahorros para que otros los usen y te paguen intereses, o pedir prestado dinero tú mismo si dejas una garantía.',
    extended: 'Aave gestiona miles de millones de dólares en activos mediante un sistema de pools de liquidez compartidos. Su innovación más famosa son los "Flash Loans" (préstamos instantáneos), que permiten pedir prestadas sumas masivas sin colateral siempre que se devuelvan en la misma transacción atómica de la blockchain. Esto ha permitido una eficiencia de arbitraje y refinanciación de deuda sin precedentes, eliminando las barreras de capital para los desarrolladores y traders sofisticados en el ecosistema DeFi.'
  },
  'Lido': {
    technical: 'Plataforma líder en "Liquid Staking". Permite hacer staking y recibir un activo líquido equivalente para seguir usándolo en DeFi mientras ganas recompensas.',
    simple: 'Te permite ganar intereses por tus ahorros pero sin tener que "bloquearlos". Es como tener tu dinero en el banco ganando intereses y poder gastarlo a la vez.',
    extended: 'Lido soluciona el dilema del staking: ¿seguridad de red o liquidez? Al emitir stETH (staked ETH), Lido permite que el capital que asegura la red de Ethereum siga siendo productivo en pools de liquidez o como colateral en préstamos. Al ser una DAO que delega el stake en múltiples validadores profesionales, Lido reduce el riesgo de centralización de nodos individuales, aunque su enorme cuota de mercado en Ethereum es un tema de debate recurrente sobre la descentralización a largo plazo de la red.'
  },
  'MakerDAO': {
    technical: 'Organización Autónoma Descentralizada que gestiona el sistema DAI. Actúa como un banco central algorítmico sin intervención humana directa.',
    simple: 'Es la organización que fabrica los dólares digitales DAI. Funciona por votación de los usuarios y algoritmos, no por decisiones de políticos.',
    extended: 'MakerDAO es el "Banco Central de DeFi". Gestiona la política de tipos de interés (DSR - DAI Savings Rate) y los parámetros de colateral mediante votaciones de los poseedores del token MKR. Recientemente ha iniciado "Endgame", un plan de reestructuración masivo para diversificar sus reservas en activos del mundo real (RWA) como deuda pública y bonos corporativos, buscando que DAI sea una moneda estable respaldada por una combinación de activos digitales y tradicionales, blindando el protocolo contra riesgos sistémicos del mundo cripto.'
  },

  // Glosario
  'Liquidación': {
    technical: 'Proceso automático ejecutado por un Smart Contract cuando el colateral cae por debajo de un umbral de seguridad, vendiendo los activos para cubrir la deuda.',
    simple: 'Si pides un préstamo y la garantía que dejaste baja mucho de precio, el sistema la vende automáticamente para recuperar el dinero. Es como si el banco vendiera tu casa si no pagas la hipoteca.',
    extended: 'La liquidación es el mecanismo de defensa inmunológica de DeFi. Garantiza que el sistema nunca sea insolvente. Los liquidadores son agentes externos (bots) que compiten por comprar el colateral con descuento cuando una posición se vuelve arriesgada. Este incentivo económico asegura que, incluso en caídas de mercado del 50% en minutos, los protocolos como Aave o MakerDAO sigan teniendo más colateral que deuda, manteniendo la integridad de todo el ecosistema financiero descentralizado.'
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
    simple: 'Es una forma de saber cuánto dinero hay guardado en una aplicación. Cuanto más alto sea el TVL, más gente confía su dinero en ese sistema.',
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
    extended: 'Las blockchains son sistemas cerrados por diseño para garantizar el determinismo. Los oráculos (como Chainlink) rompen este aislamiento inyectando datos externos (precios de activos, resultados deportivos, clima). El desafío es el "problema del oráculo": si el dato que entra es falso, el contrato inteligente ejecutará una acción incorrecta de forma inmutable. Por ello, se usan redes de oráculos descentzializados que agregan datos de múltiples fuentes y penalizan a los informadores deshonestos, garantizando que el disparador de los contratos DeFi sea siempre la verdad del mercado.'
  },
  'Gas': {
    technical: 'Unidad de medida del esfuerzo computacional necesario para ejecutar una operación en redes como Ethereum, pagada en la criptomoneda nativa.',
    simple: 'Es la "comisión" que pagas por usar la red. Cada vez que haces un movimiento, tienes que pagar un poquito para que los ordenadores del mundo procesen tu petición.',
    extended: 'El mercado de gas es un sistema de subasta por espacio en bloque. Cuando la red está saturada, el precio del gas sube, expulsando a las transacciones de bajo valor. Esto ha llevado a la implementación del EIP-1559 en Ethereum, que quema una parte del gas base, volviendo al ETH potencialmente deflacionario. El análisis del gas es un indicador de la salud y adopción de la red; un gas alto indica una demanda masiva por el espacio de computación más seguro y descentralizado del mundo.'
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
  }
};

const SECTION_FAQS = {
  'sec-01': ['¿Qué es el dinero fiat?', '¿Cómo funciona el multiplicador monetario?', '¿Por qué la inflación se considera un impuesto silencioso?', '¿Qué diferencia hay entre M0, M1, M2 y M3?'],
  'sec-02': ['¿Qué diferencia hay entre renta fija y variable?', '¿Cómo funcionan los contratos de futuros?', '¿Qué es el apalancamiento financiero?', '¿Cuál es la relación riesgo/beneficio en la bolsa?'],
  'sec-03': ['¿Qué es un Smart Contract?', '¿Cómo funciona la reserva fraccionaria vs sobre-colateral?', '¿Qué significa que DeFi es inmutable?', '¿Qué son los oráculos en blockchain?'],
  'sec-04': ['¿Qué es una Stablecoin?', '¿Cómo funciona un Exchange Descentralizado (DEX)?', '¿Qué es el Liquidity Mining?', '¿Cómo se mitiga el Impermanent Loss?'],
  'sec-05': ['¿Por qué Bitcoin es el "oro digital"?', '¿Cuál es la utilidad de Ethereum?', '¿Qué es el Proof of Stake (PoS)?', '¿Para qué sirven los tokens de gobernanza?'],
  'sec-06': ['¿Qué es la finalidad transaccional?', '¿Por qué DeFi está disponible 24/7?', '¿Cómo se auditan los protocolos on-chain?', '¿Cuál es la diferencia de costes entre SWIFT y DeFi?']
};

// --- COMPONENTES AUXILIARES ---

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-2xl backdrop-blur-md bg-white/95 animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-50 pb-1">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }}></div>
                <span className="text-[11px] font-bold text-gray-900 uppercase">{entry.name}:</span>
              </div>
              <span className="text-[11px] font-black text-red-700 font-mono">
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
  const headerColorClass = isLightBg ? "text-red-800" : "text-red-700";
  
  return (
    <div className={`space-y-3 font-sans antialiased text-[12px] leading-relaxed ${textColorClass}`}>
      {lines.map((line, idx) => {
        let content = line.trim();
        if (content.startsWith('###')) {
          return <h5 key={idx} className={`text-[10px] font-black uppercase tracking-widest ${headerColorClass} mt-4 border-b border-black/5 pb-1`}>{content.replace(/###/g, '').trim()}</h5>;
        }
        if (content.startsWith('*') || content.startsWith('-')) {
          return (
            <div key={idx} className="flex gap-2 pl-2">
              <span className="text-red-700 font-black">›</span>
              <span className="font-medium">{content.substring(1).trim().replace(/\*\*/g, '')}</span>
            </div>
          );
        }
        const cleanLine = content.replace(/\*\*(.*?)\*\*/g, '$1');
        return <p key={idx} className="font-medium">{cleanLine}</p>;
      })}
    </div>
  );
};

interface InfoPanelProps {
  sectionId: keyof typeof SECTION_FAQS;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ sectionId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const faqs = SECTION_FAQS[sectionId];

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
      setAnswer("Error al conectar con el motor IA. Verifica la configuración del sistema.");
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

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all active:scale-95 group ${
          isOpen ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-400 border-gray-100 hover:border-red-700 hover:text-red-700'
        }`}
      >
        <MessageSquare size={16} className={isOpen ? 'text-red-500' : 'group-hover:rotate-12 transition-transform'} />
        <span className="text-[10px] font-black uppercase tracking-widest">Saber Más</span>
        {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-full md:w-[450px] bg-white border border-gray-100 rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] z-40 overflow-hidden animate-in slide-in-from-top-4 duration-500 flex flex-col">
          <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
             <div className="p-2 bg-red-700 rounded-xl text-white shadow-lg shadow-red-700/20">
               <HelpCircle size={18} />
             </div>
             <div>
               <h4 className="text-[11px] font-black uppercase tracking-tighter text-gray-900 leading-none">Consultoría Inteligente</h4>
               <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1">Soporte IA en Tiempo Real</p>
             </div>
          </div>
          <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto custom-scrollbar">
            <div className="space-y-3">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Preguntas Frecuentes</p>
              <div className="flex flex-col gap-2">
                {faqs.map((faq, i) => (
                  <button key={i} onClick={() => { setQuery(faq); handleAsk(faq); }} className="text-left p-3 rounded-2xl bg-white border border-gray-100 text-[10px] font-bold text-gray-700 hover:border-red-700 hover:text-red-700 transition-all group">
                    <div className="flex items-center justify-between">
                      <span className="max-w-[90%]">{faq}</span>
                      <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-1">Consulta Personalizada</p>
              <div className="relative">
                <textarea value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Escribe tu duda técnica..." className="w-full bg-gray-50 border border-gray-200 p-4 rounded-3xl text-[11px] font-medium min-h-[80px] outline-none focus:ring-2 focus:ring-gray-900 transition-all resize-none shadow-inner" />
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
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-gray-400">Análisis del Motor</span>
                   </div>
                   {!isLoading && answer && (
                     <button onClick={copyAnswer} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all active:scale-90 flex items-center gap-1.5" title="Copiar respuesta">
                       {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                       <span className="text-[8px] font-black uppercase tracking-widest">{copied ? 'Copiado' : 'Copiar'}</span>
                     </button>
                   )}
                </div>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-6 gap-3 text-[11px] text-gray-500 uppercase font-black tracking-widest">
                    <Loader2 size={24} className="animate-spin text-red-700" /> 
                    <span>Sincronizando Conocimiento...</span>
                  </div>
                ) : (
                  <div className="relative z-10">{formatAiResponse(answer)}</div>
                )}
              </div>
            )}
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-center"><p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">IA Engine: Gemini v3 Flash</p></div>
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

  const [selectedDetail, setSelectedDetail] = useState<string | null>(null);
  const [selectedEquivalence, setSelectedEquivalence] = useState<typeof EQUIVALENCES[0] | null>(null);
  
  // Nueva gestión de modos de vista: 'technical' | 'simple' | 'extended' | 'ai'
  const [modalViewMode, setModalViewMode] = useState<'technical' | 'simple' | 'extended' | 'ai'>('technical');
  const [aiModalResponse, setAiModalResponse] = useState<string>('');
  const [isAiModalLoading, setIsAiModalLoading] = useState(false);
  const [aiFollowUp, setAiFollowUp] = useState('');

  const handleLoginSuccess = () => {
    setIsAuth(true);
    localStorage.setItem('app_is_auth_v2', 'true');
  };

  const handleAiModalAsk = async (topic: string, query?: string) => {
    setModalViewMode('ai');
    if (!query && aiModalResponse && !isAiModalLoading) return;
    
    setIsAiModalLoading(true);
    if (query) {
      setAiModalResponse(prev => prev + `\n\n### Pregunta Adicional: ${query}\n`);
    } else {
      setAiModalResponse('');
    }

    try {
      const basePrompt = `Actúa como un profesor emérito de finanzas y criptoeconomía. Genera una Masterclass breve pero de altísimo nivel técnico sobre: "${topic}". Explica su relevancia en la transición del sistema Fiat hacia DeFi.`;
      const prompt = query ? `Sobre el tema "${topic}", responde a la siguiente duda técnica de seguimiento: "${query}". Mantén el tono de Masterclass técnica.` : basePrompt;
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
        <Shell>
          
          <section className="py-10 bg-white rounded-[2rem] px-8 md:px-12 mb-16 border border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 translate-x-1/2 pointer-events-none transition-transform group-hover:translate-x-[45%] duration-700"></div>
            <div className="relative z-10 max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 mb-3">
                  <span className="h-[2px] w-6 bg-red-700"></span>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-400">Master Thesis</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 leading-[0.85]">Economía <span className="text-red-700">Fiat ➜ DeFi</span></h2>
                <div className="mt-4 flex justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-1.5 text-[8px] font-black uppercase text-gray-400"><span className="w-1 h-1 rounded-full bg-red-700 animate-pulse"></span> dinero cautivo en bancos</div>
                  <div className="flex items-center gap-1.5 text-[8px] font-black uppercase text-gray-400"><span className="w-1 h-1 rounded-full bg-gray-900"></span> Protocolos On-Chain</div>
                </div>
              </div>
              <div className="md:w-1/3 border-l-4 border-gray-900 pl-6 py-1"><p className="text-gray-500 text-[11px] md:text-xs uppercase tracking-tight font-bold leading-relaxed italic max-w-xs">Evolución de los sistemas de dinero cautivo en bancos hacia la infraestructura de protocolos descentralizados.</p></div>
            </div>
            <a href="https://notebooklm.google.com/notebook/45496add-d540-4b9d-8075-0becfdb16126" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-8 text-[9px] font-black uppercase tracking-widest text-red-700 hover:text-gray-900 flex items-center gap-1.5 transition-all group/link bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-transparent hover:border-gray-200">Para saber más <ExternalLink size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" /></a>
          </section>

          {/* 01. FIAT */}
          <section id="sec-01" className="mb-40 space-y-12">
            <div className="border-b-4 border-gray-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><Landmark className="text-red-700" size={32} />01. El Ecosistema Fiat</h3><p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Confianza Institucional y Expansión de Deuda</p></div>
              <InfoPanel sectionId="sec-01" />
            </div>
            <div className="bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100/50 relative overflow-hidden group"><div className="absolute top-0 right-0 w-32 h-32 bg-red-700/5 blur-3xl rounded-full"></div><p className="text-gray-700 text-base md:text-lg leading-relaxed relative z-10 max-w-5xl">El sistema Fiat se sustenta en el <span className="font-black text-gray-900">curso legal</span> y la confianza institucional. Bajo el modelo de <span className="text-red-700 font-black">dinero cautivo en bancos</span>, las entidades financieras crean moneda digital mediante el crédito, multiplicando la base monetaria real.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 flex flex-col"><h4 className="text-[10px] font-black uppercase tracking-widest mb-8 text-gray-400 border-l-2 border-red-700 pl-3">Multiplicador Monetario (M0-M3)</h4><div className="h-64 flex-1"><ResponsiveContainer width="100%" height="100%"><BarChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }} data={multiplierData}><defs><linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#b91c1c" stopOpacity={1} /><stop offset="100%" stopColor="#7f1d1d" stopOpacity={1} /></linearGradient></defs><CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f3f4f6" /><XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontWeight: 900 }} /><YAxis hide /><Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb', radius: 12 }} /><Bar dataKey="value" fill="url(#barGradient)" radius={[12, 12, 4, 4]} barSize={40} animationDuration={1500} /></BarChart></ResponsiveContainer></div></div>
              <div className="bg-red-700 text-white p-12 rounded-[3.5rem] shadow-2xl shadow-red-700/30 relative overflow-hidden group flex flex-col justify-between"><div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div><div className="relative z-10"><div className="flex items-center gap-3 mb-4"><TrendingDown size={32} className="text-red-200 group-hover:scale-110 transition-transform" /><h4 className="text-3xl font-black uppercase italic tracking-tighter leading-none">El Impuesto Silencioso</h4></div><p className="text-red-100 text-[13px] font-bold uppercase tracking-tight leading-tight mb-6">La inflación disuelve el <span className="text-white font-black underline decoration-white/30 decoration-4">poder adquisitivo real</span> del ahorro nominal.</p></div><div className="h-48 bg-white/5 backdrop-blur-sm rounded-[2rem] p-6 relative z-10 border border-white/10 mt-auto"><ResponsiveContainer width="100%" height="100%"><AreaChart data={erosionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}><defs><linearGradient id="erosionGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fff" stopOpacity={0.4} /><stop offset="95%" stopColor="#fff" stopOpacity={0} /></linearGradient></defs><Tooltip content={<CustomTooltip />} /><Area type="monotone" dataKey="real" stroke="#fff" fill="url(#erosionGradient)" strokeWidth={4} animationDuration={2000} /><Line type="monotone" dataKey="nominal" stroke="rgba(255,255,255,0.2)" strokeDasharray="5 5" strokeWidth={2} /></AreaChart></ResponsiveContainer></div></div>
            </div>
          </section>

          {/* 02. MERCADOS */}
          <section id="sec-02" className="mb-40 space-y-12">
            <div className="border-b-4 border-red-700 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><BarChart3 className="text-gray-900" size={32} />02. Mercados y Bolsa</h3><p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Activos, Cotizaciones y Derivados</p></div>
              <InfoPanel sectionId="sec-02" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Acciones', desc: 'Renta Variable. Títulos de propiedad corporativa.', icon: <Activity /> },
                { title: 'Bonos', desc: 'Renta Fija. Deuda emitida con retorno predecible.', icon: <ShieldCheck /> },
                { title: 'Futuros', desc: 'Compromiso de intercambio en fecha futura.', icon: <Zap /> },
                { title: 'Opciones', desc: 'Derecho a compra o venta de activos.', icon: <Layers /> },
              ].map(item => (
                <button 
                  key={item.title} 
                  onClick={() => setSelectedDetail(item.title)}
                  className="p-8 text-left rounded-[2.5rem] border bg-white border-gray-100 shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl duration-300 group relative active:scale-95"
                >
                   <div className="mb-4 transition-transform group-hover:scale-125 duration-300 text-red-700">{item.icon}</div>
                   <div className="flex items-center justify-between gap-2 mb-2">
                     <h4 className="font-black text-lg uppercase italic tracking-tighter text-gray-900">{item.title}</h4>
                     <div className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:text-red-700 group-hover:bg-red-50 transition-all">
                       <Info size={16} />
                     </div>
                   </div>
                   <p className="text-[11px] leading-relaxed font-bold uppercase opacity-70 text-gray-400">{item.desc}</p>
                </button>
              ))}
            </div>
            <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-xl shadow-gray-100/50">
               <h4 className="text-center text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-gray-400">Matriz Riesgo vs Beneficio</h4>
               <div className="h-[400px] max-w-5xl mx-auto">
                 <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={riskReturnData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} tick={{ fill: '#111827', fontWeight: 900 }} />
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
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Beneficio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-1 bg-red-700 rounded-full"></span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Volatilidad / Riesgo</span>
                  </div>
               </div>
            </div>
          </section>

          {/* 03. ARQUITECTURA DEFI */}
          <section id="sec-03" className="mb-40 space-y-12">
            <div className="border-b-4 border-gray-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><Cpu className="text-red-700" size={32} />03. Arquitectura DeFi</h3><p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Soberanía Matemática y Código Inmutable</p></div>
              <InfoPanel sectionId="sec-03" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-6 pl-2 border-l-2 border-red-700">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-red-700">Equivalencias de Sistema</h4>
                   <span className="text-[8px] font-black uppercase bg-red-50 text-red-700 px-2 py-0.5 rounded">Detalle por elemento</span>
                </div>
                
                <div className="space-y-4">
                  {EQUIVALENCES.map((item) => (
                    <div key={item.trad} className="flex items-center gap-4">
                      <button 
                        onClick={() => setSelectedEquivalence(item)}
                        className="flex-1 bg-white border border-gray-100 p-6 rounded-[1.5rem] flex justify-between items-center group hover:border-gray-400 transition-all shadow-sm hover:shadow-md duration-300 relative overflow-hidden"
                      >
                        <span className="font-black text-[10px] uppercase text-gray-400 tracking-widest group-hover:text-gray-900 transition-colors">{item.trad}</span>
                        <div className="p-1.5 bg-gray-50 rounded-lg opacity-40 group-hover:opacity-100 transition-opacity">
                           <Landmark size={12} className="text-gray-400 group-hover:text-gray-900" />
                        </div>
                      </button>
                      <div className="flex-shrink-0">
                        <ArrowRight className="text-red-700" size={18} strokeWidth={3} />
                      </div>
                      <button 
                        onClick={() => setSelectedEquivalence(item)}
                        className="flex-1 bg-white border border-gray-100 p-6 rounded-[1.5rem] flex justify-between items-center group hover:border-red-500 transition-all shadow-sm hover:shadow-xl hover:-translate-y-0.5 duration-300 relative overflow-hidden"
                      >
                        <span className="font-black text-[11px] uppercase text-gray-900 italic tracking-tight">{item.defi}</span>
                        <div className="p-1.5 bg-red-50 rounded-lg text-red-700">
                           <Cpu size={12} />
                        </div>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-12 rounded-[3.5rem] flex flex-col items-center justify-center text-center space-y-8 shadow-xl shadow-gray-100/50 border border-gray-100 relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/5 blur-[100px] pointer-events-none"></div>
                <div className="absolute top-6 right-8 text-[10px] font-black text-gray-300 uppercase tracking-[0.5em] vertical-text">LIQUIDITY CERTAINTY</div>
                
                <div className="flex items-center gap-4 mb-2 relative z-10">
                   <Scale size={32} className="text-red-700 group-hover:rotate-12 transition-transform duration-500" />
                   <h4 className="text-2xl font-black uppercase tracking-tighter italic text-gray-900">Garantía Sistémica</h4>
                </div>
                <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider max-w-xs mx-auto mb-4 relative z-10">Diferencia entre la ilusión del crédito Fiat y el respaldo real DeFi.</p>
                
                <div className="h-64 w-full relative z-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={collateralComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                      <XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} tick={{ fill: '#111827', fontWeight: 900 }} />
                      <YAxis hide domain={[0, 160]} />
                      <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                      <Bar dataKey="principal" name="Respaldo Real" stackId="a" fill="#b91c1c" radius={[0, 0, 0, 0]}>
                        <LabelList dataKey="desc" position="top" style={{ fill: '#111827', fontSize: '8px', fontWeight: 900, textTransform: 'uppercase' }} />
                      </Bar>
                      <Bar dataKey="leverage" name="Crédito (Fraccionario)" stackId="a" fill="#374151" radius={[15, 15, 0, 0]} />
                      <Bar dataKey="debt" name="Deuda Emitida" fill="#ffffff" stroke="#111827" strokeWidth={2} radius={[15, 15, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="flex gap-6 mt-4 relative z-10">
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-700 rounded-full"></span>
                      <span className="text-[9px] font-black uppercase text-gray-400">Respaldo Real</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="text-[9px] font-black uppercase text-gray-400">Crédito</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white border border-black rounded-full"></span>
                      <span className="text-[9px] font-black uppercase text-gray-400">Préstamo</span>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* 04. INSTRUMENTOS DEFI */}
          <section id="sec-04" className="mb-40 space-y-12">
             <div className="border-b-4 border-red-700 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><Wallet className="text-gray-900" size={32} />04. Instrumentos DeFi</h3><p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Infraestructura Programable</p></div>
              <InfoPanel sectionId="sec-04" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[ { t: 'Stablecoins', d: 'Tokens vinculados al Fiat. Estabilidad on-chain.', tag: 'Anclaje' }, { t: 'DEX', d: 'Intercambio mediante pools algorítmicos.', tag: 'Liquidez' }, { t: 'Staking', d: 'Validación de red a cambio de retornos.', tag: 'Seguridad' }, { t: 'Yield Farming', d: 'Optimización de incentivos de protocolos.', tag: 'Retorno' }, { t: 'Sintéticos', d: 'Réplica de activos reales en blockchain.', tag: 'Espejo' }, { t: 'Seguros', d: 'Protección contra fallos de código.', tag: 'Cobertura' } ].map(item => (
                 <button 
                  key={item.t} 
                  onClick={() => setSelectedDetail(item.t)}
                  className="text-left bg-gray-50 p-8 rounded-[2rem] border border-gray-200/50 hover:bg-white hover:shadow-2xl transition-all group active:scale-[0.98]"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-black text-sm uppercase italic text-red-700 tracking-tighter group-hover:scale-105 transition-transform origin-left">{item.t}</h4>
                    <span className="bg-red-700 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg shadow-red-700/20">{item.tag}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase opacity-80">{item.d}</p>
                  <div className="mt-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <Info size={14} className="text-red-700" />
                  </div>
                </button>
               ))}
            </div>
          </section>

          {/* 05. LÍDERES */}
          <section id="sec-05" className="mb-40 space-y-24">
            <div className="border-b-4 border-gray-900 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><Globe className="text-red-700" size={32} />05. Protocolos Líderes</h3><p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Los pilares de la infraestructura digital</p></div>
              <InfoPanel sectionId="sec-05" />
            </div>
            
            {/* CRIPTOACTIVOS */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 border-l-4 border-red-700 pl-4">Criptoactivos de Reserva</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {CRYPTO_ASSETS.map((c) => (
                  <div key={c.name} className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-red-500 transition-all group overflow-hidden">
                    <button 
                      onClick={() => window.open(c.url, '_blank')}
                      className="p-3 bg-gray-900 text-white rounded-xl hover:bg-red-700 transition-colors flex-shrink-0 active:scale-90"
                      title={`Visitar web oficial de ${c.name}`}
                    >
                      {React.cloneElement(c.icon as React.ReactElement<any>, { size: 14 })}
                    </button>
                    <button 
                      onClick={() => setSelectedDetail(c.name)}
                      className="flex-1 px-3 py-3 text-left font-black text-[10px] uppercase tracking-tighter italic text-gray-900 truncate hover:text-red-700 transition-colors"
                    >
                      {c.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* STABLECOINS */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 border-l-4 border-red-700 pl-4">Stablecoins Globales</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {STABLECOINS.map((s) => (
                  <div key={s.name} className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-gray-900 transition-all group active:scale-[0.98]">
                    <button 
                      onClick={() => window.open(s.url, '_blank')}
                      className="p-3 bg-red-700 text-white rounded-xl hover:bg-gray-900 transition-colors flex-shrink-0"
                    >
                      {React.cloneElement(s.icon as React.ReactElement<any>, { size: 14 })}
                    </button>
                    <button 
                      onClick={() => setSelectedDetail(s.name)}
                      className="flex-1 px-3 py-3 text-left font-black text-[10px] uppercase tracking-tighter italic text-gray-900 truncate"
                    >
                      {s.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* WALLETS */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 border-l-4 border-red-700 pl-4">Infraestructura de Custodia (Wallets)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase text-red-700 tracking-widest px-2">
                    <Smartphone size={14} /> Hot Wallets (Uso Diario)
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    {HOT_WALLETS.map((w) => (
                      <div key={w.name} className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-red-700 transition-all group">
                        <button onClick={() => window.open(w.url, '_blank')} className="p-3 bg-gray-900 text-white rounded-xl hover:bg-red-700 transition-colors flex-shrink-0">
                          {React.cloneElement(w.icon as React.ReactElement<any>, { size: 14 })}
                        </button>
                        <button onClick={() => setSelectedDetail(w.name)} className="flex-1 px-3 py-3 text-left font-black text-[10px] uppercase tracking-tighter italic text-gray-900">
                          {w.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <span className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 tracking-widest px-2">
                    <HardDrive size={14} /> Cold Wallets (Seguridad Máxima)
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    {COLD_WALLETS.map((w) => (
                      <div key={w.name} className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-gray-900 transition-all group">
                        <button onClick={() => window.open(w.url, '_blank')} className="p-3 bg-red-700 text-white rounded-xl hover:bg-gray-900 transition-colors flex-shrink-0">
                          {React.cloneElement(w.icon as React.ReactElement<any>, { size: 14 })}
                        </button>
                        <button onClick={() => setSelectedDetail(w.name)} className="flex-1 px-3 py-3 text-left font-black text-[10px] uppercase tracking-tighter italic text-gray-900">
                          {w.name}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DEFI PLATFORMS */}
            <div className="space-y-8">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 border-l-4 border-red-700 pl-4">Infraestructura DeFi Top</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {DEFI_PLATFORMS.map((p) => (
                  <div key={p.name} className="flex items-center bg-white border border-gray-100 rounded-2xl p-1 shadow-sm hover:border-red-700 transition-all group">
                    <button 
                      onClick={() => window.open(p.url, '_blank')}
                      className="p-3 bg-gray-900 text-white rounded-xl hover:bg-red-700 transition-colors flex-shrink-0"
                    >
                      {React.cloneElement(p.icon as React.ReactElement<any>, { size: 14 })}
                    </button>
                    <button 
                      onClick={() => setSelectedDetail(p.name)}
                      className="flex-1 px-3 py-3 text-left font-black text-[10px] uppercase tracking-tighter italic text-gray-900 truncate"
                    >
                      {p.name}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 06. COMPARATIVA */}
          <section id="sec-06" className="mb-40 space-y-12">
            <div className="border-b-4 border-red-700 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div><h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4"><BarChart3 size={32} className="text-gray-900" />06. Comparativa Sistémica</h3><p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Vector de Atributos y Eficiencia de Respuesta</p></div>
              <InfoPanel sectionId="sec-06" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
               <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-gray-100 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-red-700/5 blur-[100px] pointer-events-none"></div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-700 mb-10 text-center relative z-10">Radar de Atributos Sistémicos</h4>
                 <div className="h-96 relative z-10">
                   <ResponsiveContainer width="100%" height="100%">
                     <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                       <PolarGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                       <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10, fontWeight: 900 }} />
                       <Radar name="SISTEMA FIAT" dataKey="FIAT" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.1} strokeWidth={3} />
                       <Radar name="SISTEMA DEFI" dataKey="DEFI" stroke="#b91c1c" fill="#b91c1c" fillOpacity={0.2} strokeWidth={3} />
                       <Tooltip content={<CustomTooltip />} />
                       <Legend wrapperStyle={{ paddingTop: '30px', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }} />
                     </RadarChart>
                   </ResponsiveContainer>
                 </div>
               </div>

               <div className="space-y-12">
                 <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-xl shadow-gray-100/50 relative overflow-hidden group">
                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tiempo de Respuesta (Finalidad)</h4>
                      <Clock size={16} className="text-red-700 animate-pulse" />
                   </div>
                   <div className="h-64">
                     <ResponsiveContainer width="100%" height="100%">
                       <BarChart layout="vertical" data={responseTimeData} margin={{ left: 20, right: 60 }}>
                         <XAxis type="number" hide scale="log" domain={[0.1, 10000]} />
                         <YAxis dataKey="name" type="category" width={140} fontSize={9} axisLine={false} tickLine={false} tick={{ fill: '#111827', fontWeight: 900 }} />
                         <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f9fafb' }} />
                         <Bar dataKey="min" fill="#b91c1c" radius={[0, 10, 10, 0]} barSize={28}>
                            <LabelList dataKey="label" position="right" style={{ fill: '#111827', fontSize: '9px', fontWeight: 900, textTransform: 'uppercase' }} offset={10} />
                         </Bar>
                       </BarChart>
                     </ResponsiveContainer>
                   </div>
                   <p className="text-[9px] text-gray-400 font-bold uppercase italic text-center mt-6 tracking-widest">Escala logarítmica de latencia transaccional</p>
                 </div>

                 <div className="space-y-4">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-700 px-4">Atributos de Disponibilidad y Certeza</h4>
                   <div className="grid grid-cols-2 gap-6">
                     <div className="text-center p-8 border-2 border-gray-100 rounded-[2.5rem] bg-white shadow-sm hover:shadow-xl transition-all group duration-500">
                       <div className="mb-2 flex justify-center"><Smartphone size={24} className="text-gray-900 group-hover:scale-110 transition-transform" /></div>
                       <span className="block text-4xl font-black text-gray-900 mb-1 italic tracking-tighter">24/7</span>
                       <span className="text-[9px] font-black uppercase text-gray-400 tracking-[0.2em]">Mercado sin Cierre</span>
                     </div>
                     <div className="text-center p-8 border-2 border-red-700 bg-red-50/30 rounded-[2.5rem] shadow-xl shadow-red-700/5 hover:-translate-y-1 transition-all group duration-500">
                       <div className="mb-2 flex justify-center"><Shield size={24} className="text-red-700 group-hover:scale-110 transition-transform" /></div>
                       <span className="block text-4xl font-black text-red-700 mb-1 italic tracking-tighter">100%</span>
                       <span className="text-[9px] font-black uppercase text-red-700 tracking-[0.2em]">Certeza Algorítmica</span>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </section>

          {/* GLOSARIO TÉCNICO */}
          <section id="glosario" className="py-20 border-t border-gray-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-700">
                  <div className="p-2 bg-red-50 rounded-xl"><BookOpen size={24} /></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Master Knowledge</span>
                </div>
                <h3 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900 leading-none">Glosario<br/><span className="text-red-700">Estructural</span></h3>
              </div>
              <div className="max-w-md">
                <p className="text-gray-400 text-xs font-bold uppercase leading-relaxed text-right border-r-4 border-red-700 pr-6 italic">Conceptos fundamentales para comprender la infraestructura de las finanzas programables y la criptoeconomía moderna.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {GLOSSARY_TERMS.map((item) => (
                <button 
                  key={item.t} 
                  onClick={() => setSelectedDetail(item.t)}
                  className="text-left bg-white p-6 rounded-[1.5rem] border border-gray-100 hover:border-red-700 shadow-sm hover:shadow-xl transition-all group relative active:scale-[0.98]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-700 font-black text-[11px] uppercase tracking-widest group-hover:italic transition-all">{item.t}</span>
                    <Plus size={12} className="text-gray-300 group-hover:text-red-700 group-hover:rotate-90 transition-all" />
                  </div>
                  <p className="text-[10px] text-gray-400 italic font-medium leading-snug group-hover:text-gray-600 transition-colors">{item.d}</p>
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Terminal size={10} className="text-gray-200" />
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* MODAL DE INFORMACIÓN */}
          {selectedDetail && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in zoom-in-95 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/5 blur-3xl rounded-full"></div>
                
                {/* Cabecera del Modal */}
                <div className="p-8 pb-4 flex items-center justify-between relative z-10 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-red-700 rounded-xl text-white shadow-lg shadow-red-700/20">
                      <Info size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">{selectedDetail}</h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                        {modalViewMode === 'simple' ? "Lenguaje Sencillo" : modalViewMode === 'extended' ? "Investigación Profunda" : modalViewMode === 'ai' ? "Respuesta IA Gemini" : "Análisis Técnico"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setModalViewMode('technical')}
                      className={`p-2.5 rounded-xl transition-all active:scale-90 ${modalViewMode === 'technical' ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:text-gray-900'}`}
                      title="Versión Técnica"
                    >
                      <Code size={20} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('extended')}
                      className={`p-2.5 rounded-xl transition-all active:scale-90 ${modalViewMode === 'extended' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Análisis Detallado"
                    >
                      <BookOpen size={20} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('simple')}
                      className={`p-2.5 rounded-xl transition-all active:scale-90 ${modalViewMode === 'simple' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Versión Neófito"
                    >
                      <Sparkles size={20} />
                    </button>
                    <button 
                      onClick={() => handleAiModalAsk(selectedDetail)}
                      disabled={isAiModalLoading}
                      className={`p-2.5 rounded-xl transition-all active:scale-90 ${modalViewMode === 'ai' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Consultar a la IA"
                    >
                      {isAiModalLoading ? <Loader2 size={20} className="animate-spin" /> : <Bot size={20} />}
                    </button>
                    <div className="w-[1px] h-8 bg-gray-100 mx-1"></div>
                    <button onClick={() => setSelectedDetail(null)} className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-red-700 transition-all active:scale-90">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Contenido del Modal */}
                <div className="p-8 pt-6 relative z-10">
                  <div className="min-h-[120px]">
                    {modalViewMode === 'simple' ? (
                      <div className="bg-red-50/30 p-6 rounded-3xl border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-sm text-gray-900 leading-relaxed font-bold italic">
                          {KNOWLEDGE_BASE[selectedDetail]?.simple || "Traducción a lenguaje sencillo próximamente disponible."}
                        </p>
                      </div>
                    ) : modalViewMode === 'extended' ? (
                      <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                           <FileText size={40} className="text-red-700" />
                         </div>
                         <div className="flex items-center gap-2 mb-3 relative z-10">
                           <FileText size={14} className="text-red-700" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-red-700">Tesis de Investigación</span>
                         </div>
                         <p className="text-[13px] text-gray-900 leading-relaxed font-medium relative z-10">
                           {KNOWLEDGE_BASE[selectedDetail]?.extended || "El análisis detallado para este término está siendo verificado por el equipo de investigación."}
                         </p>
                      </div>
                    ) : modalViewMode === 'ai' ? (
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2 flex flex-col">
                        {isAiModalLoading && !aiModalResponse ? (
                          <div className="flex flex-col items-center justify-center py-6 gap-3">
                             <Loader2 size={24} className="animate-spin text-red-700" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Procesando Consulta IA...</span>
                          </div>
                        ) : (
                          <>
                            <div className="prose-sm max-h-[250px] overflow-y-auto custom-scrollbar pr-2 mb-6">
                               {formatAiResponse(aiModalResponse, true)}
                            </div>
                            
                            <div className="border-t border-gray-200 pt-6 space-y-3">
                               <div className="flex items-center gap-2 mb-1">
                                  <MessageSquare size={14} className="text-red-700" />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">¿Más preguntas?</span>
                               </div>
                               <div className="relative group">
                                  <input 
                                    type="text" 
                                    value={aiFollowUp}
                                    onChange={(e) => setAiFollowUp(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && aiFollowUp.trim() && handleAiModalAsk(selectedDetail, aiFollowUp)}
                                    placeholder="Profundiza sobre este concepto..."
                                    className="w-full bg-white border border-gray-200 p-3 rounded-xl text-[11px] font-medium pr-10 outline-none focus:ring-2 focus:ring-red-700/10 transition-all shadow-inner"
                                  />
                                  <button 
                                    onClick={() => aiFollowUp.trim() && handleAiModalAsk(selectedDetail, aiFollowUp)}
                                    disabled={isAiModalLoading || !aiFollowUp.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-20 transition-all"
                                  >
                                    {isAiModalLoading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                                  </button>
                               </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-sm text-gray-900 leading-relaxed font-medium">
                          {KNOWLEDGE_BASE[selectedDetail]?.technical || "Información técnica detallada en proceso de sincronización."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MODAL DE EQUIVALENCIAS DE SISTEMA */}
          {selectedEquivalence && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in zoom-in-95 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/5 blur-3xl rounded-full"></div>
                
                {/* Cabecera con Selector */}
                <div className="p-8 pb-4 flex items-center justify-between relative z-10 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-gray-900 rounded-xl text-white shadow-lg">
                      <Cpu size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter italic leading-none">{selectedEquivalence.defi}</h3>
                      <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                         Transición desde {selectedEquivalence.trad}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setModalViewMode('technical')}
                      className={`p-2.5 rounded-xl transition-all active:scale-90 ${modalViewMode === 'technical' ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-400 hover:text-gray-900'}`}
                      title="Análisis Técnico"
                    >
                      <Terminal size={20} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('extended')}
                      className={`p-2.5 rounded-xl transition-all active:scale-90 ${modalViewMode === 'extended' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Profundización"
                    >
                      <BookOpen size={20} />
                    </button>
                    <button 
                      onClick={() => setModalViewMode('simple')}
                      className={`p-2.5 rounded-xl transition-all active:scale-90 ${modalViewMode === 'simple' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Análisis Neófito"
                    >
                      <User size={20} />
                    </button>
                    <button 
                      onClick={() => handleAiModalAsk(`${selectedEquivalence.trad} vs ${selectedEquivalence.defi}`)}
                      disabled={isAiModalLoading}
                      className={`p-2.5 rounded-xl transition-all active:scale-90 ${modalViewMode === 'ai' ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' : 'bg-gray-100 text-gray-400 hover:text-red-700'}`}
                      title="Análisis por IA"
                    >
                      {isAiModalLoading ? <Loader2 size={20} className="animate-spin" /> : <Bot size={20} />}
                    </button>
                    <div className="w-[1px] h-8 bg-gray-100 mx-1"></div>
                    <button onClick={() => setSelectedEquivalence(null)} className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-red-700 transition-all active:scale-90">
                      <X size={20} />
                    </button>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-8 pt-6 relative z-10">
                  <div className="min-h-[120px]">
                    {modalViewMode === 'simple' ? (
                      <div className="bg-red-50/30 p-6 rounded-3xl border border-red-100 animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-sm text-gray-900 leading-relaxed italic font-bold">
                          {selectedEquivalence.simple}
                        </p>
                      </div>
                    ) : modalViewMode === 'extended' ? (
                      <div className="bg-white p-6 rounded-3xl border border-red-100 shadow-sm animate-in fade-in slide-in-from-bottom-2 relative overflow-hidden">
                         <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                           <FileText size={40} className="text-red-700" />
                         </div>
                         <div className="flex items-center gap-2 mb-3 relative z-10">
                           <FileText size={14} className="text-red-700" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-red-700">Análisis Estructural</span>
                         </div>
                         <p className="text-[13px] text-gray-900 leading-relaxed font-medium relative z-10 italic">
                           {selectedEquivalence.extended}
                         </p>
                      </div>
                    ) : modalViewMode === 'ai' ? (
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 animate-in fade-in slide-in-from-bottom-2 flex flex-col">
                        {isAiModalLoading && !aiModalResponse ? (
                          <div className="flex flex-col items-center justify-center py-6 gap-3">
                             <Loader2 size={24} className="animate-spin text-red-700" />
                             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Generando Análisis...</span>
                          </div>
                        ) : (
                          <>
                            <div className="prose-sm max-h-[200px] overflow-y-auto custom-scrollbar pr-2 mb-6">
                               {formatAiResponse(aiModalResponse, true)}
                            </div>
                            
                            <div className="border-t border-gray-200 pt-6 space-y-3">
                               <div className="flex items-center gap-2 mb-1">
                                  <MessageSquare size={14} className="text-red-700" />
                                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">¿Más preguntas?</span>
                               </div>
                               <div className="relative group">
                                  <input 
                                    type="text" 
                                    value={aiFollowUp}
                                    onChange={(e) => setAiFollowUp(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && aiFollowUp.trim() && handleAiModalAsk(`${selectedEquivalence.trad} vs ${selectedEquivalence.defi}`, aiFollowUp)}
                                    placeholder="Consulta más detalles técnicos..."
                                    className="w-full bg-white border border-gray-200 p-3 rounded-xl text-[11px] font-medium pr-10 outline-none focus:ring-2 focus:ring-red-700/10 transition-all shadow-inner"
                                  />
                                  <button 
                                    onClick={() => aiFollowUp.trim() && handleAiModalAsk(`${selectedEquivalence.trad} vs ${selectedEquivalence.defi}`, aiFollowUp)}
                                    disabled={isAiModalLoading || !aiFollowUp.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-gray-900 text-white rounded-lg hover:bg-black disabled:opacity-20 transition-all"
                                  >
                                    {isAiModalLoading ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                                  </button>
                               </div>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2">
                        <p className="text-sm text-gray-700 leading-relaxed font-medium italic">
                          {selectedEquivalence.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 flex gap-3 relative z-10">
                    <div className="flex-1 p-4 bg-gray-100 rounded-2xl text-center">
                      <span className="block text-[8px] font-black uppercase text-gray-400 mb-1">Pasado Fiat</span>
                      <span className="text-[10px] font-black uppercase text-gray-600">{selectedEquivalence.trad}</span>
                    </div>
                    <div className="flex-1 p-4 bg-red-50 rounded-2xl text-center border border-red-100">
                      <span className="block text-[8px] font-black uppercase text-red-400 mb-1">Futuro DeFi</span>
                      <span className="text-[10px] font-black uppercase text-red-700">{selectedEquivalence.defi}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <style>{`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            section { scroll-margin-top: 100px; }
            .vertical-text { writing-mode: vertical-rl; text-orientation: mixed; }
            .custom-scrollbar::-webkit-scrollbar { width: 4px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
          `}</style>
        </Shell>
      </div>
    </>
  );
}
