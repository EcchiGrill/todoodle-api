import { IsBoolean, IsNumber, IsOptional } from 'class-validator'

export class TodosFiltersDto {
  @IsOptional()
  @IsNumber()
  page?: number

  @IsOptional()
  @IsBoolean()
  completed?: boolean
}
