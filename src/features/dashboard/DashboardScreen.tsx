import React from 'react';
import { Scoreboard } from '../game/components/Scoreboard';
import { InputPad } from '../input/components/InputPad';

export const DashboardScreen: React.FC = () => {
    return (
        <>
            <Scoreboard />
            <InputPad />
        </>
    );
};
