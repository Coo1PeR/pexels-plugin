
export class Video {
  id: number;
  user: {
    name: string;
  };
  image: string;
  duration: number;
  url: string;
  video_files: Array<{
    link: string;
  }>;

  constructor(data: any) {
    this.id = data.id;
    this.user = data.user;
    this.image = data.image;
    this.duration = data.duration;
    this.url = data.url;
    this.video_files = data.video_files;
  }
}
