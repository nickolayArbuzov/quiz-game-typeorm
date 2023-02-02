import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class AllDataService {
  constructor(
    @InjectDataSource() private readonly db: DataSource,
  ) {}

  async deleteAllData(): Promise<void> {
    await this.db.query(`
      delete from "bloggerUser";
      delete from blogs;
      delete from comments;
      delete from devices;
      delete from likes;
      delete from posts;
      delete from users;
    `);
  }
  
}