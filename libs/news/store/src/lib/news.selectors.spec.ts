import { createEntityState, createStore } from '@trnx/core/store/utils';

import { News } from '@trnx/news/common';
import { NEWS_FEATURE_KEY, NewsState, newsInitialState } from './news.reducer';
import * as NewsSelectors from './news.selectors';
import { NEWS_ARRAY_STUB, NEWS_ERROR_STUB, NEWS_STUB } from './news.stub';

describe('[NewsSelectors]', () => {
  const getState = (payload: Partial<NewsState>): NewsState =>
    createStore(NEWS_FEATURE_KEY, newsInitialState, payload);

  it('selectNews', () => {
    const state = getState({ ...createEntityState(NEWS_ARRAY_STUB) });
    const result = NewsSelectors.selectNews(state);

    expect(result.length).toBe(NEWS_ARRAY_STUB.length);
  });

  it('selectNewsEntities', () => {
    const expectedEntityResult: Record<string, News> = {
      [NEWS_STUB._id]: NEWS_STUB,
    };
    const state = getState({ ...createEntityState([NEWS_STUB]) });
    const result = NewsSelectors.selectNewsEntities(state);

    expect(result).toEqual(expectedEntityResult);
  });

  it('selectNewsLoadRun', () => {
    const state = getState({ newsLoadRun: true });
    const result = NewsSelectors.selectNewsLoadRun(state);

    expect(result).toBeTruthy();
  });

  it('selectNewsLoadError', () => {
    const state = getState({ newsLoadError: NEWS_ERROR_STUB });
    const result = NewsSelectors.selectNewsLoadError(state);

    expect(result).toBe(NEWS_ERROR_STUB);
  });

  it('selectNewsCreateRun', () => {
    const state = getState({ newsCreateRun: true });
    const result = NewsSelectors.selectNewsCreateRun(state);

    expect(result).toBeTruthy();
  });

  it('selectNewsCreateError', () => {
    const state = getState({ newsCreateError: NEWS_ERROR_STUB });
    const result = NewsSelectors.selectNewsCreateError(state);

    expect(result).toBe(NEWS_ERROR_STUB);
  });
});
