import React, { useState, useEffect, useRef } from 'react';
import { Menu, ChevronRight, Hash } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
}

const SECTIONS: NavItem[] = [
  { id: 'sec-01', label: '1. Fiat' },
  { id: 'sec-02', label: '2. Mercados' },
  { id: 'sec-03', label: '3. Arquitectura' },
  { id: 'sec-04', label: '4. Instrumentos' },
  { id: 'sec-05', label: '5. Líderes' },
  { id: 'sec-06', label: '6. Comparativa' },
];

export const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Compensar header sticky
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 font-bold focus:outline-none group ${
          isOpen 
            ? 'bg-red-700 text-white shadow-lg shadow-red-700/20' 
            : 'bg-white text-gray-900 border border-gray-100 hover:border-red-700 hover:text-red-700'
        }`}
      >
        <Menu size={16} className={isOpen ? 'text-white' : 'text-gray-400 group-hover:text-red-700'} />
        <span className="text-[10px] uppercase tracking-widest">Índice</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[100] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/5">
          <div className="p-4 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Secciones</h3>
          </div>
          
          <div className="p-2 space-y-1">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="w-full flex items-center justify-between p-3 rounded-xl transition-all group hover:bg-gray-900 hover:text-white text-left"
              >
                <div className="flex items-center gap-3">
                  <Hash size={14} className="text-red-700 group-hover:text-white" />
                  <span className="text-[11px] font-black uppercase tracking-tight italic">
                    {section.label}
                  </span>
                </div>
                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0" />
              </button>
            ))}
          </div>
          
          <div className="p-3 border-t border-gray-50 bg-gray-50/30 flex justify-center">
            <p className="text-[8px] font-black text-gray-300 uppercase tracking-[0.3em]">Navegación Rápida</p>
          </div>
        </div>
      )}
    </div>
  );
};