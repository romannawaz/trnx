import { Entity } from '@trnx/core/common';
import { CreateNews, INews, News, UpdateNews } from './news.interface';

export const NEWS_DTO_STUB: INews = {
  _id: '123',
  title: 'Awesome title',
  description: 'Such a great description',
  views: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const NEWS_STUB: News = {
  ...NEWS_DTO_STUB,
  newsRemoveRun: false,
  newsRemoveError: null,
  newsChangeRun: false,
  newsChangeError: null,
};

const NEWS_STUB_SECOND: News = {
  ...NEWS_STUB,
  _id: '456',
};

export const NEWS_ARRAY_STUB: News[] = [NEWS_STUB, NEWS_STUB_SECOND];

export const NEWS_ERROR_STUB: Record<string, any> = {
  code: 0,
  message: 'Failure load news',
};

export const ENTITY_STUB: Entity = {
  _id: NEWS_STUB._id,
};

export const NEW_NEWS_STUB: CreateNews = {
  title: NEWS_STUB.title,
  description: NEWS_STUB.description,
};

export const UPDATE_NEWS_STUB: UpdateNews = {
  _id: NEWS_STUB._id,
  title: NEWS_STUB.title,
  description: NEWS_STUB.description,
};
