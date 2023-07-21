import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { ConfigService } from '@trnx/core/config/service';
import { ApiRequestOptions } from './api.interface';

/**
 * Sets the headers, if any, and sorts the query parameters.
 * Sorting is necessary for correct testing, since if you do not force sorting of the parameters, then the urls may not match.
 */
export function getApiRequestOptions(
  options?: Partial<ApiRequestOptions>
): Partial<ApiRequestOptions> | undefined {
  if (!options) return;

  let headers = new HttpHeaders();
  let params = new HttpParams();

  if (options.headers) {
    headers = !(options?.headers instanceof HttpHeaders)
      ? new HttpHeaders(options.headers)
      : options.headers;
  }

  if (options.params) {
    params = new HttpParams();

    for (const propKey of Object.keys(options.params).sort()) {
      if (options.params[propKey] !== undefined) {
        if (Array.isArray(options.params[propKey])) {
          options.params[propKey].forEach((item: unknown) => {
            params = params.append(
              `${propKey}[]`,
              item == null ? 'NULL' : item.toString()
            );
          });
        } else {
          params = params.append(
            propKey,
            options.params[propKey] == null
              ? 'NULL'
              : options.params[propKey].toString()
          );
        }
      }
    }
  }

  return { ...options, params, headers };
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService
  ) {}

  makeUrl(url: string): string {
    return url.indexOf('http') === 0
      ? url
      : `${this.configService.getConfig().apiHost}${url}`;
  }

  get<T = void>(
    url: string,
    options?: Partial<ApiRequestOptions>
  ): Observable<T> {
    return this.httpClient
      .get<T>(this.makeUrl(url), getApiRequestOptions(options))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }

  post<T = void>(
    url: string,
    body?: unknown | null,
    options?: Partial<ApiRequestOptions>
  ): Observable<T> {
    return this.httpClient
      .post<T>(this.makeUrl(url), body ?? null, getApiRequestOptions(options))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }

  patch<T = void>(
    url: string,
    body: unknown | null,
    options?: Partial<ApiRequestOptions>
  ): Observable<T> {
    return this.httpClient
      .patch<T>(this.makeUrl(url), body, getApiRequestOptions(options))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }

  put<T = void>(
    url: string,
    body: unknown | null,
    options?: Partial<ApiRequestOptions>
  ): Observable<T> {
    return this.httpClient
      .put<T>(this.makeUrl(url), body, getApiRequestOptions(options))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }

  delete<T = void>(
    url: string,
    options?: Partial<ApiRequestOptions>
  ): Observable<T> {
    return this.httpClient
      .delete<T>(this.makeUrl(url), getApiRequestOptions(options))
      .pipe(catchError((error) => throwError(() => new Error(error))));
  }
}
