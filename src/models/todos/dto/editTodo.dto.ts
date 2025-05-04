import { PartialType, PickType } from '@nestjs/swagger'
import { TodoEntity } from '../entity/todo.entity'

export class EditTodoDto extends PartialType(
  PickType(TodoEntity, ['title', 'completed']),
) {}
