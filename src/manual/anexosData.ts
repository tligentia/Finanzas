import { ManualAnnex } from './types';

export const MANUAL_ANNEXES: ManualAnnex[] = [
  {
    id: 'anexo-a',
    letter: 'A',
    title: 'Glosario Estructural',
    summary: 'Definición precisa y terminológica de más de 45 conceptos clave en criptoeconomía, DeFi y regulación europea.',
    content: `| Término | Definición Técnica y Operativa |
|---|---|
| **ADL (*auto-deleveraging*)** | Mecanismo por el que un proveedor de derivados reduce automáticamente posiciones rentables cuando el fondo de seguro no cubre las pérdidas de las liquidadas. |
| **Agregador** | Servicio que enruta una operación entre varios mercados para mejorar el precio de ejecución final. |
| **Airdrop** | Distribución de tokens a direcciones que cumplen un criterio; genera un hecho imponible con fecha y valoración propias. |
| **AMLA** | Autoridad europea de lucha contra el blanqueo de capitales creada en el paquete antiblanqueo de la UE. |
| **AMLR** | Reglamento (UE) 2024/1624, marco europeo de prevención del blanqueo. Aplicación general desde el 10 de julio de 2027. |
| **AMM (*automated market maker*)** | Mercado cuyo precio se determina por fórmula matemática sobre las reservas de un pool, sin libro de órdenes. |
| **Aprobación (*approval*)** | Autorización concedida a un contrato para gastar tokens del usuario; persiste hasta su revocación activa. |
| **ART** | Ficha referenciada a activos, categoría de MiCA para criptoactivos estabilizados frente a un valor, derecho o cesta. |
| **Base** | Diferencia cuantitativa entre el precio de un futuro y el del subyacente al contado. |
| **Bridge (puente)** | Infraestructura que traslada valor entre redes mediante bloqueo y emisión, quema y liberación, o liquidez en ambos lados. |
| **CARF** | Marco de la OCDE para el intercambio automático de información sobre criptoactivos. |
| **CASP / PSC** | Proveedor de servicios de criptoactivos, figura autorizada bajo MiCA. |
| **CEX** | Exchange centralizado; mantiene un registro interno de saldos de clientes sin transacciones on-chain para órdenes locales. |
| **CLOB** | Libro de órdenes limitadas centralizado (*Central Limit Order Book*). |
| **DAC8** | Directiva (UE) 2023/2226, que extiende el intercambio automático de información fiscal a criptoactivos y dinero electrónico. |
| **DAO** | Organización cuyas decisiones se adoptan mediante votación sobre parámetros, tesorería y actualizaciones de un protocolo. |
| **Depeg** | Desviación sostenida de una stablecoin respecto de su precio de referencia. |
| **DEX** | Mercado descentralizado que opera enteramente mediante contratos inteligentes. |
| **Drainer** | Contrato o firma diseñados para vaciar un monedero mediante una autorización concedida involuntariamente por el usuario. |
| **EMT** | Ficha de dinero electrónico, categoría de MiCA para criptoactivos referenciados a una única moneda oficial. |
| **EOA (*externally owned account*)** | Cuenta controlada directamente por una clave privada. |
| **Finalidad** | Estado en que una transacción se considera irreversible. Su definición varía por red. |
| **Firma ciega** | Aprobación de datos que el dispositivo firmante no puede decodificar ni mostrar en pantalla. |
| **Funding** | Pago periódico entre posiciones largas y cortas en un contrato perpetuo. |
| **Gas** | Unidad de coste computacional de una transacción. Se abona aunque la transacción falle. |
| **LP token** | Recibo que certifica una posición de provisión de liquidez en un pool. |
| **LST / LRT** | Token de staking líquido (*Liquid Staking Token*) / de restaking (*Liquid Restaking Token*). |
| **LTV (*loan-to-value*)** | Relación entre la deuda contraída y el valor del colateral aportado. |
| **Mark price** | Precio de referencia construido por un proveedor de derivados, utilizado para PnL no realizado y liquidaciones. |
| **Mempool** | Conjunto de transacciones pendientes de inclusión en un bloque, públicamente observable. |
| **MEV** | Valor extraíble por reordenación, inclusión o exclusión de transacciones en un bloque. |
| **MiCA** | Reglamento (UE) 2023/1114, marco europeo de mercados de criptoactivos. |
| **MPC** | Computación multiparte; genera firmas sin que la clave completa exista en un único lugar. |
| **Multifirma (*multisig*)** | Esquema criptográfico que exige M firmas de N para autorizar una operación. |
| **Nonce** | Contador secuencial por cuenta que ordena las transacciones e impide su repetición. |
| **Oráculo** | Sistema que introduce datos externos de precios o estados en contratos inteligentes. |
| **Perpetuo (*perp*)** | Derivado financiero sin vencimiento alineado con un índice spot mediante tasa de funding. |
| **Pérdida impermanente** | Diferencia entre el valor de una posición en pool y el de mantener los mismos activos fuera de él. |
| **Proxy** | Patrón de contrato que permite actualizar la lógica de ejecución manteniendo la dirección y el estado. |
| **Rebase** | Cambio algorítmico del saldo de un token sin requerir transacción del titular. |
| **Rollup** | Red L2 que ejecuta transacciones fuera de la capa base publicando datos o pruebas de validez en ella. |
| **RWA** | Activo del mundo real tokenizado (*Real-World Asset*). |
| **Semilla (*seed phrase*)** | Secuencia mnemotécnica de palabras que regenera todas las claves de un monedero. |
| **SIM-swap** | Apropiación fraudulenta de un número de teléfono para vulnerar factores de autenticación SMS. |
| **Slashing** | Penalización económica aplicada a un validador y trasladada a quienes delegaron en él. |
| **Slippage** | Diferencia porcentual entre el precio esperado y el precio efectivo de ejecución. |
| **Timelock** | Retraso obligatorio entre la aprobación y la ejecución efectiva de un cambio en un protocolo. |
| **Travel Rule** | Obligación legal de acompañar las transferencias con datos de ordenante y beneficiario (Reg. UE 2023/1113). |
| **TVL (*total value locked*)** | Valor total depositado en un protocolo; métrica de volumen de capital, no de seguridad intrínseca. |
| **UTXO** | Salida de transacción no gastada; modelo contable de Bitcoin y derivados. |
| **Vault** | Contrato que ejecuta una estrategia programada sobre los depósitos de los participantes. |`
  },
  {
    id: 'anexo-b',
    letter: 'B',
    title: 'Checklists Consolidados',
    summary: 'Listas de verificación exhaustivas para alta de activos, proveedores, pre-firma, post-operación y revisiones periódicas.',
    content: `### B.1 Alta de un activo nuevo
- Red y \`chainId\` identificados de forma inequívoca.
- Dirección de contrato verificada en fuente oficial y en explorador de bloques.
- Número de decimales confirmado.
- Emisor identificado, con forma jurídica y país de jurisdicción.
- Categoría regulatoria evaluada (EMT / ART / Otro / Fuera de MiCA).
- Capacidades del contrato auditadas: mint, pause, blacklist, upgradeable, fee-on-transfer.
- Auditorías localizadas, con firma, alcance y versión de código analizada.
- Profundidad de liquidez real y mercados de salida verificados.
- Fuente oficial de precio en euros designada.
- Registro formal de alta en el catálogo de activos con fecha y responsable.

---

### B.2 Alta de un proveedor o protocolo
- Dominio web oficial verificado por fuente independiente (no desde buscador o publicidad).
- Razón social, país y régimen de supervisión identificados.
- Autorización o registro comprobado (CNMV / Banco de España / autoridad UE equivalente).
- Condiciones de custodia y régimen de segregación de activos analizados.
- Cuadro completo de comisiones (incluidas tarifas de retirada y spreads).
- Contratos desplegados, proxies y versiones anotados.
- Dependencias identificadas (oráculos, puentes, protocolos subyacentes).
- Llaves de administración (\`admin_keys\`) y existencia de \`timelock\` verificadas.
- Historial de incidentes de seguridad y drawdowns revisado.
- Riesgo evaluado en las 8 dimensiones y exposición máxima autorizada fijada.
- Prueba con importe mínimo completada, verificando el ciclo completo de retirada.
- Alta en el catálogo de proveedores con fecha de próxima revisión.

---

### B.3 Antes de firmar cualquier transacción
- Red y \`chainId\` confirmados en el monedero firmante.
- Dirección de destino verificada completa (no solo los primeros y últimos caracteres).
- Token exacto por dirección de contrato, nunca por símbolo visible.
- Importe y decimales verificados.
- Memo o tag incluido si la red o el exchange lo exigen.
- Margen de deslizamiento (*slippage*) y fecha límite (*deadline*) razonables.
- Aprobación solicitada: importe acotado estrictamente a la operación y destinatario auditado.
- Comisión de red estimada y saldo suficiente en la moneda nativa para cubrir el gas.
- Resultado esperado descrito previamente por escrito.
- El dispositivo hardware muestra claramente en pantalla los datos de la transacción decodificados.

---

### B.4 Después de operar
- Guardar el identificador o \`hash\` y verificar el estado final de éxito en el explorador.
- Confirmar la recepción efectiva en el monedero de destino con el contrato e importe esperados.
- Actualizar el libro de operaciones maestro.
- Registrar la valoración en euros con fuente de precio y hora UTC exacta.
- **Revocar aprobaciones innecesarias concedidas durante la sesión.**
- Conciliar el salto por los 5 campos obligatorios (importe, comisión, hora, ID, activo/red).
- Documentar cualquier discrepancia o anomalía en el registro de incidencias con su causa raíz.

---

### B.5 Revisión periódica (mensual)
- Exportar los registros oficiales de todos los exchanges y proveedores en CSV/PDF.
- Conciliar saldos declarados por las entidades frente al inventario propio.
- Auditar y revocar aprobaciones vivas en carteras de interacción.
- Comprobar la exposición agregada por activo, red, protocolo, custodio y emisor.
- Verificar el estado regulatorio actualizado de los proveedores utilizados.
- Comprobar la integridad física de los respaldos de monederos y accesos autorizados.
- Actualizar la bitácora de riesgos.

---

### B.6 Revisión anual y fiscal
- Cierre de inventario y saldos a 31 de diciembre con valoración documentada y fechada.
- Verificación del umbral del Modelo 721 (50.000 € en el conjunto de saldos en el extranjero).
- Contraste del registro propio con los datos reportados por proveedores bajo Modelos 172/173 y DAC8.
- Revisión de los 6 criterios indispensables documentados (coste, valoración, devengos, LP).
- Prueba física de recuperación de monederos con saldos de prueba.
- Verificación de la integridad criptográfica de los archivos de registro.
- Validación con asesor fiscal colegiado antes de presentar declaraciones.`
  },
  {
    id: 'anexo-c',
    letter: 'C',
    title: 'Esquemas de Campos para Registros',
    summary: 'Estructura exacta y normalizada de los 6 registros del sistema documental maestro.',
    content: `### C.1 Libro de operaciones maestro (campos mínimos)
\`\`\`text
id_interno
fecha_hora_utc
tipo_evento          (deposito_fiat | retirada_fiat | compra | venta | permuta |
                      transferencia | aprobacion | swap | lp_entrada | lp_salida |
                      prestamo | repago | liquidacion | staking | recompensa |
                      bridge | derivado_apertura | derivado_cierre | funding |
                      airdrop | comision | otro)
activo_entrada       (red + contrato + simbolo)
importe_entrada
activo_salida        (red + contrato + simbolo)
importe_salida
valor_eur
fuente_precio
metodo_valoracion
hora_valoracion_utc
comision_importe
comision_activo
gas_importe
contraparte_o_protocolo
monedero_o_cuenta
id_orden
id_operacion
id_retiro
hash
red
bloque
referencia_bancaria
proposito
responsable
aprobado_por
enlace_evidencia
estado_conciliacion
observaciones
\`\`\`

---

### C.2 Catálogo de activos
\`\`\`text
id | simbolo | red | chainId | contrato | decimales | emisor | forma_juridica |
tipo | categoria_regulatoria | mint | pause | blacklist | upgradeable |
fee_on_transfer | rebase | auditorias | fuente_precio | nivel_riesgo |
exposicion_maxima | fecha_alta | fecha_revision | responsable
\`\`\`

---

### C.3 Catálogo de proveedores y protocolos
\`\`\`text
id | nombre | tipo (CEX/broker/custodio/protocolo/puente/oraculo) |
entidad_legal | jurisdiccion | url_oficial | fecha_verificacion_url |
autorizacion_registro | autoridad | contratos | versiones | proxy |
implementacion | auditorias | dependencias | admin_keys | timelock |
historial_incidentes | estado | exposicion_maxima | periodicidad_revision |
fecha_revision | responsable
\`\`\`

---

### C.4 Inventario de monederos y cuentas
\`\`\`text
id | tipo (software/hardware/multisig/MPC/custodio/smart) |
proposito (reserva/operativo/exploracion/recepcion) | redes | direccion |
titular | firmantes | umbral_multifirma | ubicacion_respaldo (referencia) |
prueba_recuperacion_fecha | fecha_alta | fecha_verificacion | estado
\`\`\`

---

### C.5 Registro de aprobaciones
\`\`\`text
id | red | token_contrato | contrato_autorizado | nombre_protocolo |
importe_autorizado | ilimitada (S/N) | tipo (transaccion/firma_permit) |
fecha_concesion | hash_concesion | finalidad | fecha_revocacion |
hash_revocacion | estado
\`\`\`

---

### C.6 Registro de riesgos e incidencias
\`\`\`text
id | tipo (riesgo/incidencia) | descripcion | dimension (1-8) |
probabilidad | impacto | nivel | control_existente | control_propuesto |
propietario | fecha_identificacion | cronologia | evidencias |
acciones | fecha_revision | estado | resolucion
\`\`\``
  },
  {
    id: 'anexo-d',
    letter: 'D',
    title: 'Autoevaluación: Las 20 Preguntas Clave',
    summary: 'Cuestionario de control: un sistema documental está completo cuando responde a estas 20 preguntas con evidencia y no con memoria.',
    content: `**Sobre el activo**
1. ¿Qué activo es exactamente, quién lo emite y en qué red existe?
2. ¿Qué derecho, si alguno, confiere al tenedor?
3. ¿Su suministro puede modificarse y por quién?
4. ¿Es la versión nativa o una representación puenteada sintética?

**Sobre el control**
5. ¿Quién controla las claves de cada monedero y cuenta?
6. ¿Quién puede actualizar, pausar o vaciar cada contrato con el que se interactúa?
7. ¿Qué aprobaciones de gasto están vivas ahora mismo y sobre qué importes?
8. ¿Qué ocurre si la persona con acceso no está disponible o sufre incapacidad?

**Sobre el recorrido y trazabilidad**
9. ¿Qué servicio interviene en cada salto y qué evidencia deja?
10. ¿Puede reconstruirse la cadena completa desde el euro de origen hasta la posición actual?
11. ¿Qué riesgos cambian cuando el activo pasa de CEX a monedero, de monedero a puente y de puente a protocolo?
12. ¿Qué saltos carecen de hash on-chain y por qué?

**Sobre el riesgo**
13. ¿Cuál es la exposición agregada por activo, red, protocolo, custodio y emisor?
14. ¿A qué precio se liquida cada posición apalancada y qué caída porcentual lo activa?
15. ¿Cuál es el componente más débil de cada posición compuesta?
16. ¿Qué límites numéricos están definidos por escrito y quién los audita?

**Sobre el cumplimiento**
17. ¿Qué información debe conservarse para auditoría, fiscalidad y cumplimiento, y durante cuánto tiempo?
18. ¿Los proveedores utilizados están autorizados en la UE conforme a MiCA?
19. ¿Los criterios de valoración, imputación de coste y devengo están escritos y se aplican de forma consistente?
20. ¿Qué supuesto legal o técnico sigue sin verificar?

> **Regla de Cierre:** La pregunta 20 no se cierra nunca. Se documenta de forma permanente.`
  },
  {
    id: 'anexo-e',
    letter: 'E',
    title: 'Fuentes Oficiales y Control de Versiones',
    summary: 'Relación exhaustiva de normativa primaria de la UE, publicaciones oficiales de CNMV y AEAT, y registro de versiones.',
    content: `### Normativa primaria de la Unión Europea
1. **Reglamento (UE) 2023/1114 (MiCA)**, de 31 de mayo de 2023, relativo a los mercados de criptoactivos. (EUR-Lex: \`eli/reg/2023/1114/oj\`).
2. **Reglamento (UE) 2023/1113 (Travel Rule)**, de 31 de mayo de 2023, relativo a la información que acompaña a las transferencias de fondos y determinados criptoactivos. (EUR-Lex: \`eli/reg/2023/1113/oj\`).
3. **Reglamento (UE) 2024/1624 (AMLR)**, de 31 de mayo de 2024, relativo a la prevención de la utilización del sistema financiero para el blanqueo de capitales. **Fecha de aplicación general verificada: 10 de julio de 2027**. (EUR-Lex: \`eli/reg/2024/1624/oj\`).
4. **Directiva (UE) 2023/2226 (DAC8)**, sobre cooperación administrativa en el ámbito de la fiscalidad, extendida a criptoactivos y dinero electrónico.
5. **Orden HFP/887/2023**, de 26 de julio, por la que se aprueban los Modelos 172 y 173 y sus especificaciones técnicas XML.

---

### Supervisores y Administraciones Públicas
6. **CNMV** — *Preguntas y Respuestas sobre el Reglamento MiCA*, 15 de diciembre de 2025:
   - Entrada en vigor del régimen CASP: **30 de diciembre de 2024**.
   - Fin del régimen transitorio en España: **1 de julio de 2026**.
   - Exigencia de autorización PSD2 del Banco de España para servicios de transferencia de EMT: referencia **1 de marzo de 2026**.
   - Reparto competencial: CNMV (CASP) y Banco de España (servicios de pago).
7. **Agencia Tributaria (AEAT)** — Preguntas frecuentes sobre los Modelos 172, 173 y 721 (sede electrónica). Sujetos obligados, plazos (mes de enero / 1 enero - 31 marzo) y umbral de 50.000 €.

---

### Control de Versiones

| Versión | Fecha | Descripción de Cambios |
|---|---|---|
| **0.1** | — | Mapa de conocimiento inicial, 13 secciones. |
| **1.0** | 2026-09-05 | Ampliación a manual formativo integral: 20 capítulos en 6 partes, 5 anexos, verificación de MiCA (CNMV), AMLR (EUR-Lex) y modelos 172/173/721 (AEAT). |`
  }
];
