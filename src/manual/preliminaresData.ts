import { ManualPart } from './types';

export const MANUAL_META = {
  title: 'Manual del ecosistema cripto, stablecoins y DeFi',
  subtitle: 'Conocimiento operativo, trazabilidad y cumplimiento para España y la UE',
  version: '1.0',
  closingDate: '5 de septiembre de 2026',
  baseDocument: 'Mapa de conocimiento — actividad cripto, stablecoins y DeFi, v0.1',
  scope: 'Formativo y documental. Marco jurídico de referencia: Unión Europea y España.'
};

export const MANUAL_PARTS: ManualPart[] = [
  {
    id: 'parte-1',
    roman: 'I',
    title: 'Fundamentos',
    question: '¿Qué existe y qué es exactamente cada cosa?',
    chapterIds: ['cap-1', 'cap-2', 'cap-3', 'cap-4']
  },
  {
    id: 'parte-2',
    roman: 'II',
    title: 'Mercados e infraestructura',
    question: '¿Dónde y cómo se negocia, custodia y liquida?',
    chapterIds: ['cap-5', 'cap-6', 'cap-7', 'cap-8']
  },
  {
    id: 'parte-3',
    roman: 'III',
    title: 'DeFi: Servicios y contratos',
    question: '¿Qué hacen los protocolos y qué riesgo introducen?',
    chapterIds: ['cap-9', 'cap-10', 'cap-11', 'cap-12', 'cap-13', 'cap-14']
  },
  {
    id: 'parte-4',
    roman: 'IV',
    title: 'Riesgo y seguridad',
    question: '¿Qué puede salir mal y cómo se controla?',
    chapterIds: ['cap-15', 'cap-16']
  },
  {
    id: 'parte-5',
    roman: 'V',
    title: 'Trazabilidad, cumplimiento y fiscalidad',
    question: '¿Qué hay que registrar, declarar y demostrar?',
    chapterIds: ['cap-17', 'cap-18', 'cap-19', 'cap-20']
  },
  {
    id: 'parte-6',
    roman: 'VI',
    title: 'Anexos',
    question: 'Glosario, checklists, esquemas, autoevaluación y fuentes',
    chapterIds: ['anexo-a', 'anexo-b', 'anexo-c', 'anexo-d', 'anexo-e']
  }
];

export const PRELIMINARES_CONTENT = {
  disclaimer: `Este manual no constituye recomendación de inversión, asesoramiento jurídico, fiscal ni contable, ni instrucciones de custodia de claves. Su objeto es describir el ecosistema, sus componentes, sus riesgos y los registros que una persona o entidad debe conservar para poder explicar, auditar y declarar su actividad.

Tres advertencias que condicionan todo el documento:
1. La calificación jurídica y fiscal depende de hechos concretos. El mismo activo, movido por dos personas distintas, con residencia distinta o propósito distinto, puede tener tratamiento distinto. Ningún capítulo sustituye la validación por profesional competente.
2. El ecosistema cambia más rápido que la documentación. Fechas, versiones de contratos, parámetros de riesgo y condiciones de proveedores caducan. Todo dato con fecha en este manual lleva marca temporal explícita.
3. Lo que no está verificado se marca como no verificado. Cuando el manual no puede afirmar algo con base documental, lo dice. No se rellenan huecos con suposiciones.`,

  howToUse: `El documento se organiza en seis partes y veinte capítulos, más cinco anexos.

Estructura interna de cada capítulo operativo:
• Definición — qué es, con precisión terminológica.
• Mecánica — cómo funciona realmente, no cómo se describe comercialmente.
• Ejemplo trazado — un caso concreto con los datos que deja.
• Riesgos específicos — los propios de ese componente, no los genéricos.
• Campos a registrar — la lista mínima de evidencia.
• Checklist — verificaciones antes, durante y después.

Convenciones de formato:
• Campo en formato código: identificador que debe capturarse literalmente.
• Negrita: término definido en el glosario (Anexo A).
• Cursiva: término en inglés sin traducción consolidada.
• Toda hora se registra en UTC, con indicación adicional de hora local si es relevante para plazos administrativos.
• Los importes se registran en la unidad nativa del activo y en euros, con fuente y momento de valoración.`
};
