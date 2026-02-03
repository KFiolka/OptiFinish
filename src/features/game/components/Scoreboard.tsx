import React from 'react';

export const Scoreboard: React.FC = () => {
    return (
        <div className="flex-1 flex flex-col relative w-full overflow-hidden min-h-0">
            <section className="flex flex-col items-center justify-center py-2 shrink-0 bg-surface-dark/20 border-b border-white/5 backdrop-blur-sm relative z-10">
                <span className="text-slate-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5">REST</span>
                <h2 className="text-5xl leading-none font-bold text-white tracking-tighter drop-shadow-lg">301</h2>
            </section>

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

            <div className="flex-1 flex items-center justify-center w-full px-4 py-2">
                <div className="flex items-center justify-between w-full relative">

                    {/* Darts Indicators */}
                    <div className="flex flex-col gap-6 w-10 items-center justify-center">
                        <div className="flex flex-col items-center gap-1 opacity-50">
                            <span className="text-[9px] font-bold text-slate-400 leading-none">D1</span>
                            <div className="size-1.5 rounded-full bg-slate-600"></div>
                        </div>
                        <div className="flex flex-col items-center gap-1 relative">
                            <span className="text-[10px] font-bold text-orange-500 leading-none">D2</span>
                            <div className="size-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]"></div>
                            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 w-8 h-[1px] bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                        </div>
                        <div className="flex flex-col items-center gap-1 opacity-50">
                            <span className="text-[9px] font-bold text-slate-400 leading-none">D3</span>
                            <div className="size-1.5 rounded-full bg-slate-600"></div>
                        </div>
                    </div>

                    {/* Main Vis */}
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

                    {/* Checkout Suggestions */}
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

            {/* Checkout Path */}
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
