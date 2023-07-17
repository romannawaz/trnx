import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { newsStub } from '@trnx/news/common';
import { News } from './schemas/news.schema';
import { NewsService } from './news.service';
import { UpdateNewsDto } from './dto/update-news.dto';

class MockNewsModel {
  findById = jest.fn();
  find = jest.fn();
  create = jest.fn();
  findByIdAndUpdate = jest.fn();
  findByIdAndRemove = jest.fn();
}

describe('NewsService', () => {
  let service: NewsService;
  let newsModel: Model<News>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: getModelToken(News.name),
          useClass: MockNewsModel,
        },
      ],
    }).compile();

    service = module.get<NewsService>(NewsService);
    newsModel = module.get<Model<News>>(getModelToken(News.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a news item by id', async () => {
      const id = 'news_id';
      const expectedNews: News = newsStub;
      jest.spyOn(newsModel, 'findById').mockResolvedValue(expectedNews);

      const result = await service.findOne(id);

      expect(result).toBe(expectedNews);
      expect(newsModel.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('findAll', () => {
    it('should return a news array', async () => {
      const expectedNews = [newsStub];

      jest.spyOn(newsModel, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValue(expectedNews),
      } as never);

      const result = await service.findAll();

      expect(result).toBe(expectedNews);
      expect(newsModel.find).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update a news item', async () => {
      const id = 'news_id';
      const updateNewsDto: Partial<UpdateNewsDto> = {
        title: 'newTitle',
      };
      const expectedNews: News = newsStub;
      jest
        .spyOn(newsModel, 'findByIdAndUpdate')
        .mockResolvedValue(expectedNews);

      const result = await service.update(id, updateNewsDto);

      expect(result).toBe(expectedNews);
      expect(newsModel.findByIdAndUpdate).toHaveBeenCalledWith(
        id,
        updateNewsDto
      );
    });
  });

  describe('remove', () => {
    it('should remove a news item by ID', async () => {
      const id = 'news_id';
      const expectedNews: News = newsStub;
      jest
        .spyOn(newsModel, 'findByIdAndRemove')
        .mockResolvedValue(expectedNews);

      const result = await service.remove(id);

      expect(result).toBe(expectedNews);
      expect(newsModel.findByIdAndRemove).toHaveBeenCalledWith(id);
    });
  });
});
