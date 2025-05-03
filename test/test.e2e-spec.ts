import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { TodoEntity } from 'src/models/todos/entity/todo.entity'
import { TODOS_PER_PAGE } from '../constants'

describe('TestController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/todos (POST)', () => {
    return request(app.getHttpServer())
      .post('/todos')
      .send({
        title: 'example-title',
      })
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('title')
        expect(res.body).toHaveProperty('completed')
      })
  })

  it('/todos (GET)', () => {
    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .expect((res) => {
        // Check if response is an array
        expect(Array.isArray(res.body)).toBe(true)

        // Check structure of each item in array
        res.body.forEach((item: TodoEntity) => {
          expect(item).toMatchObject({
            id: expect.any(Number),
            title: expect.any(String),
            completed: expect.any(Boolean),
          })
        })
      })
  })

  it('/todos?page=2&completed=true (GET + Filters)', () => {
    return request(app.getHttpServer())
      .get('/todos?page=2&completed=true')
      .expect(200)
      .expect((res) => {
        // Check if response is an array
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length <= TODOS_PER_PAGE).toBe(true)

        // Check structure of each item in array
        res.body.forEach((item: TodoEntity) => {
          expect(item).toMatchObject({
            id: expect.any(Number),
            title: expect.any(String),
            completed: true,
          })
        })
      })
  })
})
