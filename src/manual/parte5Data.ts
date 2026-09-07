import { ManualChapter } from './types';

export const PARTE_5_CHAPTERS: ManualChapter[] = [
  {
    id: 'cap-17',
    number: 17,
    title: 'Trazabilidad y cadena de evidencia',
    partId: 'parte-5',
    partTitle: 'Parte V — Trazabilidad, cumplimiento y fiscalidad',
    summary: 'Construcción de evidencia en el momento del hecho, identificadores por salto, flujo de reconciliación en 5 campos, los 7 puntos de ruptura habituales y política de retención.',
    keyTakeaway: 'La evidencia se construye en el momento del hecho: reconstruirla después es costoso, incompleto y a menudo imposible. Las capturas de pantalla son solo apoyo; la evidencia primaria son los extractos oficiales y los hashes on-chain.',
    content: `### 17.1 Principio de evidencia simultánea
Reconstruir transacciones meses después choca con barreras insalvables:
- Los exchanges limitan los historiales y eliminan los datos al cerrar cuentas.
- Los precios históricos intradía no se pueden reproducir con idéntica metodología.
- Páginas web, pools y documentación técnica de protocolos desaparecen sin aviso.

---

### 17.2 Flujo de reconciliación y los 5 campos de cruce

\`\`\`text
Banco / fiat ──[depósito]──> Proveedor CEX ──[orden]──> Saldo CEX ──[retiro]──> Wallet propia
     │                                                                                │
   Conciliar                                                                    [interacción]
     │                                                                                │
Banco <──[retiro fiat]── CEX <──[depósito]── Wallet propia <──[cierre]── Protocolo DeFi
\`\`\`

**Cada salto se concilia obligatoriamente por 5 campos:**
1. Importe (bruto y neto).
2. Comisión soportada y divisa.
3. Fecha y hora exacta UTC.
4. Identificador único (\`id_orden\`, \`hash\`, referencia bancaria).
5. Activo exacto y red correspondiente.

---

### 17.3 Los 7 puntos de ruptura habituales

| Ruptura | Causa raíz | Medida de prevención |
|---|---|---|
| **Recibido ≠ Enviado** | Comisión de red o *fee on transfer* | Anotar importe bruto y neto de forma separada |
| **Falta el hash** | Operación interna en libro de CEX | Documentar que es movimiento off-chain con su ID |
| **Precio no reproducible** | Fuente no anotada en su momento | Fijar por política interna una fuente y hora fija |
| **Token inesperado** | Versión puenteada sintética | Registrar siempre contrato y red, nunca solo el símbolo |
| **Recompensas omitidas** | Acumulación automática sin evento | Registrar saldos periódicos con método auditable |
| **Posición LP sin coste** | Solo se anotó la salida | Documentar la composición exacta aportada al entrar |
| **Gas ignorado** | Se desestima por pequeño | Registrar y acumular; en volumen es una partida relevante |`
  },
  {
    id: 'cap-18',
    number: 18,
    title: 'Marco normativo de la Unión Europea',
    partId: 'parte-5',
    partTitle: 'Parte V — Trazabilidad, cumplimiento y fiscalidad',
    summary: 'Reglamento MiCA (EMT vs ART y régimen CASP/PSC), calendario verificado CNMV/Banco de España, Travel Rule (Reg. 2023/1113), AMLR (Reg. 2024/1624 para 10 julio 2027), DAC8/CARF y RGPD.',
    keyTakeaway: 'Desde el 1 de julio de 2026 finaliza el periodo transitorio de MiCA en España (CNMV). Operar con proveedores no autorizados en la UE deja de ser un matiz formal y afecta directamente a la validez de la prueba documental.',
    content: `### 18.1 MiCA — Reglamento (UE) 2023/1114
Marco europeo unificado de mercados de criptoactivos.
- **Categorías:** EMT (referencia a una moneda oficial, reserva bancaria obligatoria), ART (referencia a cestas o materias primas) y Otros criptoactivos (sujetos a Libro Blanco).
- **Fuera de MiCA:** Instrumentos financieros clásicos (MiFID II), depósitos bancarios y NFTs singulares.

**Calendario y plazos verificados en España (CNMV & Banco de España):**
- **30 de diciembre de 2024:** Entrada en aplicación de la normativa de servicios de criptoactivos (CASP/PSC).
- **1 de marzo de 2026:** Plazo de referencia fijado por la CNMV para que los proveedores de transferencia de EMT cuenten con autorización de servicios de pago (PSD2) del Banco de España.
- **1 de julio de 2026:** Finalización del régimen transitorio en España para proveedores preexistentes (*CNMV, P&R MiCA, 15 dic 2025*).
- **Competencias:** La **CNMV** autoriza y supervisa a los CASP; el **Banco de España** supervisa pagos (PSD2) y el registro previo de cambio y custodia.

---

### 18.2 Travel Rule — Reglamento (UE) 2023/1113
Obliga a los proveedores a identificar ordenante y beneficiario en transferencias de criptoactivos. Al interactuar con carteras autoalojadas (*self-hosted wallets*), los exchanges exigen firmar mensajes o declarar la titularidad de la dirección para cumplir la norma.

---

### 18.3 Paquete Antiblanqueo: AMLR (Reg. UE 2024/1624) y AMLA
- **Fecha de aplicación general verificada en EUR-Lex:** **10 de julio de 2027**.
- Reglas directas de debida diligencia sobre clientes, restricciones a cuentas anónimas y creación de la autoridad supervisora europea **AMLA**.

---

### 18.4 Directiva DAC8 (UE 2023/2226) y CARF
Intercambio automático de información tributaria entre los Estados miembros sobre saldos y operaciones de criptoactivos. Despliegue operativo a partir de **2026**: la administración tributaria cruza de forma automatizada las declaraciones del contribuyente con los datos suministrados por los CASP europeos.`
  },
  {
    id: 'cap-19',
    number: 19,
    title: 'Fiscalidad y obligaciones informativas en España',
    partId: 'parte-5',
    partTitle: 'Parte V — Trazabilidad, cumplimiento y fiscalidad',
    summary: 'Principio de registro por evento, Modelos informativos 172, 173 y 721 (plazos y umbral 50.000€), impacto de DAC8 y los 6 criterios indispensables a documentar.',
    keyTakeaway: 'La permuta entre criptoactivos genera alteración patrimonial a efectos de IRPF en España. Las discrepancias con los datos reportados bajo los Modelos 172/173 y DAC8 son detectables de forma sistemática.',
    content: `### 19.1 Principio de registro por evento
La fiscalidad se calcula sobre cada hecho generador individual, no sobre balances globales:
- Permutas entre criptoactivos (BTC por ETH, o token por stablecoin).
- Recompensas de staking, lending o minería.
- Cobro de comisiones de liquidez en pools LP.
- Pagos devengados por liquidación forzosa o comisiones de red pagadas en activo nativo.

---

### 19.2 Modelos informativos específicos (AEAT)

| Modelo | Sujeto obligado | Contenido declarado | Plazo de presentación |
|---|---|---|---|
| **Modelo 172** | Proveedores residentes que presten custodia | Saldos a 31 de diciembre por titular, moneda y valoración EUR | **Enero** del ejercicio siguiente |
| **Modelo 173** | Proveedores de cambio e intermediación | Operaciones de compra, venta, permuta y transferencia | **Enero** del ejercicio siguiente |
| **Modelo 721** | **Contribuyentes titulares** con saldos en el extranjero | Declaración de saldos si el conjunto supera **50.000 €** | **1 enero a 31 marzo** siguiente |

*Nota:* Los modelos 172 y 173 obligan a los proveedores, pero la AEAT utiliza sus bases de datos para contrastar las declaraciones individuales del IRPF y Patrimonio.

---

### 19.3 Los 6 criterios indispensables que deben estar documentados por escrito
1. Método de asignación de coste (FIFO u otro admisible).
2. Fuente de precios y hora fija diaria de valoración en euros.
3. Tratamiento contable de comisiones de red y gas.
4. Momento fijado de devengo de recompensas (generación vs disponibilidad vs reclamación).
5. Calificación de airdrops y bifurcaciones (*forks*).
6. Tratamiento de entradas y salidas en pools de liquidez LP.`
  },
  {
    id: 'cap-20',
    number: 20,
    title: 'Gobierno interno, inventario maestro y controles',
    partId: 'parte-5',
    partTitle: 'Parte V — Trazabilidad, cumplimiento y fiscalidad',
    summary: 'Los 5 registros maestros enlazados + inventario de monederos, gobierno interno RACI, y los checklists de control de entrada, firma y post-operación.',
    keyTakeaway: 'Un sistema documental sólido permite cruzar en cualquier momento la trazabilidad completa desde la cuenta bancaria de origen hasta el smart contract final mediante identificadores comunes.',
    content: `### 20.1 Los 5 registros maestros interconectados

1. **Catálogo de activos:** identificación de contratos, emisores, decimales, capacidades del código, nivel de riesgo y fuente de precios.
2. **Catálogo de proveedores y protocolos:** entidad legal, registro regulatorio, contratos auditados, dependencias y timelocks.
3. **Libro maestro de operaciones:** registro cronológico con IDs únicos, hashes on-chain, valoraciones en euros y estados de conciliación.
4. **Registro de riesgos e incidencias:** matriz de 8 dimensiones, límites autorizados y bitácora de eventos no planificados.
5. **Repositorio de cumplimiento:** expedientes KYC, políticas internas fechadas y declaraciones tributarias presentadas.
*Auxiliar indispensable:* **Inventario de monederos y cuentas**, con propósito asignado, red, responsables de firma y estado de verificación.

---

### 20.2 Gobierno interno y matriz RACI
- Segregación estricta de funciones: la persona que diseña la operación no debe ser quien la firma ni quien la concilia contablemente.
- Doble firma obligatoria para importes que superen los umbrales de riesgo medio fijados en la política interna.
- Procedimiento de contingencia y sucesión operativa ante indisponibilidad o incapacidad de firmantes autorizados.`
  }
];
