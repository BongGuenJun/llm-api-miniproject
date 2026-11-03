import assert from "node:assert/strict";
import { requestWithRetry } from "./analyze-inquiry.js";

async function main(): Promise<void> {
    // 첫 시도는 503, 두 번째는 성공
    let recoveryAttempts = 0;

    const result = await requestWithRetry(async () => {
        recoveryAttempts++;

        if (recoveryAttempts === 1) {
            throw Object.assign(new Error("가짜 503"), {
                status: 503,
            });
        }

        return "성공";
    });

    assert.equal(result, "성공");
    assert.equal(recoveryAttempts, 2);
    console.log("통과: 503 후 두 번째 시도 성공");

    // 계속 503이면 두 번 시도한 뒤 실패
    let failureAttempts = 0;

    await assert.rejects(
        () =>
            requestWithRetry(async () => {
                failureAttempts++;

                throw Object.assign(new Error("계속되는 가짜 503"), {
                    status: 503,
                });
            }),
        /계속되는 가짜 503/
    );

    assert.equal(failureAttempts, 2);
    console.log("통과: 최대 두 번 시도 후 실패");

    // 400은 재시도하지 않음
    let badRequestAttempts = 0;

    await assert.rejects(
        () =>
            requestWithRetry(async () => {
                badRequestAttempts++;

                throw Object.assign(new Error("가짜 400"), {
                    status: 400,
                });
            }),
        /가짜 400/
    );

    assert.equal(badRequestAttempts, 1);
    console.log("통과: 400은 한 번만 시도");
}

main().catch((error) => {
    console.error("재시도 검사 실패:", error);
    process.exitCode = 1;
});