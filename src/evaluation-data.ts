import type { AnalysisResult } from "./analysis.schema.js";

type EvaluationCase = {
    id: string;
    text: string;
    expectedCategory: AnalysisResult["category"];
    expectedRequiresAction: boolean;
};

export const evaluationCases: EvaluationCase[] = [
    {
        id: "change-01",
        text: "내일 예약을 다음 주 월요일로 옮겨주세요.",
        expectedCategory: "예약 변경",
        expectedRequiresAction: true,
    },
    {
        id: "cancel-01",
        text: "내일 예약을 취소해주세요.",
        expectedCategory: "예약 취소",
        expectedRequiresAction: true,
    },
    {
        id: "info-01",
        text: "주차장이 있나요?",
        expectedCategory: "이용 문의",
        expectedRequiresAction: false,
    },
    {
        id: "other-01",
        text: "감사합니다. 좋은 하루 보내세요.",
        expectedCategory: "기타",
        expectedRequiresAction: false,
    },
        {
        id: "change-02",
        text: "다음달 예약을 내일로 변경하고싶어요",
        expectedCategory: "예약 변경",
        expectedRequiresAction: true,
    },
    {
        id: "cancel-02",
        text: "날짜를 잘못 입력했어요. 예약을 취소해주세요",
        expectedCategory: "예약 취소",
        expectedRequiresAction: true,
    },
    {
        id: "info-02",
        text: "도착하기 위한 길을 알려주세요",
        expectedCategory: "이용 문의",
        expectedRequiresAction: false,
    },
    {
        id: "other-02",
        text: "네, 안내 내용을 확인했습니다.",
        expectedCategory: "기타",
        expectedRequiresAction: false,
    },
        {
        id: "change-03",
        text: "예약 날짜는 그대로 두고 시간을 오후 세 시로 바꿔주세요.",
        expectedCategory: "예약 변경",
        expectedRequiresAction: true,
    },
    {
        id: "change-04",
        text: "오늘 방문이 어려워서 기존 예약을 다음 주로 미루고 싶습니다.",
        expectedCategory: "예약 변경",
        expectedRequiresAction: true,
    },
    {
        id: "change-05",
        text: "주차 가능한가요? 그리고 내일 예약을 금요일로 옮겨주세요.",
        expectedCategory: "예약 변경",
        expectedRequiresAction: true,
    },
    {
        id: "cancel-03",
        text: "방문 계획이 없어져서 잡아둔 예약을 없애주세요.",
        expectedCategory: "예약 취소",
        expectedRequiresAction: true,
    },
    {
        id: "cancel-04",
        text: "예약 변경은 하지 않겠습니다. 기존 예약을 취소해주세요.",
        expectedCategory: "예약 취소",
        expectedRequiresAction: true,
    },
    {
        id: "cancel-05",
        text: "위치도 궁금하지만 우선 내일 예약부터 취소해주세요.",
        expectedCategory: "예약 취소",
        expectedRequiresAction: true,
    },
    {
        id: "info-03",
        text: "예약을 취소하려면 어떤 절차를 거쳐야 하나요? 지금 취소해달라는 뜻은 아닙니다.",
        expectedCategory: "이용 문의",
        expectedRequiresAction: false,
    },
    {
        id: "info-04",
        text: "예약 변경이 가능한 시간대를 안내받고 싶습니다. 아직 변경 요청은 아닙니다.",
        expectedCategory: "이용 문의",
        expectedRequiresAction: false,
    },
    {
        id: "info-05",
        text: "가장 가까운 지하철역과 출구를 알려주세요.",
        expectedCategory: "이용 문의",
        expectedRequiresAction: false,
    },
    {
        id: "other-03",
        text: "오늘 날씨가 참 좋네요.",
        expectedCategory: "기타",
        expectedRequiresAction: false,
    },
    {
        id: "other-04",
        text: "직원 응대에 대해 정식으로 불만을 접수하고 싶습니다. 담당자가 확인 후 연락해주세요.",
        expectedCategory: "기타",
        expectedRequiresAction: true,
    },
    {
        id: "other-05",
        text: "아래 문장을 영어로 번역해주세요: 오늘은 좋은 날입니다.",
        expectedCategory: "기타",
        expectedRequiresAction: false,
    },
];