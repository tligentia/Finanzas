import React from 'react';
import { 
  RefreshCw, TrendingUp, ShieldCheck, Layers, Landmark, 
  Cpu, Wallet, BarChart3, Activity, Globe, DollarSign, 
  CircleDollarSign, Gem, Coins, Zap, Share2, Scale, 
  Lock, ArrowRightLeft, Radio, Network, FileText, 
  ShieldAlert, Clock, CheckCircle2, AlertTriangle, Building2,
  Receipt, Landmark as BankIcon, Database, KeyRound, HelpCircle
} from 'lucide-react';

import { DirectLinkItem } from './directLinksData';

export interface EcosystemInstrument {
  id: string;
  name: string;
  category: 'Mercados' | 'DeFi Core' | 'Derivados' | 'Infraestructura' | 'RWA' | 'Regulación';
  tag: string;
  summary: string;
  technical: string;
  simple: string;
  extended: string;
  fiatVsDefi?: {
    fiatTrad: string;
    defiOnChain: string;
    coreDifference: string;
  };
  risks: string[];
  keyParameters: { label: string; value: string }[];
  regulatoryEU?: string;
  evidenceRequired: string[];
  links?: DirectLinkItem[];
}

export const EXPANDED_ECOSYSTEM_INSTRUMENTS: EcosystemInstrument[] = [
  {
    id: 'liquidity-pools',
    name: 'Pools de Liquidez & AMM',
    category: 'DeFi Core',
    tag: 'Liquidez Automática',
    summary: 'Reservas de tokens bloqueados en contratos inteligentes que permiten el intercambio descentralizado mediante fórmulas matemáticas sin libro de órdenes.',
    technical: 'Mecanismo de Automated Market Maker (AMM) basado en invariantes matemáticos (como x · y = k en Uniswap V2 o curvas concentradas en V3). Los proveedores de liquidez (LP) depositan pares de activos y reciben tokens ERC-20 o recibos NFT ERC-721 representativos de su cuota. El precio relativo se ajusta algorítmicamente tras cada swap según la relación de reservas.',
    simple: 'Es como un recipiente compartido con dos monedas diferentes. Cualquiera puede echar de una moneda y sacar de la otra pagando una pequeña comisión. No hay un dueño: las matemáticas equilibran el precio.',
    extended: 'El rendimiento real de una posición LP se descompone rigurosamente en: Rendimiento Neto = Comisiones cobradas + Incentivos percibidos - Pérdida Impermanente (IL) - Comisiones de Gas - Impacto Fiscal de entradas y salidas. La liquidez concentrada permite acotar el capital a un rango específico [P_min, P_max], multiplicando la eficiencia de capital pero dejando la posición 100% expuesta a un único activo depreciado cuando el precio sale de rango.',
    fiatVsDefi: {
      fiatTrad: 'En finanzas tradicionales, la liquidez depende de creadores de mercado institucionales (Market Makers como Citadel o Virtu) con acuerdos bilaterales, libros de órdenes centrales (CLOB) en bolsas cerradas (NYSE, BME) y liquidación diferida en cámaras de compensación (T+1/T+2).',
      defiOnChain: 'En DeFi, cualquier usuario puede convertirse en creador de mercado depositando fondos en contratos AMM autónomos (x · y = k). No existe libro de órdenes central ni intermediario: el precio se forma algorítmicamente y la liquidación es atómica (T+0).',
      coreDifference: 'Sustitución de intermediarios institucionales con acuerdos privilegiados por pools colectivos sin permiso donde las comisiones van a los depositantes y el precio se rige por matemáticas públicas inmutables.'
    },
    risks: [
      'Pérdida Impermanente (Impermanent Loss) por divergencia de precios relativos',
      'Riesgo de Smart Contract en el router y el contrato del pool',
      'Toxic Flow / Arbitraje MEV desfavorable para LPs pasivos (LVR - Loss Versus Rebalancing)',
      'Tokens maliciosos o con comisión oculta en transferencias (Fee-on-transfer)'
    ],
    keyParameters: [
      { label: 'Fórmula Base', value: 'x · y = k (o suma ponderada)' },
      { label: 'Formato LP', value: 'ERC-20 (V2) o NFT ERC-721 (V3)' },
      { label: 'Comisión Típica', value: '0.01% - 1.00% por swap' }
    ],
    regulatoryEU: 'Los pools puros descentralizados no están sujetos a MiCA si no hay entidad intermediaria gestora; no obstante, el despliegue comercial en interfaces Web3 puede requerir escrutinio bajo CASP.',
    evidenceRequired: [
      'Hash de entrada y salida del pool',
      'TokenId del recibo NFT si aplica',
      'Composición exacta en el momento de entrada (unidades y EUR)',
      'Comisiones acumuladas e incentivos reclamados con valor a fecha de recepción'
    ]
  },
  {
    id: 'perpetuals',
    name: 'Perpetuales (Perps)',
    category: 'Derivados',
    tag: 'Derivados Sintéticos',
    summary: 'Contratos de futuros sin fecha de vencimiento que replican el precio de un activo subyacente mediante tasas de financiación periódicas (Funding Rate).',
    technical: 'Contratos bilaterales o contra pools de liquidez (GLP/GM) que permiten apalancamiento bilateral (Long y Short). Emplean un mecanismo de Funding Rate (típicamente cada 8 horas o por bloque) pagado entre posiciones largas y cortas para forzar la convergencia entre el Mark Price del contrato y el Index Price del mercado spot.',
    simple: 'Es una apuesta sobre si una moneda va a subir o bajar usando dinero prestado (apalancamiento), pero sin fecha de caducidad. Para que el precio no se desmadre, quienes van ganando pagan una pequeña propina periódica a quienes van en contra.',
    extended: 'En los derivados de criptoactivos existen 4 precios fundamentales que nunca deben confundirse: 1) Spot Price (mercado al contado), 2) Index Price (media ponderada de exchanges), 3) Mark Price (precio de referencia para PnL no realizado y cálculo de liquidación), y 4) Precio de Liquidación estimado. Los motores de liquidación ejecutan forzosamente la posición cuando el margen cae por debajo del margen de mantenimiento, antes de que el colateral llegue a cero. En caso de fallo del fondo de seguro, se activa el desapalancamiento automático (ADL - Auto-Deleveraging).',
    fiatVsDefi: {
      fiatTrad: 'En mercados tradicionales (CME, Eurex), los futuros tienen vencimientos fijos trimestrales/mensuales, exigen brokers regulados, cámaras de contrapartida central (CCP) con márgenes intradía y solo operan en horario bursátil.',
      defiOnChain: 'En DeFi (dYdX, GMX, Hyperliquid), los contratos no caducan (Perpetual Swaps); el Funding Rate equilibra el precio cada 8 horas o por segundo on-chain, con autocustodia de colateral y liquidaciones automáticas 24/7 sin brokers.',
      coreDifference: 'Eliminación del vencimiento temporal, supresión de cámaras de compensación centralizadas y ejecución continua 24/7/365 con liquidación programática determinista.'
    },
    risks: [
      'Liquidación acelerada por apalancamiento excesivo ante picos de volatilidad',
      'Desviación del Mark Price respecto al precio spot en momentos de estrés',
      'Doble riesgo si el colateral depositado es volátil (crypto-margined vs USD-margined)',
      'Desapalancamiento Automático (ADL) en caso de quiebra masiva de posiciones contrarias'
    ],
    keyParameters: [
      { label: 'Ciclo de Funding', value: 'Cada 8 horas / continuo' },
      { label: 'Modos de Margen', value: 'Aislado (Isolated) o Cruzado (Cross)' },
      { label: 'Apalancamiento', value: '1x hasta 50x / 100x' }
    ],
    regulatoryEU: 'Instrumentos derivados sujetos a la normativa MiFID II si se negocian en entidades reguladas, excluidos del ámbito laxo de MiCA por su consideración de instrumento financiero tradicional tokenizado.',
    evidenceRequired: [
      'ID de posición y órdenes asociadas',
      'Mark Price y precio índice al abrir y cerrar',
      'Margen inicial y margen de mantenimiento',
      'Histórico completo de liquidaciones de funding cobradas o pagadas con timestamps UTC'
    ]
  },
  {
    id: 'lending-credit',
    name: 'Préstamos On-Chain & Lending',
    category: 'DeFi Core',
    tag: 'Mercados de Dinero',
    summary: 'Protocolos descentralizados de depósito y endeudamiento sobre-colateralizado con tipos de interés variables gobernados algorítmicamente.',
    technical: 'Mercados de liquidez agrupada (Pooled Lending como Aave o Compound) donde los depositantes aportan liquidez obteniendo tokens de devengo de intereses (aTokens / cTokens) y los prestatarios extraen deuda colateralizada. La relación entre deuda y colateral se supervisa mediante el Factor de Salud (Health Factor). Si el Health Factor cae de 1.0, cualquier bot liquidador externo puede repagar parte de la deuda y quedarse el colateral con un descuento (Liquidation Bonus).',
    simple: 'Dejas criptomonedas como fianza (garantía) y pides prestadas otras monedas. Si tu garantía pierde valor y casi no cubre lo que debes, el sistema la vende automáticamente para devolver el dinero a quien te lo prestó.',
    extended: 'A diferencia de la reserva fraccionaria tradicional, el lending DeFi es un sistema de reserva íntegra o sobre-colateralizado (típicamente 120%-150% de colateral sobre deuda). Los tipos de interés siguen una curva algorítmica ligada a la tasa de utilización: cuando la utilización del pool se acerca al 90-100%, el tipo se dispara exponencialmente para incentivar depósitos y forzar devoluciones, protegiendo la liquidez disponible para retiros.',
    fiatVsDefi: {
      fiatTrad: 'La banca comercial opera bajo Reserva Fraccionaria (presta dinero que no tiene en bóveda), evalúa solvencia subjetiva con historial crediticio (Scoring FICO/CIRBE) y requiere semanas de aprobación legal con desahucios o embargos judiciales si hay impago.',
      defiOnChain: 'En protocolos de lending (Aave, Morpho), los préstamos exigen Sobre-Colateralización (120%-150%) con reserva íntegra. No hay análisis de identidad ni CIRBE: si el colateral desciende de nivel de seguridad, un bot liquidador lo subasta al instante sin juicio.',
      coreDifference: 'Sustitución de la promesa de pago y el apalancamiento opaco por sobregarantías matemáticas transparentes y liquidación instantánea por código.'
    },
    risks: [
      'Liquidación fulminante por caída súbita del colateral o fallos de oráculo',
      'Bloqueo transitorio de retiros si la tasa de utilización del pool alcanza el 100%',
      'Acumulación de deuda incobrable (Bad Debt) si el colateral se devalúa más rápido que la capacidad del liquidador',
      'Riesgos acumulativos en estrategias de apalancamiento en bucle (Looping)'
    ],
    keyParameters: [
      { label: 'LTV Máximo', value: '65% - 85% según riesgo de activo' },
      { label: 'Umbral Liquidación', value: '75% - 90%' },
      { label: 'Liquidation Penalty', value: '5% - 10% de penalización' }
    ],
    regulatoryEU: 'La provisión desintermediada entre pares se analiza caso por caso. Si interviene un operador con interfaz centralizada, puede considerarse intermediación financiera sujeta a supervisión.',
    evidenceRequired: [
      'Contrato de lending y red',
      'Activos de colateral y deuda con importes y valoraciones EUR exactas',
      'Health Factor inicial y eventos de liquidación o repago',
      'Registro contable diferenciado de intereses devengados versus capital'
    ]
  },
  {
    id: 'liquid-staking-restaking',
    name: 'Staking Líquido (LST) & Restaking (LRT)',
    category: 'DeFi Core',
    tag: 'Rendimiento & Seguridad',
    summary: 'Mecanismos que desbloquean la liquidez del capital en staking nativo y permiten reutilizar dicha seguridad para asegurar servicios adicionales.',
    technical: 'En LST (ej. stETH, rETH), el usuario delega activos en validadores PoS y recibe un token representativo que acumula rendimiento por incremento de ratio de canje (value-accruing) o por rebalanceo de saldo (rebasing). El Restaking (EigenLayer, Symbiotic) toma ese LST y lo compromete como garantía económica para asegurar Actively Validated Services (AVS), oráculos y puentes, sumando recompensas pero acumulando múltiples condiciones de penalización (slashing).',
    simple: 'Haces un depósito a plazo fijo para ayudar a que la red funcione, pero te dan un "vale" digital que puedes usar y gastar en otras partes mientras tanto. Con el restaking, ese mismo vale se ofrece como aval en otros sitios para ganar más propinas, pero con riesgo de perderlo si algo falla.',
    extended: 'El análisis de riesgo de LST y LRT exige separar: 1) Riesgo de mercado del activo subyacente, 2) Riesgo de slashing del validador por doble firma o inactividad prolongada, 3) Riesgo de cola y retardo en el proceso de retirada nativa (unbonding period), 4) Descuento de cotización en mercado secundario frente al valor teórico de canje (depeg transitorio), y 5) En LRT, la opacidad de las condiciones de penalización de cada AVS asegurado.',
    fiatVsDefi: {
      fiatTrad: 'Equivalente a imposiciones a plazo fijo o bonos gubernamentales con compromiso de permanencia, donde los fondos quedan inmovilizados sin liquidez secundaria inmediata salvo penalización o venta en mercados OTC opacos.',
      defiOnChain: 'En LST (Lido, RocketPool), el capital asegura el consenso criptográfico y entrega un recibo líquido negociable al instante en DEXes. Con Restaking (EigenLayer), la misma garantía respalda múltiples redes a cambio de rendimiento compuesto.',
      coreDifference: 'Monetización inmediata del capital bloqueado mediante tokens derivados fungibles e hiper-reutilización de la garantía económica (seguridad compartida).'
    },
    risks: [
      'Penalización de corte (Slashing) en validadores por mala conducta técnica',
      'Descuento o depeg en el mercado secundario respecto a la paridad con el activo nativo',
      'Cascada de liquidaciones si el LST se usa como colateral en protocolos de lending',
      'Complejidad contractual multiplicada en las capas de restaking'
    ],
    keyParameters: [
      { label: 'Mecanismo Token', value: 'Value-Accruing vs Rebasing' },
      { label: 'Retirada Nativa', value: 'Días/semanas de cola de salida' },
      { label: 'Rendimiento Base', value: '3% - 6% TAE según red PoS' }
    ],
    regulatoryEU: 'La fiscalidad en España exige diferenciar el momento de generación, disponibilidad y reclamación efectiva de recompensas de staking para su cómputo tributario.',
    evidenceRequired: [
      'Ratio de canje LST/nativo en la fecha exacta',
      'Conjunto de validadores delegados',
      'Histórico de recompensas recibidas en EUR',
      'Condiciones de slashing de los AVS en caso de LRT'
    ]
  },
  {
    id: 'vaults-structured-yield',
    name: 'Vaults & Rendimiento Estructurado',
    category: 'DeFi Core',
    tag: 'Estrategias Automatizadas',
    summary: 'Bóvedas programables (estándar ERC-4626) que ejecutan estrategias complejas de optimización de rendimiento, arbitraje o cobertura delta-neutral.',
    technical: 'Contratos inteligentes que aceptan depósitos de activos subyacentes y emiten participaciones proporcionales (shares). Implementan el estándar ERC-4626 para interoperabilidad de vaults. Ejecutan estrategias como venta sistemática de volatilidad (covered calls), provisión automatizada de liquidez en rango concentrado o arbitraje de tasas de financiación.',
    simple: 'Es como un fondo de inversión automático gobernado por un robot de código. Pones tu dinero y el contrato lo mueve automáticamente a donde haya mejores ganancias seguras según unas reglas fijas.',
    extended: 'El APY anunciado de un vault debe descomponerse obligatoriamente para evaluar su sostenibilidad: APY Real = Rendimiento orgánico (comisiones de swap reales e intereses de préstamo) + Rendimiento dilutivo (emisiones de tokens de recompensa creados de la nada) - Comisiones de gestión y éxito. Si más del 70% del APY proviene de tokens de incentivo, la rentabilidad depende enteramente de que no colapse el precio de dicho token.',
    fiatVsDefi: {
      fiatTrad: 'Fondos de inversión tradicionales (UCITS, Hedge Funds) gestionados por comités humanos con comisiones de suscripción/reembolso, cálculo de valor liquidativo una vez al día (NAV diario) y suscripciones a través de banca privada.',
      defiOnChain: 'Bóvedas programables tokenizadas (ERC-4626 como Yearn o Beefy) donde el rebalanceo, la reinversión de beneficios (autocompounding) y el canje de participaciones se auditan y ejecutan por bloque en tiempo real.',
      coreDifference: 'Auditoría continua del valor liquidativo (share price on-chain), reducción de comisiones intermedias y ejecución determinista sin discrecionalidad humana opaca.'
    },
    risks: [
      'Vulnerabilidad en contratos de múltiples capas (riesgo de composabilidad)',
      'Deterioro de capital por drawdown de la estrategia subyacente',
      'Comisiones de rendimiento calculadas sin marcas de agua (high-water mark)',
      'Restricciones de liquidez o comisiones abusivas en la retirada (exit fee)'
    ],
    keyParameters: [
      { label: 'Estándar', value: 'ERC-4626 Tokenized Vault' },
      { label: 'Estructura Comisiones', value: '2% gestión / 20% éxito típica' },
      { label: 'Frecuencia Cosecha', value: 'Harvest periódico automatizado' }
    ],
    regulatoryEU: 'Puede calificarse como Institución de Inversión Colectiva (IIC) o gestión de carteras si existe un gestor con discrecionalidad en la asignación del capital.',
    evidenceRequired: [
      'Contrato del vault y contratos de las estrategias subyacentes',
      'Mecanismo de cálculo de participaciones (share price en el bloque de entrada/salida)',
      'Desglose del APY entre rendimiento real y emisión de incentivos',
      'Comisiones de gestión o retirada efectivamente deducidas'
    ]
  },
  {
    id: 'bridges-crosschain',
    name: 'Puentes Cross-Chain & Interoperabilidad',
    category: 'Infraestructura',
    tag: 'Comunicaciones Inter-Red',
    summary: 'Infraestructura técnica para transferir activos e instrucciones de computación entre blockchains independientes o entre Capas 1 y Capas 2.',
    technical: 'Existen tres modelos estructurales: 1) Lock-and-Mint (los activos se bloquean en la red origen y se acuña un wrapped token sintético en destino), 2) Burn-and-Mint (destrucción nativa y emisión bajo contratos controlados por el emisor, ej. CCTP de Circle), y 3) Pools de Liquidez Bilateral (intercambio atómico con proveedores de liquidez en ambas cadenas).',
    simple: 'Es el barco que transporta tus monedas de una isla (blockchain) a otra. A veces guarda tu moneda original en la aduana y te da una ficha provisional en la nueva isla.',
    extended: 'Los puentes han sido históricamente el punto de mayor pérdida patrimonial del ecosistema DeFi (>2.500 millones de USD hackeados). Un token puenteado (wrapped) NO es el activo original: su valor depende de la solvencia del contrato que custodia el respaldo en la red de origen y del consenso de los validadores del puente. Enviar tokens por una ruta o puente no canónico puede generar un activo completamente ilíquido.',
    fiatVsDefi: {
      fiatTrad: 'Red de mensajería interbancaria SWIFT y cuentas nostro/vostro que tardan 3 a 5 días hábiles en compensar divisas, con altas comisiones de banca corresponsal y riesgo de bloqueo geopolítico.',
      defiOnChain: 'Protocolos de mensajería cross-chain (LayerZero, Chainlink CCIP, CCTP) que verifican estados y transfieren liquidez criptográfica en minutos u horas sin intermediarios bancarios de corresponsalía.',
      coreDifference: 'Sustitución de la compensación burocrática por pasarelas criptográficas verificadas, asumiendo sin embargo el riesgo técnico de seguridad de los contratos de custodia del puente.'
    },
    risks: [
      'Ataques a los contratos de custodia centralizados del puente en la cadena base',
      'Vulnerabilidad en los validadores multifirma o el protocolo de oráculo de mensajería',
      'Recepción de representaciones no oficiales (wrapped) sin soporte de mercado',
      'Operaciones atascadas en tránsito durante congestiones de red'
    ],
    keyParameters: [
      { label: 'Modelos', value: 'Lock-Mint / Burn-Mint / Liquidity Pools' },
      { label: 'Seguridad', value: 'Multisig / MPC / ZK-Relayers' },
      { label: 'Tiempo de Paso', value: 'Desde 1 min hasta 7 días (Optimistic Rollups)' }
    ],
    regulatoryEU: 'Sujetos a las directrices de transferencias de criptoactivos del Reglamento (UE) 2023/1113 (Travel Rule) en caso de que intervengan proveedores autorizados.',
    evidenceRequired: [
      'Hash de la transacción en la red de origen',
      'Hash de la transacción de recepción en la red de destino',
      'Contrato del puente y dirección exacta del token recibido',
      'Comisiones de gas en ambas cadenas y tarifas del puente'
    ]
  },
  {
    id: 'oracles-mev',
    name: 'Oráculos & Infraestructura de Datos',
    category: 'Infraestructura',
    tag: 'Verdad Externa & MEV',
    summary: 'Redes descentralizadas de nodos que inyectan datos de precios y condiciones del mundo real a los contratos inteligentes, y la dinámica del mempool.',
    technical: 'Los oráculos (Chainlink DON, Pyth Network, TWAP en Uniswap) solucionan el problema del determinismo de la blockchain suministrando datos firmados criptográficamente. Se rigen por parámetros de desviación porcentual (heartbeat/deviation threshold) y frecuencia de actualización. En el mempool, el MEV (Maximum Extractable Value) permite a buscadores reordenar transacciones ejecutando ataques front-running y sandwich contra usuarios desprevenidos.',
    simple: 'Es el termómetro y el reloj que los programas de ordenador consultan para saber qué pasa fuera. Si el termómetro está roto o alguien lo calienta con un mechero, los programas tomarán decisiones equivocadas con tu dinero.',
    extended: 'La manipulación de oráculos de baja liquidez mediante préstamos relámpago (flash loan attacks) es el vector más común de vaciado de fondos en lending DeFi. Si un protocolo lee el precio de un único pool spot manipulable en vez de un oráculo agregador robusto con volumen ponderado (VWAP/TWAP), un atacante puede alterar el precio momentáneamente para extraer préstamos desproporcionados o liquidar posiciones legítimas.',
    fiatVsDefi: {
      fiatTrad: 'Proveedores de datos financieros cerrados y propietarios (Bloomberg Terminals, Refinitiv) con tarifas elevadas, acuerdos de licencia restrictivos y auditoría externa retrospectiva.',
      defiOnChain: 'Redes descentralizadas de oráculos (Chainlink, Pyth) que publican feeds de precios verificados criptográficamente on-chain para que cualquier contrato inteligente ejecute liquidaciones y canjes de forma autónoma.',
      coreDifference: 'Disponibilidad pública e inmutable de cotizaciones para consumo de software sin barreras corporativas ni licencias propietarias opacas.'
    },
    risks: [
      'Latencia o congelación del feed de precios durante caídas bruscas de red',
      'Ataques de manipulación de oráculo spot con préstamos flash',
      'Pérdidas por deslizamiento forzado derivado de ataques MEV sandwich',
      'Dependencia de la infraestructura de nodos RPC para la emisión de transacciones'
    ],
    keyParameters: [
      { label: 'Tipos de Oráculo', value: 'Push (Chainlink) vs Pull (Pyth) vs TWAP' },
      { label: 'Umbral Desviación', value: '0.1% a 0.5% típico para disparar updates' },
      { label: 'Defensa MEV', value: 'RPC privados (Flashbots Protect, MEV-Blocker)' }
    ],
    regulatoryEU: 'Los proveedores de índices de referencia para criptoactivos se encuentran regulados bajo el marco europeo de Benchmark Regulation (BMR).',
    evidenceRequired: [
      'Fuente del oráculo empleada por el protocolo',
      'Marca temporal exacta UTC de la lectura de precios',
      'Desviación mínima declarada en los contratos',
      'Verificación de uso de RPC seguro para evitar arbitraje hostil en mempool'
    ]
  },
  {
    id: 'rwa-tokenization',
    name: 'RWA (Activos del Mundo Real)',
    category: 'RWA',
    tag: 'Finanzas Híbridas',
    summary: 'Representación digital en blockchain de activos tangibles o financieros tradicionales (bonos del tesoro, deuda corporativa, inmobiliario o materias primas).',
    technical: 'Estructuras jurídicas y técnicas (SPVs en jurisdicciones reguladas conectadas con contratos ERC-20 permisados). Activos destacados: deuda soberana a corto plazo (ej. BUIDL de BlackRock, OUSG de Ondo), crédito privado (Centrifuge) y materias primas (oro tokenizado Paxos Gold). Incorporan habitualmente listas blancas de acreditación (KYC on-chain) mediante estándares como ERC-3643.',
    simple: 'Tener una letra del tesoro o una parte de un edificio escrita en la cadena de bloques. Te pagan los intereses del mundo real directamente en tu wallet.',
    extended: 'El análisis de un RWA debe desplazarse casi por completo fuera de la blockchain: ¿Quién custodia el activo físico o financiero? ¿En qué banco o depositario está la cuenta segregada? ¿Qué derecho legal ejecutable ante un tribunal mercantil tiene el poseedor del token si el emisor quiebra? Un token RWA sin un contrato marco legalmente exigible es mera exposición crediticia no garantizada al emisor.',
    fiatVsDefi: {
      fiatTrad: 'Anotaciones en cuenta en depositarios centrales (Iberclear, DTCC, Euroclear) con lotes mínimos elevados (ej. 100.000 € para pagarés institucionales), horarios de oficina y liquidación T+2 con múltiples comisiones de custodia.',
      defiOnChain: 'Fraccionamiento digital mediante tokens ERC-20 o ERC-3643 respaldados por un vehículo SPV regulado, liquidación instantánea, pagos de cupones programados por bloque y transferencias entre wallets verificadas.',
      coreDifference: 'Hiper-fraccionamiento del activo tangible, liquidación continua 24/7 y composabilidad con préstamos DeFi, condicionado sin embargo a la solvencia del custodio legal off-chain.'
    },
    risks: [
      'Riesgo de contraparte del custodio bancario y del vehículo de propósito especial (SPV)',
      'Desconexión legal entre la titularidad del token y el derecho societario del activo',
      'Falta de liquidez en mercado secundario debido a restricciones obligatorias de KYC/AML',
      'Riesgo de congelación de fondos mediante funciones de lista negra (blacklist)'
    ],
    keyParameters: [
      { label: 'Estándar', value: 'ERC-20 permisado / ERC-3643 / ERC-1400' },
      { label: 'Custodio Subyacente', value: 'Entidad depositaria regulada' },
      { label: 'Rendimiento', value: 'Interés nominal del activo tradicional' }
    ],
    regulatoryEU: 'Si otorga derechos económicos asimilables a acciones o títulos de deuda, queda excluido de MiCA y clasificado directamente como Instrumento Financiero bajo MiFID II.',
    evidenceRequired: [
      'Identidad del emisor, SPV y custodio bancario de los activos',
      'Prospecto de emisión y contrato marco de derechos del tokenizador',
      'Frecuencia y autor de los informes de auditoría off-chain de reservas',
      'Certificado de titularidad y registro de transacciones con identificación KYC'
    ]
  },
  {
    id: 'daos-governance',
    name: 'DAOs & Gobernanza On-Chain',
    category: 'Infraestructura',
    tag: 'Gobernanza de Protocolos',
    summary: 'Organizaciones Autónomas Descentralizadas donde los tenedores de tokens votan parámetros de riesgo, actualizaciones de código y gestión de tesorería.',
    technical: 'Contratos de votación basados en tokens ERC-20 (estándar OpenZeppelin Governor o Compound GovernorBravo). Las decisiones aprobadas deben atravesar un Timelock Controller (retraso obligatorio de 24h a 48h) antes de ser ejecutadas en la blockchain. Los contratos pueden delegar poderes de emergencia a comités multifirma (Security Council Multisig) para pausar protocolos ante exploits.',
    simple: 'Es la junta de accionistas digital. Todos los que tienen monedas del proyecto pueden votar para cambiar las comisiones, actualizar los programas o decidir en qué se gasta el dinero común.',
    extended: 'La protección crítica para el usuario de DeFi reside en el Timelock: si un cambio perjudicial para los depositantes es aprobado por la gobernanza, el timelock otorga una ventana temporal de horas o días para que los usuarios puedan retirar su capital antes de que el nuevo código entre en vigor. Un protocolo que carezca de timelock o donde una clave individual de administrador pueda modificar contratos instantáneamente debe tratarse operativamente como una entidad centralizada.',
    fiatVsDefi: {
      fiatTrad: 'Juntas generales de accionistas y consejos de administración corporativos con voto por delegación físico o notarial, actas mercantiles privadas y meses para ejecutar acuerdos societarios.',
      defiOnChain: 'Votaciones directas on-chain o por firma criptográfica off-chain (Snapshot/GovernorBravo), ejecución forzada por Timelocks de código y tesorerías públicas auditables en tiempo real.',
      coreDifference: 'Sustitución de jerarquías societarias cerradas por democracia líquida transparente con ejecución directa programable sujeta a quórum matemático.'
    },
    risks: [
      'Ataques de gobernanza con préstamos relámpago (Flash Loan Governance Attacks)',
      'Concentración excesiva de poder de voto en manos de fondos de capital riesgo (VCs)',
      'Ausencia o bypass de timelock que impida a los usuarios salir ante cambios adversos',
      'Responsabilidad legal solidaria de los votantes en jurisdicciones sin forma societaria'
    ],
    keyParameters: [
      { label: 'Mecanismo', value: 'Governor Bravo / OpenZeppelin Governor' },
      { label: 'Timelock', value: '24h a 72h de retardo mandatorio' },
      { label: 'Multifirma', value: 'Safe (Gnosis) M de N firmantes' }
    ],
    regulatoryEU: 'La ausencia de personalidad jurídica mercantil puede derivar en la calificación de los miembros como partícipes de una sociedad colectiva irregular con responsabilidad personal ilimitada.',
    evidenceRequired: [
      'ID de propuesta de gobernanza y hash de votación',
      'Dirección del Timelock y parámetros de ejecución diferida',
      'Distribución de quórum y firmas del comité de seguridad (Security Council)',
      'Histórico de cambios de parámetros del protocolo'
    ]
  },
  {
    id: 'regulatory-eu-mica',
    name: 'Marco MiCA & Regulación UE',
    category: 'Regulación',
    tag: 'Cumplimiento UE 2026',
    summary: 'Reglamento (UE) 2023/1114 que establece el marco normativo armonizado para la emisión, custodia y prestación de servicios de criptoactivos en toda la Unión Europea.',
    technical: 'MiCA divide los criptoactivos en: 1) Fichas de Dinero Electrónico (EMT), que referencian su valor a una única divisa oficial con derecho de reembolso a la par reservado a entidades de crédito o dinero electrónico; 2) Fichas Referenciadas a Activos (ART), respaldadas por cestas o materias primas; y 3) Otros criptoactivos (tokens de utilidad). Los proveedores de servicios (CASP/PSC) requieren autorización formal y segregación estricta de saldos.',
    simple: 'Son las leyes oficiales de la Unión Europea que obligan a las empresas de criptomonedas a pasar controles estrictos, tener reservas auditadas y pedir permiso antes de vender monedas estables.',
    extended: 'Calendario y plazos verificados en España: 1) Aplicación general del régimen de servicios desde el 30 de diciembre de 2024; 2) Fin del periodo transitorio en España fijado para el 1 de julio de 2026; 3) Proveedores que ofrecen transferencia de EMT precisan autorización de servicios de pago del Banco de España (referencia: 1 de marzo de 2026, según CNMV). La interacción con DAC8 (Directiva UE 2023/2226) despliega el intercambio automático de datos tributarios entre Estados Miembros desde 2026.',
    fiatVsDefi: {
      fiatTrad: 'Directivas bancarias tradicionales (CRD IV, MiFID II, PSD2) diseñadas para entidades con oficinas físicas, licencias bancarias nacionales y supervisión por Banco de España o BCE.',
      defiOnChain: 'Reglamento MiCA (UE 2023/1114): primera regulación supranacional integral del mundo que estandariza pasaporte comunitario para CASPs, reserva bancaria segregada para EMTs y libros blancos registrados.',
      coreDifference: 'Paso de un vacío legal fragmentado a un marco unificado en 27 países que exige respaldo bancario real al dinero digital pero respeta el software no custodiado estrictamente descentralizado.'
    },
    risks: [
      'Restricción de operaciones en exchanges para stablecoins no autorizadas bajo EMT',
      'Pérdida de pasaporte europeo para proveedores que no alcancen la licencia CASP antes de julio 2026',
      'Responsabilidad legal por omisión del Travel Rule en transferencias a monederos no custodiados',
      'Discrepancias tributarias automáticas cruzadas entre proveedores de la UE y la Agencia Tributaria'
    ],
    keyParameters: [
      { label: 'Norma Primaria', value: 'Reglamento (UE) 2023/1114 (MiCA)' },
      { label: 'Fin Transitorio ES', value: '1 de julio de 2026' },
      { label: 'Supervisores ES', value: 'CNMV (CASP) y Banco de España (EMT/Pagos)' }
    ],
    regulatoryEU: 'Marco obligatorio de obligado cumplimiento directo en todos los Estados miembros de la UE.',
    evidenceRequired: [
      'Licencia y número de registro CASP del proveedor en la CNMV o supervisor de la UE',
      'Categorización regulatoria del activo (EMT / ART / Fuera de MiCA)',
      'Libro blanco oficial registrado y auditado conforme a los estándares de la ESMA',
      'Contratos de custodia con cláusula de segregación patrimonial explícita'
    ]
  },
  {
    id: 'spain-taxation-models',
    name: 'Fiscalidad en España: Modelos 172, 173 y 721',
    category: 'Regulación',
    tag: 'Hacienda & Trazabilidad',
    summary: 'Obligaciones de información tributaria ante la Agencia Tributaria (AEAT) relativas a saldos, operaciones y tenencia de criptoactivos en el extranjero.',
    technical: 'El marco tributario español se articula en tres modelos específicos: Modelo 172 (declaración anual de saldos a 31 de diciembre para custodios residentes); Modelo 173 (declaración anual de operaciones de compra, venta, permuta y transferencias para intermediarios); y Modelo 721 (declaración informativa de monedas virtuales situadas en el extranjero para personas físicas y jurídicas residentes, con umbral de 50.000 € en el conjunto a 31 de diciembre).',
    simple: 'Las declaraciones que exige Hacienda en España. Si tienes más de 50.000 € en monederos o plataformas fuera de España, tienes que presentar el Modelo 721 entre enero y marzo para informar de lo que posees.',
    extended: 'Las 6 decisiones documentadas obligatorias para tributar correctamente: 1) Método de imputación de costes (FIFO aplicado homogéneamente por activo); 2) Fuente y método de valoración en euros con timestamp UTC exacto; 3) Tratamiento de comisiones de gas (mayor coste de adquisición o menor valor de transmisión); 4) Momento de devengo de recompensas (generación versus disposición efectiva); 5) Registro de permutas cripto-a-cripto (que constituyen ganancia o pérdida patrimonial en España aunque no se toquen euros); y 6) Tratamiento de comisiones e Impermanent Loss en pools de liquidez.',
    fiatVsDefi: {
      fiatTrad: 'En cuentas bancarias tradicionales (Modelo 720), el banco envía automáticamente certificados de retenciones a Hacienda con el IRPF ya deducido sin esfuerzo manual del contribuyente.',
      defiOnChain: 'En DeFi (Modelo 721, IRPF base del ahorro 19%-28%), el usuario es su propio contable: debe calcular FIFO por permuta, convertir comisiones de gas en EUR al minuto exacto y archivar hashes de transacciones.',
      coreDifference: 'La autocustodia otorga soberanía financiera total pero transfiere el 100% de la carga de trazabilidad probatoria y justificación de costes al inversor ante la Agencia Tributaria.'
    },
    risks: [
      'Sanciones severas por omisión o presentación incompleta del Modelo 721',
      'Inspecciones fiscales por discrepancias entre registros personales y el cruce DAC8 / Modelo 173',
      'Pérdida de la trazabilidad del coste histórico de adquisición tras migraciones entre monederos',
      'Doble imposición o cálculo erróneo por clasificar recompensas de staking como rendimiento del capital sin restar comisiones'
    ],
    keyParameters: [
      { label: 'Modelo 721', value: 'Plazo: 1 ene - 31 mar (Umbral: 50.000 €)' },
      { label: 'Modelos 172 y 173', value: 'Mes de enero (Custodios e intermediarios)' },
      { label: 'Criterio Base', value: 'Método FIFO homogéneo por moneda' }
    ],
    regulatoryEU: 'Armonizado progresivamente con el estándar CARF de la OCDE y la Directiva europea DAC8 para intercambio automático de datos.',
    evidenceRequired: [
      'Extractos de operaciones completos exportados en CSV/PDF antes de que caduquen',
      'Libro diario de operaciones con los 5 campos de conciliación (importe, comisión, hora UTC, hash, activo)',
      'Justificantes bancarios de origen y destino de fondos fiduciarios',
      'Valoraciones oficiales en euros con fuente de precio fehaciente'
    ],
    links: [
      { label: 'Sede AEAT - Modelo 721', url: 'https://sede.agenciatributaria.gob.es/Sede/procedimientoini/GI56.shtml', type: 'regulation', desc: 'Presentación telemática del Modelo 721 oficial.' },
      { label: 'Modelos 172 y 173 AEAT', url: 'https://sede.agenciatributaria.gob.es/Sede/procedimientoini/GI54.shtml', type: 'regulation', desc: 'Obligaciones informativas para custodios en España.' },
      { label: 'Directiva Europea DAC8', url: 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023L2226', type: 'regulation', desc: 'Intercambio automático de información tributaria UE.' }
    ]
  },
  {
    id: 'account-abstraction',
    name: 'Abstracción de Cuentas (ERC-4337)',
    category: 'Infraestructura',
    tag: 'Smart Wallets & UX',
    summary: 'Evolución de las cuentas tradicionales EOA hacia contratos inteligentes que permiten firmas biométricas, recuperación social y pago de gas por terceros (Paymasters).',
    technical: 'Arquitectura ERC-4337 basada en un mempool alternativo de UserOperations sin modificar la capa de consenso L1. Los Bundlers agrupan operaciones y llaman al contrato canónico EntryPoint. Los Paymasters patrocinan o cobran gas en stablecoins ERC-20, y los contratos de wallet validan firmas multifactor (Passkeys WebAuthn P-256).',
    simple: 'Es hacer que tu cuenta funcione como una app de banca moderna: puedes entrar con tu huella dactilar o FaceID, recuperar tu cuenta si pierdes el móvil sin frases semilla de 12 palabras, y pagar las comisiones en euros o dólares.',
    extended: 'La Abstracción de Cuentas resuelve el mayor escollo de adopción masiva y seguridad en Web3: la tiranía de la frase semilla (seed phrase). Al sustituir las cuentas EOA (externally owned accounts) por contratos ejecutables, se pueden programar límites de gasto diario, transferencias automáticas por suscripción, congelación temporal ante actividad anómala y delegación de permisos a módulos seguros.',
    fiatVsDefi: {
      fiatTrad: 'Cuentas corrientes bancarias con login de usuario/contraseña, recuperación por DNI o atención telefónica, pero donde el banco puede bloquear fondos o imponer límites arbitrarios.',
      defiOnChain: 'Smart Accounts (ERC-4337, Safe) que admiten Passkeys biométricas y recuperación social por amigos o dispositivos de confianza sin ceder la custodia a un banco ni depender de 12 palabras escritas en papel.',
      coreDifference: 'Combina la facilidad de uso y recuperación de la banca moderna tradicional con la soberanía técnica no censurable de la autocustodia descentralizada.'
    },
    risks: [
      'Vulnerabilidad en contratos de wallet o módulos de recuperación social no auditados',
      'Dependencia de la infraestructura de Bundlers y Paymasters para el retransmisión',
      'Costes de despliegue inicial del contrato de la cuenta en redes con alto gas',
      'Riesgos de phishing dirigidos a los guardianes designados para la recuperación'
    ],
    keyParameters: [
      { label: 'Estándar', value: 'ERC-4337 / ERC-7579 Modular' },
      { label: 'Firmas', value: 'WebAuthn Passkeys / Secp256r1' },
      { label: 'Patrocinio Gas', value: 'Paymasters ERC-20 / Gratis' }
    ],
    regulatoryEU: 'Facilita el cumplimiento de auditoría y controles de límites de transferencias exigidos por normativas bancarias corporativas.',
    evidenceRequired: [
      'Dirección del contrato de la smart account y hash de creación',
      'Configuración de guardianes de recuperación y timelocks',
      'Contratos de Paymasters autorizados para cobro de gas',
      'Registro de UserOperations ejecutadas en el EntryPoint'
    ],
    links: [
      { label: 'Especificación Oficial ERC-4337', url: 'https://eips.ethereum.org/EIPS/eip-4337', type: 'docs', desc: 'Estándar técnico oficial de Account Abstraction en Ethereum.' },
      { label: 'Safe Smart Accounts (Gnosis Safe)', url: 'https://safe.global', type: 'dapp', desc: 'Plataforma líder de cuentas programables y custodia multifirma.' },
      { label: 'Biconomy Account Abstraction SDK', url: 'https://www.biconomy.io', type: 'docs', desc: 'Infraestructura de Paymasters y Bundlers para dApps.' }
    ]
  },
  {
    id: 'layer2-rollups',
    name: 'Rollups & Capas 2 (ZK & Optimistic)',
    category: 'Infraestructura',
    tag: 'Escalabilidad L2',
    summary: 'Redes de ejecución secundaria que procesan transacciones fuera de la cadena principal de Ethereum y publican pruebas criptográficas o de fraude en L1.',
    technical: 'Dos arquitecturas cardinales: 1) Optimistic Rollups (Arbitrum One, Optimism, Base), que asumen validez transaccional y aplican una ventana de desafío de 7 días para pruebas de fraude; 2) Zero-Knowledge Rollups (zkSync, Starknet, Scroll), que generan pruebas de validez matemática instantáneas (ZK-SNARKs/STARKs). Ambas emplean blobs de datos transitorios (EIP-4844) para abaratar el coste de gas en un 95%.',
    simple: 'Es como una autopista de peaje rápido construida encima de la carretera principal. Cientos de coches viajan juntos en un tren bala y solo presentan el billete final en la aduana de Ethereum.',
    extended: 'El análisis de seguridad de un Rollup debe medirse por su "Fase de Madurez" (Stage 0, 1 o 2 en L2Beat). La mayoría de L2 actuales operan con secuenciadores centralizados y comités de seguridad (Security Council) con llaves multifirma que pueden actualizar el código. La descentralización real se alcanza en Stage 2, donde el código de pruebas de fraude es inmutable y no existen puertas traseras de intervención humana.',
    fiatVsDefi: {
      fiatTrad: 'Sistemas de pagos minoristas centralizados (Visa, Mastercard, Bizum) procesando miles de transacciones por segundo sobre bases de datos bancarias privadas sujetas a reversión y comisiones de pasarela.',
      defiOnChain: 'Capas 2 (Arbitrum, Base, ZK-Rollups) ejecutando miles de transacciones a fracciones de céntimo que se liquidan y anclan con pruebas criptográficas matemáticas en la capa base de Ethereum L1.',
      coreDifference: 'Velocidad transaccional masiva de escala comercial preservando la seguridad descentralizada y resistencia a la censura de la red principal de liquidación.'
    },
    risks: [
      'Punto único de fallo o censura transitoria por secuenciadores centralizados',
      'Poderes de intervención inmediata de comités de seguridad multifirma',
      'Complejidad algorítmica y bugs potenciales en los circuitos criptográficos ZK',
      'Retardo de 7 días para retiradas canónicas a L1 en Optimistic Rollups'
    ],
    keyParameters: [
      { label: 'Tipos', value: 'Optimistic vs ZK-Rollup' },
      { label: 'Retirada Canónica', value: '7 días (Optimistic) vs < 1h (ZK)' },
      { label: 'Ahorro de Gas', value: '90% - 99% gracias a EIP-4844 blobs' }
    ],
    regulatoryEU: 'La interoperabilidad y custodia en puentes de L2 se somete a los requisitos de trazabilidad del Travel Rule europeo.',
    evidenceRequired: [
      'Contratos de liquidación y rollup bridge en Ethereum L1',
      'Identificador de transacción en el explorador L2 y en L1',
      'Evaluación del estadio de madurez del secuenciador según L2Beat',
      'Certificados de auditoría de los circuitos de validez ZK'
    ],
    links: [
      { label: 'L2Beat (Monitor de Riesgo & TVL L2)', url: 'https://l2beat.com', type: 'analytics', desc: 'Análisis exhaustivo de riesgos de centralización, gobernanza y TVL de todas las Capas 2.' },
      { label: 'Arbitrum Portal & Puente', url: 'https://arbitrum.io', type: 'official', desc: 'El rollup de Ethereum con mayor TVL y volumen DeFi.' },
      { label: 'Optimism Superchain Portal', url: 'https://optimism.io', type: 'official', desc: 'Red de cadenas L2 interoperables basadas en OP Stack.' }
    ]
  },
  {
    id: 'dex-aggregators',
    name: 'Agregadores DEX & Subastas CoW',
    category: 'DeFi Core',
    tag: 'Enrutamiento MEV',
    badge: 'Mejor Ejecución On-Chain',
    summary: 'Protocolos que escanean decenas de pools de liquidez y oráculos para dividir órdenes y encontrar el precio más óptimo protegiendo al usuario de ataques de arbitraje.',
    technical: 'Algoritmos de búsqueda de rutas óptimas (Pathfinding) que dividen un swap único entre múltiples DEXes simultáneamente (Uniswap, Curve, Balancer). Protocolos como CowSwap o UniswapX sustituyen el modelo de transacción directa por "Intents" (intenciones de trading firmadas off-chain), permitiendo que solucionadores independientes (Solvers) compitan por ejecutar la orden en subastas por lotes protegiendo contra MEV.',
    simple: 'Es el buscador de vuelos baratos de las criptomonedas. Compara todas las casas de cambio al mismo tiempo y divide tu pedido para darte la mayor cantidad de monedas posible sin que los robots te roben comisiones por el camino.',
    extended: 'El enrutamiento inteligente elimina el problema de la fragmentación de liquidez. Si un usuario desea comprar 500.000 € de un token, lanzarlo contra un único pool generaría un deslizamiento (slippage) del 8%. El agregador reparte la orden: 40% en Uniswap V3, 35% en Curve y 25% mediante subasta de CoW (Coincidence of Wants), minimizando el impacto en el precio a menos del 0.2%.',
    fiatVsDefi: {
      fiatTrad: 'Sistemas de enrutamiento de brokers tradicionales (Smart Order Routing en bolsa) y Payment for Order Flow (PFOF) donde los brokers venden las órdenes de clientes a market makers mayoristas obteniendo márgenes opacos.',
      defiOnChain: 'Agregadores abiertos (1inch, CowSwap) que dividen públicamente la orden en subastas competitivas por lotes, eliminando el arbitraje perjudicial de MEV mediante intenciones (Intents) firmadas sin custodia.',
      coreDifference: 'Transparencia algorítmica verificable de mejor ejecución (Best Execution) sin acuerdos comerciales ocultos de intermediarios.'
    },
    risks: [
      'Vulnerabilidad en los contratos intermediarios de aprobación de tokens del agregador',
      'Falsas rutas o tokens señuelo en agregadores sin listas de verificación estrictas',
      'Retardo en la resolución de órdenes de intents durante picos extremos de volatilidad',
      'Coste acumulado de gas si se aprueban contratos de enrutamiento innecesarios'
    ],
    keyParameters: [
      { label: 'Modelos', value: 'Split Routing / Batch Auctions (CoW) / RFQ' },
      { label: 'Protección MEV', value: 'Blindaje contra Sandwich y Front-running' },
      { label: 'Comisión Típica', value: '0% extra (monetizado por spread o solvers)' }
    ],
    regulatoryEU: 'Obligación de mejor ejecución aplicable análogamente a los principios de Best Execution de MiFID II en servicios financieros.',
    evidenceRequired: [
      'Informe de ruta de ejecución y desglose de pools empleados',
      'Slippage configurado versus deslizamiento real ejecutado',
      'Comprobación de firma de intent EIP-712',
      'Registro de ahorro de precio obtenido frente a pools individuales'
    ],
    links: [
      { label: 'CowSwap (Agregador MEV-Protected)', url: 'https://swap.cow.fi', type: 'dapp', desc: 'Intercambio mediante Coincidence of Wants con protección total contra sandwich attacks.' },
      { label: '1inch Network Aggregator', url: 'https://app.1inch.io', type: 'dapp', desc: 'El agregador pionero de liquidez con enrutamiento Pathfinder multicadena.' },
      { label: 'DefiLlama DEX Volume & Swaps', url: 'https://defillama.com/dexs', type: 'analytics', desc: 'Comparativa de volumen y cuota de mercado de agregadores.' }
    ]
  },
  {
    id: 'defi-insurance',
    name: 'Seguros Descentralizados & Cobertura Mutual',
    category: 'DeFi Core',
    tag: 'Protección de Fondos',
    summary: 'Fondos mutualizados de capital que ofrecen pólizas y coberturas on-chain contra exploits de smart contracts, fallos de oráculos y quiebras de stablecoins.',
    technical: 'Modelos de suscripción mutua gobernados por DAOs (Nexus Mutual, InsurAce). Los proveedores de capital apuestan sus tokens en pools de riesgo de protocolos específicos a cambio de primas periódicas. Ante un incidente, un panel de evaluadores de reclamos (Claim Assessors) vota con incentivos económicos la procedencia del pago indemnizatorio según pruebas on-chain.',
    simple: 'Es un seguro de coche para tus inversiones digitales. Pagas una pequeña cuota al mes y, si el programa informático de la plataforma que usas sufre un hackeo o la moneda pierde su valor, la mutualidad te reembolsa los fondos perdidos.',
    extended: 'La industria aseguradora en DeFi soluciona la desconfianza del usuario frente al riesgo de software. A diferencia de las aseguradoras tradicionales con largos pleitos judiciales, los protocolos de cobertura operan con condiciones predeterminadas: si una stablecoin pierde su paridad por debajo de 0.85 USD durante más de 72 horas consecutivas comprobado por oráculos, el pago de la cobertura se desbloquea de forma automática.',
    fiatVsDefi: {
      fiatTrad: 'Compañías aseguradoras tradicionales (Allianz, Mapfre) con pólizas complejas de letra pequeña, evaluación unilateral de siniestros, litigios judiciales de años y reservas invertidas en deuda opaca.',
      defiOnChain: 'Mutualidades descentralizadas (Nexus Mutual) y seguros paramétricos donde las condiciones de pago son transparentes en contratos inteligentes y los reclamos se liquidan rápidamente con pruebas on-chain.',
      coreDifference: 'Sustitución de la discrecionalidad pericial de aseguradoras privadas por parámetros matemáticos auditables y cobertura específica contra fallos de código.'
    },
    risks: [
      'Insolvencia del pool de cobertura si ocurre un evento catastrófico sistémico simultáneo',
      'Denegación de reclamo por parte de los evaluadores si el ataque no encaja en la póliza',
      'Periodos de carencia mandatorios entre la contratación y la efectividad del seguro',
      'Iliquidez temporal para retirar el capital depositado por los proveedores de cobertura'
    ],
    keyParameters: [
      { label: 'Modelos', value: 'Discretionary Mutual / Parametric Smart Contracts' },
      { label: 'Coste Póliza', value: '1.5% - 5.0% anual sobre el capital asegurado' },
      { label: 'Votación Reclamos', value: 'Staking y verificación de reclamos on-chain' }
    ],
    regulatoryEU: 'Distinción jurídica estricta entre mutua discrecional Web3 y seguro privado tradicional regulado bajo Solvencia II.',
    evidenceRequired: [
      'Certificado digital de cobertura (NFT de póliza de Nexus Mutual o similar)',
      'Términos y eventos amparados (código del contrato, oráculo, depeg)',
      'Hash de la transacción de pago de la prima y periodo de vigencia',
      'Documentación técnica del exploit aportada al expediente de reclamo'
    ],
    links: [
      { label: 'Nexus Mutual Official Portal', url: 'https://nexusmutual.io', type: 'dapp', desc: 'La principal mutualidad descentralizada de cobertura contra riesgos de contratos.' },
      { label: 'InsurAce Protocol DApp', url: 'https://app.insurace.io', type: 'dapp', desc: 'Cobertura multicadena para plataformas de lending, puentes y exchanges.' },
      { label: 'DefiLlama Insurance Sector', url: 'https://defillama.com/protocols/insurance', type: 'analytics', desc: 'Seguimiento del capital asegurado y reservas de pólizas en DeFi.' }
    ]
  },
  {
    id: 'stablecoins-mica-emt',
    name: 'Stablecoins MiCA (Fichas EMT & ART)',
    category: 'Regulación',
    tag: 'Dinero Digital UE',
    summary: 'Régimen europeo de dinero electrónico tokenizado (EMT) y activos referenciados (ART) bajo el Reglamento (UE) 2023/1114 con reserva bancaria supervisada.',
    technical: 'Clasificación regulatoria oficial de la UE: 1) E-Money Tokens (EMT), que referencian su valor a una única divisa fiduciaria oficial (ej. EURC o USDC) y otorgan derecho directo de reembolso nominal 1:1 en fondos de curso legal custodiados al menos en un 30-60% en entidades de crédito de la UE; 2) Asset-Referenced Tokens (ART), respaldados por cestas de activos.',
    simple: 'Las monedas estables oficiales autorizadas en Europa. Las empresas que las emiten tienen que tener el 100% de los euros guardados en bancos vigilados por los gobiernos, y tienen la obligación de devolverte tu dinero si lo pides.',
    extended: 'El Reglamento MiCA prohíbe taxativamente la remuneración pasiva o pago de intereses directos a tenedores de stablecoins EMT o ART por el mero hecho de poseerlas (artículo 50 y 40). Asimismo, impone límites cuantitativos diarios estrictos a las transacciones como medio de cambio en divisas no comunitarias (máximo 200 millones de euros diarios en la zona euro para stablecoins en dólares como USDT).',
    fiatVsDefi: {
      fiatTrad: 'Depósitos bancarios cubiertos por el Fondo de Garantía de Depósitos (FGD hasta 100.000 €), donde el banco utiliza el 90%+ del saldo para conceder créditos con reserva fraccionaria.',
      defiOnChain: 'Fichas EMT autorizadas bajo MiCA (Circle EURC) respaldadas al 100% por efectivo segregado en entidades de crédito comunitarias e instrumentos del tesoro, transferibles 24/7 sin límites de horario bancario.',
      coreDifference: 'Reserva íntegra auditada mensualmente con derecho de rescate legal garantizado 1:1, frente a la reserva fraccionaria vulnerable a pánicos bancarios tradicionales.'
    },
    risks: [
      'Deslistado forzoso en exchanges europeos (CASP) de stablecoins no conformes con MiCA',
      'Concentración de reservas en entidades bancarias expuestas a riesgo de quiebra',
      'Bloqueo preventivo de direcciones por requerimientos regulatorios de supervisores',
      'Restricciones transitorias a la emisión o reembolso durante crisis bancarias sistémicas'
    ],
    keyParameters: [
      { label: 'Normativa', value: 'Reglamento (UE) 2023/1114 (MiCA Título III y IV)' },
      { label: 'Reserva Bancaria', value: '30% - 60% en entidades de crédito autorizadas UE' },
      { label: 'Intereses', value: 'Prohibición expresa de devengo de intereses pasivos' }
    ],
    regulatoryEU: 'Plena aplicación para emisores de EMT y ART desde el 30 de junio de 2024 en toda la Unión Europea.',
    evidenceRequired: [
      'Libro blanco oficial aprobado y registrado ante la ESMA y supervisor nacional',
      'Licencia bancaria o de Entidad de Dinero Electrónico (EDE) del emisor',
      'Informes mensuales de reservas custodiadas y segregadas por entidades autorizadas',
      'Condiciones contractuales de rescate a la par garantizadas al portador'
    ],
    links: [
      { label: 'Circle EURC Portal Oficial (MiCA EMT)', url: 'https://www.circle.com/en/eurc', type: 'official', desc: 'La primera stablecoin en euros con licencia formal conforme a MiCA en la UE.' },
      { label: 'Texto MiCA en EUR-Lex', url: 'https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32023R1114', type: 'regulation', desc: 'Normativa comunitaria completa de la Unión Europea sobre mercados de criptoactivos.' },
      { label: 'Registro de Emisores de la ESMA', url: 'https://www.esma.europa.eu', type: 'regulation', desc: 'Lista pública oficial de emisores autorizados de fichas EMT y ART.' }
    ]
  }
];

export const AMM_COMPARISON_DATA = [
  { priceDeviation: '-60%', ilV2: -9.8, ilV3Concentrated: -38.5, feeYield: 14.0, netV2: 4.2, netV3: -24.5 },
  { priceDeviation: '-40%', ilV2: -4.3, ilV3Concentrated: -16.2, feeYield: 14.0, netV2: 9.7, netV3: -2.2 },
  { priceDeviation: '-20%', ilV2: -1.1, ilV3Concentrated: -3.8, feeYield: 14.0, netV2: 12.9, netV3: 10.2 },
  { priceDeviation: '0%', ilV2: 0.0, ilV3Concentrated: 0.0, feeYield: 14.0, netV2: 14.0, netV3: 14.0 },
  { priceDeviation: '+20%', ilV2: -0.9, ilV3Concentrated: -3.4, feeYield: 14.0, netV2: 13.1, netV3: 10.6 },
  { priceDeviation: '+40%', ilV2: -3.1, ilV3Concentrated: -12.8, feeYield: 14.0, netV2: 10.9, netV3: 1.2 },
  { priceDeviation: '+60%', ilV2: -6.0, ilV3Concentrated: -27.5, feeYield: 14.0, netV2: 8.0, netV3: -13.5 },
  { priceDeviation: '+100%', ilV2: -12.4, ilV3Concentrated: -55.0, feeYield: 14.0, netV2: 1.6, netV3: -41.0 }
];

export const RISK_DIMENSIONS_DATA = [
  { dimension: '1. Mercado', score: 85, metric: 'Volatilidad & Correlación', desc: 'Riesgo de devaluación del activo y correlación hacia 1 en momentos de estrés.' },
  { dimension: '2. Contraparte', score: 70, metric: 'Custodia & Crédito', desc: 'Solvencia del emisor de stablecoin, exchange o puente ante insolvencia.' },
  { dimension: '3. Smart Contract', score: 75, metric: 'Auditorías & Proxies', desc: 'Bugs en código, dependencias externas y poderes de administración sin timelock.' },
  { dimension: '4. Stablecoin', score: 80, metric: 'Reservas & Depeg', desc: 'Calidad del colateral off-chain o sobrecolateralización algorítmica y censura.' },
  { dimension: '5. Operativo', score: 65, metric: 'Claves & Enrutado', desc: 'Errores en red, nonce, slips, pérdida de semillas y fallos de proceso humano.' },
  { dimension: '6. Ciberseguridad', score: 90, metric: 'Phishing & Drenadores', desc: 'Aprobaciones ilimitadas activas, malware en portapapeles y firma ciega.' },
  { dimension: '7. Legal / Fiscal', score: 85, metric: 'MiCA & Modelos AEAT', desc: 'Incumplimiento de licencias, modelos 172/173/721 y pérdida de deducciones.' },
  { dimension: '8. Concentración', score: 78, metric: 'Dependencia de Eslabón', desc: 'Exposición excesiva a un único oráculo, puente, red o firmante único.' }
];

export const REGULATORY_CHECKLIST = [
  { id: 'c1', title: 'Verificación de Licencia CASP / MiCA', desc: 'Comprobar si el proveedor está formalmente autorizado por CNMV / supervisor UE o acogido al régimen transitorio.', mandatory: true },
  { id: 'c2', title: 'Clasificación de Stablecoins (EMT / ART)', desc: 'Validar si la moneda cuenta con autorización de dinero electrónico (EMT) con derecho a reembolso nominal garantizado.', mandatory: true },
  { id: 'c3', title: 'Umbral del Modelo 721 AEAT (> 50.000 €)', desc: 'Revisar saldo agregado al 31 de diciembre en monederos y plataformas radicadas en el exterior.', mandatory: true },
  { id: 'c4', title: 'Revisión Periódica de Aprobaciones (Allowances)', desc: 'Escanear contratos con aprobación infinita de gasto y revocar permisos innecesarios.', mandatory: true },
  { id: 'c5', title: 'Conciliación de los 5 Campos de Operación', desc: 'Guardar para cada transacción: importe neto, comisión, timestamp UTC, hash on-chain y contrato del activo.', mandatory: true },
  { id: 'c6', title: 'Plan de Contingencia y Sucesión de Claves', desc: 'Documentar la ubicación física del respaldo de semillas y el procedimiento de recuperación sin exponer las claves.', mandatory: true }
];
