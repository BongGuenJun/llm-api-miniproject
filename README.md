# LLM Inquiry Analysis API

사용자의 문의를 Gemini API로 분류·요약하고, Zod로 응답 구조를 검증하는 TypeScript·NestJS 미니프로젝트입니다.

## 현재 구현

- `GET /health`: 서버 상태 확인
- `POST /analyze`: 문의 분류·요약
- 입력 문자열 검증: 공백 제거 후 1~2000자
- LLM 응답의 JSON 변환과 Zod 스키마 검증
- 환경변수를 통한 API 키 관리

## 실행 방법

```powershell
npm install
```

`.env.example`을 복사해 `.env`를 만들고 Gemini API 키를 입력합니다.

```dotenv
GEMINI_API_KEY=발급받은_API_키
```

```powershell
npm run build
npm start
```

Windows PowerShell에서 npm 실행 정책 오류가 발생하면 `npm` 대신 `npm.cmd`를 사용합니다.

서버 주소: `http://127.0.0.1:3000`

## 요청 예시

`POST /analyze`

```json
{
  "text": "내일 예약을 취소해주세요."
}
```

응답 예시:

```json
{
  "category": "예약 취소",
  "summary": "내일 예정된 예약의 취소를 요청함.",
  "requiresAction": true
}
```

분류는 `예약 변경`, `예약 취소`, `이용 문의`, `기타` 중 하나입니다.
빈 문자열이나 공백만 있는 입력은 HTTP 400으로 거부합니다.

## 사용 기술

TypeScript, Node.js, NestJS, Gemini API, Zod

## 한계와 다음 작업

- 스키마 검증은 응답 구조를 검사하며, 분류 내용의 정확성을 보장하지 않습니다.
- 고정 평가 데이터와 프롬프트 비교는 아직 진행하지 않았습니다.
- 시간 초과·제한된 재시도·외부 API 오류 응답 처리를 보강할 예정입니다.
- Linux 실행과 Docker 재현을 추가할 예정입니다.