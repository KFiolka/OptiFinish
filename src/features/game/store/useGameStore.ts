import { create } from 'zustand';

export type Throw = {
    segment: number; // 1-20, 25 (Bull)
    multiplier: 1 | 2 | 3;
    value: number; // Total value (segment * multiplier)
    isDouble: boolean;
    isBust: boolean;
};

export type GameState = {
    score: number;
    history: Throw[]; // Flat history of all valid throws
    currentTurnThrows: Throw[]; // Throws in the current turn (max 3)
    isWon: boolean;

    // Actions
    throwDart: (segment: number, multiplier: 1 | 2 | 3) => void;
    undo: () => void;
    nextTurn: () => void;
    reset: () => void;
};

export const useGameStore = create<GameState>((set, get) => ({
    score: 301,
    history: [],
    currentTurnThrows: [],
    isWon: false,

    throwDart: (segment, multiplier) => {
        const { score, currentTurnThrows, isWon } = get();
        if (isWon) return;
        if (currentTurnThrows.length >= 3) return;

        const value = segment * multiplier;

        // Simplification to avoid build error
        const isStandardDouble = multiplier === 2;
        const isBullDouble = segment === 25 && multiplier === 2;
        const isDouble = isStandardDouble || isBullDouble;

        let newScore = score - value;
        let isBust = false;

        // Validation 301 Double Out
        if (newScore < 0) {
            isBust = true;
        } else if (newScore === 1) {
            isBust = true;
        } else if (newScore === 0) {
            if (!isDouble) {
                isBust = true;
            }
        }

        const newThrow: Throw = {
            segment,
            multiplier,
            value,
            isDouble,
            isBust
        };

        if (isBust) {
            return;
        }

        set((state) => ({
            score: newScore,
            history: [...state.history, newThrow],
            currentTurnThrows: [...state.currentTurnThrows, newThrow],
            isWon: newScore === 0
        }));
    },

    undo: () => {
        set((state) => {
            const lastThrow = state.currentTurnThrows[state.currentTurnThrows.length - 1];
            if (!lastThrow) return state;

            return {
                score: state.score + lastThrow.value,
                history: state.history.slice(0, -1),
                currentTurnThrows: state.currentTurnThrows.slice(0, -1),
                isWon: false
            };
        });
    },

    nextTurn: () => {
        set({ currentTurnThrows: [] });
    },

    reset: () => set({ score: 301, history: [], currentTurnThrows: [], isWon: false })
}));
