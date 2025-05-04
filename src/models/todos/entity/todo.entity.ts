import { ApiProperty } from '@nestjs/swagger'
import { Todo } from '@prisma/client'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'

export class TodoEntity implements Todo {
  @ApiProperty({
    example: '1b2c3d4e-5f6g-7h8i-9j0k-l1m2n3o4p5q6',
  })
  @IsUUID()
  userId: string

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  id: number

  @ApiProperty({
    example: 'Get done with the project',
  })
  @IsString()
  title: string

  @ApiProperty({
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  completed: boolean
}
