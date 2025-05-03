import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger'
import { TodoEntity } from './entity/todo.entity'
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dto/createTodo.dto'
import { EditTodoDto } from './dto/editTodo.dto'

@ApiTags('Todos')
@Controller('todos')
@UsePipes(new ValidationPipe())
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @ApiOkResponse({
    description: 'Get all Todos',
    type: [TodoEntity],
  })
  @Get()
  @ApiQuery({ name: '_page', required: false, type: Number })
  @ApiQuery({ name: 'completed', required: false, type: Boolean })
  getTodos(
    @Query('_page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('completed', new ParseBoolPipe({ optional: true }))
    completed?: boolean,
  ) {
    return this.service.getTodos({
      page,
      completed,
    })
  }

  @ApiCreatedResponse({
    description: 'Create Todo',
    type: TodoEntity,
  })
  @Post()
  createTodo(@Body() body: CreateTodoDto) {
    return this.service.createTodo(body)
  }

  @ApiOkResponse({
    description: 'Edit Todo',
    type: TodoEntity,
  })
  @ApiParam({ name: 'id', required: true, type: Number })
  @Put(':id')
  editTodo(@Param('id', ParseIntPipe) id: number, @Body() body: EditTodoDto) {
    return this.service.editTodo(id, body)
  }

  @ApiOkResponse({
    description: 'Delete Todo',
    type: TodoEntity,
  })
  @ApiParam({ name: 'id', required: true, type: Number })
  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteTodo(id)
  }
}
