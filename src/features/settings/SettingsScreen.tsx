import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SettingsScreen: React.FC = () => {
    const navigate = useNavigate();

    // State placeholders (would normally connect to a store)
    const [startScore, setStartScore] = useState<301 | 501>(301);
    const [checkoutMode, setCheckoutMode] = useState<'single' | 'double' | 'master'>('double');
    const [inputMethod, setInputMethod] = useState<'touch' | 'keys'>('touch');
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div className="flex flex-col h-full bg-background-dark text-white font-display overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            {/* Header */}
            <header className="shrink-0 h-[60px] flex items-center justify-between px-4 bg-surface-dark/80 backdrop-blur-md border-b border-white/5 relative z-20">
                <button
                    onClick={() => navigate("/")}
                    className="size-10 flex items-center justify-center rounded-full active:bg-white/5 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-300">arrow_back</span>
                </button>
                <h1 className="text-sm font-bold tracking-[0.2em] text-white uppercase">EINSTELLUNGEN</h1>
                <div className="size-10"></div> {/* Spacer for balance */}
            </header>

            {/* Content Scroller */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 relative z-10 no-scrollbar">

                {/* Section: SPIEL */}
                <section>
                    <h2 className="text-xs font-bold text-primary tracking-widest uppercase mb-3 pl-1">Spiel</h2>
                    <div className="flex flex-col gap-3">

                        {/* Start Score */}
                        <div className="bg-surface-navy rounded-xl border border-white/5 p-4 flex items-center justify-between">
                            <span className="text-sm font-medium text-white">Start Score</span>
                            <div className="flex p-1 bg-background-dark rounded-lg border border-white/5">
                                <button
                                    onClick={() => setStartScore(301)}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${startScore === 301 ? 'bg-primary text-white shadow-glow' : 'text-slate-400 hover:text-white'}`}
                                >
                                    301
                                </button>
                                <button
                                    onClick={() => setStartScore(501)}
                                    className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${startScore === 501 ? 'bg-primary text-white shadow-glow' : 'text-slate-400 hover:text-white'}`}
                                >
                                    501
                                </button>
                            </div>
                        </div>

                        {/* Checkout Mode */}
                        <div className="bg-surface-navy rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                            <span className="text-sm font-medium text-white">Checkout Mode</span>
                            <div className="grid grid-cols-3 gap-1 p-1 bg-background-dark rounded-lg border border-white/5">
                                {(['single', 'double', 'master'] as const).map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => setCheckoutMode(mode)}
                                        className={`py-2 rounded-md text-[10px] uppercase font-bold transition-all ${checkoutMode === mode ? 'bg-primary text-white shadow-glow' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* Section: EINGABE */}
                <section>
                    <h2 className="text-xs font-bold text-primary tracking-widest uppercase mb-3 pl-1">Eingabe</h2>
                    <div className="bg-surface-navy rounded-xl border border-white/5 p-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-white">Methode</span>
                        <div className="flex p-1 bg-background-dark rounded-lg border border-white/5">
                            <button
                                onClick={() => setInputMethod('touch')}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${inputMethod === 'touch' ? 'bg-primary text-white shadow-glow' : 'text-slate-400 hover:text-white'}`}
                            >
                                TOUCH
                            </button>
                            <button
                                onClick={() => setInputMethod('keys')}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${inputMethod === 'keys' ? 'bg-primary text-white shadow-glow' : 'text-slate-400 hover:text-white'}`}
                            >
                                TASTEN
                            </button>
                        </div>
                    </div>
                </section>

                {/* Section: DESIGN */}
                <section>
                    <h2 className="text-xs font-bold text-primary tracking-widest uppercase mb-3 pl-1">Design</h2>
                    <div className="bg-surface-navy rounded-xl border border-white/5 p-4 flex items-center justify-between opacity-80 cursor-not-allowed">
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">Dark Mode</span>
                            <span className="text-[10px] text-slate-500">Immer aktiv</span>
                        </div>
                        <div className={`w-11 h-6 rounded-full flex items-center px-1 transition-colors ${isDarkMode ? 'bg-primary/50 border border-primary' : 'bg-slate-700'}`}>
                            <div className={`size-4 rounded-full bg-white shadow-md transform transition-transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </div>
                    </div>
                </section>

                {/* Section: DATEN */}
                <section>
                    <h2 className="text-xs font-bold text-primary tracking-widest uppercase mb-3 pl-1">Daten</h2>
                    <button className="w-full py-3 rounded-xl border border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 text-xs font-bold uppercase tracking-wider transition-colors">
                        Statistiken zurücksetzen
                    </button>
                </section>

            </div>

            {/* Footer */}
            <div className="shrink-0 py-4 flex flex-col items-center justify-center">
                <span className="text-[10px] text-slate-600 font-bold tracking-widest">OPTIFINISH v1.0.2</span>
            </div>
        </div>
    );
};
