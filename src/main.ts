import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './shared/interceptors/transform/transform.interceptor';
import { HttpExceptionFilter } from './shared/exception/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({
      whitelist:true,
     forbidNonWhitelisted:true,
     stopAtFirstError:true,
     exceptionFactory:(errors)=> new BadRequestException(errors)
    }));
      app.useGlobalFilters(new HttpExceptionFilter)
    app.useGlobalInterceptors(new TransformInterceptor)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
