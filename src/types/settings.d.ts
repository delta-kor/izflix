interface ISettings {
  FEATURED_VIDEO_AUTOPLAY: boolean;
  VIDEO_AUTOPLAY: boolean;
  VIDEO_SUBTITLE: boolean;

  USER_RECOMMEND_COUNT: number;
  VIDEO_RECOMMEND_COUNT: number;
  VIDEO_SCREEN_ADJUST: string;
  VIDEO_QUALITY: number;
  VIDEO_NEXT_COUNTDOWN: number;
  
  $_AUTH_TOKEN: string | null;
  $_LIVE_TOKEN: string | null;
}
