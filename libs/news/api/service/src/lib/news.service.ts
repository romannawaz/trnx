import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@trnx/core/api/service';
import { CreateNews, INews, UpdateNews } from '@trnx/news/common';

@Injectable()
export class NewsService {
  private readonly _startUrl = '/api/news';

  constructor(private readonly apiService: ApiService) {}

  getAll(): Observable<INews[]> {
    return this.apiService.get<INews[]>(
      this.apiService.makeUrl(`${this._startUrl}/all`)
    );
  }

  getById(id: string): Observable<INews> {
    return this.apiService.get<INews>(
      this.apiService.makeUrl(`${this._startUrl}/${id}`)
    );
  }

  create(news: CreateNews): Observable<INews> {
    return this.apiService.post<INews>(
      this.apiService.makeUrl(`${this._startUrl}/create`),
      news
    );
  }

  update(id: string, changes: UpdateNews): Observable<INews> {
    return this.apiService.patch<INews>(
      this.apiService.makeUrl(`${this._startUrl}/update/${id}`),
      changes
    );
  }

  viewed(id: string): Observable<INews> {
    return this.apiService.patch<INews>(
      this.apiService.makeUrl(`${this._startUrl}/viewed/${id}`),
      null
    );
  }

  remove(id: string): Observable<INews> {
    return this.apiService.delete(
      this.apiService.makeUrl(`${this._startUrl}/remove/${id}`)
    );
  }
}
