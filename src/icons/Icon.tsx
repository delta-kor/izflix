import { Component, MouseEventHandler } from 'react';
import { ReactComponent as AddSvg } from '../icons/svg/add.svg';
import { ReactComponent as AdjustSvg } from '../icons/svg/adjust.svg';
import { ReactComponent as CalendarSvg } from '../icons/svg/calendar.svg';
import { ReactComponent as CategorySvg } from '../icons/svg/category.svg';
import { ReactComponent as ChatSvg } from '../icons/svg/chat.svg';
import { ReactComponent as CheckSvg } from '../icons/svg/check.svg';
import { ReactComponent as CloseSvg } from '../icons/svg/close.svg';
import { ReactComponent as CompassSvg } from '../icons/svg/compass.svg';
import { ReactComponent as DownSvg } from '../icons/svg/down.svg';
import { ReactComponent as DownloadSvg } from '../icons/svg/download.svg';
import { ReactComponent as DownScreenSvg } from '../icons/svg/downscreen.svg';
import { ReactComponent as EditSvg } from '../icons/svg/edit.svg';
import { ReactComponent as ErrorSvg } from '../icons/svg/error.svg';
import { ReactComponent as FolderSvg } from '../icons/svg/folder.svg';
import { ReactComponent as FullscreenSvg } from '../icons/svg/fullscreen.svg';
import { ReactComponent as HeartBorderSvg } from '../icons/svg/heart_border.svg';
import { ReactComponent as HeartFilledSvg } from '../icons/svg/heart_filled.svg';
import { ReactComponent as HomeSvg } from '../icons/svg/home.svg';
import { ReactComponent as IzflixSvg } from '../icons/svg/izflix.svg';
import { ReactComponent as LanguageSvg } from '../icons/svg/language.svg';
import { ReactComponent as LeftSvg } from '../icons/svg/left.svg';
import { ReactComponent as LoaderSvg } from '../icons/svg/loader.svg';
import { ReactComponent as MusicSvg } from '../icons/svg/music.svg';
import { ReactComponent as PauseSvg } from '../icons/svg/pause.svg';
import { ReactComponent as PipSvg } from '../icons/svg/pip.svg';
import { ReactComponent as PlaySvg } from '../icons/svg/play.svg';
import { ReactComponent as PlaylistSvg } from '../icons/svg/playlist.svg';
import { ReactComponent as RightSvg } from '../icons/svg/right.svg';
import { ReactComponent as SearchSvg } from '../icons/svg/search.svg';
import { ReactComponent as SettingsSvg } from '../icons/svg/settings.svg';
import { ReactComponent as ShareSvg } from '../icons/svg/share.svg';
import { ReactComponent as TvSvg } from '../icons/svg/tv.svg';
import { ReactComponent as UserSvg } from '../icons/svg/user.svg';

const IconMap = {
  add: AddSvg,
  adjust: AdjustSvg,
  calendar: CalendarSvg,
  category: CategorySvg,
  chat: ChatSvg,
  check: CheckSvg,
  close: CloseSvg,
  compass: CompassSvg,
  down: DownSvg,
  download: DownloadSvg,
  downscreen: DownScreenSvg,
  edit: EditSvg,
  error: ErrorSvg,
  folder: FolderSvg,
  fullscreen: FullscreenSvg,
  heart_border: HeartBorderSvg,
  heart_filled: HeartFilledSvg,
  home: HomeSvg,
  izflix: IzflixSvg,
  language: LanguageSvg,
  left: LeftSvg,
  loader: LoaderSvg,
  music: MusicSvg,
  pause: PauseSvg,
  pip: PipSvg,
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
  type: keyof typeof IconMap;
  color: string;
  onClick?: MouseEventHandler;
  className?: string;
}

class Icon extends Component<Props, any> {
  render() {
    const Item = IconMap[this.props.type];
    if (!Item) throw new Error('Icon not found');

    const className = this.props.className;

    return <Item onClick={this.props.onClick} className={className} fill={this.props.color} />;
  }
}

export type IconType = keyof typeof IconMap;
export default Icon;
