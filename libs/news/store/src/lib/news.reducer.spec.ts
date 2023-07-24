import { createState, createEntityState } from '@trnx/core/store/utils';

import { NewsEntity } from '@trnx/news/common';
import { NewsReducer, NewsState, newsInitialState } from './news.reducer';
import {
  ENTITY_STUB,
  NEWS_ARRAY_STUB,
  NEWS_ERROR_STUB,
  NEWS_STUB,
  UPDATE_NEWS_STUB,
} from './news.stub';
import { NewsActions } from './news.actions';

describe('[NewsReducer]', () => {
  const getState = (payload?: Partial<NewsState>): NewsState =>
    createState(newsInitialState, payload);

  describe('Load', () => {
    it('loadNews() should clear newsLoadError and set newsLoadRun to true', () => {
      const state = getState({
        newsLoadError: NEWS_ERROR_STUB,
        newsLoadRun: false,
      });
      const action = NewsActions.loadNews;
      const result = NewsReducer(state, action);

      expect(result.newsLoadError).toBeNull();
      expect(result.newsLoadRun).toBeTruthy();
    });

    it('loadNewsSuccess() should set news and set newsLoadRun to false', () => {
      const state = getState({ newsLoadRun: true });
      const action = NewsActions.loadNewsSuccess({
        payload: NEWS_ARRAY_STUB,
      });
      const result = NewsReducer(state, action);

      expect(Object.keys(result.entities).length).toBe(NEWS_ARRAY_STUB.length);
      expect(result.newsLoadRun).toBeFalsy();
    });

    it('loadNewsFailure() should set newsLoadError and newsLoadRun to false', () => {
      const state = getState({ newsLoadRun: true });
      const action = NewsActions.loadNewsFailure({ payload: NEWS_ERROR_STUB });
      const result = NewsReducer(state, action);

      expect(result.newsLoadError).toEqual(NEWS_ERROR_STUB);
      expect(result.newsLoadRun).toBeFalsy();
    });
  });

  describe('Add', () => {
    it('addNews() should clear newsCreateError and set newsCreateRun to true', () => {
      const state = getState({
        newsCreateError: NEWS_STUB,
        newsCreateRun: false,
      });
      const action = NewsActions.addNews;
      const result = NewsReducer(state, action);

      expect(result.newsCreateError).toBeNull();
      expect(result.newsCreateRun).toBeTruthy();
    });

    it('addNewsSuccess() should add news and set newsCreateRun to false', () => {
      const state = getState({
        newsCreateRun: true,
        ...createEntityState(NEWS_ARRAY_STUB),
      });
      const action = NewsActions.addNewsSuccess({ payload: NEWS_STUB });
      const result = NewsReducer(state, action);

      expect(Object.keys(result.entities).length).toBe(NEWS_ARRAY_STUB.length);
      expect(result.newsCreateRun).toBeFalsy();
    });

    it('addNewsFailure() should set newsCreateError and newsCreateRun to false', () => {
      const state = getState({ newsCreateRun: true });
      const action = NewsActions.addNewsFailure({ payload: NEWS_ERROR_STUB });
      const result = NewsReducer(state, action);

      expect(result.newsCreateError).toBe(NEWS_ERROR_STUB);
      expect(result.newsCreateRun).toBeFalsy();
    });
  });

  describe('Update', () => {
    it('updateNews() should set entity newsChangeRun to true', () => {
      const state = getState({ ...createEntityState(NEWS_ARRAY_STUB) });
      const action = NewsActions.updateNews({ payload: UPDATE_NEWS_STUB });
      const result = NewsReducer(state, action);
      const entity = result.entities[NEWS_STUB._id] as NewsEntity;

      expect(entity.newsChangeRun).toBeTruthy();
    });

    it('updateNewsSuccess() should set entity newsChangeRun to false and clear newsChangeError', () => {
      const state = getState({ ...createEntityState(NEWS_ARRAY_STUB) });
      const action = NewsActions.updateNewsSuccess({
        payload: NEWS_STUB,
      });
      const result = NewsReducer(state, action);
      const entity = result.entities[NEWS_STUB._id] as NewsEntity;

      expect(entity.newsChangeRun).toBeFalsy();
      expect(entity.newsChangeError).toBeNull();
    });

    it('updateNewsSuccess() should set entity newsChangeRun to false and set newsChangeError', () => {
      const state = getState({ ...createEntityState(NEWS_ARRAY_STUB) });
      const payload = {
        ...NEWS_ERROR_STUB,
        ...ENTITY_STUB,
      };
      const action = NewsActions.updateNewsFailure({ payload });
      const result = NewsReducer(state, action);
      const entity = result.entities[NEWS_STUB._id] as NewsEntity;

      expect(entity.newsChangeRun).toBeFalsy();
      expect(entity.newsChangeError).toBe(payload);
    });
  });

  describe('Remove', () => {
    it('removeNews() should set entity newsRemoveRun to true', () => {
      const state = getState({ ...createEntityState(NEWS_ARRAY_STUB) });
      const action = NewsActions.removeNews({ payload: ENTITY_STUB });
      const result = NewsReducer(state, action);
      const entity = result.entities[NEWS_STUB._id] as NewsEntity;

      expect(entity.newsRemoveRun).toBeTruthy();
    });

    it('removeNewsSuccess() should remove a news', () => {
      const state = getState({ ...createEntityState(NEWS_ARRAY_STUB) });
      const action = NewsActions.removeNewsSuccess({ payload: ENTITY_STUB });
      const result = NewsReducer(state, action);

      expect(Object.keys(result.entities).length).toBe(
        NEWS_ARRAY_STUB.length - 1
      );
    });

    it('removeNewsFailure() should set entity newsRemoveError and newsRemoveRun to false', () => {
      const state = getState({ ...createEntityState(NEWS_ARRAY_STUB) });
      const payload = {
        ...NEWS_ERROR_STUB,
        ...ENTITY_STUB,
      };
      const action = NewsActions.removeNewsFailure({ payload });
      const result = NewsReducer(state, action);
      const entity = result.entities[NEWS_STUB._id] as NewsEntity;

      expect(entity.newsRemoveRun).toBeFalsy();
      expect(entity.newsRemoveError).toBe(payload);
    });
  });
});
