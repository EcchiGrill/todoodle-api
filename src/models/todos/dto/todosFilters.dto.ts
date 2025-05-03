import { Type } from 'class-transformer'
import { IsOptional } from 'class-validator'

export class TodosFiltersDto {
  @IsOptional()
  @Type(() => Number)
  page?: number

  @IsOptional()
  @Type(() => Boolean)
  completed?: boolean
}
