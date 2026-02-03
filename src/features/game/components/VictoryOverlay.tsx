import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Button } from '../../../components/ui/Button';

export const VictoryOverlay: React.FC = () => {
    const { isWon, reset } = useGameStore();

    if (!isWon) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in zoom-in duration-300">
            <div className="bg-surface-dark border border-primary/30 p-8 rounded-2xl shadow-glow-intense flex flex-col items-center max-w-sm w-full mx-4">
                <div className="p-4 bg-primary/20 rounded-full mb-6 animate-bounce">
                    <span className="material-symbols-outlined text-6xl text-primary drop-shadow-glow">emoji_events</span>
                </div>

                <h2 className="text-4xl font-bold text-white mb-2 tracking-tighter">GAME SHOT!</h2>
                <p className="text-slate-400 text-center mb-8">
                    Hervorragend gecheckt.
                </p>

                <Button
                    variant="primary"
                    size="lg"
                    onClick={reset}
                    className="mt-6 w-full max-w-xs shadow-glow-intense"
                >
                    Neues Spiel
                </Button>
            </div>
        </div>
    );
};
