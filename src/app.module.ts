import { TodoModule } from './models/todos/todos.module'
import { PrismaModule } from './prisma/prisma.module'
import { Module } from '@nestjs/common'
import { AuthController } from './auth/auth.controller'
import { AuthService } from './auth/auth.service'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [PrismaModule, TodoModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
