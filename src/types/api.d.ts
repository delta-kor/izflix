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
  date: number;
  category: [string, string, string];
  duration: number;
  is_4k: boolean;
}

interface IAlbum {
  id: string;
  title: string;
  count: number;
}

interface IMusic {
  id: string;
  title: string;
  videos: IVideo[];
}

interface IPath {
  id: string;
  title: string;
  count: number;
  children: number;
}

interface IFolder {
  id: string;
  path: string[];
  title: string;
  count: number;
  children: number;
  date: number;
}

type CalendarTimestamp = [string, number];

namespace ApiResponse {
  namespace Recommend {
    interface GetUserRecommends extends ApiResponse {
      videos: IVideo[];
    }

    interface GetVideoRecommends extends ApiResponse {
      videos: IVideo[];
    }
  }

  namespace Video {
    interface Stream extends ApiResponse {
      url: string;
      quality: number;
      qualities: number[];
      duration: number;
    }

    interface Info extends ApiResponse {
      id: string;
      title: string;
      description: string;
      duration: number;
      date: number;
      path: IPath[];
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

  namespace Music {
    interface GetAllAlbums extends ApiResponse {
      albums: IAlbum[];
    }

    interface GetOneAlbum extends ApiResponse {
      album: IAlbum;
      musics: IMusic[];
    }

    interface GetOneMusic extends ApiResponse {
      music: IMusic;
    }
  }

  namespace Category {
    type View = ViewFolder | ViewFile;

    interface ViewFolder extends ApiResponse {
      type: 'folder';
      path: IPath[];
      data: IFolder[];
    }

    interface ViewFile extends ApiResponse {
      type: 'file';
      path: IPath[];
      data: IVideo[];
    }
  }

  namespace Calendar {
    interface GetAll extends ApiResponse {
      timestamps: CalendarTimestamp[];
    }

    interface GetOne extends ApiResponse {
      videos: IVideo[];
    }
  }
}
