import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login() {
    const userId = (await this.prisma.user.create({})).uid
    const payload = {
      role: 'guest',
      anonId: userId,
      secret: process.env.JWT_SECRET,
    }

    return {
      access_token: this.jwtService.sign(payload),
      userId,
    }
  }
}
