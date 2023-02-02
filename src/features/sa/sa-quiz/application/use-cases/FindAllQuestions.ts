import { QueryHandler } from '@nestjs/cqrs';
import { queryDefault } from '../../../../../helpers/constants/constants/constants';
import { QueryAnswersDto } from '../../../../../helpers/constants/commonDTO/query.dto';
import { SAquizRepo } from '../../infrastructure/sa-quiz.repo';

export class FindAllQuestionsQuery {
  constructor(
    public query: QueryAnswersDto,
  ) {}
}

@QueryHandler(FindAllQuestionsQuery)
export class FindAllQuestionsUseCase {
  constructor(
    private sAquizRepo: SAquizRepo,
  ) {}

  async execute(query: FindAllQuestionsQuery){
    const queryParams = {
      pageNumber: query.query.pageNumber || queryDefault.pageNumber,
      pageSize: query.query.pageSize || queryDefault.pageSize,
      sortBy: query.query.sortBy || queryDefault.sortBy,
      sortDirection: query.query.sortDirection === 'asc' ? query.query.sortDirection : queryDefault.sortDirection,
      bodySearchTerm: query.query.bodySearchTerm || '',
      publishedStatus: query.query.publishedStatus || "all"
    }
    return await this.sAquizRepo.findAllQuestions(queryParams)
  }
}