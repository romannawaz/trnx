import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateNewsDto } from './dto/create-news.dto';
import { News } from './schemas/news.schema';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectModel(News.name)
    private readonly newsModel: Model<News>
  ) {}

  async findOne(id: string): Promise<News> {
    return await this.newsModel.findById(id);
  }

  async findAll(): Promise<News[]> {
    return this.newsModel.find().exec();
  }

  async create(createNewsDto: CreateNewsDto): Promise<News> {
    const newNews = await this.newsModel.create(createNewsDto);

    return newNews.save();
  }

  async update(updatedNewsDto: Partial<UpdateNewsDto>): Promise<News> {
    return this.newsModel.findByIdAndUpdate(updatedNewsDto._id, updatedNewsDto);
  }

  async increaseViews(id: string): Promise<News> {
    const news = await this.newsModel.findById(id).exec();
    news.views += 1;

    return news.save();
  }

  async remove(id: string): Promise<News> {
    return this.newsModel.findByIdAndRemove(id);
  }
}
