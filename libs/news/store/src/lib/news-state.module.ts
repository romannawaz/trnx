import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { NewsService } from '@trnx/news/api/service';

import { NEWS_FEATURE_KEY, NewsReducer } from './news.reducer';
import { NewsEffects } from './news.effects';
import { NewsFacade } from './news.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(NEWS_FEATURE_KEY, NewsReducer),
    EffectsModule.forFeature([NewsEffects]),
  ],
  providers: [NewsService, NewsFacade],
})
export class NewsStateModule {}
