import React from 'react';
import { cn } from '../../lib/utils';

type NavItemProps = {
    icon: string;
    label: string;
    isActive?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive }) => (
    <a className={cn("flex flex-col items-center gap-1 w-16 transition-colors", isActive ? "text-primary" : "text-slate-500 hover:text-slate-300")} href="#">
        <span className={cn("material-symbols-outlined text-2xl", isActive && "fill-1")}>{icon}</span>
        <span className="text-[10px] font-medium">{label}</span>
    </a>
);

export const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background-dark/95 backdrop-blur-md border-t border-white/5 h-[80px] pb-5 px-6 flex items-center justify-between z-50">
            <NavItem icon="dashboard" label="Training" isActive />
            <NavItem icon="bar_chart" label="Statistik" />
            <NavItem icon="history" label="Verlauf" />
            <NavItem icon="person" label="Profil" />
        </nav>
    );
};
