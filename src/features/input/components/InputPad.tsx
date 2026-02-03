import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useGameStore } from '../../game/store/useGameStore';
import { cn } from '../../../lib/utils';

export const InputPad: React.FC = () => {
    const { throwDart, undo, nextTurn, currentTurnThrows } = useGameStore();
    const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1);

    // Calculate current turn total
    const turnTotal = currentTurnThrows.reduce((sum, t) => sum + t.value, 0);

    const handleThrow = (segment: number) => {
        throwDart(segment, multiplier);
        setMultiplier(1); // Auto-reset to single
    };

    const handleSpecial = (segment: number, fixedMul: 1 | 2) => {
        throwDart(segment, fixedMul);
        setMultiplier(1);
    };

    return (
        <Card variant="sheet" className="flex-none p-3 pt-4 flex flex-col gap-2 z-20 relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-700/50 rounded-full"></div>

            {/* Current Turn Header */}
            <div className="flex items-center justify-between mb-1 px-1">
                <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Aktuelle Aufnahme</span>
                    <span className="text-xl font-bold text-white">{turnTotal}</span>
                </div>
                <button
                    onClick={undo}
                    disabled={currentTurnThrows.length === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5 group disabled:opacity-30 disabled:pointer-events-none"
                >
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-white transition-colors text-sm">undo</span>
                    <span className="text-[10px] font-medium uppercase tracking-wide">Rückgängig</span>
                </button>
            </div>

            <div className="flex flex-col gap-1.5">

                {/* Multipliers */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#111a22] rounded-lg border border-white/5">
                    <button
                        onClick={() => setMultiplier(1)}
                        className={cn("h-8 rounded text-xs transition-all", multiplier === 1 ? "font-bold bg-primary text-white shadow-md" : "font-medium text-slate-400 hover:text-white hover:bg-white/5")}
                    >
                        Single
                    </button>
                    <button
                        onClick={() => setMultiplier(2)}
                        className={cn("h-8 rounded text-xs transition-all", multiplier === 2 ? "font-bold bg-primary text-white shadow-md" : "font-medium text-slate-400 hover:text-white hover:bg-white/5")}
                    >
                        Double
                    </button>
                    <button
                        onClick={() => setMultiplier(3)}
                        className={cn("h-8 rounded text-xs transition-all", multiplier === 3 ? "font-bold bg-primary text-white shadow-md" : "font-medium text-slate-400 hover:text-white hover:bg-white/5")}
                    >
                        Triple
                    </button>
                </div>

                {/* Numbers 1-20 */}
                <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                        <Button
                            key={num}
                            variant="secondary"
                            className="h-11 text-base font-semibold rounded"
                            onClick={() => handleThrow(num)}
                        >
                            {num}
                        </Button>
                    ))}
                </div>

                {/* Special Buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                    <Button variant="danger" className="h-11 text-xs font-bold tracking-wider rounded" onClick={() => handleThrow(0)}>MISS</Button>
                    <button
                        onClick={() => handleSpecial(25, 1)}
                        className="h-11 rounded bg-[#233648] hover:bg-primary/80 text-green-400 font-bold text-xs transition-colors border border-green-500/20 tracking-wider cursor-pointer"
                    >
                        S-BULL
                    </button>
                    <button
                        onClick={() => handleSpecial(25, 2)}
                        className="h-11 rounded bg-[#233648] hover:bg-primary/80 text-red-400 font-bold text-xs transition-colors border border-red-500/20 tracking-wider cursor-pointer"
                    >
                        D-BULL
                    </button>
                </div>

                {/* Submit - Next Turn */}
                <Button
                    variant="primary"
                    className="w-full h-11 mt-1 text-base uppercase tracking-wide"
                    onClick={nextTurn}
                >
                    Übernehmen
                </Button>
            </div>
        </Card>
    );
};
