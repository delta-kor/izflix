import { Component } from 'react';
import { ReactComponent as AddSvg } from '../icons/svg/add.svg';
import { ReactComponent as CalendarSvg } from '../icons/svg/calendar.svg';
import { ReactComponent as CategorySvg } from '../icons/svg/category.svg';
import { ReactComponent as ChatSvg } from '../icons/svg/chat.svg';
import { ReactComponent as CompassSvg } from '../icons/svg/compass.svg';
import { ReactComponent as DownSvg } from '../icons/svg/down.svg';
import { ReactComponent as DownloadSvg } from '../icons/svg/download.svg';
import { ReactComponent as DownScreenSvg } from '../icons/svg/downscreen.svg';
import { ReactComponent as FolderSvg } from '../icons/svg/folder.svg';
import { ReactComponent as FullscreenSvg } from '../icons/svg/fullscreen.svg';
import { ReactComponent as HomeSvg } from '../icons/svg/home.svg';
import { ReactComponent as IzflixSvg } from '../icons/svg/izflix.svg';
import { ReactComponent as LeftSvg } from '../icons/svg/left.svg';
import { ReactComponent as MusicSvg } from '../icons/svg/music.svg';
import { ReactComponent as PauseSvg } from '../icons/svg/pause.svg';
import { ReactComponent as PlaySvg } from '../icons/svg/play.svg';
import { ReactComponent as PlaylistSvg } from '../icons/svg/playlist.svg';
import { ReactComponent as RightSvg } from '../icons/svg/right.svg';
import { ReactComponent as SearchSvg } from '../icons/svg/search.svg';
import { ReactComponent as SettingsSvg } from '../icons/svg/settings.svg';
import { ReactComponent as ShareSvg } from '../icons/svg/share.svg';
import { ReactComponent as TvSvg } from '../icons/svg/tv.svg';
import { ReactComponent as UserSvg } from '../icons/svg/user.svg';
import { Color } from '../styles';

const IconMap = {
  add: AddSvg,
  calendar: CalendarSvg,
  category: CategorySvg,
  chat: ChatSvg,
  compass: CompassSvg,
  down: DownSvg,
  download: DownloadSvg,
  downscreen: DownScreenSvg,
  folder: FolderSvg,
  fullscreen: FullscreenSvg,
  home: HomeSvg,
  izflix: IzflixSvg,
  left: LeftSvg,
  music: MusicSvg,
  pause: PauseSvg,
  play: PlaySvg,
  playlist: PlaylistSvg,
  right: RightSvg,
  search: SearchSvg,
  settings: SettingsSvg,
  share: ShareSvg,
  tv: TvSvg,
  user: UserSvg,
};

interface Props {
  id: keyof typeof IconMap;
  color?: string;
  className?: string;
}

class Icon extends Component<Props, any> {
  static defaultProps = {
    color: Color.WHITE,
  };

  render() {
    const Item = IconMap[this.props.id];
    if (!Item) throw new Error('Icon not found');

    const className = this.props.className;

    return <Item className={className} fill={this.props.color!} />;
  }
}

export default Icon;
