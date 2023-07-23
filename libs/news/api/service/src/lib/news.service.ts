import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { ApiService } from '@trnx/core/api/service';
import { CreateNews, INews, NewsEntity, UpdateNews } from '@trnx/news/common';

export const castToNewsEntity = (news: INews): NewsEntity => ({
  ...news,
  newsRemoveRun: false,
  newsRemoveError: null,
  newsChangeRun: false,
  newsChangeError: null,
});

@Injectable()
export class NewsService {
  private readonly _startUrl = '/api/news';

  constructor(private readonly apiService: ApiService) {}

  getAll(): Observable<NewsEntity[]> {
    return this.apiService
      .get<INews[]>(this.apiService.makeUrl(`${this._startUrl}/all`))
      .pipe(map((news) => news.map(castToNewsEntity)));
  }

  getById(id: string): Observable<NewsEntity> {
    return this.apiService
      .get<INews>(this.apiService.makeUrl(`${this._startUrl}/${id}`))
      .pipe(map(castToNewsEntity));
  }

  create(news: CreateNews): Observable<NewsEntity> {
    return this.apiService
      .post<INews>(this.apiService.makeUrl(`${this._startUrl}/create`), news)
      .pipe(map(castToNewsEntity));
  }

  update(id: string, changes: UpdateNews): Observable<NewsEntity> {
    return this.apiService
      .patch<INews>(
        this.apiService.makeUrl(`${this._startUrl}/update/${id}`),
        changes
      )
      .pipe(map(castToNewsEntity));
  }

  viewed(id: string): Observable<NewsEntity> {
    return this.apiService
      .patch<INews>(
        this.apiService.makeUrl(`${this._startUrl}/viewed/${id}`),
        null
      )
      .pipe(map(castToNewsEntity));
  }

  remove(id: string): Observable<NewsEntity> {
    return this.apiService
      .delete<INews>(this.apiService.makeUrl(`${this._startUrl}/remove/${id}`))
      .pipe(map(castToNewsEntity));
  }
}
