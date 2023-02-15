import { BadRequestException, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { HttpExceptionFilter } from '../src/helpers/filters/http-exeption.filter';
import { AppModule } from '../src/app.module'
import * as constants from './constants';
import {createAppandServerForTests} from './app'

jest.setTimeout(60000)
describe('AppController', () => {
  let app: INestApplication
  let server: any
  
  beforeAll(async () => {
    app = await createAppandServerForTests()
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
        "updatedAt": null,
      });

    });

    /*
      юзеры регистрируются, вопросы создаются, публикуются, юзеры присоединяются к игре
      юзеры отправляют ответы
      
    */

  });
});
