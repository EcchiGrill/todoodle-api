import { TodoModule } from './models/todos/todos.module'
import { PrismaModule } from './prisma/prisma.module'
import { Module } from '@nestjs/common'

@Module({
  imports: [PrismaModule, TodoModule],
})
export class AppModule {}
