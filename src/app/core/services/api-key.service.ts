import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Store} from "@ngxs/store";
import {ApiKeyState} from "../stores/state/api-key.state";

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  private apiKey: string = '';
  private apiKeyFilePath: string = '/pexels-api-key.txt';

  constructor(private http: HttpClient) { }

private store = inject(Store)

  getApiKey() {
    if (this.apiKey) {
      return of(this.apiKey);
    } else {
      return this.http.get(this.apiKeyFilePath, { responseType: 'text' }).pipe(
        map((key: string) => {
          this.apiKey = key;
          return this.apiKey;
        }),
        catchError(() => of(null))
      );
    }
  }

  saveToFileSystem(content: string) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pexels-api-key.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  saveApiKey() {
    const apiKey = this.store.selectSnapshot(ApiKeyState.getApiKey)
    this.saveToFileSystem(apiKey);
  }
}
