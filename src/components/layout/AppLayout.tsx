import React from 'react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display h-screen w-full overflow-hidden flex flex-col">
            <Header />
            <main className="flex-1 flex flex-col w-full max-w-md mx-auto relative overflow-hidden pb-[80px]">
                {children}
            </main>
            <BottomNav />
        </div>
    );
};
