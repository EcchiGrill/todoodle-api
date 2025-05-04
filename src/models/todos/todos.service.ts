import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateTodoDto } from './dto/createTodo.dto'
import { TodosFiltersDto } from './dto/todosFilters.dto'
import { TODOS_PER_PAGE } from '../../../constants'
import { EditTodoDto } from './dto/editTodo.dto'

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  async getTodos(userId: string, { completed, page }: TodosFiltersDto) {
    return this.prisma.todo.findMany({
      take: TODOS_PER_PAGE,
      skip: (page - 1) * TODOS_PER_PAGE,
      where: {
        ...(completed !== undefined && {
          completed,
        }),
        userId,
      },
    })
  }

  async createTodo(userId: string, body: CreateTodoDto) {
    return this.prisma.todo.create({
      data: {
        userId,
        ...body,
      },
    })
  }

  async editTodo(id: number, data: EditTodoDto) {
    return this.prisma.todo.update({
      where: { id },
      data,
    })
  }

  async deleteTodo(id: number) {
    return this.prisma.todo.delete({
      where: { id },
    })
  }
}
