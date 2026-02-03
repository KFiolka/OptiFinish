import React from 'react';
import { Scoreboard } from '../game/components/Scoreboard';
import { InputPad } from '../input/components/InputPad';
import { VictoryOverlay } from '../game/components/VictoryOverlay';

export const DashboardScreen: React.FC = () => {
    return (
        <>
            <Scoreboard />
            <InputPad />
            <VictoryOverlay />
        </>
    );
};
