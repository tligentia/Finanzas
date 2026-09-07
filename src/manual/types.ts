export interface ManualChapter {
  id: string;
  number: number;
  title: string;
  partId: string;
  partTitle: string;
  summary: string;
  content: string; // Markdown / HTML formatted text
  keyTakeaway?: string;
  fieldsToRegister?: { field: string; desc: string }[];
  checklists?: { id: string; label: string; checked?: boolean }[];
}

export interface ManualAnnex {
  id: string;
  letter: string;
  title: string;
  summary: string;
  content: string;
}

export interface ManualPart {
  id: string;
  roman: string;
  title: string;
  question: string;
  chapterIds: string[];
}
