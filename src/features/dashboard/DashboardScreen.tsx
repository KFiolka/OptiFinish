import React from 'react';
import { Scoreboard } from '../game/components/Scoreboard';
import { InputPad } from '../input/components/InputPad';
import { MatchWonOverlay } from '../game/components/MatchWonOverlay';

export const DashboardScreen = () => {
    return (
        <div className="flex flex-col h-screen bg-background text-white overflow-hidden relative">
            <Scoreboard />
            <InputPad />
            <MatchWonOverlay />
        </div>
    );
};
