import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { HttpExceptionFilter } from '../src/helpers/filters/http-exeption.filter';
import { AppModule } from '../src/app.module'
import * as constants from './constants';

jest.setTimeout(60000)
describe('AppController', () => {
  let app: INestApplication
  let server: any
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    transform: true,
    exceptionFactory: (errors) => {
      const customErrors = [];
      errors.forEach(e => {
        const keys = Object.keys(e.constraints)
        keys.forEach(k => {
          customErrors.push({
            message: e.constraints[k],
            field: e.property,
          })
        })
      })
      throw new BadRequestException(customErrors)
    }
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
    await app.init()
    server = app.getHttpServer()
  });

  afterAll(async () => {
    app.close()
  })

  describe('sa-user-controller', () => {

    const question1 = {
      body: 'how are you?',
      correctAnswers: ['thanks, fine', 'it norm, how are you?']
    }

    const question2 = {
      body: '2-how are you?',
      correctAnswers: ['2', 'thanks, fine', 'it norm, how are you?']
    }

    const updateQuestion = {
      body: 'hi, how are you?',
      correctAnswers: ['its ok', 'it norm, how are you?']
    }

    let questionId = ''
    const incorrectAnyUUID = 'b252c185-7777-4444-7777-8b6f242a2ff8'

    it('should delete all data', async () => {
      await request(server).delete('/testing/all-data').expect(204)
    })

    it('should create new question', async () => {
      const response = await request(server).post('/sa/quiz/questions')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(question1)
        .expect(201)
      await request(server).post('/sa/quiz/questions').set('Authorization', 'Basic YWRtaW46cXdlcnR5').send(question2)
      await request(server).post('/sa/quiz/questions').set('Authorization', 'Basic YWRtaW46cXdlcnR5').expect(400)

      questionId = response.body.id
      
      expect(response.body).toStrictEqual({
        "id": expect.any(String),
        "body": question1.body,
        "correctAnswers": question1.correctAnswers,
        "published": false,
        "createdAt": expect.any(String),
        "updatedAt": expect.any(String),
      });

    });

    it('should update one question', async () => {
      await request(server).put(`/sa/quiz/questions/${questionId}`)
        .send(updateQuestion)
        .expect(401);

      await request(server).put(`/sa/quiz/questions/${questionId}`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .expect(400);

      await request(server).put(`/sa/quiz/questions/${incorrectAnyUUID}`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(updateQuestion)
        .expect(404);

      await request(server).put(`/sa/quiz/questions/${questionId}`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(updateQuestion)
        .expect(204);

      const response = await request(server).get('/sa/quiz/questions')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(constants.createUser1)

      expect(response.body.items.find(i => i.id === questionId).body).toStrictEqual(updateQuestion.body);
      expect(response.body.items.find(i => i.id === questionId).correctAnswers).toStrictEqual(updateQuestion.correctAnswers);
    });

    it('should publish one question', async () => {
      await request(server).put(`/sa/quiz/questions/${questionId}/publish`)
        .send({published: true})
        .expect(401);

      await request(server).put(`/sa/quiz/questions/${questionId}/publish`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .expect(400);

      await request(server).put(`/sa/quiz/questions/${incorrectAnyUUID}/publish`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send({published: true})
        .expect(404);

      await request(server).put(`/sa/quiz/questions/${questionId}/publish`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send({published: true})
        .expect(204);

      const response = await request(server).get('/sa/quiz/questions')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(constants.createUser1)

      expect(response.body.items.find(i => i.id === questionId).body).toStrictEqual(updateQuestion.body);
    });

    it('should return all questions using query-params', async () => {
      const response = await request(server).get('/sa/quiz/questions')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(constants.createUser1)
        .expect(200);

      expect(response.body).toStrictEqual({
        pagesCount: 1,
        page: 1,
        pageSize: 10,
        totalCount: 2,
        items: [
          {
            body: "2-how are you?",
            correctAnswers: ["2", "thanks, fine", "it norm, how are you?"],
            createdAt: expect.any(String),
            id: expect.any(String),
            published: false,
            updatedAt: expect.any(String),
          },
          {
            body: updateQuestion.body,
            correctAnswers: updateQuestion.correctAnswers,
            createdAt: expect.any(String),
            id: expect.any(String),
            published: true,
            updatedAt: expect.any(String),
          },
        ]
      })

      expect(response.body.items.length).toBe(2);

      const responseWithQuerySort = await request(server).get('/sa/quiz/questions?sortDirection=asc')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(constants.createUser1)
        .expect(200);
      
      expect(responseWithQuerySort.body).toStrictEqual({
        pagesCount: 1,
        page: 1,
        pageSize: 10,
        totalCount: 2,
        items: [
          {
            body: updateQuestion.body,
            correctAnswers: updateQuestion.correctAnswers,
            createdAt: expect.any(String),
            id: expect.any(String),
            published: true,
            updatedAt: expect.any(String),
          },
          {
            body: "2-how are you?",
            correctAnswers: ["2", "thanks, fine", "it norm, how are you?"],
            createdAt: expect.any(String),
            id: expect.any(String),
            published: false,
            updatedAt: expect.any(String),
          },
        ]
      })

      const responseWithQueryTruePublish = await request(server).get('/sa/quiz/questions?publishedStatus=published')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(constants.createUser1)
        .expect(200);
      
      expect(responseWithQueryTruePublish.body).toStrictEqual({
        pagesCount: 1,
        page: 1,
        pageSize: 10,
        totalCount: 1,
        items: [
          {
            body: updateQuestion.body,
            correctAnswers: updateQuestion.correctAnswers,
            createdAt: expect.any(String),
            id: expect.any(String),
            published: true,
            updatedAt: expect.any(String),
          },
        ]
      })

      const responseWithQueryFalsePublish = await request(server).get('/sa/quiz/questions?publishedStatus=notPublished')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(constants.createUser1)
        .expect(200);
      
      expect(responseWithQueryFalsePublish.body.items[0].published).toStrictEqual(false)

    });

    it('should delete one question', async () => {
      await request(server).delete(`/sa/quiz/questions/${questionId}`)
        .expect(401);

      await request(server).delete(`/sa/quiz/questions/${incorrectAnyUUID}`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .expect(404);
      
      await request(server).delete(`/sa/quiz/questions/${questionId}`)
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .expect(204);

      const response = await request(server).get('/sa/quiz/questions')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(constants.createUser1)
      
      expect(response.body.items.length).toBe(1)
    });

  });
});
