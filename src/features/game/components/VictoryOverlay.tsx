import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../../../components/ui/Button';

export const VictoryOverlay: React.FC = () => {
    const { isWon, reset } = useGameStore();

    if (!isWon) return null;

    return (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md p-6 animate-in fade-in duration-300">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="size-24 rounded-full bg-primary/20 flex items-center justify-center mb-2 shadow-[0_0_40px_rgba(19,127,236,0.6)]">
                    <span className="material-symbols-outlined text-6xl text-primary drop-shadow-glow">emoji_events</span>
                </div>
                <h2 className="text-4xl font-bold text-white tracking-tighter">BOOM!</h2>
                <p className="text-slate-300 text-lg">Check out in style.</p>

                <Button
                    variant="primary"
                    size="lg"
                    onClick={reset}
                    className="mt-6 w-full max-w-xs shadow-glow-intense"
                >
                    New Game
                </Button>
            </div>
        </div>
    );
};
