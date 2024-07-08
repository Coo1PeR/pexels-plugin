import {Component, inject} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {VideoState} from "../../../core/stores/state/video.state";
import {Video} from "../../../core/classes/video";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {PexelsService} from "../../../core/services/pexels.service";
import {MatIcon} from "@angular/material/icon";
import {MatIconAnchor, MatIconButton} from "@angular/material/button";
import {MatSuffix} from "@angular/material/form-field";

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

  nextPage() {
    // if (this.value.trim()) {
    //   this.store.dispatch(new SearchVideos(this.value));
    // }
  }

  downloadVideo(videoId: number): void {
    const id = videoId.toString();
    this.pexelsService.getVideoById(id).subscribe(
      (response) => {
        if (response) {
          // @ts-ignore
          this.videoLink = response.video_files[0].link;
          console.log(this.videoLink);

          // Define the file path where the video will be saved
          const filePath = `/Library/Application Support/Blackmagic Design/DaVinci Resolve/Workflow Integration Plugins/downloads/${videoId}.mp4`;

          // Call the electron function to download the video
          window.electron.downloadVideo(this.videoLink, filePath).then((filePath) => {
            console.log(`Video downloaded to: ${filePath}`);
          }).catch((error) => {
            console.error('Error downloading video:', error);
          });
        } else {
          console.error('Error downloading video');
        }
      },
      (error) => {
        console.error('Download service error:', error);
      }
    );
  }
}
