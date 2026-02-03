import { create } from 'zustand';
import { getCheckoutPath } from '../logic/checkout';

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
    checkoutPath: string[] | null;

    // Actions
    throwDart: (segment: number, multiplier: 1 | 2 | 3) => void;
    undo: () => void;
    nextTurn: () => void;
    reset: () => void;
    getStats: () => { avg: string; darts: number };
};

export const useGameStore = create<GameState>((set, get) => ({
    score: 301,
    history: [],
    currentTurnThrows: [],
    isWon: false,
    checkoutPath: getCheckoutPath(301),

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
            isWon: newScore === 0,
            checkoutPath: getCheckoutPath(newScore)
        }));
    },

    undo: () => {
        set((state) => {
            const lastThrow = state.currentTurnThrows[state.currentTurnThrows.length - 1];
            if (!lastThrow) return state; // Only undo current turn

            const prevScore = state.score + lastThrow.value;

            return {
                score: prevScore,
                history: state.history.slice(0, -1),
                currentTurnThrows: state.currentTurnThrows.slice(0, -1),
                isWon: false,
                checkoutPath: getCheckoutPath(prevScore)
            };
        });
    },

    nextTurn: () => {
        set({ currentTurnThrows: [] });
    },

    reset: () => set({ score: 301, history: [], currentTurnThrows: [], isWon: false, checkoutPath: getCheckoutPath(301) }),

    getStats: () => {
        const { history, currentTurnThrows } = get();
        const allThrows = [...history, ...currentTurnThrows];

        const totalDarts = allThrows.length;
        if (totalDarts === 0) return { avg: "0.00", darts: 0 };

        const totalScore = allThrows.reduce((sum, t) => sum + t.value, 0);
        const avg = (totalScore / totalDarts) * 3;

        return {
            avg: avg.toFixed(2),
            darts: totalDarts
        };
    }
}));
