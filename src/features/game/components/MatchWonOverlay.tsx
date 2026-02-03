import React from 'react';
import { Trophy, RotateCcw, Menu, Star } from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import { useNavigate } from 'react-router-dom';

export const MatchWonOverlay: React.FC = () => {
    const { isWon, getStats, reset } = useGameStore();
    const navigate = useNavigate();

    if (!isWon) return null;

    const stats = getStats();

    // Get the checkout path that was actually passed (last few throws)
    // Since we don't track the "finish path" explicitly in history as a unit, 
    // we can re-derive what the checkout was from the last throws.
    // For now, we'll just show the last 3 throws if they reduced score to 0.
    // A simple approximation: Take last N throws of the current turn? 
    // Actually, `history` has all throws. Let's grab the throws from the last turn.
    // But `currentTurnThrows` might be cleared? No, store keeps them until nextTurn.
    // Wait, `throwDart` sets `isWon` but doesn't clear `currentTurnThrows`.
    const { currentTurnThrows } = useGameStore.getState();
    const checkoutThrown = currentTurnThrows.map(t => {
        if (t.segment === 25) return t.multiplier === 2 ? 'D-BULL' : '25';
        if (t.segment === 0) return 'MISS';
        const prefix = t.multiplier === 3 ? 'T' : t.multiplier === 2 ? 'D' : '';
        return `${prefix}${t.segment}`;
    });

    const handlePlayAgain = () => {
        reset();
    };

    const handleMenu = () => {
        navigate('/settings');
    };

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background-dark/95 backdrop-blur-xl animate-in fade-in duration-500">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">

                {/* Header Icon */}
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary blur-2xl opacity-40 animate-pulse"></div>
                    <Trophy className="w-20 h-20 text-primary drop-shadow-[0_0_15px_rgba(19,127,236,0.5)]" strokeWidth={1.5} />
                </div>

                {/* Headline */}
                <h1 className="text-5xl font-black text-white tracking-tighter italic drop-shadow-lg mb-2 text-center">
                    SIEG
                </h1>

                <p className="text-slate-400 text-sm font-bold tracking-[0.2em] uppercase mb-10">Ausgecheckt</p>

                {/* Stats Card */}
                <div className="w-full bg-surface-dark/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md shadow-2xl mb-10">
                    <div className="grid grid-cols-2 gap-8 mb-6">
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">Ø 3-Dart</span>
                            <span className="text-3xl font-bold text-white tabular-nums">{stats.avg}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase mb-1">Darts</span>
                            <span className="text-3xl font-bold text-white tabular-nums">{stats.darts}</span>
                        </div>
                    </div>

                    {/* Checkout Path Display */}
                    <div className="flex flex-col items-center pt-6 border-t border-white/5">
                        <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-3 flex items-center gap-2">
                            <Star className="w-3 h-3 fill-primary" />
                            Checkout Weg
                            <Star className="w-3 h-3 fill-primary" />
                        </span>
                        <div className="flex items-center gap-3">
                            {checkoutThrown.map((step, idx) => (
                                <React.Fragment key={idx}>
                                    <span className="text-2xl font-bold text-white drop-shadow-md">{step}</span>
                                    {idx < checkoutThrown.length - 1 && <span className="text-slate-600 text-sm">→</span>}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-4 w-full">
                    <button
                        onClick={handlePlayAgain}
                        className="w-full h-14 bg-primary hover:bg-blue-600 text-white font-bold tracking-wider uppercase rounded-xl shadow-[0_0_20px_rgba(19,127,236,0.3)] hover:shadow-[0_0_30px_rgba(19,127,236,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 animate-pulse-slow"
                    >
                        <RotateCcw className="w-5 h-5" />
                        Revanche
                    </button>

                    <button
                        onClick={handleMenu}
                        className="w-full h-12 text-slate-400 hover:text-white font-bold tracking-wider uppercase rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                    >
                        <Menu className="w-4 h-4" />
                        Menü
                    </button>
                </div>
            </div>
        </div>
    );
};
