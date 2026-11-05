import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.js";

async function bootstrap() : Promise<void> {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000, "0.0.0.0");
}

bootstrap().catch((error) => {
    console.error("서버 시작 실패:", error);
    process.exitCode = 1;
})