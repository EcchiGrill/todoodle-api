import { DocumentBuilder } from '@nestjs/swagger'

export const config = new DocumentBuilder()
  .setTitle('Todoodle API | Dmytro Oborskyi')
  .setVersion('1.0')
  .build()
