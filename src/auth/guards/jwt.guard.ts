import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const authHeader = request.headers['authorization']

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid token')
    }

    const token = authHeader.split(' ')[1]

    try {
      const payload = this.jwtService.verify(token)
      request.userId = payload.anonId
      return true
    } catch (err) {
      throw new UnauthorizedException('Invalid token or expired')
    }
  }
}
