import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { NewsService } from '@trnx/news/api/service';
import { NewsActions } from './news.actions';

@Injectable()
export class NewsEffects {
  loadNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.loadNews),
      exhaustMap(() =>
        this.newsService.getAll().pipe(
          map((news) => NewsActions.loadNewsSuccess({ payload: news })),
          catchError((error) =>
            of(
              NewsActions.loadNewsFailure({
                payload: error,
              })
            )
          )
        )
      )
    )
  );

  addNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.addNews),
      exhaustMap(({ payload }) =>
        this.newsService.create(payload).pipe(
          map((news) => NewsActions.addNewsSuccess({ payload: news })),
          catchError((error) =>
            of(NewsActions.addNewsFailure({ payload: error }))
          )
        )
      )
    )
  );

  updateNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.updateNews),
      exhaustMap(({ payload }) =>
        this.newsService.update(payload._id, { ...payload }).pipe(
          map((news) => NewsActions.updateNewsSuccess({ payload: news })),
          catchError((error) =>
            of(NewsActions.updateNewsFailure({ payload: error }))
          )
        )
      )
    )
  );

  removeNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsActions.removeNews),
      exhaustMap(({ payload }) =>
        this.newsService.remove(payload._id).pipe(
          map((news) =>
            NewsActions.removeNewsSuccess({ payload: { _id: news._id } })
          ),
          catchError((error) =>
            of(NewsActions.removeNewsFailure({ payload: error }))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private newsService: NewsService
  ) {}
}
