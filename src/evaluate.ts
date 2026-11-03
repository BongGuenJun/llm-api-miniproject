import { mkdir, writeFile } from "node:fs/promises";
import { GoogleGenAI } from "@google/genai";
import { analyzeInquiry } from "./analyze-inquiry.js";
import { evaluationCases } from "./evaluation-data.js";
import type { AnalysisResult } from "./analysis.schema.js";

type EvaluationRecord = {
    id: string;
    input: string;
    expectedCategory: AnalysisResult["category"];
    expectedRequiresAction: boolean;
    result: AnalysisResult | null;
    success: boolean;
    categoryCorrect: boolean | null;
    actionCorrect: boolean | null;
    elapsedMs: number;
    error: string | null;
};

async function main(): Promise<void> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY가 설정되지 않았습니다.");
    }

    if (evaluationCases.length === 0) {
        throw new Error("평가 데이터가 없습니다.");
    }

    const ai = new GoogleGenAI({ apiKey });
    const records: EvaluationRecord[] = [];

    for (const testCase of evaluationCases) {
        const startedAt = performance.now();

        try {
            const result = await analyzeInquiry(ai, testCase.text);
            const elapsedMs = Math.round(
                performance.now() - startedAt
            );

            const categoryCorrect =
                result.category === testCase.expectedCategory;

            const actionCorrect =
                result.requiresAction ===
                testCase.expectedRequiresAction;

            const record: EvaluationRecord = {
                id: testCase.id,
                input: testCase.text,
                expectedCategory: testCase.expectedCategory,
                expectedRequiresAction:
                    testCase.expectedRequiresAction,
                result,
                success: true,
                categoryCorrect,
                actionCorrect,
                elapsedMs,
                error: null,
            };

            records.push(record);
            console.log(record);
        } catch (error: unknown) {
            const record: EvaluationRecord = {
                id: testCase.id,
                input: testCase.text,
                expectedCategory: testCase.expectedCategory,
                expectedRequiresAction:
                    testCase.expectedRequiresAction,
                result: null,
                success: false,
                categoryCorrect: null,
                actionCorrect: null,
                elapsedMs: Math.round(
                    performance.now() - startedAt
                ),
                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            };

            records.push(record);
            console.error(record);
        }

        // 呼び出し後、次のケースまで5秒待つ
        await new Promise<void>((resolve) => {
            setTimeout(resolve, 5000);
        });
    }

    const summary = {
        total: records.length,
        succeeded: records.filter(
            (record) => record.success
        ).length,
        failed: records.filter(
            (record) => !record.success
        ).length,
        categoryCorrect: records.filter(
            (record) => record.categoryCorrect === true
        ).length,
        actionCorrect: records.filter(
            (record) => record.actionCorrect === true
        ).length,
    };

    await mkdir("results", { recursive: true });

    const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-");

    const outputPath = `results/evaluation-${timestamp}.json`;

    await writeFile(
        outputPath,
        JSON.stringify(
            {
                recordFormatVersion: 2,
                summary,
                records,
            },
            null,
            2
        ),
        "utf8"
    );

    console.log("평가 집계:", summary);
    console.log("결과 저장:", outputPath);
}

main().catch((error) => {
    console.error("평가 실행 실패:", error);
    process.exitCode = 1;
});