export class VideoAction {
  static readonly type = '[Video] Add item';
  constructor(public payload: string) { }
}

export class SearchVideos {
  static readonly type = '[Video] Search Videos';
  constructor(public query: string) {}
}

export class LoadVideoToMediaPool {
  static readonly type = '[Video] Load Video to Media Pool';
  constructor(public videoId: string) {}
}
