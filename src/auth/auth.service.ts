import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(access_token?: string) {
    const createToken = async () => {
      const uid = (await this.prisma.user.create({})).uid
      const payload = {
        role: 'guest',
        anonId: uid,
        secret: process.env.JWT_SECRET,
      }

      return {
        access_token: this.jwtService.sign(payload),
        uid,
      }
    }

    if (!access_token) return await createToken()

    try {
      const tokenData = this.jwtService.verify(access_token)
      return {
        uid: tokenData.anonId,
        access_token,
      }
    } catch (error) {
      return await createToken()
    }
  }
}
