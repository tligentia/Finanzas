import { ManualChapter } from './types';

export const PARTE_4_CHAPTERS: ManualChapter[] = [
  {
    id: 'cap-15',
    number: 15,
    title: 'Matriz de riesgo',
    partId: 'parte-4',
    partTitle: 'Parte IV — Riesgo y seguridad',
    summary: 'Las 8 dimensiones de riesgo estructural, la regla del eslabón más débil, la tabla de niveles y la fijación de límites numéricos previos.',
    keyTakeaway: 'El riesgo de una posición compuesta es al menos el de su componente más débil, no la media. Un vault excelente que depende de un puente frágil es una posición frágil.',
    content: `### 15.1 Las 8 dimensiones de riesgo estructural

1. **Mercado:** volatilidad extrema y correlación que converge a 1 en caídas de pánico.
2. **Crédito y contraparte:** solvencia de emisores de stablecoins, custodios y prestatarios.
3. **Smart contract:** auditorías incompletas, actualización por proxy sin aviso y fallos lógicos.
4. **Stablecoin:** calidad de reservas, colapso de paridad (*depeg*) y congelación.
5. **Operativo:** errores de dirección, red errónea, nonces bloqueados, omisión de memos.
6. **Ciberseguridad:** drenadores, phishing y compromiso de firmas digitales.
7. **Legal y fiscal:** cumplimiento normativo (MiCA), obligaciones informativas y prescripciones.
8. **Concentración:** exposición agregada por activo, custodio, red y firmantes únicos.

---

### 15.2 Método de evaluación y niveles

| Nivel | Criterio | Protocolo de respuesta |
|---|---|---|
| **Crítico** | Pérdida potencial total y control ausente | **No operar bajo ningún concepto** |
| **Alto** | Impacto severo con control parcial | Límites estrictos de exposición y doble firma |
| **Medio** | Impacto acotado y control mitigador | Operar con monitorización continua |
| **Bajo** | Impacto residual y control probado | Operar con registro estándar |

---

### 15.3 Límites numéricos obligatorios
Fijar por escrito **antes** de ejecutar:
- Exposición máxima por protocolo y por custodio.
- Pérdida máxima acumulada aceptable (*stop-loss* global).
- Porcentaje de caída máxima tolerable antes de liquidación forzosa.`
  },
  {
    id: 'cap-16',
    number: 16,
    title: 'Seguridad operativa y vectores de ataque',
    partId: 'parte-4',
    partTitle: 'Parte IV — Riesgo y seguridad',
    summary: 'Phishing avanzado, malware de portapapeles, drenadores de wallets, firma ciega, SIM-swap, planes de sucesión y protocolo de respuesta a incidentes en 5 pasos.',
    keyTakeaway: 'Una urgencia comunicada por un tercero es en sí misma una señal de alerta de fraude. Tras un incidente, las ofertas de recuperación de fondos son un segundo fraude sobre la víctima.',
    content: `### 16.1 Phishing, dominios clonados y malware
- **Buscadores y anuncios patrocinados:** los resultados de pago suelen suplantar a las dApps oficiales con ligeras variaciones de dominio (*typosquatting*).
- **Malware de portapapeles (*clipper*):** sustituye silenciosamente la dirección copiada en el portapapeles por la del atacante. **Verificar siempre la dirección completa carácter por carácter.**
- **SIM-swap:** duplicado no autorizado de la tarjeta SIM para vulnerar el 2FA por SMS. **Eliminar el SMS y utilizar exclusivamente llaves FIDO2 o aplicaciones de autenticación.**

---

### 16.2 Drenadores (*drainers*) y firma ciega
- Contratos maliciosos que solicitan firmas \`Permit\` o aprobaciones ilimitadas bajo pretextos de airdrops o comprobación de saldos.
- La segmentación de carteras es la principal defensa: mantener la reserva en monederos fríos sin interacción con smart contracts.

---

### 16.3 Protocolo de respuesta a incidentes en 5 pasos

1. **Contener:** transferir inmediatamente los fondos remanentes a un monedero limpio y no comprometido; revocar aprobaciones vivas.
2. **Preservar evidencia:** capturar hashes on-chain, registros de conexión, dominios y correos con marca temporal antes de reiniciar o reinstalar equipos.
3. **Notificar:** alertar a exchanges para bloquear direcciones de depósito del atacante y presentar denuncia formal ante las autoridades policiales competentes.
4. **Evaluar obligaciones:** evaluar si existen datos personales afectados conforme al RGPD.
5. **Auditar la causa raíz:** documentar la cronología completa e identificar el control que falló para rediseñar los procedimientos.`
  }
];
