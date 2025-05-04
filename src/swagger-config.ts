import { DocumentBuilder } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Todoodle API | Dmytro Oborskyi')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    },
    'Authorization',
  )
  .build()
