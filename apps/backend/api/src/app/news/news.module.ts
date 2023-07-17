import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { News, NewsSchema } from './schemas/news.schema';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: News.name, schema: NewsSchema }]),
  ],
  providers: [NewsService],
  exports: [NewsService],
  controllers: [NewsController],
})
export class NewsModule {}
