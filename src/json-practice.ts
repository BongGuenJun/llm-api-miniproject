import { AnalysisSchema} from "./analysis.schema.js";

const rawText = '{"category":"이용 문의","summary":"토요일 운영 여부 문의","requiresAction":false}';

const parsed: unknown = JSON.parse(rawText);

console.log("변환 전 타입:", typeof rawText);
console.log("변환 전:", rawText);

console.log("변환 후 타입:", typeof parsed);
console.log("변환 후:", parsed);

const validation = AnalysisSchema.safeParse(parsed);

if (validation.success){
    console.log("검증 성공:", validation.data);
} else {
    console.log("검증 실패:", validation.error.issues);
}