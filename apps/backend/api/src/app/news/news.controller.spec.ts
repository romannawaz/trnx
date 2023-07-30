import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { INews, NEWS_ARRAY_STUB, NEWS_DTO_STUB } from '@trnx/news/common';

import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';

class MockNewsServive {
  findAll = jest.fn();
  findOne = jest.fn();
  create = jest.fn();
  update = jest.fn();
  increaseViews = jest.fn();
  remove = jest.fn();
}

describe('NewsController', () => {
  let controller: NewsController;
  let newsService: NewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useClass: MockNewsServive,
        },
      ],
    }).compile();

    controller = module.get<NewsController>(NewsController);
    newsService = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('[GET /] should return news array', async () => {
    jest.spyOn(newsService, 'findAll').mockResolvedValue(NEWS_ARRAY_STUB);

    expect(await controller.getAll()).toEqual(NEWS_ARRAY_STUB);
  });

  describe('[GET /:id] Get one', () => {
    it('should return a news item with the specified id', async () => {
      const result: INews = NEWS_DTO_STUB;

      jest.spyOn(newsService, 'findOne').mockResolvedValue(result);

      expect(await controller.getOne({ id: NEWS_DTO_STUB._id })).toEqual(
        result
      );
    });

    it('should throw NotFoundException when news item is not found', () => {
      jest.spyOn(newsService, 'findOne').mockResolvedValue(null);

      expect(controller.getOne({ id: NEWS_DTO_STUB._id })).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('[POST /create]', () => {
    it('should return new news', async () => {
      const { title, description }: CreateNewsDto = NEWS_DTO_STUB;

      jest.spyOn(newsService, 'create').mockResolvedValue(NEWS_DTO_STUB);

      expect(await controller.create({ title, description })).toEqual(
        NEWS_DTO_STUB
      );
    });
  });

  describe('[PATCH /update/:id]', () => {
    it('should return updated news', async () => {
      const updatedStub = Object.assign(NEWS_DTO_STUB, { title: 'newTitle' });

      jest.spyOn(newsService, 'update').mockResolvedValue(updatedStub);

      expect(
        await controller.update({ _id: NEWS_DTO_STUB._id, title: 'newTitle' })
      ).toEqual(updatedStub);
    });

    it('should throw NotFoundException when news item is not found', () => {
      jest.spyOn(newsService, 'update').mockResolvedValue(null);

      expect(
        controller.update({
          _id: NEWS_DTO_STUB._id,
          description: 'description',
        })
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('[PATCH /update/:id]', () => {
    it('should return updated news with increased views', async () => {
      const result = Object.assign(NEWS_DTO_STUB, {
        views: NEWS_DTO_STUB.views + 1,
      });

      jest.spyOn(newsService, 'increaseViews').mockResolvedValue(result);

      expect(await controller.viewed({ id: NEWS_DTO_STUB._id })).toEqual(
        result
      );
    });

    it('should throw NotFoundException when news item is not found', () => {
      jest.spyOn(newsService, 'increaseViews').mockResolvedValue(null);

      expect(controller.viewed({ id: NEWS_DTO_STUB._id })).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('[DELETE /remove/:id]', () => {
    it('should return removed news', async () => {
      const result = NEWS_DTO_STUB;

      jest.spyOn(newsService, 'remove').mockResolvedValue(result);

      expect(await controller.remove({ id: NEWS_DTO_STUB._id })).toEqual(
        result
      );
    });

    it('should throw NotFoundException when news item is not found', () => {
      jest.spyOn(newsService, 'remove').mockResolvedValue(null);

      expect(controller.remove({ id: NEWS_DTO_STUB._id })).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
