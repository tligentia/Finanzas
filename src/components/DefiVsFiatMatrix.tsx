import React, { useState } from 'react';
import { 
  Scale, Landmark, Cpu, ArrowRightLeft, ShieldCheck, 
  Clock, Eye, DollarSign, AlertTriangle, CheckCircle2, 
  Layers, Lock, Globe, FileText, Zap, ChevronRight,
  TrendingDown, RefreshCw, Activity, Sparkles, Compass
} from 'lucide-react';

export interface ComparisonDimension {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  fiat: {
    title: string;
    actor: string;
    mechanism: string;
    pros: string[];
    cons: string[];
    risk: string;
    example: string;
  };
  defi: {
    title: string;
    actor: string;
    mechanism: string;
    pros: string[];
    cons: string[];
    risk: string;
    example: string;
  };
  coreDifference: string;
  metricComparison: { label: string; fiatVal: string; defiVal: string };
}

export const COMPARISON_DIMENSIONS: ComparisonDimension[] = [
  {
    id: 'emision',
    title: 'Emisión y Política Monetaria',
    subtitle: 'Decisión política y discrecional vs Regla algorítmica inmutable',
    icon: <Landmark className="text-red-700" size={24} />,
    fiat: {
      title: 'Moneda Fiduciaria (Fiat)',
      actor: 'Bancos Centrales (Fed, BCE, BoJ)',
      mechanism: 'Emisión discrecional no respaldada, fijación artificial de tipos de interés mediante comités políticos, flexibilización cuantitativa (QE) y expansión de balance para financiar gasto público.',
      pros: [
        'Elasticidad para responder a emergencias o guerras',
        'Capacidad de rescate como prestamista de última instancia',
        'Estabilidad nominal a corto plazo en economías desarrolladas'
      ],
      cons: [
        'Dilución continua del poder adquisitivo (inflación monetaria)',
        'Efecto Cantillon: el nuevo dinero beneficia primero a los bancos y estados',
        'Suministro potencialmente infinito sin límite legal'
      ],
      risk: 'Devaluación monetaria, estanflación y pérdida de confianza en la unidad de cuenta.',
      example: 'El balance del BCE y la Reserva Federal creció más del 400% entre 2008 y 2022, provocando picos inflacionarios globales.'
    },
    defi: {
      title: 'Criptoactivos & Stablecoins',
      actor: 'Protocolos de Consenso y Smart Contracts',
      mechanism: 'Emisión matemática predeterminada (halvings de Bitcoin limitados a 21M, quema EIP-1559 en Ethereum, o colateralización 1:1 en Stablecoins auditadas como USDC/EURC).',
      pros: [
        'Escasez digital matemática absolutamente verificable',
        'Imposibilidad de alterar las reglas de emisión sin consenso total',
        'Transparencia total de emisión bloque a bloque en la blockchain'
      ],
      cons: [
        'Rigidez: no puede expandirse arbitrariamente en recesiones',
        'Volatilidad de precio durante la fase de monetización/adopción',
        'Dependencia de la paridad en stablecoins colateralizadas'
      ],
      risk: 'Volatilidad del activo subyacente y riesgo de desvinculación (depeg) en stablecoins mal respaldadas.',
      example: 'Bitcoin tiene programado su último Satoshi para el año 2140; ningún gobierno puede imprimir un Bitcoin adicional.'
    },
    coreDifference: 'En Fiat, el valor y la cantidad de dinero dependen de la confianza en gobernantes humanos; en DeFi, dependen de leyes criptográficas y matemáticas inmutables.',
    metricComparison: { label: 'Previsibilidad de Suministro', fiatVal: 'Discrecional (0% a 25% anual)', defiVal: 'Matemática (Fija / Desinflacionaria)' }
  },
  {
    id: 'custodia',
    title: 'Custodia y Derechos de Propiedad',
    subtitle: 'Acreedor de una entidad bancaria vs Dueño absoluto por clave criptográfica',
    icon: <Lock className="text-red-700" size={24} />,
    fiat: {
      title: 'Custodia Bancaria / Intermediada',
      actor: 'Bancos Comerciales y Entidades de Crédito',
      mechanism: 'El dinero depositado en cuenta corriente pasa a ser propiedad legal del banco; el cliente tiene únicamente un derecho de crédito (es un acreedor del banco con garantía del Fondo de Garantía hasta 100.000€).',
      pros: [
        'Recuperación de contraseñas y soporte telefónico al cliente',
        'Seguro estatal de depósitos (hasta 100k€ por titular)',
        'Facilidad de uso para usuarios que no desean gestionar seguridad'
      ],
      cons: [
        'Riesgo de bloqueo administrativo, corralitos o embargos judiciales',
        'Riesgo de insolvencia de la entidad bancaria (Bail-in)',
        'Límites arbitrarios para retirar o transferir el propio dinero'
      ],
      risk: 'Quiebra bancaria con pérdidas por encima de 100.000€ y censura transaccional unilateral.',
      example: 'En la quiebra de Silicon Valley Bank (2023) o en el corralito de Chipre (2013), los depositantes descubrieron que no eran dueños de su dinero.'
    },
    defi: {
      title: 'Autocustodia (Self-Custody)',
      actor: 'Usuario final mediante Claves Privadas / Hardware Wallets',
      mechanism: 'Las claves privadas cifran y autorizan las transferencias directamente en la blockchain (Ledger, Trezor, Safe, Rabby). Si tienes la clave privada, tienes la soberanía completa e inembargable de los fondos.',
      pros: [
        'Propiedad directa sin intermediarios: nadie puede congelar tu saldo',
        'Disponibilidad total en cualquier lugar del mundo con tu frase semilla',
        'Imposibilidad de rescate forzoso o censura por terceros'
      ],
      cons: [
        'Responsabilidad absoluta: si pierdes tus claves o caes en phishing, no hay soporte',
        'Sin fondo de garantía estatal de depósitos',
        'Exige disciplina de seguridad contra aprobaciones ilimitadas'
      ],
      risk: 'Pérdida irrecuperable por negligencia en la custodia de claves o firma ciega de contratos maliciosos.',
      example: 'Una wallet fría Ledger o una cuenta multisig Safe solo puede mover fondos si se pulsan físicamente sus botones de autorización.'
    },
    coreDifference: 'En el banco, eres un acreedor que pide permiso para retirar; en DeFi, eres tu propio banco y custodio soberano de tu patrimonio.',
    metricComparison: { label: 'Riesgo de Confiscación de Fondos', fiatVal: 'Posible por decreto o quiebra', defiVal: 'Matemáticamente Imposible sin tu clave' }
  },
  {
    id: 'settlement',
    title: 'Compensación y Liquidación (Settlement)',
    subtitle: 'Liquidación diferida T+1 / T+2 con cámaras vs Asentamiento atómico T+0',
    icon: <Zap className="text-red-700" size={24} />,
    fiat: {
      title: 'Compensación Tradicional',
      actor: 'Cámaras de Compensación (DTCC, Iberclear, Euroclear, SWIFT)',
      mechanism: 'La compra de un activo se concilia a través de múltiples intermediarios. El dinero y el título no se intercambian de inmediato sino tras T+1 o T+2 días hábiles tras una red compleja de neteo.',
      pros: [
        'Posibilidad teórica de revertir operaciones fraudulentas o erróneas',
        'Marcos legales de protección al consumidor y arbitraje judicial',
        'Familiaridad operativa para instituciones reguladas'
      ],
      cons: [
        'Riesgo de contraparte durante los días de tránsito (Settlement Risk)',
        'Cierres de mercado en fines de semana y festivos',
        'Enormes costes operativos trasladados al usuario en comisiones'
      ],
      risk: 'Fallo de una contraparte durante el periodo de liquidación (quiebra de Lehman Brothers en 2008).',
      example: 'Comprar una acción de Apple en bolsa tarda 1 o 2 días laborables en ser realmente inscrita a tu nombre en el depositario central.'
    },
    defi: {
      title: 'Liquidación Atómica On-Chain',
      actor: 'Máquina Virtual y Consenso Distribuido (EVM, SVM)',
      mechanism: 'Entrega contra Pago (Delivery vs Payment) en una sola transacción atómica. O se transfieren ambos activos o la transacción revierte por completo. La finalidad se alcanza en segundos.',
      pros: [
        'Finalidad absoluta T+0: el intercambio es instantáneo e irreversible',
        'Cero riesgo de contraparte: no hay posibilidad de que uno entregue y el otro no',
        'Operativo 24/7/365 sin pausas por festivos ni cierres de sesión'
      ],
      cons: [
        'Irreversibilidad: las operaciones erróneas o transferencias equivocadas no pueden deshacerse',
        'Posibilidad de saturación de red con incremento temporal del coste de gas',
        'Riesgo de reorganización de bloques en cadenas con baja finalidad'
      ],
      risk: 'Envío de fondos a direcciones erróneas sin posibilidad de retrocesión.',
      example: 'En Uniswap, intercambias 10.000 USDC por ETH en 12 segundos; al confirmarse el bloque, el ETH está 100% en tu poder sin deudas pendientes.'
    },
    coreDifference: 'En Fiat, las operaciones tardan días en liquidarse con riesgo de contraparte; en DeFi, la liquidación es atómica e inmediata en el mismo bloque.',
    metricComparison: { label: 'Tiempo de Liquidación Final', fiatVal: '24 a 48 horas hábiles (T+1/T+2)', defiVal: '2 a 15 segundos (T+0 instantáneo)' }
  },
  {
    id: 'solvencia',
    title: 'Modelo de Solvencia y Crédito',
    subtitle: 'Reserva fraccionaria y rescates públicos vs Sobre-colateralización estricta',
    icon: <Scale className="text-red-700" size={24} />,
    fiat: {
      title: 'Reserva Fraccionaria',
      actor: 'Sistema Bancario Comercial',
      mechanism: 'Por cada 100€ depositados, el banco solo mantiene una fracción en reserva (1% en el BCE) y presta el resto varias veces mediante el multiplicador bancario. La solvencia depende del flujo continuo de repagos y de la fe colectiva.',
      pros: [
        'Permite conceder hipotecas y créditos sin necesidad de aportar el 100% en fianza',
        'Acelera la inversión de capital en proyectos a largo plazo',
        'Respaldo estatal en última instancia (Bailouts con dinero público)'
      ],
      cons: [
        'Insolvencia estructural si todos los clientes reclaman su dinero al mismo tiempo',
        'Riesgo moral: los bancos asumen riesgos excesivos sabiendo que el Estado los rescatará',
        'Creación artificial de deuda que infla burbujas de activos'
      ],
      risk: 'Pánico bancario (Bank Run) y quiebra del banco por iliquidez o caída de bonos de balance.',
      example: 'Si solo el 15% de los clientes de cualquier banco comercial acude hoy al cajero a retirar efectivo, el banco entra en quiebra inmediata.'
    },
    defi: {
      title: 'Sobre-colateralización Algorítmica',
      actor: 'Protocolos de Lending (Aave, Morpho, MakerDAO/Sky)',
      mechanism: 'Para pedir prestados 100€ en stablecoins, el usuario debe bloquear en el contrato inteligente entre 130€ y 150€ en activos (colateral). El sistema nunca presta más dinero del que existe en garantía física digital.',
      pros: [
        'Solvencia matemática garantizada: el protocolo siempre tiene más activos que deuda',
        'Imposibilidad de quiebra por pánico bancario: cada dólar prestado está respaldado',
        'Sin rescates con dinero público ni riesgo moral'
      ],
      cons: [
        'Menor eficiencia de capital: no permite créditos sin garantías previas',
        'Riesgo de liquidación forzosa si el precio del colateral cae por debajo del umbral',
        'Inaccesible para quien necesita financiación pura sin ahorro previo'
      ],
      risk: 'Venta forzosa de la garantía con penalización del 5-10% si el Factor de Salud cae de 1.0.',
      example: 'En Aave, para tomar un préstamo de 5.000 USDC debes depositar 7.500$ en ETH; si ETH cae, bots liquidan una parte para que el prestamista cobre el 100%.'
    },
    coreDifference: 'El sistema Fiat crea crédito sin respaldo suficiente arriesgando el dinero de los depositantes; DeFi exige que toda deuda esté sobre-garantizada con activos reales.',
    metricComparison: { label: 'Ratio de Cobertura de Fondos', fiatVal: '1% a 10% (Reserva Fraccionaria)', defiVal: '120% a 160% (Sobre-colateral)' }
  },
  {
    id: 'horarios',
    title: 'Horarios, Fronteras y Accesibilidad',
    subtitle: 'Ventanilla bancaria restringida vs Finanzas globales 24/7 sin fronteras',
    icon: <Globe className="text-red-700" size={24} />,
    fiat: {
      title: 'Sistema Cerrado & Permisionado',
      actor: 'Redes Bancarias Nacionales y SWIFT',
      mechanism: 'La operativa está restringida al horario bancario laboral (lunes a viernes, 9:00 a 17:00). Las transferencias internacionales cruzan aduanas monetarias, bancos corresponsales y controles de capital.',
      pros: [
        'Control estricto contra el blanqueo de capitales internacional',
        'Posibilidad de frenar transacciones sospechosas antes de su ejecución',
        'Atención personalizada presencial en oficinas físicas'
      ],
      cons: [
        'Mercados cerrados durante el 70% del tiempo semanal',
        'Costes abusivos de conversión de divisa (hasta un 3-5% en banca tradicional)',
        'Exclusión bancaria: más de 1.400 millones de personas sin acceso a cuentas'
      ],
      risk: 'Falta de liquidez o imposibilidad de operar ante caídas bursátiles en festivos.',
      example: 'Enviar 1.000€ a un proveedor en Asia vía SWIFT un viernes por la tarde suele tardar hasta el martes o miércoles siguiente con comisiones intermedias.'
    },
    defi: {
      title: 'Protocolo Abierto & Sin Permisos (Permissionless)',
      actor: 'Redes P2P Globales e Infraestructura Descentralizada',
      mechanism: 'Cualquier persona con conexión a internet y una wallet puede operar inmediatamente. No se pide DNI, nómina ni aprobación crediticia para intercambiar o tomar prestado.',
      pros: [
        'Disponibilidad permanente 24/7/365: nunca cierra ni duerme',
        'Mismo coste y velocidad para enviar dinero a la habitación de al lado o a otro continente',
        'Inclusión financiera universal: no discrimina por nacionalidad, estatus ni historial'
      ],
      cons: [
        'Ausencia de intermediario que ayude ante errores de usuario',
        'Mayor exposición a estafas de ingeniería social para usuarios inexpertos',
        'Complejidad en la declaración fiscal en jurisdicciones con modelos farragosos'
      ],
      risk: 'Falta de supervisión preventiva de estafadores en plataformas no reguladas.',
      example: 'Un domingo a las 3 de la madrugada puedes intercambiar 50.000 USDC por Bitcoin en segundos con comisiones de red de céntimos.'
    },
    coreDifference: 'Fiat opera con barreras geográficas y horarios del siglo pasado; DeFi es una autopista financiera universal, abierta y continua.',
    metricComparison: { label: 'Disponibilidad Temporal', fiatVal: '~22% del tiempo (Horario Oficina)', defiVal: '100% del tiempo (24/7/365)' }
  },
  {
    id: 'transparencia',
    title: 'Transparencia y Auditoría Contable',
    subtitle: 'Auditorías privadas trimestrales vs Libro mayor verificable en tiempo real',
    icon: <Eye className="text-red-700" size={24} />,
    fiat: {
      title: 'Contabilidad Privada Opaca',
      actor: 'Firmas de Auditoría (Big Four) y Reguladores',
      mechanism: 'Los balances son privados. Se publican informes contables trimestrales o anuales con meses de retraso tras revisión por firmas de auditoría externa.',
      pros: [
        'Privacidad comercial de las estrategias corporativas y clientes',
        'Revisión por peritos contables profesionales certificados',
        'Marcos legales consolidados para sancionar falsedad documental'
      ],
      cons: [
        'Imposibilidad de verificar el estado real de solvencia en tiempo real',
        'Historial reiterado de fraudes contables no detectados a tiempo',
        'Asimetría de información: los ejecutivos ven los riesgos antes que el público'
      ],
      risk: 'Quiebras repentinas de entidades que tenían informes de auditoría favorables días antes.',
      example: 'Enron, Wirecard, Lehman Brothers o Silicon Valley Bank contaban con informes de auditoría impecables poco antes de su colapso total.'
    },
    defi: {
      title: 'Transparencia On-Chain Total',
      actor: 'Exploradores de Bloques (Etherscan) y Plataformas Analíticas (DefiLlama)',
      mechanism: 'Cada transacción, cada depósito, cada deuda y cada línea de código de los contratos inteligentes es pública y verificable en tiempo real por cualquier persona del planeta.',
      pros: [
        'Verificación continua: sabes en todo momento si un pool tiene liquidez',
        'Código fuente auditable abiertamente en GitHub y verificadores de contratos',
        'Eliminación de la asimetría de información: todos los usuarios ven los mismos datos'
      ],
      cons: [
        'Pérdida de privacidad: las direcciones de carteras son públicas (seudónimas)',
        'Vulnerabilidad visible: los hackers pueden inspeccionar el código buscando fallos',
        'Requiere conocimientos técnicos para interpretar el código o los flujos on-chain'
      ],
      risk: 'Ataques MEV y seguimiento de carteras (whale watching) por falta de anonimato total.',
      example: 'En DefiLlama puedes comprobar al segundo el colateral exacto de Aave (más de 12.000 millones de dólares) con desglose activo por activo.'
    },
    coreDifference: 'En Fiat debes confiar a ciegas en lo que dice un informe contable; en DeFi no necesitas confiar, puedes auditar la realidad directamente en la cadena.',
    metricComparison: { label: 'Frecuencia de Auditoría', fiatVal: 'Trimestral / Anual (Diferida)', defiVal: 'En cada Bloque (~12 segundos)' }
  },
  {
    id: 'quiebras',
    title: 'Gestión de Crisis e Insolvencias',
    subtitle: 'Juicios concursales de años y rescates públicos vs Liquidación algorítmica',
    icon: <AlertTriangle className="text-red-700" size={24} />,
    fiat: {
      title: 'Concurso de Acreedores & Rescate Estatal',
      actor: 'Juzgados de lo Mercantil y Gobiernos',
      mechanism: 'Cuando un banco o empresa no puede pagar, entra en suspensión de pagos. Los jueces tardan años en liquidar activos, los depositantes sufren quitas y los gobiernos intervienen inyectando impuestos de los ciudadanos.',
      pros: [
        'Posibilidad de moratorias y acuerdos de reestructuración de deuda',
        'Protección de puestos de trabajo y amortiguación social del impacto',
        'Orden de prelación legal establecido por la ley concursal'
      ],
      cons: [
        'Procesos judiciales lentos que consumen años (5 a 10 años)',
        'Los contribuyentes pagan las pérdidas de banqueros privados (rescates públicos)',
        'Incertidumbre absoluta para los acreedores durante años'
      ],
      risk: 'Pérdida casi total del capital atrapado en litigios y desvalorización por inflación.',
      example: 'Los afectados por la quiebra del Banco Popular en España tardaron más de un lustro en procesos judiciales para dirimir responsabilidades.'
    },
    defi: {
      title: 'Liquidación Algorítmica Autónoma',
      actor: 'Bots de Arbitraje y Smart Contracts',
      mechanism: 'No hay juicios ni juicios políticos. Si el valor del colateral baja del umbral pactado, el contrato inteligente abre la garantía a subasta instantánea. Bots liquidadores compran el colateral con descuento y pagan la deuda.',
      pros: [
        'Resolución instantánea en el mismo bloque en que ocurre el problema',
        'Cero dinero de los contribuyentes: el protocolo no pide rescate a nadie',
        'La deuda incobrable se previene antes de que llegue a números rojos'
      ],
      cons: [
        'Inclemencia matemática: no hay contemplaciones ni retrasos por circunstancias personales',
        'Penalización económica directa para el deudor que no vigiló su Factor de Salud',
        'Riesgo de mechas de volatilidad que disparen liquidaciones transitorias'
      ],
      risk: 'Liquidación fulminante de garantías durante caídas repentinas de mercado (Flash Crashes).',
      example: 'Durante el colapso de Terra/Luna y caídas de ETH del 50% en 24h, Aave y MakerDAO liquidaron miles de millones de deuda automáticamente sin fallar un solo retiro.'
    },
    coreDifference: 'En Fiat, las quiebras se resuelven en juzgados durante años con rescates del Estado; en DeFi, el código liquida la deuda en segundos sin coste para la sociedad.',
    metricComparison: { label: 'Tiempo de Resolución de Impago', fiatVal: '3 a 10 años en juzgados', defiVal: 'Mismo bloque (12 segundos)' }
  }
];

export const INSTRUMENT_DIFFERENCES = [
  {
    instrument: 'Moneda / Dinero',
    fiatName: 'Euros / Dólares (Efectivo & Cuentas)',
    defiName: 'Bitcoin, USDC, EURC, DAI',
    fiatMechanics: 'Emitido por bancos centrales, multiplicado por reserva fraccionaria, sujeto a inflación y control de divisas.',
    defiMechanics: 'Emitido por algoritmo inmutable o respaldado 1:1 en reservas segregadas y auditadas bajo MiCA o sobre-colateralizadas on-chain.',
    keyDifference: 'Escasez matemática auditable y posesión directa frente a dinero de deuda con inflación constante.',
    settlement: 'Compensación SEPA / SWIFT (1-3 días)',
    defiSettlement: 'Bloque blockchain (segundos)'
  },
  {
    instrument: 'Depósitos y Rendimiento',
    fiatName: 'Cuentas Remuneradas & Plazos Fijos',
    defiName: 'Staking PoS, Vaults ERC-4626 & Lending',
    fiatMechanics: 'El banco toma tu dinero para prestarlo a terceros y te paga un interés marginal, quedándose el mayor margen de intermediación.',
    defiMechanics: 'Depositas en smart contracts de validación de red o bóvedas de rendimiento; cobras el interés completo del mercado sin margen bancario.',
    keyDifference: 'Rendimiento real generado por validación de consenso o liquidez frente a interés bancario arbitrario.',
    settlement: 'Liquidación de intereses mensual/trimestral',
    defiSettlement: 'Interés compuesto bloque a bloque (~12 seg)'
  },
  {
    instrument: 'Préstamos y Crédito',
    fiatName: 'Préstamo Bancario / Hipoteca',
    defiName: 'Préstamos Sobre-colateralizados (Aave, Morpho)',
    fiatMechanics: 'Exige nómina, avalistas, análisis de scoring crediticio subjetivo y semanas de aprobación burocrática.',
    defiMechanics: 'Aportas colateral cripto superior a la deuda; el préstamo se concede al instante en el mismo clic sin pedir datos personales.',
    keyDifference: 'Aprobación matemática instantánea por colateral digital frente a evaluación burocrática discriminatoria.',
    settlement: 'Semanas de estudio y firma notarial',
    defiSettlement: 'Instantáneo con un clic en la dApp'
  },
  {
    instrument: 'Bolsas y Negociación',
    fiatName: 'Bolsas Tradicionales (NYSE, BME, Nasdaq)',
    defiName: 'DEX AMM (Uniswap, Curve) & Perpetuales (Hyperliquid)',
    fiatMechanics: 'Operan mediante brokers, depositarios y cámaras de compensación centralizadas. Solo abren de 9 a 17:30h en días hábiles.',
    defiMechanics: 'Piscinas de liquidez automáticas x*y=k o libros de órdenes on-chain sin intermediarios. Operativos 24/7/365 en todo el planeta.',
    keyDifference: 'Acceso directo sin brokers intermediarios y negociación permanente sin pausas de fin de semana.',
    settlement: 'Liquidación T+1 / T+2',
    defiSettlement: 'Liquidación T+0 instantánea'
  },
  {
    instrument: 'Transferencias Internacionales',
    fiatName: 'Red SWIFT & Bancos Corresponsales',
    defiName: 'Redes L1/L2, Puentes Cross-Chain & CCTP',
    fiatMechanics: 'Pasa por 2 a 4 bancos corresponsales; cobra comisiones de 20€ a 50€ más diferencial de cambio de divisa; tarda de 2 a 5 días.',
    defiMechanics: 'Transferencia directa wallet-a-wallet por la red blockchain; coste de céntimos en Capas 2; llega en segundos.',
    keyDifference: 'Costes mínimos y velocidad inmediata frente a comisiones abusivas y demoras de varios días.',
    settlement: '2 a 5 días hábiles con riesgo de rechazo',
    defiSettlement: 'Segundos con confirmación pública'
  }
];

interface Props {
  onOpenDetailModal?: (name: string) => void;
  onOpenDirectLinks?: (name: string) => void;
}

export const DefiVsFiatMatrix: React.FC<Props> = ({ onOpenDetailModal, onOpenDirectLinks }) => {
  const [activeDimensionId, setActiveDimensionId] = useState<string>('emision');
  const [activeTab, setActiveTab] = useState<'dimensiones' | 'instrumentos'>('dimensiones');

  const selectedDimension = COMPARISON_DIMENSIONS.find(d => d.id === activeDimensionId) || COMPARISON_DIMENSIONS[0];

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-xl shadow-gray-100/50 space-y-10">
      {/* Cabecera del Módulo */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-gray-100 pb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 bg-red-50 text-red-700 rounded-xl border border-red-100">
              <ArrowRightLeft size={20} />
            </span>
            <span className="text-[11px] font-black uppercase tracking-widest text-red-700">Diferenciador Sistémico Maestro</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tighter italic">
            Mercado DeFi vs Mercado Fiat
          </h3>
          <p className="text-gray-600 text-sm font-semibold mt-1 max-w-2xl leading-relaxed">
            Comparativa estructural y técnica de cada uno de los elementos clave de las finanzas descentralizadas frente a la banca tradicional.
          </p>
        </div>

        {/* Selector de Pestañas */}
        <div className="flex bg-gray-100 p-1.5 rounded-2xl border border-gray-200 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('dimensiones')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'dimensiones' 
                ? 'bg-red-700 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dimensiones Estructurales
          </button>
          <button
            onClick={() => setActiveTab('instrumentos')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'instrumentos' 
                ? 'bg-gray-900 text-white shadow-md' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Instrumentos Específicos
          </button>
        </div>
      </div>

      {activeTab === 'dimensiones' ? (
        <div className="space-y-8">
          {/* Barra selectora de dimensiones */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
            {COMPARISON_DIMENSIONS.map((dim) => {
              const isActive = dim.id === activeDimensionId;
              return (
                <button
                  key={dim.id}
                  onClick={() => setActiveDimensionId(dim.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between group ${
                    isActive
                      ? 'bg-red-700 text-white border-red-700 shadow-lg shadow-red-700/20 ring-2 ring-red-700/20'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-1.5 rounded-lg ${isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-700 group-hover:text-red-700'}`}>
                      {dim.icon}
                    </div>
                    {isActive && <CheckCircle2 size={16} className="text-white" />}
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-tight leading-tight line-clamp-2 ${isActive ? 'text-white' : 'text-gray-900'}`}>
                    {dim.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Tarjeta de Comparación Detallada Lado a Lado */}
          <div className="bg-gray-50 rounded-[2.5rem] p-6 md:p-10 border border-gray-200 space-y-8">
            {/* Cabecera de la dimensión activa */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-xl text-red-700">
                  {selectedDimension.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                    {selectedDimension.title}
                  </h4>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-0.5">
                    {selectedDimension.subtitle}
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-red-50 border border-red-100 rounded-xl text-right">
                <span className="block text-[10px] font-black uppercase text-red-600">{selectedDimension.metricComparison.label}</span>
                <div className="flex items-center gap-2 text-xs font-black">
                  <span className="text-gray-500 line-through">{selectedDimension.metricComparison.fiatVal}</span>
                  <span className="text-red-700">➔ {selectedDimension.metricComparison.defiVal}</span>
                </div>
              </div>
            </div>

            {/* Dos Columnas de Contraste: Fiat vs DeFi */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Columna MERCADO FIAT */}
              <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-gray-100 text-gray-700 rounded-lg">
                        <Landmark size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 block">Sistema Tradicional</span>
                        <h5 className="text-lg font-black uppercase tracking-tight text-gray-900">{selectedDimension.fiat.title}</h5>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] font-black uppercase rounded-md border border-gray-200">
                      Intermediado
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider block mb-1">Actor Principal:</span>
                      <p className="text-xs font-bold text-gray-800 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        {selectedDimension.fiat.actor}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider block mb-1">Mecanismo Operativo:</span>
                      <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                        {selectedDimension.fiat.mechanism}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-black uppercase text-gray-400 tracking-wider block mb-2">Características Clave:</span>
                      <ul className="space-y-1.5">
                        {selectedDimension.fiat.pros.map((p, idx) => (
                          <li key={idx} className="text-xs font-semibold text-gray-600 flex items-start gap-2">
                            <span className="text-gray-400 mt-0.5">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[11px] font-black uppercase text-red-600 tracking-wider block mb-1">Riesgo Estructural:</span>
                      <div className="p-3 bg-red-50/60 rounded-xl border border-red-100 text-xs text-red-950 font-semibold flex items-start gap-2">
                        <AlertTriangle size={15} className="text-red-700 flex-shrink-0 mt-0.5" />
                        <span>{selectedDimension.fiat.risk}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">Caso Real Histórico:</span>
                  <p className="text-[11px] text-gray-600 italic font-medium">"{selectedDimension.fiat.example}"</p>
                </div>
              </div>

              {/* Columna MERCADO DEFI */}
              <div className="bg-white rounded-3xl p-8 border-2 border-red-700/20 shadow-lg shadow-red-700/5 space-y-6 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/5 rounded-full blur-2xl pointer-events-none"></div>
                <div>
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-red-700 text-white rounded-lg shadow-md shadow-red-700/20">
                        <Cpu size={20} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-red-700 block">Ecosistema On-Chain</span>
                        <h5 className="text-lg font-black uppercase tracking-tight text-gray-900">{selectedDimension.defi.title}</h5>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-red-50 text-red-700 text-[10px] font-black uppercase rounded-md border border-red-200">
                      Sin Permisos (P2P)
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-black uppercase text-red-700 tracking-wider block mb-1">Actor Principal:</span>
                      <p className="text-xs font-bold text-gray-900 bg-red-50/50 p-2.5 rounded-xl border border-red-100">
                        {selectedDimension.defi.actor}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-black uppercase text-gray-500 tracking-wider block mb-1">Mecanismo Operativo:</span>
                      <p className="text-xs text-gray-900 leading-relaxed font-semibold">
                        {selectedDimension.defi.mechanism}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-black uppercase text-gray-500 tracking-wider block mb-2">Ventajas y Propiedades:</span>
                      <ul className="space-y-1.5">
                        {selectedDimension.defi.pros.map((p, idx) => (
                          <li key={idx} className="text-xs font-semibold text-gray-900 flex items-start gap-2">
                            <CheckCircle2 size={13} className="text-red-700 flex-shrink-0 mt-0.5" />
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-[11px] font-black uppercase text-gray-500 tracking-wider block mb-1">Riesgo Tecnológico / De Mercado:</span>
                      <div className="p-3 bg-gray-100 rounded-xl border border-gray-200 text-xs text-gray-800 font-semibold flex items-start gap-2">
                        <AlertTriangle size={15} className="text-gray-700 flex-shrink-0 mt-0.5" />
                        <span>{selectedDimension.defi.risk}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <span className="text-[10px] font-black uppercase text-red-700 block mb-1">Ejecución Real On-Chain:</span>
                  <p className="text-[11px] text-gray-700 italic font-medium">"{selectedDimension.defi.example}"</p>
                </div>
              </div>
            </div>

            {/* Banner de Diferencia Fundamental */}
            <div className="bg-red-700 text-white p-6 rounded-2xl shadow-lg shadow-red-700/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-200 block">Diferencia Fundamental Concluyente:</span>
                <p className="text-sm font-bold leading-relaxed">{selectedDimension.coreDifference}</p>
              </div>
              <button
                onClick={() => onOpenDetailModal && onOpenDetailModal(selectedDimension.title)}
                className="px-4 py-2.5 bg-white text-red-700 hover:bg-gray-100 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 flex-shrink-0 shadow-sm"
              >
                <span>Explorar a Fondo</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Vista de Instrumentos Específicos */
        <div className="space-y-6">
          <p className="text-xs font-semibold text-gray-600 max-w-2xl">
            Desglose comparativo directo entre los instrumentos financieros tradicionales del sistema Fiat y sus equivalentes directos construidos mediante contratos inteligentes en DeFi.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {INSTRUMENT_DIFFERENCES.map((item) => (
              <div 
                key={item.instrument}
                className="bg-white border border-gray-200 rounded-3xl p-6 md:p-8 hover:border-red-600 transition-all shadow-sm space-y-4 group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-700"></span>
                    <h4 className="text-xl font-black uppercase tracking-tight text-gray-900">{item.instrument}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenDirectLinks && onOpenDirectLinks(item.instrument)}
                      className="px-3 py-1.5 bg-gray-50 hover:bg-red-50 text-gray-600 hover:text-red-700 border border-gray-200 rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                      title="Ver URLs y enlaces oficiales"
                    >
                      <Compass size={13} className="text-red-700" />
                      <span>Links</span>
                    </button>
                    <button
                      onClick={() => onOpenDetailModal && onOpenDetailModal(item.instrument)}
                      className="px-3 py-1.5 bg-gray-900 hover:bg-red-700 text-white rounded-xl text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      <span>Ver Ficha</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-gray-400">Instrumento Fiat Tradicional:</span>
                      <span className="text-[10px] font-bold text-gray-500">{item.settlement}</span>
                    </div>
                    <p className="text-xs font-bold text-gray-900 uppercase">{item.fiatName}</p>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">{item.fiatMechanics}</p>
                  </div>

                  <div className="p-4 bg-red-50/40 rounded-2xl border border-red-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-red-600">Instrumento DeFi On-Chain:</span>
                      <span className="text-[10px] font-bold text-red-700">{item.defiSettlement}</span>
                    </div>
                    <p className="text-xs font-black text-gray-900 uppercase">{item.defiName}</p>
                    <p className="text-xs text-gray-700 leading-relaxed font-medium">{item.defiMechanics}</p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-xs font-bold text-gray-700">
                  <span className="text-red-700 font-black uppercase text-[10px] tracking-wider px-2 py-0.5 bg-red-50 rounded border border-red-100 flex-shrink-0">
                    Diferencia Clave:
                  </span>
                  <span>{item.keyDifference}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
