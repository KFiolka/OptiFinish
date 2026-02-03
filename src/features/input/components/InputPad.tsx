import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export const InputPad: React.FC = () => {
    return (
        <Card variant="sheet" className="flex-none p-3 pt-4 flex flex-col gap-2 z-20 relative">
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-700/50 rounded-full"></div>

            {/* Current Turn Header */}
            <div className="flex items-center justify-between mb-1 px-1">
                <div className="flex flex-col">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-bold">Aktuelle Aufnahme</span>
                    <span className="text-xl font-bold text-white">60</span>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5 group">
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-white transition-colors text-sm">undo</span>
                    <span className="text-[10px] font-medium uppercase tracking-wide">Rückgängig</span>
                </button>
            </div>

            <div className="flex flex-col gap-1.5">

                {/* Multipliers */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#111a22] rounded-lg border border-white/5">
                    <button className="h-8 rounded text-xs font-bold bg-primary text-white shadow-md">Single</button>
                    <button className="h-8 rounded text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">Double</button>
                    <button className="h-8 rounded text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">Triple</button>
                </div>

                {/* Numbers 1-20 */}
                <div className="grid grid-cols-5 gap-1">
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                        <Button key={num} variant="secondary" className="h-9 text-base font-semibold rounded">
                            {num}
                        </Button>
                    ))}
                </div>

                {/* Special Buttons */}
                <div className="grid grid-cols-3 gap-1.5">
                    <Button variant="danger" className="h-9 text-xs font-bold tracking-wider rounded">MISS</Button>
                    {/* S-BULL and D-BULL Custom styles not fully in Button variants, using inline/custom class for now or adding variant later. 
              The task.md said "Stitch Extraction", so I use the classes from Stitch code if possible.
          */}
                    <button className="h-9 rounded bg-[#233648] hover:bg-primary/80 text-green-400 font-bold text-xs transition-colors border border-green-500/20 tracking-wider">S-BULL</button>
                    <button className="h-9 rounded bg-[#233648] hover:bg-primary/80 text-red-400 font-bold text-xs transition-colors border border-red-500/20 tracking-wider">D-BULL</button>
                </div>

                {/* Submit */}
                <Button variant="primary" className="w-full h-11 mt-1 text-base uppercase tracking-wide">
                    Übernehmen
                </Button>
            </div>
        </Card>
    );
};
