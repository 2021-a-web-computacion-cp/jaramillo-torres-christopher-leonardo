import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app: any = await NestFactory.create(AppModule);
  app.set('view engine', 'ejs');
  await app.listen(3000);
}
bootstrap();
