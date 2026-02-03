/**
 * Optimal Checkout Paths for 301 Double Out.
 * Returns a list of strings representing the segments to throw.
 * e.g. ["T20", "T20", "D25"] for 170.
 */

export type PathResult = {
    path: string[];
    type: 'checkout' | 'setup';
};

export const getOptimalPath = (score: number, dartsRemaining: number = 3): PathResult | null => {
    if (score <= 1) return null;

    // 1. Check for valid 3-dart checkout
    const checkout = getCheckoutPath(score);
    if (checkout && checkout.length <= dartsRemaining) {
        return { path: checkout, type: 'checkout' };
    }

    // 2. Setup Mode
    // For high scores or bogey numbers, suggest T20 (or switch to T19 if blocked? simplistic for now)
    // If score is a bogey (e.g. 169), T20 is usually best.
    // Return as many T20s as darts remaining
    const setupPath = Array(dartsRemaining).fill("T20");
    return { path: setupPath, type: 'setup' };
};

// Comprehensive Checkout Logic
// Prioritizes standard routes (T20/T19/T18) but finds any valid path.

const SEGMENTS = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
const DOUBLES = SEGMENTS.map(s => `D${s}`).concat(["D25"]); // D25 = Bullseye (though usually written BULL)

// Helper to get value of a throw string
const getValue = (t: string): number => {
    if (t === "BULL") return 50;
    if (t === "25") return 25;
    if (t.startsWith("T")) return parseInt(t.substring(1)) * 3;
    if (t.startsWith("D")) return parseInt(t.substring(1)) * 2;
    return parseInt(t);
};

// Generate all possible single throws (descending value preference)
const ALL_THROWS = [
    // Triples
    ...SEGMENTS.map(s => `T${s}`),
    // Bull
    "BULL", "25",
    // Doubles (if needed for setup)
    ...SEGMENTS.map(s => `D${s}`),
    // Singles
    ...SEGMENTS.map(s => `${s}`)
];

export const getCheckoutPath = (score: number, dartsAllowed: number = 3): string[] | null => {
    if (score > 170) return null;
    if (score <= 1) return null;

    // 1. Check for instant 1-dart finish (Must be double or Bull)
    if (score === 50) return ["BULL"];
    if (score <= 40 && score % 2 === 0) return [`D${score / 2}`];

    if (dartsAllowed === 1) return null; // Cannot finish

    // 2. Check for 2-dart finish
    // Try to leave a double
    for (const t of ALL_THROWS) {
        const val = getValue(t);
        const rem = score - val;

        // If remainder is a valid double check
        if (rem > 0) {
            // Check if remainder is a double
            if (rem === 50) return [t, "BULL"];
            if (rem <= 40 && rem % 2 === 0) return [t, `D${rem / 2}`];
        }
    }

    if (dartsAllowed === 2) return null;

    // 3. Check for 3-dart finish
    // We prioritize T20, T19, T18, T17... for the first dart
    for (const t of ALL_THROWS) {
        const val1 = getValue(t);
        const rem1 = score - val1;

        if (rem1 <= 1) continue; // Invalid

        // Now look for a 2-dart finish for rem1
        const subPath = getCheckoutPath(rem1, 2);
        if (subPath) {
            return [t, ...subPath];
        }
    }

    return null;
};
