import { Injectable } from "@nestjs/common";
import { GoogleGenAI } from "@google/genai";
import { analyzeInquiry } from "./analyze-inquiry.js";
import type { AnalysisResult } from "./analysis.schema.js";

@Injectable()
export class AnalysisService {
    private readonly ai: GoogleGenAI;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("GEMINI_API_KEY가 설정되지 않았습니다.");
        }

        this.ai = new GoogleGenAI({ apiKey });
    }

    async analyze(text: string): Promise<AnalysisResult> {
        return analyzeInquiry(this.ai, text);
    }
}