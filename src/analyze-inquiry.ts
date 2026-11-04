import { AnalysisSchema } from "./analysis.schema.js";
import type { AnalysisResult } from "./analysis.schema.js";
import { GoogleGenAI } from "@google/genai";
import { ANALYSIS_CONFIG } from "./analysis.config.js";
import { buildAnalysisPrompt } from "./analysis.prompt.js";

export async function requestWithRetry<T>(
    request: () => Promise<T>
): Promise<T> {
    for (
        let attempt = 1;
        attempt <= ANALYSIS_CONFIG.maxAttempts;
        attempt++
    ) {
        try {
            return await request();
        } catch (error: unknown) {
            const is503 =
                typeof error === "object" &&
                error !== null &&
                "status" in error &&
                error.status === 503;

            const canRetry =
                is503 && attempt < ANALYSIS_CONFIG.maxAttempts;

            if (!canRetry) {
                throw error;
            }

            console.warn(
                `503 발생: ${ANALYSIS_CONFIG.retryDelayMs}ms 후 재시도`
            );

            await new Promise<void>((resolve) => {
                setTimeout(resolve, ANALYSIS_CONFIG.retryDelayMs);
            });
        }
    }

    throw new Error("최대 시도 횟수를 초과했습니다.");
}

export async function analyzeInquiry(
    ai: GoogleGenAI,
    text: string
): Promise<AnalysisResult> {
    if (text.trim().length === 0) {
        throw new Error("문의 문장은 비어 있을 수 없습니다.");
    }

    const response = await requestWithRetry(() =>
        ai.models.generateContent({
            model: ANALYSIS_CONFIG.model,
            config: {
                httpOptions: {
                    timeout: ANALYSIS_CONFIG.timeoutMs,
                    retryOptions: {
                        attempts: 1,
                    },
                },
            },
            contents: buildAnalysisPrompt(
                text,
                ANALYSIS_CONFIG.promptVersion
            ),

        })
    );

    const rawText = response.text;

    if (!rawText || rawText.trim().length === 0) {
        throw new Error("LLM 응답이 비어 있습니다.");
    }

    const parsed: unknown = JSON.parse(rawText);
    const validation = AnalysisSchema.safeParse(parsed);

    if (!validation.success) {
        console.error("검증 오류:", validation.error.issues);
        throw new Error("LLM 응답이 분석 결과 스키마에 맞지 않습니다.");
    }

    return validation.data;
}