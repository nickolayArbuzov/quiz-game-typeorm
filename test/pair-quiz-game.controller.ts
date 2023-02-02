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

    const question = {
      body: 'how are you?',
      answers: ['thanks, fine', 'it norm, how are you?']
    }

    const updateQuestion = {
      body: 'hi, how are you?',
      answers: ['its ok', 'it norm, how are you?']
    }

    let questionId = ''
    const incorrectAnyUUID = 'b252c185-7777-4444-7777-8b6f242a2ff8'

    it('should delete all data', async () => {
      await request(server).delete('/testing/all-data').expect(204)
    })

    it('should create new question', async () => {
      const response = await request(server).post('/sa/quiz/questions')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(question)
        .expect(201);
      await request(server).post('/sa/quiz/questions').set('Authorization', 'Basic YWRtaW46cXdlcnR5').send(question)
      await request(server).post('/sa/quiz/questions').set('Authorization', 'Basic YWRtaW46cXdlcnR5').expect(400)

      questionId = response.body.id
      
      expect(response.body).toStrictEqual({
        "id": expect.any(String),
        "body": question.body,
        "correctAnswers": question.answers,
        "published": false,
        "createdAt": expect.any(String),
        "updatedAt": expect.any(String),
      });

    });

    it('should return all questions', async () => {
      const response = await request(server).get('/sa/quiz/questions')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
        .send(constants.createUser1)
        .expect(201);

      expect(response.body.items.length).toBe(2);

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
    });

  });
});
