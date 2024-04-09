import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService);
  const port = configService.get('PORT_API')
  
  if (!port) throw new Error("Application port wasn't found")
  
  useContainer(app.select(AppModule), { fallbackOnErrors: true })
    
  app.useGlobalPipes(
  new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
        
    })
  )
  


  const config = new DocumentBuilder()
    .setTitle('IOLANDA FASHION API')
    .setDescription('Iolanda Fashion API developed by Victor Hugo.<br><br><a href="https://github.com/Victor0C" target="_blank">GitHub</a> | <a href="https://www.linkedin.com/in/victorhugooc/" target="_blank">LinkedIn</a>')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('docs', app, document,{
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: (a, b) => {
        const methodOrder = ['post', 'get', 'put', 'delete']
        const scoreA = methodOrder.indexOf(a.get("method"))
        const scoreB = methodOrder.indexOf(b.get("method"))
        
        if (scoreA < scoreB) {
          return -1
        }
        if (scoreA > scoreB) {
          return 1
        }
    
        return a.get("path").localeCompare(b.get("path"));
      }
    },
  })
  
  await app.listen(port)
}
bootstrap();
