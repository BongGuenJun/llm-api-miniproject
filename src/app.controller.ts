import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    Post,
} from "@nestjs/common";
import { z } from "zod";
import { AnalysisService } from "./analysis.service.js";

const AnalyzeRequestSchema = z.object({
    text: z.string().trim().min(1).max(2000),
});

@Controller()
export class AppController {
    constructor(
        private readonly analysisService: AnalysisService
    ) {}

    @Get("health")
    getHealth() {
        return { status: "ok" };
    }

    @Post("analyze")
    @HttpCode(200)
    async analyze(@Body() body: unknown) {
        const validation = AnalyzeRequestSchema.safeParse(body);

        if (!validation.success) {
            throw new BadRequestException({
                message: "text는 1~2000자의 문자열이어야 합니다.",
                issues: validation.error.issues,
            });
        }

        return this.analysisService.analyze(validation.data.text);
    }
}