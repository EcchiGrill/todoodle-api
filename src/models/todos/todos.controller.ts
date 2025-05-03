import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { ApiCreatedResponse, ApiQuery, ApiTags } from '@nestjs/swagger'
import { TodoEntity } from './entity/todo.entity'
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dto/createTodo.dto'
import { TodosFiltersDto } from './dto/todosFilters.dto'

@ApiTags('Todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @ApiCreatedResponse({
    description: 'Get all Todos',
    type: [TodoEntity],
  })
  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'completed', required: false, type: Boolean })
  getTodos(@Query() filters?: TodosFiltersDto) {
    return this.service.getTodos(filters)
  }

  @ApiCreatedResponse({
    description: 'Create Todo',
    type: TodoEntity,
  })
  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.service.createTodo(body)
  }
}
