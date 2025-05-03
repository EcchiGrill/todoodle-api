import { Injectable } from '@nestjs/common'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateTodoDto } from './dto/createTodo.dto'
import { TodosFiltersDto } from './dto/todosFilters.dto'
import { TODOS_PER_PAGE } from '../../../constants'

@Injectable()
export class TodosService {
  constructor(private readonly prisma: PrismaService) {}

  getTodos({ completed = false, page = 1 }: TodosFiltersDto) {
    return completed
      ? this.prisma.todo.findMany({
          take: TODOS_PER_PAGE,
          skip: (page - 1) * TODOS_PER_PAGE,
          where: {
            completed: {
              equals: true,
            },
          },
        })
      : this.prisma.todo.findMany({
          take: TODOS_PER_PAGE,
          skip: (page - 1) * TODOS_PER_PAGE,
        })
  }

  createTodo(data: CreateTodoDto) {
    return this.prisma.todo.create({
      data,
    })
  }
}
