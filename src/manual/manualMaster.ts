import { ManualChapter, ManualAnnex, ManualPart } from './types';
import { MANUAL_META, MANUAL_PARTS, PRELIMINARES_CONTENT } from './preliminaresData';
import { PARTE_1_CHAPTERS } from './parte1Data';
import { PARTE_2_CHAPTERS } from './parte2Data';
import { PARTE_3_CHAPTERS } from './parte3Data';
import { PARTE_4_CHAPTERS } from './parte4Data';
import { PARTE_5_CHAPTERS } from './parte5Data';
import { MANUAL_ANNEXES } from './anexosData';

export const ALL_CHAPTERS: ManualChapter[] = [
  ...PARTE_1_CHAPTERS,
  ...PARTE_2_CHAPTERS,
  ...PARTE_3_CHAPTERS,
  ...PARTE_4_CHAPTERS,
  ...PARTE_5_CHAPTERS
];

export const ALL_ANNEXES: ManualAnnex[] = MANUAL_ANNEXES;

export { MANUAL_META, MANUAL_PARTS, PRELIMINARES_CONTENT };

export function getChapterById(id: string): ManualChapter | undefined {
  return ALL_CHAPTERS.find(c => c.id === id);
}

export function getAnnexById(id: string): ManualAnnex | undefined {
  return ALL_ANNEXES.find(a => a.id === id);
}

export function getChaptersByPart(partId: string): ManualChapter[] {
  return ALL_CHAPTERS.filter(c => c.partId === partId);
}
