import { createReducer, on } from '@ngrx/store';
import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';

import { NewsEntity } from '@trnx/news/common';
import { NewsActions } from './news.actions';

export const NEWS_FEATURE_KEY = 'news';

export interface NewsState extends EntityState<NewsEntity> {
  newsLoadError: Record<string, any> | null;
  newsLoadRun: boolean;

  newsCreateError: Record<string, any> | null;
  newsCreateRun: boolean;
}

export interface NewsPartialState {
  readonly [NEWS_FEATURE_KEY]: NewsState;
}

export const selectNewsId = (news: NewsEntity) => news._id;

export const newsAdapter: EntityAdapter<NewsEntity> =
  createEntityAdapter<NewsEntity>({
    selectId: selectNewsId,
  });

export const newsInitialState: NewsState = newsAdapter.getInitialState({
  newsLoadError: null,
  newsLoadRun: false,

  newsCreateError: null,
  newsCreateRun: false,
});

export const NewsReducer = createReducer(
  newsInitialState,
  on(NewsActions.loadNews, (state) => ({
    ...state,
    newsLoadError: null,
    newsLoadRun: true,
  })),
  on(NewsActions.loadNewsSuccess, (state, { payload }) =>
    newsAdapter.addMany(payload, { ...state, newsLoadRun: false })
  ),
  on(NewsActions.loadNewsFailure, (state, { payload }) => ({
    ...state,
    newsLoadError: payload,
    newsLoadRun: false,
  })),
  on(NewsActions.addNews, (state) => ({
    ...state,
    newsCreateError: null,
    newsCreateRun: true,
  })),
  on(NewsActions.addNewsSuccess, (state, { payload }) =>
    newsAdapter.addOne(payload, { ...state, newsCreateRun: false })
  ),
  on(NewsActions.addNewsFailure, (state, { payload }) => ({
    ...state,
    newsCreateError: payload,
    newsCreateRun: false,
  })),
  on(NewsActions.updateNews, (state, { payload }) =>
    newsAdapter.updateOne(
      { id: payload._id, changes: { newsChangeRun: true } },
      state
    )
  ),
  on(NewsActions.updateNewsSuccess, (state, { payload }) =>
    newsAdapter.updateOne(
      {
        id: payload._id,
        changes: {
          ...payload,
          updatedAt: new Date(),
          newsChangeRun: false,
        },
      },
      state
    )
  ),
  on(NewsActions.updateNewsFailure, (state, { payload }) =>
    newsAdapter.updateOne(
      {
        id: payload._id,
        changes: {
          newsChangeError: payload,
          newsChangeRun: false,
        },
      },
      state
    )
  ),
  on(NewsActions.removeNews, (state, { payload }) =>
    newsAdapter.updateOne(
      {
        id: payload._id,
        changes: {
          newsRemoveRun: true,
        },
      },
      state
    )
  ),
  on(NewsActions.removeNewsSuccess, (state, { payload }) =>
    newsAdapter.removeOne(payload._id, {
      ...state,
      newRemoveRun: false,
    })
  ),
  on(NewsActions.removeNewsFailure, (state, { payload }) =>
    newsAdapter.updateOne(
      {
        id: payload._id,
        changes: {
          newsRemoveError: payload,
          newsRemoveRun: false,
        },
      },
      state
    )
  )
);
