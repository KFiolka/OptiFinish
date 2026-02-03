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

/**
 * Calculates a simple checkout path.
 * For MVP, we stick to a lookup table for common optimal paths.
 * If no direct entry, we can return null or a generic advice.
 */
export const getCheckoutPath = (score: number, dartsRemaining: number = 3): string[] | null => {
    if (score <= 1) return null; // Bust or 1 (impossible)
    if (score > 170) return null; // No 3-dart finish possible

    // 1. Direct Lookup
    if (CHECKOUT_MAP[score]) {
        // Filter if we have fewer darts? 
        // For now, static path assumes full turn or we just show the "Check out" path regardless of darts left.
        // Ideally, if I have 1 dart left and need 100, I can't check out.

        const path = CHECKOUT_MAP[score];
        if (path.length > dartsRemaining) {
            // Can't finish in remaining darts
            // Could return "Setup" advice?
            return null;
        }
        return path;
    }

    // 2. Simple Dynamic Calculation for Low Scores (< 40)
    // If even number <= 40, try to finish on double.
    if (score <= 40 && score % 2 === 0) {
        return [`D${score / 2}`];
    }

    // 3. Fallback for Odd numbers < 40
    // e.g. 39 -> 7, D16? 
    // e.g. 19 -> 3, D8
    if (score < 40 && score % 2 !== 0) {
        const odd = score - 32; // Try to leave 32 (D16)
        if (odd > 0 && odd <= 20) {
            return [`${odd}`, "D16"];
        }
        // Or leave 16 (D8)
        const odd2 = score - 16;
        if (odd2 > 0 && odd2 <= 20) {
            return [`${odd2}`, "D8"];
        }
        // Just single 1 to setup?
        return ["1", `D${(score - 1) / 2}`];
    }

    return null;
};
