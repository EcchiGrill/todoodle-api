import { ApiProperty } from '@nestjs/swagger'
import { Todo } from '@prisma/client'
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator'

export class TodoEntity implements Todo {
  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsUUID()
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
