import React from 'react';
import { useGameStore } from '../store/useGameStore';

export const Scoreboard: React.FC = () => {
    const { score, currentTurnThrows } = useGameStore();

    return (
        <div className="flex-1 flex flex-col relative w-full overflow-hidden min-h-0">
            <section className="flex flex-col items-center justify-center py-2 shrink-0 bg-surface-dark/20 border-b border-white/5 backdrop-blur-sm relative z-10">
                <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5">REST</span>
                <h2 className="text-5xl leading-none font-bold text-white tracking-tighter drop-shadow-lg">{score}</h2>
            </section>

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="flex-1 flex items-center justify-center w-full px-4 py-2">
                <div className="flex items-center justify-between w-full relative">

                    {/* Darts Indicators */}
                    <div className="flex flex-col gap-6 w-10 items-center justify-center">
                        {[1, 2, 3].map((idx) => {
                            const count = currentTurnThrows.length;
                            // If 3 darts thrown, show all 3 filled. Otherwise show modulo.
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

                    {/* Main Vis - Placeholder for now */}
                    <div className="relative w-44 h-44 flex items-center justify-center group mx-auto">
                        <div className="absolute inset-0 rounded-full border border-primary/20 blur-sm scale-105 animate-pulse"></div>
                        <div className="absolute inset-0 rounded-full border-[8px] border-surface-dark shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
                        <svg className="absolute inset-0 size-full -rotate-90 transform drop-shadow-glow-intense" viewBox="0 0 100 100">
                            <circle className="" cx="50" cy="50" fill="transparent" r="44" stroke="#137fec" strokeLinecap="round" strokeWidth="6"></circle>
                        </svg>
                        <div className="flex flex-col items-center justify-center z-10">
                            <span className="text-[9px] uppercase tracking-[0.25em] text-primary font-bold mb-1 drop-shadow-md">OPTIMAL</span>
                            <span className="text-6xl font-bold text-white tracking-tighter drop-shadow-lg">T20</span>
                            <span className="text-[10px] text-slate-400 mt-1 font-medium tracking-wide">Triple 20</span>
                        </div>
                    </div>

                    {/* Checkout Suggestions - Static for now */}
                    <div className="flex flex-col gap-6 w-10 items-center justify-center">
                        <div className="flex flex-col items-center opacity-30 scale-90">
                            <span className="text-sm font-bold text-white">?</span>
                        </div>
                        <div className="flex flex-col items-center opacity-60">
                            <span className="text-base font-bold text-white">T19</span>
                        </div>
                        <div className="flex flex-col items-center opacity-60 scale-90">
                            <span className="text-sm font-bold text-white">D12</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Path - Static for now */}
            <div className="shrink-0 w-full py-3 bg-surface-darker/50 border-t border-white/5 backdrop-blur-md">
                <div className="flex items-center justify-center gap-3">
                    <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center justify-center w-[60px] h-[44px] bg-primary rounded-lg shadow-glow border border-primary/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-0.5"><div className="size-1.5 bg-white/40 rounded-full"></div></div>
                            <span className="text-lg font-bold text-white tracking-tight">T20</span>
                        </div>
                    </div>
                    <span className="material-symbols-outlined text-slate-600 text-base">arrow_forward</span>
                    <div className="flex items-center justify-center w-[60px] h-[44px] border border-slate-700 bg-surface-dark rounded-lg opacity-80">
                        <span className="text-lg font-bold text-slate-200 tracking-tight">T11</span>
                    </div>
                    <span className="material-symbols-outlined text-slate-600 text-base">arrow_forward</span>
                    <div className="flex items-center justify-center w-[60px] h-[44px] border border-slate-700 bg-surface-dark rounded-lg opacity-80">
                        <span className="text-lg font-bold text-slate-200 tracking-tight">D14</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
