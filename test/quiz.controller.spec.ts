import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
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

    it('should delete all data', async () => {
      await request(server).delete('/testing/all-data').expect(204)
    })

    it('should create data', async () => {

      // create and login users, get accessTokens
      for await (const user of constants.createUsers){
        await request(server).post('/sa/users')
          .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
          .send(user)

        let accessToken = await request(server).post('/auth/login')
          .send({loginOrEmail: user.login, password: user.password})
        constants.variables.setAccessTokens(accessToken.body.accessToken)
      }
      expect(constants.variables.accessTokens.length).toStrictEqual(constants.createUsers.length)
      
      // create questions
      for await (const question of constants.quizQuestions){
        let createquestion = await request(server).post('/sa/quiz/questions')
          .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
          .send(question)
        constants.variables.setQuestionsId(createquestion.body.id)
      }
      expect(constants.variables.questionsId.length).toStrictEqual(constants.quizQuestions.length)

      // publish questions
      for await (const id of constants.variables.questionsId){
        await request(server).put(`/sa/quiz/questions/${id}/publish`)
          .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
          .send({published: true})
      }

      const res = await request(server).get('/sa/quiz/questions')
        .set('Authorization', 'Basic YWRtaW46cXdlcnR5')

      expect(res.body.items.filter(q => q.published === true).length).toStrictEqual(constants.quizQuestions.length)

    });

    /*
      юзеры регистрируются, вопросы создаются, публикуются, юзеры присоединяются к игре
      юзеры отправляют ответы
      
    */

  });
});
