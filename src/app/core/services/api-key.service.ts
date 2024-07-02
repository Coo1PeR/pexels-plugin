import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {Store} from "@ngxs/store";
import {ApiKeyState} from "../stores/state/api-key.state";
import {ApiKeyActions} from "../stores/state/api-key.actions";

@Injectable({
  providedIn: 'root'
})
export class ApiKeyService {
  private apiKeyFilePath: string = 'assets/pexels-api-key.txt';

  private store = inject(Store)
  private http = inject(HttpClient)

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

  checkAndLoadApiKey() {
    return this.http.get(this.apiKeyFilePath, { responseType: 'text' })
      .pipe(
        map(apiKey => {
          this.store.dispatch(new ApiKeyActions.Set(apiKey));
          return true;  // File exists and API key is loaded
        }),
        catchError(error => {
          console.error('API key file not found or cannot be read', error);
          return of(false);  // File does not exist or cannot be read
        })
      );
  }
}
