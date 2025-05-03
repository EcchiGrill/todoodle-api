import { PickType } from '@nestjs/swagger'
import { TodoEntity } from '../entity/todo.entity'

export class CreateTodoDto extends PickType(TodoEntity, ['title']) {}
