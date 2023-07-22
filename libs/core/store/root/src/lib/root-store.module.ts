import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { rootInitialState, rootReducers } from './state/root.reducer';
import { RootRouterStateSerializer } from './services/root-router-state-serializer.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(rootReducers, {
      initialState: rootInitialState,
      metaReducers: [],
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      serializer: RootRouterStateSerializer,
    }),
  ],
})
export class RootStoreModule {}
