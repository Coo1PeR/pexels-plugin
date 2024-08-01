import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Store} from "@ngxs/store";
import {ApiKeyState} from "../stores/state/api-key.state";

@Injectable({
  providedIn: 'root'
})
export class PexelsService {
  private store = inject(Store)

  private getApiKey(): string {
    return this.store.selectSnapshot(ApiKeyState.getApiKey);
  }

  private BASE_URL: string = 'https://api.pexels.com/videos';
  private ITEM_PER_PAGE: number = 6;

  constructor(private http: HttpClient) {}

  searchVideos(query: string, page: number = 1) {
    const apiKey = this.getApiKey();
    return this.http.get(`${this.BASE_URL}/search`, {
      headers: { Authorization: apiKey },
      params: { query, per_page: this.ITEM_PER_PAGE, page: page.toString() }
    });
  }
}
