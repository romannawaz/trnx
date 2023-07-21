import { ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';

import { ContentTypeInterceptor } from '@trnx/core/api/interceptors/content-type';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ContentTypeInterceptor,
      multi: true,
    },
  ],
};
