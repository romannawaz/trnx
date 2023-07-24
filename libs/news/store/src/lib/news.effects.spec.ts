import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { cold, hot } from 'jasmine-marbles';

import { NewsService } from '@trnx/news/api/service';
import { NewsEffects } from './news.effects';
import { NEWS_FEATURE_KEY, newsInitialState } from './news.reducer';
import { NewsActions } from './news.actions';
import {
  ENTITY_STUB,
  NEWS_ARRAY_STUB,
  NEWS_ERROR_STUB,
  NEWS_STUB,
  NEW_NEWS_STUB,
  UPDATE_NEWS_STUB,
} from './news.stub';

describe('[NewsEffects]', () => {
  let actions$: Observable<Actions>;
  let effects: NewsEffects;
  let newsService: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NewsEffects,
        provideMockActions(() => actions$),
        provideMockStore({
          initialState: { [NEWS_FEATURE_KEY]: newsInitialState },
        }),
        {
          provide: NewsService,
          useValue: {} as Partial<NewsService>,
        },
      ],
    });

    effects = TestBed.inject(NewsEffects);
    newsService = TestBed.inject(NewsService);
  });

  it('should create', () => {
    expect(effects).toBeDefined();
  });

  describe('loadNews$', () => {
    it('should return loadNewsSuccess', () => {
      const action = NewsActions.loadNews();
      const completion = NewsActions.loadNewsSuccess({
        payload: NEWS_ARRAY_STUB,
      });

      actions$ = hot('-a-|', { a: action });
      const response = cold('-a-|', { a: NEWS_ARRAY_STUB });
      newsService.getAll = jest.fn(() => response);
      const expected = cold('--a-|', { a: completion });

      expect(effects.loadNews$).toBeObservable(expected);
    });

    it('should return loadNewsFailure', () => {
      const action = NewsActions.loadNews();
      const completion = NewsActions.loadNewsFailure({
        payload: NEWS_ERROR_STUB,
      });

      actions$ = hot('-a-|', { a: action });
      const response = cold('-#|', {}, NEWS_ERROR_STUB);
      const expected = cold('--a|', { a: completion });
      newsService.getAll = jest.fn(() => response);

      expect(effects.loadNews$).toBeObservable(expected);
    });
  });

  describe('addNews$', () => {
    it('should return addNewsSuccess', () => {
      const action = NewsActions.addNews({ payload: NEW_NEWS_STUB });
      const completion = NewsActions.addNewsSuccess({ payload: NEWS_STUB });

      actions$ = hot('-a-|', { a: action });
      const response = cold('-a-|', { a: NEWS_STUB });
      newsService.create = jest.fn(() => response);
      const expected = cold('--a-|', { a: completion });

      expect(effects.addNews$).toBeObservable(expected);
    });

    it('should return addNewsFailure', () => {
      const action = NewsActions.addNews({ payload: NEW_NEWS_STUB });
      const completion = NewsActions.addNewsFailure({
        payload: NEWS_ERROR_STUB,
      });

      actions$ = hot('-a-|', { a: action });
      const response = cold('-#|', {}, NEWS_ERROR_STUB);
      newsService.create = jest.fn(() => response);
      const expected = cold('--a|', { a: completion });

      expect(effects.addNews$).toBeObservable(expected);
    });
  });

  describe('updateNews$', () => {
    it('should return updateNewsSuccess', () => {
      const action = NewsActions.updateNews({ payload: UPDATE_NEWS_STUB });
      const completion = NewsActions.updateNewsSuccess({ payload: NEWS_STUB });

      actions$ = hot('-a-|', { a: action });
      const response = cold('-a-|', { a: NEWS_STUB });
      newsService.update = jest.fn(() => response);
      const expected = cold('--a-|', { a: completion });

      expect(effects.updateNews$).toBeObservable(expected);
    });

    it('should return updateNewsFailure', () => {
      const action = NewsActions.updateNews({ payload: UPDATE_NEWS_STUB });
      const payload = {
        ...NEWS_ERROR_STUB,
        _id: NEWS_STUB._id,
      };
      const completion = NewsActions.updateNewsFailure({ payload });

      actions$ = hot('-a-|', { a: action });
      const response = cold('-#|', {}, payload);
      newsService.update = jest.fn(() => response);
      const expected = cold('--a|', { a: completion });

      expect(effects.updateNews$).toBeObservable(expected);
    });
  });

  describe('removeNews$', () => {
    it('should return removeNewsSuccess', () => {
      const action = NewsActions.removeNews({ payload: ENTITY_STUB });
      const completion = NewsActions.removeNewsSuccess({
        payload: ENTITY_STUB,
      });

      actions$ = hot('-a-|', { a: action });
      const response = cold('-a-|', { a: ENTITY_STUB });
      newsService.remove = jest.fn(() => response);
      const expected = cold('--a-|', { a: completion });

      expect(effects.removeNews$).toBeObservable(expected);
    });

    it('should retrun removeNewsFailure', () => {
      const action = NewsActions.removeNews({ payload: ENTITY_STUB });
      const payload = {
        ...NEWS_ERROR_STUB,
        _id: NEWS_STUB._id,
      };
      const completion = NewsActions.removeNewsFailure({ payload });

      actions$ = hot('-a-|', { a: action });
      const response = cold('-#|', {}, payload);
      newsService.remove = jest.fn(() => response);
      const expected = cold('--a|', { a: completion });

      expect(effects.removeNews$).toBeObservable(expected);
    });
  });
});
