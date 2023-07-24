import { createFeatureSelector, createSelector } from '@ngrx/store';

import { NEWS_FEATURE_KEY, NewsState, newsAdapter } from './news.reducer';

export const selectNewsState =
  createFeatureSelector<NewsState>(NEWS_FEATURE_KEY);

const { selectAll, selectEntities } = newsAdapter.getSelectors();

export const selectNews = createSelector(selectNewsState, (state) =>
  selectAll(state)
);

export const selectNewsEntities = createSelector(selectNewsState, (state) =>
  selectEntities(state)
);

export const selectNewsLoadRun = createSelector(
  selectNewsState,
  (state) => state.newsLoadRun
);

export const selectNewsLoadError = createSelector(
  selectNewsState,
  (state) => state.newsLoadError
);

export const selectNewsCreateRun = createSelector(
  selectNewsState,
  (state) => state.newsCreateRun
);

export const selectNewsCreateError = createSelector(
  selectNewsState,
  (state) => state.newsCreateError
);
