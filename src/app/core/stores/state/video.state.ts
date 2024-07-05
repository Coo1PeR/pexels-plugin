import { State, Action, StateContext, Selector } from '@ngxs/store';
import { PexelsService } from '../../services/pexels.service';
import { Injectable } from '@angular/core';
import { Video } from '../../classes/video';
import {LoadVideoToMediaPool, SearchVideos, VideoAction} from "./video.actions";
//import {MediaService} from "../../services/media.service";

export interface VideoStateModel {
  page: number;
  per_page: number;
  total_results: number;
  url: string;
  videos: Video[];
  loading: boolean;
}

@State<VideoStateModel>({
  name: 'videos',
  defaults: {
    page: 1,
    per_page: 9,
    total_results: 0,
    url: '',
    videos: [],
    loading: false
  }
})
@Injectable()
export class VideoState {
  constructor(
    private pexelsService: PexelsService,
    //private mediaService: MediaService
  ) {}

  @Selector()
  static getVideos(state: VideoStateModel) {
    return state.videos;
  }

  @Selector()
  static isLoading(state: VideoStateModel) {
    return state.loading;
  }

  @Selector()
  static getPage(state: VideoStateModel) {
    return state.page;
  }


  @Selector()
  static getTotalResults(state: VideoStateModel) {
    return state.total_results;
  }

  @Selector()
  static getUrl(state: VideoStateModel) {
    return state.url;
  }

  @Action(SearchVideos)
  searchVideos(ctx: StateContext<VideoStateModel>, action: SearchVideos) {
    ctx.patchState({ loading: true });
    return this.pexelsService.searchVideos(action.query).subscribe((result: any) => {
      ctx.patchState({
        videos: result.videos,
        page: result.page,
        total_results: result.total_results,
        url: result.url,
        loading: false
      });
    });
  }
}
