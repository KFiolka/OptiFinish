import { create } from 'zustand';
import { getOptimalPath, type PathResult } from '../logic/checkout';

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
    optimalPath: PathResult | null;

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
    optimalPath: getOptimalPath(301),

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

        const nextScore = newScore;
        const nextThrowsCount = currentTurnThrows.length + 1;
        // Remaining darts for this turn to calculate path correctly?
        // Actually getOptimalPath takes dartsRemaining. 
        // Logic: if I just threw my 1st dart, I have 2 left.
        const dartsLeftInTurn = 3 - nextThrowsCount;

        // However, for the UI "Suggestion", we usually suggest for the NEXT full turn if we are done?
        // Or continuously update? 
        // If I have 2 darts left, I want path for 2 darts.
        // If I have 0 darts left (end of turn), I wait for "Next Turn".
        // But the store updates immediately.

        // If I just threw 3rd dart, dartsLeftInTurn is 0. 
        // Then we technically start looking at next turn (3 darts).
        const dartsForCalc = dartsLeftInTurn === 0 ? 3 : dartsLeftInTurn;

        set((state) => ({
            score: nextScore,
            history: [...state.history, newThrow],
            currentTurnThrows: [...state.currentTurnThrows, newThrow],
            isWon: nextScore === 0,
            optimalPath: getOptimalPath(nextScore, dartsForCalc)
        }));
    },

    undo: () => {
        set((state) => {
            const lastThrow = state.currentTurnThrows[state.currentTurnThrows.length - 1];
            if (!lastThrow) return state; // Only undo current turn

            const prevScore = state.score + lastThrow.value;
            // Darts remaining before this throw?
            // If we undo 3rd throw (idx 2), we go back to having 1 dart left? No, we go back to state BEFORE 3rd throw.
            // i.e. we had 2 throws.
            const prevThrowsCount = state.currentTurnThrows.length - 1;
            const dartsLeft = 3 - prevThrowsCount;

            return {
                score: prevScore,
                history: state.history.slice(0, -1),
                currentTurnThrows: state.currentTurnThrows.slice(0, -1),
                isWon: false,
                optimalPath: getOptimalPath(prevScore, dartsLeft)
            };
        });
    },

    nextTurn: () => {
        // New turn -> 3 darts available
        set((state) => ({
            currentTurnThrows: [],
            optimalPath: getOptimalPath(state.score, 3)
        }));
    },

    reset: () => set({ score: 301, history: [], currentTurnThrows: [], isWon: false, optimalPath: getOptimalPath(301) }),

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
