import { createActionGroup, emptyProps } from '@ngrx/store';

import { Entity } from '@trnx/core/common';
import { payload } from '@trnx/core/store/utils';
import { CreateNews, NewsEntity, UpdateNews } from '@trnx/news/common';

export const NewsActions = createActionGroup({
  source: 'News',
  events: {
    'Load News': emptyProps(),
    'Load News Cancel': emptyProps(),
    'Load News Success': payload<NewsEntity[]>(),
    'Load News Failure': payload<Record<string, any>>(),

    'Add News': payload<CreateNews>(),
    'Add News Cancel': emptyProps(),
    'Add News Success': payload<NewsEntity>(),
    'Add News Failure': payload<Record<string, any>>(),

    'Update News': payload<UpdateNews>(),
    'Update News Cancel': emptyProps(),
    'Update News Success': payload<NewsEntity>(),
    'Update News Failure': payload<Record<string, any> & Entity>(),

    'Remove News': payload<Entity>(),
    'Remove News Cancel': emptyProps(),
    'Remove News Success': payload<Entity>(),
    'Remove News Failure': payload<Record<string, any> & Entity>(),
  },
});
