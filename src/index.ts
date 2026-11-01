import { GoogleGenAI } from "@google/genai";
import { analyzeInquiry } from "./analyze-inquiry.js";

async function main(): Promise<void> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY가 설정되지 않았습니다.");
    }

    console.log("API 키 설정 확인 완료");

    const ai = new GoogleGenAI({ apiKey });
    const result = await analyzeInquiry(ai, "내일 예약을 취소해주세요.");

    console.log("검증된 분석 결과:", result);
}

main().catch((error) => {
    console.error("실행 실패:", error);
    process.exitCode = 1;
});