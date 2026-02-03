import React from 'react';
import { useGameStore } from '../store/useGameStore';

export const Scoreboard: React.FC = () => {
    // Destructure getStats
    // Destructure getStats
    const { score, currentTurnThrows, optimalPath, getStats } = useGameStore();

    const stats = getStats();
    // Helper to format path
    const pathSteps = optimalPath ? optimalPath.path : [];
    const isCheckout = optimalPath?.type === 'checkout';

    return (
        <div className="flex-1 flex flex-col relative w-full overflow-hidden min-h-0">
            <section className="flex flex-col items-center justify-center py-2 shrink-0 bg-surface-dark/20 border-b border-white/5 backdrop-blur-sm relative z-10 w-full">
                <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5">REST</span>
                <h2 className="text-5xl leading-none font-bold text-white tracking-tighter drop-shadow-lg">{score}</h2>

                {/* Stats Bar */}
                <div className="flex items-center gap-4 mt-2 opacity-80">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Ø</span>
                        <span className="text-sm text-slate-200 font-bold tabular-nums tracking-tight">{stats.avg}</span>
                    </div>
                    <div className="w-px h-6 bg-white/10"></div>
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">DARTS</span>
                        <span className="text-sm text-slate-200 font-bold tabular-nums tracking-tight">{stats.darts}</span>
                    </div>
                </div>
            </section>

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="flex-1 flex items-center justify-center w-full px-4 py-2">
                <div className="flex items-center justify-between w-full relative">

                    {/* Darts Indicators */}
                    <div className="flex flex-col gap-6 w-10 items-center justify-center">
                        {[1, 2, 3].map((idx) => {
                            const count = currentTurnThrows.length;
                            const activeCount = (count > 0 && count % 3 === 0) ? 3 : count % 3;
                            const active = idx <= activeCount;

                            return (
                                <div key={idx} className={`flex flex-col items-center gap-1 ${active ? '' : 'opacity-50'}`}>
                                    <span className="text-[9px] font-bold text-slate-400 leading-none">D{idx}</span>
                                    <div className={`size-1.5 rounded-full ${active ? 'bg-primary shadow-glow' : 'bg-slate-600'}`}></div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Main Vis */}
                    <div className="relative w-44 h-44 flex items-center justify-center group mx-auto">
                        <div className={`absolute inset-0 rounded-full border border-primary/20 blur-sm scale-105 ${isCheckout ? 'animate-pulse' : ''}`}></div>
                        <div className="absolute inset-0 rounded-full border-[8px] border-surface-dark shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
                        <svg className="absolute inset-0 size-full -rotate-90 transform drop-shadow-glow-intense" viewBox="0 0 100 100">
                            <circle className="" cx="50" cy="50" fill="transparent" r="44" stroke="#137fec" strokeLinecap="round" strokeWidth="6"></circle>
                        </svg>
                        <div className="flex flex-col items-center justify-center z-10 text-center">
                            {pathSteps.length > 0 ? (
                                <>
                                    <span className={`text-[9px] uppercase tracking-[0.25em] font-bold mb-1 drop-shadow-md ${isCheckout ? 'text-primary' : 'text-slate-400'}`}>
                                        {isCheckout ? 'CHECKOUT' : 'SETUP'}
                                    </span>
                                    <span className="text-4xl font-bold text-white tracking-tighter drop-shadow-lg">
                                        {isCheckout ? pathSteps.join(" ") : pathSteps[0]}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500 font-bold mb-1 drop-shadow-md">WAITING</span>
                                    <div className="flex flex-col items-center">
                                        <span className="text-sm text-slate-400">...</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Checkout Suggestions - Visual Representation / Next Steps */}
                    <div className="flex flex-col gap-6 w-10 items-center justify-center">
                        {pathSteps.length > 1 ? (
                            pathSteps.slice(1, 4).map((step, idx) => (
                                <div key={idx} className={`flex flex-col items-center opacity-80 scale-90`}>
                                    <span className="text-xs font-bold text-white">{step}</span>
                                </div>
                            ))
                        ) : (
                            <div className="opacity-20"><span className="text-xs">...</span></div>
                        )}
                    </div>
                </div>
            </div>

            {/* Checkout Path - Footer */}
            <div className="shrink-0 w-full py-3 bg-surface-darker/50 border-t border-white/5 backdrop-blur-md">
                <div className="flex items-center justify-center gap-3">
                    {pathSteps.length > 0 ? (
                        pathSteps.map((step, idx) => (
                            <React.Fragment key={idx}>
                                <div className={`flex items-center justify-center w-[60px] h-[44px] rounded-lg border relative overflow-hidden ${idx === 0 ? (isCheckout ? 'bg-primary border-primary/50 shadow-glow text-white' : 'bg-blue-600/50 border-blue-400/30 text-white') : 'bg-surface-dark border-slate-700 opacity-80 text-slate-200'}`}>
                                    <span className="text-lg font-bold tracking-tight">{step}</span>
                                </div>
                                {idx < pathSteps.length - 1 && <span className="material-symbols-outlined text-slate-600 text-base">arrow_forward</span>}
                            </React.Fragment>
                        ))
                    ) : (
                        <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Kein Finish</span>
                    )}
                </div>
            </div>
        </div>
    );
};
