type Method = 'GET' | 'POST' | 'DELETE';

interface ApiResponse {
  ok: boolean;
  message?: string;
}

namespace ApiResponse {
  export namespace Feed {
    export namespace Playlist {
      export interface GetAllPlaylists extends ApiResponse {
        playlists: IPlaylist[];
      }
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
    }
  }

  export namespace Category {
    export interface ViewAll extends ApiResponse {
      type: 'parent';
      path: string[];
      folders: ICategoryFolder[];
    }

    interface Parent extends ApiResponse {
      type: 'parent';
      path: string[];
      folders: ICategoryFolder[];
    }

    interface Children extends ApiResponse {
      type: 'children';
      path: string[];
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
}

interface IVideoItem {
  id: string;
  title: string;
  description: string;
  duration: number;
}

interface ICategoryFolder {
  title: string;
  path: string;
  count: number;
}

interface ICategoryFile {
  title: string;
  path: string;
  count: number;
}
