import { Injectable } from '@nestjs/common';
import { QueryBlogDto } from '../../../../helpers/constants/commonDTO/query.dto';
import { BanBlogInfo } from '../../../../shared/collections/Blog/blogger';
import { BlogsSQL } from './blogs.repositorySQL';

@Injectable()
export class BlogsRepo {
  constructor(private blogsRepo: BlogsSQL) {}

  async banOneBlogById(blogId: string, banInfo: BanBlogInfo){
    return await this.blogsRepo.banOneBlogById(blogId, banInfo)
  }

  async findAllBlogs(query: QueryBlogDto){
    return await this.blogsRepo.findAllBlogs(query)
  }
}