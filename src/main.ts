import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import dotenvx from '@dotenvx/dotenvx';

dotenvx.config();

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  console.log(process.env);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
