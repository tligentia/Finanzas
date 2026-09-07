
import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, HelpCircle, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { COLORS, validateKey, listAvailableModels } from './Parameters';
import { Footer } from './Footer';
import { Cookies } from './Cookies';
import { Ajustes } from './Ajustes';
import { Manual } from './Manual';
import { AppMenu } from './AppMenu';
import { NavMenu } from './NavMenu';

interface ShellProps {
  children: React.ReactNode;
  userIp?: string | null;
}

export const Shell: React.FC<ShellProps> = ({ children, userIp: propUserIp }) => {
  const [showAjustes, setShowAjustes] = useState(false);
  const [showCookies, setShowCookies] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [manualTarget, setManualTarget] = useState<string | undefined>(undefined);
  
  useEffect(() => {
    const handleOpenManual = (e: CustomEvent<{ target?: string }>) => {
      setManualTarget(e.detail?.target);
      setShowManual(true);
    };
    window.addEventListener('open-manual' as any, handleOpenManual);
    return () => window.removeEventListener('open-manual' as any, handleOpenManual);
  }, []);
  
  // [PROCESO DE INICIALIZACIÓN CENTRALIZADO]
  const [isKeyValid, setIsKeyValid] = useState<boolean | null>(null);
  const [userIp, setUserIp] = useState<string | null>(propUserIp || null);

  // Add apiKey state to manage the Gemini API key and sync with localStorage
  const [apiKey, setApiKey] = useState<string>(() => localStorage.getItem('app_apikey') || '');

  // Handler to update the API key state and persist it to localStorage
  const handleApiKeySave = (key: string) => {
    setApiKey(key);
    localStorage.setItem('app_apikey', key);
  };

  const initializeSystem = useCallback(async () => {
    // 1. Detección de IP
    if (!propUserIp) {
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        setUserIp(data.ip);
      } catch {
        setUserIp('Offline');
      }
    } else {
      setUserIp(propUserIp);
    }

    // 2. Validación de Motor IA
    const isValid = await validateKey();
    setIsKeyValid(isValid);
    updateLandingUI(isValid);

    // 3. Pre-selección de mejor modelo si es válido
    if (isValid) {
      const currentModel = localStorage.getItem('app_selected_model');
      if (!currentModel) {
        const models = await listAvailableModels();
        const optimal = models.find(m => m === 'gemini-3-flash-preview') || 
                        models.find(m => m.includes('flash-preview')) || 
                        models.find(m => m.includes('flash')) || 
                        models[0];
        if (optimal) localStorage.setItem('app_selected_model', optimal);
      }
    }
  }, []);

  // Función para actualizar elementos de la landing que dependen del estado de la IA
  const updateLandingUI = (valid: boolean) => {
    const badge = document.getElementById('status-ready-badge');
    const bar = document.getElementById('status-progress-bar');
    const text = document.getElementById('status-text');
    
    if (badge) badge.style.display = valid ? 'block' : 'none';
    if (bar) {
      bar.style.width = valid ? '100%' : '25%';
      if (!valid) bar.classList.add('animate-pulse');
      else bar.classList.remove('animate-pulse');
    }
    if (text) {
      text.innerText = valid ? 'System Active & Persistent' : 'System Standby • Awaiting Config';
    }
  };

  useEffect(() => {
    initializeSystem();
  }, [initializeSystem, apiKey, propUserIp]); // Re-run initialization when apiKey or propUserIp changes

  useEffect(() => {
    if (propUserIp) {
      setUserIp(propUserIp);
    }
  }, [propUserIp]);

  return (
    <div className={`min-h-screen ${COLORS.bg} font-sans flex flex-col p-4 md:p-8 animate-in fade-in duration-500`}>
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white mb-8 border-b border-gray-200 pb-6 pt-4 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-gray-900 flex items-center gap-3">
            <svg className="w-8 h-8 flex-shrink-0" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18V6h5" stroke="#6b7280" />
              <path d="M4 12h4" stroke="#6b7280" />
              <path d="M11 12h7" stroke="#b91c1c" />
              <path d="M15 8l4 4-4 4" stroke="#b91c1c" />
              <path d="M20 6v12a4 4 0 0 1-4 4" stroke="#000000" />
              <path d="M20 6a4 4 0 0 1-4-4" stroke="#000000" />
            </svg>
            <span className="tracking-tight italic uppercase font-black">Sistemas Financieros</span>
          </h1>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center gap-1.5">
              {isKeyValid === true ? (
                <span className="flex items-center gap-1 text-[9px] font-black text-green-600 uppercase tracking-widest bg-green-50 px-2 py-0.5 rounded-md border border-green-100 animate-in fade-in zoom-in">
                  <CheckCircle2 size={10} /> AI ONLINE
                </span>
              ) : isKeyValid === false ? (
                <span className="flex items-center gap-1 text-[9px] font-black text-red-700 uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-md border border-red-100 animate-pulse cursor-help" title="Configuración requerida">
                  <AlertCircle size={10} /> AI OFFLINE
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[9px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-0.5 rounded-md">
                  <Sparkles size={10} className="animate-spin" /> SYNCING
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowManual(true)}
            className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-900 px-4 py-2 rounded-xl transition-all active:scale-95 group shadow-sm"
          >
            <HelpCircle size={18} className="text-red-700 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Manual</span>
          </button>
          <NavMenu />
          <AppMenu />
        </div>
      </header>

      {/* CONTENT */}
      <main className="flex-1 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* FOOTER */}
      <Footer 
        userIp={userIp} 
        onShowCookies={() => setShowCookies(true)} 
        onShowAjustes={() => setShowAjustes(true)} 
      />

      {/* Fix: Added missing apiKey and onApiKeySave props to Ajustes component */}
      <Ajustes 
        isOpen={showAjustes} 
        onClose={() => setShowAjustes(false)} 
        userIp={userIp}
        apiKey={apiKey}
        onApiKeySave={handleApiKeySave}
      />

      <Cookies isOpen={showCookies} onClose={() => setShowCookies(false)} />
      <Manual isOpen={showManual} onClose={() => { setShowManual(false); setManualTarget(undefined); }} initialTarget={manualTarget} />
    </div>
  );
};

export const Cabecera = Shell;
