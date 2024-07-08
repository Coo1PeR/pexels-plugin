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

  private BASE_URL = 'https://api.pexels.com/videos';

  constructor(private http: HttpClient) {}

  searchVideos(query: string, page: number = 1) {
    const apiKey = this.getApiKey();
    return this.http.get(`${this.BASE_URL}/search`, {
      headers: { Authorization: apiKey },
      params: { query, per_page: '6', page: page.toString() }
    });
  }

  // getVideoById(videoId: string) {
  //   return this.http.get(`${this.BASE_URL}/videos/${videoId}`, {
  //     headers: { Authorization: this.apiKey }
  //   });
  // }
}
