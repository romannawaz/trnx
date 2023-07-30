import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { firstValueFrom, of } from 'rxjs';

import { NewsService } from '@trnx/news/api/service';
import { NEWS_ARRAY_STUB, NEWS_STUB } from '@trnx/news/common';
import { NewsEffects } from './news.effects';
import { NewsFacade } from './news.facade';
import { NEWS_FEATURE_KEY, NewsReducer } from './news.reducer';

describe('[NewsFacade]', () => {
  let facade: NewsFacade;

  beforeEach(() => {
    @NgModule({
      imports: [
        StoreModule.forFeature(NEWS_FEATURE_KEY, NewsReducer),
        EffectsModule.forFeature([NewsEffects]),
      ],
      providers: [
        NewsFacade,
        {
          provide: NewsService,
          useValue: {
            getAll: jest.fn(() => of(NEWS_ARRAY_STUB)),
            create: jest.fn(() => of(NEWS_STUB)),
          } as Partial<NewsService>,
        },
      ],
    })
    class FeatureModule {}

    @NgModule({
      imports: [StoreModule.forRoot(), EffectsModule.forRoot(), FeatureModule],
    })
    class RootModule {}

    TestBed.configureTestingModule({ imports: [RootModule] });

    facade = TestBed.inject(NewsFacade);
  });

  it('loadNews()', (done: jest.DoneCallback) => {
    try {
      facade.loadNews();

      const news = firstValueFrom(facade.news$);

      news.then((news) => {
        expect(news.length).toBe(NEWS_ARRAY_STUB.length);
      });

      done();
    } catch (error) {
      done.fail(error as string);
    }
  });
});
