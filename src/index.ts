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
        throw new Error("GEMENI_API_KEY가 설정되지 않았습니다.")
    }

    console.log("API 키 설정 확인 완료")
    console.log("분석 시작");
    const result = await analyzeInquiry("다음 주로 예약을 변경하고 싶습니다.");
    console.log("분석 결과:", result);
    console.log("분석 종료");
}

main().catch((error) => {
    console.error("실행 실패:", error);
    process.exitCode = 1;
});