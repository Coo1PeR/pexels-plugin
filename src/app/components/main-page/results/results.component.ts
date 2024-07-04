import {Component, inject} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {VideoState} from "../../../core/stores/state/video.state";
import {Video} from "../../../core/classes/video";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './results.component.html',
  styleUrl: './results.component.scss'
})
export class ResultsComponent {
  private store = inject(Store)
  @Select(VideoState.getVideos) videos$: Observable<Video[]> | undefined;
}
