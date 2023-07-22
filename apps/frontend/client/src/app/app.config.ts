import { ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';

import { ContentTypeInterceptor } from '@trnx/core/api/interceptors/content-type';
import { WithCretendialsInterceptor } from '@trnx/core/api/interceptors/with-credentials';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentTypeInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WithCretendialsInterceptor,
      multi: true,
    },
  ],
};
