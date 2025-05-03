import { Test, TestingModule } from '@nestjs/testing'
import { TodosController } from '../todos.controller'
import { TodosService } from '../todos.service'

describe('TodosController', () => {
  let controller: TodosController
  let service: TodosService

  const mockAppService = {
    createTodo: jest.fn().mockResolvedValue({
      id: 1,
      title: 'example-title',
      completed: false,
    }),
    getTodos: jest.fn().mockResolvedValue([
      {
        id: 1,
        title: 'example-title',
        completed: false,
      },
    ]),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockAppService,
        },
      ],
    }).compile()

    controller = module.get<TodosController>(TodosController)
    service = module.get<TodosService>(TodosService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('getTodos', () => {
    it('should return Todos', async () => {
      const result = await controller.getTodos()

      expect(mockAppService.getTodos).toHaveBeenCalled()
      expect(result).toEqual([
        {
          id: 1,
          title: 'example-title',
          completed: false,
        },
      ])
    })

    it('should handle errors', async () => {
      mockAppService.getTodos.mockRejectedValueOnce(
        new Error('Get Todos error'),
      )

      await expect(controller.getTodos()).rejects.toThrow('Get Todos error')
    })
  })

  describe('createTodo', () => {
    it('should create Todo', async () => {
      const result = await controller.createTodo({
        title: 'example-title',
      })

      expect(mockAppService.createTodo).toHaveBeenCalled()
      expect(result).toEqual({
        id: 1,
        title: 'example-title',
        completed: false,
      })
    })

    it('should handle errors', async () => {
      mockAppService.createTodo.mockRejectedValueOnce(
        new Error('Todo creation error'),
      )

      await expect(
        controller.createTodo({
          title: 'example-title',
        }),
      ).rejects.toThrow('Todo creation error')
    })
  })
})
