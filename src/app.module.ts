import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AnalysisService } from "./analysis.service.js";

@Module({
    controllers: [AppController],
    providers: [AnalysisService],
})
export class AppModule {}