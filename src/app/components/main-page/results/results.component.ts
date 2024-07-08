import {Component, inject} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {VideoState} from "../../../core/stores/state/video.state";
import {Video} from "../../../core/classes/video";
import {combineLatest, Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PexelsService} from "../../../core/services/pexels.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconAnchor, MatIconButton} from "@angular/material/button";
import {MatSuffix} from "@angular/material/form-field";
import {ApiKeyState} from "../../../core/stores/state/api-key.state";

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    MatProgressBar,
    NgIf,
    MatIcon,
    MatIconButton,
    MatSuffix,
    MatIconAnchor
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  private store = inject(Store)
  private pexelsService = inject(PexelsService);
  public videoLink: string = ''

  @Select(VideoState.getVideos) videos$: Observable<Video[]> | undefined;
  @Select(VideoState.isLoading) loading$: Observable<boolean> | undefined;
  @Select(VideoState.getPage) page$: Observable<number> | undefined;
  @Select(VideoState.getTotalResults) totalResults$: Observable<number> | undefined;
  @Select(VideoState.getUrl) url$: Observable<string> | undefined;
  @Select(ApiKeyState.getApiKey) apiKey$: Observable<string> | undefined;


  nextPage() {
    // if (this.value.trim()) {
    //   this.store.dispatch(new SearchVideos(this.value));
    // }
  }

  downloadVideo(videoId: number) {
    const id = videoId.toString()
    const apiKey = this.store.selectSnapshot(ApiKeyState.getApiKey);
    console.log(`Video ID: ${id}, API Key: ${apiKey}`);
    window.electron.downloadVideo(id, apiKey);
  }
}
