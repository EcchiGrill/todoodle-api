import { Controller, Post, Headers } from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth('Authorization')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiCreatedResponse({
    description: 'Login anonymously',
  })
  @Post()
  login(@Headers() headers: Record<string, string>) {
    let token: string

    const authHeader = headers['authorization']
    if (authHeader) token = authHeader.split(' ')[1]

    return this.service.login(token)
  }
}
