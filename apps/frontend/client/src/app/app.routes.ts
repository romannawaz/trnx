import { Route } from '@angular/router';
import { UiLayoutComponent } from '@trnx/client/ui/layout';

export const appRoutes: Route[] = [
  { path: '', component: UiLayoutComponent, children: [], title: 'Trnx' },
];
