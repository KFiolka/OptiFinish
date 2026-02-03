import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col h-screen w-full bg-background-dark text-white font-display overflow-hidden select-none">
            {/* Header / Status Bar */}
            <header className="shrink-0 h-[50px] flex items-center justify-between px-4 bg-surface-dark border-b border-white/5 relative z-20">
                <button className="size-8 flex items-center justify-center rounded-full active:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-400 text-xl">menu</span>
                </button>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tracking-widest uppercase text-white drop-shadow-md">OPTIFINISH</span>
                </div>
                <button
                    onClick={() => navigate("/settings")}
                    className="size-8 flex items-center justify-center rounded-full active:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-400 text-xl">settings</span>
                </button>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col relative overflow-hidden">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="shrink-0 h-[70px] bg-surface-darker/90 backdrop-blur-md border-t border-white/5 flex items-center justify-around px-2 z-30 pb-safe">
                <div className="flex flex-col items-center gap-1 opacity-100 scale-105">
                    <span className="material-symbols-outlined text-primary text-2xl drop-shadow-glow">grid_view</span>
                    <span className="text-[10px] uppercase font-bold text-primary tracking-wider">Training</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-40">
                    <span className="material-symbols-outlined text-slate-400 text-2xl">bar_chart</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Statistik</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-40">
                    <span className="material-symbols-outlined text-slate-400 text-2xl">history</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Verlauf</span>
                </div>
                <div className="flex flex-col items-center gap-1 opacity-40">
                    <span className="material-symbols-outlined text-slate-400 text-2xl">person</span>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Profil</span>
                </div>
            </nav>
        </div>
    );
};
