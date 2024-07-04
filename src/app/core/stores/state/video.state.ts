import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PexelsService } from '../../services/pexels.service';
import { Injectable } from '@angular/core';
import { Video } from '../../classes/video';
import {SearchVideos, VideoAction} from "./video.actions";

export interface VideoStateModel {
  videos: Video[];
  loading: boolean
}

@State<VideoStateModel>({
  name: 'videos',
  defaults: {
    videos: [],
    loading: false
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

  @Selector()
  static isLoading(state: VideoStateModel) {
    return state.loading;
  }

  @Action(SearchVideos)
  searchVideos(ctx: StateContext<VideoStateModel>, action: SearchVideos) {
    ctx.patchState({ loading: true });
    return this.pexelsService.searchVideos(action.query).subscribe((result: any) => {
      const videos = result.videos.map((videoData: any) => new Video(videoData));
      ctx.patchState({ videos, loading: false });
    });
  }
}
