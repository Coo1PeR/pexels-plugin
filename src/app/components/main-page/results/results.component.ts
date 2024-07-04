import {Component, inject} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {VideoState} from "../../../core/stores/state/video.state";
import {Video} from "../../../core/classes/video";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  private store = inject(Store)
  @Select(VideoState.getVideos) videos$: Observable<Video[]> | undefined;
  @Select(VideoState.isLoading) loading$: Observable<boolean> | undefined;

}
