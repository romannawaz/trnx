import { Injectable } from '@angular/core';
import { Action, Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { Observable, map } from 'rxjs';

import { Entity } from '@trnx/core/common';
import { CreateNews, NewsEntity, UpdateNews } from '@trnx/news/common';
import { NewsState } from './news.reducer';
import * as NewsSelectors from './news.selectors';
import { NewsActions } from './news.actions';

@Injectable()
export class NewsFacade {
  news$ = this.store.pipe(select(NewsSelectors.selectNews));
  newsEntities$ = this.store.pipe(select(NewsSelectors.selectNewsEntities));

  newsLoadRun$ = this.store.pipe(select(NewsSelectors.selectNewsLoadRun));
  newsLoadError$ = this.store.pipe(select(NewsSelectors.selectNewsLoadError));

  newsCreateRun$ = this.store.pipe(select(NewsSelectors.selectNewsCreateRun));
  newsCreateError$ = this.store.pipe(
    select(NewsSelectors.selectNewsCreateError)
  );

  newsAdded$: Observable<NewsEntity> = this.actions.pipe(
    ofType(NewsActions.addNewsSuccess),
    map(({ payload }) => payload)
  );

  newsUpdated$: Observable<NewsEntity> = this.actions.pipe(
    ofType(NewsActions.updateNewsSuccess),
    map(({ payload }) => payload)
  );

  constructor(
    private readonly actions: Actions,
    private readonly store: Store<NewsState>
  ) {}

  loadNews(): void {
    this._dispatch(NewsActions.loadNews());
  }

  addNews(createNews: CreateNews): void {
    this._dispatch(NewsActions.addNews({ payload: createNews }));
  }

  updateNews(updateNews: UpdateNews): void {
    this._dispatch(NewsActions.updateNews({ payload: updateNews }));
  }

  removeNews(entity: Entity): void {
    this._dispatch(NewsActions.removeNews({ payload: entity }));
  }

  private _dispatch(action: Action): void {
    this.store.dispatch(action);
  }
}
