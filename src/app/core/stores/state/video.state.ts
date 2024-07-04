import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PexelsService } from '../../services/pexels.service';
import { Injectable } from '@angular/core';
import { Video } from '../../classes/video';
import {SearchVideos, VideoAction} from "./video.actions";

export interface VideoStateModel {
  videos: Video[];
}

@State<VideoStateModel>({
  name: 'videos',
  defaults: {
    videos: []
  }
})
@Injectable()
export class VideoState {
  constructor(
    private pexelsService: PexelsService
  ) {}

  @Selector()
  static getVideos(state: VideoStateModel) {
    return state.videos;
  }

  @Action(SearchVideos)
  searchVideos(ctx: StateContext<VideoStateModel>, action: SearchVideos) {
    return this.pexelsService.searchVideos(action.query).subscribe((result: any) => {
      const videos = result.videos.map((videoData: any) => new Video(videoData));
      ctx.patchState({ videos });
    });
  }
}
