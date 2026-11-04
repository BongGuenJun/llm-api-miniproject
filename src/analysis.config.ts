export const ANALYSIS_CONFIG = {
    model: "gemini-3.5-flash-lite",
    promptVersion: "C",
    timeoutMs: 60_000,
    maxAttempts: 2,
    retryDelayMs: 2_000,
} as const;