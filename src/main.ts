import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AtGuard } from './guards';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // const reflector = new Reflector();
  // app.useGlobalGuards(new AtGuard(reflector));
  // app.useGlobalFilters();
  // app.useGlobalGuards();
  // app.useGlobalInterceptors();
  await app.listen(3000);
}
bootstrap();
