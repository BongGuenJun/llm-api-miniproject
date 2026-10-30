import { GoogleGenAI} from "@google/genai";

type AnalysisResult = {
    category : string;
    summary : string;
    requiresAction : boolean;
};

async function analyzeInquiry(text : string): Promise<AnalysisResult> {
    
    if (text.trim().length === 0) {
        throw new Error("문의 문장은 비어 있을 수 없습니다.");
        }
    
    // 실제 API를 대신해 1초 동안 기다리는 연습
    await new Promise<void>((resolve) => setTimeout(resolve, 1000));

    return {
        category : "예약 변경",
        summary : text,
        requiresAction : true,
    };
}

async function main(): Promise<void> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey){
        throw new Error("GEMINI_API_KEY가 설정되지 않았습니다.")
    }

    const ai = new GoogleGenAI({apiKey});

    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: "다음 문장을 한 문장으로 요약해줘 : 다음 주로 예약을 변경하고 싶습니다.",
    });

    console.log("LLM 응답:", response.text);
    console.log("API 키 설정 확인 완료")
    console.log("가짜분석 시작");
    const result = await analyzeInquiry("다음 주로 예약을 변경하고 싶습니다.");
    console.log("가짜분석 결과:", result);
    console.log("분석 종료");
}

main().catch((error) => {
    console.error("실행 실패:", error);
    process.exitCode = 1;
});