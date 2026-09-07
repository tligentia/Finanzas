import { ManualChapter } from './types';

export const PARTE_3_CHAPTERS: ManualChapter[] = [
  {
    id: 'cap-9',
    number: 9,
    title: 'DEX, AMM y provisión de liquidez',
    partId: 'parte-3',
    partTitle: 'Parte III — DeFi: Servicios y contratos',
    summary: 'Mecánica de swaps (impacto de precio, slippage, deadline), provisión de liquidez y la fórmula de descomposición obligatoria del rendimiento.',
    keyTakeaway: 'Separar siempre rendimiento por comisiones de rendimiento por emisión de tokens. Un APY del 40% pagado en un token que se devalúa un 60% es una pérdida neta real.',
    content: `### 9.1 Swap
Mecánica atómica donde un contrato intercambia un activo por otro conforme a las reservas del pool. Factores determinantes:
- **Impacto de precio:** efecto del tamaño de la orden sobre el pool (no lineal).
- **Tolerancia de deslizamiento (Slippage):** margen admisible de variación. Muy estrecho, falla la transacción y se quema gas; muy amplio, facilita ataques sandwich por bots MEV.
- **Fecha límite (Deadline):** caducidad para evitar ejecuciones retrasadas en condiciones desfavorables.

---

### 9.2 Provisión de liquidez y descomposición del resultado
El rendimiento de un pool LP nunca coincide con el APY publicitado. Se descompone obligatoriamente así:

\`\`\`text
Resultado = comisiones cobradas
          + incentivos percibidos (valorados al momento de recepción)
          − pérdida impermanente materializada
          − comisiones de gas de entrada, gestión y salida
          − impacto fiscal de cada evento
\`\`\`

---

### 9.3 Liquidez concentrada
Fijar un rango de precios otorga mayor eficiencia de capital pero convierte la provisión en una posición direccional activa: fuera de rango la posición deja de percibir comisiones y queda compuesta al 100% por el activo depreciado. Cada rebalanceo genera costes de gas y eventos con potencial repercusión fiscal.`
  },
  {
    id: 'cap-10',
    number: 10,
    title: 'Préstamo y crédito on-chain',
    partId: 'parte-3',
    partTitle: 'Parte III — DeFi: Servicios y contratos',
    summary: 'Mecánica de lending pools, sobrecolateralización, LTV, factor de salud, liquidaciones forzosas automáticas, riesgo de oráculo y estrategias de looping.',
    keyTakeaway: 'La liquidación no es una advertencia ni una llamada de margen: es una ejecución algorítmica instantánea ejecutada por bots cuando el precio del oráculo cruza el umbral.',
    content: `### 10.1 Mecánica del crédito descentralizado
Depósito de colateral contra el que se extrae un préstamo sobrecolateralizado.
- **Factor de colateral:** porcentaje de valor que computa como respaldo.
- **Factor de salud:** ratio entre colateral y deuda ponderada; por debajo de 1.0 la posición se liquida de inmediato.
- **Tipos variables:** fijados por la curva de utilización del pool. Si la utilización se acerca al 100%, el tipo se dispara y se bloquea la retirada del depósito por falta de liquidez remanente.

---

### 10.2 Liquidación
Cualquier bot liquidador adquiere el colateral con descuento al pagar parte de la deuda.
Puntos críticos:
1. El disparador es el **precio del oráculo del contrato**, no el precio spot de un CEX.
2. En picos de congestión de red es inviable enviar transacciones de rescate a tiempo.
3. El descuento de liquidación se añade a las pérdidas de mercado.

---

### 10.3 Estrategias apalancadas (*looping*)
Depositar colateral, tomar prestado, comprar más colateral y volver a depositar. Multiplica la exposición y eleva drásticamente el precio de liquidación. **Si el porcentaje de caída que activa la liquidación no se ha calculado antes de abrir la posición, no está gestionada.**`
  },
  {
    id: 'cap-11',
    number: 11,
    title: 'Staking, liquid staking y restaking',
    partId: 'parte-3',
    partTitle: 'Parte III — DeFi: Servicios y contratos',
    summary: 'Staking nativo en PoS, colas de salida y unbonding, penalizaciones por slashing, LST/LRT y la advertencia estructural sobre los 4 momentos fiscales.',
    keyTakeaway: 'Distinguir y registrar siempre los 4 momentos de las recompensas: generación, disponibilidad efectiva, reclamación y disposición. Conservar solo uno cierra opciones ante una inspección fiscal.',
    content: `### 11.1 Staking nativo y delegación
Bloqueo de monedas nativas para validar la red a cambio de recompensas protocolarias.
- **Colas de salida (*unbonding*):** periodos de bloqueo de días o semanas donde el activo no genera rentabilidad ni puede venderse.
- **Riesgo de slashing:** quema o penalización del saldo delegado por mala conducta, bifurcación indebida o inactividad del validador.

---

### 11.2 Liquid Staking (LST) y Restaking (LRT)
- **LST (stETH, rETH):** permite mantener liquidez mediante un recibo negociable. Riesgo: cotización con descuento respecto al valor teórico si hay pánico de liquidez.
- **LRT (eETH, ezETH):** reutilización del colateral para asegurar redes AVS secundarias. Añade el riesgo de slashing independiente de cada servicio asegurado.

---

### 11.3 Los 4 momentos del devengo de recompensas
Para garantizar el cumplimiento fiscal futuro, registrar por separado:
1. Fecha y hora de generación.
2. Fecha de disponibilidad efectiva.
3. Fecha de reclamación (*claim*).
4. Fecha de disposición o enajenación.`
  },
  {
    id: 'cap-12',
    number: 12,
    title: 'Vaults, yield y productos estructurados',
    partId: 'parte-3',
    partTitle: 'Parte III — DeFi: Servicios y contratos',
    summary: 'Qué auditar antes de depositar en una bóveda, descomposición analítica del APY, comisiones de gestión/éxito y riesgos de apilamiento.',
    keyTakeaway: 'Un producto estructurado se documenta por su estrategia subyacente y permisos de contrato, nunca por su APY anunciado.',
    content: `### 12.1 Qué abrir antes de depositar en un Vault
1. **Estrategia subyacente exacta:** qué activos mueve, en qué contratos y con qué apalancamiento.
2. **Permisos del contrato:** facultades de administradores o gestores para migrar fondos.
3. **Dependencias:** oráculos, puentes e integraciones cruzadas.
4. **Comisiones:** entrada, salida, gestión y comisión de éxito sobre *high water mark*.
5. **Liquidez de salida:** penalizaciones o demoras ante retiradas masivas de participantes.

---

### 12.2 Descomposición del APY

\`\`\`text
APY anunciado = rendimiento base (comisiones/intereses reales)
              + emisión de tokens de incentivo
              + efecto de apalancamiento
              − comisiones del producto
              ± variación de precio de los activos de recompensa
\`\`\`

Si el rendimiento proviene de emitir un token nativo sin demanda externa, la rentabilidad se diluirá a medida que los participantes vendan las recompensas.`
  },
  {
    id: 'cap-13',
    number: 13,
    title: 'Derivados: perpetuos, futuros y opciones',
    partId: 'parte-3',
    partTitle: 'Parte III — DeFi: Servicios y contratos',
    summary: 'Perpetuos en CEX frente a DeFi, los 4 precios (índice, mark price, último, liquidación), margen aislado vs cruzado, tasa de funding, ADL y opciones.',
    keyTakeaway: 'El mark price es el que decide las liquidaciones y el PnL no realizado. Sustituirlo por un precio spot en los registros invalida toda conciliación contable.',
    content: `### 13.1 Perpetuos (*perps*) y los 4 precios

| Precio | Naturaleza | Función en el sistema |
|---|---|---|
| **Índice** | Media spot ponderada | Referencia para el cálculo del funding |
| ***Mark price*** | Precio sintético mitigador de manipulaciones | **Calcula el PnL no realizado y las liquidaciones** |
| **Último negociado** | Último cruce de órdenes local | Referencia meramente visual |
| **Liquidación estimada** | Umbral fijado por el margen de mantenimiento | Punto de ejecución forzosa |

---

### 13.2 Margen y Funding
- **Modo aislado:** riesgo limitado al saldo asignado a la posición.
- **Modo cruzado:** el balance total de la cuenta respalda la posición; un error de apalancamiento puede liquidar toda la cuenta.
- **Funding:** pago periódico entre posiciones largas y cortas para vincular el precio del derivado al índice spot. En posiciones mantenidas semanas, suele ser el factor determinante del PnL.

---

### 13.3 Desapalancamiento automático (ADL)
Si el fondo de seguro de la plataforma no logra cubrir las pérdidas de una liquidación en cascada, el motor del exchange cerrará forzosamente las posiciones ganadoras de otros usuarios (*Auto-Deleveraging*).`
  },
  {
    id: 'cap-14',
    number: 14,
    title: 'DAO y gobernanza',
    partId: 'parte-3',
    partTitle: 'Parte III — DeFi: Servicios y contratos',
    summary: 'Gobernanza on-chain, quórum, timelocks, claves multifirma de administradores y la evaluación del riesgo de descentralización real.',
    keyTakeaway: 'Si una sola dirección o un comité multifirma sin timelock puede modificar el contrato que custodia los fondos, el análisis debe tratarla como contraparte custodia.',
    content: `### 14.1 Qué es y qué no es una DAO
Un protocolo gobernado por DAO no está automáticamente libre de riesgo de contraparte ni de responsabilidades jurídicas.
Aspectos clave a auditar:
- **Concentración de voto:** ballenas o inversores semilla capaces de imponer propuestas sin oposición.
- **Timelock:** retraso de seguridad obligatorio entre la votación y la ejecución on-chain (da tiempo a retirar fondos si se aprueba un cambio perjudicial).
- **Poderes de emergencia:** llaves multifirma con facultades de pausa o actualización unilateral. Si carecen de timelock, constituyen un custodio fáctico centralizado.`
  }
];
