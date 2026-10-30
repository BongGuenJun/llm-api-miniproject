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
    console.log("분석 시작");

    //TODO : analyseInquiry에 문의 문장을 전달하고,
    //결과를 기다려 result 변수에 저장하기
    const result = await analyzeInquiry("다음 주로 예약을 변경하고 싶습니다.");

    console.log("분석 결과:", result);
    console.log("분석 종료");
}

main().catch((error) => {
    console.error("실행 실패:", error);
    process.exitCode = 1;
});