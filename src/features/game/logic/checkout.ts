/**
 * Optimal Checkout Paths for 301 Double Out.
 * Returns a list of strings representing the segments to throw.
 * e.g. ["T20", "T20", "D25"] for 170.
 */

const CHECKOUT_MAP: Record<number, string[]> = {
    // High Finishes
    170: ["T20", "T20", "BULL"],
    167: ["T20", "T19", "BULL"],
    164: ["T20", "T18", "BULL"],
    161: ["T20", "T17", "BULL"],
    160: ["T20", "T20", "D20"],

    // Bogey Numbers (No 3-dart finish) -> Set up
    169: [], 168: [], 166: [], 165: [], 163: [], 162: [], 159: [],

    // Standard Finishes
    150: ["T20", "T18", "D18"],
    140: ["T20", "T20", "D10"],
    130: ["T20", "T20", "D5"],
    120: ["T20", "20", "D20"],
    110: ["T20", "10", "D20"],
    100: ["T20", "D20"],

    // Common 2-Dart
    90: ["T18", "D18"],
    80: ["T20", "D10"],
    70: ["T18", "D8"],
    60: ["20", "D20"],
    50: ["10", "D20"],
    40: ["D20"],
    32: ["D16"],
    16: ["D8"],
    8: ["D4"],
    4: ["D2"],
    2: ["D1"]
};


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

export const getCheckoutPath = (score: number): string[] | null => {
    if (score > 170) return null;

    // Direct Lookup
    if (CHECKOUT_MAP[score]) return CHECKOUT_MAP[score];

    // Simple Calc for low scores
    if (score <= 40 && score % 2 === 0) return [`D${score / 2}`];

    if (score < 40 && score % 2 !== 0) {
        const odd = score - 32;
        if (odd > 0) return [`${odd}`, "D16"];
        const odd2 = score - 16;
        if (odd2 > 0) return [`${odd2}`, "D8"];
        return ["1", `D${(score - 1) / 2}`];
    }

    return null;
};
