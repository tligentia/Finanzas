export interface ConceptNote {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

const NOTES_STORAGE_KEY = 'app_user_concept_notes_v1';

export function getStoredNotesMap(): Record<string, ConceptNote> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function getConceptNote(id: string): ConceptNote | null {
  const map = getStoredNotesMap();
  return map[id] || null;
}

export function saveConceptNote(id: string, title: string, content: string): ConceptNote {
  const note: ConceptNote = {
    id,
    title,
    content,
    updatedAt: new Date().toISOString()
  };
  try {
    const map = getStoredNotesMap();
    map[id] = note;
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('app_notes_updated', { detail: { id, note } }));
  } catch (e) {
    console.error('Error saving note', e);
  }
  return note;
}

export function deleteConceptNote(id: string): void {
  try {
    const map = getStoredNotesMap();
    delete map[id];
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('app_notes_updated', { detail: { id } }));
  } catch (e) {
    console.error('Error deleting note', e);
  }
}

export function hasConceptNote(id: string): boolean {
  const note = getConceptNote(id);
  return Boolean(note && note.content && note.content.trim().length > 0);
}
