import { z } from "zod";

export const AnalysisSchema = z.object({
    category : z.enum(["예약 변경", "예약 취소", "이용 문의", "기타"]),
    summary : z.string().trim().min(1),
    requiresAction : z.boolean(),
});

export type AnalysisResult = z.infer<typeof AnalysisSchema>;