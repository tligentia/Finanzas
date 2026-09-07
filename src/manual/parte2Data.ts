import { ManualChapter } from './types';

export const PARTE_2_CHAPTERS: ManualChapter[] = [
  {
    id: 'cap-5',
    number: 5,
    title: 'Mercados, liquidez y formación de precios',
    partId: 'parte-2',
    partTitle: 'Parte II — Mercados e infraestructura',
    summary: 'Por qué no existe "el precio" como dato único, libros de órdenes (CLOB), AMM/DEX, agregadores y enrutamiento, mesas OTC y registro de fuentes de mercado.',
    keyTakeaway: 'No existe el precio absoluto de un criptoactivo: existen precios en mercados concretos, para tamaños y momentos concretos. El método de valoración debe elegirse una vez, documentarse y aplicarse consistentemente.',
    content: `### 5.1 Por qué "el precio" no existe como dato único
La valoración es una de las principales causas de discrepancia en revisiones fiscales. Cada fuente mide una realidad distinta:
- **Precio de ejecución propio:** lo efectivamente pagado.
- **Último precio (Last Price):** última operación cruzada (manipulable en iliquidez).
- **VWAP (Precio medio ponderado):** promedio ponderado por volumen en un plazo.
- **Índice de agregador:** media construida según metodología del proveedor.
- **Mark price (derivados):** precio de referencia para PnL y liquidación (no es spot).
- **Oráculo on-chain:** precio que consumen los contratos (con latencia y umbrales de desviación).

---

### 5.2 Mercado spot y libro de órdenes (CLOB)
Mecánica de cruce de órdenes limitadas. Conceptos clave:
- **Spread:** horquilla entre mejor compra y mejor venta.
- **Profundidad y Slippage:** impacto de mercado derivado de consumir varios niveles de liquidez.
- **Tipos de órdenes:** mercado, limitada, stop-limit, post-only, iceberg, TWAP.
- **Wash trading:** volumen inflado artificialmente en mercados poco regulados.

---

### 5.3 AMM, DEX y agregadores
Fórmulas algorítmicas de reservas (\`x · y = k\`, liquidez concentrada, curvas de stables).
**Agregadores y permisos de gasto:** un agregador enruta entre múltiples piscinas pero suele solicitar un permiso (\`approval\`) sobre el token de entrada. **Si no se revoca, persiste como vector de riesgo permanente.**

---

### 5.4 Mesas OTC y conservación de datos
Operaciones bilaterales fuera de libro para grandes volúmenes. Requiere documentar: contrato marco, identidad de contraparte, plazos, condiciones de entrega contra pago (DvP) y evidencia documental de liquidación en ambos lados.`
  },
  {
    id: 'cap-6',
    number: 6,
    title: 'Exchanges centralizados, brokers y custodios',
    partId: 'parte-2',
    partTitle: 'Parte II — Mercados e infraestructura',
    summary: 'Qué es realmente un CEX (derecho de crédito vs titularidad on-chain), funciones y evidencias, diligencia sobre proveedores bajo MiCA, higiene operativa y custodios.',
    keyTakeaway: 'Un saldo en un CEX es un derecho de crédito frente a esa entidad, no la titularidad directa de un activo. Las operaciones internas no dejan huella en la blockchain.',
    content: `### 6.1 Qué es realmente un CEX
La evidencia de las operaciones internas solo existe en la base de datos del proveedor. Si la entidad quiebra o desaparece, desaparece el saldo y la evidencia.
**Exportar periódicamente los extractos oficiales en CSV/PDF es la única defensa documental admisible.**

---

### 6.2 Funciones y evidencias
- **Depósitos fiat / cripto:** justificante bancario, ID de depósito y hash on-chain.
- **Órdenes internas:** \`id_orden\`, \`id_operacion\`, libro y comisiones.
- **Conversión rápida ("convert"):** costes ocultos en spreads opacos sin orden de libro.
- **Retiradas:** \`id_retiro\` vinculado al hash de red.
- **Servicios Earn:** préstamo de fondos a terceros con riesgo de crédito puro.

---

### 6.3 Diligencia debida sobre el proveedor
Verificar y documentar:
1. Razón social exacta y país de registro.
2. Autorización como CASP/PSC bajo MiCA en la UE.
3. Segregación real de saldos de clientes.
4. Pruebas de reservas (contrastadas con pruebas de pasivos).
5. Comisiones completas y vías judiciales de reclamación.

---

### 6.4 Higiene operativa
- Exportación mensual sistemática de historiales.
- Autenticación 2FA mediante llaves físicas (FIDO2) o apps autenticadoras, **eliminando SMS** para prevenir *SIM-swap*.
- Listas blancas de direcciones de retirada activadas.`
  },
  {
    id: 'cap-7',
    number: 7,
    title: 'Wallets, claves y custodia',
    partId: 'parte-2',
    partTitle: 'Parte II — Mercados e infraestructura',
    summary: 'Tipología de custodia (software, hardware, multisig, MPC, smart wallets), semilla y respaldo, aprobaciones/permisos como riesgo silencioso y segmentación de 4 carteras.',
    keyTakeaway: 'Una aprobación ilimitada concedida a un contrato inteligente es un cheque en blanco permanente: si el contrato es vulnerado años después, los fondos pueden ser sustraídos sin nueva firma.',
    content: `### 7.1 Tipología de monederos
- **Hot wallet:** claves en memoria de dispositivo conectado (máxima exposición a malware).
- **Hardware wallet:** firma aislada sin exponer clave privada (no protege frente a firmar conscientemente transacciones maliciosas).
- **Multisig (M de N) y MPC:** eliminación de puntos únicos de fallo.
- **EOA frente a Smart Accounts:** cuentas controladas por código (ERC-4337) que amplían funciones pero suman superficie de contrato.

---

### 7.2 Semilla y respaldo
Reglas no negociables:
- La semilla nunca se fotografía, ni se escribe en notas digitales ni en la nube.
- Respaldo físico resistente a fuego y agua en ubicación segura.
- Plan de contingencia, sucesión o incapacidad documentado sin revelar las claves en el documento.

---

### 7.3 Aprobaciones y firma ciega: el riesgo silencioso
- **Aprobaciones ilimitadas (\`infinite approvals\`):** conceder gasto sin límite permite a un atacante que vulnere el contrato drenar el saldo restante en cualquier momento futuro.
- **Firmas tipo Permit (EIP-2612 / EIP-712):** autorizaciones fuera de cadena firmadas digitalmente que no dejan transacción hasta que el receptor las ejecuta.
- **Firma ciega (\`blind signing\`):** firmar cargas de datos que el hardware no puede decodificar en pantalla. Debe desactivarse por defecto.

---

### 7.4 Segmentación operativa en 4 monederos

| Monedero | Propósito | Nivel de exposición |
|---|---|---|
| **Reserva** | Almacenamiento a largo plazo | Cero interacción con contratos |
| **Operativo** | Interacción con protocolos contrastados | Aprobaciones acotadas y revocadas |
| **Exploración** | Pruebas y protocolos nuevos | Saldos mínimos desechables |
| **Recepción** | Cobros de terceros | Barrido periódico hacia reserva |`
  },
  {
    id: 'cap-8',
    number: 8,
    title: 'Redes e infraestructura',
    partId: 'parte-2',
    partTitle: 'Parte II — Mercados e infraestructura',
    summary: 'L1, L2 (rollups optimistas vs ZK) y sidechains, nodos y RPC, exploradores de bloques, oráculos y puentes cross-chain.',
    keyTakeaway: 'La red forma parte de la identidad del activo. Un token con el mismo ticker en dos redes distintas tiene contratos, puentes, liquidez y riesgos completamente diferentes.',
    content: `### 8.1 L1, L2 y sidechains
- **L1:** consenso y seguridad soberana.
- **L2 / Rollups:** ejecutan fuera de la capa base y publican pruebas o datos en L1 (optimistic con periodo de disputa o ZK con pruebas de validez).
- **Sidechain:** red independiente con puente propio que **no hereda la seguridad de la L1**.

---

### 8.2 Nodos, RPC y exploradores
- Los puntos de enlace RPC pueden censurar, registrar IP vinculadas a direcciones o devolver datos desincronizados. Usar proveedores contrastados y verificar contra exploradores independientes.
- El distintivo "código verificado" en un explorador solo acredita que el código compila con el bytecode desplegado; no garantiza ausencia de backdoors ni de vulnerabilidades.

---

### 8.3 Oráculos y Puentes (*bridges*)
- **Oráculos:** alimentan contratos con datos del exterior. Si el oráculo es manipulable o se retrasa, causa liquidaciones falsas o préstamos insolventes.
- **Puentes cross-chain:** concentran históricamente los mayores incidentes de seguridad del ecosistema por acumular liquidez en un punto único bajo custodia de validadores reducidos.`
  }
];
