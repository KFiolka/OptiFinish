import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-4 py-3 shrink-0 z-20 bg-background-dark relative">
            <div className="size-8 flex items-center justify-center rounded-full bg-surface-dark/50 hover:bg-surface-dark transition-colors cursor-pointer" role="button" aria-label="Menu">
                <span className="material-symbols-outlined text-white text-lg">menu</span>
            </div>
            <h1 className="text-sm font-bold tracking-tight text-white uppercase">OptiFinish</h1>
            <div className="size-8 flex items-center justify-center rounded-full bg-surface-dark/50 hover:bg-surface-dark transition-colors cursor-pointer" role="button" aria-label="Settings">
                <span className="material-symbols-outlined text-white text-lg">settings</span>
            </div>
        </header>
    );
};
