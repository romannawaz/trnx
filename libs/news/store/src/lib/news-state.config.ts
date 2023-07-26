import {
  EnvironmentProviders,
  Provider,
  importProvidersFrom,
} from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { NewsService } from '@trnx/news/api/service';

import { NEWS_FEATURE_KEY, NewsReducer } from './news.reducer';
import { NewsEffects } from './news.effects';
import { NewsFacade } from './news.facade';

export const NewsStateConfig: Array<Provider | EnvironmentProviders> = [
  NewsService,
  NewsFacade,
  importProvidersFrom([
    StoreModule.forFeature(NEWS_FEATURE_KEY, NewsReducer),
    EffectsModule.forFeature([NewsEffects]),
  ]),
];
