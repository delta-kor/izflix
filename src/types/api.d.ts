type VideoType = 'performance' | 'vod';
type VideoProperty = '4k' | 'cc';

interface ApiResponse {
  ok: boolean;
  status: number;
  message?: string;
}

interface ApiResponseWithToken extends ApiResponse {
  token: string;
}

enum Role {
  USER,
  STAFF,
  MASTER,
}

interface IUser {
  id: string;
  nickname: string;
  role: Role;
  ip: string[];
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
  count: number;
  cluster?: string;
}

interface IVideo {
  id: string;
  type: VideoType;
  title: string;
  description: string;
  date: number;
  category: [string, string, string];
  duration: number;
  properties: VideoProperty[];
  members: string[];
}

interface IVideoWithPlayTime extends IVideo {
  playTime: number;
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

interface ITeleport {
  from: number;
  to: number;
}

interface IChapter {
  title: string;
  time: number;
}

interface ITimeline {
  teleports: [ITeleport];
  chapters: [IChapter];
}

interface IVliveFilter {
  anchor?: string;
  count?: number;
  sort?: string;
  from?: number;
  members?: string[];
}

type CalendarTimestamp = [string, number];

namespace ApiResponse {
  namespace User {
    interface Get extends ApiResponse {
      user: IUser;
    }
  }

  namespace Search {
    interface Search extends ApiResponse {
      videos: IVideo[];
    }
  }

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
      properties: VideoProperty[];
      music: [string, string] | null;
      timeline?: ITimeline;
      members?: string[];
    }

    interface List extends ApiResponse {
      data: IVideo[];
    }

    interface Action extends ApiResponse {
      liked: boolean;
      likes_total: number;
    }

    interface Like extends ApiResponse {
      liked: boolean;
      total: number;
    }
  }

  namespace Playlist {
    interface Read extends ApiResponse {
      playlist: IPlaylist;
      access: boolean;
    }

    interface ReadAll extends ApiResponse {
      playlists: IPlaylist[];
    }

    interface ReadFeatured extends ApiResponse {
      playlist_id: string;
      video: IVideo;
      url: string;
    }

    interface CreateUserPlaylist extends ApiResponse {
      id: string;
    }

    interface UpdateUserPlaylist extends ApiResponse {
      playlist: IPlaylist;
    }

    interface DeleteUserPlaylist extends ApiResponse {}
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

  namespace Vlive {
    interface List extends ApiResponse {
      videos: Video[];
    }
  }
}
