import React, { useState, useEffect, useRef } from 'react';
import { 
  NotebookPen, Bold, Italic, Heading, List, Quote, 
  AlertTriangle, Lightbulb, CheckCircle2, Save, Trash2, 
  Copy, Check, Eye, Edit3, Columns, X, Sparkles 
} from 'lucide-react';
import { getConceptNote, saveConceptNote, deleteConceptNote } from '../utils/notesStorage';

interface Props {
  conceptId: string;
  conceptTitle: string;
  onClose?: () => void;
  className?: string;
  isCompact?: boolean;
}

export const ConceptNotesEditor: React.FC<Props> = ({
  conceptId,
  conceptTitle,
  onClose,
  className = '',
  isCompact = false
}) => {
  const [content, setContent] = useState<string>('');
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('edit');
  const [confirmClear, setConfirmClear] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load existing note on conceptId change
  useEffect(() => {
    const existing = getConceptNote(conceptId);
    if (existing) {
      setContent(existing.content);
      setSavedAt(existing.updatedAt);
    } else {
      setContent('');
      setSavedAt(null);
    }
    setConfirmClear(false);
  }, [conceptId]);

  // Handle ESC key if onClose is provided
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Auto-save on change
  const handleChange = (val: string) => {
    setContent(val);
    const note = saveConceptNote(conceptId, conceptTitle, val);
    setSavedAt(note.updatedAt);
  };

  const handleManualSave = () => {
    const note = saveConceptNote(conceptId, conceptTitle, content);
    setSavedAt(note.updatedAt);
  };

  const handleClear = () => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 3000);
      return;
    }
    deleteConceptNote(conceptId);
    setContent('');
    setSavedAt(null);
    setConfirmClear(false);
  };

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to insert or wrap text in textarea
  const insertFormatting = (prefix: string, suffix: string = '', placeholder: string = 'texto') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const textToInsert = selectedText || placeholder;
    const replacement = `${prefix}${textToInsert}${suffix}`;
    
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    const note = saveConceptNote(conceptId, conceptTitle, newContent);
    setSavedAt(note.updatedAt);

    // Reposition cursor
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 10);
  };

  const renderFormattedPreview = (raw: string) => {
    if (!raw.trim()) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400 space-y-2 text-center">
          <NotebookPen size={32} className="text-gray-300 stroke-[1.5]" />
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Sin notas registradas</p>
          <p className="text-xs text-gray-400 max-w-xs">Escribe y formatea tus reflexiones personales, tesis operativas o recordatorios.</p>
        </div>
      );
    }

    const lines = raw.split('\n');
    return (
      <div className="space-y-2.5 text-gray-900 leading-relaxed text-sm">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-2" />;
          }

          // Header ###
          if (trimmed.startsWith('### ')) {
            return (
              <h4 key={idx} className="text-sm md:text-base font-black uppercase tracking-tight text-gray-900 border-b border-gray-100 pb-1 mt-3">
                {trimmed.replace(/^###\s+/, '')}
              </h4>
            );
          }

          // Header ##
          if (trimmed.startsWith('## ')) {
            return (
              <h3 key={idx} className="text-base md:text-lg font-black uppercase tracking-tight text-red-700 border-b border-red-100 pb-1 mt-4">
                {trimmed.replace(/^##\s+/, '')}
              </h3>
            );
          }

          // Quote >
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="border-l-4 border-red-700 bg-red-50/40 p-3 rounded-r-xl text-gray-800 font-semibold my-2 italic text-xs md:text-sm">
                {renderInlineStyles(trimmed.replace(/^>\s+/, ''))}
              </blockquote>
            );
          }

          // Warning ⚠️
          if (trimmed.startsWith('⚠️')) {
            return (
              <div key={idx} className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-900 text-xs md:text-sm font-semibold flex items-start gap-2 my-2">
                <AlertTriangle size={16} className="text-red-700 shrink-0 mt-0.5" />
                <span>{renderInlineStyles(trimmed.replace(/^⚠️\s*/, ''))}</span>
              </div>
            );
          }

          // Idea 💡
          if (trimmed.startsWith('💡')) {
            return (
              <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs md:text-sm font-semibold flex items-start gap-2 my-2">
                <Lightbulb size={16} className="text-gray-900 shrink-0 mt-0.5" />
                <span>{renderInlineStyles(trimmed.replace(/^💡\s*/, ''))}</span>
              </div>
            );
          }

          // Verified ✅
          if (trimmed.startsWith('✅')) {
            return (
              <div key={idx} className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-xs md:text-sm font-bold flex items-start gap-2 my-2">
                <CheckCircle2 size={16} className="text-red-700 shrink-0 mt-0.5" />
                <span>{renderInlineStyles(trimmed.replace(/^✅\s*/, ''))}</span>
              </div>
            );
          }

          // Bullet • or -
          if (trimmed.startsWith('• ') || trimmed.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2 text-xs md:text-sm text-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-red-700 shrink-0 mt-2"></span>
                <span>{renderInlineStyles(trimmed.replace(/^([•-]\s+)/, ''))}</span>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={idx} className="text-xs md:text-sm text-gray-800">
              {renderInlineStyles(line)}
            </p>
          );
        })}
      </div>
    );
  };

  const renderInlineStyles = (text: string) => {
    // Split by bold (**text**)
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-black text-gray-950">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-gray-800">{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <div className={`bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col ${className}`}>
      {/* Top Bar / Header */}
      <div className="p-4 md:px-6 bg-gray-50/70 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-red-700 text-white rounded-xl shadow-sm">
            <NotebookPen size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs md:text-sm font-black uppercase tracking-tight text-gray-900">
                Mis Notas Personales
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-red-50 border border-red-100 text-[10px] font-bold text-red-700 uppercase tracking-wider">
                Memorizado Local
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5 truncate max-w-xs md:max-w-md">
              Concepto: {conceptTitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {/* View mode switcher */}
          <div className="bg-white p-1 rounded-xl border border-gray-200 flex items-center shadow-xs">
            <button
              onClick={() => setViewMode('edit')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                viewMode === 'edit' ? 'bg-gray-900 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Modo Edición"
            >
              <Edit3 size={12} />
              <span className="hidden sm:inline">Editor</span>
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-1 ${
                viewMode === 'preview' ? 'bg-red-700 text-white shadow-xs' : 'text-gray-500 hover:text-red-700'
              }`}
              title="Vista Previa Formateada"
            >
              <Eye size={12} />
              <span className="hidden sm:inline">Vista</span>
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`hidden md:flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all items-center gap-1 ${
                viewMode === 'split' ? 'bg-gray-900 text-white shadow-xs' : 'text-gray-500 hover:text-gray-900'
              }`}
              title="Vista Dividida"
            >
              <Columns size={12} />
              <span>Doble</span>
            </button>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-red-700 hover:bg-gray-100 transition-colors ml-1"
              title="Cerrar notas (ESC)"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="px-4 py-2 bg-white border-b border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => insertFormatting('**', '**', 'negrita')}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 font-bold hover:text-red-700 transition-colors"
            title="Negrita (**texto**)"
          >
            <Bold size={14} />
          </button>
          <button
            onClick={() => insertFormatting('*', '*', 'cursiva')}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-red-700 transition-colors"
            title="Cursiva (*texto*)"
          >
            <Italic size={14} />
          </button>
          <button
            onClick={() => insertFormatting('### ', '\n', 'Encabezado')}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-red-700 transition-colors"
            title="Título (### Título)"
          >
            <Heading size={14} />
          </button>
          <button
            onClick={() => insertFormatting('• ', '\n', 'Punto clave')}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-red-700 transition-colors"
            title="Lista con viñetas (•)"
          >
            <List size={14} />
          </button>
          <button
            onClick={() => insertFormatting('> ', '\n', 'Idea o cita destacada')}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-700 hover:text-red-700 transition-colors"
            title="Cita / Destacado (> texto)"
          >
            <Quote size={14} />
          </button>
          
          <div className="w-[1px] h-4 bg-gray-200 mx-1"></div>

          {/* Quick preset badges */}
          <button
            onClick={() => insertFormatting('⚠️ ', '\n', 'Riesgo / Advertencia')}
            className="px-2 py-1 rounded-md bg-red-50 hover:bg-red-100 text-red-700 font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1"
            title="Añadir alerta de riesgo"
          >
            <AlertTriangle size={11} />
            <span>Riesgo</span>
          </button>
          <button
            onClick={() => insertFormatting('💡 ', '\n', 'Tesis operativa o conclusión')}
            className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1"
            title="Añadir tesis o idea"
          >
            <Lightbulb size={11} />
            <span>Tesis</span>
          </button>
          <button
            onClick={() => insertFormatting('✅ ', '\n', 'Elemento validado')}
            className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-[10px] uppercase tracking-wider transition-colors flex items-center gap-1"
            title="Añadir verificación"
          >
            <CheckCircle2 size={11} className="text-red-700" />
            <span>Check</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={!content}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 disabled:opacity-30 transition-colors flex items-center gap-1 text-[11px] font-bold"
            title="Copiar nota al portapapeles"
          >
            {copied ? <Check size={13} className="text-red-700" /> : <Copy size={13} />}
            <span className="hidden sm:inline">{copied ? 'Copiado' : 'Copiar'}</span>
          </button>
          
          <button
            onClick={handleClear}
            disabled={!content}
            className={`p-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1 disabled:opacity-30 ${
              confirmClear ? 'bg-red-700 text-white' : 'text-gray-400 hover:text-red-700 hover:bg-red-50'
            }`}
            title={confirmClear ? 'Haz clic de nuevo para confirmar borrado' : 'Borrar nota'}
          >
            <Trash2 size={13} />
            <span className="text-[10px] uppercase tracking-wider">{confirmClear ? '¿Borrar?' : 'Limpiar'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Body */}
      <div className="p-4 md:p-6 flex-1 min-h-[200px] overflow-hidden">
        {viewMode === 'edit' && (
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={`Escribe aquí tus notas personales sobre ${conceptTitle}...\n\nPuedes usar:\n• Viñetas con '• ' o '- '\n**Texto en negrita**\n*Texto en cursiva*\n### Títulos de sección\n> Citas o ideas destacadas\n⚠️ Alertas de riesgo`}
            className="w-full h-full min-h-[220px] p-4 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs md:text-sm font-mono text-gray-900 outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all resize-none shadow-inner"
          />
        )}

        {viewMode === 'preview' && (
          <div className="w-full h-full min-h-[220px] p-5 bg-white border border-gray-100 rounded-2xl overflow-y-auto max-h-[380px] custom-scrollbar shadow-xs">
            {renderFormattedPreview(content)}
          </div>
        )}

        {viewMode === 'split' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full min-h-[220px]">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={`Escribe aquí tus notas personales sobre ${conceptTitle}...`}
              className="w-full h-full min-h-[220px] p-4 bg-gray-50/70 border border-gray-200 rounded-2xl text-xs font-mono text-gray-900 outline-none focus:ring-2 focus:ring-red-700/20 focus:border-red-700 transition-all resize-none shadow-inner"
            />
            <div className="w-full h-full min-h-[220px] p-4 bg-gray-50/30 border border-gray-100 rounded-2xl overflow-y-auto max-h-[350px] custom-scrollbar">
              <span className="text-[10px] font-black uppercase tracking-wider text-gray-400 block mb-2">Vista Previa:</span>
              {renderFormattedPreview(content)}
            </div>
          </div>
        )}
      </div>

      {/* Footer info & manual save */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
        <div className="flex items-center gap-2">
          {savedAt ? (
            <span className="flex items-center gap-1 text-gray-700 font-semibold">
              <CheckCircle2 size={12} className="text-red-700" />
              <span>Guardado en memoria ({new Date(savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})</span>
            </span>
          ) : (
            <span>Sin cambios pendientes</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span>{wordCount} palabras • {content.length} caracteres</span>
          <button
            onClick={handleManualSave}
            className="px-3 py-1 bg-gray-900 hover:bg-black text-white rounded-lg transition-colors flex items-center gap-1 font-black text-[10px] uppercase tracking-wider active:scale-95"
          >
            <Save size={11} />
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
