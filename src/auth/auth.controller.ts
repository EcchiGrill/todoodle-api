import { Controller, Post } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiCreatedResponse({
    description: 'Login anonymously',
  })
  @Post()
  login() {
    return this.service.login()
  }
}
