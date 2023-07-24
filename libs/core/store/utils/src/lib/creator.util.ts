import { Dictionary, EntityState } from '@ngrx/entity';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { Entity } from '@trnx/core/common';

export function createStore<S = Record<string, any>, P = Record<string, any>>(
  key: string,
  initialState: S,
  params: Partial<S> = {}
): P {
  return {
    [key]: { ...initialState, ...params },
  } as any;
}

export function createState<S = Record<string, any>>(
  initialState: S,
  params: Partial<S> = {}
): S {
  return { ...initialState, ...params };
}

export function createEntityState<S extends Entity = any>(
  data: S[]
): EntityState<S> {
  const ids: number[] = [];
  const entities: Dictionary<S> = {};

  for (const item of data) {
    ids.push(Number(item._id));
    entities[item._id] = item;
  }

  return {
    ids,
    entities,
  };
}

export function setMockStore<S = Record<string, any>>(
  store: Store,
  key: string,
  initialState: S,
  params: Partial<S> = {}
): void {
  (store as MockStore).setState(createStore(key, initialState, params));
}
