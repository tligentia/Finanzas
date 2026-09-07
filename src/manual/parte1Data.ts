import { ManualChapter } from './types';

export const PARTE_1_CHAPTERS: ManualChapter[] = [
  {
    id: 'cap-1',
    number: 1,
    title: 'Arquitectura del ecosistema: capas y actores',
    partId: 'parte-1',
    partTitle: 'Parte I — Fundamentos',
    summary: 'El modelo de 8 capas (0 a 7), qué cambia al atravesar cada frontera operativa, actores y la regla estructural del manual.',
    keyTakeaway: 'Un hecho económico cripto solo está correctamente documentado cuando se puede responder, sin acudir a la memoria: qué activo, en qué red, desde qué origen, hacia qué destino, con qué identificador, en qué momento, valorado con qué fuente y bajo qué relación jurídica.',
    content: `### 1.1 El modelo de capas

Toda actividad cripto atraviesa una pila de capas. Entender en qué capa ocurre cada hecho es lo que permite después atribuir riesgo, responsabilidad y obligación documental.

\`\`\`text
[0] Persona o entidad
     Identidad, residencia fiscal, perfil de riesgo, capacidad jurídica, evidencias

[1] Fiat y banca
     Cuentas bancarias, tarjetas, transferencias, procesadores de pago

[2] Proveedor centralizado
     Exchange (CEX), broker, rampa fiat, custodio, emisor de stablecoin

[3] Wallet y claves
     Autocustodia, custodia delegada, multifirma, MPC, smart wallets

[4] Red blockchain
     L1, L2/rollups, sidechains, appchains; nodos, RPC, exploradores

[5] Protocolos DeFi
     DEX/AMM, préstamo, LP, staking, vaults, derivados, DAOs

[6] Infraestructura transversal
     Puentes, oráculos, indexadores, agregadores, analítica on-chain

[7] Control
     Registros, gestión de riesgos, fiscalidad, cumplimiento, auditoría
\`\`\`

---

### 1.2 Qué cambia al atravesar cada frontera

El error operativo más común no es elegir mal un activo: es **perder la trazabilidad al saltar de capa**. Cada frontera cambia simultáneamente el tipo de evidencia disponible, el sujeto responsable y el riesgo dominante.

| Frontera | Evidencia que deja | Responsable | Riesgo que aparece |
|---|---|---|---|
| **Banca → CEX** | Justificante bancario + registro de depósito del proveedor | Entidad bancaria y CEX | Contraparte, bloqueo de fondos, KYC |
| **CEX → Wallet propia** | ID de retiro + hash on-chain | El titular pasa a ser responsable único | Error de dirección o red, pérdida de claves |
| **Wallet → Protocolo DeFi** | Hash, contrato, evento, *receipt token* | El titular; el protocolo no responde | Smart contract, oráculo, permisos |
| **Red A → Red B (bridge)** | Dos hashes en dos redes + evento del puente | Puente y sus administradores | Custodia del puente, representación sintética |
| **Protocolo → Fiat** | Cadena completa inversa | Todos los anteriores | Justificación de origen de fondos |

---

### 1.3 Actores y su papel real

- **Titular**: persona física o jurídica que soporta el riesgo económico y las obligaciones declarativas. No siempre coincide con quien opera materialmente.
- **Operador**: quien firma transacciones. En una entidad, debe estar identificado, autorizado y limitado.
- **Proveedor de servicios de criptoactivos (PSC/CASP)**: figura regulada en la UE por MiCA. Presta uno o varios servicios enumerados (custodia, negociación, canje, ejecución, asesoramiento, transferencia, colocación). Ver capítulo 18.
- **Emisor**: quien crea el activo y, en su caso, asume obligaciones frente al tenedor. En stablecoins con reserva es la pieza central del análisis.
- **Protocolo**: conjunto de contratos inteligentes. No es una contraparte contractual clásica; puede tener administradores con poderes materiales.
- **Validador / operador de nodo**: participa en el consenso de la red. Puede recibir recompensas y sufrir penalizaciones.
- **Proveedor de datos**: exchanges, agregadores, indexadores y oráculos. Sus cifras son *su* medición, no una verdad neutra.
- **Auditor / perito**: reconstruye la actividad a partir de la evidencia conservada. Si la evidencia no existe, el trabajo no se puede hacer, con independencia de la buena fe del titular.

---

### 1.4 Regla estructural del manual

> **Regla de Oro de Trazabilidad:** Un hecho económico cripto solo está correctamente documentado cuando se puede responder, sin acudir a la memoria: **qué activo, en qué red, desde qué origen, hacia qué destino, con qué identificador, en qué momento, valorado con qué fuente y bajo qué relación jurídica.**`
  },
  {
    id: 'cap-2',
    number: 2,
    title: 'Fundamentos técnicos operativos de blockchain',
    partId: 'parte-1',
    partTitle: 'Parte I — Fundamentos',
    summary: 'Claves, direcciones e identidad, transacciones, nonce, gas y finalidad, modelos de cuenta (Cuentas vs UTXO), contratos inteligentes y campos a registrar.',
    keyTakeaway: 'Una dirección no identifica a una persona por sí sola: la vinculación surge de datos externos (KYC, factura, IP), convirtiéndose en dato personal bajo RGPD. El gas se paga aunque la transacción falle.',
    content: `### 2.1 Claves, direcciones e identidad

**Mecánica.** Una **clave privada** es un número secreto. De ella se deriva una **clave pública** y, de esta, una **dirección**. La relación es unidireccional: de la dirección no se recupera la clave. Firmar una transacción con la clave privada demuestra el control sobre la dirección.

Consecuencias operativas:
- Quien controla la clave privada controla los fondos. No hay autoridad que revierta una transferencia firmada correctamente.
- La **frase semilla** (*seed phrase*, típicamente 12 o 24 palabras según el estándar BIP-39) regenera todas las claves derivadas de ella. Es equivalente funcional a todos los fondos del monedero, presentes y futuros.
- Una dirección **no identifica a una persona por sí sola**. La identificación surge de vincularla con datos externos: un KYC, una factura, una IP, una etiqueta de proveedor. Esa vinculación es precisamente lo que convierte la dirección en dato personal a efectos de RGPD (capítulo 18).
- Las **rutas de derivación** (BIP-44 y derivados) explican por qué una misma semilla genera direcciones distintas en monederos distintos. Documentar la ruta evita reconstrucciones fallidas.

---

### 2.2 Transacciones, nonce, gas y finalidad

Una transacción típica en una red de cuentas contiene: origen, destino, valor, datos de llamada (\`calldata\`), \`nonce\`, parámetros de comisión y firma.

- **\`nonce\`**: contador secuencial por cuenta. Impide repetición y fija el orden. Una transacción atascada bloquea las siguientes de la misma cuenta hasta ser reemplazada o confirmada.
- **Gas**: unidad de coste computacional. El coste total es \`gas usado × precio del gas\`. En redes con mercado de comisiones tipo EIP-1559 se separan *base fee* (quemada) y *priority fee* (al proponente del bloque). **El gas se paga aunque la transacción falle**, porque el cómputo se ejecutó.
- **Confirmación frente a finalidad**: una transacción incluida en un bloque no siempre es irreversible. En redes PoW la reversión se vuelve improbable con la profundidad; en redes PoS existen conceptos de finalidad explícita. En *rollups* optimistas, la liquidación en la capa base puede tener un periodo de disputa. **Documentar cuándo se considera un movimiento definitivo es una decisión de política interna, no un dato que la red entregue de forma uniforme.**
- **Reorganizaciones (*reorgs*)**: un bloque puede quedar fuera de la cadena canónica. Un saldo leído demasiado pronto puede no ser el definitivo.
- **Mempool y MEV**: las transacciones son públicas antes de ejecutarse. Terceros pueden reordenarlas, adelantarlas o intercalarlas (*front-running*, *sandwich*). Esto no es un fallo: es una propiedad del sistema con impacto económico directo sobre el precio de ejecución.

---

### 2.3 Modelos de cuenta

- **Modelo de cuentas** (Ethereum y compatibles): saldos asociados a cuentas; estado global mutable.
- **Modelo UTXO** (Bitcoin y derivados): los fondos son salidas no gastadas; una transacción consume salidas y crea otras. Implicación contable: **no existe "el saldo de una dirección" como registro nativo**, se calcula agregando UTXO. La atribución de coste de adquisición exige criterio explícito y consistente.

---

### 2.4 Contratos inteligentes

**Definición.** Código desplegado en una dirección, ejecutable de forma determinista por cualquiera que envíe una transacción con los datos adecuados.

Puntos que condicionan el riesgo:
- **Inmutabilidad relativa.** Muchos contratos son actualizables mediante patrones *proxy*. El código auditado puede diferir del ejecutado hoy. Registrar **dirección del proxy, dirección de la implementación y versión**.
- **Poderes de administración.** Roles con capacidad de pausar, actualizar, cambiar parámetros, retirar fondos o modificar oráculos. Un contrato con clave de administrador individual y sin *timelock* tiene un riesgo de contraparte comparable al de un custodio.
- **Composabilidad.** Un contrato llama a otros. El riesgo se hereda por dependencias: el eslabón más débil de la cadena define el riesgo real.
- **Eventos (*logs*)**: registros emitidos por el contrato. Son la fuente primaria para reconstruir qué ocurrió económicamente dentro de una transacción compleja.`,
    fieldsToRegister: [
      { field: 'red', desc: 'Nombre y chainId. No basta el nombre comercial.' },
      { field: 'hash', desc: 'Identificador único de la transacción.' },
      { field: 'bloque', desc: 'Número y marca temporal UTC.' },
      { field: 'origen / destino', desc: 'Direcciones completas, sin abreviar.' },
      { field: 'contrato', desc: 'Dirección invocada, si aplica; proxy e implementación.' },
      { field: 'metodo', desc: 'Función llamada y firma.' },
      { field: 'eventos', desc: 'Logs relevantes decodificados.' },
      { field: 'valor_nativo', desc: 'Importe en la moneda de la red.' },
      { field: 'gas_usado, precio_gas, coste_total', desc: 'En unidad nativa y en euros.' },
      { field: 'estado', desc: 'Éxito o revertida, con motivo si consta.' }
    ]
  },
  {
    id: 'cap-3',
    number: 3,
    title: 'Taxonomía de activos y representaciones',
    partId: 'parte-1',
    partTitle: 'Parte I — Fundamentos',
    summary: 'Criptoactivos nativos, tokens fungibles (ERC-20), LST/LRT, LP tokens, tokens de gobernanza/utilidad/RWA, NFT y la matriz de decisión de 9 preguntas.',
    keyTakeaway: 'Un token se identifica por red + dirección de contrato, nunca por su símbolo. Existen tokens con el símbolo de activos legítimos creados exclusivamente para engañar.',
    content: `### 3.1 Criptoactivos nativos
Activo propio de una red, no emitido por contrato, utilizado para pagar comisiones, remunerar la seguridad y liquidar operaciones. Su emisión está definida en el protocolo (recompensa por bloque, calendario, quemas). No hay emisor con obligaciones frente al tenedor.

---

### 3.2 Tokens fungibles
Unidades emitidas por un contrato conforme a un estándar (ERC-20 y equivalentes). El contrato mantiene el mapa de saldos; todo lo demás (nombre, símbolo, decimales) es metadato declarado y falsificable.

Variantes críticas con riesgo añadido a auditar antes de operar:
- **Suministro modificable (*mintable*)**: el emisor puede crear unidades.
- **Función de pausa o lista negra (*blacklist*)**: el emisor puede congelar transferencias o direcciones concretas (habitual en stablecoins reguladas).
- **Comisión de transferencia (*fee on transfer*)**: el importe recibido difiere del enviado, rompiendo cálculos de coste.
- **Rebase**: el saldo cambia sin transacción, complicando la contabilidad de lotes.
- **Tokens no transferibles / Honeypot**: permiten comprar pero impiden vender.

---

### 3.3 Tokens de staking líquido (LST) y restaking (LRT)
Token que representa una posición de *staking* delegada. El token acumula valor por incremento de ratio de canje (*value accruing*) o por incremento de saldo (*rebasing*).
Riesgos específicos: activo subyacente, *slashing* de validadores, riesgo de contrato del protocolo, y **riesgo de descuento de mercado frente al valor teórico de canje**. En *restaking*, se añade el riesgo de penalización de cada servicio asegurado (AVS).

---

### 3.4 LP tokens y posiciones de liquidez
Recibo de una posición en un mercado automatizado (ERC-20 o ERC-721 en liquidez concentrada).
**Pérdida impermanente**: diferencia entre el valor dentro del pool y el de mantener los activos fuera. Aparece siempre que el precio relativo se mueve y se convierte en pérdida definitiva al retirar.

---

### 3.5 Gobernanza, utilidad, valores y RWA
- **Gobernanza:** confiere voto sobre parámetros o tesorería (evaluar quórum, timelock, concentración).
- **Utilidad:** acceso a funciones de un servicio; valor sujeto a uso real.
- **Valores tokenizados:** si reúne rasgos de instrumento financiero, aplica la normativa de mercados de valores, **no MiCA**.
- **RWA (activos del mundo real):** crédito, bonos, materias primas. El análisis es off-chain: ¿quién custodia el activo real, bajo qué contrato, con qué auditoría y qué derecho ejecutable tiene el tenedor si el emisor incumple?

---

### 3.6 NFT y derivados estructurados
Token con identificador único dentro de una colección. Recordar: **Token ≠ Obra ≠ Derechos**. La propiedad del token no transfiere derechos de autor salvo licencia expresa. Los metadatos pueden residir en servidores externos mutables.`,
    fieldsToRegister: [
      { field: 'red + contrato', desc: 'Identificador inequívoco.' },
      { field: 'simbolo + decimales', desc: 'Unidades exactas de cálculo.' },
      { field: 'emisor + forma juridica', desc: 'Sujeto legal responsable.' },
      { field: 'capacidades contrato', desc: 'mint, pause, blacklist, upgrade, fee.' },
      { field: 'auditorias y fecha', desc: 'Firma auditora y versión analizada.' }
    ]
  },
  {
    id: 'cap-4',
    number: 4,
    title: 'Stablecoins',
    partId: 'parte-1',
    partTitle: 'Parte I — Fundamentos',
    summary: 'Clasificación por respaldo (fiduciario, cripto, algorítmico, sintético), marco europeo MiCA (EMT vs ART con plazos CNMV/Banco de España), depeg y riesgo multi-red.',
    keyTakeaway: 'Una stablecoin denominada en euros o dólares ofrecida al público en la UE es un EMT (ficha de dinero electrónico). El régimen transitorio en España finaliza el 1 de julio de 2026 (CNMV). Enviar una versión puenteada a una dirección que espera la nativa causa pérdida total.',
    content: `### 4.1 Definición y advertencia terminológica
Criptoactivo que busca mantener una referencia de valor estable, habitualmente respecto a una moneda fiduciaria. "Estable" describe un **objetivo de diseño**, no una garantía de resultado. La denominación comercial no crea solvencia.

---

### 4.2 Clasificación por mecanismo

1. **Respaldo fiduciario (reserva off-chain):** depósitos y deuda pública a corto plazo. Puntos críticos: segregación de reservas, calidad crediticia del custodio, atestaciones vs auditorías completas, y **derecho de reembolso directo y condiciones**.
2. **Colateral cripto sobrecolateralizado:** emitido contra garantía cripto en smart contracts (ej. Maker/Sky). Riesgos: caída brusca del colateral, oráculos, congestión que impide liquidaciones y gobernanza de parámetros.
3. **Algorítmicas o diseño mixto:** paridad mediante incentivos, arbitraje o emisión dual. Dependencia reflexiva: fallan precisamente cuando la confianza se quiebra.
4. **Estrategias sintéticas de rendimiento:** productos que mantienen paridad mediante posiciones de derivados (ej. delta-neutral con funding). **No son stablecoins con reserva**: deben auditarse como productos estructurados.

---

### 4.3 Marco europeo: ART y EMT bajo MiCA

MiCA distingue dos figuras específicas:
- **EMT (ficha de dinero electrónico):** mantiene valor estable referenciado a **una única moneda oficial**. Emisión reservada a entidades de crédito o dinero electrónico autorizadas, con derecho de reembolso obligatorio a la par.
- **ART (ficha referenciada a activos):** referencia a **otro valor, derecho o cesta** (varias monedas, materias primas o criptoactivos). Requiere autorización previa, reservas segregadas y libro blanco validado.

**Datos temporales verificados (España y UE):**
- Régimen aplicable desde el 30 de diciembre de 2024.
- Los proveedores de transferencia de EMT requieren autorización PSD2 del Banco de España (referencia CNMV: **1 de marzo de 2026**).
- El régimen transitorio general para proveedores en España concluye el **1 de julio de 2026** (*CNMV, P&R MiCA, 15 dic 2025*).

---

### 4.4 Riesgo de desanclaje (*depeg*) y riesgo multi-red
El desanclaje puede ser desviación menor de liquidez, descuento persistente por atasco de arbitraje, o desanclaje estructural irreversible.
**Riesgo multi-red:** una stablecoin nativa emitida por el emisor en una red no equivale a la versión puenteada por un tercero en otra red. El respaldo de la puenteada es el contrato del puente; enviar una a otra dirección provoca pérdidas irrecuperables.`,
    fieldsToRegister: [
      { field: 'emisor, forma jurídica y jurisdicción', desc: 'Entidad emisora legalmente responsable.' },
      { field: 'categoría regulatoria', desc: 'EMT / ART / No clasificada.' },
      { field: 'red y contrato exacto', desc: 'Para cada versión de red utilizada.' },
      { field: 'nativa vs puenteada', desc: 'Identificación del puente si es sintética.' },
      { field: 'documento de reservas y fecha', desc: 'Atestación o auditoría más reciente.' },
      { field: 'condiciones de reembolso', desc: 'Importe mínimo, plazos, comisiones y beneficiarios.' }
    ]
  }
];
