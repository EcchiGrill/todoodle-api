import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'
import { TodoEntity } from 'src/models/todos/entity/todo.entity'
import { TODOS_PER_PAGE } from '../constants'

describe('TodosController (e2e)', () => {
  let app: INestApplication
  let authToken: string
  let todoId: number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    const authResponse = await request(app.getHttpServer())
      .post('/auth')
      .expect(201)

    authToken = authResponse.body.access_token
  })

  it('/todos (POST)', async () => {
    const response = await request(app.getHttpServer())
      .post('/todos')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'example-title',
      })
      .expect(201)

    todoId = response.body.id
  })

  it('/todos (GET)', () => {
    return request(app.getHttpServer())
      .get('/todos')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true)

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
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBe(true)
        expect(res.body.length <= TODOS_PER_PAGE).toBe(true)

        res.body.forEach((item: TodoEntity) => {
          expect(item).toMatchObject({
            id: expect.any(Number),
            title: expect.any(String),
            completed: true,
          })
        })
      })
  })

  it('/todos/:id (PUT)', () => {
    return request(app.getHttpServer())
      .put(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'updated-title',
        completed: true,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toBe(todoId)
        expect(res.body.title).toBe('updated-title')
        expect(res.body.completed).toBe(true)
      })
  })

  it('/todos/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})
