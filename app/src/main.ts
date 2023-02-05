import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

const PORT = 8000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({transform: true}));
    await startApp(app);
}

async function startApp(app, portIndex = 0) {
    try {
        await app.listen(PORT);
        console.log(`App is listening in port ${PORT}`);
    } catch (error) {
        console.log('App start error')
    }
}

bootstrap();