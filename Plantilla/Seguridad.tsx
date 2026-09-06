import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Keyboard, Delete, Eye, EyeOff } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

export const Security: React.FC<Props> = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [showMask, setShowMask] = useState(false);
  const [activeChar, setActiveChar] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const gridChars = useMemo(() => {
    const required = ['7', '8', 'S', 'T', 'A', 'R'];
    const filler = 'BCDEFGHIJKMNOPQUVWXYZ01234569'.split('');
    let combined = [...required];
    while (combined.length < 16) {
      const char = filler[Math.floor(Math.random() * filler.length)];
      if (!combined.includes(char)) combined.push(char);
    }
    return combined.sort(() => Math.random() - 0.5);
  }, []);

  const handleInput = useCallback((char: string) => {
    if (error) return;
    const upper = char.toUpperCase();
    setActiveChar(upper);
    setTimeout(() => setActiveChar(null), 180);
    setPin(prev => {
      if (prev.length < 4) {
        return prev + upper;
      }
      return prev;
    });
  }, [error]);

  const handleBackspace = useCallback(() => {
    setPin(prev => prev.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    setPin('');
  }, []);

  // Listen to physical keyboard events globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept system shortcuts
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.preventDefault();
        handleBackspace();
        return;
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        handleClear();
        return;
      }

      // Check if it's an alphanumeric key (0-9, a-z, A-Z)
      if (/^[a-zA-Z0-9]$/.test(e.key)) {
        e.preventDefault();
        handleInput(e.key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleInput, handleBackspace, handleClear]);

  // Validate PIN upon reaching 4 characters
  useEffect(() => {
    if (pin.length === 4) {
      if (['7887', 'STAR'].includes(pin)) {
        onLogin();
      } else {
        setError(true);
        const timer = setTimeout(() => {
          setPin('');
          setError(false);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [pin, onLogin]);

  return (
    <div className="fixed inset-0 bg-white z-[999] flex flex-col justify-center items-center font-sans">
      {/* Hidden input for mobile keyboard focus if needed */}
      <input
        ref={inputRef}
        type="text"
        inputMode="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="characters"
        spellCheck={false}
        className="opacity-0 absolute -z-10 w-0 h-0 pointer-events-none"
        value=""
        onChange={(e) => {
          const val = e.target.value;
          if (val) {
            const lastChar = val.slice(-1);
            if (/^[a-zA-Z0-9]$/.test(lastChar)) {
              handleInput(lastChar);
            }
          }
          e.target.value = '';
        }}
      />

      <div className={`max-w-xs w-full px-6 flex flex-col items-center transition-transform ${error ? 'animate-shake' : ''}`}>
        <div className="mb-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-red-700 mb-3">
             <span className="text-red-700 font-black text-xl">GO</span>
          </div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Seguridad</h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">Acceso restringido</p>
        </div>

        {/* PIN display slots */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex justify-center gap-3 mb-4 cursor-pointer"
          title="Haz clic para activar el teclado"
        >
          {[0, 1, 2, 3].map((i) => (
            <div 
              key={i} 
              className={`w-12 h-14 flex items-center justify-center text-3xl font-black border-b-4 transition-all select-none
                ${error 
                  ? 'border-red-600 text-red-600' 
                  : (pin[i] ? 'border-gray-900 text-gray-900' : 'border-gray-100 text-gray-200')
                }`}
            >
              {pin[i] ? (showMask ? '•' : pin[i]) : '•'}
            </div>
          ))}
        </div>

        {/* Quick controls: toggle visibility & delete */}
        <div className="flex items-center justify-between w-full max-w-[220px] mb-4 text-[10px] font-bold uppercase tracking-wider text-gray-400">
          <button 
            type="button" 
            onClick={() => setShowMask(prev => !prev)} 
            className="hover:text-gray-900 flex items-center gap-1 transition-colors"
            title={showMask ? "Mostrar caracteres" : "Ocultar caracteres"}
          >
            {showMask ? <Eye size={13} /> : <EyeOff size={13} />}
            <span>{showMask ? 'Ver caracteres' : 'Ocultar'}</span>
          </button>
          <button 
            type="button"
            onClick={handleBackspace} 
            disabled={!pin.length}
            className="hover:text-red-700 disabled:opacity-20 flex items-center gap-1 transition-colors"
            title="Borrar último carácter (Backspace)"
          >
            <Delete size={13} />
            <span>Borrar</span>
          </button>
        </div>

        {/* Keyboard status banner */}
        <div className="flex items-center justify-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-gray-600 text-[11px] font-medium">
          <Keyboard size={14} className="text-red-700" />
          <span>Introduce el PIN con tu teclado o botones</span>
        </div>

        {/* Scrambled button matrix */}
        <div className="grid grid-cols-4 gap-2 w-full mb-6">
          {gridChars.map((char, idx) => {
            const isActive = activeChar === char;
            return (
              <button 
                key={idx} 
                onClick={() => handleInput(char)} 
                disabled={pin.length >= 4 || error}
                className={`aspect-square flex items-center justify-center text-3xl font-black border rounded-2xl transition-all active:scale-95 disabled:opacity-30 ${
                  isActive 
                    ? 'bg-red-700 text-white border-red-700 scale-95 shadow-md shadow-red-700/20' 
                    : 'text-gray-900 border-gray-100 hover:bg-gray-900 hover:text-white'
                }`}
              >
                {char}
              </button>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="flex items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          <button 
            onClick={handleClear} 
            disabled={!pin.length}
            className="hover:text-red-700 disabled:opacity-30 transition-colors"
          >
            Limpiar PIN (Esc)
          </button>
        </div>
      </div>
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); } 20%, 40%, 60%, 80% { transform: translateX(6px); } }
        .animate-shake { animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
};