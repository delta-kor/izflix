type Method = 'GET' | 'POST' | 'DELETE';

interface ApiResponse {
  ok: boolean;
  status: number;
  message?: string;
}

namespace ApiResponse {
  export namespace Feed {
    export namespace Playlist {
      export interface GetAllPlaylists extends ApiResponse {
        playlists: IPlaylist[];
      }

      export interface GetOnePlaylist extends ApiResponse {
        id: string;
        title: string;
        videos: IVideoItem[];
        featured: boolean;
      }
    }

    export interface GetVideoRecommends extends ApiResponse {
      videos: IVideoItem[];
    }

    export interface GetUserRecommends extends ApiResponse {
      videos: IVideoItem[];
      emotion: number[];
    }
  }

  export namespace Music {
    export interface ViewAll extends ApiResponse {
      musics: IMusic[];
    }

    export interface ViewOne extends ApiResponse {
      videos: IMusicVideoItem[];
    }
  }

  export namespace Video {
    export interface Stream extends ApiResponse {
      url: string;
      duration: number;
      quality: number;
      qualities: number[];
    }

    export interface Info extends ApiResponse {
      title: string;
      description: string;
      duration: number;
      date: number;
      path: IPath[];
    }
  }

  export namespace Category {
    export interface ViewAll extends ApiResponse {
      type: 'parent';
      path: IPath[];
      folders: ICategoryFolder[];
    }

    interface Parent extends ApiResponse {
      type: 'parent';
      path: IPath[];
      folders: ICategoryFolder[];
    }

    interface Children extends ApiResponse {
      type: 'children';
      path: IPath[];
      files: ICategoryFile[];
    }

    export type ViewOne = Parent | Children;
  }
}

interface IPlaylist {
  id: string;
  title: string;
  videos: IVideoItem[];
  featured: boolean;
  recommend?: boolean;
}

interface IMusic {
  id: string;
  title: string;
  count: number;
}

interface IMusicVideoItem {
  id: string;
  description: string;
  date: number;
  duration: number;
  is_4k: boolean;
}

interface IVideoItem {
  id: string;
  title: string;
  description: string;
  duration: number;
  is_4k: boolean;
}

interface ICategoryFolder {
  title: string;
  path: string;
  count: number;
  children: number;
}

interface ICategoryFile {
  title: string;
  id: string;
  date: number;
  duration: number;
  is_4k: boolean;
}

interface IPath {
  name: string;
  path: string;
  count: number;
}
