import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IsString } from 'class-validator';

import { NewsService } from './news.service';
import { News } from './schemas/news.schema';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

export class FindOneParams {
  @IsString()
  id: string;
}

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('all')
  async getAll(): Promise<News[]> {
    return this.newsService.findAll();
  }

  @Get('/:id')
  async getOne(@Param() { id }: FindOneParams): Promise<News> {
    const news = await this.newsService.findOne(id);
    if (!news) throw new NotFoundException();

    return news;
  }

  @Post('create')
  async create(@Body() createNewsDto: CreateNewsDto): Promise<News> {
    return this.newsService.create(createNewsDto);
  }

  @Patch('update/:id')
  async update(@Body() updateNewsDto: Partial<UpdateNewsDto>): Promise<News> {
    const news = await this.newsService.update(updateNewsDto);
    if (!news) throw new NotFoundException();

    return news;
  }

  @Patch('viewed/:id')
  async viewed(@Param() { id }: FindOneParams): Promise<News> {
    const news = await this.newsService.increaseViews(id);
    if (!news) throw new NotFoundException();

    return news;
  }

  @Delete('remove/:id')
  async remove(@Param() { id }: FindOneParams): Promise<News> {
    const news = await this.newsService.remove(id);
    if (!news) throw new NotFoundException();

    return news;
  }
}
