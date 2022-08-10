type VideoType = 'performance' | 'vod';

interface ApiResponse {
  ok: boolean;
  status: number;
  message?: string;
}

interface IPlaylist {
  id: string;
  label: string;
  type: VideoType;
  title: string;
  description: string;
  video: IVideo[];
  featured: boolean;
  order: number;
  thumbnail: string;
}

interface IVideo {
  id: string;
  type: VideoType;
  title: string;
  description: string;
  date: Date;
  category: [string, string, string];
  duration: number;
  is_4k: boolean;
}

namespace ApiResponse {
  namespace Recommend {
    interface GetUserRecommends extends ApiResponse {
      videos: IVideo[];
    }
  }

  namespace Playlist {
    interface Read extends ApiResponse {
      playlist: IPlaylist;
    }

    interface ReadAll extends ApiResponse {
      playlists: IPlaylist[];
    }

    interface ReadFeatured extends ApiResponse {
      playlist_id: string;
      video: IVideo;
      url: string;
    }
  }
}
